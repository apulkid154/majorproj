const Bid = require('../models/bidderModel');
const Crop = require('../models/cropModel');
const Buyer = require('../models/buyerModel');

// Controller to get all bids
exports.getAllBids = async (req, res) => {
    try {
        const bids = await Bid.find();
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get bids by crop ID
exports.getBidsByCropId = async (req, res) => {
    const { cropId } = req.params;
    try {
        const bids = await Bid.find({ crop: cropId });
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to place a bid
exports.placeBid = async (req, res) => {
    const { buyerId, cropId } = req.params;
    const { amount } = req.body;
    try {
        // Check if the buyer is blocked
        const buyer = await Buyer.findById(buyerId);
        if (!buyer || buyer.blocked) {
            return res.status(403).json({ message: "Buyer is blocked. Cannot place bid." });
        }
        
        // Check if the crop ID exists in the database
        const crop = await Crop.findById(cropId);
        if (!crop) {
            return res.status(404).json({ message: "Crop not found" });
        }
        
        // Create a new bid against the specified crop ID
        const newBid = new Bid({ bidder: buyerId, crop: cropId, amount });
        await newBid.save();
        res.status(201).json(newBid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to update a bid
exports.updateBid = async (req, res) => {
    const { id, buyerId } = req.params;
    const { amount } = req.body;
    try {
        // Check if the buyer is blocked
        const buyer = await Buyer.findById(buyerId);
        if (!buyer || buyer.blocked) {
            return res.status(403).json({ message: "Buyer is blocked. Cannot update bid." });
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
        const maxBid = await Bid.aggregate([
            { $match: { crop: cropId } },
            { $sort: { amount: -1 } },
            { $limit: 1 },
            {
                $lookup: {
                    from: "buyers", // Assuming the name of the Buyer collection is "buyers"
                    localField: "bidder",
                    foreignField: "_id",
                    as: "buyer"
                }
            },
            { $unwind: "$buyer" },
            { 
                $project: { 
                    _id: 1,
                    amount: 1,
                    "buyer.name": 1
                } 
            }
        ]);

        if (maxBid.length > 0) {
            res.status(200).json(maxBid[0]);
        } else {
            res.status(404).json({ message: "No bids found for the specified crop" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
