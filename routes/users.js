const express = require("express");
const router = express.Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

// GET all users
router.get("/users", getUsers);

// GET a single user by ID
router.get("/users/:userId", getUser);

// POST create a new user
router.post("/users", createUser);

module.exports = router;
