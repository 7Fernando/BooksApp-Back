import { Router } from "express";
import { jwtCheck } from "../../middleware/auth";
import { getBooks, getBookById ,postNewBook, deleteBook} from "../../controllers/books";
const router = Router();

router.get("/", jwtCheck, getBooks);
router.get("/:id", getBookById);
router.post("/", postNewBook);
router.get('/:id', getBookById);
router.delete('/:id', deleteBook);
router.post('/', postNewBook )


export default router;
