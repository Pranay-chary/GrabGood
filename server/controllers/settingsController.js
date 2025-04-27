const Settings = require('../models/Settings');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get settings
// @route   GET /api/settings
// @access  Private
exports.getSettings = asyncHandler(async (req, res, next) => {
  // Get settings for the current user
  let settings = await Settings.findOne({ user: req.user.id });

  // If no settings exist, create default settings
  if (!settings) {
    settings = await Settings.create({
      user: req.user.id,
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      preferences: {
        language: 'en',
        currency: 'INR',
        timezone: 'Asia/Kolkata'
      },
      theme: 'light',
      accessibility: {
        highContrast: false,
        largeText: false
      }
    });
  }

  res.status(200).json({
    success: true,
    data: settings
  });
});

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private
exports.updateSettings = asyncHandler(async (req, res, next) => {
  let settings = await Settings.findOne({ user: req.user.id });

  if (!settings) {
    return next(new ErrorResponse('Settings not found', 404));
  }

  settings = await Settings.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: settings
  });
});
