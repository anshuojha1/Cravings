require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/db");
const foodRouter = require("./routers/foodRouter");
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");
const app = express();
// app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(cors({ credentials: true, origin: [process.env.DEPLOYEMENT] }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/foods", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

connectDB();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on Port ${process.env.PORT}`);
});
