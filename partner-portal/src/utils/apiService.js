import { toast } from './toastUtil';

const API_BASE_URL = 'http://localhost:5001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get the authentication token
  getToken() {
    return localStorage.getItem('token');
  }

  // Headers for API requests
  getHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  async handleResponse(response) {
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    
    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: this.getHeaders()
      });

      return this.handleResponse(response);
    } catch (error) {
      console.error(`API request failed: ${error.message}`);
      toast.error(error.message || 'Request failed');
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint);
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // Upload file(s)
  async upload(endpoint, formData, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      headers: {},  // Let the browser set the Content-Type for multipart/form-data
      body: formData,
      ...options
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
