import Order from "../db/Order.js";

export const getOrders = () =>
  Order.find().populate("userId", "fullName email").populate({
    path: "items",
    populate: {
        path: "product",
    }
  });
  //  User.findOne({_id: userId})

export const addOrder = (payload) => Order.create(payload);
