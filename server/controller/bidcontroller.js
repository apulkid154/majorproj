const Bid = require('../models/bidderModel');
const Crop = require('../models/cropModel');
const Buyer = require('../models/buyerModel');

// Middleware to verify authentication (assuming token validation middleware exists)
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Authentication token missing" });
    }
    // Add token validation logic here
    req.user = { id: "token" }; // Assume decoded user ID is available
    next();
};

// Controller to get all bids
exports.getAllBids = async (req, res) => {
    try {
        const bids = await Bid.find().populate('bidder', 'name').populate('crop', 'name');
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get bids by crop ID
exports.getBidsByCropId = async (req, res) => {
    const { cropId } = req.params;
    try {
        const bids = await Bid.find({ crop: cropId }).populate('bidder', 'name').sort({ amount: -1 });
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to place a bid
const jwt = require('jsonwebtoken');
// const Buyer = require('../models/buyerModel');
// const Bid = require('../models/bidderModel');
// const Crop = require('../models/cropModel');

exports.placeBid = async (req, res) => {
    const { cropId } = req.params;
    const { amount} = req.body;  // Extract buyerId from the request body

    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
        if (!token) {
            return res.status(401).json({ message: "Authentication token missing" });
        }

        // Decode the token to get the user (buyer) id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const authenticatedBuyerId = decoded.id;

        // Validate that the buyerId in the request matches the buyerId from the token
        // if (buyerId !== authenticatedBuyerId) {
        //     return res.status(403).json({ message: "Unauthorized action. Buyer ID mismatch." });
        // }

        // Check if the buyer is blocked
        const buyer = await Buyer.findById(authenticatedBuyerId);
        if (!buyer || buyer.blocked) {
            return res.status(403).json({ message: "Buyer is blocked. Cannot place bid." });
        }

        // Check if the crop ID exists
        const crop = await Crop.findById(cropId);
        if (!crop) {
            return res.status(404).json({ message: "Crop not found" });
        }

        // Validate the bid amount
        const maxBid = await Bid.findOne({ crop: cropId }).sort({ amount: -1 });
        if (maxBid && amount <= maxBid.amount) {
            return res.status(400).json({ message: "Bid amount must be greater than the current maximum bid." });
        }

        // Create a new bid
        const newBid = new Bid({ bidder: authenticatedBuyerId, crop: cropId, amount });
        await newBid.save();

        res.status(201).json(newBid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Controller to update a bid
exports.updateBid = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    try {
        const buyerId = req.user.id; // Extract buyer ID from token

        // Check if the buyer is blocked
        const buyer = await Buyer.findById(buyerId);
        if (!buyer || buyer.blocked) {
            return res.status(403).json({ message: "Buyer is blocked. Cannot update bid." });
        }

        // Validate the bid amount
        const bid = await Bid.findById(id);
        if (!bid || bid.bidder.toString() !== buyerId) {
            return res.status(404).json({ message: "Bid not found or unauthorized" });
        }

        const maxBid = await Bid.findOne({ crop: bid.crop }).sort({ amount: -1 });
        if (maxBid && amount <= maxBid.amount) {
            return res.status(400).json({ message: "Bid amount must be greater than the current maximum bid." });
        }

        const updatedBid = await Bid.findByIdAndUpdate(id, { amount }, { new: true });
        res.status(200).json(updatedBid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to delete a bid
exports.deleteBid = async (req, res) => {
    const { id } = req.params;

    try {
        const buyerId = req.user.id; // Extract buyer ID from token

        const bid = await Bid.findById(id);
        if (!bid || bid.bidder.toString() !== buyerId) {
            return res.status(404).json({ message: "Bid not found or unauthorized" });
        }

        await Bid.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to get the maximum bid for a particular crop along with the buyer's name and amount
exports.getMaxBidForCrop = async (req, res) => {
    const { cropId } = req.params;

    try {
        const maxBid = await Bid.findOne({ crop: cropId })
            .sort({ amount: -1 })
            .populate('bidder', 'name email')
            .populate('crop', 'name');

        if (!maxBid) {
            return res.status(404).json({ message: "No bids found for this crop." });
        }

        res.status(200).json({
            crop: maxBid.crop.name,
            bidder: maxBid.bidder.name,
            email: maxBid.bidder.email,
            amount: maxBid.amount,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
