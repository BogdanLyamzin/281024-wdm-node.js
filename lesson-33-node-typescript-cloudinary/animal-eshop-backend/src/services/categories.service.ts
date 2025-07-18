import { rename } from "node:fs/promises";
import * as path from "node:path";

import HttpExeption from "../utils/HttpExeption";

import Product, { ProductDocument } from "../db/Product";
import Category, { CategoryDocument } from "../db/Category";
import { CategoryAddType } from "../validation/category.schema";

interface IAddCategory {
  payload: CategoryAddType;
  file: Express.Multer.File | undefined;
}

interface ICategoryWithProducts {
  category: CategoryDocument | null;
  products: ProductDocument[]
}

const categoriesDir: string = path.resolve("public", "categories");

export const getCategories = (): Promise<CategoryDocument[]> => Category.find();

export const getCategoryById = async (id: string): Promise<ICategoryWithProducts> => {
  const category: CategoryDocument | null = await Category.findById(id);
  const products: ProductDocument[] = await Product.find({
    category: category?._id,
  }).populate("category", "name");

  return {
    category,
    products,
  };
};

export const addCategory = async ({
  payload,
  file,
}: IAddCategory): Promise<CategoryDocument> => {
  if (!file) {
    throw HttpExeption(404, "image required");
  }
  const { path: oldPath, filename }: Express.Multer.File = file;
  const newPath: string = path.join(categoriesDir, filename);
  await rename(oldPath, newPath);
  const image: string = path.join("categories", filename);
  return Category.create({ ...payload, image });
};
