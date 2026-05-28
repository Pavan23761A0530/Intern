const HostelApplication = require('../models/HostelApplication');
const HostelRoom = require('../models/HostelRoom');

// @desc    Submit hostel application
// @route   POST /api/hostel-applications
// @access  Public
exports.submitApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    
    // 1. Check bed availability before applying
    const availableRooms = await HostelRoom.find({
      hostelType: applicationData.hostelType,
      roomType: applicationData.roomType,
      availableBeds: { $gt: 0 }
    });

    if (availableRooms.length === 0) {
      return res.status(400).json({
        success: false,
        error: `Currently, no beds are available in the ${applicationData.hostelType} ${applicationData.roomType} category. Please contact the office for waiting list details.`
      });
    }

    const application = await HostelApplication.create(applicationData);

    res.status(201).json({
      success: true,
      message: 'Hostel application submitted successfully',
      data: application
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get all applications
// @route   GET /api/hostel-applications
// @access  Private (Admin)
exports.getApplications = async (req, res) => {
  try {
    const applications = await HostelApplication.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get single application
// @route   GET /api/hostel-applications/:id
// @access  Private (Admin/User)
exports.getApplication = async (req, res) => {
  try {
    const application = await HostelApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    res.status(200).json({ success: true, data: application });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Update application status
// @route   PUT /api/hostel-applications/:id
// @access  Private (Admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationStatus, paymentStatus } = req.body;
    const application = await HostelApplication.findByIdAndUpdate(
      req.params.id,
      { applicationStatus, paymentStatus },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    res.status(200).json({
      success: true,
      message: `Application status updated to ${applicationStatus}`,
      data: application
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Delete application
// @route   DELETE /api/hostel-applications/:id
// @access  Private (Admin)
exports.deleteApplication = async (req, res) => {
  try {
    const application = await HostelApplication.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    res.status(200).json({ success: true, message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
