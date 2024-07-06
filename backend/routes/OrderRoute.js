const express = require("express");

const orderController = require("../controllers/OrderController");
const isAuth = require("../middlewares/is-auth");
const { completeOrderSchema } = require("../schema-validations/order");
const checkProductQuantity = require("../middlewares/checkProductQuantity");

const router = express.Router();

router.get("/order", isAuth, orderController.getAllOrder);
router.get("/order/:orderId", isAuth, orderController.getOrderById);

router.post(
  "/order",
  completeOrderSchema,
  isAuth,
  checkProductQuantity,
  orderController.completeOrder
);

module.exports = router;
