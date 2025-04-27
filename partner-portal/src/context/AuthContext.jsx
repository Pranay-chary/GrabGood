import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../utils/apiService';

const AuthContext = createContext(null);

const TOKEN_REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const navigate = useNavigate();

  const handleSessionTimeout = useCallback(() => {
    logout();
    navigate('/login', { state: { message: 'Session expired. Please login again.' } });
  }, [navigate]);

  const refreshToken = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await apiService.post('/auth/refresh-token');
      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        await refreshUserData();
      } else {
        handleSessionTimeout();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      handleSessionTimeout();
    }
  }, [handleSessionTimeout]);

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await apiService.get('/auth/me');
      if (response && response.data) {
        setUser(response.data);
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
    return () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, [checkAuth, sessionTimeout]);

  useEffect(() => {
    if (user) {
      // Set up token refresh interval
      const refreshInterval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
      
      // Set up session timeout
      const timeout = setTimeout(() => {
        handleSessionTimeout();
      }, SESSION_TIMEOUT);
      
      setSessionTimeout(timeout);

      return () => {
        clearInterval(refreshInterval);
        clearTimeout(timeout);
      };
    }
  }, [user, refreshToken, handleSessionTimeout]);

  const refreshUserData = async () => {
    try {
      const response = await apiService.get('/auth/me');
      if (response && response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email });

      const response = await apiService.post('/auth/login', {
        email: email.trim(),
        password: password
      });

      console.log('Login response:', response);

      if (response && response.success && response.token) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        return { success: true };
      }

      return {
        success: false,
        message: response.message || 'Invalid email or password'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'An unexpected error occurred. Please try again.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
