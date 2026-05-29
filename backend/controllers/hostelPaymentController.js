const Razorpay = require('razorpay');
const crypto = require('crypto');
const PDFDocument = require('pdfkit');
const mongoose = require('mongoose');

const HostelPayment = require('../models/HostelPayment');
const HostelApplication = require('../models/HostelApplication');
const HostelRoom = require('../models/HostelRoom');
const HostelStudent = require('../models/HostelStudent');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ======================================================
// CREATE HOSTEL ORDER
// ======================================================

exports.createHostelOrder = async (req, res) => {
  console.log('[HostelPayment] createHostelOrder called');
  try {
    const { applicationId } = req.body;
    console.log('[HostelPayment] Application ID:', applicationId);

    if (!applicationId) {
      return res.status(400).json({
        success: false,
        error: 'Application ID is required'
      });
    }

    const application = await HostelApplication.findById(applicationId);
    console.log('[HostelPayment] Found application:', application);

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }

    if (application.paymentStatus === 'Completed') {
      return res.status(400).json({
        success: false,
        error: 'Payment already completed'
      });
    }

    // ===============================
    // FEES
    // ===============================

    const admissionFee = 5000;
    const securityDeposit = 10000;
    const hostelFee =
      application.roomType === 'AC'
        ? 75000
        : 55000;

    const totalAmount =
      hostelFee +
      admissionFee +
      securityDeposit;
    console.log('[HostelPayment] Total amount:', totalAmount);

    // ===============================
    // CREATE ORDER
    // ===============================

    const options = {
      amount: totalAmount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    console.log('[HostelPayment] Razorpay order created:', order.id);

    // ===============================
    // SAVE PAYMENT
    // ===============================

    await HostelPayment.create({
      applicationId: application._id,
      studentName: application.studentName,
      orderId: order.id,
      amount: totalAmount,
      feeBreakdown: {
        hostelFee,
        admissionFee,
        securityDeposit
      }
    });

    console.log('[HostelPayment] Payment saved');
    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error('[HostelPayment] createHostelOrder error:', err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ======================================================
// VERIFY HOSTEL PAYMENT
// ======================================================

exports.verifyHostelPayment = async (req, res) => {
  console.log('[HostelPayment] verifyHostelPayment called');
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;
    console.log('[HostelPayment] Payment details:', { razorpay_order_id, razorpay_payment_id });

    // ===============================
    // VALIDATION
    // ===============================

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        error: 'Missing payment credentials'
      });
    }

    // ===============================
    // VERIFY SIGNATURE
    // ===============================

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        error: 'Invalid payment signature'
      });
    }

    // ===============================
    // FIND PAYMENT
    // ===============================

    const payment = await HostelPayment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: 'Captured',
        paidAt: new Date()
      },
      { new: true, session }
    );

    if (!payment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        error: 'Payment record not found'
      });
    }

    // ===============================
    // UPDATE APPLICATION
    // ===============================

    const application = await HostelApplication.findByIdAndUpdate(
      payment.applicationId,
      {
        paymentStatus: 'Completed',
        applicationStatus: 'Approved'
      },
      { new: true, session }
    );

    if (!application) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }

    // ===============================
    // CHECK DUPLICATE STUDENT
    // ===============================

    const existingStudent = await HostelStudent.findOne({
      studentId: application.studentId
    }).session(session);

    let allocatedRoom = 'Pending';

    if (existingStudent) {
      allocatedRoom = existingStudent.hostelDetails.roomNumber;
    } else {
      // ===============================
      // FIND ROOM
      // ===============================

      const room = await HostelRoom.findOne({
        hostelType: application.hostelType,
        roomType: application.roomType,
        availableBeds: { $gt: 0 }
      }).session(session);

      if (room) {
        allocatedRoom = room.roomNumber;

        // Update room number on application
        application.roomNumber = room.roomNumber;
        await application.save({ session });

        // ===============================
        // ROOM ALLOCATION
        // ===============================

        const student = await HostelStudent.create([{
          studentId: application.studentId,
          studentName: application.studentName,
          gender: application.gender,
          dateOfBirth: application.dateOfBirth,
          studentClass: application.studentClass,
          bloodGroup: application.bloodGroup,
          aadhaarNumber: application.aadhaarNumber,
          parentDetails: {
            fatherName: application.fatherName,
            motherName: application.motherName,
            mobile: application.mobileNumber,
            email: application.email,
            address: application.address
          },
          hostelDetails: {
            room: room._id,
            roomNumber: room.roomNumber,
            hostelType: room.hostelType,
            roomType: room.roomType,
            admissionDate: new Date()
          }
        }], { session });

        // UPDATE ROOM
        room.studentsAssigned.push(student[0]._id);
        room.occupiedBeds += 1;
        room.availableBeds = room.totalBeds - room.occupiedBeds;
        await room.save({ session });
      }
    }

    await session.commitTransaction();
    session.endSession();

    // ===============================
    // EMIT SOCKET EVENT FOR REAL-TIME UPDATE
    // ===============================
    const io = req.app.get('io');
    if (io) {
      // Get updated hostel stats
      const hostelStats = await HostelRoom.aggregate([
        {
          $group: {
            _id: { hostelType: "$hostelType", roomType: "$roomType" },
            totalBeds: { $sum: "$totalBeds" },
            occupiedBeds: { $sum: "$occupiedBeds" },
            availableBeds: { $sum: "$availableBeds" },
            roomCount: { $sum: 1 }
          }
        }
      ]);

      const formattedHostelStats = {
        boys: { ac: 0, nonAc: 0 },
        girls: { ac: 0, nonAc: 0 }
      };
      hostelStats.forEach(stat => {
        const hostelTypeLower = stat._id.hostelType.toLowerCase();
        const roomTypeLower = stat._id.roomType.toLowerCase();
        const key = roomTypeLower.includes('non') ? 'nonAc' : 'ac';
        if (formattedHostelStats[hostelTypeLower]) {
          formattedHostelStats[hostelTypeLower][key] = stat.availableBeds;
        }
      });

      io.emit('hostelAvailabilityUpdate', formattedHostelStats);
    }

    // ===============================
    // SUCCESS RESPONSE
    // ===============================

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        paymentId: razorpay_payment_id,
        studentName: application.studentName,
        studentId: application.studentId,
        roomNumber: allocatedRoom,
        paymentStatus: 'Completed',
        receiptUrl: `${process.env.BACKEND_URL || 'https://intern-3luz.onrender.com'}/api/hostel-payments/receipt/${razorpay_payment_id}`
      }
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('HOSTEL VERIFY ERROR:', err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ======================================================
// PAYMENT HISTORY
// ======================================================

exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await HostelPayment.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ======================================================
// DOWNLOAD RECEIPT PDF
// ======================================================

exports.getAdmissionReceipt = async (req, res) => {
  try {
    const payment = await HostelPayment.findOne({
      paymentId: req.params.paymentId
    }).populate({
      path: 'applicationId',
      select: 'studentId hostelType roomType roomNumber'
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Receipt not found'
      });
    }

    // ===============================
    // PDF HEADERS
    // ===============================

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Hostel_Receipt_${payment.paymentId}.pdf`
    );

    const doc = new PDFDocument({
      margin: 40,
      size: 'A4'
    });

    doc.pipe(res);

    // ===============================
    // HEADER
    // ===============================

    doc
      .rect(0, 0, 700, 100)
      .fill('#0f1f3a');

    doc
      .fillColor('#ffffff')
      .fontSize(26)
      .font('Helvetica-Bold')
      .text('KRR BRIGHTMINDS SCHOOL', 50, 35);

    doc
      .fontSize(12)
      .font('Helvetica')
      .text('HOSTEL PAYMENT RECEIPT', 50, 70);

    // ===============================
    // DETAILS
    // ===============================

    let y = 140;

    doc.fillColor('#000000');

    const details = [
      ['Student Name', payment.studentName],
      ['Student ID', payment.applicationId?.studentId || 'N/A'],
      ['Hostel Type', payment.applicationId?.hostelType || 'N/A'],
      ['Room Type', payment.applicationId?.roomType || 'N/A'],
      ['Room Number', payment.applicationId?.roomNumber || 'Pending'],
      ['Payment ID', payment.paymentId],
      ['Payment Status', payment.status],
      ['Date', payment.paidAt ? new Date(payment.paidAt).toLocaleDateString('en-IN') : 'N/A']
    ];

    details.forEach(item => {
      doc.font('Helvetica-Bold').fontSize(12).text(item[0], 50, y);
      doc.font('Helvetica').text(': ' + item[1], 220, y);
      y += 28;
    });

    // ===============================
    // FEES
    // ===============================

    y += 20;

    doc
      .font('Helvetica-Bold')
      .fontSize(16)
      .text('Fee Breakdown', 50, y);

    y += 40;

    const fees = [
      ['Hostel Fee', payment.feeBreakdown.hostelFee],
      ['Admission Fee', payment.feeBreakdown.admissionFee],
      ['Security Deposit', payment.feeBreakdown.securityDeposit]
    ];

    fees.forEach(fee => {
      doc.font('Helvetica').fontSize(12).text(fee[0], 60, y);
      doc.text(`₹ ${fee[1].toLocaleString('en-IN')}`, 420, y);
      y += 28;
    });

    // ===============================
    // TOTAL
    // ===============================

    y += 20;

    doc
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();

    y += 20;

    doc
      .font('Helvetica-Bold')
      .fontSize(16)
      .text('TOTAL PAID', 60, y);

    doc
      .text(`₹ ${payment.amount.toLocaleString('en-IN')}`, 400, y);

    // ===============================
    // FOOTER
    // ===============================

    y += 80;

    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor('gray')
      .text('This is a computer generated receipt and does not require a physical signature.', 50, y);

    doc.text('For any queries, contact the hostel office.', 50, y + 18);

    doc.end();
  } catch (err) {
    console.error('PDF RECEIPT ERROR:', err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
