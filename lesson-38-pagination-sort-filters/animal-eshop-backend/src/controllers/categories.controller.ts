import { Request, Response } from "express";

import * as categoriesService from "../services/categories.service";

import validateBody from "../utils/validateBody";

import { categoryAddSchema } from "../validation/category.schema";

import { CategoryDocument } from "../db/Category";

import { ICategoriesSearch } from "../services/categories.service";

export const getCategoriesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await categoriesService.getCategories(
    //@ts-expect-error
    req.query as ICategoriesSearch
  );

  res.json(result);
};

export const addCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  await validateBody(categoryAddSchema, req.body);
  const result: CategoryDocument = await categoriesService.addCategory({
    payload: req.body,
    file: req.file,
  });

  res.status(201).json(result);
};
