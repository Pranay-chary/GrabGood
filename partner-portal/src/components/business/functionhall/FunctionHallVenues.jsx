import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../Badge';

const FunctionHallVenues = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('/api/venues');
        const data = await response.json();

        if (response.ok) {
          setVenues(data);
        } else {
          setError(data.message || 'Failed to fetch venues');
        }
      } catch (err) {
        setError('An error occurred while fetching venues');
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ecc71]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Function Hall Venues</h2>
        <button
          onClick={() => navigate('/add-venue')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
        >
          Add New Venue
        </button>
      </div>

      {venues.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No venues found. Add your first venue to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative h-48">
                <img
                  src={venue.images[0] || '/placeholder-venue.jpg'}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge type={venue.status} text={venue.status} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{venue.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{venue.location}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Capacity</p>
                    <p className="text-sm text-gray-500">{venue.capacity} guests</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Price</p>
                    <p className="text-sm text-gray-500">₹{venue.price}/day</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => navigate(`/venues/${venue.id}/edit`)}
                    className="inline-flex items-center px-3 py-1.5 border border-[#2ecc71] rounded-md text-sm font-medium text-[#2ecc71] hover:bg-[#2ecc71] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/venues/${venue.id}`)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FunctionHallVenues; 