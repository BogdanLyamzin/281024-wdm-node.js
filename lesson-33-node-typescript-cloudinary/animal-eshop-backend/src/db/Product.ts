import {Schema, model, Document} from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks";

interface IProduct {
    code?: number;
    count: number;
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    promotion: boolean;
    mainImage: string;
    images: string[];
    category: typeof Schema.Types.ObjectId;
    reviews: typeof Schema.Types.ObjectId[];
}

export type ProductDocument = IProduct & Document;

const productSchema = new Schema<IProduct>({
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
    reviews: {
        type: [Schema.Types.ObjectId],
        ref: "review",
    }
}, {versionKey: false, timestamps: true});

productSchema.post("save", handleSaveError);

productSchema.pre("findOneAndUpdate", setUpdateSettings);

productSchema.post("findOneAndUpdate", handleSaveError);

const Product = model<IProduct>("product", productSchema);

export default Product;