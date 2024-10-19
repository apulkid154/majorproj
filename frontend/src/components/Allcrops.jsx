import React, { useState, useEffect } from 'react';
import FarmerNav from './FarmerNav';
import axios from 'axios';

const Allcrops = () => {
    const [crops, setCrops] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/cropdata');
                setCrops(response.data);
            } catch (error) {
                console.error('Error fetching crops:', error);
                // Handle error (e.g., display error message)
            }
        };

        fetchData();
    }, []);

    const getTimeRemaining = (endDate) => {
        const total = Date.parse(endDate) - Date.now();
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const seconds = Math.floor((total / 1000) % 60);

        return { days, hours, minutes, seconds };
    };

    const handleSelectCrop = (cropId) => {
        // Handle crop selection (e.g., add to cart, navigate to details page)
        console.log('Selected crop:', cropId);
    };

    return (
        <div>
            <FarmerNav />   
            <h1 className="text-3xl font-bold mb-4">All Crops</h1>
            {crops.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {crops.map(crop => (
                        <div key={crop._id} className="bg-gray-200 p-4 rounded-lg">
                            {crop.cropimage1 && (
                                <img
                                    src={`data:${crop.cropimage1.contentType};base64,${crop.cropimage1.data}`}
                                    alt={crop.cropname}
                                    className="w-full h-32 object-cover mb-2 rounded-md"
                                />
                            )}
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-bold">{crop.cropname}</p>
                                <p className="text-gray-600">${crop.basePrice}</p>
                            </div>
                            <p className="text-gray-600 mb-2">{crop.description}</p>
                            <p className="text-gray-600 mb-2">{crop.weight} kg</p>
                            <p className="text-gray-600 mb-2">Region: {crop.region}, State: {crop.state}</p>
                            <p className="text-gray-600 mb-2">Type: {crop.type}</p>
                            <p className="text-gray-600 mb-2">Category: {crop.category}</p>
                            <div className="text-gray-600 mb-2">
                                Start Date: {crop.startDate ? new Date(crop.startDate).toLocaleDateString() : 'N/A'}<br />
                                End Date: {crop.endDate ? new Date(crop.endDate).toLocaleDateString() : 'N/A'}
                            </div>
                            <div className="text-gray-600 mb-2">
                                Time Remaining: {getTimeRemaining(crop.endDate).days} days, {getTimeRemaining(crop.endDate).hours} hours, {getTimeRemaining(crop.endDate).minutes} minutes, {getTimeRemaining(crop.endDate).seconds} seconds
                            </div>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                onClick={() => handleSelectCrop(crop._id)}
                            >
                                Select Crop
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No crops available</p>
            )}
        </div>
    );
};

export default Allcrops;
