const Fee = require('../models/Fee');

// Get all fees
exports.getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      count: fees.length,
      data: fees
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create or update fee for a class
exports.upsertFee = async (req, res) => {
  try {
    const { className, admissionFee, tuitionFee, annualFee } = req.body;

    let fee = await Fee.findOne({ className });

    if (fee) {
      // Update existing
      fee.admissionFee = admissionFee || fee.admissionFee;
      fee.tuitionFee = tuitionFee || fee.tuitionFee;
      fee.annualFee = annualFee || fee.annualFee;
      await fee.save();
      
      return res.status(200).json({
        success: true,
        data: fee
      });
    }

    // Create new
    fee = await Fee.create({
      className,
      admissionFee,
      tuitionFee,
      annualFee
    });

    res.status(201).json({
      success: true,
      data: fee
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Seed initial fee data
exports.seedFees = async (req, res) => {
  try {
    const initialFees = [
      { className: 'LKG', admissionFee: 5000, tuitionFee: 12000, annualFee: 3000 },
      { className: 'UKG', admissionFee: 5000, tuitionFee: 12000, annualFee: 3000 },
      { className: 'Grade 1', admissionFee: 7000, tuitionFee: 15000, annualFee: 4000 },
      { className: 'Grade 2', admissionFee: 7000, tuitionFee: 15000, annualFee: 4000 },
      { className: 'Grade 3', admissionFee: 7000, tuitionFee: 15000, annualFee: 4000 },
      { className: 'Grade 4', admissionFee: 7000, tuitionFee: 18000, annualFee: 5000 },
      { className: 'Grade 5', admissionFee: 7000, tuitionFee: 18000, annualFee: 5000 },
      { className: 'Grade 6', admissionFee: 10000, tuitionFee: 22000, annualFee: 6000 },
      { className: 'Grade 7', admissionFee: 10000, tuitionFee: 22000, annualFee: 6000 },
      { className: 'Grade 8', admissionFee: 10000, tuitionFee: 22000, annualFee: 6000 },
      { className: 'Grade 9', admissionFee: 12000, tuitionFee: 25000, annualFee: 8000 },
      { className: 'Grade 10', admissionFee: 12000, tuitionFee: 25000, annualFee: 8000 }
    ];

    // Clear existing fees before seeding to avoid duplicates
    await Fee.deleteMany();
    
    const fees = await Fee.create(initialFees);

    res.status(201).json({
      success: true,
      message: 'Database seeded successfully',
      count: fees.length,
      data: fees
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
