import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../db/User";

import HttpExeption from "../utils/HttpExeption";

import { UserDocument } from "../db/User";
import { Login } from "../validation/auth.schema";

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

const { JWT_SECRET } = process.env;

const createToken = (user: UserDocument): string => {
  const payload: IJWTTokenPayload = {
    id: user._id,
  };

  const token: string = jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: "24h",
  });
  return token;
};

export const login = async ({
  email,
  password,
}: Login): Promise<ILoginResponse> => {
  const userFind: IUserFind = {
    email,
  };

  const user: UserDocument | null = await User.findOne(userFind);

  if (!user) throw HttpExeption(401, `User with email=${email} not found`); // throw HttpExeption(401, "Email or password invalid");

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
