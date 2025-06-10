import { Router } from "express";

import { productAddSchema, productUpdateSchema } from "./products.dto.js";

import Product from "./product.model.js";

const productsRouter = Router();

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
