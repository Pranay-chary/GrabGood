import React, { useState, useEffect } from 'react';
import PartnerNavbar from '../components/PartnerNavbar';
import apiService from '../utils/apiService';

const RestaurantManagement = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await restaurants.list();
        setRestaurantData(data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateMenu = async (menuData) => {
    try {
      await restaurants.updateMenu(restaurantData.id, menuData);
      // Refresh data after update
      const updated = await restaurants.get(restaurantData.id);
      setRestaurantData(updated);
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Restaurant Management</h1>
            <button 
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Add New Restaurant
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading restaurants...</p>
            </div>
          ) : restaurantData === null ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3z M16 8a2 2 0 100-4 2 2 0 000 4z M15 22c3.314 0 6-1.343 6-3v-5c0-1.657-2.686-3-6-3s-6 1.343-6 3v5c0 1.657 2.686 3 6 3z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Restaurants</h3>
              <p className="mt-1 text-gray-500">Get started by creating a new restaurant.</p>
              <div className="mt-6">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Restaurant
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurantData.map((restaurant) => (
                <div key={restaurant.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={restaurant.image || "/placeholder-restaurant.jpg"} 
                      alt={restaurant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
                    <p className="text-gray-600 mt-1">Cuisine: {restaurant.cuisine}</p>
                    <p className="text-gray-600">Address: {restaurant.address}</p>
                    <div className="mt-4 flex justify-between">
                      <button className="text-primary hover:underline">Edit</button>
                      <button className="text-red-500 hover:underline">Delete</button>
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

export default RestaurantManagement; 