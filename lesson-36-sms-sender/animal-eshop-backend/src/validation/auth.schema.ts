import * as Yup from "yup";

import { passwordSchema, emailSchema } from "./users.schema";

export const confirmGoogleOauthSchema = Yup.object({
    code: Yup.string().trim().required(),
})

export const registerSchema = Yup.object({
    fullName: Yup.string().trim().required(),
    email: emailSchema,
    password: passwordSchema,
})

export const verifyCodeSchema = Yup.object({
    otp: Yup.string().trim().required(),
})

export const loginSchema = Yup.object({
    email: emailSchema,
    password: passwordSchema,
});

export type GoogleOauth = Yup.InferType<typeof confirmGoogleOauthSchema>;
export type Register = Yup.InferType<typeof registerSchema>;
export type VerifyCode = Yup.InferType<typeof verifyCodeSchema>;
export type Login = Yup.InferType<typeof loginSchema>;