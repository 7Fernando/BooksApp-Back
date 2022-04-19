import { Router } from "express";
import { getUser, postUser } from "../../controllers/users";
const router = Router();

router.get('/', getUser)
router.post('/', postUser)




export default router;