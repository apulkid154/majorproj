const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // Extract JWT token
    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    // Verify the token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);

      // Attach user information from the token to the request object
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the token",
      error: error.message,
    });
  }
};
exports.isFarmer = (req, res, next) => {
  try {
    if (req.user.role !== "Farmer") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only farmers are allowed.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role does not match Farmer.",
    });
  }
};
exports.isBuyer = (req, res, next) => {
  try {
    if (req.user.role !== "Buyer") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only buyers are allowed.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role does not match Buyer.",
    });
  }
};
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins are allowed.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role does not match Admin.",
    });
  }
};
