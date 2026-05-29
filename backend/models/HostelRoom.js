const mongoose = require('mongoose');

const HostelRoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, 'Please add a room number'],
    unique: true,
    trim: true
  },
  hostelType: {
    type: String,
    required: [true, 'Please specify hostel type'],
    enum: ['Boys', 'Girls']
  },
  roomType: {
    type: String,
    required: [true, 'Please specify room type'],
    enum: ['AC', 'Non-AC']
  },
  totalBeds: {
    type: Number,
    default: 4
  },
  occupiedBeds: {
    type: Number,
    default: 0
  },
  availableBeds: {
    type: Number,
    default: 4
  },
  studentsAssigned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HostelStudent'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware to automatically update availableBeds before saving
HostelRoomSchema.pre('save', function(next) {
  this.availableBeds = this.totalBeds - this.occupiedBeds;
  if (typeof next === 'function') {
    next();
  }
});

// Also for updateOne middleware
HostelRoomSchema.pre('updateOne', function(next) {
  const update = this.getUpdate();
  if (update.occupiedBeds !== undefined || update.totalBeds !== undefined) {
    if (update.$set) {
      update.$set.availableBeds = (update.$set.totalBeds || this.get('totalBeds')) - (update.$set.occupiedBeds || this.get('occupiedBeds'));
    }
  }
  if (typeof next === 'function') {
    next();
  }
});

module.exports = mongoose.model('HostelRoom', HostelRoomSchema);
