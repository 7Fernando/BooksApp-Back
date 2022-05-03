import { Router } from "express";
import { checkSub } from "../../middleware/checkout";
import { postCheckout, getConfirmation, updateSubscription, changeSub, cancelSub } from "../../controllers/checkout";

const router = Router();

router.post('/',postCheckout)
router.get('/confirmation', checkSub ,getConfirmation)
router.put('/', updateSubscription)
router.put('/cancelSub', cancelSub)
router.put('/changeSubscription', changeSub)

export default router;