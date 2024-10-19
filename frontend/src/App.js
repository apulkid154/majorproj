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

const App = () => {
  return (
    <Router>
      <div>
        {/* <NavigationBar /> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/cropform" element={<CropForm />} />
          <Route path="/farmer/*" element={<FarmerNav />}/>
            <Route path="/farmer/all-crops" element={<Allcrops />} />
            <Route path="/farmer/add-crop" element={<CropForm />} />
            <Route path="/farmer/my-crop-list" element={<MyCropList />} />
            <Route path="/farmer/bidder-list" element={<BidderList />} />
         
          <Route path="/buyer" element={<BuyerNav />} />
          <Route path="/admin" element={<AdminNav />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
