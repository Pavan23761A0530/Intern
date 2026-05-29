const express = require('express');
const router = express.Router();
const { 
  getHostelRooms, 
  getHostelStats, 
  assignStudentToRoom 
} = require('../controllers/hostelController');

router.get('/rooms', getHostelRooms);
router.get('/stats', getHostelStats);
router.get('/availability', getHostelStats);
router.post('/assign', assignStudentToRoom);

module.exports = router;
