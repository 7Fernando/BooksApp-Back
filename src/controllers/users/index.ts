import { Request, Response } from "express";
import { Favorite, PrismaClient } from "@prisma/client";
import { newUser } from "../../helpers33/users";
const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response) => {
  try {
    const allUser = await prisma.user.findMany({
      include: {
        favorite: true,
        subInfo: true
      },
    });
    allUser.length !== 0
      ? res.status(200).send(allUser)
      : res.status(404).send({ msg: "User not found" });
  } catch (error) {
    console.error(error);
  }
};



export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        favorite: true,
      },
    });
    user
      ? res.status(200).send(user)
      : res.status(404).send({ msg: "User not found" });
  } catch (error) {
    console.error(error);
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const { name, mail, picture } = req.body;
    const newNewUser = await newUser({ name, mail, picture }); //CORREGIR EL TIPO DE DATO
    newNewUser
      ? res.status(201).send(newNewUser)
      : res.status(200).send("User not created");
  } catch (error) {
    console.error(error);
  }
};

export const getUserByMail = async (req: Request, res: Response) => {
    try {
        const { mail } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                mail: mail
            },
            include:{
                favorite: true,
                subInfo: true
            }
        })
        user ? res.status(200).send(user) : res.status(404).send({msg:"User not found"})
    } catch (error) {
        console.error(error)
    }
}


export const modifyUser = async (req: Request, res: Response) => {
  try {

    const { id  } = req.body;
    console.log('id', id)
    const change = await prisma.user.findUnique({
      where:{
        id: Number(id)
      }
      
    })
    change?.role === 'USER' ? await prisma.user.update({
      where :{
        id: change?.id
      },
      data:{
        role : "ADMIN"
      }
    }) :  await prisma.user.update({
      where :{
        id: change?.id
      },
      data:{
        role : "USER"
      }
    })
    // const updateUser = await prisma.user.update({
    //   where: {
    //     id: Number(id),
    //   },
    //   data: {
    //     role: role,
    //   },
    // });
    change 
      ? res.status(200).send(change)
      : res.status(400).send("Usuario no updateado");
  } catch (error) {
    console.log(error);
  }
};



export const deleteUser = async (req: Request, res: Response) =>{
    try{
        const id: any = req.params.id
        const findUser = await prisma.user.delete({
            where:{
                id: Number(id)
            }
        })
      findUser?   res.status(200).send('User Deleted') : res.status(400).send('No se pudo eliminar')
    }catch(error){
        console.log(error)
    }
}

export const updateSub = async (req: Request, res: Response) => {
    try {
      const { idSub, userMail } = req.body;
      console.log(120,idSub, userMail)
      //console.log( 122,req.body)
      const updateUser = await prisma.user.update({
        where: {
          mail: userMail,
        },
        data: {
          subId: idSub,
        },
      });
  
   
         res.status(200).send("User update")
        
    } catch (error) {
      console.log(error);
      return res.send("User not update")
    }
  };
  



