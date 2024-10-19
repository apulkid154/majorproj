const Admin = require('../models/adminModel');
const bidder = require('../models/bidderModel'); // Import the Buyer model
const farmer=require('../models/farmerModel')



// Controller to create a new admin
// exports.createAdmin = async (req, res) => {
//     const { name, mobile, email, address, password ,role} = req.body;
//     try {
//         const admin = new Admin({ name, mobile, email, address, password,role });
//         await admin.save();
//         res.status(201).json(admin);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
// const Admin = require('../models/adminModel'); // Adjust the path as necessary

exports.createAdmin = async (req, res) => {
    try {
        const adminData = req.body; // Get data from request body
        const newAdmin = new Admin(adminData); // Create a new admin instance
        await newAdmin.save(); // Save the admin to the database
        res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating admin', error: error.message });
    }
};

// // Controller to get all admins
// exports.getAllAdmins = async (req, res) => {
//     try {
//         const admins = await Admin.find();
//         res.status(200).json(admins);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Controller to get admin by ID
exports.getAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to update an admin
exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, mobile, email, address, password } = req.body;
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, { name, mobile, email, address, password }, { new: true });
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to delete an admin
exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        await Admin.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Controller to block a bidder
exports.blockBidder = async (req, res) => {
    const { adminId, buyerId } = req.params;
    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        admin.blockedBidders.push(buyerId);
        await admin.save();
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Controller to unblock a bidder
exports.unblockBidder = async (req, res) => {
    const { adminId, buyerId } = req.params;
    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        admin.blockedBidders = admin.blockedBidders.filter(id => id !== buyerId);
        await admin.save();
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
