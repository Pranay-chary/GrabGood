const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingType: {
    type: String,
    required: true,
    enum: ['table', 'room', 'hall', 'order']
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  numberOfPeople: {
    type: Number,
    required: true
  },
  specialRequests: String,
  amount: {
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  payment: {
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    method: {
      type: String,
      enum: ['card', 'upi', 'netbanking', 'cash']
    },
    transactionId: String,
    paidAt: Date
  },
  // Type-specific details
  details: {
    // For restaurants
    table: {
      tableNumber: String,
      menuItems: [{
        name: String,
        quantity: Number,
        price: Number
      }]
    },
    // For hotels
    room: {
      roomType: String,
      numberOfRooms: Number,
      checkIn: Date,
      checkOut: Date,
      guestDetails: [{
        name: String,
        age: Number,
        gender: String
      }]
    },
    // For function halls
    hall: {
      eventType: String,
      setupTime: String,
      cleanupTime: String,
      catering: {
        required: Boolean,
        menuType: String,
        headCount: Number
      }
    },
    // For sweet shops
    order: {
      items: [{
        name: String,
        quantity: Number,
        unit: String,
        price: Number
      }],
      deliveryAddress: {
        street: String,
        city: String,
        state: String,
        pincode: String
      },
      deliveryInstructions: String
    }
  },
  cancellation: {
    cancelledAt: Date,
    reason: String,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['pending', 'processed', 'completed', 'rejected']
    }
  }
}, {
  timestamps: true
});

// Indexes
bookingSchema.index({ business: 1, date: 1 });
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ 'payment.status': 1 });

// Methods
bookingSchema.methods.calculateAmount = function() {
  const subtotal = this.details[this.bookingType]?.items?.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0) || 0;

  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + tax;

  this.amount = {
    subtotal,
    tax,
    total
  };
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
