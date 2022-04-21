
import { Request, Response } from "express";
import { Favorite, PrismaClient } from "@prisma/client";
import {saveFavourite } from '../../helpers33/favorite';
const prisma = new PrismaClient();


export const getFavorite = async (req: Request, res: Response)=>{
    // const id: any = req.query.id
    // try{
        
    //     const favorites = await prisma.user.findMany({
    //         where:{
    //             id: Number(id)
    //         },
    //         include:{
    //             favorite: true
    //         }
    //     })
    //     favorites.length !==0 ? res.status(200).send(favorites) :
    //     res.status(400).send("No hay favoritos")
    // }catch(error){
    //     console.log(error)
    // }

    try{
        const id : any = req.query.id
        const favorites = await prisma.favorite.findMany({
            where:{userId: Number(id)},
            include:{
                book: true
            }
        })
        favorites.length !==0 ? res.status(200).send(favorites) :
        res.status(400).send("No hay favoritos")
    }catch(error){
        console.log(error)
    }
}


export const postFavorite = async( req: Request, res: Response)=>{
    const {userId, bookId} = req.body
    try{
         const newFavorite = await saveFavourite( userId , bookId);
         res.status(200).send(newFavorite) 
    }catch(error){
        console.log(error)
    }
}


export const removeFavorite = async( req: Request, res: Response)=>{
//     const {favoriteId} = req.query
//     const eliminado = await prisma.favorite.delete({
//         where:{
//              id: Number(favoriteId)
//         }
//     })
    
//    eliminado? res.status(200).send(eliminado) : res.status(404).send('No se puede eliminar')
    try{
    //const userId : any = req.query.userId
    const bookId: any = req.query.bookId
    const newFavorite = await prisma.favorite.deleteMany({
        where:{
            //userId: Number(userId),
            bookId: Number(bookId)
        }
    })
    newFavorite? res.status(200).send(newFavorite) : res.status(400).send('borrado')
    }catch(error){
    console.log(error)
}
}


