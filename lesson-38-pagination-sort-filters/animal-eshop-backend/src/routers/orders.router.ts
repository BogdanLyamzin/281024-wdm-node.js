import { Router } from "express";

import { addOrderController, getOrdersController } from "../controllers/orders.controller";

import { authenticate, isAdmin } from "../middlewares/authorization";

const orderRouter: Router = Router();

orderRouter.get("/", authenticate, isAdmin, getOrdersController);

orderRouter.post("/", authenticate, addOrderController);

export default orderRouter;