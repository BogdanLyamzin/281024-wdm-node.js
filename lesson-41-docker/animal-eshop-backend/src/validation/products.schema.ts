import * as Yup from "yup";

export const productAddSchema = Yup.object({
    code: Yup.string().trim(),
    count: Yup.string().trim(),
    name: Yup.string().trim().required(),
    description: Yup.string().trim().min(10).required(),
    price: Yup.string().trim().required(),
    discountPrice: Yup.string().trim(),
    promotion: Yup.string().trim(),
    category: Yup.string().required(),
});

export type ProductAddType = Yup.InferType<typeof productAddSchema>;