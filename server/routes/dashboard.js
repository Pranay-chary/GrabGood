const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

// Get dashboard data
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Get user's business ID
    const userId = req.user.id;
    const Business = require('../models/Business');
    const Donation = require('../models/Donation');
    const Booking = require('../models/Booking');

    // Find the user's business
    const business = await Business.findOne({ owner: userId });
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Get recent donations
    const recentDonations = await Donation.find({ 
      business: business._id 
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent bookings
    const recentBookings = await Booking.find({ 
      business: business._id 
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // Calculate stats
    const [
      totalDonations,
      totalBookings,
      pendingBookings
    ] = await Promise.all([
      Donation.countDocuments({ business: business._id }),
      Booking.countDocuments({ business: business._id }),
      Booking.countDocuments({ 
        business: business._id,
        status: 'pending'
      })
    ]);

    // Calculate impact score (example metric)
    const impactScore = Math.floor(
      (totalDonations * 2) + 
      (totalBookings * 1.5) + 
      Math.max(0, 100 - pendingBookings)
    );

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalDonations,
          totalBookings,
          pendingBookings,
          impactScore
        },
        recentDonations,
        recentBookings,
        businesses: [business]
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data',
      error: error.message
    });
  }
});

module.exports = router;
