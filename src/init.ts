import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { seedAuthors } from "./sedders/authors";
import { seedTopics } from "./sedders/topics";
import { seedLenguajes } from "./sedders/languages";
import { seedBooks } from "./sedders/books";
const prisma = new PrismaClient();

// const getInfo = async (prop: string) => {
//   const { data } = await axios.get("https://gutendex.com/books/?languages=es");
//   let result: any = [];

//   console.log(data);

//   prop !== "books"
//     ? data.results.forEach((element: any) => {
//         prop === "authors"
//           ? element.authors.map((element: { name: string }) => {
//               result.push({ name: element.name.replace(",", "") });
//               result = [...new Set(result)];
//             })
//           : // ? element.authors.map((element: { name: string }) => {
//             //     result.push(element.name);
//             //     result = [...new Set(result)];
//             // })
//             element[prop].map((element: string) => {
//               result.push({ name: element });
//               result = [...new Set(result)];
//             });
//       })
//     : (result = data.results.map((element: any) => ({
//         title: element.title,
//         cover: element.formats["image/jpeg"],
//         topics: element.bookshelves.map((element: any) => ({
//           name: element,
//         })),
//         epub: element.formats["application/epub+zip"],
//         authors: element.authors.map((element: { name: string }) => ({
//           name: element.name.replace(",", ""),
//         })),
//         languages: element.languages.map((element: any) => ({
//           name: element,
//         })),
//       })));
//   return result;
// };

export const init = async () => {
  // const [books, topics, authors, languages] = await Promise.all([
  //   getInfo("books"),
  //   getInfo("bookshelves"),
  //   getInfo("authors"),
  //   getInfo("languages"),
  // ]);

  


  

  let verificator = await prisma.book.findMany({});

  if (verificator.length === 0) {
    await prisma.author.createMany({ data: seedAuthors, skipDuplicates: true });
    await prisma.topic.createMany({ data: seedTopics, skipDuplicates: true });
    await prisma.language.createMany({
      data: seedLenguajes,
      skipDuplicates: true,
    });

    const promesa = await Promise.all([
      seedBooks.map(async (b: any) => {
        let arrayAuthor: any = [];
        let arrayLanguage: any = [];
        let arrayTopic: any = [];

        let newBook = await prisma.book.create({
          data: {
            title: b.title,
            cover: b.cover,
            epub: b.epub,
          },
        });

        b.authors.map(async (a: any) => {
          let findAutores = await prisma.author.findUnique({
            where: {
              name: a.name,
            },
          });
          arrayAuthor.push({ id: findAutores?.id });
          await prisma.book.update({
            where: { id: newBook.id },
            data: { author: { connect: arrayAuthor } },
          });
        });

        b.topics.map(async (t: any) => {
          let findTopic = await prisma.topic.findUnique({
            where: {
              name: t.name,
            },
          });
          arrayTopic.push({ id: findTopic?.id });
          await prisma.book.update({
            where: { id: newBook.id },
            data: { topic: { connect: arrayTopic } },
          });
        });

        b.languages.map(async (l: any) => {
          let findLanguages = await prisma.language.findUnique({
            where: {
              name: l.name,
            },
          });
          arrayLanguage.push({ id: findLanguages?.id });
          await prisma.book.update({
            where: { id: newBook.id },
            data: { language: { connect: arrayLanguage } },
          });
        });
      }),
    ]);
  }

  console.log("DATABASE SUCCESSFUL");
};
