import Category from "../db/Category.js";

export const getCategories = ()=> Category.find();

export const addCategory = payload => Category.create(payload); 