import axios from "axios"
import { Language, Topic, Book, Author, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const getInfo = async (prop: string) => {
    const { data } = await axios.get("https://gutendex.com/books/")
    let result: string[] = []
    prop !== "books" ? (
        data.results.forEach((element: any) => {
            prop === "authors" ? (element.authors.map((element: { name: string }) => {
                result.push(element.name)
                result = [...new Set(result)]
            })) :
                element[prop].map((element: string) => {
                    result.push(element)
                    result = [...new Set(result)]
                })
        })
    ) : (result = data.results.map((element: any) => (
        {
            title: element.title,
            cover: element.formats["image/jpeg"],
            topics: element.bookshelves,
            author: element.authors,
            languages: element.languages
        }

    )))
    return result
}

export const init = async () => {
    try {
        const verify = await prisma.book.findMany({});
        // if (!verify.length) {
            const [
                books,
                topics,
                author,
                languages
            ] = await Promise.all([
                getInfo("books"),
                getInfo("bookshelves"),
                getInfo("authors"),
                getInfo("languages")
            ]);
            books.map((book: any) => console.table(book.author))
            topics.map(async (element: any) => {
                await prisma.topic.upsert({
                    where: {
                        name: element
                    },
                    update: {},
                    create: {
                        name: element
                    }
                })
            });
            // author.map(async (element: string) => {
            //     await prisma.author.upsert({
            //         where: {
            //             name: element
            //         },
            //         update: {name:element},
            //         create: {
            //             name: element
            //         }
            //     })
            // });
            languages.map(async (element: any) => {
                await prisma.language.upsert({
                    where: {
                        name: element
                    },
                    update: {},
                    create: {
                        name: element
                    }
                })
            });

            console.log(books)
            books.map(async (element: any) => {
                
                await prisma.book.create({
                    data: {
                        title: element.title,
                        cover: element.cover,
                        // topic: {
                        //     connect: {
                        //         name: element.topics,
                        //     }
                        // },
                        // language: {
                        //     connect: {
                        //         name: element.languages
                        //     },
                        // },
                        // author:{
                        //     connect:{
                        //         name: element.author[0].name
                        //     },
                        // }

                    }
                    // author: element.authors,

                }
                )
        });
   // }
    } catch (error) {
    console.log(error)
}
}