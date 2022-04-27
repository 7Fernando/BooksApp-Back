import { Router } from "express";
import { getUser, postUser ,getUserById , deleteUser, modifyUser, updateSub} from "../../controllers/users";
import { Favorite, PrismaClient } from "@prisma/client";
import { checkSub } from "../../middleware/checkout";



const router = Router();

router.get('/', getUser)
router.post('/', postUser)
router.get('/:id',getUserById)
router.put('/', modifyUser)

router.put('/updateSub', checkSub,updateSub)

router.delete('/admin/:id', deleteUser)



export default router;