import React from 'react';
import FarmerNav from './FarmerNav';

const MyCropList = () => {
  // Sample data for crop list
  const crops = [
    {
      id: 1,
      name: 'Wheat',
      type: 'Cereal',
      basePrice: '$100',
      startDate: '2024-05-10',
      endDate: '2024-05-20',
      image: 'wheat.jpg',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Tomato',
      type: 'Vegetable',
      basePrice: '$50',
      startDate: '2024-06-01',
      endDate: '2024-06-15',
      image: 'tomato.jpg',
      status: 'Inactive'
    }
  ];

};

export default MyCropList;
