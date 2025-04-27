import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelBasicInfo from './hotel/HotelBasicInfo';
import HotelRooms from './hotel/HotelRooms';
import HotelPricing from './hotel/HotelPricing';
import HotelAvailability from './hotel/HotelAvailability';
import HotelPhotos from './hotel/HotelPhotos';

const HotelProfile = ({ hotelId }) => {
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    // Basic Info
    businessName: '',
    description: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    email: '',
    gstin: '',
    
    // Facilities
    facilities: {
      wifi: false,
      parking: false,
      pool: false,
      restaurant: false,
      gym: false,
      spa: false,
      roomService: false,
      conferenceRoom: false,
      airportShuttle: false,
      breakfast: false,
    },
    
    // Rooms
    rooms: [],
    
    // Pricing
    pricing: {
      standardRate: '',
      weekendRate: '',
      seasonalRates: []
    },
    
    // Availability
    availability: {},
    
    // Photos
    photos: [],
  });

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`/api/hotels/${hotelId}`);
        const data = await response.json();

        if (response.ok) {
          setHotel(data);
          setFormData({
            // Basic Info
            businessName: data.businessName || '',
            description: data.description || '',
            address: data.address || '',
            city: data.city || '',
            pincode: data.pincode || '',
            phone: data.phone || '',
            email: data.email || '',
            gstin: data.gstin || '',
            
            // Facilities
            facilities: data.facilities || {
              wifi: false,
              parking: false,
              pool: false,
              restaurant: false,
              gym: false,
              spa: false,
              roomService: false,
              conferenceRoom: false,
              airportShuttle: false,
              breakfast: false,
            },
            
            // Rooms
            rooms: data.rooms || [],
            
            // Pricing
            pricing: data.pricing || {
              standardRate: '',
              weekendRate: '',
              seasonalRates: []
            },
            
            // Availability
            availability: data.availability || {},
            
            // Photos
            photos: data.photos || [],
          });
        } else {
          setError(data.message || 'Failed to fetch hotel details');
        }
      } catch (err) {
        setError('An error occurred while fetching hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ecc71]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="text-center text-gray-600 p-4">
        Hotel not found
      </div>
    );
  }

  const handleChange = (section, data) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], ...data }
    });
  };

  const handleChangeBasic = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('facilities.')) {
      const facilityName = name.split('.')[1];
      setFormData({
        ...formData,
        facilities: {
          ...formData.facilities,
          [facilityName]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/partner/hotel/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Hotel profile updated successfully!');
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
              activeTab === 'rooms'
                ? 'border-b-2 border-[#2ecc71] text-[#2ecc71]'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } py-4 px-6 text-center font-medium`}
            onClick={() => setActiveTab('rooms')}
          >
            Rooms
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
          <HotelBasicInfo 
            data={formData} 
            onChange={handleChangeBasic} 
          />
        )}
        
        {activeTab === 'rooms' && (
          <HotelRooms 
            rooms={formData.rooms} 
            onChange={(data) => setFormData({ ...formData, rooms: data })} 
          />
        )}
        
        {activeTab === 'pricing' && (
          <HotelPricing 
            pricing={formData.pricing} 
            onChange={(data) => setFormData({ ...formData, pricing: data })} 
          />
        )}
        
        {activeTab === 'availability' && (
          <HotelAvailability 
            availability={formData.availability} 
            rooms={formData.rooms}
            onChange={(data) => setFormData({ ...formData, availability: data })} 
          />
        )}
        
        {activeTab === 'photos' && (
          <HotelPhotos 
            photos={formData.photos} 
            onChange={(data) => setFormData({ ...formData, photos: data })} 
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

export default HotelProfile; 