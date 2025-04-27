const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );

      res
        .status(SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );

      if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data for clothing item creation" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};

module.exports.deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Resource not found" });
      }

      res
        .status(SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Resource not found" });
      }

      res
        .status(SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Resource not found" });
      }

      res
        .status(SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};
