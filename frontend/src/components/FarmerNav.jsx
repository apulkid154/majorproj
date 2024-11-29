// FarmerNav.jsx
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const FarmerNav = () => {
    const navigate = useNavigate();
    const [showLogoutScreen, setShowLogoutScreen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        setShowLogoutScreen(true); // Show logout screen
        toast.success('You have successfully logged out'); // Show confirmation

        // Redirect to home page after a delay
        setTimeout(() => {
            setShowLogoutScreen(false);
            navigate('/', { replace: true });
        }, 3000); // 3-second delay
    };

    if (showLogoutScreen) {
        return (
            <div className="flex items-center justify-center h-screen bg-green-100">
                <h2 className="text-2xl font-semibold text-green-700">
                    You have successfully logged out
                </h2>
            </div>
        );
    }

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-green-700 text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white font-bold text-lg">Home</Link>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/farmer/all-crops" className="text-white hover:text-gray-300">All Crops</Link>
                        </li>
                        <li>
                            <Link to="/farmer/add-crop" className="text-white hover:text-gray-300">Add Crop</Link>
                        </li>
                        <li>
                            <Link to="/farmer/my-crop-list" className="text-white hover:text-gray-300">My Crop List</Link>
                        </li>
                        <li>
                            <Link to="/farmer/bidder-list" className="text-white hover:text-gray-300">Bidder List</Link>
                        </li>
                        {/* <li>
                            <Link to="/farmer/cart" className="text-white hover:text-gray-300">My Cart</Link>
                        </li> */}
                        <li>
                            <button 
                                onClick={handleLogout} 
                                className="text-white hover:text-gray-300 focus:outline-none"
                            >
                                Logout
                            </button>
                        </li>
                        <li>
                            {/* <Link to="/farmer/chat" className="text-white hover:text-gray-300">Chat</Link> */}
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Nested Route Outlet */}
            <Outlet />
        </div>
    );
};

export default FarmerNav;
