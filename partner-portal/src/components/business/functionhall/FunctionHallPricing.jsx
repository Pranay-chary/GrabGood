import React, { useState } from 'react';

const FunctionHallPricing = ({ pricing, onChange }) => {
  const [packageData, setPackageData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    guests: '',
    amenities: [],
    isPopular: false
  });

  const [service, setService] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    type: 'decoration'
  });

  const handlePackageChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageData({
      ...packageData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setService({
      ...service,
      [name]: value
    });
  };

  const addPackage = () => {
    if (!packageData.name || !packageData.price) {
      alert('Please enter package name and price');
      return;
    }

    const newPackage = {
      ...packageData,
      id: Date.now().toString(),
      price: parseFloat(packageData.price),
      guests: parseInt(packageData.guests) || 0
    };

    onChange({
      ...pricing,
      basicPackages: [...pricing.basicPackages, newPackage]
    });

    // Reset form
    setPackageData({
      id: '',
      name: '',
      description: '',
      price: '',
      guests: '',
      amenities: [],
      isPopular: false
    });
  };

  const removePackage = (id) => {
    onChange({
      ...pricing,
      basicPackages: pricing.basicPackages.filter(item => item.id !== id)
    });
  };

  const addService = () => {
    if (!service.name || !service.price) {
      alert('Please enter service name and price');
      return;
    }

    const newService = {
      ...service,
      id: Date.now().toString(),
      price: parseFloat(service.price)
    };

    onChange({
      ...pricing,
      additionalServices: [...pricing.additionalServices, newService]
    });

    // Reset form
    setService({
      id: '',
      name: '',
      description: '',
      price: '',
      type: 'decoration'
    });
  };

  const removeService = (id) => {
    onChange({
      ...pricing,
      additionalServices: pricing.additionalServices.filter(item => item.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Packages & Pricing</h3>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-md font-medium text-gray-700 mb-4">Add Basic Package</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Package Name</label>
            <input
              type="text"
              name="name"
              value={packageData.name}
              onChange={handlePackageChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="e.g., Basic Wedding Package"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={packageData.description}
              onChange={handlePackageChange}
              rows="2"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="Brief description of what's included"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="price"
                value={packageData.price}
                onChange={handlePackageChange}
                min="0"
                className="focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum Guests</label>
            <input
              type="number"
              name="guests"
              value={packageData.guests}
              onChange={handlePackageChange}
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="e.g., 100"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Amenities Included</label>
            <textarea
              name="amenities"
              value={packageData.amenities}
              onChange={handlePackageChange}
              rows="2"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="List amenities separated by commas (e.g., Basic decor, Catering, Sound system)"
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="isPopular"
              name="isPopular"
              type="checkbox"
              checked={packageData.isPopular}
              onChange={handlePackageChange}
              className="focus:ring-[#2ecc71] h-4 w-4 text-[#2ecc71] border-gray-300 rounded"
            />
            <label htmlFor="isPopular" className="ml-2 block text-sm text-gray-700">
              Mark as Popular Package
            </label>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            type="button"
            onClick={addPackage}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
          >
            Add Package
          </button>
        </div>
      </div>
      
      {/* Packages List */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-700 mb-4">Your Packages</h4>
        
        {!pricing.basicPackages || pricing.basicPackages.length === 0 ? (
          <p className="text-gray-500 text-sm">No packages added yet</p>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200">
              {pricing.basicPackages.map(item => (
                <li key={item.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h5 className="text-lg font-medium text-gray-900">{item.name}</h5>
                        {item.isPopular && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      {item.guests > 0 && (
                        <p className="text-sm text-gray-500">Up to {item.guests} guests</p>
                      )}
                      {item.amenities && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {typeof item.amenities === 'string' 
                            ? item.amenities.split(',').map((amenity, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {amenity.trim()}
                                </span>
                              ))
                            : item.amenities.map((amenity, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {amenity}
                                </span>
                              ))
                          }
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-gray-900 mr-4">₹{item.price}</span>
                      <button
                        type="button"
                        onClick={() => removePackage(item.id)}
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
      
      {/* Additional Services Section */}
      <div className="bg-gray-50 p-4 rounded-md mt-8">
        <h4 className="text-md font-medium text-gray-700 mb-4">Add Additional Service</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Name</label>
            <input
              type="text"
              name="name"
              value={service.name}
              onChange={handleServiceChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="e.g., Premium Decoration"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Type</label>
            <select
              name="type"
              value={service.type}
              onChange={handleServiceChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            >
              <option value="decoration">Decoration</option>
              <option value="catering">Catering</option>
              <option value="entertainment">Entertainment</option>
              <option value="photography">Photography/Videography</option>
              <option value="lighting">Lighting</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={service.description}
              onChange={handleServiceChange}
              rows="2"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              placeholder="Brief description of the service"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                name="price"
                value={service.price}
                onChange={handleServiceChange}
                min="0"
                className="focus:ring-[#2ecc71] focus:border-[#2ecc71] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            type="button"
            onClick={addService}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
          >
            Add Service
          </button>
        </div>
      </div>
      
      {/* Services List */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-700 mb-4">Your Additional Services</h4>
        
        {!pricing.additionalServices || pricing.additionalServices.length === 0 ? (
          <p className="text-gray-500 text-sm">No additional services added yet</p>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200">
              {pricing.additionalServices.map(item => (
                <li key={item.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h5 className="text-lg font-medium text-gray-900">{item.name}</h5>
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-gray-900 mr-4">₹{item.price}</span>
                      <button
                        type="button"
                        onClick={() => removeService(item.id)}
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

export default FunctionHallPricing; 