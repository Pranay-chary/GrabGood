import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { businesses } from '../utils/api';
import {
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  BuildingLibraryIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const BUSINESS_TYPES = {
  restaurant: {
    name: 'Restaurant',
    icon: BuildingStorefrontIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  hotel: {
    name: 'Hotel',
    icon: HomeModernIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  hall: {
    name: 'Function Hall',
    icon: BuildingLibraryIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  sweetshop: {
    name: 'Sweet Shop',
    icon: ShoppingBagIcon,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  }
};

const BusinessCard = ({ business }) => {
  const type = BUSINESS_TYPES[business.type] || {
    name: 'Business',
    icon: BuildingOfficeIcon,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  };
  const Icon = type.icon;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${type.bgColor}`}>
          <Icon className={`h-6 w-6 ${type.color}`} />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{business.name}</h3>
          <p className="text-sm text-gray-500">{type.name}</p>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-200 pt-4">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-sm text-gray-900">{business.location}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${business.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
              </span>
            </dd>
          </div>
        </dl>
      </div>
      <div className="mt-4 flex justify-end">
        <Link
          to={`/business/${business.type}/${business.id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export const BusinessList = () => {
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    fetchBusinesses();
  }, [filter, retryCount]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      setError(null);

      if (filter === 'all') {
        try {
          const response = await businesses.getAll();
          setBusinessList(response?.data || []);
        } catch (err) {
          console.error('Error fetching all businesses:', err);
          throw new Error('Failed to fetch businesses');
        }
      } else {
        const type = filter.toLowerCase();
        try {
          const response = await businesses.getByType(type);
          setBusinessList(response?.data || []);
        } catch (err) {
          if (err.response?.status === 400) {
            throw new Error(`Invalid business type: ${filter}`);
          }
          throw new Error(`Failed to fetch ${type} businesses`);
        }
      }
    } catch (err) {
      console.error('Error fetching businesses:', err);
      setError(err.message || 'Failed to fetch businesses');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Businesses</h1>
          
          <div className="flex space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hotel</option>
              <option value="hall">Function Hall</option>
              <option value="sweetshop">Sweet Shop</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {!loading && !error && businessList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No businesses found</p>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businessList.map((business) => (
              <BusinessCard key={business._id} business={business} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
