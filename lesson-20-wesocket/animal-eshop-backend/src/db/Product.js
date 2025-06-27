import {Schema, model} from "mongoose";

const productSchema = new Schema({
    code: {
        type: Number,
    },
    count: {
        type: Number,
        default: 10,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        minlength: 10,
        required: true,
    },
    price: {
        type: Number,
        min: 0.01,
        required: true,
    },
    discountPrice: {
        type: Number,
        min: 0.01,
    },
    promotion: {
        type: Boolean,
        default: false,
        required: true,
    },
    mainImage: {
        type: String,
        required: true,
    },
    images: {
        type: [String]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
}, {versionKey: false, timestamps: true});

const Product = model("product", productSchema);

export default Product;