const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orphanage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orphanage'
  },
  type: {
    type: String,
    enum: ['food', 'clothing', 'money', 'supplies', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'completed', 'cancelled', 'rejected'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: function() {
      return this.type === 'money';
    }
  },
  currency: {
    type: String,
    default: 'INR',
    required: function() {
      return this.type === 'money';
    }
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'online', 'upi', 'bank_transfer', 'check'],
    required: function() {
      return this.type === 'money';
    }
  },
  transactionId: {
    type: String,
    required: function() {
      return this.type === 'money' && this.paymentMethod !== 'cash';
    }
  },
  items: [{
    name: {
      type: String,
      required: function() {
        return this.parent().type !== 'money';
      }
    },
    quantity: {
      type: Number,
      required: function() {
        return this.parent().type !== 'money';
      }
    },
    unit: {
      type: String,
      required: function() {
        return this.parent().type !== 'money';
      }
    },
    description: String,
    condition: {
      type: String,
      enum: ['new', 'like_new', 'good', 'fair', 'n/a'],
      default: 'n/a'
    }
  }],
  // Food donation specific fields
  food: {
    type: {
      type: String,
      enum: ['cooked', 'packaged', 'raw_ingredients', 'prepared_meals'],
      required: function() {
        return this.type === 'food';
      }
    },
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'n/a'],
      default: 'n/a'
    },
    preparedAt: {
      type: Date,
      required: function() {
        return this.type === 'food' && this.food.type === 'cooked';
      }
    },
    expiresAt: {
      type: Date,
      required: function() {
        return this.type === 'food';
      }
    },
    containsAllergens: [{
      type: String,
      enum: ['dairy', 'eggs', 'nuts', 'gluten', 'soy', 'fish', 'shellfish', 'other']
    }],
    isVegetarian: {
      type: Boolean,
      default: false
    },
    storageInstructions: String,
    sourceEvent: {
      type: String,
      enum: ['wedding', 'party', 'corporate', 'restaurant', 'home', 'other', 'n/a'],
      default: 'n/a'
    }
  },
  pickupDetails: {
    address: {
      type: String,
      required: function() {
        return !this.deliveryDetails.isDelivery;
      }
    },
    contactName: {
      type: String,
      required: function() {
        return !this.deliveryDetails.isDelivery;
      }
    },
    contactPhone: {
      type: String,
      required: function() {
        return !this.deliveryDetails.isDelivery;
      }
    },
    pickupTime: {
      type: Date,
      required: function() {
        return !this.deliveryDetails.isDelivery;
      }
    },
    instructions: String
  },
  deliveryDetails: {
    isDelivery: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      required: function() {
        return this.isDelivery;
      }
    },
    contactName: {
      type: String,
      required: function() {
        return this.isDelivery;
      }
    },
    contactPhone: {
      type: String,
      required: function() {
        return this.isDelivery;
      }
    },
    deliveryTime: {
      type: Date,
      required: function() {
        return this.isDelivery;
      }
    },
    instructions: String
  },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: String,
  acknowledgementReceipt: {
    issued: {
      type: Boolean,
      default: false
    },
    receiptNumber: String,
    issuedAt: Date,
    amount: Number
  },
  completedAt: Date,
  estimatedValue: Number
}, {
  timestamps: true
});

// Indexes
donationSchema.index({ donor: 1, status: 1 });
donationSchema.index({ orphanage: 1, status: 1 });
donationSchema.index({ type: 1, status: 1 });
donationSchema.index({ createdAt: 1 });
donationSchema.index({ volunteer: 1, status: 1 });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
