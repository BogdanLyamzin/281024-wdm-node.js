import {Schema, model, Document} from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks";

interface ICategory {
    name: string;
    description: string;
    image: string;
}

export type CategoryDocument = ICategory & Document;

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        minlength: 2,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    image: {
        type: String,
        default: "",
        required: true,
    }
}, {versionKey: false, timestamps: true});

categorySchema.post("save", handleSaveError);

categorySchema.pre("findOneAndUpdate", setUpdateSettings);

categorySchema.post("findOneAndUpdate", handleSaveError);

const Category = model<ICategory>("category", categorySchema);

export default Category;
