const mongoose = require('mongoose');

// Define the Admin schema
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
     role: {
        type: String,
        required: true,
        // default: "farmer", // Default role is 'farmer'
        enum: ["farmer", "buyer", "admin"] // You can extend this list if needed
    },
    admin_token:{
        type:String,

    }
   
});

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
