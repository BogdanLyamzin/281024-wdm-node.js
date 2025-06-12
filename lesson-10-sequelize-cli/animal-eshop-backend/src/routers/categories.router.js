import { Router } from "express";

import { getCategoriesController, addCategoryController } from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategoriesController);

categoriesRouter.post("/", addCategoryController);

export default categoriesRouter;
