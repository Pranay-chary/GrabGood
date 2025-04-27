import React from 'react';

/**
 * Reusable Card component with various style options
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Optional card title
 * @param {React.ReactNode} props.icon - Optional icon component to display with title
 * @param {React.ReactNode} props.action - Optional action button or component to display in header
 * @param {React.ReactNode} props.footer - Optional footer content
 * @param {string} props.className - Additional CSS classes for the card
 * @param {boolean} props.hover - Whether to add hover effects to the card
 * @param {boolean} props.noPadding - Remove default padding from card body
 */
const Card = ({ 
  children, 
  title, 
  icon, 
  action, 
  footer, 
  className = '', 
  hover = false,
  noPadding = false
}) => {
  return (
    <div className={`card ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`}>
      {(title || action) && (
        <div className="card-header flex justify-between items-center">
          <div className="flex items-center">
            {icon && <div className="mr-2">{icon}</div>}
            {title && <h3 className="text-lg font-medium">{title}</h3>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      
      <div className={noPadding ? '' : 'card-body'}>
        {children}
      </div>
      
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card; 