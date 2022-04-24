import { Router } from "express";
import { getBooks, getBookById ,postNewBook, deleteBook} from "../../controllers/books";
const router = Router();

router.get('/', getBooks);
// router.get('/name', getBookByName);

router.get('/:id', getBookById);
router.delete('/:id', deleteBook);
router.post('/', postNewBook )

export default router;