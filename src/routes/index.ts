import user from "./users";
import books from "./books";
import topic from "./topic";
import author from "./author";
import { Router } from "express";
import language from "./languege";
import favorite from "./favorite";
import checkout from "./checkout";
import { jwtCheck } from "../middleware/auth";
import { checkSub } from "../middleware/checkout";

const router = Router();
//router.use(jwtCheck); // comentar para no usar el token 


//router.use(jwtCheck); // comentar para no usar el token 
router.use("/users", user);
router.use("/topic", topic);
router.use("/books", books);
router.use("/sub",checkout);
router.use("/author", author);
router.use("/language", language);
router.use("/favorites", favorite);

export default router;