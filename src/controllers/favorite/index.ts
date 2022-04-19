
import { Request, Response } from "express";
import { Favorite, PrismaClient } from "@prisma/client";
import {saveFavourite } from '../../helpers33/favorite';
const prisma = new PrismaClient();


export const getFavorite = async (req: Request, res: Response)=>{
    try{
        const favorites = await prisma.favorite.findMany({
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
    try{
        const {userId, bookId} = req.body
        const newFavorite = await saveFavourite( userId , bookId);
        newFavorite? res.status(200).send(newFavorite) : res.status(400).send("no hay favoritos")
    }catch(error){
        console.log(error)
    }
}


export const removeFavorite = async( req: Request, res: Response)=>{
    const id  = req.params.id
    const user = await prisma.favorite.delete({
        where:{
             id: Number(id)
        }
    })
   user? res.status(200).send(user) : res.status(404).send('No se puede eliminar')
}


