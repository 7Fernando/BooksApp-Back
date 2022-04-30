import Stripe from "stripe";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { analytics } from "googleapis/build/src/apis/analytics";

import { saveData } from "../../helpers33/checkout";

const {STRIPE_URL} = process.env
const prisma = new PrismaClient();
const { CHECKOUT_KEY } = process.env;
//console.log("keyDelEnv:", CHECKOUT_KEY);
const stripe = new Stripe(CHECKOUT_KEY || "", {
  apiVersion: "2020-08-27",
});

export const postCheckout = async (req: Request, res: Response) => {
  try {
         //email, payment_method and plan from front
    const { email, payment_method, idPlan } = req.body;
//console.log(111,req.headers)
    const plans = [
      { id: 1, name: "price_1KqMdzJx3UlXGWRuxLcF5HWs" },
      { id: 2, name: "price_1KqMgDJx3UlXGWRu7GTGcMpr" },
      { id: 3, name: "price_1KqMgvJx3UlXGWRuLsHJvt2D" },
    ];
    const choosenPlan = plans.find((p) => p.id === Number(idPlan));
    //console.log(115, choosenPlan)
    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email: email,
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: choosenPlan?.name }],
      expand: ["latest_invoice.payment_intent"],
    });


    if(subscription.id){
      console.log(24, email)
      saveData(subscription, email)
    }
    const status = subscription["latest_invoice"]; //['payment_intent']//['status'] || "something failed" //['payment_intent']['status'];
    const client_secret = subscription["latest_invoice"]; //['payment_intent']['client_secret'];
    
    res.json({
      hola: subscription,
    });
    //res.json({hola:subscription})
  } catch (error:any) {
    console.error("ellll", error);
    res.send(error.raw.message )
  }
}

export const getConfirmation = (req: Request, res: Response) =>{
  try {
    res.send("Already paid")
  } catch (error) {
    res.send({"Error in getConfirmation": error})
  }
}

// export const postSubInfo = (req: Request, res: Response)=>{
//   try {



//   } catch (err){
//     console.error(err)
//   }



// }




export const updateSubscription = async (req: Request, res: Response) => {
  try {
    
    const {email, idPlan} = req.body;
    const user = await prisma.user.findUnique({
      where: { mail: email },
    });
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    } else {
      const plans: any =  [
        { id: 1, name: "price_1KqMdzJx3UlXGWRuxLcF5HWs", title:"HOBBY" },
        { id: 2, name: "price_1KqMgDJx3UlXGWRu7GTGcMpr", title:"GROWTH" },
        { id: 3, name: "price_1KqMgvJx3UlXGWRuLsHJvt2D", title:"LOVER" },
      ];
      const updateUser = await prisma.user.update({
        where: { mail: email },
        data: { plan: plans[idPlan-1]?.title },


      });
      res.status(200).json(updateUser);
  }

  } 


  catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }

}
