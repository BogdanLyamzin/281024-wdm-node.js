import express from "express";
import cors from "cors";
import Stripe from "stripe";
import "dotenv/config";

const { STRIPE_SECRET_KEY, STRIPE_FRONTEND_URL } = process.env;

const stripe = new Stripe(STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/payment/payment-session", async (req, res) => {
  const { name, price } = req.body;

  const session = await stripe.checkout.sessions.create({
    success_url: `${STRIPE_FRONTEND_URL}/success-payment`,
    cancel_url: `${STRIPE_FRONTEND_URL}/cancel-payment`,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name,
          },
          unit_amount: price * 100
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  res.json(session);
});

app.listen(3000, () => console.log("Server running on 3000 PORT"));
