import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Registration = () => {
    const [activeTab, setActiveTab] = useState('admin');
    const [adminFormData, setAdminFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        address: '',
        password: '',
        role: 'admin', // Assuming default role is admin
    });
    const [farmerFormData, setFarmerFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        dateOfBirth: '',
        gender: '',
        password: '',
        farmAddress: '',
        farmSize: '',
        farmingType: '',
        farmingExperience: '',
        farmingPracticesDescription: '',
        State: '',
        Region: '',
        role: 'farmer', // Assuming default role is farmer
    });
    const [buyerFormData, setBuyerFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        address: '',
        password: '',
        role: 'buyer', // Assuming default role is buyer
    });

    // Switch between tabs for Admin, Farmer, and Buyer registration
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Handle Admin Registration form submission
    const handleAdminRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/admin/signup", adminFormData);
            console.log("Admin registration successful:", response.data);
        } catch (error) {
            console.error("Error registering admin:", error);
        }
    };

    // Handle Farmer Registration form submission
  const handleFarmerRegistration = async (e) => {
    e.preventDefault();
    console.log("Submitting farmer data:", farmerFormData); // Check the form data
    try {
        const response = await axios.post("http://localhost:3000/api/farmer/signup", farmerFormData);
        console.log("Farmer registration successful:", response.data);
    } catch (error) {
        console.error("Error registering farmer:", error.response ? error.response.data : error.message);
    }
};


    // Handle Buyer Registration form submission
    const handleBuyerRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/buyer/signup", buyerFormData);
            console.log("Buyer registration successful:", response.data);
        } catch (error) {
            console.error("Error registering buyer:", error);
        }
    };

    // Handle input changes for the form (Admin, Farmer, Buyer)
    const handleInputChange = (e, formDataSetter) => {
        const { name, value } = e.target;
        formDataSetter((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    

   return (
        <>
            <NavigationBar />

            <div className="flex justify-center items-center h-full bg-cover bg-gray-200" style={{ backgroundImage: "url('./farmer.webp')" }}>
                <div className="bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Welcome to Registration</h2>
                    <div className="flex justify-between mb-4">
                        <button
                            className={`${activeTab === 'admin' ? 'bg-green-700 text-white' : 'text-green-700'} px-4 py-2 rounded-tl-md rounded-tr-md`}
                            onClick={() => handleTabChange('admin')}
                        >
                            Admin
                        </button>
                        <button
                            className={`${activeTab === 'farmer' ? 'bg-green-700 text-white' : 'text-green-700'} px-4 py-2`}
                            onClick={() => handleTabChange('farmer')}
                        >
                            Farmer
                        </button>
                        <button
                            className={`${activeTab === 'buyer' ? 'bg-green-700 text-white' : 'text-green-700'} px-4 py-2 rounded-tr-md rounded-tl-md`}
                            onClick={() => handleTabChange('buyer')}
                        >
                            Buyer
                        </button>
                    </div>

                    {activeTab === 'admin' && (
                        <form className="space-y-4" onSubmit={handleAdminRegistration}>
                            <div>
                                <label htmlFor="name" className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={adminFormData.name}
                                    onChange={(e) => handleInputChange(e, setAdminFormData)}
                                    placeholder="Name"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block mb-1">Mobile Number</label>
                                <input
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    value={adminFormData.mobile}
                                    onChange={(e) => handleInputChange(e, setAdminFormData)}
                                    placeholder="Mobile Number"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={adminFormData.email}
                                    onChange={(e) => handleInputChange(e, setAdminFormData)}
                                    placeholder="Email Address"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-1">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={adminFormData.address}
                                    onChange={(e) => handleInputChange(e, setAdminFormData)}
                                    placeholder="Address"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-1">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={adminFormData.password}
                                    onChange={(e) => handleInputChange(e, setAdminFormData)}
                                    placeholder="Password"
                                    className="input-field"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role:</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={adminFormData.role}
                                    onChange={handleInputChange}
                                    disabled // Predefined as 'admin'
                                />
                            </div>
                          
                            <button type="submit" className="btn-submit">Register as Admin</button>
                        </form>
                    )}

                   {activeTab === 'farmer' && (
    <form className="space-y-4" onSubmit={handleFarmerRegistration}>
        <div>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={farmerFormData.name}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={farmerFormData.email}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="mobile" className="block mb-1">Mobile Number:</label>
                <input
                    type="text"
                    id="mobile"
                    name="mobile" // Ensure this matches the state
                    value={farmerFormData.mobile} // This should also be updated to match the state
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                    placeholder="Mobile Number"
                    className="input-field"
                />
            </div>

            <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={farmerFormData.dateOfBirth}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    name="gender"
                    value={farmerFormData.gender}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={farmerFormData.password}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="farmAddress">Farm Address:</label>
                <input
                    type="text"
                    id="farmAddress"
                    name="farmAddress"
                    value={farmerFormData.farmAddress}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="farmSize">Farm Size (in acres):</label>
                <input
                    type="text"
                    id="farmSize"
                    name="farmSize"
                    value={farmerFormData.farmSize}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="farmingType">Farming Type:</label>
                <input
                    type="text"
                    id="farmingType"
                    name="farmingType"
                    value={farmerFormData.farmingType}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="farmingExperience">Farming Experience (in years):</label>
                <input
                    type="text"
                    id="farmingExperience"
                    name="farmingExperience"
                    value={farmerFormData.farmingExperience}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="farmingPracticesDescription">Farming Practices Description:</label>
                <textarea
                    id="farmingPracticesDescription"
                    name="farmingPracticesDescription"
                    value={farmerFormData.farmingPracticesDescription}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="State">State:</label>
                <input
                    type="text"
                    id="State"
                    name="State"
                    value={farmerFormData.State}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="Region">Region:</label>
                <input
                    type="text"
                    id="Region"
                    name="Region"
                    value={farmerFormData.Region}
                    onChange={(e) => handleInputChange(e, setFarmerFormData)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="role">Role:</label>
                <input
                    type="text"
                    id="role"
                    name="role"
                    value={farmerFormData.role}
                    readOnly
                />
            </div>
        </div>
        <button type="submit" className="btn-submit">Register as Farmer</button>
    </form>
)}



                    {activeTab === 'buyer' && (
                        <form className="space-y-4" onSubmit={handleBuyerRegistration}>
                            <div>
                                <label htmlFor="name" className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={buyerFormData.name}
                                    onChange={(e) => handleInputChange(e, setBuyerFormData)}
                                    placeholder="Name"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block mb-1">Mobile Number</label>
                                <input
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    value={buyerFormData.mobile}
                                    onChange={(e) => handleInputChange(e, setBuyerFormData)}
                                    placeholder="Mobile Number"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={buyerFormData.email}
                                    onChange={(e) => handleInputChange(e, setBuyerFormData)}
                                    placeholder="Email Address"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-1">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={buyerFormData.address}
                                    onChange={(e) => handleInputChange(e, setBuyerFormData)}
                                    placeholder="Address"
                                    className="input-field"
                                />
                            </div>
                             <div>
                                <label htmlFor="password" className="block mb-1">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={buyerFormData.password}
                                    onChange={(e) => handleInputChange(e, setBuyerFormData)}
                                    placeholder="Password"
                                    className="input-field"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role:</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={buyerFormData.role}
                                    onChange={handleInputChange}
                                    disabled // Predefined as 'admin'
                                />
                            </div>
                            <button type="submit" className="btn-submit">Register as Buyer</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default Registration;