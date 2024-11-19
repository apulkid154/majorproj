import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Homepage from './components/Homepage';
import Registration from './components/Registration';
import Login from './components/Login';
import Feedback from './components/Feedback';
import CropForm from './components/CropForm';
import FarmerNav from './components/FarmerNav';
import BuyerNav from './components/BuyerNav';
import AdminNav from './components/AdminNav';
import Allcrops from './components/Allcrops';
import BidderList from './components/BidderList';
import MyCropList from './components/MyCropList';
import CropDetails from './components/CropDetails';
import CartPage from './components/CartPage';
import { CartProvider } from './components/CartContext';
import AdminDashboard from './components/AdminDashboard';
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles
import ManageCrops from './components/ManageCrops';


const App = () => {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            {/* General Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/cropform" element={<CropForm />} />
            
            {/* Farmer Routes */}
            <Route path="/farmer" element={<FarmerNav />}>
              <Route path="all-crops" element={<Allcrops />} />
              <Route path="add-crop" element={<CropForm />} />
              <Route path="my-crop-list" element={<MyCropList />} />
              <Route path="bidder-list" element={<BidderList />} />
              <Route path="cropdetails/:cropId" element={<CropDetails />} />
              <Route path="cart" element={<CartPage />} />
            </Route>

            {/* Buyer Routes */}
            <Route path="/buyer" element={<BuyerNav />}>
              <Route path="all-crops" element={<Allcrops />} />
              <Route path="cropdetails/:cropId" element={<CropDetails />} />
              <Route path="cart" element={<CartPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminNav />}>
              <Route path="dashboard" element={<AdminDashboard/>} />
              <Route path="manage-crops" element={<ManageCrops/>} />

            </Route>

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
