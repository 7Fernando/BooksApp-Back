import { Router } from "express";
import { postCheckout } from '../../controllers/checkout';
import { checkSub } from "../../middleware/checkout";
const router = Router();

router.post('/',postCheckout)

export default router;