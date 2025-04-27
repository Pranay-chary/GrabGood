const { body, validationResult } = require('express-validator');

// Middleware to check validation results
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Notification preferences validation
const validateNotificationPreferences = [
  body('email').optional().isBoolean().withMessage('Email preference must be boolean'),
  body('push').optional().isBoolean().withMessage('Push preference must be boolean'),
  body('inApp').optional().isBoolean().withMessage('In-app preference must be boolean'),
  body('bookingUpdates').optional().isBoolean().withMessage('Booking updates preference must be boolean'),
  body('surplusFoodAlerts').optional().isBoolean().withMessage('Surplus food alerts preference must be boolean'),
  body('systemAnnouncements').optional().isBoolean().withMessage('System announcements preference must be boolean'),
  checkValidation
];

// Create notification validation
const validateCreateNotification = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('title').notEmpty().withMessage('Notification title is required'),
  body('message').notEmpty().withMessage('Notification message is required'),
  body('type').isIn(['booking', 'surplus', 'system']).withMessage('Type must be booking, surplus, or system'),
  body('data').optional().isObject().withMessage('Data must be an object'),
  body('link').optional().isURL().withMessage('Link must be a valid URL'),
  checkValidation
];

// User registration validation
const validateUserRegistration = [
  check('name', 'Name is required').notEmpty().trim(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('userType', 'User type is required').isIn(['consumer', 'partner']),
  checkValidation
];

// User login validation
const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  checkValidation
];

module.exports = {
  checkValidation,
  validateNotificationPreferences,
  validateCreateNotification,
  validateUserRegistration,
  validateLogin
}; 