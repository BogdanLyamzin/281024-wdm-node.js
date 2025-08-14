import { rename, unlink } from "node:fs/promises";
import { SortOrder } from "mongoose";
import * as path from "node:path";

import HttpExeption from "../utils/HttpExeption";

import cloudinary from "../utils/cloudinary";

import Product, { ProductDocument } from "../db/Product";
import Category, { CategoryDocument } from "../db/Category";
import { CategoryAddType } from "../validation/category.schema";
import { CategoryFilters } from "../utils/filters/parseCategoryFilters";

interface IAddCategory {
  payload: CategoryAddType;
  file: Express.Multer.File | undefined;
}

interface ICategoryWithProducts {
  category: CategoryDocument | null;
  products: ProductDocument[];
}

export interface ICategoriesSearch {
  page: number;
  perPage: number;
  sortBy: string;
  sortOrder: SortOrder;
  filters: CategoryFilters;
}

interface ICategories {
  data: CategoryDocument[];
  total: number;
  totalPages: number;
}

const categoriesDir: string = path.resolve("public", "categories");

export const getCategories = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filters,
}: ICategoriesSearch): Promise<ICategories> => {
  const query = Category.find();

  if(filters.isImage !== undefined) {
    if(filters.isImage) {
      query.where("image").ne("");
    }
    else {
      query.where("image").equals("");
    }
  }
  // if(filters.minPrice) {
  //   query.where("price").gte(filters.minPrice)
  // }
  // if(filters.maxPrice) {
  //   query.where("price").lte(filters.maxPrice)
  // }

  const total = await Category.find().merge(query).countDocuments();
  // const total = await Category.find(query).countDocuments();
  // const total = await Category.find().countDocuments(query);

  const skip = (page - 1) * perPage;
  const data: CategoryDocument[] = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
    // const [total, data] = Promise.all([Category.find().merge(query).countDocuments(), query
    //   .skip(skip)
    //   .limit(perPage)
    //   .sort({ [sortBy]: sortOrder })]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data,
    total,
    totalPages,
  };
};

export const getCategoryById = async (
  id: string
): Promise<ICategoryWithProducts> => {
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
  // const { path: oldPath, filename }: Express.Multer.File = file;
  // const newPath: string = path.join(categoriesDir, filename);
  // await rename(oldPath, newPath);
  // const image: string = path.join("categories", filename);
  const { url: image } = await cloudinary.uploader.upload(file.path, {
    folder: "categories",
    use_filename: true,
  });
  await unlink(file.path);

  return Category.create({ ...payload, image });
};
