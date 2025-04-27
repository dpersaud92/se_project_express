const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    })
    .catch(() => res.status(400).send({ message: "Invalid user ID" }));
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(400).send({ message: "Invalid user data" }));
};

module.exports = { getUsers, getUser, createUser };
