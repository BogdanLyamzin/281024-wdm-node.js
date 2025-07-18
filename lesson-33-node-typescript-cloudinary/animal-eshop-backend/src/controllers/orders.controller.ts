import { Request, Response } from "express";

import * as ordersService from "../services/orders.service";

import validateBody from "../utils/validateBody";

import { addOrderSchema } from "../validation/orders.schema";

import { AuthenticatedRequest } from "../typescript/interfaces";
import { OrderDocument } from "../db/Order";

export const getOrdersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result: OrderDocument[] = await ordersService.getOrders();

  res.json(result);
};

export const addOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  await validateBody(addOrderSchema, req.body);
  const { _id: userId } = (req as AuthenticatedRequest).user;
  const result: OrderDocument = await ordersService.addOrder({
    ...req.body,
    userId,
  });

  res.status(201).json(result);
};
