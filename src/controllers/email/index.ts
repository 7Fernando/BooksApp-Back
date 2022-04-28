const nodemailer = require('nodemailer');
import { Request, Response } from "express";
import { Favorite, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const sendEmail = async (whoReceivesTheMail: string, message: string) => {
    try{
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "bookflixemail@gmail.com",
      clientId: "696498638781-0bn0412cbhdvnpkdfaiqkmuds32a5vcc.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "1//042dO08zzxmbZCgYIARAAGAQSNwF-L9IrqZM8TXg85H42ujjuDNMMS6g9mEBw1oRxp5V7_j1fweK6E1VMEqg5UnP9oPuCj3W_448",
      accessToken: "ya29.A0ARrdaM8B-uSvVvPTboTX8mZBKOJjp_JlXpYotLHvs2IQCf9rz4EqWkgxkMa9tKz0moofzymfUp1T-Qy109fA8TfAYiI27wlygnSQ5r_WcrqtKGHRJ5eHm1hEr0VwEeY5WXBKhG2vVAmt1sGcdyHlS1j67Ncv",
      expires: 1484314697598,
    },
  });

let info = await transporter.sendMail({
    from: '"BookFlix 📚"<bookflixemail@gmail.com>',
    to: whoReceivesTheMail,
    subject: "Enjoy your next book! 📖",
    text: message,
  })
}catch(err){
    console.log(err)
    return null
}
}





export const sendNewsletter = async (req: Request ,res: Response) => {
  const {arrayMail , message} = req.body

  
 
  try{
    arrayMail.map(async function(e: any){

      let contentHTML =
      `<h1>NewsLetter BOOKFLIX </h1>
        <p>Hello, ${e}, this is the new on Bootflix </p>
        <p>${message}</p>
      `

      console.log(e)

      const findMails = await prisma.user.findMany({
        where: {
          mail:e
        }
      })
   
      if(findMails){ 
        
        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: "bookflixemail@gmail.com",
          clientId: "696498638781-0bn0412cbhdvnpkdfaiqkmuds32a5vcc.apps.googleusercontent.com",
          clientSecret: "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",
          refreshToken: "1//042dO08zzxmbZCgYIARAAGAQSNwF-L9IrqZM8TXg85H42ujjuDNMMS6g9mEBw1oRxp5V7_j1fweK6E1VMEqg5UnP9oPuCj3W_448",
          accessToken: "ya29.A0ARrdaM8B-uSvVvPTboTX8mZBKOJjp_JlXpYotLHvs2IQCf9rz4EqWkgxkMa9tKz0moofzymfUp1T-Qy109fA8TfAYiI27wlygnSQ5r_WcrqtKGHRJ5eHm1hEr0VwEeY5WXBKhG2vVAmt1sGcdyHlS1j67Ncv",
          expires: 1484314697598,
      },
    });
    
  
    let send = await transporter.sendMail({
      from: '"BookFlix 📚"<bookflixemail@gmail.com>',
      to: e,
      subject: "Newsletter Bookflix! 📖",
      html: contentHTML,
    })
    console.log('heders', req.headers)
    res.status(200).send(send)

    }})
}catch(err){
  console.log(err)
}
}
  

