import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAuthorByName = async (name:string)=>{
    try{
        const result = await prisma.author.findMany({
            where: { name: { contains: name, mode: "insensitive" } },
        })
        return(result.length? result : ("Match not founded"))
        
    }catch(error){
        console.log(error)
    }
}