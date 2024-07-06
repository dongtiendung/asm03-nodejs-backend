const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  subTotal: {
    type: Number,
    required: true,
  },
});

CartSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

CartSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });
  this.items = updatedCartItems;
  return this.save();
};

CartSchema.methods.clearCart = function () {
  this.items = [];
  return this.save();
};
module.exports = mongoose.model("Cart", CartSchema);
