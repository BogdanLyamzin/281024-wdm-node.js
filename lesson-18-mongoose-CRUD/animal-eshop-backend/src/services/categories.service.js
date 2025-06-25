import {rename} from "node:fs/promises";
import * as path from "node:path";

import Category from "../db/Category.js";

const categoriesDir = path.resolve("public", "categories");

export const getCategories = ()=> Category.find();

export const addCategory = async ({payload, file}) => {
    const {path: oldPath, filename} = file;
    const newPath = path.join(categoriesDir, filename);
    await rename(oldPath, newPath);
    const image = path.join("public", "categories", filename);
    return Category.create({...payload, image});
}; 