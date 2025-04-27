import React from 'react';

/**
 * Reusable Badge component for status indicators
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} props.variant - Badge variant (success, warning, danger, info)
 * @param {string} props.className - Additional CSS classes
 */
const Badge = ({
  children,
  variant = 'info',
  className = '',
  ...props
}) => {
  // Base badge class
  let badgeClass = 'badge';
  
  // Add variant class
  switch (variant) {
    case 'success':
      badgeClass += ' badge-success';
      break;
    case 'warning':
      badgeClass += ' badge-warning';
      break;
    case 'danger':
      badgeClass += ' badge-danger';
      break;
    case 'info':
      badgeClass += ' badge-info';
      break;
    default:
      badgeClass += ' badge-info';
  }
  
  // Add custom class if provided
  if (className) {
    badgeClass += ` ${className}`;
  }
  
  return (
    <span className={badgeClass} {...props}>
      {children}
    </span>
  );
};

/**
 * Helper function to determine badge variant based on status
 * @param {string} status - The status string
 * @returns {string} - The badge variant
 */
export const getStatusBadgeVariant = (status) => {
  const statusLower = status.toLowerCase();
  
  if (['active', 'completed', 'confirmed', 'success', 'approved'].includes(statusLower)) {
    return 'success';
  }
  
  if (['pending', 'processing', 'in progress', 'waiting'].includes(statusLower)) {
    return 'warning';
  }
  
  if (['cancelled', 'expired', 'failed', 'error', 'rejected'].includes(statusLower)) {
    return 'danger';
  }
  
  return 'info';
};

export default Badge; 