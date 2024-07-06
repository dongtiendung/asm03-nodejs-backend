const express = require("express");

const {
  getAllCategory,
  createNewCategory,
} = require("../controllers/CategoryController");

const { createCategorySchema } = require("../schema-validations/category");

const router = express.Router();

// get all category
router.get("/category", getAllCategory);

// create new cateogry
router.post("/category", createCategorySchema, createNewCategory);

module.exports = router;
