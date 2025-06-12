import Category from "../db/Category.js";

export const getCategories = ()=> Category.findAll();