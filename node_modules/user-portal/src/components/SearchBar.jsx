import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    location: '',
    type: 'all',
    date: ''
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter city or area"
            value={filters.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-gray-700 mb-2">Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="all">All Types</option>
            <option value="hall">Function Hall</option>
            <option value="restaurant">Restaurant</option>
            <option value="hotel">Hotel</option>
            <option value="sweet">Sweet Shop</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="bg-[#e67e22] text-white px-6 py-2 rounded hover:bg-[#d35400]"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
