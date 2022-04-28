import { Router } from "express";

import { checkSub } from "../../middleware/checkout";
import { adminCheck } from "../../middleware/auth";
import {sendNewsletter} from '../../controllers/email/index'
import { getUser, postUser ,getUserById , deleteUser, modifyUser, updateSub} from "../../controllers/users";
import { Favorite, PrismaClient } from "@prisma/client";



const router = Router();




router.get('/:id',getUserById)
router.put('/updateSub',updateSub)
router.get("/", adminCheck, getUser);
router.post("/", postUser);
router.delete("/admin/:id", deleteUser);
router.put('/',adminCheck,modifyUser)
router.delete('/admin/:id',  adminCheck,  deleteUser)
router.post('/admin/mail',  adminCheck, sendNewsletter)





export default router;
