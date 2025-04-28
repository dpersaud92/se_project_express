import { Router } from "express";
import {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} from "../controllers/clothingItems.js";

const router = Router();

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

export default router;
