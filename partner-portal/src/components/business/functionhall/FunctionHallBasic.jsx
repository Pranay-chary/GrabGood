import React from 'react';

const FunctionHallBasic = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={data.businessName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            placeholder="Describe your function hall, its specialties, and types of events you host..."
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={data.address}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
          />
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Year Established</label>
            <input
              type="number"
              name="yearEstablished"
              value={data.yearEstablished || ''}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              placeholder={new Date().getFullYear()}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Hours</label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500">Opening Time</label>
                <input
                  type="time"
                  name="openingTime"
                  value={data.openingTime || ''}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">Closing Time</label>
                <input
                  type="time"
                  name="closingTime"
                  value={data.closingTime || ''}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
        <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Specialties</label>
            <textarea
              name="specialties"
              value={data.specialties || ''}
              onChange={handleChange}
              rows="3"
              placeholder="Wedding, Corporate, Birthday, etc."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Unique Features</label>
            <textarea
              name="uniqueFeatures"
              value={data.uniqueFeatures || ''}
              onChange={handleChange}
              rows="3"
              placeholder="Beachside view, Heritage building, etc."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2ecc71] focus:border-[#2ecc71]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionHallBasic; 