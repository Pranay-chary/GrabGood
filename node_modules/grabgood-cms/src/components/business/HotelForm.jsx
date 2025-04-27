import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { businesses } from '../../utils/api';
import MediaUpload from '../MediaUpload';
import { Alert } from '../Alert';

export const HotelForm = ({ hotelId, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    if (hotelId) {
      loadHotelData();
    }
  }, [hotelId]);

  const loadHotelData = async () => {
    try {
      setLoading(true);
      const data = await businesses.hotels.getById(hotelId);
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
          <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Star Rating</label>
          <select
            {...register('starRating', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {[1, 2, 3, 4, 5].map(rating => (
              <option key={rating} value={rating}>{rating} Stars</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Room Types</label>
          <div className="mt-2 space-y-2">
            {watch('roomTypes', []).map((room, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <input
                  {...register(`roomTypes.${index}.type`)}
                  placeholder="Room type"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  {...register(`roomTypes.${index}.price`)}
                  type="number"
                  placeholder="Price per night"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  {...register(`roomTypes.${index}.capacity`)}
                  type="number"
                  placeholder="Max capacity"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const rooms = watch('roomTypes', []);
                setValue('roomTypes', [...rooms, { type: '', price: '', capacity: '' }]);
              }}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Room Type
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amenities</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {['WiFi', 'Parking', 'Pool', 'Gym', 'Restaurant', 'Room Service', 'Spa', 'Conference Room'].map(amenity => (
              <label key={amenity} className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register('amenities')}
                  value={amenity}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Check-in/Check-out Times</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Check-in Time</label>
              <input
                type="time"
                {...register('checkInTime', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Check-out Time</label>
              <input
                type="time"
                {...register('checkOutTime', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
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
          {loading ? 'Saving...' : 'Save Hotel'}
        </button>
      </div>
    </form>
  );
};
