import { Request, Response } from "express";

import * as categoriesService from "../services/categories.service";

import validateBody from "../utils/validateBody";

import { categoryAddSchema } from "../validation/category.schema";

import { CategoryDocument } from "../db/Category";

import { ICategoriesSearch } from "../services/categories.service";

import parsePaginationParams from "../utils/parsePaginationParams";
import parseSortParams from "../utils/parseSortParams";
import parseCategoryFilters from "../utils/filters/parseCategoryFilters";

import { categorySortFields } from "../db/Category";

export const getCategoriesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, categorySortFields);
  const filters = parseCategoryFilters(req.query);

  const result = await categoriesService.getCategories({
    page,
    perPage,
    sortBy,
    sortOrder,
    filters,
  });

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
