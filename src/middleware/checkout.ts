const { CHECKOUT_KEY } = process.env;
import { PrismaClient } from "@prisma/client";
const stripe = require('stripe')(CHECKOUT_KEY);
import { Response, Request, NextFunction } from "express";

const prisma = new PrismaClient();
 
export const checkSub = async (req:Request,res:Response, next:NextFunction) =>{
    const { usermail } = req.headers;
    console.log(77,req.headers)
    const user = await prisma.user.findUnique({
        where: {
            mail: String(usermail)
        }
    })
    const subscription =  user?.subId ? await stripe.subscriptions.retrieve( user?.subId) : "You are not registered"
console.log(subscription)
      if(subscription?.status === "active"){
        next()
      }else{
          res.send( "You are not registered" )
      }
}