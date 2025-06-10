import * as Yup from "yup";

export const productAddSchema = Yup.object({
    name: Yup.string().required(),
    // category: Yup.string().required(),
    // animal: Yup.string().required(),
    price: Yup.number().min(0).required(),
    // stock: Yup.number().min(0).required(),
    // brand: Yup.string().required(),
    description: Yup.string().required(),
    // image: Yup.string().required(),
  });
  
export const productUpdateSchema = Yup.object({
    name: Yup.string(),
    // category: Yup.string(),
    // animal: Yup.string(),
    price: Yup.number().min(0),
    // stock: Yup.number().min(0),
    // brand: Yup.string(),
    description: Yup.string(),
    // image: Yup.string(),
  });