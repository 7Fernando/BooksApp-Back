import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getLanguage = async (req: Request, res: Response) => {
  try {
    let result = await prisma.language.findMany({ include: { book: true } });
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
};

export const getBookExactLanguage = async (req: Request, res: Response) => {
    const name: any = req.query.name;
    try {
      let result = await prisma.language.findUnique({
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
