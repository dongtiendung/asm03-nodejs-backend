const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post("/upload", upload.array("images", 5), (req, res, next) => {
  const files = req.files;

  // Sử dụng files đã tải lên và kiểm tra hình ảnh
  const images = [];

  for (let i = 0; i < files.length; i++) {
    const imagePath = path.join(__dirname, "uploads", files[i].originalname);
    const existingImagePath = path.join(
      __dirname,
      "existing",
      files[i].originalname
    );

    if (fs.existsSync(imagePath)) {
      // Hình ảnh đã tồn tại trong thư mục uploads
      images.push(imagePath);
    } else if (fs.existsSync(existingImagePath)) {
      // Hình ảnh đã tồn tại trong thư mục existing
      images.push(existingImagePath);
    } else {
      // Move file mới tải lên vào thư mục uploads
      fs.renameSync(files[i].path, imagePath);
      images.push(imagePath);
    }
  }

  // Sử dụng images trong controller để xử lý

  res.send({ message: "Upload completed" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
