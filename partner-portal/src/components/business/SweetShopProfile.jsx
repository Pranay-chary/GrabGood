import React, { useState } from 'react';
import SweetShopBasic from './sweetshop/SweetShopBasic';
import SweetShopProducts from './sweetshop/SweetShopProducts';
import SweetShopOffers from './sweetshop/SweetShopOffers';
import SweetShopOrders from './sweetshop/SweetShopOrders';
import SweetShopPhotos from './sweetshop/SweetShopPhotos';

const SweetShopProfile = ({ initialData = {} }) => {
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
    fssaiLicense: initialData.fssaiLicense || '',
    
    // Products
    products: initialData.products || [],
    
    // Offers
    offers: initialData.offers || [],
    
    // Orders
    orderSettings: initialData.orderSettings || {
      minimumOrderValue: '',
      deliveryRadius: '',
      deliveryCharge: '',
      freeDeliveryAbove: '',
      deliveryTime: '',
      advanceOrderDays: 7,
      acceptBulkOrders: true
    },
    
    // Photos
    photos: initialData.photos || []
  });

  const handleChange = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/partner/sweet-shop/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Sweet Shop profile updated successfully!');
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
              activeTab === 'products'
                ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } py-4 px-6 text-center font-medium`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`${
              activeTab === 'offers'
                ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } py-4 px-6 text-center font-medium`}
            onClick={() => setActiveTab('offers')}
          >
            Offers
          </button>
          <button
            className={`${
              activeTab === 'orders'
                ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } py-4 px-6 text-center font-medium`}
            onClick={() => setActiveTab('orders')}
          >
            Order Settings
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
          <SweetShopBasic 
            data={formData} 
            onChange={(data) => {
              const { businessName, description, address, city, pincode, phone, email, gstin, fssaiLicense } = data;
              setFormData(prev => ({
                ...prev,
                businessName, description, address, city, pincode, phone, email, gstin, fssaiLicense
              }));
            }} 
          />
        )}
        
        {activeTab === 'products' && (
          <SweetShopProducts 
            products={formData.products} 
            onChange={(products) => handleChange('products', products)} 
          />
        )}
        
        {activeTab === 'offers' && (
          <SweetShopOffers 
            offers={formData.offers} 
            onChange={(offers) => handleChange('offers', offers)} 
          />
        )}
        
        {activeTab === 'orders' && (
          <SweetShopOrders 
            orderSettings={formData.orderSettings} 
            onChange={(orderSettings) => handleChange('orderSettings', orderSettings)} 
          />
        )}
        
        {activeTab === 'photos' && (
          <SweetShopPhotos 
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

export default SweetShopProfile; 