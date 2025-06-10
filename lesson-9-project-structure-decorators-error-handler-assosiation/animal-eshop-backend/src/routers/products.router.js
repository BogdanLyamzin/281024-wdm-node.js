import { Router } from "express";

import productControllers from "../controllers/product.controllers.js";

import {
  productAddSchema,
  productUpdateSchema,
} from "../validation/product.schemas.js";

import validateErrorHandler from "../decorators/validateErrorHandler.js";

const addProductValidateMiddleware = validateErrorHandler(productAddSchema);
const updateProductValidateMiddleware =
  validateErrorHandler(productUpdateSchema);

const productsRouter = Router();

productsRouter.get("/", productControllers.getProductController);

productsRouter.get("/:id", productControllers.getProductByIdController);

productsRouter.post(
  "/",
  addProductValidateMiddleware,
  productControllers.addProductController
);

productsRouter.put(
  "/:id",
  updateProductValidateMiddleware,
  productControllers.updateProductByIdController
);

productsRouter.delete("/:id", productControllers.deleteProductByIdController);

export default productsRouter;
