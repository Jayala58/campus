const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: String,
  website: String,
  location: String,
  description: String,
  logo: { url: String, public_id: String }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
