const Notification = require('../models/Notification');
const User = require('../models/User');

/**
 * Create a notification for a user
 * 
 * @param {Object} options - Notification options
 * @param {string} options.userId - User ID to receive notification
 * @param {string} options.title - Notification title
 * @param {string} options.message - Notification message content
 * @param {string} options.type - Type of notification (booking, surplus, system, profile)
 * @param {string} options.link - Optional link to navigate to when clicked
 * @param {Object} options.metadata - Optional additional data
 * @returns {Promise<Object>} Created notification
 */
exports.createNotification = async (options) => {
  try {
    const { userId, title, message, type = 'system', link = null, metadata = {} } = options;
    
    if (!userId || !title || !message) {
      throw new Error('Missing required notification fields');
    }
    
    // Create notification
    const notification = await Notification.create({
      user: userId,
      title,
      message,
      type,
      link,
      metadata,
      createdAt: new Date()
    });
    
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

/**
 * Create sample notifications for a new user
 * 
 * @param {string} userId - User ID to create notifications for
 * @returns {Promise<Array>} Array of created notifications
 */
exports.generateWelcomeNotifications = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    const notifications = [];
    
    // Welcome notification
    notifications.push(await this.createNotification({
      userId,
      title: 'Welcome to GrabGood',
      message: 'Thank you for joining GrabGood. Complete your profile to get started.',
      type: 'system',
      link: '/profile'
    }));
    
    // Feature notification
    notifications.push(await this.createNotification({
      userId,
      title: 'Add Your Listings',
      message: 'Start by adding your first listing to showcase your services.',
      type: 'system',
      link: '/listings/add'
    }));
    
    return notifications;
  } catch (error) {
    console.error('Error generating welcome notifications:', error);
    throw error;
  }
};

/**
 * Get unread notification count for a user
 * 
 * @param {string} userId - User ID to count notifications for
 * @returns {Promise<number>} Number of unread notifications
 */
exports.getUnreadCount = async (userId) => {
  try {
    return await Notification.countDocuments({
      user: userId,
      isRead: false
    });
  } catch (error) {
    console.error('Error counting unread notifications:', error);
    throw error;
  }
};

/**
 * Mark all notifications as read for a user
 * 
 * @param {string} userId - User ID to mark notifications for
 * @returns {Promise<Object>} Update result
 */
exports.markAllAsRead = async (userId) => {
  try {
    return await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true }
    );
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

/**
 * Create a sample notification for a user
 * This is useful for testing and development
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.userId - User ID to create notification for
 * @param {string} options.type - Notification type ('order', 'booking', 'system', 'alert')
 * @param {string} options.title - Title of the notification
 * @param {string} options.message - Message content
 * @param {string} options.actionUrl - URL to navigate to when notification is clicked
 * @returns {Promise<Object>} Created notification
 */
exports.createSampleNotification = async (options) => {
  try {
    const { userId, type = 'system', title, message, actionUrl = null } = options;
    
    if (!userId || !title || !message) {
      throw new Error('Missing required fields for sample notification');
    }
    
    return await exports.createNotification({
      userId,
      title,
      message,
      type,
      link: actionUrl
    });
  } catch (error) {
    console.error('Error creating sample notification:', error);
    throw error;
  }
};

/**
 * Generate a set of sample notifications for a user
 * This is useful for testing and initial data setup
 * 
 * @param {string} userId - User ID to create notifications for
 * @returns {Promise<Array>} Array of created notifications
 */
exports.generateSampleNotifications = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    const notifications = [];
    
    // System notifications
    notifications.push(await exports.createNotification({
      userId,
      title: 'Welcome to GrabGood Partner Portal',
      message: 'Thank you for joining GrabGood. Get started by completing your business profile.',
      type: 'system',
      link: '/settings'
    }));
    
    notifications.push(await exports.createNotification({
      userId,
      title: 'New Feature Available',
      message: 'You can now manage your surplus food inventory in real-time.',
      type: 'system',
      link: '/surplus'
    }));
    
    // Order notifications
    notifications.push(await exports.createNotification({
      userId,
      title: 'New Surplus Food Request',
      message: 'Orphanage "Children\'s Hope" has requested your surplus food.',
      type: 'order',
      link: '/surplus'
    }));
    
    notifications.push(await exports.createNotification({
      userId,
      title: 'Donation Completed',
      message: 'Your food donation has been delivered successfully. Thank you for your contribution!',
      type: 'order',
      link: '/donations'
    }));
    
    // Booking notifications
    notifications.push(await exports.createNotification({
      userId,
      title: 'New Booking Request',
      message: 'You have received a new booking request for your function hall.',
      type: 'booking',
      link: '/bookings'
    }));
    
    notifications.push(await exports.createNotification({
      userId,
      title: 'Booking Confirmed',
      message: 'A booking has been confirmed for June 15, 2023.',
      type: 'booking',
      link: '/bookings'
    }));
    
    // Alert notification
    notifications.push(await exports.createNotification({
      userId,
      title: 'Security Alert',
      message: 'Your account was accessed from a new device. Please verify this was you.',
      type: 'alert',
      link: '/settings/security'
    }));
    
    return notifications;
  } catch (error) {
    console.error('Error generating sample notifications:', error);
    throw error;
  }
}; 