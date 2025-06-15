import express from "express";
import {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} from "../controllers/clothingItems.js";
import auth from "../middlewares/auth.js";
import {
  validateItemCreation,
  validateItemId,
} from "../middlewares/validation.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", auth, validateItemCreation, createItem);
router.delete("/:itemId", auth, validateItemId, deleteItem);
router.put("/:itemId/likes", auth, validateItemId, likeItem);
router.delete("/:itemId/likes", auth, validateItemId, dislikeItem);

export default router;
