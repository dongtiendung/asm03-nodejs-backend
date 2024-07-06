const express = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const router = express.Router();
const isAuth = require("../middlewares/is-auth");

const ProductController = require("../controllers/ProductController");
const { createProductSchema } = require("../schema-validations/product");

// get all products
router.get("/product", ProductController.getAllProducts);

// get product by Id
router.get("/product/:productId", ProductController.getProductById);

// create new Product
router.post(
  "/product",
  createProductSchema,
  isAuth,
  ProductController.createNewProduct
);
// update product
router.put(
  "/product/:productId",
  createProductSchema,
  isAuth,
  ProductController.updateProductById
);

// delete product by Id
router.delete(
  "/product/:productId",
  isAuth,
  ProductController.deleteProductById
);

module.exports = router;
