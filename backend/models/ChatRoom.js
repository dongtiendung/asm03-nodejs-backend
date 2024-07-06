const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);
