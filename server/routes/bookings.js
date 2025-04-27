const express = require('express');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  getBookingStats
} = require('../controllers/bookingController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// Routes accessible by all authenticated users
router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:id')
  .get(getBooking)
  .put(updateBooking)
  .delete(deleteBooking);

router.route('/:id/status')
  .patch(authorize('business', 'admin'), updateBookingStatus);

// Admin only routes
router.route('/stats')
  .get(authorize('admin'), getBookingStats);

module.exports = router;
