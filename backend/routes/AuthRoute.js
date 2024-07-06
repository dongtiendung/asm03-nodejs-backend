const express = require("express");

const AuthController = require("../controllers/AuthController");

const isAuth = require("../middlewares/is-auth");

const {
  userSignupSchema,
  userLoginSchema,
} = require("../schema-validations/user");

const router = express.Router();

// login
router.post("/login", userLoginSchema, AuthController.login);

// signup
router.post("/signup", userSignupSchema, AuthController.signup);
router.get("/statistic", isAuth, AuthController.statistic);

module.exports = router;
