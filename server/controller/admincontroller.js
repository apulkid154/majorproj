const Admin = require('../models/adminModel');
const Bidder = require('../models/bidderModel');
const Farmer = require('../models/farmerModel');
const Crop = require('../models/cropModel'); // Assuming you have a Crop model
const Buyer=require('../models/buyerModel')

// Controller to get all farmers
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
// Controller to block a user (Farmer/Buyer)

exports.getAllBuyers = async (req, res) => {
    try {
        const farmers = await Buyer.find(); // Fetch all farmers
        res.status(200).json({
            success: true,
            data: farmers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch buyers',
            error: error.message
        });
    }
};
// Controller to block a user (Farmer/Buyer)
exports.blockUser = async (req, res) => {
    const { userId, userType } = req.body; // Accepting user ID and type (Farmer or Buyer) from request body

    try {
        if (!userId || !userType) {
            return res.status(400).json({ message: 'User ID and user type are required' });
        }

        let userModel;

        // Determine the user model based on userType
        if (userType === 'farmer') {
            userModel = Farmer;
        } else if (userType === 'buyer') {
            userModel = Buyer;
        } else {
            return res.status(400).json({ message: 'Invalid user type. It must be "farmer" or "buyer"' });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isBlocked) {
            return res.status(400).json({ message: `${userType} is already blocked` });
        }

        user.isBlocked = true; // Block the user
        await user.save(); // Save the changes

        res.status(200).json({ message: `${userType} blocked successfully` });
    } catch (error) {
        res.status(500).json({ message: `Error blocking ${userType}: ${error.message}` });
    }
};

// Controller to unblock a user (Farmer/Buyer)
exports.unblockUser = async (req, res) => {
    const { userId, userType } = req.body; // Accepting user ID and type (Farmer or Buyer) from request body

    try {
        if (!userId || !userType) {
            return res.status(400).json({ message: 'User ID and user type are required' });
        }

        let userModel;

        // Determine the user model based on userType
        if (userType === 'farmer') {
            userModel = Farmer;
        } else if (userType === 'buyer') {
            userModel = Buyer;
        } else {
            return res.status(400).json({ message: 'Invalid user type. It must be "farmer" or "buyer"' });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.isBlocked) {
            return res.status(400).json({ message: `${userType} is already unblocked` });
        }

        user.isBlocked = false; // Unblock the user
        await user.save(); // Save the changes

        res.status(200).json({ message: `${userType} unblocked successfully` });
    } catch (error) {
        res.status(500).json({ message: `Error unblocking ${userType}: ${error.message}` });
    }
};

// Controller to get all crops
exports.getAllCrops = async (req, res) => {
    try {
        const crops = await Crop.find();
        res.status(200).json(crops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to delete a crop
exports.deleteCrop = async (req, res) => {
    const { cropId } = req.params;
    try {
        const deletedCrop = await Crop.findByIdAndDelete(cropId);
        if (!deletedCrop) {
            return res.status(404).json({ message: 'Crop not found' });
        }
        res.status(200).json({ message: 'Crop deleted successfully', deletedCrop });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to update crop details
exports.updateCrop = async (req, res) => {
    const { cropId } = req.params;  // Capture cropId from URL params
    const updatedData = req.body;   // Capture data from the request body

    try {
        // Attempt to find and update the crop with the given ID
        const updatedCrop = await Crop.findByIdAndUpdate(cropId, updatedData, { new: true });

        if (!updatedCrop) {
            return res.status(404).json({ message: 'Crop not found' });
        }

        // Successfully updated crop
        res.status(200).json({ message: 'Crop updated successfully', updatedCrop });
    } catch (error) {
        // If there's an error, return status 500 with the error message
        console.log(error);  // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
};


// Controller to get total stats for admin dashboard
// Assuming you have models for Farmer, Buyer, Crop, and Bidder
exports.getAdminStats = async (req, res) => {
    try {
        const totalFarmers = await Farmer.countDocuments();
        const totalBuyers = await Buyer.countDocuments();
        const totalUsers = totalFarmers + totalBuyers;
        const totalCrops = await Crop.countDocuments();
        const totalBids = await Bidder.countDocuments();
        
        // Count of sold crops
        const totalSoldCrops = await Crop.countDocuments({ isSold: true });

        // Fetch crops with their highest bid
        const cropsWithHighestBids = await Bidder.aggregate([
            {
                $group: {
                    _id: "$cropId", // Group by crop ID
                    highestBid: { $max: "$bidAmount" }
                }
            },
            {
                $lookup: {
                    from: "crops",
                    localField: "_id",
                    foreignField: "_id",
                    as: "cropDetails"
                }
            },
            {
                $unwind: "$cropDetails"
            },
            {
                $project: {
                    cropName: "$cropDetails.name",
                    highestBid: 1
                }
            }
        ]);

        res.status(200).json({
            totalUsers,
            totalFarmers,
            totalBuyers,
            totalCrops,
            totalBids,
            totalSoldCrops,
            cropsWithHighestBids
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Controller to view all bids on a specific crop
exports.getBidsForCrop = async (req, res) => {
    const { cropId } = req.params;
    try {
        const crop = await Crop.findById(cropId).populate('bids'); // Assuming bids are stored as a reference in Crop
        if (!crop) {
            return res.status(404).json({ message: 'Crop not found' });
        }
        res.status(200).json(crop.bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to delete a bid
exports.deleteBid = async (req, res) => {
    const { bidId } = req.params;
    try {
        const bid = await Bidder.findByIdAndDelete(bidId); // Assuming bids are stored in Bidder model
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }
        res.status(200).json({ message: 'Bid deleted successfully', bid });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
