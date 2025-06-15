import ClothingItem from "../models/clothingItem.js";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
} from "../utils/errors.js";

export const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() => next(new InternalServerError()));
};

export const createItem = async (req, res, next) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id;

    if (!imageUrl) {
      throw new BadRequestError("Image URL is required");
    }

    const isDarkBackground = false;

    const item = await ClothingItem.create({
      name,
      weather,
      imageUrl,
      owner,
      isDarkBackground,
    });

    res.status(201).send(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new BadRequestError("Invalid data for clothing item creation"));
    } else {
      next(new InternalServerError());
    }
  }
};

export const deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("Access denied");
      }

      return ClothingItem.findByIdAndDelete(req.params.itemId).then(() => {
        res.send({ message: "Item deleted" });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else if (err instanceof ForbiddenError) {
        next(err);
      } else {
        next(new InternalServerError());
      }
    });
};

export const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(new InternalServerError());
      }
    });
};

export const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(new InternalServerError());
      }
    });
};
