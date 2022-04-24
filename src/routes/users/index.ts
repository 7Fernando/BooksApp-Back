import { Router } from "express";
import { deleteUser, getUser, getUserById, modifyUser, postUser } from "../../controllers/users";
import { verifyToken } from "../../middleware/auth";
const router = Router();

router.get('/', getUser)
router.get('/:id',getUserById)
router.post('/', verifyToken, postUser)
router.delete('/:id', deleteUser)
router.put('/', modifyUser)



export default router;