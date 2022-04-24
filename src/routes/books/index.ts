import { Router } from "express";
import { getBooks, getBookById, postNewBook } from "../../controllers/books";
import { jwtCheck } from "../../middleware/auth";
const router = Router();

router.get("/", jwtCheck, getBooks);
// router.get('/name', getBookByName);
router.get("/:id", getBookById);
router.post("/", postNewBook);

export default router;
