import React from 'react';

const HotelBasicInfo = ({ data, onChange }) => {
  const facilities = [
    { id: 'wifi', label: 'WiFi' },
    { id: 'parking', label: 'Parking' },
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'gym', label: 'Fitness Center' },
    { id: 'spa', label: 'Spa' },
    { id: 'roomService', label: 'Room Service' },
    { id: 'conferenceRoom', label: 'Conference Room' },
    { id: 'airportShuttle', label: 'Airport Shuttle' },
    { id: 'breakfast', label: 'Breakfast Included' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
          <input
            type="text"
            name="businessName"
            value={data.businessName}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChange}
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={data.address}
            onChange={onChange}
            rows="2"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={data.pincode}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">GSTIN</label>
          <input
            type="text"
            name="gstin"
            value={data.gstin}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
          />
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Hotel Facilities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {facilities.map((facility) => (
            <div key={facility.id} className="flex items-center">
              <input
                id={`facility-${facility.id}`}
                name={`facilities.${facility.id}`}
                type="checkbox"
                checked={data.facilities[facility.id]}
                onChange={onChange}
                className="h-4 w-4 text-[#2ecc71] focus:ring-[#2ecc71] border-gray-300 rounded"
              />
              <label htmlFor={`facility-${facility.id}`} className="ml-2 block text-sm text-gray-700">
                {facility.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelBasicInfo; 