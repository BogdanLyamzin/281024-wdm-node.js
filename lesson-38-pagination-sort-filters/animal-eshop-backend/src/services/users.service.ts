import bcrypt from "bcrypt";

import User from "../db/User";

import HttpExeption from "../utils/HttpExeption";

import { UserDocument } from "../db/User";
import {
  AdminAddSchema,
  AdminChangePasswordSchema,
} from "./../validation/users.schema";

export const addAdmin = async (
  payload: AdminAddSchema
): Promise<UserDocument> => {
  const hashPassword: string = await bcrypt.hash(payload.password, 10);
  return User.create({
    ...payload,
    password: hashPassword,
    role: "admin",
  });
};

export const changeAdminPassword = async (
  id: string,
  { oldPassword, newPassword }: AdminChangePasswordSchema
): Promise<UserDocument | null> => {
  const admin: UserDocument | null = await User.findById(id);
  if (!admin) return null;

  const passwordCompare: boolean = await bcrypt.compare(oldPassword, admin.password);
  if (!passwordCompare) throw HttpExeption(400, "Old password invalid");

  const hashPassword: string = await bcrypt.hash(newPassword, 10);
  admin.password = hashPassword;
  await admin.save();

  return admin;
};
