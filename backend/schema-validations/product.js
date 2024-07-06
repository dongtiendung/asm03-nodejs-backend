const { checkSchema } = require("express-validator");

const createProductSchema = checkSchema({
  name: {
    errorMessage: "Please enter product name",
    notEmpty: true,
  },
  images: {
    errorMessage: "Please enter product images",
    notEmpty: true,
  },
  price: {
    errorMessage: "Please enter product price",
    notEmpty: true,
    optional: {
      options: { checkFalsy: true },
    },
    isDecimal: {
      errorMessage: "The product price must be a decimal",
      options: { min: 0, errorMessage: "Price must greater than 0" },
    },
  },
  category: {
    errorMessage: "Please enter select product category",
    notEmpty: true,
  },
  short_desc: {
    errorMessage: "Please enter product short description",
    notEmpty: true,
  },
  long_desc: {
    errorMessage: "Please enter product long description",
    notEmpty: true,
  },
  quantity: {
    errorMessage: "Please enter product quantity",
    isInt: {
      bail: true,
      options: { min: 0, errorMessage: "Quantity must greater than 0" },
    },
    notEmpty: true,
  },
});

module.exports = {
  createProductSchema,
};
