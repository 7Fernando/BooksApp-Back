import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getBookByName, newBook } from "../../helpers33/books";
const prisma = new PrismaClient();

export const getBooks = async (req: Request, res: Response) => {
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

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(book);
  } catch (error) {
    console.error(error);
  }
};

export const getBooksUser = async (req: Request, res: Response) => {
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
      res.status(404).send(booksByName);
    }
  }
};

export const incrementLikeBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (id) {
      await prisma.book.update({
        where: {
          id: id,
        },
        data: {
          like: {
            increment: 1,
          },
        },
      });
      res.status(200).send({ msg: "incremet like successfully" });
    } else {
      res.status(400).send({ msg: "incremet like rejected" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const decrementLikeBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (id) {
      await prisma.book.update({
        where: {
          id: id,
        },
        data: {
          like: {
            decrement: 1,
          },
        },
      });
      res.status(200).send({ msg: "decrement like successfully" });
    } else {
      res.status(400).send({ msg: "decrement like rejected" });
    }
  } catch (error) {
    console.error(error);
  }
};


