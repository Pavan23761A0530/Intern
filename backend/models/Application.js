const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  // Student Info
  studentName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  aadhaar: { type: String },
  bloodGroup: { type: String },
  nationality: { type: String, default: 'Indian' },
  previousSchool: { type: String },
  classApplying: { type: String, required: true },
  academicYear: { type: String, default: '2025-26' },
  
  // Parent Info
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  occupation: { type: String },
  mobile: { type: String, required: true },
  altMobile: { type: String },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String },
  state: { type: String, default: 'Andhra Pradesh' },
  pincode: { type: String },
  
  // // Emergency
  // emergencyName: { type: String },
  // emergencyPhone: { type: String },
  // relationship: { type: String },
  
  // // Medical
  // medicalConditions: { type: String },
  // allergies: { type: String },
  // specialNeeds: { type: String },
  // doctorName: { type: String },
  
  // Documents (Filenames/Paths)
  documents: {
    photo: { type: String },
    birthCert: { type: String },
    aadhaarCopy: { type: String },
    reportCard: { type: String },
    tc: { type: String },
    parentId: { type: String }
  },
  
  // Payment & Fees
  fees: {
    admission: { type: Number },
    tuition: { type: Number },
    annual: { type: Number },
    total: { type: Number }
  },
  paymentMethod: { type: String },
  paymentStatus: { type: String, default: 'Pending' },
  
  // System Fields
  applicationStatus: { 
    type: String, 
    enum: ['Submitted', 'Reviewing', 'Interaction Scheduled', 'Accepted', 'Rejected'],
    default: 'Submitted' 
  }
}, {
  timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
