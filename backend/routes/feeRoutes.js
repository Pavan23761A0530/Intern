const express = require('express');
const router = express.Router();
const { getAllFees, upsertFee, seedFees } = require('../controllers/feeController');

router.get('/', getAllFees);
router.post('/', upsertFee);
router.post('/seed', seedFees);

module.exports = router;
