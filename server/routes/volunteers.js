const express = require('express');
const router = express.Router();
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const Volunteer = require('../models/Volunteer');
const User = require('../models/User');
const Donation = require('../models/Donation');

// Get all volunteers with pagination and filtering - admin only
router.get('/', authMiddleware, authorizeRoles('admin'), async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      skills,
      city,
      state
    } = req.query;
    
    const query = {};
    
    if (status) query.status = status;
    if (skills) query.skills = { $in: skills.split(',') };
    if (city) query['preferredLocations.city'] = city;
    if (state) query['preferredLocations.state'] = state;
    
    const volunteers = await Volunteer.find(query)
      .populate('user', 'name email phone avatar')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ totalCompletedDonations: -1 });
      
    const count = await Volunteer.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        volunteers,
        totalPages: Math.ceil(count / limit),
        currentPage: page * 1,
        totalVolunteers: count
      }
    });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get volunteer profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ user: req.user.id })
      .populate('user', 'name email phone avatar')
      .populate('donationHistory', 'type status createdAt completedAt');
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: volunteer
    });
  } catch (error) {
    console.error('Error fetching volunteer profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Register as a volunteer
router.post('/register', authMiddleware, async (req, res) => {
  try {
    // Check if user already registered as volunteer
    const existingVolunteer = await Volunteer.findOne({ user: req.user.id });
    
    if (existingVolunteer) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered as a volunteer'
      });
    }
    
    const volunteerData = {
      ...req.body,
      user: req.user.id,
      status: 'pending' // All new volunteers start as pending until verified
    };
    
    const volunteer = await Volunteer.create(volunteerData);
    
    res.status(201).json({
      success: true,
      data: volunteer
    });
  } catch (error) {
    console.error('Error registering volunteer:', error);
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

// Update volunteer profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ user: req.user.id });
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer profile not found'
      });
    }
    
    // Fields that can't be updated directly by the volunteer
    const restrictedFields = ['status', 'verificationDetails.verifiedBy', 'verificationDetails.verifiedAt', 'totalCompletedDonations', 'rating', 'reviews'];
    
    const updateData = { ...req.body };
    
    // Remove restricted fields from update data
    restrictedFields.forEach(field => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (updateData[parent]) {
          delete updateData[parent][child];
        }
      } else {
        delete updateData[field];
      }
    });
    
    const updatedVolunteer = await Volunteer.findOneAndUpdate(
      { user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedVolunteer
    });
  } catch (error) {
    console.error('Error updating volunteer profile:', error);
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

// Verify volunteer - admin only
router.patch('/:id/verify', authMiddleware, authorizeRoles('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    volunteer.status = status;
    volunteer.verificationDetails.verifiedBy = req.user.id;
    volunteer.verificationDetails.verifiedAt = Date.now();
    
    await volunteer.save();
    
    res.status(200).json({
      success: true,
      data: volunteer
    });
  } catch (error) {
    console.error('Error verifying volunteer:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get volunteer by ID - admin only
router.get('/:id', authMiddleware, authorizeRoles('admin'), async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id)
      .populate('user', 'name email phone avatar')
      .populate('donationHistory', 'type status createdAt completedAt');
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: volunteer
    });
  } catch (error) {
    console.error('Error fetching volunteer:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get pending volunteer verifications - admin only
router.get('/pending/verifications', authMiddleware, authorizeRoles('admin'), async (req, res) => {
  try {
    const pendingVolunteers = await Volunteer.find({ status: 'pending' })
      .populate('user', 'name email phone')
      .sort({ createdAt: 1 });
    
    res.status(200).json({
      success: true,
      data: pendingVolunteers
    });
  } catch (error) {
    console.error('Error fetching pending volunteer verifications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Add a review for volunteer
router.post('/:id/reviews', authMiddleware, async (req, res) => {
  try {
    const { rating, comment, donationId } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }
    
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }
    
    // Verify that user has interacted with this volunteer through a donation
    if (donationId) {
      const donation = await Donation.findById(donationId);
      if (!donation || donation.donor.toString() !== req.user.id || donation.volunteer.toString() !== volunteer._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to review this volunteer'
        });
      }
    }
    
    // Add the review
    volunteer.reviews.push({
      donor: req.user.id,
      rating,
      comment,
      date: Date.now()
    });
    
    // Update the overall rating
    volunteer.updateRating();
    
    await volunteer.save();
    
    res.status(201).json({
      success: true,
      data: volunteer.reviews[volunteer.reviews.length - 1]
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get top rated volunteers
router.get('/top-rated', async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    
    const topVolunteers = await Volunteer.find({ 
      status: 'active',
      'rating.count': { $gt: 0 }
    })
      .sort({ 'rating.average': -1, totalCompletedDonations: -1 })
      .limit(limit * 1)
      .populate('user', 'name avatar');
    
    res.status(200).json({
      success: true,
      data: topVolunteers
    });
  } catch (error) {
    console.error('Error fetching top rated volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
