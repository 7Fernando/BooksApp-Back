import { Router } from "express";

import { getUser, postUser ,getUserById , deleteUser, modifyUser, updateSub,getUserByMail} from "../../controllers/users";
import { Favorite, PrismaClient } from "@prisma/client";
import { checkSub } from "../../middleware/checkout";
import { adminCheck } from "../../middleware/auth";



const router = Router();

router.get('/:id',getUserById)
router.get('/profile/:mail',getUserByMail)
router.delete('/admin/:id', deleteUser)
router.put('/', modifyUser)
router.put('/updateSub', checkSub,updateSub)
//router.get("/", adminCheck, getUser);
router.post("/", postUser);


export default router;
