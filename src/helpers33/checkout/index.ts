import { Book, PrismaClient } from "@prisma/client";
import { connect } from "http2";
const prisma = new PrismaClient();

export const saveData = async (subscription: any, email: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        mail: email,
      },
    });

    const userDate = await prisma.subInfo.create({
      data: {
        currentStart: subscription.current_period_start,
        currentEnd: subscription.current_period_end,
        ticket: subscription?.latest_invoice?.hosted_invoice_url,
        total: subscription.plan.amount,
        userId: Number(user?.id),
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateData = async (subscription: any, email: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        mail: email,
      },
    });

    const userDate = await prisma.subInfo.create({
      data: {
        currentStart: subscription.current_period_start,
        currentEnd: subscription.current_period_end,
        ticket: subscription?.items.url,
        total: subscription.plan.amount,
        userId: Number(user?.id),
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (email: any) => {
  try {
    const notSub: any = "NOT_SUBSCRIBED";
    const updateSubUser = await prisma.user.update({
      where: {
        mail: email,
      },
      data: { plan: notSub, subId: null },
    });
    console.log(111, updateSubUser);
    return updateSubUser;
  } catch (err) {
    console.error(err);
  }
};
