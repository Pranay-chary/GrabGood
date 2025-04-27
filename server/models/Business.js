const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['restaurant', 'hotel', 'hall', 'sweetshop'],
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  contact: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    website: String
  },
  images: [{
    url: String,
    caption: String
  }],
  amenities: [{
    type: String
  }],
  timings: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  pricing: {
    currency: {
      type: String,
      default: 'INR'
    },
    priceRange: {
      min: Number,
      max: Number
    },
    averagePrice: Number
  },
  capacity: {
    type: Number,
    required: true
  },
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'suspended'],
    default: 'pending'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessHours: {
    type: Map,
    of: {
      isOpen: Boolean,
      openTime: String,
      closeTime: String
    }
  },
  features: {
    hasParking: Boolean,
    hasWifi: Boolean,
    isVegOnly: Boolean,
    hasAC: Boolean
  },
  settings: {
    booking: {
      allowInstantBooking: {
        type: Boolean,
        default: false
      },
      requireDeposit: {
        type: Boolean,
        default: false
      },
      depositPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      cancellationPeriod: {
        type: Number,
        default: 24
      },
      maxBookingsPerDay: {
        type: Number,
        default: 10
      }
    },
    notifications: {
      emailNotifications: {
        type: Boolean,
        default: true
      },
      smsNotifications: {
        type: Boolean,
        default: false
      },
      bookingConfirmation: {
        type: Boolean,
        default: true
      },
      bookingReminder: {
        type: Boolean,
        default: true
      },
      paymentReminder: {
        type: Boolean,
        default: true
      }
    },
    payment: {
      currency: {
        type: String,
        default: 'INR',
        enum: ['INR', 'USD', 'EUR']
      },
      taxRate: {
        type: Number,
        default: 18,
        min: 0,
        max: 100
      },
      acceptedPaymentMethods: {
        type: [String],
        default: ['card', 'upi', 'netbanking']
      },
      minimumBookingAmount: {
        type: Number,
        default: 1000
      }
    }
  },
  // Type-specific fields
  typeSpecific: {
    // For restaurants
    restaurant: {
      cuisine: [String],
      menuItems: [{
        name: String,
        description: String,
        price: Number,
        category: String,
        isVeg: Boolean,
        isAvailable: Boolean
      }],
      tableConfiguration: [{
        tableNumber: String,
        capacity: Number,
        isReservable: Boolean
      }]
    },
    // For hotels
    hotel: {
      roomTypes: [{
        name: String,
        description: String,
        capacity: Number,
        amenities: [String],
        basePrice: Number,
        quantity: Number
      }],
      checkInTime: String,
      checkOutTime: String,
      policies: [String]
    },
    // For function halls
    hall: {
      eventTypes: [String],
      maxCapacity: Number,
      minBookingHours: Number,
      facilities: [String],
      catering: {
        available: Boolean,
        inHouse: Boolean,
        externalAllowed: Boolean
      }
    },
    // For sweet shops
    sweetshop: {
      specialties: [String],
      categories: [String],
      products: [{
        name: String,
        description: String,
        price: Number,
        unit: String,
        isAvailable: Boolean
      }]
    }
  }
}, {
  timestamps: true
});

// Indexes
businessSchema.index({ name: 'text', 'location.city': 'text' });
businessSchema.index({ type: 1, status: 1 });
businessSchema.index({ 'location.coordinates': '2dsphere' });

// Methods
businessSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
    return;
  }

  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.rating.average = totalRating / this.reviews.length;
  this.rating.count = this.reviews.length;
};

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
