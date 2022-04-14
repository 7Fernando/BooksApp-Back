import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getBookByName = async (name: string) => {
    console.log(name)
      try {
        let bookNameFound = await prisma.book.findMany({
          where: { title: { contains: name, mode: "insensitive" } },
        });
        return(bookNameFound);
      } catch (error) {
        console.log(error);
      }
    };