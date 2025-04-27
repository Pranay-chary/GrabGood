import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const venueApi = {
  getAll: async ({ page = 1, limit = 10, type = '', status = '', search = '' }) => {
    const response = await api.get('/venues', {
      params: {
        page,
        limit,
        type,
        status,
        search,
      },
    });
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/venues', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/venues/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/venues/${id}`);
  },

  uploadMedia: async (id, files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    const response = await api.post(`/venues/${id}/media`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateVerification: async (id, data) => {
    const response = await api.put(`/venues/${id}/verification`, data);
    return response.data;
  },
}; 