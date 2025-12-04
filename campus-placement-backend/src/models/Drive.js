const mongoose = require('mongoose');

const DriveSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  title: String,
  description: String,
  date: { type: Date, required: true },
  venue: String,
  eligibility: {
    minCgpa: Number,
    departments: [String]
  },
  registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

module.exports = mongoose.model('Drive', DriveSchema);
