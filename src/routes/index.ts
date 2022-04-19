import { Router } from "express";
import books from './books'
import author from './author'
import topic from './topic'
import  language from './languege'

import user from "./users"
import  favorite  from "./favorite"

const router = Router();

router.use('/books', books);
router.use('/author', author);
router.use('/topic',topic);
router.use('/language', language)
router.use('/users', user)
router.use('/favorites', favorite)




export default router;
