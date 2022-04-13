import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getAuthorByName } from "../../Helpers/author";
const prisma = new PrismaClient();

export const getAuthor = async (req: Request, res: Response) => {
  const name: any = req.query.name;
  if (!name) {
    try {
      const result = await prisma.author.findMany({ include: { book: true } });
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(200).send(await getAuthorByName(name));
  }
};

export const getAuthorById = (req: Request, res: Response) => {};

export const getAuthorExactName = async (req: Request, res: Response) => {
  const name: any = req.query.name;
  try {
    let result = await prisma.author.findUnique({
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
