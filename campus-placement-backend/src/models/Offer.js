const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  drive: { type: mongoose.Schema.Types.ObjectId, ref: 'Drive', required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  position: String,
  package: Number,
  status: { type: String, enum: ['offered','accepted','rejected'], default: 'offered' },
  joiningDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Offer', OfferSchema);
