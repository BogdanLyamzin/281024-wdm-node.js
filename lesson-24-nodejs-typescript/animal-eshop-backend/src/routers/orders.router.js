import { Router } from "express";

import { addOrderController, getOrdersController } from "../controllers/orders.controller.js";

import { authenticate, isAdmin } from "../middlewares/authorization.js";

const orderRouter = Router();

orderRouter.get("/", authenticate, isAdmin, getOrdersController);

orderRouter.post("/", authenticate, addOrderController);

export default orderRouter;