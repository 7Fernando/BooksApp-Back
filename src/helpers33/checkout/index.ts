import { Book, PrismaClient } from "@prisma/client";
import { connect } from "http2";
const prisma = new PrismaClient();

export const saveData = async (subscription: any, email: any) => {
    try{
//  var myDate = new Date( 1651266930 *1000);
// console.log(myDate.toGMTString()+myDate.toLocaleString());
        const user = await prisma.user.findUnique({
            where: {
                mail: email
            },
        })
        console.log(user)
        console.log(22, subscription)
        const userDate = await prisma.subInfo.create({
            data: {
                currentStart: subscription.current_period_start,
                currentEnd: subscription.current_period_end ,
                ticket: subscription.latest_invoice.hosted_invoice_url ,
                total: subscription.plan.amount,
                userId: Number(user?.id)   
            }
        })
    }
    catch(err){
        console.error(err)
    }
}