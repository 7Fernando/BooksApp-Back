import { Request, Response, NextFunction } from "express";
import jwt, { verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.authorization;
  const decode: any = jwt.decode(token);
  console.log(decode);

  const verifyTo = decode?.aud[0] === process.env.SECRET;
  console.log(verifyTo);

  next();
};
