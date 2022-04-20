import { Request, Response } from "express";
import { Favorite, PrismaClient } from "@prisma/client";
import { newUser, saveFavourite } from '../../helpers33/users';
const prisma = new PrismaClient();

export const getUser = async(req: Request, res: Response ) => {
    try {
        const allUser = await prisma.user.findMany({
            include:{
                favorite: true
            }
        })
        allUser.length !==0 ? res.status(200).send(allUser) : res.status(404).send({msg:"User not found"})
        
    } catch (error) {
        console.error(error)
    }
}

export const postUser = async (req: Request, res: Response) => { 
    try {
        const { name, mail, picture } = req.body
        const newNewUser = await newUser({ name, mail, picture }); //CORREGIR EL TIPO DE DATO
        newNewUser? res.status(201).send("User created") : res.status(400).send("User not created")
    } catch (error) {
        console.error(error)
    }
}

export const postFavorite = async( req: Request, res: Response)=>{
    try{
        const {userId, bookId} = req.body
        const newFavorite = await saveFavourite( userId , bookId);
        newFavorite? res.status(200).send(newFavorite) : res.status(400).send("no hay favoritos")
    }catch(error){
        console.log(error)
    }
}


// export const getFavoriteBooks = async (userId: any) => {
//     try {
//       const bookId = await prisma.user.findUnique({
//         where: {
//           userId 
//         },
//         select: {
//           favorite: true,
//         },
//       });
  
//       const favorite = bookId?.favorite.map((e) => e);
  
//       const allBooks = await prisma.book.findMany({
//         where: {
//           id: {
//             in: favorite,
//           },
//         },
//       });
  
//       return allBooks;
//     } catch (error) {
//       return null;
//     }
//   };