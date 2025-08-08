import express from "express";
import cors from "cors";
import Stripe from "stripe";
import "dotenv/config";

const { STRIPE_SECRET_KEY, STRIPE_FRONTEND_URL, STRIPE_WEBHOOK_SECRET } = process.env;

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

app.post("/api/payment/payment-webhook", async(req, res)=> {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
    }
    catch(error) {
        console.log(error);
        return res.status(400).json({
            message: "Webhook error"
        });
    }
    if(event.type === "payment_intent.succeeded") {
        const payment_intent = event.data.object;
    }
})

app.listen(3000, () => console.log("Server running on 3000 PORT"));
