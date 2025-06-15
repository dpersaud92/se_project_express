import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { JWT_SECRET } from "../utils/config.js";
import {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
  InternalServerError,
} from "../utils/errors.js";

export const createUser = (req, res, next) => {
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
        next(new ConflictError("Email already exists"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid user data"));
      } else {
        next(new InternalServerError());
      }
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Incorrect email or password");
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Incorrect email or password");
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        res.send({ token });
      });
    })
    .catch((err) => {
      if (err instanceof UnauthorizedError || err instanceof BadRequestError) {
        next(err);
      } else {
        next(new InternalServerError());
      }
    });
};

export const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof NotFoundError) {
        next(err);
      } else {
        next(new InternalServerError());
      }
    });
};

export const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data for update"));
      } else if (err instanceof NotFoundError) {
        next(err);
      } else {
        next(new InternalServerError());
      }
    });
};
