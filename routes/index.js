import { Router } from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import { createUser, login } from "../controllers/users.js";
import { validateSignin, validateSignup } from "../middlewares/validation.js";

const router = Router();

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;
