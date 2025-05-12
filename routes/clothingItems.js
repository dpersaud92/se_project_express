import { Router } from "express";
import {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} from "../controllers/clothingItems.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", getItems);

router.post("/", auth, createItem);
router.delete("/:itemId", auth, deleteItem);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);

export default router;
