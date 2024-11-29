const jwt = require("jsonwebtoken");
require("dotenv").config();
const farmer = require("../models/farmerModel");
const buyer = require("../models/buyerModel"); // Import your User model (adjust the path if needed)
 // Import your User model (adjust the path if needed)

// JWT Authentication Middleware
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

// Block/Unblock User Middleware
exports.blockUser = async (req, res) => {
  const { userId, userType } = req.body;

  if (!userId || !userType) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: userId or userType.",
    });
  }

  if (userType !== "farmer" && userType !== "buyer") {
    return res.status(400).json({
      success: false,
      message: "Invalid userType. Must be 'farmer' or 'buyer'.",
    });
  }

  const Model = userType === "farmer" ? farmer : buyer;
  const user = await Model.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `${userType} not found.`,
    });
  }

  try {
    // Attempt to block/unblock the user
    user.isBlocked = true;
    await user.save({ validateModifiedOnly: true });

    return res.status(200).json({
      success: true,
      message: `${userType} has been blocked successfully.`,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Specific validation error handling
      return res.status(400).json({
        success: false,
        message: `Validation error: ${error.message}`,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred.",
        error: error.message,
      });
    }
  }
};
