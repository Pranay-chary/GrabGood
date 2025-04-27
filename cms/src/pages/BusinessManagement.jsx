import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { businesses } from '../utils/api';
import { RestaurantForm } from '../components/business/RestaurantForm';
import { HotelForm } from '../components/business/HotelForm';
import { HallForm } from '../components/business/HallForm';
import { SweetShopForm } from '../components/business/SweetShopForm';
import { Alert } from '../components/Alert';

const BUSINESS_TYPES = {
  restaurant: {
    title: 'Restaurant',
    component: RestaurantForm,
    api: businesses.restaurants,
  },
  hotel: {
    title: 'Hotel',
    component: HotelForm,
    api: businesses.hotels,
  },
  hall: {
    title: 'Function Hall',
    component: HallForm,
    api: businesses.functionHalls,
  },
  sweetshop: {
    title: 'Sweet Shop',
    component: SweetShopForm,
    api: businesses.sweetShops,
  }
};

export const BusinessManagement = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Normalize the business type to match our mapping
  const normalizedType = type?.toLowerCase().trim();
  const businessType = BUSINESS_TYPES[normalizedType];

  useEffect(() => {
    if (!type) {
      setError('No business type specified');
    } else if (!businessType) {
      setError(`Invalid business type: ${type}`);
      console.error('Available types:', Object.keys(BUSINESS_TYPES));
    }
  }, [type, businessType]);

  if (!businessType) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  {error || 'Invalid business type'}
                </div>
                <div className="mt-2">
                  <Link
                    to="/businesses"
                    className="text-sm font-medium text-red-800 hover:text-red-700"
                  >
                    ← Back to Businesses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { title, component: FormComponent, api } = businessType;

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      if (id) {
        await api.update(id, data);
      } else {
        await api.create(data);
      }
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/businesses');
      }, 2000);
    } catch (err) {
      setError(err.message || 'An error occurred while saving the business');
      console.error('Error saving business:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {id ? `Edit ${title}` : `Add New ${title}`}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Fill in the details below to {id ? 'update' : 'create'} a {title.toLowerCase()}.
          </p>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            className="mb-6"
            onClose={() => setError(null)}
          />
        )}

        {success && (
          <Alert
            type="success"
            message={`${title} successfully ${id ? 'updated' : 'created'}! Redirecting...`}
            className="mb-6"
          />
        )}

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <FormComponent
              {...(id && { [`${type}Id`]: id })}
              onSubmit={handleSubmit}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
