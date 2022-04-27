import { Router } from "express";

import { getUser, postUser ,getUserById , deleteUser, modifyUser, getUserByMail} from "../../controllers/users";



const router = Router();

router.get('/', getUser)
router.post('/', postUser)
router.get('/:id',getUserById)
router.get('/profile/:mail',getUserByMail)
router.delete('/admin/:id', deleteUser)
router.put('/', modifyUser)






export default router;