import { Router } from "express";

import {
  getCategoriesController,
  addCategoryController,
} from "../controllers/categories.controller.js";

import { authenticate, isAdmin } from "../middlewares/authorization.js";
import upload from "../middlewares/upload.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategoriesController);

// upload.fields([{name: "image", maxCount: 1}, {name: "addintionalImages", maxCount: 8}])
// upload.array("image", 8);
categoriesRouter.post(
  "/",
  authenticate,
  isAdmin,
  upload.single("image"),
  addCategoryController
);

export default categoriesRouter;
