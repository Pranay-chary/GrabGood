const express = require('express');
const router = express.Router();
const { 
  getNotifications, 
  getPaginatedNotifications,
  markAsRead, 
  markAllAsRead, 
  deleteNotification, 
  getPreferences, 
  updatePreferences,
  getUnreadCount
} = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Protect all routes
router.use(authMiddleware);

/**
 * @route   GET /api/notifications
 * @desc    Get all notifications for a user
 * @access  Private
 */
router.get('/', getPaginatedNotifications);

/**
 * @route   GET /api/notifications/unread-count
 * @desc    Get unread notification count for a user
 * @access  Private
 */
router.get('/unread-count', getUnreadCount);

/**
 * @route   PATCH /api/notifications/:id/read
 * @desc    Mark a notification as read
 * @access  Private
 */
router.patch('/:id/read', markAsRead);

/**
 * @route   PATCH /api/notifications/mark-all-read
 * @desc    Mark all notifications as read
 * @access  Private
 */
router.patch('/mark-all-read', markAllAsRead);

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Delete a notification
 * @access  Private
 */
router.delete('/:id', deleteNotification);

/**
 * @route   GET /api/notifications/preferences
 * @desc    Get notification preferences for a user
 * @access  Private
 */
router.get('/preferences', getPreferences);

/**
 * @route   PUT /api/notifications/preferences
 * @desc    Update notification preferences for a user
 * @access  Private
 */
router.put('/preferences', updatePreferences);

module.exports = router; 