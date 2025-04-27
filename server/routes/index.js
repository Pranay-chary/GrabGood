const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

// Import implemented route files
const authRoutes = require('./auth');
const notificationsRoutes = require('./notifications');
const businessRoutes = require('./businesses');
const adminRoutes = require('./admin');
const functionHallRoutes = require('./functionHall');
const bookingRoutes = require('./bookings');
const volunteerRoutes = require('./volunteers');
const orphanageRoutes = require('./orphanages');
const donationRoutes = require('./donations');
const analyticsRoutes = require('./analytics');
const settingsRoutes = require('./settings');

// Mount implemented routes
router.use('/business', businessRoutes);
router.use('/bookings', bookingRoutes);
router.use('/auth', authRoutes);
router.use('/notifications', authMiddleware, notificationsRoutes);
router.use('/admin', adminRoutes);
router.use('/partner/function-hall', functionHallRoutes);
router.use('/volunteers', volunteerRoutes);
router.use('/orphanages', orphanageRoutes);
router.use('/donations', donationRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/settings', settingsRoutes);

// Partner profile route
router.get('/partner/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const User = require('../models/User');
    const Business = require('../models/Business');
    
    // Find the user and their business
    const user = await User.findById(userId);
    const business = await Business.findOne({ owner: userId });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Combine user and business data
    const profileData = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      },
      business: business ? {
        id: business._id,
        name: business.name,
        type: business.type,
        status: business.status,
        location: business.location,
        contact: business.contact
      } : null
    };
    
    res.status(200).json({
      success: true,
      data: profileData
    });
  } catch (error) {
    console.error('Error fetching partner profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile data',
      error: error.message
    });
  }
});

// Get user profile
router.get('/user/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const User = require('../models/User');
    
    // Find the user
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile data',
      error: error.message
    });
  }
});

// Surplus food route
router.get('/surplus', authMiddleware, async (req, res) => {
  try {
    const Donation = require('../models/Donation');
    
    // Find pending food donations
    const pendingDonations = await Donation.find({ 
      type: 'food',
      status: 'pending'
    })
      .populate('donor', 'name')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.status(200).json({
      success: true,
      data: pendingDonations
    });
  } catch (error) {
    console.error('Error fetching surplus food:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching surplus food data',
      error: error.message
    });
  }
});

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

module.exports = router; 