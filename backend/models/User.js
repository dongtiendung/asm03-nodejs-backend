const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Customer", "Sale", "Admin"],
    default: "Customer",
  },
});

module.exports = mongoose.model("User", UserSchema);
