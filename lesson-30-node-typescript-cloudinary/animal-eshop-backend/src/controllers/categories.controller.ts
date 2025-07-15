import { Request, Response } from "express";

import * as categoriesService from "../services/categories.service";

export const getCategoriesController = async (req: Request, res: Response) => {
  const result = await categoriesService.getCategories();

  res.json(result);
};

export const addCategoryController = async (req: Request, res: Response) => {
  const result = await categoriesService.addCategory({
    payload: req.body,
    file: req.file,
  });

  res.status(201).json(result);
};
