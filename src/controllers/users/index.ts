import { Request, Response } from "express";
import { Favorite, PrismaClient } from "@prisma/client";
import { newUser  } from '../../helpers33/users';
const prisma = new PrismaClient();

export const getUser = async(req: Request, res: Response ) => {
    try {
        const allUser = await prisma.user.findMany({
            include:{
                favorite: true,
            }
        })
        allUser.length !==0 ? res.status(200).send(allUser) : res.status(404).send({msg:"User not found"})
        
    } catch (error) {
        console.error(error)
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include:{
                favorite: true,
            }
        })
        user ? res.status(200).send(user) : res.status(404).send({msg:"User not found"})
    } catch (error) {
        console.error(error)
    }
}



export const postUser = async (req: Request, res: Response) => { 
    try {
        const { name, mail, picture } = req.body;
        const newNewUser = await newUser({ name, mail, picture }); //CORREGIR EL TIPO DE DATO
        newNewUser? res.status(201).send(newNewUser) : res.status(400).send("User not created")
    } catch (error) {
        console.error(error)
    }
}


export const modifyUser = async (req: Request, res: Response) =>{
    try{
        const { id , role } = req.body
        const updateUser = await prisma.user.update({
            where:{
                id: Number(id)
            },
            data:{
                role: role
            }
        })
        updateUser? res.status(200).send(updateUser) : res.status(400).send('Not update')

    }catch(error){
        console.log(error)
    }
}





export const deleteUser = async (req: Request, res: Response) =>{
    try{
        const id: any = req.params.id
        const findUser = await prisma.user.delete({
            where:{
                id: Number(id)
            }
        })
      findUser?   res.status(200).send('Usuario Borrado') : res.status(400).send('No se pudo eliminar')
    }catch(error){
        console.log(error)
    }
}