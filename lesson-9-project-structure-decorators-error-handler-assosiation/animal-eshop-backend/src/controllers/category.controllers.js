import Category from "../db/Category.js";

import controllerErrorHandler from "../decorators/controllerErrorHandler.js";

const addCategoryController = async(req, res)=> {
    const result = await Category.create(req.body);

    res.status(201).json(result);
}

export default {
    addCategoryController: controllerErrorHandler(addCategoryController)
}