const { checkSchema } = require("express-validator");

// 1. create
const createCategorySchema = checkSchema({
  name: {
    notEmpty: true,
    trim: true,
    errorMessage: "Please enter category name",
  },
  thumbnail: {
    errorMessage: "Please enter category thumbnail",
    trim: true,
    notEmpty: true,
  },
  desc: {
    errorMessage: "Please enter category description",
    trim: true,
    notEmpty: true,
  },
});
module.exports = {
  createCategorySchema,
};
