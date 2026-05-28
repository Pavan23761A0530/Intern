const mongoose = require('mongoose');

const HostelStudentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Please add student ID'],
    unique: true
  },
  studentName: {
    type: String,
    required: [true, 'Please add student name'],
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'Please specify gender'],
    enum: ['Male', 'Female']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please add date of birth']
  },
  studentClass: {
    type: String,
    required: [true, 'Please specify class']
  },
  bloodGroup: String,
  aadhaarNumber: {
    type: String,
    required: [true, 'Please add Aadhaar number'],
    unique: true
  },
  parentDetails: {
    fatherName: String,
    motherName: String,
    mobile: String,
    email: String,
    address: String
  },
  hostelDetails: {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HostelRoom'
    },
    roomNumber: String,
    hostelType: String,
    roomType: String,
    admissionDate: {
      type: Date,
      default: Date.now
    }
  },
  status: {
    type: String,
    enum: ['Active', 'Vacated'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HostelStudent', HostelStudentSchema);
