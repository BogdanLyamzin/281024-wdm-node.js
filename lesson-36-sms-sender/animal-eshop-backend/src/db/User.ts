import {Schema, model, Document} from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks";

import { emailValidation } from "../constants/users.constants";

import { Role } from "../typescript/types";

interface User {
  fullName: string;
  email: string;
  phone: string;
  otp: string;
  password: string;
  role: Role,
  token?: string;
  verificationCode?: string;
  verify: boolean;
}

export type UserDocument = User & Document;

const userSchema = new Schema<UserDocument>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    match: emailValidation.value,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  otp: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["superadmin", "admin", "manager", "user"],
      message: "user/manager/admin with with email already exist",
    },
    default: "user",
    required: true,
  },
  token: {
    type: String,
  },
  verificationCode: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
    required: true,
  }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model<UserDocument>("user", userSchema);

export default User;

