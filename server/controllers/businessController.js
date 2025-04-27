const Business = require('../models/Business');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register a new business
// @route   POST /api/businesses/register
// @access  Private
exports.registerBusiness = async (req, res) => {
  try {
    const { type, name } = req.body;

    if (!type || !name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide business type and name'
      });
    }

    // Validate business type
    const validTypes = ['restaurant', 'hotel', 'hall', 'sweetshop'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid business type. Must be one of: ${validTypes.join(', ')}`
      });
    }

    // Create new business
    const business = await Business.create({
      owner: req.user.id,
      type,
      name,
      address: req.body.address,
      city: req.body.city,
      pincode: req.body.pincode,
      gstin: req.body.gstin,
      fssaiLicense: req.body.fssaiLicense,
      contactPhone: req.body.contactPhone,
      contactEmail: req.body.contactEmail,
      description: req.body.description,
      openTime: req.body.openTime,
      closeTime: req.body.closeTime,
      hasDelivery: req.body.hasDelivery || false,
      hasTakeout: req.body.hasTakeout || false,
      
      // Restaurant specific fields
      cuisine: req.body.cuisine,
      seatingCapacity: req.body.seatingCapacity,
      averageCost: req.body.averageCost,
      
      // Hotel specific fields
      roomCount: req.body.roomCount,
      amenities: req.body.amenities,
      checkInTime: req.body.checkInTime,
      checkOutTime: req.body.checkOutTime,
      
      // Function Hall specific fields
      hallCapacity: req.body.hallCapacity,
      eventTypes: req.body.eventTypes,
      hasParking: req.body.hasParking || false,
      hasCatering: req.body.hasCatering || false,
      
      // Sweet Shop specific fields
      specialties: req.body.specialties,
      hasCustomOrders: req.body.hasCustomOrders || false,
      minOrderValue: req.body.minOrderValue,
      
      isActive: true
    });

    res.status(201).json({
      success: true,
      data: business,
      message: 'Business registered successfully'
    });
  } catch (error) {
    console.error('Register business error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while registering business',
      error: error.message
    });
  }
};

// @desc    Get all businesses
// @route   GET /api/businesses
// @access  Public
exports.getBusinesses = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const query = {};

  // Filter by type
  if (req.query.type) {
    query.type = req.query.type;
  }

  // Filter by status
  if (req.query.status) {
    query.status = req.query.status;
  }

  // Filter by location
  if (req.query.city) {
    query['location.city'] = new RegExp(req.query.city, 'i');
  }

  // Search by name or description
  if (req.query.search) {
    query.$or = [
      { name: new RegExp(req.query.search, 'i') },
      { description: new RegExp(req.query.search, 'i') }
    ];
  }

  // Execute query with pagination
  const total = await Business.countDocuments(query);
  const businesses = await Business.find(query)
    .skip(startIndex)
    .limit(limit)
    .sort({ createdAt: -1 });

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
    count: businesses.length,
    pagination,
    total,
    data: businesses
  });
});

// @desc    Get single business
// @route   GET /api/businesses/:id
// @access  Public
exports.getBusiness = asyncHandler(async (req, res, next) => {
  const business = await Business.findById(req.params.id);

  if (!business) {
    return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: business
  });
});

// @desc    Create new business
// @route   POST /api/businesses
// @access  Private
exports.createBusiness = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.owner = req.user.id;

  // Check for existing business
  const existingBusiness = await Business.findOne({ owner: req.user.id });

  // If the user is not an admin, they can only create one business
  if (existingBusiness && req.user.role !== 'admin') {
    return next(new ErrorResponse(`The user with ID ${req.user.id} has already created a business`, 400));
  }

  const business = await Business.create(req.body);

  res.status(201).json({
    success: true,
    data: business
  });
});

// @desc    Update business
// @route   PUT /api/businesses/:id
// @access  Private
exports.updateBusiness = asyncHandler(async (req, res, next) => {
  let business = await Business.findById(req.params.id);

  if (!business) {
    return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is business owner
  if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this business`, 401));
  }

  business = await Business.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: business
  });
});

