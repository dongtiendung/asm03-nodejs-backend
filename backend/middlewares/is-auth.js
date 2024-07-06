const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authheader = req.get("Authorization");
  if (!authheader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "apploadertoken");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  req.userRole = decodedToken.userRole;
  next();
};
