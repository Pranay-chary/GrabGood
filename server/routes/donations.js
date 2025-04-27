const express = require('express');
const router = express.Router();
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const Donation = require('../models/Donation');
const Orphanage = require('../models/Orphanage');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');

// Get all donations with filtering - admin or partner only
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      type,
      orphanage,
      volunteer,
      startDate,
      endDate,
      search
    } = req.query;
    
    const query = {};
    
    // Regular users can only see their own donations
    if (req.user.role === 'user') {
      query.donor = req.user.id;
    } else if (req.user.role === 'partner' || req.user.role === 'business') {
      query.donor = req.user.id;
    }
    
    if (status) query.status = status;
    if (type) query.type = type;
    if (orphanage) query.orphanage = orphanage;
    if (volunteer) query.volunteer = volunteer;
    
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else if (startDate) {
      query.createdAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.createdAt = { $lte: new Date(endDate) };
    }
    
    const donations = await Donation.find(query)
      .populate('donor', 'name email')
      .populate('orphanage', 'name location.city')
      .populate('volunteer', 'user')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
      
    const count = await Donation.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        donations,
        totalPages: Math.ceil(count / limit),
        currentPage: page * 1,
        totalDonations: count
      }
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get donation by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donor', 'name email phone')
      .populate('orphanage', 'name location contact')
      .populate({
        path: 'volunteer',
        populate: {
          path: 'user',
          select: 'name email phone avatar'
        }
      });
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }
    
    // Check if user is authorized to view this donation
    if (
      req.user.role !== 'admin' && 
      donation.donor.toString() !== req.user.id && 
      (donation.volunteer && donation.volunteer.user.toString() !== req.user.id)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this donation'
      });
    }
    
    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create a new donation - requires authentication
router.post('/', authMiddleware, async (req, res) => {
  try {
    const donationData = {
      ...req.body,
      donor: req.user.id,
    };
    
    // If orphanage is specified, verify it exists and is active
    if (donationData.orphanage) {
      const orphanage = await Orphanage.findById(donationData.orphanage);
      if (!orphanage) {
        return res.status(404).json({
          success: false,
          message: 'Orphanage not found'
        });
      }
      
      if (orphanage.status !== 'active') {
        return res.status(400).json({
          success: false,
          message: 'Orphanage is not active'
        });
      }
    }
    
    // Create new donation
    const donation = await Donation.create(donationData);
    
    // If this is a food donation, we might want to match with a volunteer
    if (donation.type === 'food' && !donation.volunteer) {
      // This would be implemented with a more sophisticated matching algorithm
      // For now, just find an active volunteer
      const volunteer = await Volunteer.findOne({ status: 'active' });
      if (volunteer) {
        donation.volunteer = volunteer._id;
        await donation.save();
      }
    }
    
    res.status(201).json({
      success: true,
      data: donation
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update donation status
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['pending', 'approved', 'completed', 'cancelled', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }
    
    // Check permissions
    const isAdmin = req.user.role === 'admin';
    const isDonor = donation.donor.toString() === req.user.id;
    const isVolunteer = donation.volunteer && donation.volunteer.toString() === req.user.id;
    
    // Only admin, donor or assigned volunteer can update
    if (!isAdmin && !isDonor && !isVolunteer) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this donation'
      });
    }
    
    // Different status transitions have different requirements
    if (status === 'completed') {
      donation.completedAt = Date.now();
      
      // If this is a volunteer completing the donation, also update their stats
      if (isVolunteer) {
        const volunteer = await Volunteer.findById(donation.volunteer);
        if (volunteer) {
          volunteer.totalCompletedDonations += 1;
          volunteer.donationHistory.push(donation._id);
          await volunteer.save();
        }
      }
      
      // Update orphanage's donation history
      if (donation.orphanage) {
        const orphanage = await Orphanage.findById(donation.orphanage);
        if (orphanage) {
          orphanage.donationHistory.push(donation._id);
          await orphanage.save();
        }
      }
    }
    
    donation.status = status;
    await donation.save();
    
    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (error) {
    console.error('Error updating donation status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Assign volunteer to donation - admin only
router.patch('/:id/assign-volunteer', authMiddleware, authorizeRoles('admin'), async (req, res) => {
  try {
    const { volunteerId } = req.body;
    
    if (!volunteerId) {
      return res.status(400).json({
        success: false,
        message: 'Volunteer ID is required'
      });
    }
    
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }
    
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    if (volunteer.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Volunteer is not active'
      });
    }
    
    donation.volunteer = volunteerId;
    await donation.save();
    
    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (error) {
    console.error('Error assigning volunteer:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get user's donation history
router.get('/user/history', authMiddleware, async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id })
      .populate('orphanage', 'name location.city')
      .populate('volunteer', 'user')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: donations
    });
  } catch (error) {
    console.error('Error fetching user donation history:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get volunteer's assigned donations
router.get('/volunteer/assignments', authMiddleware, async (req, res) => {
  try {
    // First find the volunteer record for this user
    const volunteer = await Volunteer.findOne({ user: req.user.id });
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer record not found'
      });
    }
    
    const donations = await Donation.find({ 
      volunteer: volunteer._id,
      status: { $in: ['approved', 'pending'] }
    })
      .populate('donor', 'name')
      .populate('orphanage', 'name location contact')
      .sort({ createdAt: 1 });
    
    res.status(200).json({
      success: true,
      data: donations
    });
  } catch (error) {
    console.error('Error fetching volunteer assignments:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Issue receipt for donation - admin only
router.post('/:id/receipt', authMiddleware, authorizeRoles('admin'), async (req, res) => {
  try {
    const { receiptNumber, amount } = req.body;
    
    if (!receiptNumber) {
      return res.status(400).json({
        success: false,
        message: 'Receipt number is required'
      });
    }
    
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }
    
    if (donation.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Donation must be completed before issuing a receipt'
      });
    }
    
    donation.acknowledgementReceipt = {
      issued: true,
      receiptNumber,
      issuedAt: Date.now(),
      amount: amount || donation.amount || donation.estimatedValue
    };
    
    await donation.save();
    
    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (error) {
    console.error('Error issuing receipt:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
