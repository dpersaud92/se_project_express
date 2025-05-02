import { Router } from "express";
import { getCurrentUser, updateUser } from "../controllers/users.js";

const router = Router();

router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

export default router;
