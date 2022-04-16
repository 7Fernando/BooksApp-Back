import { Router } from "express";
import { getBookExactLanguage, getLanguage } from '../../controllers/languege'
const router = Router();


router.get('/',getLanguage)
router.get('/S',getBookExactLanguage);

export default router;