import * as productsService from "../services/products.service";

import validateBody from "../utils/validateBody";

import { productAddSchema } from "../validation/products.schema";

export const addProductController = async(req, res)=> {
    await validateBody(productAddSchema, req.body);
    const result = await productsService.addProduct({payload: req.body, files: req.files});

    res.json(result);
}

export const getProductsController = async(req, res)=> {
    const result = await productsService.getProducts();

    res.json(result);
}