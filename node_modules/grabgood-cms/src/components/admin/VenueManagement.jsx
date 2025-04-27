import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const VenueManagement = ({ onSubmit }) => {
  const [selectedVenueType, setSelectedVenueType] = useState('restaurants');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const venueTypes = {
    restaurants: {
      title: 'Restaurants',
      fields: [
        { name: 'name', label: 'Restaurant Name', type: 'text', required: true },
        { name: 'address', label: 'Address', type: 'textarea', required: true },
        { name: 'cuisine', label: 'Cuisine Type', type: 'text', required: true },
        { name: 'priceRange', label: 'Price Range', type: 'select', options: ['$', '$$', '$$$', '$$$$'], required: true },
        { name: 'images', label: 'Upload Images', type: 'file', multiple: true },
        { name: 'deals', label: 'Special Deals', type: 'textarea' },
        { name: 'menu', label: 'Menu PDF', type: 'file' },
      ]
    },
    hotels: {
      title: 'Hotels',
      fields: [
        { name: 'name', label: 'Hotel Name', type: 'text', required: true },
        { name: 'address', label: 'Address', type: 'textarea', required: true },
        { name: 'starRating', label: 'Star Rating', type: 'select', options: ['1', '2', '3', '4', '5'], required: true },
        { name: 'images', label: 'Upload Images', type: 'file', multiple: true },
        { name: 'amenities', label: 'Amenities', type: 'textarea', required: true },
        { name: 'roomTypes', label: 'Room Types', type: 'textarea', required: true },
      ]
    },
    functionHalls: {
      title: 'Function Halls',
      fields: [
        { name: 'name', label: 'Venue Name', type: 'text', required: true },
        { name: 'address', label: 'Address', type: 'textarea', required: true },
        { name: 'capacity', label: 'Capacity', type: 'number', required: true },
        { name: 'images', label: 'Upload Images', type: 'file', multiple: true },
        { name: 'amenities', label: 'Amenities', type: 'textarea', required: true },
        { name: 'packages', label: 'Event Packages', type: 'textarea', required: true },
      ]
    },
    sweetShops: {
      title: 'Sweet Shops',
      fields: [
        { name: 'name', label: 'Shop Name', type: 'text', required: true },
        { name: 'address', label: 'Address', type: 'textarea', required: true },
        { name: 'specialties', label: 'Specialties', type: 'textarea', required: true },
        { name: 'images', label: 'Upload Images', type: 'file', multiple: true },
        { name: 'bulkOrders', label: 'Bulk Order Details', type: 'textarea' },
        { name: 'seasonal', label: 'Seasonal Offerings', type: 'textarea' },
      ]
    }
  };

  const handleInputChange = (e, field) => {
    const { name, value, files } = e.target;
    
    if (field.type === 'file' && files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = (fields) => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const fields = venueTypes[type].fields;
    
    if (validateForm(fields)) {
      onSubmit({
        type,
        ...formData,
        submittedAt: new Date().toISOString()
      });
    } else {
      // Scroll to first error
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleTabChange = (index) => {
    const type = Object.keys(venueTypes)[index];
    setSelectedVenueType(type);
    setFormData({});
    setErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Venue Management System</h1>
      
      <Tab.Group onChange={handleTabChange}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(venueTypes).map((type) => (
            <Tab
              key={type}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {venueTypes[type].title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          {Object.entries(venueTypes).map(([type, { title, fields }]) => (
            <Tab.Panel
              key={type}
              className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
            >
              <form onSubmit={(e) => handleSubmit(e, type)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div key={field.name} className="col-span-1">
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <div className="mt-1">
                        {field.type === 'textarea' ? (
                          <textarea
                            id={field.name}
                            name={field.name}
                            rows={3}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(e, field)}
                            aria-invalid={errors[field.name] ? 'true' : 'false'}
                            className={`shadow-sm block w-full sm:text-sm rounded-md ${
                              errors[field.name]
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                          />
                        ) : field.type === 'select' ? (
                          <select
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(e, field)}
                            aria-invalid={errors[field.name] ? 'true' : 'false'}
                            className={`shadow-sm block w-full sm:text-sm rounded-md ${
                              errors[field.name]
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : field.type === 'file' ? (
                          <input
                            type="file"
                            id={field.name}
                            name={field.name}
                            onChange={(e) => handleInputChange(e, field)}
                            aria-invalid={errors[field.name] ? 'true' : 'false'}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        ) : (
                          <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(e, field)}
                            aria-invalid={errors[field.name] ? 'true' : 'false'}
                            className={`shadow-sm block w-full sm:text-sm rounded-md ${
                              errors[field.name]
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                          />
                        )}
                        {errors[field.name] && (
                          <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({});
                      setErrors({});
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Continue to Media Upload
                  </button>
                </div>
              </form>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default VenueManagement; 