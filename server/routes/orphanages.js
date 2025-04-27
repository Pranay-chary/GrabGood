const express = require('express');
const router = express.Router();
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const Orphanage = require('../models/Orphanage');
const User = require('../models/User');
const Donation = require('../models/Donation');

// Get all orphanages with optional filtering
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      city, 
      state, 
      status = 'active',
      acceptsFoodDonations,
      needsCategory,
      search
    } = req.query;
    
    const query = { status };
    
    if (city) query['location.city'] = city;
    if (state) query['location.state'] = state;
    if (acceptsFoodDonations === 'true') query.acceptsFoodDonations = true;
    if (needsCategory) query['needs.category'] = needsCategory;
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.state': { $regex: search, $options: 'i' } }
      ];
    }
    
    const orphanages = await Orphanage.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ name: 1 });
      
    const count = await Orphanage.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        orphanages,
        totalPages: Math.ceil(count / limit),
        currentPage: page * 1,
        totalOrphanages: count
      }
    });
  } catch (error) {
    console.error('Error fetching orphanages:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get orphanage by ID
router.get('/:id', async (req, res) => {
  try {
    const orphanage = await Orphanage.findById(req.params.id);
    
    if (!orphanage) {
      return res.status(404).json({
        success: false,
        message: 'Orphanage not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: orphanage
    });
  } catch (error) {
    console.error('Error fetching orphanage:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Register a new orphanage - requires authentication
router.post('/', authMiddleware, async (req, res) => {
  try {
    const orphanageData = req.body;
    
    // Create new orphanage
    const orphanage = await Orphanage.create(orphanageData);
    
    res.status(201).json({
      success: true,
      data: orphanage
    });
  } catch (error) {
    console.error('Error creating orphanage:', error);
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

// Update orphanage - requires authentication
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const orphanage = await Orphanage.findById(req.params.id);
    
    if (!orphanage) {
      return res.status(404).json({
        success: false,
        message: 'Orphanage not found'
      });
    }
    
    // Only admin can update any orphanage
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this orphanage'
      });
    }
    
    const updatedOrphanage = await Orphanage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedOrphanage
    });
  } catch (error) {
    console.error('Error updating orphanage:', error);
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

// Verify orphanage - admin only
router.patch('/:id/verify', authMiddleware, authorizeRoles('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['active', 'inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const orphanage = await Orphanage.findById(req.params.id);
    
    if (!orphanage) {
      return res.status(404).json({
        success: false,
        message: 'Orphanage not found'
      });
    }
    
    orphanage.status = status;
    orphanage.verifiedBy = req.user.id;
    orphanage.verifiedAt = Date.now();
    
    await orphanage.save();
    
    res.status(200).json({
      success: true,
      data: orphanage
    });
  } catch (error) {
    console.error('Error verifying orphanage:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Add a need to an orphanage
router.post('/:id/needs', authMiddleware, async (req, res) => {
  try {
    const orphanage = await Orphanage.findById(req.params.id);
    
    if (!orphanage) {
      return res.status(404).json({
        success: false,
        message: 'Orphanage not found'
      });
    }
    
    // Only admin can add needs
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add needs'
      });
    }
    
    orphanage.needs.push(req.body);
    await orphanage.save();
    
    res.status(201).json({
      success: true,
      data: orphanage.needs[orphanage.needs.length - 1]
    });
  } catch (error) {
    console.error('Error adding need:', error);
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

// Get donation history for an orphanage
router.get('/:id/donations', authMiddleware, async (req, res) => {
  try {
    const orphanage = await Orphanage.findById(req.params.id);
    
    if (!orphanage) {
      return res.status(404).json({
        success: false,
        message: 'Orphanage not found'
      });
    }
    
    const donations = await Donation.find({ orphanage: req.params.id })
      .populate('donor', 'name email')
      .populate('volunteer', 'name')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: donations
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

// Get orphanages with urgent needs
router.get('/urgent-needs', async (req, res) => {
  try {
    const orphanages = await Orphanage.find({
      status: 'active',
      'needs.urgency': 'high',
      'needs.fulfilled': false
    }).limit(10);
    
    res.status(200).json({
      success: true,
      data: orphanages
    });
  } catch (error) {
    console.error('Error fetching orphanages with urgent needs:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
