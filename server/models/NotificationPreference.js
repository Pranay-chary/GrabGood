const mongoose = require('mongoose');

const NotificationPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  email: {
    bookings: { type: Boolean, default: true },
    surplus: { type: Boolean, default: true },
    system: { type: Boolean, default: true },
    profile: { type: Boolean, default: true }
  },
  push: {
    bookings: { type: Boolean, default: true },
    surplus: { type: Boolean, default: true },
    system: { type: Boolean, default: true },
    profile: { type: Boolean, default: true }
  },
  inApp: {
    bookings: { type: Boolean, default: true },
    surplus: { type: Boolean, default: true },
    system: { type: Boolean, default: true },
    profile: { type: Boolean, default: true }
  },
  bookingUpdates: {
    type: Boolean,
    default: true
  },
  surplusFoodAlerts: {
    type: Boolean,
    default: true
  },
  systemAnnouncements: {
    type: Boolean, 
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('NotificationPreference', NotificationPreferenceSchema); 