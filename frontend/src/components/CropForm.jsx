// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import FarmerNav from './FarmerNav';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AddCropForm = () => {
  // State to manage form inputs
  const [cropData, setCropData] = useState({
    crop: '',
    croptype: 'pulses',
    email: '',
    harvestdate: '',
    season: '',
    state: '',
    pricePerKg: '',
    quantity: '',
    soiltype: '',
    region: '',
    description: '',
    cropimage1: '',
    isAuction: false,
    basePrice: '',
    startDate: '',
    endDate: '',
    quantity: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCropData({
      ...cropData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  const resetForm = () => {
    setCropData(initialCropData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a FormData object to send the data
    const formData = new FormData();
    for (const key in cropData) {
      formData.append(key, cropData[key]);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/crop/createcrop', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Crop data submitted successfully:', response.data);
       toast.success('Crop added successfully!');
       resetForm();
      // You can handle success response here (e.g., show a success message, reset the form)
    } catch (error) {
      console.error('Error submitting crop data:', error);
      toast.error('Error submitting crop data.');
      // You can handle error response here (e.g., show an error message)
    }
  };

  return (
    <>
    <FarmerNav /> 
       <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-100 shadow-lg rounded-lg">
        <form
    
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {/* Crop Name */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Crop Name
        </label>
        <input
          type="text"
          name="crop"
          value={cropData.crop}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Crop Type */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Crop Type
        </label>
        <select
          name="croptype"
          value={cropData.croptype}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="pulses">Pulses</option>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
        </select>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={cropData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Harvest Date */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Harvest Date
        </label>
        <input
          type="date"
          name="harvestdate"
          value={cropData.harvestdate}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Season */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Season
        </label>
        <input
          type="text"
          name="season"
          value={cropData.season}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* State */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          State
        </label>
        <input
          type="text"
          name="state"
          value={cropData.state}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Price per Kg */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price per Kg
        </label>
        <input
          type="number"
          name="pricePerKg"
          value={cropData.pricePerKg}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Quantity (in kg)
        </label>
        <input
          type="number"
          name="quantity"
          value={cropData.quantity}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Soil Type */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Soil Type
        </label>
        <input
          type="text"
          name="soiltype"
          value={cropData.soiltype}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Region */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Region
        </label>
        <input
          type="text"
          name="region"
          value={cropData.region}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={cropData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Crop Image 1 */}
      <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Crop Image 1
  </label>
  <input
    type="file"
    name="cropimage1"
    onChange={(e) => setCropData({ ...cropData, cropimage1: e.target.files[0] })}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    accept="image/*"  // Restrict file types to images only
  />
</div>


      {/* Auction */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Auction
        </label>
        <input
          type="checkbox"
          name="isAuction"
          checked={cropData.isAuction}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
        <span className="text-sm">Enable Auction</span>
      </div>

      {/* Base Price (for Auction) */}
      {cropData.isAuction && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Base Price (for Auction)
          </label>
          <input
            type="number"
            name="basePrice"
            value={cropData.basePrice}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}

      {/* Auction Dates */}
      {cropData.isAuction && (
        <>
          <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Auction Start Date
  </label>
  <input
    type="date"
    name="startDate"
    value={cropData.startDate}
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    min={new Date().toISOString().split("T")[0]}  // Set the minimum date to today's date
  />
</div>


          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Auction End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={cropData.endDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Quantity (in kg)
        </label>
        <input
          type="number"
          name="quantity"
          value={cropData.quantity}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

        </>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-green-700 disabled:opacity-50"
        >
          Add Crop
        </button>
      </div>
    </form>
    </div>
    </>

   
    
  );
};

export default AddCropForm;
