import * as Yup from "yup";

export const categoryAddSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
});

export const categoryUpdateSchema = Yup.object({
    name: Yup.string(),
    description: Yup.string(),
});