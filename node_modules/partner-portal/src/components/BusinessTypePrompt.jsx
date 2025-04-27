import React from 'react';
import { Link } from 'react-router-dom';

const BusinessTypePrompt = ({ businessType }) => {
  // Define icons for each business type
  const icons = {
    restaurant: (
      <svg className="h-12 w-12 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    hotel: (
      <svg className="h-12 w-12 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'function-hall': (
      <svg className="h-12 w-12 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 3h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'sweet-shop': (
      <svg className="h-12 w-12 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    )
  };

  const titles = {
    restaurant: 'Restaurant Partner',
    hotel: 'Hotel Partner',
    'function-hall': 'Function Hall Partner',
    'sweet-shop': 'Sweet Shop Partner'
  };

  const descriptions = {
    restaurant: 'Manage your restaurant profile, menu items, and receive orders from customers.',
    hotel: 'Manage your hotel profile, rooms, pricing, and availability for bookings.',
    'function-hall': 'Manage your function hall venues, services, and event bookings.',
    'sweet-shop': 'Manage your sweet shop profile, products, and receive orders from customers.'
  };

  const nextSteps = {
    restaurant: [
      'Complete your restaurant profile',
      'Upload menu items with pricing',
      'Set your opening hours',
      'Add photos of your restaurant and dishes'
    ],
    hotel: [
      'Complete your hotel profile',
      'Add room types and amenities',
      'Set pricing and availability',
      'Upload photos of your property'
    ],
    'function-hall': [
      'Complete your function hall profile',
      'Add venue spaces and capacities',
      'Add services and packages',
      'Upload photos of your venues'
    ],
    'sweet-shop': [
      'Complete your sweet shop profile',
      'Add your products with pricing',
      'Set up delivery options',
      'Upload photos of your products'
    ]
  };

  if (!businessType || !icons[businessType]) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {icons[businessType]}
          </div>
          <div className="ml-5">
            <h3 className="text-lg font-medium text-gray-900">{titles[businessType]}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {descriptions[businessType]}
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900">Next steps to complete your profile:</h4>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {nextSteps[businessType].map((step, i) => (
              <li key={i} className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="ml-2 text-sm text-gray-500">{step}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6">
          <Link
            to="/profile"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
          >
            Complete Your Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessTypePrompt; 