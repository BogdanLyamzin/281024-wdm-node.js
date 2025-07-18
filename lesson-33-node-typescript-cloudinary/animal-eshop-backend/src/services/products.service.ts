import { rename } from "node:fs/promises";
import * as path from "node:path";

import HttpExeption from "../utils/HttpExeption";

import Product from "../db/Product";

import { ProductDocument } from "../db/Product";
import { ProductAddType } from "../validation/products.schema";

interface IProductFiles {
  mainImage: Express.Multer.File | undefined;
  images: Express.Multer.File[] | undefined;
}

interface IAddProduct {
  payload: ProductAddType;
  files: IProductFiles;
}

const productsDir: string = path.resolve("public", "products");

export const getProducts = (): Promise<ProductDocument[]> =>
  Product.find().populate("category", "name");

export const addProduct = async ({ payload, files }: IAddProduct) => {
  if(!files) {
    throw HttpExeption(404, "product need images");
  }
  const { path: oldPath, filename } = files.mainImage[0];
  const newPath = path.join(productsDir, filename);
  await rename(oldPath, newPath);
  const mainImage = path.join("products", filename);
  let images = [];
  if (files.images) {
    images = await Promise.all(
      files.images.map(async (file) => {
        const { path: oldPath, filename } = file;
        const newPath = path.join(productsDir, filename);
        await rename(oldPath, newPath);
        return path.join("products", filename);
      });
    );
  }

  return Product.create({ ...payload, mainImage, images });
};
