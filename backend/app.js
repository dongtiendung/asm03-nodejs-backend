const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");

const { mongodbUrl } = require("./constants/constants");
require("dotenv").config();

// import router
const AuthRouter = require("./routes/AuthRoute");
const ProductRouter = require("./routes/ProductRoute");
const CategoryRouter = require("./routes/CategoryRoute");
const CartRouter = require("./routes/CartRoute");
const OrderRouter = require("./routes/OrderRoute");

const app = express();

// multer storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + file.originalname);
  },
});
// multer filter
const fileFilter = (req, file, cb) => {
  // check file type
  const isImage =
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg";

  if (isImage) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  multer({
    storage: fileStorage,
    limits: { fileSize: 1024 * 1024 * 25 },
    fileFilter: fileFilter,
  }).array("images")
);
app.use("/images", express.static(path.join(__dirname, "images")));
// app.use(multer({ limits: { fieldSize: 25 * 1025 * 1024 } }).array("images"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  "/api",
  AuthRouter,
  ProductRouter,
  CategoryRouter,
  CartRouter,
  OrderRouter
);
app.get("/", (req, res, next) => {
  return res
    .status(200)
    .json({ status: 1, message: "Please reading readme.md for more details" });
});
// handler errors
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    const server = app.listen(PORT, () => {
      console.log("App Started at PORT: " + PORT);
    });
    // connect socket io
    const io = require("./socket").init(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    io.on("connection", () => {});
  })
  .catch((err) => {
    console.log(err);
  });
