import Product from "../db/Product.js";

import {
  productAddSchema,
  productUpdateSchema,
} from "../validation/product.schemas.js";

import controllerErrorHandler from "../decorators/ControllerErrorHandler.js";

import HttpException from "../utils/HttpException.js";

const getProductController = async (req, res) => {
  const result = await Product.findAll();
  res.json(result);
};

const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id);

  if (!result) throw HttpException(404, `product with id=${id} not found`);

  res.json(result);
};

const addProductController = async (req, res) => {
  // await productAddSchema.validate(req.body);
  const result = await Product.create(req.body);

  res.status(201).json(result);
};

const updateProductByIdController = async (req, res) => {
  // await productUpdateSchema.validate(req.body);

  const { id } = req.params;
  const result = await Product.findByPk(id);

  if (!result) throw HttpException(404, `product with id=${id} not found`);

  await result.update(req.body);
  // result.price = req.body.price;

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
