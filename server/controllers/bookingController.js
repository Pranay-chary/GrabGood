const Booking = require('../models/Booking');
const Business = require('../models/Business');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let query = {};

  // If user is not admin, only show their bookings
  if (req.user.role === 'user') {
    query.user = req.user.id;
  } else if (req.user.role === 'business') {
    const business = await Business.findOne({ owner: req.user.id });
    if (!business) {
      return next(new ErrorResponse('No business found for this user', 404));
    }
    query.business = business._id;
  }

  // Filter by status
  if (req.query.status) {
    query.status = req.query.status;
  }

  // Filter by date range
  if (req.query.startDate && req.query.endDate) {
    query.date = {
      $gte: new Date(req.query.startDate),
      $lte: new Date(req.query.endDate)
    };
  }

  // Filter by business
  if (req.query.business) {
    query.business = req.query.business;
  }

  // Execute query with pagination
  const total = await Booking.countDocuments(query);
  const bookings = await Booking.find(query)
    .populate({
      path: 'business',
      select: 'name type location'
    })
    .populate({
      path: 'user',
      select: 'name email phone'
    })
    .skip(startIndex)
    .limit(limit)
    .sort({ date: -1 });

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: bookings.length,
    pagination,
    total,
    data: bookings
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate({
      path: 'business',
      select: 'name type location'
    })
    .populate({
      path: 'user',
      select: 'name email phone'
    });

  if (!booking) {
    return next(new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is booking owner or business owner
  if (
    booking.user.toString() !== req.user.id &&
    booking.business.owner.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(new ErrorResponse(`Not authorized to access this booking`, 401));
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Check if business exists
  const business = await Business.findById(req.body.business);
  if (!business) {
    return next(new ErrorResponse(`Business not found with id of ${req.body.business}`, 404));
  }

  // Check if business is active
  if (business.status !== 'active') {
    return next(new ErrorResponse(`Business is not currently active`, 400));
  }

  // Check for existing booking conflicts
  const existingBooking = await Booking.findOne({
    business: req.body.business,
    date: req.body.date,
    startTime: req.body.startTime,
    status: { $in: ['pending', 'confirmed'] }
  });

  if (existingBooking) {
    return next(new ErrorResponse(`Booking slot is not available`, 400));
  }

  const booking = await Booking.create(req.body);

  res.status(201).json({
    success: true,
    data: booking
  });
});

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = asyncHandler(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is booking owner or business owner
  if (
    booking.user.toString() !== req.user.id &&
    booking.business.owner.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(new ErrorResponse(`Not authorized to update this booking`, 401));
  }

  // Don't allow status updates through this endpoint
  if (req.body.status) {
    delete req.body.status;
  }

  booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private
exports.updateBookingStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return next(new ErrorResponse('Please provide a status', 400));
  }

  let booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is business owner or admin
  const business = await Business.findById(booking.business);
  if (
    business.owner.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(new ErrorResponse(`Not authorized to update booking status`, 401));
  }

  booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { 
      status,
      statusUpdatedAt: Date.now(),
      statusUpdatedBy: req.user.id
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is booking owner or admin
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to delete this booking`, 401));
  }

  // Check if booking can be deleted (e.g., not too close to booking time)
  const bookingDate = new Date(booking.date);
  const now = new Date();
  const hoursDifference = (bookingDate - now) / (1000 * 60 * 60);

  if (hoursDifference < 24 && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Bookings can only be cancelled at least 24 hours in advance`, 400));
  }

  await booking.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get booking statistics
// @route   GET /api/bookings/stats
// @access  Private/Admin
exports.getBookingStats = asyncHandler(async (req, res, next) => {
  const stats = await Booking.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$amount.total' }
      }
    }
  ]);

  // Get daily bookings for the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const dailyBookings = await Booking.aggregate([
    {
      $match: {
        date: { $gte: thirtyDaysAgo }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        count: { $sum: 1 },
        totalAmount: { $sum: '$amount.total' }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  res.status(200).json({
    success: true,
    data: {
      stats,
      dailyBookings
    }
  });
});
