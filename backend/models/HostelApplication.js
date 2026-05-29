const mongoose = require('mongoose');

const HostelApplicationSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Please add student ID'],
    trim: true
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
  studentClass: {
    type: String,
    required: [true, 'Please specify class']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please add date of birth']
  },
bloodGroup: {
    type: String,
    required: [true, 'Please add blood group']
  },
aadhaarNumber: {
  type: String,
  required: [true, 'Please add Aadhaar number'],
  unique: true,
  trim: true
},
  fatherName: {
    type: String,
    required: [true, 'Please add father name']
  },
  motherName: {
    type: String,
    required: [true, 'Please add mother name']
  },
  mobileNumber: {
    type: String,
    required: [true, 'Please add mobile number']
  },
  email: {
    type: String,
    required: [true, 'Please add email']
  },
  address: {
    type: String,
    required: [true, 'Please add address']
  },
  hostelType: {
    type: String,
    required: [true, 'Please specify hostel type'],
    enum: ['boys', 'girls']
  },
  roomType: {
    type: String,
    required: [true, 'Please specify room type'],
    enum: ['ac', 'non-ac']
  },
  medicalConditions: String,
  emergencyContact: {
    type: String,
    required: [true, 'Please add emergency contact']
  },
  uploadedDocuments: {
    studentPhoto: String,
    aadhaarCopy: String,
    medicalCertificate: String
  },
  applicationStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
 
  roomNumber: {
  type: String,
  default: null
},
  createdAt: {
    type: Date,
    default: Date.now
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('HostelApplication', HostelApplicationSchema);
