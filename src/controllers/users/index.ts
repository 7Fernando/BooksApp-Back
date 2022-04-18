import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { newUser } from '../../helpers33/users';
const prisma = new PrismaClient();

export const getUser = async(req: Request, res: Response ) => {
    try {
        const allUser = await prisma.user.findMany()
        allUser.length !==0 ? res.status(200).send(allUser) : res.status(404).send({msg:"User not found"})
        
    } catch (error) {
        console.error(error)
    }
}

export const postUser = async (req: Request, res: Response) => { 
    try {
        const { name, mail, picture } = req.body
        const newNewUser: any = await newUser({ name, mail, picture }); //CORREGIR EL TIPO DE DATO
        newNewUser? res.status(201).send("User created") : res.status(400).send("User not created")
    } catch (error) {
        console.error(error)
    }
}