import { Router } from "express";
import { getBooks, getBookById ,postNewBook, deleteBook} from "../../controllers/books";
import { getBooksUser , getBookByIdAdmin} from "../../controllers/admin";
import { checkSub } from "../../middleware/checkout";
import { adminCheck } from "../../middleware/auth";
const router = Router();
router.get('/',  checkSub ,getBooks)
router.post("/", postNewBook);
router.get('/:id', getBookById);

//rutas administrador
router.post('/', postNewBook )
router.get('/user/admin', getBooksUser)
router.get('/user/admin/:id', getBookByIdAdmin)
router.delete('/user/admin/:id', deleteBook);



export default router;
