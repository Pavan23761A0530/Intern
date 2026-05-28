const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getApplications,
  getApplication,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/hostelApplicationController');

router.post('/', submitApplication);
router.get('/', getApplications);
router.get('/:id', getApplication);
router.put('/:id', updateApplicationStatus);
router.delete('/:id', deleteApplication);

module.exports = router;
