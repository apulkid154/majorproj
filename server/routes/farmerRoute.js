const express = require('express');
const router = express.Router();
const farmerController = require('../controller/farmercontroller');
const {login,signup}=require("../controller/Auth")
const { auth, isFarmer, isBuyer, isAdmin } = require("../middleware/auth");
// Define routes
router.post('/addfarmers', farmerController.createFarmer); // Create a farmer
router.get('/getfarmers', farmerController.getAllFarmers); // Get all farmers
router.get('/getfarmer/:id', farmerController.getFarmerById); // Get a farmer by ID
router.put('/updatefarmers/:id', farmerController.updateFarmer); // Update a farmer by ID
router.delete('/deletefarmers/:id', farmerController.deleteFarmer); // Delete a farmer by ID
router.post('/login',login);
router.post('/signup',signup);
router.get("/farmer/dashboard", auth, isFarmer, (req, res) => {
  res.status(200).json({ success: true, message: "Welcome Farmer!" });
});


module.exports = router;
