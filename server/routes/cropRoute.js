const express = require('express');
const router = express.Router();

// Import controller
const { createCrop, getAllCrops, updateCrop, imageUpload, imageSizeReducer, getCropById } = require('../controller/cropcontroller');

// Define API routes
router.post('/createcrop', createCrop);              // Create a new crop
router.get('/cropdata', getAllCrops);                // Get all crops
router.get('/cropdetails/:id', getCropById);         // Get crop details by ID (fixing route comment)

router.put('/updatecrop/:id', updateCrop);           // Update crop details by ID
router.delete('/deletecrop/:id', updateCrop);        // Delete crop by ID (if applicable, otherwise create a delete controller)
router.post("/imageUpload", imageUpload);            // Upload image for crops

module.exports = router;
