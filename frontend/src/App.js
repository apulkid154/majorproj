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
// import Marketplace from './components/Marketplace';

const App = () => {
  return (
    <CartProvider>
         <Router>
      <div>
        {/* <NavigationBar /> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/cropform" element={<CropForm />} />
          {/* <Route path="/farmer/*" element={<FarmerNav />}/> */}
            <Route path="/farmer/all-crops" element={<Allcrops />} />
            <Route path="/farmer/add-crop" element={<CropForm />} />
            <Route path="/farmer/my-crop-list" element={<MyCropList />} />
            {/* <Route path='/marketplace' element={<Marketplace/>} /> */}
            <Route path="/farmer/bidder-list" element={<BidderList />} />
          <Route path="/farmer/cropdetails/:cropId" element={<CropDetails />} />
          <Route path="farmer/cart" element={<CartPage />} />


          <Route path="/buyer" element={<BuyerNav />} />
          <Route path="/admin" element={<AdminNav />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
   
  );
}

export default App;
