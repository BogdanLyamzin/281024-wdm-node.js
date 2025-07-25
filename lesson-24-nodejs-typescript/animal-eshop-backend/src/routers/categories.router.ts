import { Router } from "express";

import {
  getCategoriesController,
  addCategoryController,
} from "../controllers/categories.controller";

import { authenticate, isAdmin } from "../middlewares/authorization.js";
import upload from "../middlewares/upload.js";

const categoriesRouter: Router = Router();

categoriesRouter.get("/", getCategoriesController);

categoriesRouter.post(
  "/",
  authenticate,
  isAdmin,
  upload.single("image"),
  addCategoryController
);

export default categoriesRouter;
