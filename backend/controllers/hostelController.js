const HostelRoom = require('../models/HostelRoom');
const HostelStudent = require('../models/HostelStudent');
const { getAvailabilityStats, normalizeHostelType, normalizeRoomType } = require('../services/hostelAvailabilityService');

// @desc    Get all hostel rooms
// @route   GET /api/hostel/rooms
// @access  Public
exports.getHostelRooms = async (req, res) => {
  try {
    const { hostelType, roomType, available } = req.query;
    let query = {};

    if (hostelType) {
      const normalized = normalizeHostelType(hostelType);
      query = {
        ...query,
        $expr: { $eq: [{ $toLower: "$hostelType" }, normalized] }
      };
    }
    
    if (roomType) {
      const normalized = normalizeRoomType(roomType);
      query = {
        ...query,
        $expr: { $eq: [{ $toLower: "$roomType" }, normalized] }
      };
    }
    
    if (available === 'true') query.availableBeds = { $gt: 0 };

    const rooms = await HostelRoom.find(query).populate('studentsAssigned', 'studentName studentClass');

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (err) {
    console.error('[HostelController] getHostelRooms error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get hostel availability statistics
// @route   GET /api/hostel/stats
// @access  Public
exports.getHostelStats = async (req, res) => {
  console.log('[HostelController] getHostelStats called');
  try {
    const formattedStats = await getAvailabilityStats();
    
    console.log('[HostelController] Formatted stats:', formattedStats);
    console.log('[Response] Sending response:', { success: true, data: formattedStats });
    res.status(200).json({
      success: true,
      data: formattedStats
    });
  } catch (err) {
    console.error('[HostelController] getHostelStats error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Assign student to a room
// @route   POST /api/hostel/assign
// @access  Private (Admin)
exports.assignStudentToRoom = async (req, res) => {
  try {
    const { studentId, roomId } = req.body;

    const room = await HostelRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }

    if (room.availableBeds <= 0) {
      return res.status(400).json({ success: false, error: 'No beds available in this room' });
    }

    const student = await HostelStudent.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    // Update Room
    room.studentsAssigned.push(studentId);
    room.occupiedBeds += 1;
    await room.save();

    // Update Student
    student.hostelDetails = {
      room: roomId,
      roomNumber: room.roomNumber,
      hostelType: room.hostelType,
      roomType: room.roomType,
      admissionDate: new Date()
    };
    await student.save();

    res.status(200).json({
      success: true,
      message: `Student ${student.studentName} assigned to room ${room.roomNumber}`,
      data: room
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
