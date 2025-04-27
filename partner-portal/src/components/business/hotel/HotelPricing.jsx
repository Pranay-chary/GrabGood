import React, { useState } from 'react';

const HotelPricing = ({ pricing, onChange }) => {
  const [seasonalRate, setSeasonalRate] = useState({
    name: '',
    startDate: '',
    endDate: '',
    rate: '',
    description: '',
  });

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...pricing,
      [name]: value
    });
  };

  const handleSeasonalRateChange = (e) => {
    const { name, value } = e.target;
    setSeasonalRate({
      ...seasonalRate,
      [name]: value
    });
  };

  const addSeasonalRate = () => {
    if (!seasonalRate.name || !seasonalRate.startDate || !seasonalRate.endDate || !seasonalRate.rate) {
      return;
    }

    const newSeasonalRates = [
      ...pricing.seasonalRates,
      { ...seasonalRate, id: Date.now() }
    ];

    onChange({
      ...pricing,
      seasonalRates: newSeasonalRates
    });

    setSeasonalRate({
      name: '',
      startDate: '',
      endDate: '',
      rate: '',
      description: '',
    });
  };

  const removeSeasonalRate = (id) => {
    const updatedRates = pricing.seasonalRates.filter(rate => rate.id !== id);
    onChange({
      ...pricing,
      seasonalRates: updatedRates
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Room Pricing</h3>
      
      <div className="bg-white p-6 shadow rounded-lg">
        <h4 className="text-md font-medium text-gray-700 mb-4">Base Pricing</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Standard Rate (₹ per night)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="standardRate"
                value={pricing.standardRate}
                onChange={handlePricingChange}
                className="focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Weekend Rate (₹ per night)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="weekendRate"
                value={pricing.weekendRate}
                onChange={handlePricingChange}
                className="focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-md font-medium text-gray-700 mb-4">Add Seasonal Rate</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Season Name</label>
            <input
              type="text"
              name="name"
              value={seasonalRate.name}
              onChange={handleSeasonalRateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="e.g., Summer Season"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={seasonalRate.description}
              onChange={handleSeasonalRateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="Brief description of this season"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={seasonalRate.startDate}
              onChange={handleSeasonalRateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={seasonalRate.endDate}
              onChange={handleSeasonalRateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Rate (₹ per night)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="rate"
                value={seasonalRate.rate}
                onChange={handleSeasonalRateChange}
                className="focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            type="button"
            onClick={addSeasonalRate}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
          >
            Add Seasonal Rate
          </button>
        </div>
      </div>
      
      {/* List of seasonal rates */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-700 mb-4">Your Seasonal Rates</h4>
        
        {pricing.seasonalRates?.length === 0 ? (
          <p className="text-gray-500 text-sm">No seasonal rates added yet</p>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200">
              {pricing.seasonalRates?.map(rate => (
                <li key={rate.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-lg font-medium text-gray-900">{rate.name}</h5>
                      <p className="text-sm text-gray-500">{rate.description}</p>
                      <div className="text-sm text-gray-500 mt-1">
                        {new Date(rate.startDate).toLocaleDateString()} to {new Date(rate.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-gray-900 mr-4">₹{rate.rate}/night</span>
                      <button
                        type="button"
                        onClick={() => removeSeasonalRate(rate.id)}
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

export default HotelPricing; 