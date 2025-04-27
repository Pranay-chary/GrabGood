const express = require('express');
const {
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  updateBusinessStatus,
  getBusinessStats,
  uploadBusinessImages,
  registerBusiness
} = require('../controllers/businessController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getBusinesses);
router.get('/:id', getBusiness);

// Protected routes
router.use(protect);

// Business registration
router.post('/register', authorize('user'), registerBusiness);

// Business management routes
router.route('/')
  .post(authorize('user', 'admin'), createBusiness);

router.route('/:id')
  .put(authorize('business', 'admin'), updateBusiness)
  .delete(authorize('business', 'admin'), deleteBusiness);

// Business status management (admin only)
router.route('/:id/status')
  .patch(authorize('admin'), updateBusinessStatus);

// Business images
router.route('/:id/images')
  .put(authorize('business', 'admin'), uploadBusinessImages);

// Statistics (admin only)
router.route('/stats')
  .get(authorize('admin'), getBusinessStats);

module.exports = router; 