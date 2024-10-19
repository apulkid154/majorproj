const Farmer = require('../models/farmerModel'); // Ensure correct path to farmer model

// Create a new farmer
exports.createFarmer = async (req, res) => {
    try {
        const { 
            fullName, email, mobile, dateOfBirth, gender, profilePicture, 
            farmAddress, farmSize, farmingType, farmingExperience, 
            farmingPracticesDescription, cropFieldImage, State, Region 
        } = req.body;

        // Create a new farmer instance
        const newFarmer = new Farmer({
            fullName,
            email,
            mobile,
            dateOfBirth,
            gender,
            profilePicture, // Optional, can be handled with a file upload service (e.g., Cloudinary)
            farmAddress,
            farmSize,
            farmingType,
            farmingExperience,
            farmingPracticesDescription,
            cropFieldImage, // Optional, can be handled with a file upload service (e.g., Cloudinary)
            State,
            Region,
        });

        // Save the farmer to the database
        const savedFarmer = await newFarmer.save();

        // Return a success response
        res.status(201).json({
            success: true,
            data: savedFarmer,
            message: 'Farmer data saved successfully'
        });
    } catch (error) {
        console.error('Error saving farmer data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save farmer data',
            error: error.message
        });
    }
};

// Get all farmers
exports.getAllFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find(); // Fetch all farmers
        res.status(200).json({
            success: true,
            data: farmers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch farmers',
            error: error.message
        });
    }
};

// Get a single farmer by ID
exports.getFarmerById = async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.id);
        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: 'Farmer not found'
            });
        }
        res.status(200).json({
            success: true,
            data: farmer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch farmer',
            error: error.message
        });
    }
};

// Update farmer details
exports.updateFarmer = async (req, res) => {
    try {
        const updatedFarmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFarmer) {
            return res.status(404).json({
                success: false,
                message: 'Farmer not found'
            });
        }
        res.status(200).json({
            success: true,
            data: updatedFarmer,
            message: 'Farmer updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update farmer',
            error: error.message
        });
    }
};

// Delete a farmer
exports.deleteFarmer = async (req, res) => {
    try {
        const deletedFarmer = await Farmer.findByIdAndDelete(req.params.id);
        if (!deletedFarmer) {
            return res.status(404).json({
                success: false,
                message: 'Farmer not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Farmer deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete farmer',
            error: error.message
        });
    }
};
