import { Router } from "express";
import { getCurrentUser, updateUser } from "../controllers/users.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

export default router;
