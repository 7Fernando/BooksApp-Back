import { Router } from "express";
import books from './books'
import author from './author'
import topic from './topic'
import  language from './languege'

import user from "./users"

const router = Router();

router.use('/books', books);
router.use('/author', author);
router.use('/topic',topic);
router.use('/language', language)
router.use('/users', user)


export default router;
