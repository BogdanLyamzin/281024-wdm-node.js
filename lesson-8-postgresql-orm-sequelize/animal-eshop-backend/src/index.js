import express from "express";
import cors from "cors";
import * as Yup from "yup";

import products from "./db/products.js";

const productAddSchema = Yup.object({
  name: Yup.string().required(),
  category: Yup.string().required(),
  animal: Yup.string().required(),
  price: Yup.number().min(0).required(),
  stock: Yup.number().min(0).required(),
  brand: Yup.string().required(),
  description: Yup.string().required(),
  image: Yup.string().required(),
});

const productUpdateSchema = Yup.object({
  name: Yup.string(),
  category: Yup.string(),
  animal: Yup.string(),
  price: Yup.number().min(0),
  stock: Yup.number().min(0),
  brand: Yup.string(),
  description: Yup.string(),
  image: Yup.string(),
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json(products);
});
// :id - параметр маршрута
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = products.find((item) => item.id === id);

  if (!result) {
    return res.status(404).json({
      message: `product with id=${id} not found`,
    });
  }

  res.json(result);
});

app.post("/api/products", async (req, res) => {
  try {
    await productAddSchema.validate(req.body);
    const id = products[products.length - 1].id + 1;
    const newProduct = { ...req.body, id };
    products.push(newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    await productUpdateSchema.validate(req.body);
    const id = Number(req.params.id);
    const idx = products.findIndex((item) => item.id === id);
    if (idx === -1) {
      return res.status(404).json({
        message: `product with id=${id} not found`,
      });
    }

    products[idx] = { ...products[idx], ...req.body };

    res.json(products[idx]);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = products.findIndex((item) => item.id === id);
  if (idx === -1) {
    return res.status(404).json({
      message: `product with id=${id} not found`,
    });
  }

  const [result] = products.splice(idx, 1);

  // res.status(204).send();
  res.json(result);
});

app.listen(3000, () => console.log("Server running on 3000 port"));
