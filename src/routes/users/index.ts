import { Router } from "express";

import {
  getUser,
  postUser,
  getUserById,
  deleteUser,
  modifyUser,
} from "../../controllers/users";
import { adminCheck } from "../../middleware/auth";

const router = Router();

router.get("/", adminCheck, getUser);
router.post("/", postUser);
router.get("/:id", getUserById);
router.delete("/admin/:id", deleteUser);
router.put("/", modifyUser);

export default router;
