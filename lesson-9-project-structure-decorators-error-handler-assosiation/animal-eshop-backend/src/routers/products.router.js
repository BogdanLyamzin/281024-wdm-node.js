import { Router } from "express";
import { ValidationError } from "sequelize";

import Product from "../db/Product.js";

import { productAddSchema, productUpdateSchema } from "../validation/product.schemas.js";

import HttpException from "../utils/HttpException.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const result = await Product.findAll(); 
    res.json(result);
  }
  catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByPk(id);
  
    if (!result) throw HttpException(404, `product with id=${id} not found`);
  
    res.json(result);
  }
  catch(error) {
    const {status = 500, message} = error;
    res.status(status).json({
      message,
    });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    // await productAddSchema.validate(req.body);
    const result = await Product.create(req.body);

    res.status(201).json(result); 
  } catch (error) {
    if(error instanceof ValidationError) {
      error.status = 400;
    }
    const {status = 500, message} = error;
    res.status(status).json({
      message,
    });
  }
});

productsRouter.put("/:id", async (req, res) => {
  try {
    // await productUpdateSchema.validate(req.body);

    const { id } = req.params;
    const result = await Product.findByPk(id);

    if (!result) throw HttpException(404, `product with id=${id} not found`);

    await result.update(req.body);
    // result.price = req.body.price;

    res.json(result);
  } catch (error) {
    if(error instanceof ValidationError) {
      error.status = 400;
    }
    const {status = 500, message} = error;
    res.status(status).json({
      message,
    });
  }
});

productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id);

  if (!result) {
    return res.status(404).json({
      message: `product with id=${id} not found`,
    });
  }

  await result.destroy();

  res.json(result);
});

export default productsRouter;
