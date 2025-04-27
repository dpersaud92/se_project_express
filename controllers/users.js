const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
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

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );

      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );

      if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data for user creation" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};
