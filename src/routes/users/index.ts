import { Router } from "express";
import { getUser, postUser ,getUserById , deleteUser, modifyUser, updateSub} from "../../controllers/users";
import { Favorite, PrismaClient } from "@prisma/client";
import { checkSub } from "../../middleware/checkout";
import { adminCheck } from "../../middleware/auth";

const router = Router();

router.get('/:id',getUserById)
router.put('/updateSub',updateSub)
router.get("/", adminCheck, getUser);
router.post("/", postUser);
router.delete("/admin/:id", deleteUser);
router.put("/", modifyUser);

export default router;
