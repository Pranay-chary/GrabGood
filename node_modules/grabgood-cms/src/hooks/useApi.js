import { useState, useCallback } from 'react';

export function useApi(apiFunction, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { onSuccess, onError, transform } = options;

  const execute = useCallback(async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiFunction(...args);
      const transformedData = transform ? transform(response) : response;
      setData(transformedData);
      onSuccess?.(transformedData);
      return transformedData;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction, onSuccess, onError, transform]);

  return {
    data,
    error,
    isLoading,
    execute,
    setData,
    setError,
  };
}

export function useApiMutation(apiFunction, options = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { onSuccess, onError, onSettled } = options;

  const mutate = useCallback(async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiFunction(...args);
      onSuccess?.(response);
      return response;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
      onSettled?.();
    }
  }, [apiFunction, onSuccess, onError, onSettled]);

  return {
    mutate,
    isLoading,
    error,
    setError,
  };
}

export function useForm(options = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { onSubmit, onSuccess, onError, validate } = options;

  const handleSubmit = useCallback(async (values) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form data if validation function is provided
      if (validate) {
        await validate(values);
      }

      // Submit form data
      const result = await onSubmit(values);
      onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Form submission failed';
      setError(errorMessage);
      onError?.(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, onSuccess, onError, validate]);

  return {
    handleSubmit,
    isSubmitting,
    error,
    setError,
  };
}

export function useSearch(searchFunction, options = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const { debounceTime = 300, onSuccess, onError } = options;

  const search = useCallback(async (term) => {
    setIsSearching(true);
    setError(null);

    try {
      const searchResults = await searchFunction(term);
      setResults(searchResults);
      onSuccess?.(searchResults);
      return searchResults;
    } catch (err) {
      const errorMessage = err.message || 'Search failed';
      setError(errorMessage);
      onError?.(err);
      throw err;
    } finally {
      setIsSearching(false);
    }
  }, [searchFunction, onSuccess, onError]);

  const debouncedSearch = useCallback((term) => {
    setSearchTerm(term);
    const timeoutId = setTimeout(() => {
      search(term);
    }, debounceTime);
    return () => clearTimeout(timeoutId);
  }, [search, debounceTime]);

  return {
    searchTerm,
    setSearchTerm: debouncedSearch,
    isSearching,
    results,
    error,
    setError,
    search,
  };
}

export function usePagination(options = {}) {
  const { initialPage = 1, initialPageSize = 10 } = options;
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const previousPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  const goToPage = useCallback((pageNumber) => {
    setPage(Math.max(1, pageNumber));
  }, []);

  return {
    page,
    pageSize,
    setPageSize,
    nextPage,
    previousPage,
    goToPage,
  };
} 