import { Router } from "express";
import { postCheckout, updateSubscription } from '../../controllers/checkout';
 
const router = Router();

router.post('/', postCheckout)
router.put('/', updateSubscription)

export default router;