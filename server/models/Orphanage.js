const mongoose = require('mongoose');

const orphanageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add orphanage name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    state: {
      type: String,
      required: [true, 'Please add a state']
    },
    pincode: {
      type: String,
      required: [true, 'Please add a pincode']
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  contact: {
    name: {
      type: String,
      required: [true, 'Please add contact person name']
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    alternatePhone: String
  },
  foundedYear: Number,
  registrationNumber: String,
  registrationCertificate: String, // URL to the certificate file
  numberOfChildren: {
    type: Number,
    required: [true, 'Please specify the number of children']
  },
  ageRange: {
    min: Number,
    max: Number
  },
  images: [{
    url: String,
    caption: String
  }],
  needs: [{
    category: {
      type: String,
      enum: ['food', 'clothing', 'education', 'healthcare', 'recreation', 'infrastructure', 'other'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    quantity: Number,
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    fulfilled: {
      type: Boolean,
      default: false
    }
  }],
  acceptsFoodDonations: {
    type: Boolean,
    default: true
  },
  foodRequirements: {
    vegetarianOnly: {
      type: Boolean,
      default: false
    },
    dietaryRestrictions: [String],
    preferredFoodTypes: [String],
    storageCapacity: String,
    mealsPerDay: Number
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'inactive'],
    default: 'pending'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  donationHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }]
}, {
  timestamps: true
});

// Indexes
orphanageSchema.index({ 'location.city': 1, 'location.state': 1 });
orphanageSchema.index({ 'contact.email': 1 }, { unique: true });
orphanageSchema.index({ name: 'text', 'location.city': 'text', 'location.state': 'text' });
orphanageSchema.index({ status: 1 });
orphanageSchema.index({ 'needs.category': 1, 'needs.urgency': 1 });

const Orphanage = mongoose.model('Orphanage', orphanageSchema);

module.exports = Orphanage;
