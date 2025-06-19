import Category from "../db/Category.js";

export const getCategories = () => Category.find();

// export const getCategoryById = _id => Category.findOne({_id});
export const getCategoryById = id => Category.findById(id);

export const addCategory = (payload) => Category.create(payload);

export const updateCategoryById = (id, payload) =>
  Category.findByIdAndUpdate(id, payload, {new: true});

export const deleteCategoryById = id => Category.findByIdAndDelete(id);
