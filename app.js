const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "YOUR_TEST_USER_ID_HERE", // Replace later
  };
  next();
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use("/", require("./routes"));

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
