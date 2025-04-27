import React, { useState } from 'react';
import FunctionHallBasic from './functionhall/FunctionHallBasic';
import FunctionHallVenues from './functionhall/FunctionHallVenues';
import FunctionHallPricing from './functionhall/FunctionHallPricing';
import FunctionHallAvailability from './functionhall/FunctionHallAvailability';
import FunctionHallPhotos from './functionhall/FunctionHallPhotos';

const FunctionHallProfile = ({ initialData = {} }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    // Basic Info
    businessName: initialData.businessName || '',
    description: initialData.description || '',
    address: initialData.address || '',
    city: initialData.city || '',
    pincode: initialData.pincode || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
    gstin: initialData.gstin || '',
    yearEstablished: initialData.yearEstablished || '',
    openingTime: initialData.openingTime || '',
    closingTime: initialData.closingTime || '',
    specialties: initialData.specialties || '',
    uniqueFeatures: initialData.uniqueFeatures || '',
    
    // Venues
    venues: initialData.venues || [],
    
    // Pricing
    pricing: initialData.pricing || {
      basicPackages: [],
      additionalServices: []
    },
    
    // Availability
    availability: initialData.availability || {},
    
    // Photos
    photos: initialData.photos || [],
  });

  const handleChange = (section, data) => {
    setFormData({
      ...formData,
      [section]: data
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/partner/function-hall/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Function Hall profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            className={`${
              activeTab === 'basic'
                ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } py-4 px-6 text-center font-medium`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button
            className={`${
              activeTab === 'venues'
                ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } py-4 px-6 text-center font-medium`}
            onClick={() => setActiveTab('venues')}
          >
            Venues
          </button>
          <button
            className={`${
              activeTab === 'pricing'
                ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } py-4 px-6 text-center font-medium`}
            onClick={() => setActiveTab('pricing')}
          >
            Pricing
          </button>
          <button
            className={`${
              activeTab === 'availability'
                ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } py-4 px-6 text-center font-medium`}
            onClick={() => setActiveTab('availability')}
          >
            Availability
          </button>
          <button
            className={`${
              activeTab === 'photos'
                ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } py-4 px-6 text-center font-medium`}
            onClick={() => setActiveTab('photos')}
          >
            Photos
          </button>
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {activeTab === 'basic' && (
          <FunctionHallBasic 
            data={formData} 
            onChange={handleChange} 
          />
        )}
        
        {activeTab === 'venues' && (
          <FunctionHallVenues 
            venues={formData.venues} 
            onChange={(venues) => handleChange('venues', venues)} 
          />
        )}
        
        {activeTab === 'pricing' && (
          <FunctionHallPricing 
            pricing={formData.pricing} 
            onChange={(pricing) => handleChange('pricing', pricing)} 
          />
        )}
        
        {activeTab === 'availability' && (
          <FunctionHallAvailability 
            availability={formData.availability} 
            venues={formData.venues}
            onChange={(availability) => handleChange('availability', availability)} 
          />
        )}
        
        {activeTab === 'photos' && (
          <FunctionHallPhotos 
            photos={formData.photos} 
            onChange={(photos) => handleChange('photos', photos)} 
          />
        )}
        
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default FunctionHallProfile; 