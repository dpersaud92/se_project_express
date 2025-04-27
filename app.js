const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/clothingItems");

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

app.use("/users", usersRouter);
app.use("/items", itemsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
