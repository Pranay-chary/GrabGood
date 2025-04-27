import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { FormInput, FormTextarea, FormSelect, FormDatePicker, FormSubmitButton } from './FormInputs';

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function DealForm({ initialData, onSubmit }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      discount: '',
      startDate: '',
      endDate: '',
      status: 'draft',
      listingId: '',
    },
  });

  const { data: listings, isLoading: isLoadingListings, error: listingsError } = useApi('/api/listings');

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [initialData, setValue]);

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      navigate('/deals');
    } catch (error) {
      console.error('Error submitting deal:', error);
    }
  };

  if (isLoadingListings) {
    return <div className="text-center">Loading listings...</div>;
  }

  if (listingsError) {
    return <div className="text-red-600">Error loading listings: {listingsError.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <FormInput
        label="Title"
        {...register('title', { required: 'Title is required' })}
        error={errors.title?.message}
      />

      <FormTextarea
        label="Description"
        {...register('description', { required: 'Description is required' })}
        error={errors.description?.message}
      />

      <FormInput
        label="Discount"
        type="number"
        {...register('discount', {
          required: 'Discount is required',
          min: { value: 0, message: 'Discount must be at least 0' },
          max: { value: 100, message: 'Discount cannot exceed 100' },
        })}
        error={errors.discount?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormDatePicker
          label="Start Date"
          {...register('startDate', { required: 'Start date is required' })}
          error={errors.startDate?.message}
        />

        <FormDatePicker
          label="End Date"
          {...register('endDate', { required: 'End date is required' })}
          error={errors.endDate?.message}
        />
      </div>

      <FormSelect
        label="Status"
        {...register('status', { required: 'Status is required' })}
        options={STATUS_OPTIONS}
        error={errors.status?.message}
      />

      <FormSelect
        label="Listing"
        {...register('listingId', { required: 'Listing is required' })}
        options={listings?.map(listing => ({
          value: listing.id,
          label: listing.title,
        })) || []}
        error={errors.listingId?.message}
      />

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/deals')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <FormSubmitButton isLoading={isSubmitting}>
          {initialData ? 'Update Deal' : 'Create Deal'}
        </FormSubmitButton>
      </div>
    </form>
  );
}