import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getTopic = async (req: Request, res: Response) => {
  try {
    let result = await prisma.topic.findMany({ include: { book: true } });
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
};

export const getAuthorExactTopic = async (req: Request, res: Response) => {
    const name: any = req.query.name;
    try {
      let result = await prisma.topic.findUnique({
        where: { name: name },
        include: { book: true },
      });
      result
      ?res.status(200).send(result)
      :res.status(404).send({msg:"No found"})
      
    } catch (error) {
      console.error(error);
    }
  };
