
import { Request, Response } from "express";
import { Favorite, PrismaClient } from "@prisma/client";
import {saveFavourite } from '../../helpers33/favorite';
const prisma = new PrismaClient();


export const getFavorite = async (req: Request, res: Response)=>{
    try{
        const id : any = req.query.id
        const favorites = await prisma.favorite.findMany({
            where:{userId: Number(id)},
            include:{
                book: true
            }
        })
        favorites.length !==0 ? res.status(200).send(favorites) : res.send([])
    }catch(error){
        console.log(error)
    }
}


export const postFavorite = async( req: Request, res: Response)=>{
    try{
        const userId = req.body.userId
        const bookId = req.body.bookId
        const favorite = await prisma.favorite.findMany({
            where:{
                user:{mail: userId}, 
                bookId: Number(bookId)
            }
        })
        if(favorite.length === 0){
            const newFavorite = await saveFavourite(userId, bookId)
            console.log(favorite)
            res.status(200).send(newFavorite)
        }else{
            res.status(200).send("favorite already exists")
        }
    }catch(error){
        console.log(error)
    }

    
//     try{
//         const {userId, bookId} = req.body
//         const newFavorite = await saveFavourite( userId , bookId);
//         newFavorite? res.status(400).send("no hay favorito") : res.status(200).send(newFavorite)
//     }catch(error){
//         console.log(error)
//     }
// }
}

export const removeFavorite = async( req: Request, res: Response)=>{
    try{
        const userId = req.query.userId
        const bookId = req.query.bookId
        const newFavorite = await prisma.favorite.deleteMany({
            where:{
                userId: Number(userId),
                bookId: Number(bookId)
            }
        })
        newFavorite? res.status(200).send(newFavorite) : res.status(400).send("no hay favorito")
    }catch(error){
        console.log(error)
    }
}
