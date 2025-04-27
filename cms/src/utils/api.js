import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data?.message || 'An error occurred';
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        message
      });
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Error:', error.message);
      return Promise.reject(new Error('Request failed. Please try again.'));
    }
  }
);

// Auth endpoints
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/verify'),
};

// Users endpoints
export const users = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  updateRole: (id, role) => api.patch(`/users/${id}/role`, { role }),
  updateStatus: (id, status) => api.patch(`/users/${id}/status`, { status }),
};

// Listings endpoints
export const listings = {
  getAll: (params) => api.get('/listings', { params }),
  getById: (id) => api.get(`/listings/${id}`),
  create: (data) => api.post('/listings', data),
  update: (id, data) => api.put(`/listings/${id}`, data),
  delete: (id) => api.delete(`/listings/${id}`),
  bulkDelete: (ids) => api.post('/listings/bulk-delete', { ids }),
  export: (params) => api.get('/listings/export', { params, responseType: 'blob' }),
};

// Media endpoints
export const media = {
  getAll: (params) => api.get('/media', { params }),
  upload: (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress?.(percentCompleted);
      },
    });
  },
  delete: (id) => api.delete(`/media/${id}`),
  bulkDelete: (ids) => api.post('/media/bulk-delete', { ids }),
};

// Deals endpoints
export const deals = {
  getAll: (params) => api.get('/deals', { params }),
  getById: (id) => api.get(`/deals/${id}`),
  create: (data) => api.post('/deals', data),
  update: (id, data) => api.put(`/deals/${id}`, data),
  delete: (id) => api.delete(`/deals/${id}`),
  updateStatus: (id, status) => api.patch(`/deals/${id}/status`, { status }),
};

// Business-specific endpoints
export const businesses = {
  // Generic business endpoints
  getAll: (params) => api.get('/business', { params }),
  getByType: (type, params) => api.get(`/business/by-type/${type}`, { params }),
  getById: (id) => api.get(`/business/${id}`),
  create: (data) => api.post('/business', data),
  update: (id, data) => api.put(`/business/${id}`, data),
  delete: (id) => api.delete(`/business/${id}`),
  updateStatus: (id, status) => api.patch(`/business/${id}/status`, { status }),

  // Type-specific features
  getFeatures: (id, type) => api.get(`/business/${id}/features/${type}`),
  updateFeatures: (id, type, data) => api.put(`/business/${id}/features/${type}`, data),

  // Partner-specific endpoints
  getPartnerBusinesses: (type) => api.get(`/business/by-type/${type}/partner`),
  getPartnerStatistics: () => api.get('/businesses/partner/statistics'),
  // Statistics endpoints
  getStatistics: () => api.get('/statistics'),
  getRevenueData: () => api.get('/statistics/revenue'),
  getRecentActivities: () => api.get('/statistics/activities'),

  // Booking endpoints
  getBookings: (params) => api.get('/bookings', { params }),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  createBooking: (data) => api.post('/bookings', data),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  updateBookingStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
  deleteBooking: (id) => api.delete(`/bookings/${id}`),

  // Analytics endpoints
  getAnalytics: (params) => api.get('/analytics', { params }),
  getVenueAnalytics: (venueId) => api.get(`/analytics/venues/${venueId}`),
  getBookingAnalytics: () => api.get('/analytics/bookings'),
  getRevenueAnalytics: () => api.get('/analytics/revenue'),

  // Reports endpoints
  generateReport: (type, params) => api.get(`/reports/${type}`, { 
    params,
    responseType: 'blob'
  }),

  // Notification endpoints
  getNotifications: () => api.get('/notifications'),
  markNotificationAsRead: (id) => api.patch(`/notifications/${id}/read`),
  updateNotificationPreferences: (preferences) => api.put('/notifications/preferences', preferences),

  // Settings endpoints
  getSettings: () => api.get('/settings'),
  updateSettings: (settings) => api.put('/settings', settings)
};

export default api;
