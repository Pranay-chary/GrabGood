/**
 * Validation utility functions
 */

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Indian)
export const isValidIndianPhone = (phone) => {
  // Allow +91 prefix or 10 digits
  const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Password strength validation
export const isStrongPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Check if passwords match
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// PAN card validation (Indian)
export const isValidPAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

// GST number validation (Indian)
export const isValidGST = (gst) => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst);
};

// Required field validation
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim() !== '';
  }
  return value !== null && value !== undefined;
};

// Minimum length validation
export const minLength = (value, min) => {
  if (!value) return false;
  return value.length >= min;
};

// Maximum length validation
export const maxLength = (value, max) => {
  if (!value) return true;
  return value.length <= max;
};

// Numeric value validation
export const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

// Date validation (future date)
export const isFutureDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  return date > now;
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  for (const field in validationRules) {
    const value = formData[field];
    const rules = validationRules[field];
    
    for (const rule of rules) {
      const { type, message, params = [] } = rule;
      
      let isValid = true;
      
      switch (type) {
        case 'required':
          isValid = isRequired(value);
          break;
        case 'email':
          isValid = isValidEmail(value);
          break;
        case 'phone':
          isValid = isValidIndianPhone(value);
          break;
        case 'password':
          isValid = isStrongPassword(value);
          break;
        case 'match':
          isValid = value === formData[params[0]];
          break;
        case 'minLength':
          isValid = minLength(value, params[0]);
          break;
        case 'maxLength':
          isValid = maxLength(value, params[0]);
          break;
        case 'pan':
          isValid = isValidPAN(value);
          break;
        case 'gst':
          isValid = isValidGST(value);
          break;
        case 'numeric':
          isValid = isNumeric(value);
          break;
        case 'futureDate':
          isValid = isFutureDate(value);
          break;
        default:
          break;
      }
      
      if (!isValid) {
        errors[field] = message;
        break;
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 