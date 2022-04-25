import { Router } from "express";

import { jwtCheck } from "../../middleware/auth";
import { getBooksUser} from "../../controllers/admin";

const router = Router();


router.get('/', getBooksUser)


export default router;
