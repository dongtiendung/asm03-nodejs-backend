const Category = require("../models/Category");

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      result: categories,
      message: "Fetch all categories successfully!",
      status: 1,
    });
  } catch (error) {
    res.status(500).json({ result: error, message: "Server error", status: 1 });
  }
};

const createNewCategory = async (req, res, next) => {
  try {
    const { name, thumbnail, desc } = req.body;
    const images = req.files;
    console.log(images);

    const category = new Category({ name, thumbnail, desc });
    const savedCategory = await category.save();
    res.status(201).json({
      message: "Created new category successfully!",
      result: savedCategory,
      status: 1,
    });
  } catch (error) {
    res.status(500).json({ result: error, message: "Server error", status: 0 });
  }
};

module.exports = {
  getAllCategory,
  createNewCategory,
};
