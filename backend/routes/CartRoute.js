const express = require("express");
const cartController = require("../controllers/CartController");
const isAuth = require("../middlewares/is-auth");
const router = express.Router();

router.get("/cart", isAuth, cartController.getCart);
router.post("/cart", isAuth, cartController.postCart);
router.delete("/cart", isAuth, cartController.clearCart);

module.exports = router;
