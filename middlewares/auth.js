import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config.js";
import { UNAUTHORIZED } from "../utils/errors.js";

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
  }

  req.user = payload;
  next();
};
