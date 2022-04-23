import Stripe from "stripe";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { analytics } from "googleapis/build/src/apis/analytics";

// const {STRIPE_URL} = process.env

const { CHECKOUT_KEY } = process.env;
//console.log("keyDelEnv:", CHECKOUT_KEY);
const stripe = new Stripe(CHECKOUT_KEY || "", {
  apiVersion: "2020-08-27",
});

export const postCheckout = async (req: Request, res: Response) => {
  try {
         //email, payment_method and plan from front
    const { email, payment_method, idPlan } = req.body;

    const plans = [
      { id: 1, name: "price_1KqMdzJx3UlXGWRuxLcF5HWs" },
      { id: 2, name: "price_1KqMgDJx3UlXGWRu7GTGcMpr" },
      { id: 3, name: "price_1KqMgvJx3UlXGWRuLsHJvt2D" },
    ];
    const plan = plans.find((p) => p.id === idPlan);

    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email: email,
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: plan?.name }],
      expand: ["latest_invoice.payment_intent"],
    });

    const status = subscription["latest_invoice"]; //['payment_intent']//['status'] || "something failed" //['payment_intent']['status'];
    const client_secret = subscription["latest_invoice"]; //['payment_intent']['client_secret'];

    res.json({
      hola: subscription,
      client_secret: client_secret,
      status: status,
    });
    //res.json({hola:subscription})
  } catch (error) {
    console.error("ellll", error);
  }
};
