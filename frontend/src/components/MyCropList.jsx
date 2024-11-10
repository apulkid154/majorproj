// MyCrops.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const MyCropList = () => {
    const [myCrops, setMyCrops] = useState([]);
    const [editingCrop, setEditingCrop] = useState(null);
    const [editData, setEditData] = useState({ cropName: '', cropType: '', pricePerKg: '', quantity: '' });
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch crops added by the logged-in user
    useEffect(() => {
        const fetchMyCrops = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('User is not authenticated!');
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/crop/mycrops', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use token for authentication
                    }
                });
                setMyCrops(response.data);
            } catch (error) {
                toast.error('Failed to load your crops');
            } finally {
                setLoading(false); // Always set loading to false after request
            }
        };

        fetchMyCrops();
    }, []);

    // Handle Delete Crop
    const deleteCrop = async (cropId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('User is not authenticated!');
                return;
            }

            await axios.delete(`/api/crops/delete/${cropId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setMyCrops(myCrops.filter((crop) => crop._id !== cropId));
            toast.success('Crop deleted successfully');
        } catch (error) {
            toast.error('Failed to delete the crop');
        }
    };

    // Handle Edit Crop form submission
    const handleEditSubmit = async (cropId) => {
        if (!editData.cropName || !editData.cropType || !editData.pricePerKg || !editData.quantity) {
            toast.error('Please fill out all fields before submitting');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('User is not authenticated!');
                return;
            }

            await axios.put(`/api/crops/edit/${cropId}`, editData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const updatedCrops = myCrops.map((crop) =>
                crop._id === cropId ? { ...crop, ...editData } : crop
            );
            setMyCrops(updatedCrops);
            setEditingCrop(null); // Exit edit mode
            toast.success('Crop updated successfully');
        } catch (error) {
            toast.error('Failed to update the crop');
        }
    };

    // Handle Edit Input Change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    // Render the crop list
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">My Crops List</h1>

            {loading ? ( // Show loading message if crops are being fetched
                <p>Loading crops...</p>
            ) : myCrops.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myCrops.map((crop) => (
                        <div key={crop._id} className="bg-white shadow-lg rounded-lg p-4">
                            {editingCrop === crop._id ? (
                                // Editing Mode UI
                                <div>
                                    <input
                                        type="text"
                                        name="cropName"
                                        value={editData.cropName}
                                        onChange={handleInputChange}
                                        placeholder="Crop Name"
                                        className="block w-full p-2 mb-2 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="cropType"
                                        value={editData.cropType}
                                        onChange={handleInputChange}
                                        placeholder="Crop Type"
                                        className="block w-full p-2 mb-2 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="number"
                                        name="pricePerKg"
                                        value={editData.pricePerKg}
                                        onChange={handleInputChange}
                                        placeholder="Price per kg"
                                        className="block w-full p-2 mb-2 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={editData.quantity}
                                        onChange={handleInputChange}
                                        placeholder="Quantity (kg)"
                                        className="block w-full p-2 mb-2 border border-gray-300 rounded"
                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditSubmit(crop._id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingCrop(null)}
                                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Viewing Mode UI
                                <div>
                                    <h2 className="text-xl font-semibold">{crop.cropName}</h2>
                                    <p>Type: {crop.cropType}</p>
                                    <p>Price per kg: ₹{crop.pricePerKg}</p>
                                    <p>Quantity: {crop.quantity} kg</p>
                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={() => {
                                                setEditingCrop(crop._id);
                                                setEditData({
                                                    cropName: crop.cropName,
                                                    cropType: crop.cropType,
                                                    pricePerKg: crop.pricePerKg,
                                                    quantity: crop.quantity,
                                                });
                                            }}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteCrop(crop._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">You haven't added any crops yet.</p>
            )}
        </div>
    );
};

export default MyCropList;
