var { expressjwt: jwt } = require("express-jwt");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response, NextFunction } from "express";
require("dotenv").config();

export const jwtCheck = jwt({
  secret: "75S5doLarmsiNKesQK1HkDYd8b6pM3L6",
  audience: "secreto",
  issuer: "https://dev-0h7i5plo.us.auth0.com/",
  algorithms: ["HS256"],
}).unless({ path: ["http://localhost:3001/api/users/updateSub"] });

export const adminCheck = async (req: Request,res: Response,next: NextFunction) => {
  const { user } = req.headers;
  let findUser = await prisma.user.findUnique({
    where: { mail: String(user) },
  });

  findUser?.role === "ADMIN"
    ? next()
    : res.status(404).send({ msg: "User NO ADMIN" });
};
