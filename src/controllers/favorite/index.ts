
import { Request, Response } from "express";
import { Favorite, PrismaClient } from "@prisma/client";
import {saveFavourite } from '../../helpers33/favorite';
const prisma = new PrismaClient();


export const getFavorite = async (req: Request, res: Response)=>{
    try{
        const mail : any = req.query.mail
        const findUser =  await prisma.user.findUnique({
            where:{
                mail: mail
            }
        })
        let  data 
        if(findUser){
        data = await prisma.favorite.findMany({
            where:{userId: Number(findUser.id)},
            include:{
                book: true
            }
        }) 
        res.status(200).send(data)
    }else{
        res.send([])
    }  
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
}



export const removeFavorite = async( req: Request, res: Response)=>{
    try{
        const userId : any= req.query.userId
        const bookId = req.query.bookId
        const findUser =  await prisma.user.findUnique({
            where:{
                mail: userId
            }
        })

        const removeFavorite = await prisma.favorite.deleteMany({
            where:{
                userId: findUser?.id,
                bookId: Number(bookId)
            }
        })
        removeFavorite ? res.status(200).send(removeFavorite) : res.status(400).send("no hay favorito")
    }catch(error){
        console.log(error)
    }
}


