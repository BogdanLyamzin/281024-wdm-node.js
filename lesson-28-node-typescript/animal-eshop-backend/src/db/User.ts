import {Schema, model, Document} from "mongoose";

import { emailValidation } from "../constants/users.constants.js";

import { Role } from "../types";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  token?: string | null;
};

export type UserDocument = IUser & Document;

const userSchema = new Schema({
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
  }
}, {versionKey: false, timestamps: true});

const User = model("user", userSchema);

export default User;

