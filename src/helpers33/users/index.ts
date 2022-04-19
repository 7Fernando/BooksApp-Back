import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export const newUser = async (data: any) => {

    const findUser = await prisma.user.findUnique({
        where: {
            mail: data.mail,
        }
    })
    if(!findUser){
        const newNewUser: User = await prisma.user.create({
            data: {
                name: data.name,
                mail: data.mail,
                picture: data.picture
            }
        }) 
        return newNewUser;
    }
    return null;
}
