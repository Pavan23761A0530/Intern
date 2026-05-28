const express = require('express');
const router = express.Router();
const {
  createHostelOrder,
  verifyHostelPayment,
  getPaymentHistory,
  getAdmissionReceipt
} = require('../controllers/hostelPaymentController');

router.post('/create-order', createHostelOrder);
router.post('/verify', verifyHostelPayment);
router.get('/history', getPaymentHistory);
router.get('/receipt/:paymentId', getAdmissionReceipt);

module.exports = router;
