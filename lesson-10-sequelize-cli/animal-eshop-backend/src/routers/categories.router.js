import { Router } from "express";

import { getCategoriesController } from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategoriesController);

export default categoriesRouter;
