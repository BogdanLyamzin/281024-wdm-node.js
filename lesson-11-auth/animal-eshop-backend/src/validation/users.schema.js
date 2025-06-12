import * as Yup from "yup";

export const adminAddSchema = Yup.object({
    email: Yup.string().trim().email().required(),
    password: Yup.string().trim().min(6).required(),
})