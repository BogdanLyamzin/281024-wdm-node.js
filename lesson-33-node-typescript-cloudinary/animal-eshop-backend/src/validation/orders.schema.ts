import * as Yup from "yup";

export const addOrderSchema = Yup.object({
    address: Yup.string().trim().required(),
    phone: Yup.string().trim().required(),
    items: Yup.array(Yup.object({
        product: Yup.string().trim().required(),
        count: Yup.number().min(1).required()
    }))
});

export type OrderAddType = Yup.InferType<typeof addOrderSchema>;