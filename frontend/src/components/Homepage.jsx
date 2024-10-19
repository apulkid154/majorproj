import React from 'react';
import NavigationBar from './NavigationBar';
const Homepage = () => {
  return (
    <>
     <NavigationBar />
   
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-between p-4 " style={{ 
      backgroundImage: "url('./farm.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "grayscale(40%)",
      paddingTop: "20vh" 
  }}>
      <div className="text-center text-white flex justify-center items-center flex-col">
          <h1 className="text-7xl font-bold mb-4 animate-bounce text-green-950">Welcome to Crop Auction Portal</h1>
          <a href="/login" className="bg-white text-green-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-300 transition duration-300">Get Started</a>
      </div>
  </div>
  </>
  
  );
};

export default Homepage;
