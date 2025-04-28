import { Router } from "express";
import usersRouter from "./users.js";
import itemsRouter from "./clothingItems.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

export default router;
