const express = require('express');
const router = express.Router();
const adminController = require('../controller/admincontroller'); // Corrected path
const Buyer = require('../models/buyerModel'); // Import the Buyer model
const {login,signup}=require("../controller/Auth");
const { auth, isFarmer, isBuyer, isAdmin } = require("../middleware/auth");

// Route to create a new admin
router.post('/createadmin', adminController.createAdmin);

// Route to get all admins
// router.get('/admindata', adminController.getAllAdmins);

// Route to get admin by ID
router.get('/admin/:id', adminController.getAdminById);

// Route to update an admin
router.put('/updateadmin/:id', adminController.updateAdmin);

// Route to delete an admin
router.delete('/deleteadmin/:id', adminController.deleteAdmin);

// Routes for blocking/unblocking buyers
router.post('/admin/:adminId/block/buyer/:buyerId', adminController.blockBidder);
router.post('/admin/:adminId/unblock/buyer/:buyerId', adminController.unblockBidder);
router.post('/login',login);
router.post('/signup',signup);
router.get("/admin/dashboard", auth, isAdmin, (req, res) => {
  res.status(200).json({ success: true, message: "Welcome Admin!" });
});
module.exports = router;
