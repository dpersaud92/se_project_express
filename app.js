/* global setTimeout */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import { errors } from "celebrate";
import dotenv from "dotenv";

import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import { requestLogger, errorLogger } from "./middlewares/logger.js";
import { NotFoundError } from "./utils/errors.js";

dotenv.config();
const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);

app.use(errors()); // Celebrate errors
app.use(errorHandler); // Custom centralized error handler

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
