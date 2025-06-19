import * as categoriesService from "../services/categories.service.js";

import validateBody from "../utils/validateBody.js";

import HttpExeption from "../utils/HttpExeption.js";

import {
  categoryAddSchema,
  categoryUpdateSchema,
} from "../validation/categories.schema.js";

export const getCategoriesController = async (req, res) => {
  const result = await categoriesService.getCategories();

  res.json(result);
};

export const getCategoryByIdController = async(req, res)=> {
  const {id} = req.params;
  const result = await categoriesService.getCategoryById(id);
  if(!result) throw HttpExeption(404, `Category with id=${id} not found`);

  res.json(result);
}

export const addCategoryController = async (req, res) => {
  await validateBody(categoryAddSchema, req.body);
  const result = await categoriesService.addCategory(req.body);

  res.status(201).json(result);
};

export const updateCategoryByIdController = async(req, res)=> {
  await validateBody(categoryUpdateSchema, req.body);
  const {id} = req.params;
  const result = await categoriesService.updateCategoryById(id, req.body);
  if(!result) throw HttpExeption(404, `Category with id=${id} not found`);

  res.json(result);
}

export const deleteCategoryByIdController = async(req, res)=> {
  const {id} = req.params;
  const result = await categoriesService.deleteCategoryById(id);
  if(!result) throw HttpExeption(404, `Category with id=${id} not found`);

  // res.status(204).send();
  res.json(result);
}