import { Router } from "express";
import books from './books'
import author from './author'
const router = Router();

router.use('/books', books);
router.use('/author', author);

export default router;
