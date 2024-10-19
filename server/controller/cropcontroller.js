const Crop = require('../models/cropModel');

exports.createCrop = async (req, res) => {
    try {
        const crop = await Crop.create(req.body); // Add all details from req.body to the database
        res.status(200).json({
            success: true,
            data: crop,
            message: 'Crop created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message
        });
    }
};

exports.deleteCrop = async (req, res) => {
    try {
        const crop = await Crop.deleteOne({ _id: req.params.id }); // Delete crop by ID
        res.status(200).json({
            success: true,
            data: crop,
            message: 'Crop deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message
        });
    }
};

exports.getAllCrops = async (req, res) => {
    try {
        const cropData = await Crop.find(); // Retrieve all crops
        if (cropData.length === 0) {
            return res.status(404).json({ message: "No crops found" });
        }
        res.status(200).json(cropData);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message
        });
    }
};

exports.updateCrop = async (req, res) => {
    try {
        const id = req.params.id;
        const cropExist = await Crop.findById(id);
        if (!cropExist) {
            return res.status(404).json({ message: "Crop not found" });
        }
        const updatedCrop = await Crop.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedCrop);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message
        });
    }
};
const File = require("../models/cropModel");
const cloudinary = require("cloudinary").v2;


//localfileupload -> handler function
// const File = require('../models/File'); // Ensure you import the correct model

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    console.log("temp file path", file.tempFilePath);

    if (quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Image upload handler
exports.imageUpload = async (req, res) => {
    try {
        // Data fetch
        const { crop, croptype, email, harvestdate, season, state, pricePerKg, quantity, soiltype, region, description } = req.body;
        console.log(crop, croptype, email, harvestdate, season, state, pricePerKg, quantity, soiltype, region, description);

        const file = req.files.imageFile; // Assuming the image file is being uploaded under this key
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase(); // Using pop() for better clarity
        console.log("File Type:", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            });
        }

        // File format supported
        console.log("Uploading to Cloudinary");
        const response = await uploadFileToCloudinary(file, "krishisahyog");
        console.log(response);

        // Save to database according to the crop schema
        const cropData = await Crop.create({
            crop,
            croptype,
            email,
            harvestdate,
            season,
            state,
            pricePerKg,
            quantity,
            soiltype,
            region,
            description,
            cropimage1: response.secure_url,
            // cropimage2: response.secure_url,
            // cropimage3: response.secure_url, // Assuming you're saving the first image here

            
            // Assuming you're saving the first image here
             // Assuming you're saving the first image here
            // Add more crop images as needed (e.g., cropimage2, cropimage3)
        });

        res.json({
            success: true,
            cropData,
            message: 'Crop details successfully uploaded',
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}

// Image size reducer
exports.imageSizeReducer = async (req, res) => {
    try {
        // Data fetch
        const { crop, croptype, email, harvestdate, season, state, pricePerKg, quantity, soiltype, region, description } = req.body;
        console.log(crop, croptype, email, harvestdate, season, state, pricePerKg, quantity, soiltype, region, description);

        const file = req.files.imageFile; // Assuming the image file is being uploaded under this key
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File Type:", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            });
        }

        // File format supported
        console.log("Uploading to Cloudinary with reduced size");
        const response = await uploadFileToCloudinary(file, "krishisahyog", 90);
        console.log(response);

        // Save to database according to the crop schema
        const cropData = await Crop.create({
            crop,
            croptype,
            email,
            harvestdate,
            season,
            state,
            pricePerKg,
            quantity,
            soiltype,
            region,
            description,
            cropimage1: response.secure_url, // Save the image URL
            // Add more crop images as needed (e.g., cropimage2, cropimage3)
        });

        res.json({
            success: true,
            cropData,
            message: 'Crop details successfully uploaded with reduced image size',
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}
