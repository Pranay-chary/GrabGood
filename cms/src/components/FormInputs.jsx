import { forwardRef } from 'react';

const baseInputStyles = `
  block w-full rounded-md border-gray-300 shadow-sm 
  focus:border-blue-500 focus:ring-blue-500 
  disabled:bg-gray-50 disabled:text-gray-500
  sm:text-sm
`;

const errorInputStyles = `border-red-300 text-red-900 
  placeholder-red-300 focus:border-red-500 
  focus:outline-none focus:ring-red-500
`;

export const FormInput = forwardRef(
  ({ label, error, className = '', ...props }, ref) => (
    <div>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`${baseInputStyles} ${error ? errorInputStyles : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);

export const FormTextarea = forwardRef(
  ({ label, error, className = '', ...props }, ref) => (
    <div>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`${baseInputStyles} ${error ? errorInputStyles : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);

export const FormSelect = forwardRef(
  ({ label, error, options = [], className = '', ...props }, ref) => (
    <div>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`${baseInputStyles} ${error ? errorInputStyles : ''} ${className}`}
        {...props}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);

export const FormCheckbox = forwardRef(({
  label,
  error,
  className = '',
  ...props
}, ref) => (
  <div className="flex items-start">
    <div className="flex items-center h-5">
      <input
        ref={ref}
        type="checkbox"
        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${className}`}
        {...props}
      />
    </div>
    <div className="ml-3 text-sm">
      {label && (
        <label htmlFor={props.id} className="font-medium text-gray-700">
          {label}
        </label>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  </div>
));

export const FormRadioGroup = forwardRef(({
  label,
  error,
  options = [],
  className = '',
  ...props
}, ref) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
    )}
    <div className="space-y-2">
      {options.map(({ value, label: optionLabel }) => (
        <div key={value} className="flex items-center">
          <input
            ref={value === props.value ? ref : undefined}
            type="radio"
            value={value}
            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ${className}`}
            {...props}
          />
          <label htmlFor={`${props.name}-${value}`} className="ml-3 text-sm text-gray-700">
            {optionLabel}
          </label>
        </div>
      ))}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
));

export const FormDatePicker = forwardRef(
  ({ label, error, className = '', ...props }, ref) => (
    <div>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type="date"
        className={`${baseInputStyles} ${error ? errorInputStyles : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);

export const FormSubmitButton = ({ children, isLoading, className = '', ...props }) => (
  <button
    type="submit"
    disabled={isLoading}
    className={`
      px-4 py-2 border border-transparent rounded-md shadow-sm 
      text-sm font-medium text-white bg-blue-600 
      hover:bg-blue-700 focus:outline-none focus:ring-2 
      focus:ring-offset-2 focus:ring-blue-500
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `}
    {...props}
  >
    {isLoading ? (
      <div className="flex items-center space-x-2">
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>Processing...</span>
      </div>
    ) : (
      children
    )}
  </button>
); 