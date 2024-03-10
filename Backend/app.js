const express = require("express");

const productRouter = require("./routes/productRoute.js");
const userRouter = require("./routes/userRoute.js");
const { errorMiddleware } = require("./utils/middlewares.js");
const cookieParser = require("cookie-parser");

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// Parse JSON bodies (for application/json content-type)
app.use(express.json());
// Parse URL-encoded bodies (for application/x-www-form-urlencoded content-type)
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1", productRouter);

app.use(errorMiddleware);
module.exports = app;
