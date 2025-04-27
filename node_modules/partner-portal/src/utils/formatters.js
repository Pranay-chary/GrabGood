/**
 * Utility functions for formatting data
 */

// Format currency values
export const formatCurrency = (value, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency
  }).format(value);
};

// Format dates
export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  }).format(date);
};

// Format time
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

// Format date and time
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

// Format quantity with units
export const formatQuantity = (value, unit = 'kg') => {
  return `${value} ${unit}`;
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Format phone numbers
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Format Indian phone number: +91 XXXXX XXXXX
  if (phoneNumber.length === 10) {
    return phoneNumber.replace(/(\d{5})(\d{5})/, '$1 $2');
  }
  
  // If it already has country code
  if (phoneNumber.startsWith('+91') && phoneNumber.length === 13) {
    return phoneNumber.replace(/\+91(\d{5})(\d{5})/, '+91 $1 $2');
  }
  
  return phoneNumber;
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}; 