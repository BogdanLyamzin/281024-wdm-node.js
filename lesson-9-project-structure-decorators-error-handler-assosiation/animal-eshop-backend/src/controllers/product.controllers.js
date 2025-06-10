import Product from "../db/Product.js";
import Category from "../db/Category.js";

import controllerErrorHandler from "../decorators/ControllerErrorHandler.js";

import HttpException from "../utils/HttpException.js";

const getProductController = async (req, res) => {
  const result = await Product.findAll({
    include:{
      model: Category,
      as: "category"
    }
  });
  res.json(result);
};

const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id);

  if (!result) throw HttpException(404, `product with id=${id} not found`);

  res.json(result);
};

const addProductController = async (req, res) => {
  const result = await Product.create(req.body);

  res.status(201).json(result);
};

const updateProductByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id);

  if (!result) throw HttpException(404, `product with id=${id} not found`);

  await result.update(req.body);

  res.json(result);
};

const deleteProductByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id);

  if (!result) HttpException(404, `product with id=${id} not found`);

  await result.destroy();

  res.json(result);
};

export default {
  getProductController: controllerErrorHandler(getProductController),
  getProductByIdController: controllerErrorHandler(getProductByIdController),
  addProductController: controllerErrorHandler(addProductController),
  updateProductByIdController: controllerErrorHandler(updateProductByIdController),
  deleteProductByIdController: controllerErrorHandler(deleteProductByIdController),
};
