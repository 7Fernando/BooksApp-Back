import { Router } from "express";

import { checkSub } from "../../middleware/checkout";
import { adminCheck } from "../../middleware/auth";
import {sendNewsletter} from '../../controllers/email/index'
import { getUser, postUser ,getUserById , deleteUser, modifyUser, updateSub} from "../../controllers/users";
import { Favorite, PrismaClient } from "@prisma/client";




const router = Router();


router.get("/", adminCheck, getUser)
router.post('/', postUser)
router.get('/:id',getUserById)
router.put('/updateSub', checkSub,updateSub)
router.put('/', modifyUser)
router.delete('/admin/:id', deleteUser)
router.post('/admin/mail', sendNewsletter)





export default router;
