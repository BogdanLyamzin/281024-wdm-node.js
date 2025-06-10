import { Router } from "express";
import * as Yup from "yup";

import Product from "../db/Product.js";

const productsRouter = Router();

const productAddSchema = Yup.object({
  name: Yup.string().required(),
  // category: Yup.string().required(),
  // animal: Yup.string().required(),
  price: Yup.number().min(0).required(),
  // stock: Yup.number().min(0).required(),
  // brand: Yup.string().required(),
  description: Yup.string().required(),
  // image: Yup.string().required(),
});

const productUpdateSchema = Yup.object({
  name: Yup.string(),
  // category: Yup.string(),
  // animal: Yup.string(),
  price: Yup.number().min(0),
  // stock: Yup.number().min(0),
  // brand: Yup.string(),
  description: Yup.string(),
  // image: Yup.string(),
});

productsRouter.get("/", async (req, res) => {
  const result = await Product.findAll();
  res.json(result);
});

productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id);

  if (!result) {
    return res.status(404).json({
      message: `product with id=${id} not found`,
    });
  }

  res.json(result);
});

productsRouter.post("/", async (req, res) => {
  try {
    await productAddSchema.validate(req.body);
    const result = await Product.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

productsRouter.put("/:id", async (req, res) => {
  try {
    await productUpdateSchema.validate(req.body);

    const { id } = req.params;
    const result = await Product.findByPk(id);

    if (!result) {
      return res.status(404).json({
        message: `product with id=${id} not found`,
      });
    }

    await result.update(req.body);
    // result.price = req.body.price;

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
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
