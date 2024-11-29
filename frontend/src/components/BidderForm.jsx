import React, { useState, useEffect } from 'react';
// import API from './api'; // Axios instance
import { toast } from 'react-hot-toast';

const BidderForm = () => {
    const [bids, setBids] = useState([]);
    const [currentMaxBid, setCurrentMaxBid] = useState(null);
    const [cropId, setCropId] = useState('');
    const [amount, setAmount] = useState('');
    const [timeLeft, setTimeLeft] = useState('');
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    if (!token) {
        toast.error('User is not authenticated!');
        return null;
    }

    // Fetch the maximum bid for a specific crop
    const fetchMaxBid = async (cropId) => {
        try {
            const response = await API.get(`/maxbid/max/${cropId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCurrentMaxBid(response.data);
        } catch (error) {
            toast.error('Failed to fetch maximum bid');
        }
    };

    // Handle form submission for placing a bid
    const placeBid = async () => {
        if (!cropId || !amount) {
            return toast.error('Please provide a Crop ID and a Bid Amount.');
        }

        if (currentMaxBid && parseFloat(amount) <= parseFloat(currentMaxBid.amount)) {
            return toast.error('Your bid must be greater than the current maximum bid.');
        }

        try {
            const response = await API.post(`http://localhost:3000/api/bid/createbid/${cropId}/${buyerId}`, { amount }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Bid placed successfully');
            fetchMaxBid(cropId); // Refresh the maximum bid
        } catch (error) {
            toast.error('Failed to place bid');
        }
    };

    // Fetch time left for the crop's bidding period
    const fetchTimeLeft = async (cropId) => {
        try {
            const response = await API.get(`/bids/${cropId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { timeLeft } = response.data;
            setTimeLeft(timeLeft);
        } catch (error) {
            toast.error('Failed to fetch time left for bidding');
        }
    };

    // Handle crop selection
    const handleCropSelection = (e) => {
        const selectedCropId = e.target.value;
        setCropId(selectedCropId);
        fetchMaxBid(selectedCropId);
        fetchTimeLeft(selectedCropId);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Place Your Bid</h1>

            {/* Crop Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Crop ID:</label>
                <input
                    type="text"
                    value={cropId}
                    onChange={handleCropSelection}
                    placeholder="Enter Crop ID"
                    className="w-full px-4 py-2 border rounded"
                />
            </div>

            {/* Display Current Maximum Bid */}
            {currentMaxBid && (
                <div className="mb-4 bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold">Current Maximum Bid</h2>
                    <p>Amount: ₹{currentMaxBid.amount}</p>
                    <p>Bid Status: {currentMaxBid.status}</p>
                </div>
            )}

            {/* Display Time Left */}
            {timeLeft && (
                <div className="mb-4 bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold">Time Left</h2>
                    <p>{timeLeft}</p>
                </div>
            )}

            {/* Enter New Bid Amount */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Your Bid Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                    className="w-full px-4 py-2 border rounded"
                />
            </div>

            {/* Submit Bid Button */}
            <button
                onClick={placeBid}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Place Bid
            </button>
        </div>
    );
};

export default BidderForm;
