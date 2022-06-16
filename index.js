const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./db/conn");
const todoRouter = require("./routes/todoRoutes");
const authRouter = require("./routes/auth");
const authMiddleware = require("./middlewares/authentication");

dotenv.config();

const port = process.env.PORT || 3000;

connection();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/to-do", authMiddleware, todoRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
