import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { businesses } from '../../utils/api';
import MediaUpload from '../MediaUpload';
import { Alert } from '../Alert';

export const SweetShopForm = ({ shopId, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    if (shopId) {
      loadShopData();
    }
  }, [shopId]);

  const loadShopData = async () => {
    try {
      setLoading(true);
      const data = await businesses.sweetShops.getById(shopId);
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
          <label className="block text-sm font-medium text-gray-700">Shop Name</label>
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
          <label className="block text-sm font-medium text-gray-700">Opening Hours</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              {...register('openingTime', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input
              type="time"
              {...register('closingTime', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Specialties</label>
          <div className="mt-2 space-y-2">
            {watch('specialties', []).map((specialty, index) => (
              <input
                key={index}
                {...register(`specialties.${index}`)}
                placeholder="Enter a specialty"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ))}
            <button
              type="button"
              onClick={() => {
                const specialties = watch('specialties', []);
                setValue('specialties', [...specialties, '']);
              }}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Specialty
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Categories</label>
          <div className="mt-2 space-y-2">
            {watch('categories', []).map((category, index) => (
              <div key={index} className="flex gap-2">
                <input
                  {...register(`categories.${index}.name`)}
                  placeholder="Category name"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  {...register(`categories.${index}.description`)}
                  placeholder="Description"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const categories = watch('categories', []);
                setValue('categories', [...categories, { name: '', description: '' }]);
              }}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Category
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Products</label>
          <div className="mt-2 space-y-2">
            {watch('products', []).map((product, index) => (
              <div key={index} className="grid grid-cols-4 gap-2">
                <input
                  {...register(`products.${index}.name`)}
                  placeholder="Product name"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  {...register(`products.${index}.category`)}
                  placeholder="Category"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  {...register(`products.${index}.price`)}
                  type="number"
                  placeholder="Price"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  {...register(`products.${index}.unit`)}
                  placeholder="Unit (e.g., kg, piece)"
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const products = watch('products', []);
                setValue('products', [...products, { name: '', category: '', price: '', unit: '' }]);
              }}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
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
          {loading ? 'Saving...' : 'Save Sweet Shop'}
        </button>
      </div>
    </form>
  );
};
