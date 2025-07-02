import {rename} from "node:fs/promises";
import * as path from "node:path";

import Product from "../db/Product.js";
import Category from "../db/Category.js";

const categoriesDir = path.resolve("public", "categories");

export const getCategories = ()=> Category.find();

export const getCategoryById = async id => {
    const category = await Category.findById(id);
    const products = await Product.find({category: category._id}).populate("category", "name");
    return {
        category,
        products,
    }
}

export const addCategory = async ({payload, file}) => {
    const {path: oldPath, filename} = file;
    const newPath = path.join(categoriesDir, filename);
    await rename(oldPath, newPath);
    const image = path.join("categories", filename);
    return Category.create({...payload, image});
}; 