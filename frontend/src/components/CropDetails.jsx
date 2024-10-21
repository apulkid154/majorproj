import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CropDetails = () => {
    const { cropId } = useParams(); // Get the crop ID from the URL
    const [crop, setCrop] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const fetchCropDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/crop/cropdetails/${cropId}`);
                setCrop(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching crop details:', error);
                setLoading(false); // Even if there's an error, stop loading
            }
        };

        fetchCropDetails();
    }, [cropId]);

    if (loading) {
        // Show a spinner or loading message while fetching data
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
        );
    }

    if (!crop) {
        // If no crop data is available, show an error message
        return <p className="text-center text-red-500">Error: Crop details not found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold mb-4">{crop.crop}</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="relative mb-6">
                    {crop.cropimage1 ? (
                        <img
                            src={`data:${crop.cropimage1.contentType};base64,${crop.cropimage1.data}`}
                            alt={crop.crop}
                            className="w-full h-64 object-cover"
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </div>
                <p className="text-lg mb-2"><strong>Crop Name:</strong> {crop.crop}</p>
                <p className="text-lg mb-2"><strong>Crop Type:</strong> {crop.croptype}</p>
                <p className="text-lg mb-2"><strong>Harvest Date:</strong> {new Date(crop.harvestdate).toLocaleDateString()}</p>
                <p className="text-lg mb-2"><strong>Price per kg:</strong> ₹{crop.pricePerKg}</p>
                <p className="text-lg mb-2"><strong>Quantity (in kg):</strong> {crop.quantity}</p>
                <p className="text-lg mb-2"><strong>Region:</strong> {crop.region}</p>
                <p className="text-lg mb-2"><strong>State:</strong> {crop.state}</p>
                <p className="text-lg mb-2"><strong>Season:</strong> {crop.season}</p>
                <p className="text-lg mb-2"><strong>Soil Type:</strong> {crop.soiltype}</p>
                <p className="text-lg mb-4"><strong>Description:</strong> {crop.description || 'No description available'}</p>

                {crop.isAuction && (
                    <div className="bg-green-100 p-4 rounded-md mb-4">
                        <h3 className="text-xl font-bold text-green-700 mb-2">Auction Details</h3>
                        <p className="text-lg mb-2"><strong>Base Price:</strong> ₹{crop.basePrice}</p>
                        <p className="text-lg mb-2"><strong>Auction Start Date:</strong> {crop.startDate ? new Date(crop.startDate).toLocaleDateString() : 'N/A'}</p>
                        <p className="text-lg mb-2"><strong>Auction End Date:</strong> {crop.endDate ? new Date(crop.endDate).toLocaleDateString() : 'N/A'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CropDetails;
