import express from "express";
import multer from "multer";
import {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} from "../controllers/clothingItems.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", auth, createItem);
router.delete("/:itemId", auth, deleteItem);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);

export default router;
