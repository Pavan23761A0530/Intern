const mongoose = require('mongoose');

const HostelPaymentSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HostelApplication',
    required: true
  },
  studentName: String,
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  paymentId: {
    type: String,
    sparse: true // Can be null until payment is verified
  },
  signature: String,
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['Created', 'Captured', 'Failed'],
    default: 'Created'
  },
  feeBreakdown: {
    hostelFee: Number,
    admissionFee: Number,
    securityDeposit: Number
  },
  paidAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('HostelPayment', HostelPaymentSchema);
