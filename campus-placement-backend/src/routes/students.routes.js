/*const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware'); // ← FIXED
const { getStudents } = require('../controllers/students.controller');

router.get('/', protect, getStudents);

module.exports = router;*/
const express = require('express');
const router = express.Router();
const { getStudents, getMyProfile } = require('../controllers/students.controller');
const { protect } = require('../middlewares/auth.middleware');

// Get all students
router.get('/', protect, getStudents);

// Get logged-in student's profile
router.get('/me', protect, getMyProfile);

module.exports = router;



