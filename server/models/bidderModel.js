const mongoose = require('mongoose');

// Define the Bid schema
const bidSchema = new mongoose.Schema({
    bidder: {
        type: mongoose.Schema.Types.ObjectId,

        ref: 'buyers',
        required: true
    },
   
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop',
        required: true
    },
    cropName: {
        type: String, // No longer required as it will be populated automatically
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Expired'],
        default: 'Active'
    },
    accepted: {
        type: Boolean,
        default: false
    },
    expirationDate: {
        type: Date
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Populate cropName field before saving
bidSchema.pre('save', async function(next) {
    if (!this.isModified('crop')) {
        return next();
    }
    try {
        const crop = await mongoose.model('Crop').findById(this.crop);
        this.cropName = crop.name;
        next();
    } catch (error) {
        next(error);
    }
});

// Create the Bid model
const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
