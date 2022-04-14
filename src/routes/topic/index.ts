import { Router } from "express";
import { getAuthorExactTopic, getTopic } from "../../controllers/topic";
const router = Router();


router.get('/',getTopic)
router.get('/S',getAuthorExactTopic);

export default router;
