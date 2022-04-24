import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getBookByName, newBook } from "../../helpers33/books";
const prisma = new PrismaClient();
import { jwtCheck } from "../../middleware/auth";

export const getBooks = async (req: Request, res: Response) => {
  console.log(jwtCheck);

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

export const postNewBook = async (req: Request, res: Response) => {
  const { title, cover, epub, author, topic, language } = req.body;
  try {
    const newNewBook = await newBook({
      title,
      cover,
      epub,
      author,
      topic,
      language,
    });
    newNewBook
      ? res.status(200).send(newNewBook)
      : res.status(404).send({ msg: "Book not created" });
  } catch (error) {
    console.log(error);
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
