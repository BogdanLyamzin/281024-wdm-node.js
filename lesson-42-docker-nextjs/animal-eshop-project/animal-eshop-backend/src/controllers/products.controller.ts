
import { Request, Response } from "express";

import * as productsService from "../services/products.service";

import validateBody from "../utils/validateBody";

import { productAddSchema } from "../validation/products.schema";

import { ProductDocument } from "../db/Product";
import { IProductFiles } from './../services/products.service';

export const addProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  await validateBody(productAddSchema, req.body);
  const result: ProductDocument = await productsService.addProduct({
    payload: req.body,
    //@ts-expect-error
    files: req.files as IProductFiles,
  });

  res.json(result);
};

export const getProductsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result: ProductDocument[] = await productsService.getProducts();

  res.json(result);
};
