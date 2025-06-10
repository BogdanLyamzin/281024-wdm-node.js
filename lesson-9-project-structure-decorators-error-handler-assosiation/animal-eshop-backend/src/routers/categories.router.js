import { Router } from "express";

import categoryControllers from "../controllers/category.controllers.js";

import { addCategorySchema } from "../validation/category.schemas.js";

import validateErrorHandler from "../decorators/validateErrorHandler.js";

const addCategoryValidateMiddleware = validateErrorHandler(addCategorySchema);

const categoriesRouter = Router();

categoriesRouter.post("/", addCategoryValidateMiddleware, categoryControllers.addCategoryController);

export default categoriesRouter;