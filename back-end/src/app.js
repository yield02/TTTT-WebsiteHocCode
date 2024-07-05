const express = require("express");
const cors = require("cors");

const route = require("./routes");
const ApiError = require("./utils/apiError");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");

const port = 3000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(cookieParser());

app.use(
  express.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app.use(express.json());

route(app);

app.use((req, res, next) => {
  return next(new ApiError(404, "Tài nguyên truy cập không tồn tại"));
});

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Lỗi máy chủ",
  });
});

module.exports = app;
