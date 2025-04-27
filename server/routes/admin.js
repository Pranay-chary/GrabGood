const express = require('express');
const router = express.Router();
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// Import models
const User = require('../models/User');
const Business = require('../models/Business');
const Booking = require('../models/Booking');
const Donation = require('../models/Donation');
const Orphanage = require('../models/Orphanage');

// Protect all admin routes
router.use(authMiddleware);
router.use(authorizeRoles('admin'));

// Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalUsers,
      totalBusinesses,
      totalPendingBusinesses,
      totalBookings,
      totalDonations,
      totalOrphanages
    ] = await Promise.all([
      User.countDocuments(),
      Business.countDocuments({ status: 'active' }),
      Business.countDocuments({ status: 'pending' }),
      Booking.countDocuments(),
      Donation.countDocuments(),
      Orphanage.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalBusinesses,
        totalPendingBusinesses,
        totalBookings,
        totalDonations,
        totalOrphanages,
        recentRegistrations: {
          lastWeek: await User.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
          }),
          lastMonth: await User.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
          })
        }
      }
    });
  } catch (error) {
    console.error('Error getting admin dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get all users with pagination and filtering
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, role, status, search } = req.query;
    const query = {};

    if (role) query.role = role;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        users,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalUsers: count
      }
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update user status
router.patch('/users/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select('-password');

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
    console.error('Error updating user status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Approve or reject business verification
router.patch('/businesses/:id/verify', async (req, res) => {
  try {
    const { verificationStatus, feedback } = req.body;
    
    if (!verificationStatus || !['verified', 'rejected'].includes(verificationStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification status'
      });
    }

    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    business.status = verificationStatus === 'verified' ? 'active' : 'inactive';
    
    // Update the business owner's verification status
    await User.findByIdAndUpdate(
      business.owner,
      { 
        'businessProfile.verificationStatus': verificationStatus,
        'businessProfile.verificationFeedback': feedback || ''
      }
    );

    await business.save();

    res.status(200).json({
      success: true,
      data: business
    });
  } catch (error) {
    console.error('Error verifying business:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get pending business verifications
router.get('/pending-verifications', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const pendingBusinesses = await Business.find({ status: 'pending' })
      .populate('owner', 'name email phone')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: 1 });
    
    const count = await Business.countDocuments({ status: 'pending' });

    res.status(200).json({
      success: true,
      data: {
        businesses: pendingBusinesses,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalPending: count
      }
    });
  } catch (error) {
    console.error('Error getting pending verifications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
