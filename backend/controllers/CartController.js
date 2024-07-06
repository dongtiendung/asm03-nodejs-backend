const Cart = require("../models/Cart");

const getCart = async (req, res, next) => {
  try {
    const { userId } = req;

    const cart = await Cart.findOne({ userId }).populate(["items.productId"]);

    res.status(200).json({
      status: 1,
      result: cart || { items: [] },
      message: "Fetch cart successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postCart = async (req, res, next) => {
  try {
    const { userId } = req;
    const { cart } = req.body;
    const cartDoc = await Cart.findOne({ userId }).exec();

    if (!cartDoc) {
      const newCart = new Cart({
        userId,
        items: cart.items,
        subTotal: cart.subTotal,
      });

      const savedCart = await newCart.save();

      res.status(201).json({
        status: 1,
        message: "Saved cart successfully!",
        result: savedCart,
      });
    } else {
      cartDoc.items = cart.items;
      cartDoc.subTotal = cart.subTotal;
      const savedCart = await cartDoc.save();
      res.status(201).json({
        status: 1,
        message: "Saved cart successfully!",
        result: savedCart,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const clearCart = async (req, res, next) => {
  try {
    const { userId } = req;

    const cartDoc = await Cart.findOne({ userId }).exec();

    if (!cartDoc) {
      res.status(404).json({
        status: 0,
        message: "You dont have any item !",
        result: [],
      });
    } else {
      cartDoc.clearCart();
      const savedCart = await cartDoc.save();
      res.status(201).json({
        status: 1,
        message: "Empty cart successfully!",
        result: savedCart,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCart,
  postCart,
  clearCart,
};
