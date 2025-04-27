import React, { useState, useEffect } from 'react';
import PartnerNavbar from '../components/PartnerNavbar';
import SurplusForm from '../components/SurplusForm';
import { toast } from '../utils/toastUtil';
import apiService from '../utils/apiService';

const Surplus = () => {
  const [surplusItems, setSurplusItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchSurplusItems();
  }, []);

  const fetchSurplusItems = async () => {
    try {
      setLoading(true);
      console.log('Fetching surplus items...');
      
      const response = await apiService.get('/surplus');
      console.log('Surplus response:', response);
      
      if (response && response.success) {
        setSurplusItems(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch surplus data');
      }
    } catch (error) {
      console.error('Error fetching surplus items:', error);
      setError('Failed to load surplus items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSurplus = async (surplusData) => {
    try {
      const response = await fetch('/api/auth/surplus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(surplusData)
      });

      if (response.ok) {
        const data = await response.json();
        setSurplusItems(prev => [...prev, data]);
        setIsAddModalOpen(false);
        toast.success('Surplus item added successfully!');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add surplus item');
      }
    } catch (error) {
      console.error('Error adding surplus item:', error);
      toast.error('Failed to add surplus item. Please try again.');
    }
  };

  const handleDeleteSurplus = async (id) => {
    if (!window.confirm('Are you sure you want to delete this surplus item?')) {
      return;
    }

    try {
      const response = await fetch(`/api/auth/surplus/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setSurplusItems(surplusItems.filter(item => item.id !== id));
        toast.success('Surplus item deleted successfully!');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to delete surplus item');
      }
    } catch (error) {
      console.error('Error deleting surplus item:', error);
      toast.error('Failed to delete surplus item. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'claimed':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PartnerNavbar />
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ecc71]"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PartnerNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Surplus Food</h1>
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Item
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="spinner"></div>
            <p className="mt-2">Loading surplus items...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{error}</span>
          </div>
        ) : surplusItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No surplus items available. Add your first item by clicking the "Add New Item" button.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surplusItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">Category: {item.category}</p>
                  <p className="text-gray-600 mb-3">Quantity: {item.quantity} {item.unit}</p>
                  <p className="text-gray-600 mb-3">Expires: {new Date(item.expiryDate).toLocaleDateString()}</p>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDeleteSurplus(item.id)}
                      className="text-red-600 hover:text-red-800"
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

      {isAddModalOpen && (
        <SurplusForm
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSurplus}
        />
      )}
    </div>
  );
};

export default Surplus;
