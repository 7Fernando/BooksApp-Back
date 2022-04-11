import { Router } from "express";
import { getBooks, getBookById, getBookByName } from "../../controllers/books";
const router = Router();
router.get('/', getBooks);
router.get('/name', getBookByName);
router.get('/:id', getBookById);
export default router;