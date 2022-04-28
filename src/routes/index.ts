import user from "./users";
import books from "./books";
import topic from "./topic";
import author from "./author";
import { Router } from "express";
import language from "./languege";
import favorite from "./favorite";
import checkout from "./checkout";
import { jwtCheck } from "../middleware/auth";

const router = Router();
//router.use(jwtCheck); // comentar para no usar el token 

router.use("/books", books);
router.use("/author", author);
router.use("/topic", topic);
router.use("/language", language);
router.use("/users", user);
router.use("/favorites", favorite);
router.use("/sub", checkout);

export default router;

