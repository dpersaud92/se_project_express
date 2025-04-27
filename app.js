const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users"); // Import the users router

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json()); // middleware to handle JSON bodies

// Temporary middleware to simulate authentication (add this if needed)
app.use((req, res, next) => {
  req.user = { _id: "YOUR_TEST_USER_ID" }; // Replace with your test user ID
  next();
});

// Mount usersRouter to the /users path
app.use("/users", usersRouter);

// Catch-all for invalid routes
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
