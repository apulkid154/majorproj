const express = require('express');
const router = express.Router();
const adminController = require('../controller/admincontroller');
const { login, signup } = require("../controller/Auth");
const { auth, isFarmer, isBuyer, isAdmin } = require("../middleware/auth");



// Define routes and link them to controller functions
router.get('/farmers', adminController.getAllFarmers);
router.get('/crops', adminController.getAllCrops);
router.delete('/delete-crop/:cropId', adminController.deleteCrop);
router.put('/crop/:cropId', adminController.updateCrop);
router.get('/admin-stats', adminController.getAdminStats);
router.get('/crop/:cropId/bids', adminController.getBidsForCrop);
router.delete('/bid/:bidId', adminController.deleteBid);
// / Login route (Public access)
router.post('/login', login);

// Signup route (Public access)
router.post('/signup', signup);


module.exports = router;
