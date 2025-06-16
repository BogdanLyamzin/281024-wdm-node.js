import Category from "../db/Category.js";

export const getCategories = ()=> Category.findAll();

export const addCategory = payload => Category.create(payload); // throw new Error()