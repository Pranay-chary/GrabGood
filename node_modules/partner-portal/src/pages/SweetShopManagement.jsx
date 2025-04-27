import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PartnerNavbar from '../components/PartnerNavbar';
import apiService from '../utils/apiService';

const SweetShopManagement = () => {
  const { user } = useAuth();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    specialties: [],
    openTime: '',
    closeTime: '',
    contactPhone: '',
    contactEmail: '',
    hasDelivery: false,
    hasTakeout: false,
    description: ''
  });
  const [sweetShopsList, setSweetShopsList] = useState([]);

  useEffect(() => {
    if (user?.business?.id) {
      fetchBusinessDetails();
    }
  }, [user]);

  useEffect(() => {
    const fetchSweetShops = async () => {
      try {
        setLoading(true);
        const response = await sweetShops.list();
        setSweetShopsList(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching sweet shops:', err);
        setError('Failed to load sweet shops. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSweetShops();
  }, []);

  const fetchBusinessDetails = async () => {
    try {
      setLoading(true);
      const response = await sweetShops.get(user.business.id);
      if (response.success && response.data) {
        setBusiness(response.data);
        setFormData({
          businessName: response.data.businessName || '',
          address: response.data.address || '',
          specialties: response.data.specialties || [],
          openTime: response.data.openTime || '',
          closeTime: response.data.closeTime || '',
          contactPhone: response.data.contactPhone || '',
          contactEmail: response.data.contactEmail || '',
          hasDelivery: response.data.hasDelivery || false,
          hasTakeout: response.data.hasTakeout || false,
          description: response.data.description || ''
        });
      }
    } catch (err) {
      setError('Failed to load sweet shop details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await sweetShops.update(user.business.id, {
        ...formData,
        businessType: 'sweet_shop'
      });
      
      if (response.success) {
        setBusiness(response.data);
        setEditMode(false);
        setError(null);
      }
    } catch (err) {
      setError('Failed to update sweet shop details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PartnerNavbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  const specialtiesList = [
    'Traditional Sweets',
    'Bengali Sweets',
    'North Indian Sweets',
    'South Indian Sweets',
    'Chocolates',
    'Dry Fruits',
    'Namkeen',
    'Bakery Items'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Sweet Shop Management</h1>
            <button 
              onClick={() => setEditMode(!editMode)}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              {editMode ? 'Cancel Edit' : 'Edit Details'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Opening Time</label>
                <input
                  type="time"
                  name="openTime"
                  value={formData.openTime}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Closing Time</label>
                <input
                  type="time"
                  name="closeTime"
                  value={formData.closeTime}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={!editMode}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary disabled:bg-gray-50"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {specialtiesList.map(type => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={type}
                      checked={formData.specialties.includes(type)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          specialties: e.target.checked 
                            ? [...prev.specialties, value]
                            : prev.specialties.filter(s => s !== value)
                        }));
                      }}
                      disabled={!editMode}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="hasDelivery"
                  checked={formData.hasDelivery}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600">Offers Delivery</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="hasTakeout"
                  checked={formData.hasTakeout}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600">Offers Takeout</span>
              </label>
            </div>

            {editMode && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default SweetShopManagement;