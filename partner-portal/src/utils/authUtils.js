import apiService from './apiService';

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/me',
  REFRESH_TOKEN: '/auth/refresh-token',
};

export const USER_TYPES = {
  PARTNER: 'partner',
  USER: 'user',
  ADMIN: 'admin',
};

export const PORTAL_URLS = {
  PARTNER: import.meta.env.VITE_PARTNER_PORTAL_URL || 'https://partner.grabgood.com',
  USER: import.meta.env.VITE_USER_PORTAL_URL || 'https://user.grabgood.com',
};

export const saveAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const saveUserType = (userType) => {
  localStorage.setItem('userType', userType);
};

export const getUserType = () => {
  return localStorage.getItem('userType');
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  return Boolean(token);
};

export const checkUserPortalAccess = () => {
  const userType = getUserType();
  return userType === USER_TYPES.USER || userType === USER_TYPES.ADMIN;
};

export const checkPartnerPortalAccess = () => {
  const userType = getUserType();
  return userType === USER_TYPES.PARTNER || userType === USER_TYPES.ADMIN;
};

export const redirectToCorrectPortal = () => {
  const userType = getUserType();
  if (userType === USER_TYPES.PARTNER) {
    window.location.href = PORTAL_URLS.PARTNER;
  } else if (userType === USER_TYPES.USER) {
    window.location.href = PORTAL_URLS.USER;
  }
};

export const login = async (email, password) => {
  try {
    const data = await AUTH_ENDPOINTS.login({ email, password });
    
    if (data.token) {
      saveAuthToken(data.token);
      saveUserType(data.userType);
      return data;
    }
    
    throw new Error('Login failed: No token received');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // Call logout endpoint if it exists
    if (isAuthenticated()) {
      try {
        await AUTH_ENDPOINTS.updateProfile({ logout: true });
      } catch (e) {
        console.error('Error during server logout:', e);
        // Continue with client-side logout regardless
      }
    }
    
    // Clear auth data from local storage
    removeAuthToken();
    localStorage.removeItem('userType');
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    if (isAuthenticated()) {
      return await AUTH_ENDPOINTS.getCurrentUser();
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}; 