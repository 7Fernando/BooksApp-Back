import { PrismaClient, User } from "@prisma/client";
import { sendEmail } from "../../controllers/email/index"
const prisma = new PrismaClient();

export const newUser = async (data: any) => {

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
                name:data.name,
                mail:data.mail,
                picture: data.picture
            },
            
           
        }) 
        return newNewUser;
    }
    return null;
}



export const saveFavourite = async (userId: any, bookId: any) => {
    try {
      const user: any = await prisma.user.findUnique({
        where: {
            id : userId
        },
        include:{
            favorite: true
        }
      });
      const book: any = await prisma.book.findUnique({
           where: {
              id: bookId,
              },
           });

     const newFavorite = await prisma.favorite.create({
          data: {
             userId : user.id,
             bookId : book.id 
          }
      })

     // newFavorite?.favorite.push(book?.id);

      const updateUserFavourites = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            favorite: user?.favorite,
        },
      });
  
      return updateUserFavourites;
    } catch (error) {
      return null;
    }
  };




