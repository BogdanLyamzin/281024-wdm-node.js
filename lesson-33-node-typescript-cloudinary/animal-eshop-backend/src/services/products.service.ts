import { rename } from "node:fs/promises";
import * as path from "node:path";

import HttpExeption from "../utils/HttpExeption";

import Product from "../db/Product";

import { ProductDocument } from "../db/Product";
import { ProductAddType } from "../validation/products.schema";

export interface IProductFiles {
  mainImage: [Express.Multer.File] | undefined;
  images: Express.Multer.File[] | undefined;
}

interface IAddProduct {
  payload: ProductAddType;
  files: IProductFiles;
}

const productsDir: string = path.resolve("public", "products");

export const getProducts = (): Promise<ProductDocument[]> =>
  Product.find().populate("category", "name");

export const addProduct = async ({ payload, files }: IAddProduct): Promise<ProductDocument> => {
  if (!files || !files.mainImage || !files.images) {
    throw HttpExeption(404, "product need images");
  }
  const { path: oldPath, filename } = files.mainImage[0];
  const newPath: string = path.join(productsDir, filename);
  await rename(oldPath, newPath);
  const mainImage: string = path.join("products", filename);
  let images: string[] = [];
  if (files.images) {
    images = await Promise.all<Promise<string>[]>(
      files.images.map(async (file: Express.Multer.File): Promise<string> => {
        const { path: oldPath, filename }: Express.Multer.File = file;
        const newPath: string = path.join(productsDir, filename);
        await rename(oldPath, newPath);
        return path.join("products", filename);
      })
    );
  }

  return Product.create({ ...payload, mainImage, images });
};
