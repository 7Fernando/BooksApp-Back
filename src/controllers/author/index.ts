import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getAuthorByName } from "../../helpers33/author";
const prisma = new PrismaClient();

export const getAuthor = async (req: Request, res: Response) => {
    const name: any = req.query.name
    console.log(name)
    if (!name) {
        try {
            const result = await prisma.author.findMany({})
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(200).send(await getAuthorByName(name))
    }
}


export const getAuthorById = (req: Request, res: Response) => {
    
 }
