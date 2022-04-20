import { PrismaClient, User } from "@prisma/client";
import { sendEmail } from "../../controllers/email/index"
const prisma = new PrismaClient();

export const newUser = async (data: any) => {
    console.log(data)
    const findUser = await prisma.user.findUnique({
        where: {
            mail: data.mail,
        }
    })
    if(!findUser){
        sendEmail(
            data.mail,
            `Welcome ${data.name}! \n you were successfully registered! \n let's read!`
          );
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
