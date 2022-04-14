import { Router } from "express";
import {getAuthor, getAuthorById,getAuthorExactName} from '../../controllers/author'
const router = Router();

router.get('/', getAuthor);
router.get('/S',getAuthorExactName);
router.get('/:id', getAuthorById);

export default router;