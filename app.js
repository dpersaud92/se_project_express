import express from "express";
import mongoose from "mongoose";
import { NOT_FOUND } from "http-status-codes";

import routes from "./routes/index.js";

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: "680dba3069c120544c236ada" };
  next();
});

app.use(routes);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
