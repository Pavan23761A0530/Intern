const Application = require('../models/Application');

// Submit new admission application
exports.submitApplication = async (req, res) => {
  try {
    // Generate Unique Student ID (KRR + Year + 4 random digits)
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(1000 + Math.random() * 9000);
    const studentId = `KRR${year}${random}`;

    const applicationData = {
      ...req.body,
      studentId
    };

    const application = await Application.create(applicationData);
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
      studentId: studentId // Explicitly return studentId
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Get all applications (for admin use)
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: application
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
  }
};
