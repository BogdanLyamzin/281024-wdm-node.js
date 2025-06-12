import * as categoriesService from "../services/categories.service.js";

export const getCategoriesController = async (req, res) => {
  const result = await categoriesService.getCategories();

  res.json(result);
};

export const addCategoryController = async(req, res)=> {
    
}