import { Router } from "express";
import { checkSub } from "../../middleware/checkout";
import { postCheckout } from '../../controllers/checkout';
import { getConfirmation } from "../../controllers/checkout";

const router = Router();

router.post('/',postCheckout)
router.get('/confirmation', checkSub ,getConfirmation)

export default router;