// @desc    Delete business
// @route   DELETE /api/businesses/:id
// @access  Private
exports.deleteBusiness = asyncHandler(async (req, res, next) => {
  const business = await Business.findById(req.params.id);

  if (!business) {
    return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is business owner
  if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this business`, 401));
  }

  await business.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Update business status
// @route   PATCH /api/businesses/:id/status
// @access  Private/Admin
exports.updateBusinessStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return next(new ErrorResponse('Please provide a status', 400));
  }

  const business = await Business.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
      runValidators: true
    }
  );

  if (!business) {
    return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: business
  });
});

// @desc    Get business statistics
// @route   GET /api/businesses/stats
// @access  Private/Admin
exports.getBusinessStats = asyncHandler(async (req, res, next) => {
  const stats = await Business.aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        averageRating: { $avg: '$rating.average' },
        totalActive: {
          $sum: {
            $cond: [{ $eq: ['$status', 'active'] }, 1, 0]
          }
        }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: stats
  });
});

// @desc    Upload business images
// @route   PUT /api/businesses/:id/images
// @access  Private
exports.uploadBusinessImages = asyncHandler(async (req, res, next) => {
  const business = await Business.findById(req.params.id);

  if (!business) {
    return next(new ErrorResponse(`Business not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is business owner
  if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this business`, 401));
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const files = req.files.map(file => ({
    url: `/uploads/${file.filename}`,
    caption: file.originalname
  }));

  business.images.push(...files);
  await business.save();

  res.status(200).json({
    success: true,
    data: business
  });
});

// @desc    Get settings
// @route   GET /api/businesses/settings
// @access  Private
exports.getSettings = asyncHandler(async (req, res, next) => {
  try {
    // Get settings for the current user's business
    const business = await Business.findOne({ owner: req.user.id });

    if (!business) {
      return res.status(200).json({
        success: true,
        data: null // Return null if no business exists yet
      });
    }

    const settings = {
      general: {
        siteName: business.name || '',
        contactEmail: business.contactEmail || '',
        contactPhone: business.contactPhone || '',
        address: business.address || ''
      },
      booking: {
        allowInstantBooking: business.settings?.booking?.allowInstantBooking || false,
        requireDeposit: business.settings?.booking?.requireDeposit || false,
        depositPercentage: business.settings?.booking?.depositPercentage || 0,
        cancellationPeriod: business.settings?.booking?.cancellationPeriod || 24,
        maxBookingsPerDay: business.settings?.booking?.maxBookingsPerDay || 10
      },
      notifications: {
        emailNotifications: business.settings?.notifications?.emailNotifications || true,
        smsNotifications: business.settings?.notifications?.smsNotifications || false,
        bookingConfirmation: business.settings?.notifications?.bookingConfirmation || true,
        bookingReminder: business.settings?.notifications?.bookingReminder || true,
        paymentReminder: business.settings?.notifications?.paymentReminder || true
      },
      payment: {
        currency: business.settings?.payment?.currency || 'INR',
        taxRate: business.settings?.payment?.taxRate || 18,
        acceptedPaymentMethods: business.settings?.payment?.acceptedPaymentMethods || ['card', 'upi', 'netbanking'],
        minimumBookingAmount: business.settings?.payment?.minimumBookingAmount || 1000
      }
    };

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(new ErrorResponse('Error fetching settings', 500));
  }
});

// @desc    Update settings
// @route   PUT /api/businesses/settings
// @access  Private
exports.updateSettings = asyncHandler(async (req, res, next) => {
  try {
    const { general, booking, notifications, payment } = req.body;

    // Get the user's business
    let business = await Business.findOne({ owner: req.user.id });

    if (!business) {
      return next(new ErrorResponse('No business found for this user', 404));
    }

    // Update business general info
    if (general) {
      business.name = general.siteName || business.name;
      business.contactEmail = general.contactEmail || business.contactEmail;
      business.contactPhone = general.contactPhone || business.contactPhone;
      business.address = general.address || business.address;
    }

    // Update business settings
    business.settings = {
      booking: {
        ...business.settings?.booking,
        ...booking
      },
      notifications: {
        ...business.settings?.notifications,
        ...notifications
      },
      payment: {
        ...business.settings?.payment,
        ...payment
      }
    };

    await business.save();

    res.status(200).json({
      success: true,
      data: business.settings
    });
  } catch (error) {
    next(new ErrorResponse('Error updating settings', 500));
  }
});
