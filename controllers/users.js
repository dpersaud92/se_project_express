import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { JWT_SECRET } from "../utils/config.js";
import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
} from "../utils/errors.js";

// Create new user (signup)
export const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(CONFLICT).send({ message: "Email already exists" });
      } else if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid user data" });
      } else {
        console.error(err);
        res.status(SERVER_ERROR).send({ message: "Server error" });
      }
    });
};

// Login user (POST /signin)
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res
          .status(UNAUTHORIZED)
          .send({ message: "Incorrect email or password" });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res
            .status(UNAUTHORIZED)
            .send({ message: "Incorrect email or password" });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        res.send({ token });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(SERVER_ERROR).send({ message: "Server error" });
    });
};

// Get current user (GET /users/me)
export const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(SERVER_ERROR).send({ message: "Server error" });
    });
};

// Update user profile (PATCH /users/me)
export const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data for update" });
      } else {
        console.error(err);
        res.status(SERVER_ERROR).send({ message: "Server error" });
      }
    });
};
