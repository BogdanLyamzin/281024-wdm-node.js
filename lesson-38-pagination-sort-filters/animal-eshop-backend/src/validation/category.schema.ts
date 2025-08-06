import * as Yup from "yup";

export const categoryAddSchema = Yup.object({
    name: Yup.string().trim().required(),
    description: Yup.string().trim().required(),
})

export type CategoryAddType = Yup.InferType<typeof categoryAddSchema>;