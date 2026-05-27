const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  admissionFee: {
    type: Number,
    required: true,
    default: 0
  },
  tuitionFee: {
    type: Number,
    required: true,
    default: 0
  },
  annualFee: {
    type: Number,
    required: true,
    default: 0
  },
  totalFee: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate totalFee before saving
feeSchema.pre('save', function() {
  this.totalFee = this.admissionFee + this.tuitionFee + this.annualFee;
});

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;
