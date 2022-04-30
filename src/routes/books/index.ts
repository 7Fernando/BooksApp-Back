import { Router } from "express";
import { getBooks, getBookById ,postNewBook, deleteBook ,incrementLikeBook,decrementLikeBook} from "../../controllers/books";
import { getBooksUser , getBookByIdAdmin} from "../../controllers/admin";
import { checkSub } from "../../middleware/checkout";
import { adminCheck } from "../../middleware/auth";

const router = Router();

router.get('/',  checkSub ,getBooks)
router.get('/:id', getBookById);
router.post("/", postNewBook);
router.put("/incrementlike",incrementLikeBook)
router.put("/decrementlike",decrementLikeBook)

//rutas administrador
router.post('/', postNewBook )
router.get('/user/admin', adminCheck, getBooksUser)
router.get('/user/admin/:id', adminCheck,  getBookByIdAdmin)





export default router;
