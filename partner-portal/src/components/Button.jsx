import React from 'react';

/**
 * Reusable Button component with various style options
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant (primary, secondary, outline, danger)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.isLoading - Whether the button is in loading state
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onClick - Click handler
 * @param {React.ReactNode} props.icon - Optional icon to display with the text
 * @param {string} props.type - Button type attribute (button, submit, reset)
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  icon,
  type = 'button',
  ...props
}) => {
  // Base button class
  let buttonClass = 'btn';
  
  // Add variant class
  switch (variant) {
    case 'primary':
      buttonClass += ' btn-primary';
      break;
    case 'secondary':
      buttonClass += ' btn-secondary';
      break;
    case 'outline':
      buttonClass += ' btn-outline';
      break;
    case 'danger':
      buttonClass += ' btn-danger';
      break;
    default:
      buttonClass += ' btn-primary';
  }
  
  // Add size class
  switch (size) {
    case 'sm':
      buttonClass += ' text-xs px-2.5 py-1.5';
      break;
    case 'lg':
      buttonClass += ' text-base px-6 py-3';
      break;
    default:
      // Medium is default in the base btn class
      break;
  }
  
  // Add custom class if provided
  if (className) {
    buttonClass += ` ${className}`;
  }
  
  // Add disabled styling
  if (disabled || isLoading) {
    buttonClass += ' opacity-60 cursor-not-allowed';
  }
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <span className="spinner mr-2 w-4 h-4"></span>
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </div>
      )}
    </button>
  );
};

export default Button; 