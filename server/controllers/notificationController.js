const Notification = require('../models/Notification');
const User = require('../models/User');
const NotificationPreference = require('../models/NotificationPreference');
const mongoose = require('mongoose');
const { format } = require('date-fns');
const logger = require('../utils/logger');
const { createNotification } = require('../utils/notificationUtils');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Get notifications for the authenticated user with filter options
 * @route GET /api/notifications
 * @access Private
 */
exports.getNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications
  });
});

/**
 * Get paginated notifications for the authenticated user with filter options
 * @route GET /api/notifications
 * @access Private
 */
exports.getPaginatedNotifications = async (req, res) => {
  try {
    console.log('Getting paginated notifications');
    console.log('User:', req.user);
    console.log('User ID:', req.user.id);
    console.log('User _id:', req.user._id);
    console.log('Query params:', req.query);
    
    const { page = 1, limit = 10, filter } = req.query;
    
    // Use _id instead of id if that's what's available
    const userId = req.user._id || req.user.id;
    console.log('Using userId:', userId);
    
    const query = { userId: userId };
    
    console.log('MongoDB query:', JSON.stringify(query));
    
    // Apply filter if provided
    if (filter === 'unread') {
      query.read = false;
      console.log('Applied unread filter');
    } else if (filter && filter !== 'all') {
      // Make the filter case-insensitive and allow front-end friendly names
      const typeMap = {
        'order': 'SURPLUS_FOOD_ALERT',
        'booking': 'BOOKING_UPDATE',
        'system': 'SYSTEM_ANNOUNCEMENT',
        'alert': 'OTHER'
      };
      
      const normalizedFilter = filter.toUpperCase();
      const mappedType = typeMap[filter.toLowerCase()] || normalizedFilter;
      
      // Check against possible types using $or to be flexible
      query.$or = [
        { type: mappedType },
        { type: normalizedFilter }
      ];
      
      console.log('Applied type filter with mapping:', filter, '->', mappedType);
    }
    
    console.log('Final MongoDB query:', JSON.stringify(query));
    
    const options = {
      sort: { createdAt: -1 },
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    };
    
    console.log('MongoDB query options:', JSON.stringify(options));
    
    try {
      // Find all notifications for this user to see if any exist
      const allUserNotifications = await Notification.find({ userId: userId });
      console.log('All user notifications (any filter):', allUserNotifications.length);
      if (allUserNotifications.length > 0) {
        console.log('First notification:', allUserNotifications[0]);
      }
      
      // Get the requested notifications with filters
      const notifications = await Notification.find(query, null, options);
      console.log('Notifications found with filter:', notifications.length);
      
      const totalCount = await Notification.countDocuments(query);
      console.log('Total count:', totalCount);
      
      res.status(200).json({
        success: true,
        data: notifications,
        pagination: {
          total: totalCount,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(totalCount / parseInt(limit))
        }
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notifications'
    });
  }
};

/**
 * Mark a notification as read
 * @route PUT /api/notifications/:id/read
 * @access Private
 */
exports.markAsRead = asyncHandler(async (req, res, next) => {
  let notification = await Notification.findById(req.params.id);

  if (!notification) {
    return next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns notification
  if (notification.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized to update this notification`, 401));
  }

  notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { read: true },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: notification
  });
});

/**
 * Mark all notifications as read
 * @route PUT /api/notifications/read-all
 * @access Private
 */
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await Notification.updateMany(
      { userId, read: false },
      { $set: { read: true } }
    );
    
    res.status(200).json({ 
      success: true,
      message: 'All notifications marked as read',
      data: {
        modifiedCount: result.nModified || result.modifiedCount
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

/**
 * Delete a notification
 * @route DELETE /api/notifications/:id
 * @access Private
 */
exports.deleteNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns notification
  if (notification.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized to delete this notification`, 401));
  }

  await notification.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

/**
 * Bulk delete notifications
 * @route DELETE /api/notifications/bulk
 * @access Private
 */
exports.bulkDeleteNotifications = async (req, res) => {
  try {
    const { ids } = req.body;
    const userId = req.user.id;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ msg: 'Please provide notification IDs' });
    }
    
    // Validate IDs
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    
    if (validIds.length === 0) {
      return res.status(400).json({ msg: 'No valid notification IDs provided' });
    }
    
    const result = await Notification.deleteMany({
      _id: { $in: validIds },
      userId
    });
    
    res.status(200).json({ 
      msg: 'Notifications deleted',
      count: result.deletedCount
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Get user notification preferences
 * @route GET /api/notifications/preferences
 * @access Private
 */
exports.getPreferences = async (req, res) => {
  try {
    let preferences = await NotificationPreference.findOne({ userId: req.user.id });
    
    if (!preferences) {
      // Create default preferences if none exist
      preferences = new NotificationPreference({
        userId: req.user.id,
        email: {
          enabled: true,
          bookingUpdates: true,
          surplusFoodAlerts: true,
          systemAnnouncements: true
        },
        push: {
          enabled: true,
          bookingUpdates: true,
          surplusFoodAlerts: true,
          systemAnnouncements: true
        },
        inApp: {
          enabled: true,
          bookingUpdates: true,
          surplusFoodAlerts: true,
          systemAnnouncements: true
        },
        bookingUpdates: true,
        surplusFoodAlerts: true,
        systemAnnouncements: true
      });
      
      await preferences.save();
    }
    
    res.json(preferences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * Update user notification preferences
 * @route PUT /api/notifications/preferences
 * @access Private
 */
exports.updatePreferences = async (req, res) => {
  const {
    email,
    push,
    inApp,
    bookingUpdates,
    surplusFoodAlerts,
    systemAnnouncements
  } = req.body;

  try {
    let preferences = await NotificationPreference.findOne({ userId: req.user.id });
    
    if (!preferences) {
      preferences = new NotificationPreference({
        userId: req.user.id
      });
    }
    
    // Update fields
    if (email) preferences.email = email;
    if (push) preferences.push = push;
    if (inApp) preferences.inApp = inApp;
    if (bookingUpdates !== undefined) preferences.bookingUpdates = bookingUpdates;
    if (surplusFoodAlerts !== undefined) preferences.surplusFoodAlerts = surplusFoodAlerts;
    if (systemAnnouncements !== undefined) preferences.systemAnnouncements = systemAnnouncements;
    
    await preferences.save();
    res.json(preferences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * Create a notification for a user
 * @param {Object} notificationData - Notification data
 * @private
 */
exports.createNotification = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId, title, message, type, data, link } = req.body;

    // Check if user has turned off notifications for this type
    const preference = await NotificationPreference.findOne({ userId });
    
    if (preference) {
      if (
        (type === 'booking' && !preference.bookingUpdates) ||
        (type === 'surplus' && !preference.surplusFoodAlerts) ||
        (type === 'system' && !preference.systemAnnouncements)
      ) {
        return res.status(400).json({ msg: 'User has disabled this notification type' });
      }
    }

    const newNotification = new Notification({
      userId,
      title,
      message,
      type,
      read: false,
      data: data || {},
      link: link || ''
    });

    const notification = await newNotification.save();
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * Get unread notification count for the authenticated user
 * @route GET /api/notifications/unread-count
 * @access Private
 */
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ 
      userId: req.user.id,
      read: false
    });
    
    res.status(200).json({
      success: true,
      data: { count }
    });
  } catch (err) {
    console.error('Error fetching unread count:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching unread count'
    });
  }
};

/**
 * Clear all notifications for a user
 * @route DELETE /api/notifications/clear-all
 * @access Private
 */
exports.clearAllNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await Notification.deleteMany({ userId });
    
    res.status(200).json({ 
      msg: 'All notifications cleared',
      count: result.deletedCount
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Helper function to send notification to users
exports.sendNotification = async (options) => {
  try {
    const { userId, title, message, type, actionUrl } = options;
    
    if (!userId || !title || !message) {
      throw new Error('Missing required notification fields');
    }
    
    return await this.createNotification(userId, {
      title,
      message,
      type: type || 'system',
      actionUrl: actionUrl || null
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
}; 