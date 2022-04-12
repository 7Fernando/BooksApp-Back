import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  try {
    res.send(books);
  } catch (error) {
    console.error(error);
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

export const getBookByName = async (req: Request, res: Response) => {
  const name: any = req.query.name;

  try {
    let bookNameFound = await prisma.book.findMany({
      where: { title: { contains: name, mode: "insensitive" } },
    });

    res.send(bookNameFound);
  } catch (error) {
    console.error(error);
  }
};
