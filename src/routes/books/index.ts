import { Router } from "express";
import { jwtCheck } from "../../middleware/auth";
import { getBooks, getBookById ,postNewBook, deleteBook, getBooksUser} from "../../controllers/books";
const router = Router();

router.get("/", jwtCheck, getBooks);
router.get("/:id", getBookById);
router.get("/user/admin",getBooksUser)
router.post("/", postNewBook);
router.post('/', postNewBook )
router.delete('/:id', deleteBook);


export default router;
