const Cart = require("../models/Cart");
const Product = require("../models/Product");

module.exports = async (req, res, next) => {
  const { userId } = req;
  const cart = await Cart.findOne({ userId });

  for (let i = 0; i < cart.items.length; i++) {
    const product = await Product.findById(cart.items[i].productId);
    if (!product)
      return res.status(404).json({ message: "Product not found", status: 0 });
    if (product.quantity === 0 || product.quantity < cart.items[i].quantity) {
      return res.status(200).json({
        status: 0,
        message: `${product.name} quantity not enough to your order, quantity: ${product.quantity} `,
      });
    }
  }
  next();
};
