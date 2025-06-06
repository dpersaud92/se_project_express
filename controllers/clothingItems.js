import ClothingItem from "../models/clothingItem.js";
import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  FORBIDDEN,
} from "../utils/errors.js";

export const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

export const createItem = async (req, res) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id;

    if (!imageUrl) {
      return res.status(BAD_REQUEST).send({ message: "Image URL is required" });
    }

    const isDarkBackground = false; // or calculate if needed

    const item = await ClothingItem.create({
      name,
      weather,
      imageUrl,
      owner,
      isDarkBackground,
    });

    res.status(201).send(item);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      res
        .status(BAD_REQUEST)
        .send({ message: "Invalid data for clothing item creation" });
    } else {
      res
        .status(SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    }
  }
};

export const deleteItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return res.status(FORBIDDEN).send({ message: "Access denied" });
      }

      return ClothingItem.findByIdAndDelete(req.params.itemId).then(() => {
        res.send({ message: "Item deleted" });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else {
        res.status(SERVER_ERROR).send({ message: "Server error" });
      }
    });
};

export const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};

export const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};
