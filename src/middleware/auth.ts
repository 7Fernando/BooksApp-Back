import { Request, Response, NextFunction } from "express";
import jwt, { verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
  console.log('token:', token)
  const decode: any = jwt.decode(token);
  console.log('decorde',decode);

  const verifyTo = decode?.aud[0] === process.env.SECRET;
  if(verifyTo === false){
    res.status(400).send('Access denied')
  }
  console.log('verifyTo',verifyTo);

  next();
  } catch (error) {
    console.error('error:',error);
    return res.status(404).send({'msg':error})
  }
  
};
