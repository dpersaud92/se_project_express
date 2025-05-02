import { Router } from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";
import { createUser, login } from "../controllers/users.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/signup", createUser);
router.post("/signin", login);

router.use(auth);
router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;
