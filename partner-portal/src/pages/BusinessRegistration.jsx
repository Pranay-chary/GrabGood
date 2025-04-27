import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PartnerNavbar from '../components/PartnerNavbar';

const BusinessRegistration = () => {
  const { businessType } = useParams();
  const navigate = useNavigate();
  
  // Form data state
  const [formData, setFormData] = useState({
    // Common fields for all business types
    businessName: '',
    address: '',
    city: '',
    pincode: '',
    gstin: '',
    fssaiLicense: '',
    contactPhone: '',
    contactEmail: '',
    description: '',
    openTime: '09:00',
    closeTime: '21:00',
    hasDelivery: false,
    hasTakeout: false,
    
    // Restaurant specific fields
    cuisine: businessType === 'restaurant' ? [] : undefined,
    seatingCapacity: businessType === 'restaurant' ? '' : undefined,
    averageCost: businessType === 'restaurant' ? '' : undefined,
    
    // Hotel specific fields
    roomCount: businessType === 'hotel' ? '' : undefined,
    amenities: businessType === 'hotel' ? [] : undefined,
    checkInTime: businessType === 'hotel' ? '14:00' : undefined,
    checkOutTime: businessType === 'hotel' ? '12:00' : undefined,
    
    // Function Hall specific fields
    hallCapacity: businessType === 'function-hall' ? '' : undefined,
    eventTypes: businessType === 'function-hall' ? [] : undefined,
    hasParking: businessType === 'function-hall' ? false : undefined,
    hasCatering: businessType === 'function-hall' ? false : undefined,
    
    // Sweet Shop specific fields
    specialties: businessType === 'sweet-shop' ? [] : undefined,
    hasCustomOrders: businessType === 'sweet-shop' ? false : undefined,
    minOrderValue: businessType === 'sweet-shop' ? '' : undefined,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Format business type for display
  const formatBusinessType = (type) => {
    if (type === 'function-hall') return 'Function Hall';
    if (type === 'sweet-shop') return 'Sweet Shop';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (name === 'cuisine' || name === 'amenities' || name === 'eventTypes' || name === 'specialties') {
      // Handle multi-select options
      const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
      setFormData({
        ...formData,
        [name]: selectedOptions
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/businesses/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          businessType
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Redirect to dashboard after successful registration
        navigate('/dashboard');
      } else {
        setError(data.message || 'Failed to register business. Please try again.');
      }
    } catch (error) {
      console.error('Business registration error:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Render fields based on business type
  const renderBusinessTypeFields = () => {
    switch (businessType) {
      case 'restaurant':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cuisine Types</label>
              <select
                multiple
                name="cuisine"
                value={formData.cuisine || []}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              >
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Thai">Thai</option>
                <option value="Continental">Continental</option>
                <option value="South Indian">South Indian</option>
                <option value="North Indian">North Indian</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Bakery">Bakery</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple cuisines</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Seating Capacity</label>
              <input
                type="number"
                name="seatingCapacity"
                value={formData.seatingCapacity || ''}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Average Cost for Two (₹)</label>
              <input
                type="number"
                name="averageCost"
                value={formData.averageCost || ''}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              />
            </div>
          </>
        );
        
      case 'hotel':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Rooms</label>
              <input
                type="number"
                name="roomCount"
                value={formData.roomCount || ''}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Amenities</label>
              <select
                multiple
                name="amenities"
                value={formData.amenities || []}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              >
                <option value="Wifi">Wifi</option>
                <option value="Pool">Swimming Pool</option>
                <option value="Spa">Spa</option>
                <option value="Gym">Gym</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Room Service">Room Service</option>
                <option value="Air Conditioning">Air Conditioning</option>
                <option value="Bar">Bar</option>
                <option value="Conference Room">Conference Room</option>
                <option value="Parking">Parking</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple amenities</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-in Time</label>
                <input
                  type="time"
                  name="checkInTime"
                  value={formData.checkInTime || ''}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-out Time</label>
                <input
                  type="time"
                  name="checkOutTime"
                  value={formData.checkOutTime || ''}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
            </div>
          </>
        );
        
      case 'function-hall':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hall Capacity</label>
              <input
                type="number"
                name="hallCapacity"
                value={formData.hallCapacity || ''}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Types</label>
              <select
                multiple
                name="eventTypes"
                value={formData.eventTypes || []}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              >
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate">Corporate</option>
                <option value="Conference">Conference</option>
                <option value="Reception">Reception</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Engagement">Engagement</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Other">Other</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple event types</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasParking"
                  checked={formData.hasParking || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#2ecc71] focus:ring-[#2ecc71] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Parking Available</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasCatering"
                  checked={formData.hasCatering || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#2ecc71] focus:ring-[#2ecc71] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Catering Services</label>
              </div>
            </div>
          </>
        );
        
      case 'sweet-shop':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Specialties</label>
              <select
                multiple
                name="specialties"
                value={formData.specialties || []}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              >
                <option value="Bengali Sweets">Bengali Sweets</option>
                <option value="North Indian Sweets">North Indian Sweets</option>
                <option value="South Indian Sweets">South Indian Sweets</option>
                <option value="Cakes">Cakes</option>
                <option value="Chocolates">Chocolates</option>
                <option value="Ice Creams">Ice Creams</option>
                <option value="Dry Fruits">Dry Fruits</option>
                <option value="Bakery Items">Bakery Items</option>
                <option value="Namkeen">Namkeen</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple specialties</p>
            </div>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="hasCustomOrders"
                checked={formData.hasCustomOrders || false}
                onChange={handleChange}
                className="h-4 w-4 text-[#2ecc71] focus:ring-[#2ecc71] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">Accept Custom Orders</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Order Value (₹)</label>
              <input
                type="number"
                name="minOrderValue"
                value={formData.minOrderValue || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              />
            </div>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerNavbar />
      
      <div className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Register Your {formatBusinessType(businessType)}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Provide detailed information about your business to create your profile.
          </p>
          
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-white p-6 shadow sm:rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">GSTIN</label>
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">FSSAI License Number</label>
              <input
                type="text"
                name="fssaiLicense"
                value={formData.fssaiLicense}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Opening Time</label>
                <input
                  type="time"
                  name="openTime"
                  value={formData.openTime}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Closing Time</label>
                <input
                  type="time"
                  name="closeTime"
                  value={formData.closeTime}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasDelivery"
                  checked={formData.hasDelivery}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#2ecc71] focus:ring-[#2ecc71] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Delivery Available</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasTakeout"
                  checked={formData.hasTakeout}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#2ecc71] focus:ring-[#2ecc71] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Takeout Available</label>
              </div>
            </div>
            
            <div className="space-y-6 mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {formatBusinessType(businessType)} Specific Details
              </h3>
              
              {renderBusinessTypeFields()}
            </div>
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/business-type-selection')}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71] mr-3"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                >
                  {loading ? 'Registering...' : 'Register Business'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistration; 