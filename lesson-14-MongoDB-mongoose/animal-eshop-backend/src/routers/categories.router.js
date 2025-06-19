import { Router } from "express";

import {
  getCategoriesController,
  getCategoryByIdController,
  addCategoryController,
  updateCategoryByIdController,
  deleteCategoryByIdController,
} from "../controllers/categories.controller.js";

// import { authenticate, isAdmin } from "../middlewares/authorization.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategoriesController);

categoriesRouter.get("/:id", getCategoryByIdController);

categoriesRouter.post("/", addCategoryController);

categoriesRouter.put("/:id", updateCategoryByIdController);

categoriesRouter.delete("/:id", deleteCategoryByIdController);

export default categoriesRouter;
