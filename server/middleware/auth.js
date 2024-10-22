const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // Extract JWT token
    const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");

    // If token is missing, return an error response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing or undefined.",
      });
    }

    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    // Attach user information from the token to the request object
    req.user = payload;
    next();

  } catch (error) {
    // Handle errors such as invalid tokens or verification failures
    return res.status(401).json({
      success: false,
      message: "Invalid or missing token.",
      error: error.message,
    });
  }
};

// Role-based authorization middleware
const checkRole = (role) => (req, res, next) => {
  try {
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Only ${role}s are allowed.`,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `User role does not match ${role}.`,
    });
  }
};

// Role-specific middleware
exports.isFarmer = checkRole('Farmer');
exports.isBuyer = checkRole('Buyer');
exports.isAdmin = checkRole('Admin');
