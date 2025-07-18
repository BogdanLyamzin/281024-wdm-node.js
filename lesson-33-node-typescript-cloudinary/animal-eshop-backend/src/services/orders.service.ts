import Order, {OrderDocument} from "../db/Order";
import { OrderAddType } from "../validation/orders.schema";

export const getOrders = (): Promise<OrderDocument[]> =>
  Order.find().populate("userId", "fullName email").populate({
    path: "items",
    populate: {
        path: "product",
    }
  });

export const addOrder = (payload: OrderAddType) => Order.create(payload);
