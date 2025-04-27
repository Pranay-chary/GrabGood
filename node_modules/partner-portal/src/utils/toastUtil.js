// Simple toast utility to replace react-toastify
// This is a temporary solution until we can resolve the react-toastify package installation issue

import { toast as reactToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Default configuration for toasts
const defaultOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Create a simple toast notification system
const createToast = (message, type = 'info') => {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '1rem';
    toastContainer.style.right = '1rem';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.style.minWidth = '250px';
  toast.style.margin = '0.5rem 0';
  toast.style.padding = '1rem';
  toast.style.borderRadius = '0.25rem';
  toast.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  toast.style.display = 'flex';
  toast.style.justifyContent = 'space-between';
  toast.style.alignItems = 'center';
  toast.style.transition = 'all 0.3s ease';
  toast.style.opacity = '0';

  // Set background color based on type
  switch (type) {
    case 'success':
      toast.style.backgroundColor = '#10B981';
      toast.style.color = 'white';
      break;
    case 'error':
      toast.style.backgroundColor = '#EF4444';
      toast.style.color = 'white';
      break;
    case 'warning':
      toast.style.backgroundColor = '#F59E0B';
      toast.style.color = 'white';
      break;
    default:
      toast.style.backgroundColor = '#3B82F6';
      toast.style.color = 'white';
  }

  // Add message
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  toast.appendChild(messageElement);

  // Add close button
  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.color = 'inherit';
  closeButton.style.fontSize = '1.25rem';
  closeButton.style.cursor = 'pointer';
  closeButton.style.marginLeft = '0.5rem';
  closeButton.onclick = () => {
    removeToast(toast);
  };
  toast.appendChild(closeButton);

  // Add to container
  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);

  // Auto-remove after duration
  setTimeout(() => {
    removeToast(toast);
  }, 5000);

  return toast;
};

// Function to remove toast
const removeToast = (toast) => {
  toast.style.opacity = '0';
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
};

export const toast = {
  success: (message, options = {}) => {
    return reactToast.success(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-success',
    });
  },
  
  error: (message, options = {}) => {
    return reactToast.error(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-error',
    });
  },
  
  info: (message, options = {}) => {
    return reactToast.info(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-info',
    });
  },
  
  warning: (message, options = {}) => {
    return reactToast.warning(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-warning',
    });
  },
  
  dismiss: (id) => {
    if (id) {
      reactToast.dismiss(id);
    } else {
      reactToast.dismiss();
    }
  },
  
  custom: (message, options = {}) => {
    return reactToast(message, {
      ...defaultOptions,
      ...options,
    });
  },
};

export default toast; 