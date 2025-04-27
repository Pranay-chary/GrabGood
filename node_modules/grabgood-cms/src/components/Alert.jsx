import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

const ALERT_TYPES = {
  success: 'bg-green-50 text-green-800',
  error: 'bg-red-50 text-red-800',
  warning: 'bg-yellow-50 text-yellow-800',
  info: 'bg-blue-50 text-blue-800',
};

export const Alert = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  const alertClass = ALERT_TYPES[type] || ALERT_TYPES.info;

  return (
    <div className={`rounded-md p-4 mb-4 ${alertClass}`}>
      <div className="flex">
        <div className="flex-1">
          <p className="text-sm font-medium">
            {message}
          </p>
        </div>
        {onClose && (
          <div className="ml-3">
            <button
              type="button"
              className={`inline-flex rounded-md p-1.5 ${alertClass} hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${type}-50 focus:ring-${type}-600`}
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 