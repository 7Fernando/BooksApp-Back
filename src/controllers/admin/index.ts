import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getBookByName,} from "../../helpers33/books";
const prisma = new PrismaClient();
import { jwtCheck } from "../../middleware/auth";




export const getBooksUser = async (req: Request, res: Response) => {
    //console.log(jwtCheck);
  
    const name: any = req.query.name || undefined;
    if (!req.query.name) {
      const books = await prisma.book.findMany();
      try {
        res.send(books);
      } catch (error) {
        console.error(error);
      }
    } else {
      const booksByName: any = await getBookByName(name);
      if (booksByName.length) {
        res.status(200).send(booksByName);
      } else {
        res.status(404).send(["No book found with that name"]);
      }
    }
  };