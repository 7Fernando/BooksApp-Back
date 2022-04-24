import { Router } from "express";

import { getUser, postUser ,getUserById , deleteUser, modifyUser} from "../../controllers/users";

import { verifyToken } from "../../middleware/auth";

const router = Router();

router.get('/', getUser)

router.post('/', verifyToken, postUser)

router.get('/:id',getUserById)
router.delete('/:id', deleteUser)
router.put('/', modifyUser)





export default router;