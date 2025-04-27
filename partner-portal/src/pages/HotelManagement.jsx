import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PartnerNavbar from '../components/PartnerNavbar';
import apiService from '../utils/apiService';
import { toast } from '../utils/toastUtil';

const HotelManagement = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hotels.list();
      setHotels(data);
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setError('Failed to load hotels. Please try again later.');
      toast.error('Failed to load hotels');
    } finally {
      setLoading(false);
    }
  };

  const handleAddHotel = () => {
    navigate('/business-registration/hotel');
  };

  const handleEditHotel = (hotelId) => {
    navigate(`/hotel-management/edit/${hotelId}`);
  };

  const handleDeleteHotel = async (hotelId) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) {
      return;
    }

    try {
      await hotels.delete(hotelId);
      toast.success('Hotel deleted successfully');
      fetchHotels(); // Refresh the list
    } catch (err) {
      console.error('Error deleting hotel:', err);
      toast.error('Failed to delete hotel');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Hotel Management</h1>
            <button 
              onClick={handleAddHotel}
              className="bg-[#2ecc71] text-white px-4 py-2 rounded-md hover:bg-[#27ae60] transition-colors"
            >
              Add New Hotel
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ecc71] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading hotels...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
              <button 
                className="mt-4 text-[#2ecc71] underline"
                onClick={fetchHotels}
              >
                Try Again
              </button>
            </div>
          ) : hotels.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Hotels</h3>
              <p className="mt-1 text-gray-500">Get started by creating a new hotel.</p>
              <div className="mt-6">
                <button
                  onClick={handleAddHotel}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Hotel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={hotel.image || "/placeholder-hotel.jpg"} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>
                    <p className="text-gray-600 mt-1">Rooms: {hotel.roomCount}</p>
                    <p className="text-gray-600">Address: {hotel.address}</p>
                    <div className="mt-4 flex justify-between">
                      <button 
                        onClick={() => handleEditHotel(hotel.id)}
                        className="text-[#2ecc71] hover:underline"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteHotel(hotel.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HotelManagement; 