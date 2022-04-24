import { Book, PrismaClient } from "@prisma/client";
import { connect } from "http2";
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

 export const newBook = async (data: any)=>{
  //  const findBook = await prisma.book.findUnique({
  //    where:{
  //      id: data.id
  //    }
  //  })
  //  if(!findBook){
     const newNewBook : Book =await prisma.book.create({
       data:{
         id: data.id,
         title: data.title,
         cover: data.cover,
         epub:  data.epub,
         topic: {
           connectOrCreate:{
             where:{
               name: data.topic

             },
             create:{
               name : data.topic
             }
           }
         },
         author: {
           connectOrCreate:{
             where:{
               name: data.author
             },
             create: {
               name : data.author
             }
           }
         },
         language :{
           connectOrCreate:{
             where:{
               name: data.language
             },
             create: {
               name: data.language
             }
           }
         }

       }
     })
     
     return newNewBook
  
 }   