import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext'; // Adjust the path accordingly
// import { useNavigate } from 'react-router-dom';

import { useParams, useNavigate } from 'react-router-dom'; 

const CropDetails = () => {
    const { cropId } = useParams();
    const { addToCart } = useCart(); // Use the cart context
    const [crop, setCrop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedQuantity, setSelectedQuantity] = useState(1); // New state for quantity
      const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
      const role = user?.role;

    useEffect(() => {
        const fetchCropDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/crop/cropdetails/${cropId}`);
                setCrop(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching crop details:', error);
                setLoading(false);
            }
        };

        fetchCropDetails();
    }, [cropId]);

    const handleAddToCart = () => {
    if (selectedQuantity > 0) {
        addToCart(crop, selectedQuantity); // Pass both crop and quantity separately
        alert(`${crop.crop} (Quantity: ${selectedQuantity}) has been added to your cart!`);
        navigate('/buyer/all-crops');
    } else {
        alert('Please select a valid quantity.');
    }
};


    // Increase quantity
    const increaseQuantity = () => {
        if (selectedQuantity < crop.quantity) { // Ensure quantity doesn't exceed available stock
            setSelectedQuantity((prevQty) => prevQty + 1);
        }
    };

    // Decrease quantity
    const decreaseQuantity = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity((prevQty) => prevQty - 1);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
        );
    }

    if (!crop) {
        return <p className="text-center text-red-500">Error: Crop details not found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold mb-4">{crop.crop}</h1>
            <div className="flex bg-white shadow-md rounded-lg overflow-hidden">
                <div className="w-1/3 h-full min-h-[300px] p-4">
                    {crop.cropimage1 ? (
                        <img
                            src={crop.cropimage1} // Directly using the Cloudinary URL
                            alt={crop.crop}
                            className="w-full h-64 object-cover"
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </div>
                <div className="w-1/2 p-6">
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

                    

                    {role === 'buyer' && (
                        <button
                            onClick={handleAddToCart}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropDetails;
