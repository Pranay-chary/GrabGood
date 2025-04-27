const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  registerBusiness,
  getBusinesses,
  getBusiness,
  updateBusiness,
  deleteBusiness,
  getSettings,
  updateSettings
} = require('../controllers/businessController');
const Business = require('../models/Business');

// Protect all routes
router.use(authMiddleware);

// Settings routes - most specific
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

// Business registration route
router.post('/register', registerBusiness);

// Get businesses by type - specific routes
router.get('/by-type/:type/partner', async (req, res) => {
  try {
    const validTypes = ['restaurant', 'hotel', 'hall', 'sweetshop'];
    const { type } = req.params;
    
    if (!validTypes.includes(type)) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid business type. Must be one of: ${validTypes.join(', ')}` 
      });
    }

    const businesses = await Business.find({
      owner: req.user.id,
      type
    });
    res.json({ success: true, data: businesses });
  } catch (error) {
    console.error(`Error fetching partner's ${req.params.type}s:`, error);
    res.status(500).json({ success: false, message: `Failed to fetch partner's ${req.params.type}s` });
  }
});

router.get('/by-type/:type', async (req, res) => {
  try {
    const validTypes = ['restaurant', 'hotel', 'hall', 'sweetshop'];
    const { type } = req.params;
    
    if (!validTypes.includes(type)) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid business type. Must be one of: ${validTypes.join(', ')}` 
      });
    }

    const businesses = await Business.find({ type });
    res.json({ success: true, data: businesses });
  } catch (error) {
    console.error(`Error fetching ${req.params.type}s:`, error);
    res.status(500).json({ success: false, message: `Failed to fetch ${req.params.type}s` });
  }
});

// Get business features by type
router.get('/:id/features/:type', async (req, res) => {
  try {
    const { id, type } = req.params;
    const business = await Business.findById(id);
    
    if (!business) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }
    
    if (business.type !== type) {
      return res.status(400).json({ success: false, message: 'Invalid business type for this business' });
    }
    
    res.json({ success: true, data: business.features || {} });
  } catch (error) {
    console.error('Error fetching business features:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch business features' });
  }
});

// Get all businesses - less specific
router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find({});
    res.json({ success: true, data: businesses });
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch businesses' });
  }
});

// Generic business routes - least specific
router.get('/:id', getBusiness);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);

module.exports = router;
