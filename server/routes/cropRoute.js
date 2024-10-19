const express = require('express');
const router = express.Router();

// Import controller
const { createCrop, getAllCrops, updateCrop,imageUpload,imageSizeReducer } = require('../controller/cropcontroller');

// Define API routes
router.post('/createcrop', createCrop);
router.get('/cropdata', getAllCrops); // Changed route to /cropdata
router.put('/updatecrop/:id', updateCrop); 
router.delete('/deletecrop/:id', updateCrop);
router.post("/imageUpload", imageUpload);
// router.post("/videoUpload", videoUpload);

module.exports = router;
