import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { venueApi } from '../services/api';
import { useApp } from '../context/AppContext';
import { Venue } from '../types/venue';
import toast from 'react-hot-toast';

export function useVenues() {
  const { state, dispatch } = useApp();
  const queryClient = useQueryClient();

  const { filters, pagination } = state;

  // Fetch venues with filters and pagination
  const {
    data: venuesData,
    isLoading,
    error,
  } = useQuery(
    ['venues', filters, pagination],
    () =>
      venueApi.getAll({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      }),
    {
      onSuccess: (data) => {
        dispatch({ type: 'SET_VENUES', payload: data.data });
        dispatch({
          type: 'SET_PAGINATION',
          payload: { total: data.total },
        });
      },
      onError: (err: Error) => {
        dispatch({ type: 'SET_ERROR', payload: err.message });
        toast.error('Failed to fetch venues');
      },
    }
  );

  // Create venue mutation
  const createVenue = useMutation(venueApi.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('venues');
      toast.success('Venue created successfully');
    },
    onError: (err: Error) => {
      toast.error('Failed to create venue');
    },
  });

  // Update venue mutation
  const updateVenue = useMutation(
    ({ id, data }: { id: string; data: Partial<Venue> }) =>
      venueApi.update(id, data),
    {
      onSuccess: (data) => {
        dispatch({ type: 'UPDATE_VENUE', payload: data });
        queryClient.invalidateQueries('venues');
        toast.success('Venue updated successfully');
      },
      onError: (err: Error) => {
        toast.error('Failed to update venue');
      },
    }
  );

  // Delete venue mutation
  const deleteVenue = useMutation(venueApi.delete, {
    onSuccess: (_, id) => {
      dispatch({ type: 'DELETE_VENUE', payload: id });
      queryClient.invalidateQueries('venues');
      toast.success('Venue deleted successfully');
    },
    onError: (err: Error) => {
      toast.error('Failed to delete venue');
    },
  });

  // Upload media mutation
  const uploadMedia = useMutation(
    ({ id, files }: { id: string; files: File[] }) =>
      venueApi.uploadMedia(id, files),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('venues');
        toast.success('Media uploaded successfully');
      },
      onError: (err: Error) => {
        toast.error('Failed to upload media');
      },
    }
  );

  // Update verification status mutation
  const updateVerification = useMutation(
    ({
      id,
      data,
    }: {
      id: string;
      data: {
        status: 'approved' | 'rejected';
        notes: string;
        checklist: Record<string, boolean>;
      };
    }) => venueApi.updateVerification(id, data),
    {
      onSuccess: (data) => {
        dispatch({ type: 'UPDATE_VENUE', payload: data });
        queryClient.invalidateQueries('venues');
        toast.success(
          `Venue ${data.status === 'approved' ? 'approved' : 'rejected'} successfully`
        );
      },
      onError: (err: Error) => {
        toast.error('Failed to update verification status');
      },
    }
  );

  // Handle filter changes
  const setFilters = useCallback(
    (newFilters: Partial<typeof filters>) => {
      dispatch({ type: 'SET_FILTERS', payload: newFilters });
      dispatch({ type: 'SET_PAGINATION', payload: { page: 1 } }); // Reset to first page
    },
    [dispatch]
  );

  // Handle pagination changes
  const setPagination = useCallback(
    (newPagination: Partial<typeof pagination>) => {
      dispatch({ type: 'SET_PAGINATION', payload: newPagination });
    },
    [dispatch]
  );

  return {
    venues: venuesData?.data || [],
    total: venuesData?.total || 0,
    isLoading,
    error,
    filters,
    pagination,
    setFilters,
    setPagination,
    createVenue: createVenue.mutate,
    updateVenue: updateVenue.mutate,
    deleteVenue: deleteVenue.mutate,
    uploadMedia: uploadMedia.mutate,
    updateVerification: updateVerification.mutate,
  };
} 