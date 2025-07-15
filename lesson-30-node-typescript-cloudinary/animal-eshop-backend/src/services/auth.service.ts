import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../db/User";

import HttpExeption from "../utils/HttpExeption";

import { UserDocument } from "../db/User";
import { Login } from "../validation/auth.schema";

interface ILoginResponse {
  token: string;
  user: {
    email: string;
    fullName: string;
  }
}

interface IUserFind {
  email: string;
}

const { JWT_SECRET } = process.env;

const createToken = (user: UserDocument) => {
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn: "24h" });
  return token;
}

export const login = async ({ email, password }: Login): Promise<ILoginResponse> => {
  const userFind: IUserFind = {
    email,
  };
  
  const user: UserDocument | null = await User.findOne(userFind);

  if (!user) throw HttpExeption(401, `User with email=${email} not found`); // throw HttpExeption(401, "Email or password invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpExeption(401, `Password invalid`);

  const token = createToken(user);
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

export const getCurrent = async user => {
  const token = createToken(user);
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

export const logout = async ({_id})=> {
  const user = await User.findById(_id);
  if (!user) throw HttpExeption(401, `User not found`);
  user.token = "";
  await user.save();
}
