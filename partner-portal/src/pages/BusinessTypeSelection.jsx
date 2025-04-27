import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessTypeSelection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');

  const businessTypes = [
    {
      id: 'restaurant',
      name: 'Restaurant',
      description: 'For restaurants offering dine-in, takeout, or delivery services.',
      icon: (
        <svg className="w-10 h-10 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'hotel',
      name: 'Hotel',
      description: 'For hotels with dining services and accommodation facilities.',
      icon: (
        <svg className="w-10 h-10 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'function-hall',
      name: 'Function Hall',
      description: 'For banquet halls, party venues, and event spaces.',
      icon: (
        <svg className="w-10 h-10 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'sweet-shop',
      name: 'Sweet Shop',
      description: 'For sweet shops, bakeries, and dessert outlets.',
      icon: (
        <svg className="w-10 h-10 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  const handleContinue = () => {
    if (!selectedType) {
      alert('Please select a business type to continue');
      return;
    }
    
    // Navigate to the business registration page with the selected type
    navigate(`/business-registration/${selectedType}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Select Your Business Type
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Choose the type of business you want to register
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {businessTypes.map((type) => (
              <div
                key={type.id}
                className={`relative rounded-lg border p-4 cursor-pointer ${
                  selectedType === type.id
                    ? 'bg-[#e8f8f1] border-[#2ecc71]'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">{type.icon}</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{type.name}</h3>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                  {selectedType === type.id && (
                    <div className="absolute right-4">
                      <svg
                        className="h-6 w-6 text-[#2ecc71]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleContinue}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTypeSelection; 