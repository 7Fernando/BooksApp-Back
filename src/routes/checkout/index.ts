import { Router } from "express";
import { checkSub } from "../../middleware/checkout";
import {postCheckout, getConfirmation, updateSubscription } from "../../controllers/checkout";

const router = Router();

router.post('/',postCheckout)
router.get('/confirmation', checkSub ,getConfirmation)
router.put('/', updateSubscription)

export default router;