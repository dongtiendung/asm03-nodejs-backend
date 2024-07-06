const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Order = require("../models/Order");
const { currency } = require("../utils/totalBill");

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: errors.array(),
        status: 0,
        message: "Validation failed!",
      });
    }

    const { email, password } = req.body;
    const loadedUser = await User.findOne({ email });
    if (!loadedUser) {
      return res.status(401).json({
        result: [],
        status: 0,
        message: "Wrong email",
      });
    }
    const isMatchPassword = await bcrypt.compare(password, loadedUser.password);

    if (!isMatchPassword) {
      return res
        .status(401)
        .json({ result: [], status: 0, message: "Wrong password!" });
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
        userRole: loadedUser.role,
      },
      "apploadertoken",
      { expiresIn: "24h" }
    );
    loadedUser.password = null;
    return res.status(200).json({
      result: { token, user: loadedUser },
      status: 1,
      message: "Login successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: error, status: 0, message: "Server error" });
  }
};

const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        result: errors.array(),
        status: 0,
        message: "Validation failed!",
      });
    }
    const { email, fullName, password } = req.body;

    const hashPw = await bcrypt.hash(password, 16);

    const user = new User({ email, fullName, password: hashPw });

    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User created", status: 1, result: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const statistic = async (req, res, next) => {
  try {
    const countUser = await User.find().count();
    const countNewOrder = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $add: ["$total"] } },
          count: { $sum: 1 },
        },
      },
    ]);
    if (countNewOrder.length === 0) {
      return res.status(200).json({
        status: 1,
        message: "Fetch statistic successfully",
        result: {
          countUser,
          total: currency(0),
          countOrder: 0,
        },
      });
    }
    res.status(200).json({
      status: 1,
      message: "Fetch statistic successfully",
      result: {
        countUser,
        total: currency(countNewOrder[0].total),
        countOrder: countNewOrder[0].count,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
  signup,
  statistic,
};
