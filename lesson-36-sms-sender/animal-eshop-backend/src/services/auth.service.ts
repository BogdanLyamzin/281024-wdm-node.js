import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import User from "../db/User";

import HttpExeption from "../utils/HttpExeption";
import sendEmailWitMailgun from "../utils/sendEmailWithMaillgun";
import sendEmailWithNodemailer from "../utils/sendEmailWithNodemailer";
import sendSMS from "../utils/sendSMS";
import generateOTP from "../utils/generateOTP";
import { validateGoogleOauthCode, getFullNameFromGoogleTicketPayload } from "../utils/googleOauth2";

import { UserDocument } from "../db/User";
import { GoogleOauth, Register, Login } from "../validation/auth.schema";

export interface ILoginOTPResponse {
  message: string;
}

export interface ILoginResponse {
  token: string;
  user: {
    email: string;
    fullName: string;
  };
}

interface IUserFind {
  email: string;
}

export interface IJWTTokenPayload {
  id: unknown;
}

const { JWT_SECRET, FRONTEND_URL } = process.env;

const createToken = (user: UserDocument): string => {
  const payload: IJWTTokenPayload = {
    id: user._id,
  };

  const token: string = jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: "24h",
  });
  return token;
};

export const loginOrRegisterWitGoogle = async ({code}: GoogleOauth) => {
  const ticket = await validateGoogleOauthCode(code);
  const payload = ticket.getPayload();
  if(!payload) throw HttpExeption(401, "Invalid code");

  let user: UserDocument | null = await User.findOne({email: payload.email});

  if(!user) {
    const fullName = getFullNameFromGoogleTicketPayload(payload);
    const password = await bcrypt.hash(nanoid(), 10);

    user = await User.create({
      fullName,
      email: payload.email,
      password,
      role: "admin",
      verify: true,
    });
  }

  const token: string = createToken(user);
  user.token = token;
  await user.save();

  return {
    token,
    user: {
      email: user.email,
      fullName: user.fullName,
    },
  };
}

export const register = async (data: Register)=> {
  const {email, password} = data;
  const user = await User.findOne({email});
  if(user) throw HttpExeption(409, `Email ${email} already register`);
  const hashPassword = await bcrypt.hash(password, 10);
  
  const otp = generateOTP();

  const newUser = await User.create({...data, password: hashPassword, otp});

  await sendSMS({body: otp, to: newUser.phone});

  return newUser;
}

export const verify = async (otp: string)=> {
  const user = await User.findOne({otp});
  if(!user) throw HttpExeption(401, "Email already verified or not found");
  user.otp = "";
  user.verify = true;
  await user.save();
}

export const verifyPhone = async (otp: string)=> {
  const user = await User.findOne({otp});
  if(!user) throw HttpExeption(401, "Email already verified or not found");
  user.otp = "";
  if(user.verifyEmail) {
    user.verify = true;
  }
  await user.save();
}

export const login = async ({
  email,
  password,
}: Login): Promise<ILoginOTPResponse> => {
  const userFind: IUserFind = {
    email,
  };

  const user: UserDocument | null = await User.findOne(userFind);

  if (!user) throw HttpExeption(401, `User with email=${email} not found`); // throw HttpExeption(401, "Email or password invalid");

  if(!user.verify) throw HttpExeption(401, `Email not verified`);

  const passwordCompare: boolean = await bcrypt.compare(
    password,
    user.password
  );
  if (!passwordCompare) throw HttpExeption(401, `Password invalid`);

  const otp = generateOTP();

  await sendSMS({body: otp, to: user.phone});

  user.otp = otp;
  await user.save();

  return {
    message: "OTP send to user phone number"
  };
};

export const finishLogin = async (otp: string)=> {
  const user: UserDocument | null = await User.findOne({otp});
  if (!user) throw HttpExeption(401, `OTP expired`); 

  const token: string = createToken(user);
  user.token = token;
  user.otp = "";
  await user.save();

  return {
    token,
    user: {
      email: user.email,
      fullName: user.fullName,
    },
  };
}

export const getCurrent = async (
  user: UserDocument
): Promise<ILoginResponse> => {
  const token: string = createToken(user);
  user.token = token;
  await user.save();

  return {
    token,
    user: {
      email: user.email,
      fullName: user.fullName,
    },
  };
};

export const logout = async ({ _id }: UserDocument): Promise<void> => {
  const user: UserDocument | null = await User.findById(_id);
  if (!user) throw HttpExeption(401, `User not found`);
  user.token = "";
  await user.save();
};
