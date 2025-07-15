import * as Yup from "yup";

import { passwordSchema, emailSchema } from "./users.schema";

export const loginSchema = Yup.object({
    email: emailSchema,
    password: passwordSchema,
});

export type Login = Yup.InferType<typeof loginSchema>;