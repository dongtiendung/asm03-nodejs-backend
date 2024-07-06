const Category = require("../models/Category");
const Product = require("../models/Product");
const { deleteFile } = require("../utils/file");

// get all product
const getAllProducts = async (req, res, next) => {
  try {
    const { cate } = req.query;
    const option = {};
    if (cate) option.category = cate;

    const products = await Product.find(option);
    if (!products) res.status(404).json({ message: "Not Found" });

    res.status(200).json({
      message: "Fetch all products successfully!",
      status: 1,
      result: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetch all products failed!",
      status: 0,
    });
  }
};
// create product
const createNewProduct = async (req, res, next) => {
  try {
    const { name, price, category, short_desc, long_desc, quantity } = req.body;
    const files = req.files;

    const categories = await Category.find().select("name");
    const categoriesName = categories.map((cate) => cate.name);

    if (!categoriesName.includes(category)) {
      return res.status(403).json({ message: "Category not found" });
    }

    // create imgs path
    const imgUrl = files.map((img) => img.path);

    const product = {
      name,
      images: imgUrl,
      price,
      category,
      short_desc,
      long_desc,
      quantity,
    };

    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Created new product successfully!",
      result: savedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Fetch all products failed!",
      status: 0,
    });
  }
};

// update product
const updateProductById = async (req, res, next) => {
  try {
    const { name, price, category, short_desc, long_desc, quantity } = req.body;

    const { files } = req;

    console.log("Update!");
    const { productId } = req.params;
    if (!productId) {
      return res.status(422).json({
        message: "Missing parameter",
        status: 0,
      });
    }

    const productDoc = await Product.findById(productId);

    // check product exist
    if (!productDoc) {
      return res.status(404).json({
        message: "Product cant be found",
        status: 0,
      });
    }
    // set images
    let images;
    if (files.length <= 0) {
      // keep if images not change
      images = productDoc.images;
    } else {
      // delete image in folder
      productDoc.images.forEach((image) => {
        let url = image.replace("http://localhost:5000/", "");
        deleteFile(url);
      });
      // great new imgs path
      images = files.map((img) => "http://localhost:5000/" + img.path);
    }

    const product = {
      name,
      images,
      price,
      category,
      short_desc,
      long_desc,
      quantity,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      productDoc._id,
      product
    );

    res.status(201).json({
      message: "Created new product successfully!",
      result: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetch all products failed!",
      status: 0,
    });
  }
};

// get product by id
const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(422).json({
        message: "Missing parameter",
        status: 0,
      });
    }
    const productDoc = await Product.findById(productId);
    if (!productDoc) {
      return res.status(404).json({
        message: "Product cant be found",
        status: 0,
      });
    }

    res.status(200).json({
      message: "Get product successfully!",
      result: productDoc,
      status: 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Fetch all products failed!",
      status: 0,
    });
  }
};

// delete product by Id
const deleteProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      res
        .status(404)
        .json({ message: "Product not found!", status: 0, result: [] });
    }
    const images = product.images;
    images.forEach((image) => {
      let url = image.replace("http://localhost:5000/", "");
      deleteFile(url);
    });
    await Product.findByIdAndDelete(productId);
    res
      .status(200)
      .json({ message: "Delete product success", status: 1, result: [] });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Fetch all products failed!",
      status: 0,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
};
