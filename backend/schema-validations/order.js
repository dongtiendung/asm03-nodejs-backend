const { checkSchema } = require("express-validator");

const completeOrderSchema = checkSchema({
  address: {
    errorMessage: "Please enter your address",
    notEmpty: true,
    trim: true,
  },
  phonenumber: {
    isMobilePhone: true,
    errorMessage: "Please enter phone number",
    notEmpty: true,
    trim: true,
  },
});

module.exports = {
  completeOrderSchema,
};
