import * as ordersService from "../services/orders.service";

import validateBody from "../utils/validateBody";

import { addOrderSchema } from "../validation/orders.schema";

export const getOrdersController = async(req, res)=> {
    const result = await ordersService.getOrders();

    res.json(result);
}

export const addOrderController = async(req, res)=> {
    await validateBody(addOrderSchema, req.body);
    const {_id: userId} = req.user;
    const result = await ordersService.addOrder({...req.body, userId});

    res.status(201).json(result);
}