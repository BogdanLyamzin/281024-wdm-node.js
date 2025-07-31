import { Router } from "express";

import { addProductController, getProductsController } from "../controllers/products.controller";

import { authenticate, isAdmin } from "../middlewares/authorization";
import upload from "../middlewares/upload";

const productsRouter: Router = Router();

productsRouter.get("/", authenticate, isAdmin, getProductsController);

productsRouter.post("/", authenticate, isAdmin, upload.fields([
    {name: "mainImage", maxCount: 1},
    {name: "images", maxCount: 8}
]), addProductController);

export default productsRouter;