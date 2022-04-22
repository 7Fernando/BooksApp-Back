import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// require ("dotenv").config();

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token: any = req.headers.authorization;
    // const decode = jwt.verify(token, process.env.SECRET_KEY || "secret");
    // console.log(decode);
    
    if(!token) return res.status(401).send({msg: "Authorization denied"});
    next();
  };