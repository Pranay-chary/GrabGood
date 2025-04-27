const User = require('../models/User');
const Business = require('../models/Business');
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Booking = require('../models/Booking');
const Donation = require('../models/Donation');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user'
  });

  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  try {
    console.log('Login request received:', {
      body: req.body,
      headers: req.headers
    });

    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      console.log('Missing credentials:', { email: !!email, password: !!password });
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    // Check for user and explicitly select password
    const user = await User.findOne({ email }).select('+password');
    console.log('User lookup result:', { found: !!user, email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Your account is not active. Please contact support.'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    console.log('Password match result:', { isMatch, email });

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = user.getSignedJwtToken();
    console.log('Token generated successfully for user:', user._id);

    const options = {
      expires: new Date(
        Date.now() + (process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax'
    };

    // Remove password from output
    user.password = undefined;

    // Send response
    res
      .status(200)
      .cookie('token', token, options)
      .json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
  } catch (error) {
    console.error('Login error:', {
      error: error.message,
      stack: error.stack,
      body: req.body
    });
    
    res.status(500).json({
      success: false,
      message: 'Error logging in. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/auth/resetpassword/${resetToken}`;

  // TODO: Send email with reset URL

  res.status(200).json({
    success: true,
    data: 'Email sent'
  });
});

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Get dashboard data for partner
// @route   GET /api/auth/dashboard
// @access  Private
exports.getDashboard = async (req, res) => {
  try {
    // Fetch businesses for the partner
    const businesses = await Business.find({ partnerId: req.user.id });
    
    // For now, return mock data with businesses
    res.status(200).json({
      success: true,
      stats: {
        totalDonations: 12,
        totalBookings: 45,
        pendingBookings: 5,
        impactScore: 87
      },
      businesses: businesses,
      recentDonations: [
        {
          id: '1',
          foodType: 'Cooked Food',
          quantity: 5.2,
          servings: 25,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          foodType: 'Vegetables',
          quantity: 10,
          servings: 40,
          createdAt: new Date(Date.now() - 86400000).toISOString() // yesterday
        },
        {
          id: '3',
          foodType: 'Fruits',
          quantity: 8,
          servings: 35,
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
        }
      ],
      recentBookings: [
        {
          id: '1',
          customerName: 'John Doe',
          service: 'Hall Booking',
          guests: 100,
          bookingDate: new Date().toISOString()
        },
        {
          id: '2',
          customerName: 'Jane Smith',
          service: 'Catering',
          guests: 50,
          bookingDate: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          customerName: 'Robert Johnson',
          service: 'Party Hall',
          guests: 150,
          bookingDate: new Date(Date.now() - 86400000 * 3).toISOString()
        }
      ]
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data',
      error: error.message
    });
  }
};

// @desc    Get analytics data for partner
// @route   GET /api/auth/analytics
// @access  Private
exports.getAnalytics = async (req, res) => {
  try {
    // Support both parameter names for backwards compatibility
    const timeframe = req.query.timeframe || req.query.period || 'month';
    console.log(`Fetching analytics for timeframe: ${timeframe}`);
    
    // Get date range based on timeframe
    const endDate = new Date();
    let startDate = new Date();
    
    if (timeframe === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (timeframe === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (timeframe === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else {
      // Default to month if invalid timeframe
      startDate.setMonth(startDate.getMonth() - 1);
    }

    // Get the partner's businesses
    const businesses = await Business.find({ partnerId: req.user.id });
    
    // Get bookings and donations data
    const bookings = await Booking.find({
      businessId: { $in: businesses.map(b => b._id) },
      createdAt: { $gte: startDate, $lte: endDate }
    });
    
    const donations = await Donation.find({
      businessId: { $in: businesses.map(b => b._id) },
      createdAt: { $gte: startDate, $lte: endDate }
    });

    // Calculate summary metrics
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const totalBookings = bookings.length;
    const totalDonations = donations.length;
    const impactScore = Math.min(100, Math.round((totalDonations * 3 + totalBookings) / 10));

    // Generate trend data
    const revenueTrend = generateTrendData(bookings, timeframe, 'totalAmount');
    const bookingsByCategory = generateCategoryData(bookings, 'serviceType');
    const customerSatisfaction = generateTrendData(bookings, timeframe, 'rating');

    // Generate summary cards data
    const summary = [
      {
        label: 'Total Revenue',
        value: `₹${totalRevenue.toLocaleString()}`,
        trend: calculateTrend(bookings, 'totalAmount', timeframe),
        icon: '₹'
      },
      {
        label: 'Total Bookings',
        value: totalBookings,
        trend: calculateTrend(bookings, 'count', timeframe),
        icon: '📅'
      },
      {
        label: 'Total Donations',
        value: totalDonations,
        trend: calculateTrend(donations, 'count', timeframe),
        icon: '🎁'
      },
      {
        label: 'Impact Score',
        value: impactScore,
        trend: 0, // Impact score trend not implemented yet
        icon: '⭐'
      }
    ];

    res.status(200).json({
      success: true,
      summary,
      revenueTrend,
      bookingsByCategory,
      customerSatisfaction,
      timeframe,
      startDate,
      endDate
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching analytics data',
      error: error.message
    });
  }
};

// Helper function to generate trend data
const generateTrendData = (data, timeframe, field) => {
  const result = [];
  const now = new Date();
  let intervals;
  let format;

  switch (timeframe) {
    case 'week':
      intervals = 7;
      format = 'ddd'; // Mon, Tue, etc.
      break;
    case 'month':
      intervals = 4;
      format = 'Week W'; // Week 1, Week 2, etc.
      break;
    case 'year':
      intervals = 12;
      format = 'MMM'; // Jan, Feb, etc.
      break;
    default:
      intervals = 7;
      format = 'ddd';
  }

  for (let i = intervals - 1; i >= 0; i--) {
    const date = new Date(now);
    switch (timeframe) {
      case 'week':
        date.setDate(date.getDate() - i);
        break;
      case 'month':
        date.setDate(date.getDate() - (i * 7));
        break;
      case 'year':
        date.setMonth(date.getMonth() - i);
        break;
    }

    const periodData = data.filter(item => {
      const itemDate = new Date(item.createdAt);
      return isSamePeriod(itemDate, date, timeframe);
    });

    if (field === 'count') {
      result.push({
        date: formatDate(date, format),
        value: periodData.length
      });
    } else {
      result.push({
        date: formatDate(date, format),
        value: periodData.reduce((sum, item) => sum + (item[field] || 0), 0)
      });
    }
  }

  return result;
};

// Helper function to generate category data
const generateCategoryData = (data, categoryField) => {
  const categories = {};
  data.forEach(item => {
    const category = item[categoryField] || 'Other';
    categories[category] = (categories[category] || 0) + 1;
  });

  return Object.entries(categories).map(([category, count]) => ({
    category,
    bookings: count
  }));
};

// Helper function to calculate trend percentage
const calculateTrend = (data, field, timeframe) => {
  const now = new Date();
  const midPoint = new Date(now);
  
  switch (timeframe) {
    case 'week':
      midPoint.setDate(midPoint.getDate() - 3);
      break;
    case 'month':
      midPoint.setDate(midPoint.getDate() - 15);
      break;
    case 'year':
      midPoint.setMonth(midPoint.getMonth() - 6);
      break;
  }

  const recentData = data.filter(item => new Date(item.createdAt) >= midPoint);
  const olderData = data.filter(item => new Date(item.createdAt) < midPoint);

  let recentValue, olderValue;

  if (field === 'count') {
    recentValue = recentData.length;
    olderValue = olderData.length;
  } else {
    recentValue = recentData.reduce((sum, item) => sum + (item[field] || 0), 0);
    olderValue = olderData.reduce((sum, item) => sum + (item[field] || 0), 0);
  }

  if (olderValue === 0) return recentValue > 0 ? 100 : 0;
  return Math.round(((recentValue - olderValue) / olderValue) * 100);
};

// Helper function to check if two dates are in the same period
const isSamePeriod = (date1, date2, timeframe) => {
  switch (timeframe) {
    case 'week':
      return date1.toDateString() === date2.toDateString();
    case 'month':
      const weekStart1 = new Date(date1.setDate(date1.getDate() - date1.getDay()));
      const weekStart2 = new Date(date2.setDate(date2.getDate() - date2.getDay()));
      return weekStart1.toDateString() === weekStart2.toDateString();
    case 'year':
      return date1.getMonth() === date2.getMonth() && 
             date1.getFullYear() === date2.getFullYear();
    default:
      return false;
  }
};

// Helper function to format dates
const formatDate = (date, format) => {
  switch (format) {
    case 'ddd':
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    case 'Week W':
      return `Week ${Math.ceil(date.getDate() / 7)}`;
    case 'MMM':
      return date.toLocaleDateString('en-US', { month: 'short' });
    default:
      return date.toLocaleDateString();
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  try {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax'
    };

    console.log('Sending token response with options:', {
      statusCode,
      cookieExpires: options.expires,
      secure: options.secure
    });

    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
  } catch (error) {
    console.error('Error in sendTokenResponse:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating authentication token'
    });
  }
};
