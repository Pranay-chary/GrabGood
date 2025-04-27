import React, { useState } from 'react';
import apiService from '../../utils/apiService';

const RestaurantProfile = ({ initialData }) => {
  const [formData, setFormData] = useState({
    businessName: initialData?.business?.businessName || '',
    ownerName: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.business?.address || '',
    city: initialData?.business?.city || '',
    pincode: initialData?.business?.pincode || '',
    gstin: initialData?.business?.gstin || '',
    fssaiLicense: initialData?.business?.fssaiLicense || '',
    cuisine: initialData?.business?.cuisine || '',
    seatingCapacity: initialData?.business?.seatingCapacity || '',
    about: initialData?.business?.about || '',
    openingHours: initialData?.business?.openingHours || '',
    closingHours: initialData?.business?.closingHours || '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await restaurants.update(initialData.id, formData);
      const updated = await restaurants.get(initialData.id);
      setFormData({
        businessName: updated.businessName || '',
        ownerName: updated.ownerName || '',
        email: updated.email || '',
        phone: updated.phone || '',
        address: updated.address || '',
        city: updated.city || '',
        pincode: updated.pincode || '',
        gstin: updated.gstin || '',
        fssaiLicense: updated.fssaiLicense || '',
        cuisine: updated.cuisine || '',
        seatingCapacity: updated.seatingCapacity || '',
        about: updated.about || '',
        openingHours: updated.openingHours || '',
        closingHours: updated.closingHours || '',
      });
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError('An error occurred while updating your profile');
      console.error('Profile update error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Restaurant Information</h3>
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
            >
              Edit Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Restaurant Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="businessName"
                  id="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                Owner Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="ownerName"
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
                Cuisine Type
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="cuisine"
                  id="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="seatingCapacity" className="block text-sm font-medium text-gray-700">
                Seating Capacity
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="seatingCapacity"
                  id="seatingCapacity"
                  value={formData.seatingCapacity}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="pincode"
                  id="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700">
                Opening Time
              </label>
              <div className="mt-1">
                <input
                  type="time"
                  name="openingHours"
                  id="openingHours"
                  value={formData.openingHours}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="closingHours" className="block text-sm font-medium text-gray-700">
                Closing Time
              </label>
              <div className="mt-1">
                <input
                  type="time"
                  name="closingHours"
                  id="closingHours"
                  value={formData.closingHours}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">
                GSTIN
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="gstin"
                  id="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="fssaiLicense" className="block text-sm font-medium text-gray-700">
                FSSAI License
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="fssaiLicense"
                  id="fssaiLicense"
                  value={formData.fssaiLicense}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                About
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={formData.about}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Tell customers about your restaurant"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RestaurantProfile;