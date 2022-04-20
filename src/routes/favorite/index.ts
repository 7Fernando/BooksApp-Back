import { Router } from "express";
import {  postFavorite, getFavorite ,removeFavorite} from "../../controllers/favorite";
const router = Router();


router.get('/', getFavorite)
router.post('/', postFavorite)
router.delete('/:id', removeFavorite)


export default router;