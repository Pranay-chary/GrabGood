import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { businesses } from '../../utils/api';
import MediaUpload from '../MediaUpload';
import { Alert } from '../Alert';

export const HallForm = ({ hallId, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    if (hallId) {
      loadHallData();
    }
  }, [hallId]);

  const loadHallData = async () => {
    try {
      setLoading(true);
      const data = await businesses.functionHalls.getById(hallId);
      Object.keys(data).forEach(key => setValue(key, data[key]));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {error && <Alert type="error" message={error} />}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Hall Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            {...register('address', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            {...register('contactNumber', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              {...register('capacity', { required: true, min: 1 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Area (sq ft)</label>
            <input
              type="number"
              {...register('area', { required: true, min: 1 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Event Types</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {['Wedding', 'Corporate Event', 'Birthday Party', 'Conference', 'Exhibition', 'Social Gathering'].map(type => (
              <label key={type} className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register('eventTypes')}
                  value={type}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Facilities</label>
          <div className="mt-2 space-y-2">
            {watch('facilities', []).map((facility, index) => (
              <div key={index} className="flex gap-2">
                <input
                  {...register(`facilities.${index}.name`)}
                  placeholder="Facility name"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  {...register(`facilities.${index}.description`)}
                  placeholder="Description"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const facilities = watch('facilities', []);
                setValue('facilities', [...facilities, { name: '', description: '' }]);
              }}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Facility
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pricing Packages</label>
          <div className="mt-2 space-y-2">
            {watch('packages', []).map((pkg, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <input
                  {...register(`packages.${index}.name`)}
                  placeholder="Package name"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  {...register(`packages.${index}.price`)}
                  type="number"
                  placeholder="Price"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  {...register(`packages.${index}.duration`)}
                  placeholder="Duration (e.g., 4 hours)"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const packages = watch('packages', []);
                setValue('packages', [...packages, { name: '', price: '', duration: '' }]);
              }}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Package
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Images</label>
          <MediaUpload
            onUpload={(files) => setValue('images', files)}
            multiple
            accept="image/*"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Saving...' : 'Save Hall'}
        </button>
      </div>
    </form>
  );
};
