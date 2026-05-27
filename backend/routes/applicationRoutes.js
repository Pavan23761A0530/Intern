const express = require('express');
const router = express.Router();
const { submitApplication, getApplications, getApplicationById } = require('../controllers/applicationController');

router.post('/submit', submitApplication);
router.get('/', getApplications);
router.get('/:id', getApplicationById);

module.exports = router;
