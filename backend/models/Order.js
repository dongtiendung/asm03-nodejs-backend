const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Order = new Schema(
  {
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
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "New",
        "Payment Received",
        "Payment Failed",
        "Completed",
        "Closed",
        "Cancelled",
      ],
      default: "New",
    },
    delivery: {
      type: String,
      enum: ["Pending", "Completed", "Shipping", "Cancelled"],
      default: "Pending",
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", Order);
