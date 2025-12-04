const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rollNumber: { type: String, required: true, unique: true },
  department: String,
  year: Number,
  cgpa: Number,
  resume: { url: String, public_id: String },
  skills: [String],
  placed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
