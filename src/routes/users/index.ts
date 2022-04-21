import { Router } from "express";
import { getUser, postUser } from "../../controllers/users";
import { verifyToken } from "../../middleware/auth";
const router = Router();

router.get('/', getUser)
router.post('/', verifyToken, postUser)




export default router;