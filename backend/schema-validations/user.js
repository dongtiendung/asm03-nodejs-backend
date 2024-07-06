const { checkSchema } = require("express-validator");
const User = require("../models/User");

// 1. login
const userLoginSchema = checkSchema({
  email: {
    isEmail: true,
    errorMessage: "Please enter a valid email",
    notEmpty: true,
  },
  password: {
    errorMessage: "The password must be at least 8 characters",
    trim: true,
    notEmpty: true,
    isLength: { options: { min: 5 } },
  },
});

// 2. signup
// 2.1 check email in used?
const checkEmailNotInUse = async (value, { req }) => {
  const user = await User.findOne({ email: value });
  if (user) {
    const error = new Error("E-mail already in use!");
    error.statusCode = 409;
    throw error;
  }
};

const userSignupSchema = checkSchema({
  email: {
    isEmail: { bail: true },
    custom: {
      options: checkEmailNotInUse,
      bail: true,
    },
  },
  password: {
    errorMessage: "The password must be at least 8 characters",
    trim: true,
    isLength: { options: { min: 8 } },
  },
  fullName: {
    errorMessage: "The fullName cannot be empty",
    trim: true,
    notEmpty: true,
  },
});

module.exports = {
  userSignupSchema,
  userLoginSchema,
};
