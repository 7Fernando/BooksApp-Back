import Stripe from "stripe";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// const {STRIPE_URL} = process.env

const { STRIPE_URL } = process.env;

const stripe = new Stripe(STRIPE_URL || "", {
  apiVersion: "2020-08-27",
});

export const postCheckout = async (req: Request, res: Response) => {
  try {
    const { email, payment_method } = req.body;

    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email: email,
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: "plan_G......" }],
      expand: ["latest_invoice.payment_intent"],
    });

    // const status = subscription["latest_invoice"]["payment_intent"]["status"];
    // const client_secret =
    //   subscription["latest_invoice"]["payment_intent"]["client_secret"];

    // res.json({ client_secret: client_secret, status: status });
  } catch (error) {
    console.error(error);
  }
};
