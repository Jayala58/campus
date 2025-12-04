/*const User = require('../models/User'); // Make sure your User model is correct

// GET /api/students
const getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Query users with role 'student'
    const students = await User.find({ role: 'student' })
      .select('-password') // exclude password
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments({ role: 'student' });

    res.json({
      data: students,
      meta: { total, page, limit }
    });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getStudents };*/
const User = require('../models/User');

// Get all students (only students, not companies)
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json({
      success: true,
      total: students.length,
      data: students
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Logged-in student's own profile
exports.getMyProfile = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};

