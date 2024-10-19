// FarmerNav component (FarmerNav.jsx)
import React from 'react';
import { Link } from 'react-router-dom';
import Allcrops from './Allcrops';

const FarmerNav = () => {
    return (
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
                </ul>
            </div>
        </nav>
    );
};

export default FarmerNav;
