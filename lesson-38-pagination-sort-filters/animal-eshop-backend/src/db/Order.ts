import { Schema, model, Document } from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks";

interface IOrderItem {
  product: typeof Schema.Types.ObjectId;
  count: number;
}

interface IOrder {
  userId: typeof Schema.Types.ObjectId;
  address: string;
  phone: string;
  items: IOrderItem[]
}

export type OrderDocument = IOrder & Document;

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        count: {
          type: Number,
          min: 1,
          required: true,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

orderSchema.post("save", handleSaveError);

orderSchema.pre("findOneAndUpdate", setUpdateSettings);

orderSchema.post("findOneAndUpdate", handleSaveError);

const Order = model<IOrder>("order", orderSchema);

export default Order;
