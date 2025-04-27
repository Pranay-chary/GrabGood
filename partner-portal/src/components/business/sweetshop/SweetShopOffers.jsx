import React, { useState } from 'react';

const SweetShopOffers = ({ offers, onChange }) => {
  const [offer, setOffer] = useState({
    id: '',
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderValue: '',
    startDate: '',
    endDate: '',
    isActive: true
  });

  const handleOfferChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOffer({
      ...offer,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addOffer = () => {
    if (!offer.title || !offer.discountValue) {
      alert('Please enter offer title and discount value');
      return;
    }

    const newOffer = {
      ...offer,
      id: Date.now().toString(),
      discountValue: parseFloat(offer.discountValue),
      minOrderValue: offer.minOrderValue ? parseFloat(offer.minOrderValue) : 0
    };

    onChange([...offers, newOffer]);

    // Reset form
    setOffer({
      id: '',
      title: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      minOrderValue: '',
      startDate: '',
      endDate: '',
      isActive: true
    });
  };

  const removeOffer = (id) => {
    onChange(offers.filter(item => item.id !== id));
  };

  const toggleOfferStatus = (id) => {
    onChange(offers.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Special Offers</h3>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-md font-medium text-gray-700 mb-4">Add New Offer</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Offer Title</label>
            <input
              type="text"
              name="title"
              value={offer.title}
              onChange={handleOfferChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="e.g., Diwali Special"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={offer.description}
              onChange={handleOfferChange}
              rows="2"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="Details about the offer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount Type</label>
            <select
              name="discountType"
              value={offer.discountType}
              onChange={handleOfferChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount (₹)</option>
              <option value="buyOneGetOne">Buy One Get One</option>
              <option value="freeItem">Free Item</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount Value</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                name="discountValue"
                value={offer.discountValue}
                onChange={handleOfferChange}
                min="0"
                className="focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">
                  {offer.discountType === 'percentage' ? '%' : '₹'}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Min. Order Value (₹)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="minOrderValue"
                value={offer.minOrderValue}
                onChange={handleOfferChange}
                min="0"
                className="focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={offer.startDate}
              onChange={handleOfferChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={offer.endDate}
              onChange={handleOfferChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={offer.isActive}
              onChange={handleOfferChange}
              className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
              Active
            </label>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            type="button"
            onClick={addOffer}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
          >
            Add Offer
          </button>
        </div>
      </div>
      
      {/* Offers List */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-700 mb-4">Your Offers</h4>
        
        {offers.length === 0 ? (
          <p className="text-gray-500 text-sm">No offers added yet</p>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200">
              {offers.map(item => (
                <li key={item.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h5 className="text-lg font-medium text-gray-900">{item.title}</h5>
                        <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      <div className="text-sm text-gray-500 mt-1">
                        {item.discountType === 'percentage' && `${item.discountValue}% off`}
                        {item.discountType === 'fixed' && `₹${item.discountValue} off`}
                        {item.discountType === 'buyOneGetOne' && 'Buy One Get One Free'}
                        {item.discountType === 'freeItem' && 'Free Item'}
                        {item.minOrderValue > 0 && ` on orders above ₹${item.minOrderValue}`}
                      </div>
                      {(item.startDate || item.endDate) && (
                        <div className="text-sm text-gray-500 mt-1">
                          {item.startDate && `From: ${new Date(item.startDate).toLocaleDateString()}`}
                          {item.startDate && item.endDate && ' - '}
                          {item.endDate && `To: ${new Date(item.endDate).toLocaleDateString()}`}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => toggleOfferStatus(item.id)}
                        className={`text-sm font-medium ${
                          item.isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
                        }`}
                      >
                        {item.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeOffer(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SweetShopOffers; 