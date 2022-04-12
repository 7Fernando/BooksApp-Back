import { Router } from "express";
import {getAuthor, getAuthorById} from '../../controllers/author'
const router = Router();

router.get('/', getAuthor);
// router.get('/name', getAuthorByName);
router.get('/:id', getAuthorById);

export default router;