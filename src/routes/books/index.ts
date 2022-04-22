import { Router } from "express";
import { getBooks, getBookById } from "../../controllers/books";
const router = Router();
import { verifyToken } from "../../middleware/auth";

router.get('/', verifyToken, getBooks);
// router.get('/name', getBookByName);
router.get('/:id', getBookById);

export default router;