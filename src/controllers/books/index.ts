import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {getBookByName} from '../../Helpers/books'
const prisma = new PrismaClient();

export const getBooks = async (req: Request, res: Response) => {
  const name: any = req.query.name || undefined
  if(!req.query.name){
    const books = await prisma.book.findMany();
    try {
      res.send(books);
    } catch (error) {
      console.error(error);
    }
  }else{
    const booksByName: any  = await getBookByName(name)
    if(booksByName.length){
      res.status(200).send(booksByName)
    } else {
      res.status(404).send(["No book found with that name"])
    }
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: true,
        topic: true,
        language: true,
      },
    });
    res.send(book);
  } catch (error) {
    console.error(error);
  }
};

// export const getBookByName = async (name: string) => {
// console.log(name)
//   try {
//     let bookNameFound = await prisma.book.findMany({
//       where: { title: { contains: name, mode: "insensitive" } },
//     });

//     return(bookNameFound);
//   } catch (error) {
//     console.error(error);
//   }
// };
