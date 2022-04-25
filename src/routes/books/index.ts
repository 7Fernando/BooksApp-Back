import { Router } from "express";
import { jwtCheck } from "../../middleware/auth";
import { getBooks, getBookById ,postNewBook, deleteBook} from "../../controllers/books";
import { getBooksUser , getBookByIdAdmin} from "../../controllers/admin";

const router = Router();

router.get('/', jwtCheck ,getBooks)
router.post("/", postNewBook);
router.get('/:id', getBookById);

//rutas administrador
router.post('/', postNewBook )
router.get('/user/admin', getBooksUser)
router.get('/user/admin/:id', getBookByIdAdmin)
router.delete('/user/admin/:id', deleteBook);



export default router;
