const User = require("../models/user");

// Controller to get all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: `Error: ${err.message}` }));
};

// Controller to get a single user by ID
module.exports.getUser = (req, res) => {
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

// Controller to create a new user
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) =>
      res.status(400).send({ message: `Error creating user: ${err.message}` })
    );
};
