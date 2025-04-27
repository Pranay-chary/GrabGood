const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'suspended'],
    default: 'pending'
  },
  skills: [{
    type: String,
    enum: ['driving', 'cooking', 'teaching', 'medical', 'counseling', 'logistics', 'technical', 'administrative', 'other']
  }],
  availability: {
    weekdays: {
      type: Boolean,
      default: false
    },
    weekends: {
      type: Boolean,
      default: false
    },
    mornings: {
      type: Boolean,
      default: false
    },
    afternoons: {
      type: Boolean,
      default: false
    },
    evenings: {
      type: Boolean,
      default: false
    },
    specificDays: {
      monday: Boolean,
      tuesday: Boolean,
      wednesday: Boolean,
      thursday: Boolean,
      friday: Boolean,
      saturday: Boolean,
      sunday: Boolean
    },
    specificHours: {
      start: String,
      end: String
    }
  },
  vehicleDetails: {
    hasVehicle: {
      type: Boolean,
      default: false
    },
    vehicleType: {
      type: String,
      enum: ['bike', 'car', 'van', 'truck', 'other']
    },
    licenseNumber: String,
    registrationNumber: String
  },
  verificationDetails: {
    idProofType: {
      type: String,
      enum: ['aadhar', 'pan', 'passport', 'driving_license', 'voter_id', 'other']
    },
    idProofNumber: String,
    idProofImage: String, // URL to the ID proof image
    addressProofType: {
      type: String,
      enum: ['aadhar', 'utility_bill', 'rental_agreement', 'passport', 'other']
    },
    addressProofImage: String, // URL to the address proof image
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedAt: Date
  },
  preferredLocations: [{
    city: String,
    state: String,
    pincode: String,
    radius: Number // in kilometers
  }],
  experience: {
    yearsOfExperience: Number,
    previousOrganizations: [String],
    references: [{
      name: String,
      contactNumber: String,
      email: String,
      relationship: String
    }]
  },
  donationHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }],
  totalCompletedDonations: {
    type: Number,
    default: 0
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
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    orphanage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Orphanage'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  languages: [String],
  bio: String,
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  profileImage: String,
  onboardingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
volunteerSchema.index({ status: 1 });
volunteerSchema.index({ user: 1 }, { unique: true });
volunteerSchema.index({ 'preferredLocations.city': 1, 'preferredLocations.state': 1 });
volunteerSchema.index({ skills: 1 });
volunteerSchema.index({ totalCompletedDonations: 1 });

// Method to update rating
volunteerSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
    return;
  }

  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.rating.average = totalRating / this.reviews.length;
  this.rating.count = this.reviews.length;
};

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
