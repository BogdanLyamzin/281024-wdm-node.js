import { Router } from "express";

import productControllers from "../controllers/product.controllers.js";

const productsRouter = Router();

productsRouter.get("/", productControllers.getProductController);

productsRouter.get("/:id", productControllers.getProductByIdController);

productsRouter.post("/", productControllers.addProductController);

productsRouter.put("/:id", productControllers.updateProductByIdController);

productsRouter.delete("/:id", productControllers.deleteProductByIdController);

export default productsRouter;
