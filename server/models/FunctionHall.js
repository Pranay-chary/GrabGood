const mongoose = require('mongoose');

const functionHallSchema = new mongoose.Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  },
  // Basic Info
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  gstin: {
    type: String,
    trim: true
  },
  yearEstablished: {
    type: Number
  },
  openingTime: {
    type: String,
    trim: true
  },
  closingTime: {
    type: String,
    trim: true
  },
  specialties: {
    type: String,
    trim: true
  },
  uniqueFeatures: {
    type: String,
    trim: true
  },
  
  // Venues
  venues: [{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    capacity: {
      type: Number
    },
    size: {
      type: Number
    },
    sizeUnit: {
      type: String,
      enum: ['sqft', 'sqm'],
      default: 'sqft'
    },
    amenities: [String],
    isAC: {
      type: Boolean,
      default: false
    },
    isOutdoor: {
      type: Boolean,
      default: false
    }
  }],
  
  // Pricing
  pricing: {
    basicPackages: [{
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      price: {
        type: Number,
        required: true
      },
      guests: {
        type: Number
      },
      amenities: [String],
      isPopular: {
        type: Boolean,
        default: false
      }
    }],
    additionalServices: [{
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      price: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        enum: ['decoration', 'catering', 'entertainment', 'photography', 'lighting', 'other'],
        default: 'other'
      }
    }]
  },
  
  // Availability (stored as a nested object with dates as keys)
  availability: {
    type: Map,
    of: Map
  },
  
  // Photos
  photos: [{
    id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    category: {
      type: String,
      enum: ['hall', 'exterior', 'decor', 'setup', 'events', 'amenities', 'other'],
      default: 'other'
    }
  }],
  
  // Metadata
  isActive: {
    type: Boolean,
    default: true
  },
  avgRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
functionHallSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const FunctionHall = mongoose.model('FunctionHall', functionHallSchema);

module.exports = FunctionHall; 