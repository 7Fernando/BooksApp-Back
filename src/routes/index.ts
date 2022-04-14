import { Router } from "express";
import books from './books'
import author from './author'
import topic from './topic'
const router = Router();

router.use('/books', books);
router.use('/author', author);
router.use('/topic',topic)

export default router;
