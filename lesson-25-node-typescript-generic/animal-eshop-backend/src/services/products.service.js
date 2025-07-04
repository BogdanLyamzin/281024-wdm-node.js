import { rename } from "node:fs/promises";
import * as path from "node:path";

import Product from "../db/Product.js";

const productsDir = path.resolve("public", "products");

export const getProducts = () =>
  Product.find().populate("category", "name");

export const addProduct = async ({ payload, files }) => {
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
      })
    );
  }

  return Product.create({ ...payload, mainImage, images });
};
