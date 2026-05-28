const HostelRoom = require('../models/HostelRoom');
const HostelStudent = require('../models/HostelStudent');

// @desc    Get all hostel rooms
// @route   GET /api/hostel/rooms
// @access  Public
exports.getHostelRooms = async (req, res) => {
  try {
    const { hostelType, roomType, available } = req.query;
    let query = {};

    if (hostelType) query.hostelType = hostelType;
    if (roomType) query.roomType = roomType;
    if (available === 'true') query.availableBeds = { $gt: 0 };

    const rooms = await HostelRoom.find(query).populate('studentsAssigned', 'studentName studentClass');

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get hostel availability statistics
// @route   GET /api/hostel/stats
// @access  Public
exports.getHostelStats = async (req, res) => {
  try {
    const stats = await HostelRoom.aggregate([
      {
        $group: {
          _id: { hostelType: "$hostelType", roomType: "$roomType" },
          totalBeds: { $sum: "$totalBeds" },
          occupiedBeds: { $sum: "$occupiedBeds" },
          availableBeds: { $sum: "$availableBeds" },
          roomCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          hostelType: "$_id.hostelType",
          roomType: "$_id.roomType",
          totalBeds: 1,
          occupiedBeds: 1,
          availableBeds: 1,
          roomCount: 1
        }
      }
    ]);

    // Format stats for easier frontend consumption
    const formattedStats = {
      Boys: { AC: {}, NonAC: {} },
      Girls: { AC: {}, NonAC: {} }
    };

    stats.forEach(stat => {
      const type = stat.roomType === 'AC' ? 'AC' : 'NonAC';
      formattedStats[stat.hostelType][type] = {
        total: stat.totalBeds,
        occupied: stat.occupiedBeds,
        available: stat.availableBeds,
        rooms: stat.roomCount
      };
    });

    res.status(200).json({
      success: true,
      data: formattedStats
    });
  } catch (err) {
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
