import { Schema, model } from "mongoose";

const orderSchema = new Schema(
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

orderSchema.post("save", (error, doc, next)=> {
    error.status = 400;
    next();
})

orderSchema.post("findOneAndUpdate", (error, doc, next)=> {
    error.status = 400;
    next();
})

const Order = model("order", orderSchema);

export default Order;
