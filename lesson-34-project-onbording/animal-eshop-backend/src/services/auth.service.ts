import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import User from "../db/User";

import HttpExeption from "../utils/HttpExeption";
import sendEmailWitMailgun from "../utils/sendEmailWithMaillgun";
import sendEmailWithNodemailer from "../utils/sendEmailWithNodemailer";

import { UserDocument } from "../db/User";
import { Register, Login } from "../validation/auth.schema";

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

export const register = async (data: Register)=> {
  const {email, password} = data;
  const user = await User.findOne({email});
  if(user) throw HttpExeption(409, `Email ${email} already register`);
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();
  const newUser = await User.create({...data, password: hashPassword, verificationCode});
  const verifyEmail = {
    to: [email],
    subject: "Verify email",
    html: `<a href="${FRONTEND_URL}?verificationCode=${verificationCode}" target="_blank">Click verify email</a>`
  }
  await sendEmailWitMailgun(verifyEmail);
  // await sendEmailWithNodemailer(verifyEmail);

  return newUser;
}

export const verify = async (code: string)=> {
  const user = await User.findOne({verificationCode: code});
  if(!user) throw HttpExeption(401, "Email already verified or not found");
  user.verificationCode = "";
  user.verify = true;
  await user.save();
}

export const login = async ({
  email,
  password,
}: Login): Promise<ILoginResponse> => {
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
