import * as Yup from "yup";

import {
  emailValidation,
  passwordValidation,
} from "../constants/users.constants";

export const passwordSchema = Yup.string()
  .trim()
  .min(6)
  .matches(passwordValidation.value, passwordValidation.message)
  .required();

export type PasswordSchema = Yup.InferType<typeof passwordSchema>;

export const emailSchema = Yup.string()
  .trim()
  .matches(emailValidation.value, emailValidation.message)
  .required();

export type EmailSchema = Yup.InferType<typeof emailSchema>;

export const adminAddSchema = Yup.object({
  fullName: Yup.string().trim().required(),
  email: emailSchema,
  password: passwordSchema,
});

export type AdminAddSchema = Yup.InferType<typeof adminAddSchema>;

export const adminChangePasswordSchema = Yup.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
});

export type AdminChangePasswordSchema = Yup.InferType<
  typeof adminChangePasswordSchema
>;
