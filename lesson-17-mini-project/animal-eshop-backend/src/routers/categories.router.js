import { Router } from "express";

import { getCategoriesController, addCategoryController } from "../controllers/categories.controller.js";

import { authenticate, isAdmin } from "../middlewares/authorization.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategoriesController);

categoriesRouter.post("/", authenticate, isAdmin, addCategoryController);

export default categoriesRouter;
