import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();



export const saveFavourite = async (userId: any, bookId: any) => {
    try {
      const user: any = await prisma.user.findUnique({
        where: {
            mail : userId
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