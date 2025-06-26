import { Router } from "express";

import { addProductController } from "../controllers/products.controller.js";

import { authenticate, isAdmin } from "../middlewares/authorization.js";
import upload from "../middlewares/upload.js";

const productsRouter = Router();

productsRouter.post("/", authenticate, isAdmin, upload.fields([
    {name: "mainImage", maxCount: 1},
    {name: "images", maxCount: 8}
]), addProductController);

export default productsRouter;