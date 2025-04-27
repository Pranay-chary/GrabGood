// Using toast notification in a way that's safe if it doesn't exist
const notifyError = (message) => {
  if (typeof window !== 'undefined') {
    console.error(message);
    // If a toast library is added later, we can use it here
  }
};

class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || import.meta.env.VITE_API_URL;
  }

  // Get the authentication token
  getToken() {
    return localStorage.getItem('token');
  }

  // Headers for API requests
  getHeaders(additionalHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...additionalHeaders
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: this.getHeaders(options.headers || {})
      });

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        
        if (!response.ok) {
          const errorMessage = data.message || 'An error occurred';
          throw new Error(errorMessage);
        }
        
        return data;
      } else {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        
        return await response.text();
      }
    } catch (error) {
      console.error(`API request failed: ${error.message}`);
      notifyError(error.message || 'Request failed');
      throw error;
    }
  }

  // GET request
  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options
    });
  }

  // POST request
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  }

  // PUT request
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  }

  // PATCH request
  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options
    });
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options
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