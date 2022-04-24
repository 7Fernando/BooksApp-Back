import { Router } from "express";

import { jwtCheck } from "../../middleware/auth";
import { getBooks, getBookById ,postNewBook, deleteBook, getBooksUser} from "../../controllers/books";

const router = Router();

router.get('/', jwtCheck ,getBooks)
router.post("/", postNewBook);
router.get('/:id', getBookById);
router.delete('/:id', deleteBook);
router.post('/', postNewBook )
router.get('/admin', getBooksUser)


export default router;
