import {Schema, model} from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 50,
    },
    image: {
        type: String,
    }
}, {versionKey: false, timestamps: true});

const Category = model("category", categorySchema);

export default Category;