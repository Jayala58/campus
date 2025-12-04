/*const Company = require('../models/Company');
const User= require('../models/User');
const Drive = require('../models/Drive');
const Offer = require('../models/Offer');

exports.summary = async (req,res,next) => {
  try {
    const totalCompanies = await Company.countDocuments();
    const totalStudents = await User.countDocuments();
    const totalDrives = await Drive.countDocuments();
    const totalOffers = await Offer.countDocuments();
    const placed = await User.countDocuments({ placed: true });
    res.json({ totalCompanies, totalStudents, totalDrives, totalOffers, placed });
  } catch(err){ next(err); }
};

exports.monthly = async (req,res,next) => {
  try {
    const year = Number(req.query.year) || (new Date()).getFullYear();
    const agg = await Offer.aggregate([
      { $match: { status: 'accepted', joiningDate: { $exists: true } } },
      { $project: { month: { $month: '$joiningDate' }, year: { $year: '$joiningDate' } } },
      { $match: { year } },
      { $group: { _id: '$month', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(agg);
  } catch(err){ next(err); }
};

exports.placements = async (req,res,next) => {
  try {
    const top = await Offer.aggregate([
      { $match: { status: 'accepted' } },
      { $group: { _id: '$company', hires: { $sum: 1 } } },
      { $sort: { hires: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'companies', localField: '_id', foreignField: '_id', as: 'company' } },
      { $unwind: '$company' },
      { $project: { hires:1, 'company.name':1 } }
    ]);
    res.json(top);
  } catch(err){ next(err); }
};*/
const Company = require('../models/Company');
const User = require('../models/User');    // students stored in User
const Drive = require('../models/Drive');
const Offer = require('../models/Offer');

// SUMMARY REPORT
exports.summary = async (req,res,next) => {
  try {
    const totalCompanies = await Company.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalDrives = await Drive.countDocuments();
    const totalOffers = await Offer.countDocuments();
    const placed = await User.countDocuments({ role: "student", placed: true });

    res.json({ totalCompanies, totalStudents, totalDrives, totalOffers, placed });
  } catch(err){ next(err); }
};

// MONTHLY REPORT
exports.monthly = async (req,res,next) => {
  try {
    const year = Number(req.query.year) || (new Date()).getFullYear();

    const agg = await Offer.aggregate([
      { $match: { status: 'accepted', joiningDate: { $exists: true } } },
      { $project: { month: { $month: '$joiningDate' }, year: { $year: '$joiningDate' } } },
      { $match: { year } },
      { $group: { _id: '$month', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json(agg);
  } catch(err){ next(err); }
};

// TOP PLACEMENTS REPORT
exports.placements = async (req,res,next) => {
  try {
    const top = await Offer.aggregate([
      { $match: { status: 'accepted' } },
      { $group: { _id: '$company', hires: { $sum: 1 } } },
      { $sort: { hires: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'companies',
          localField: '_id',
          foreignField: '_id',
          as: 'company'
        }
      },
      { $unwind: '$company' },
      { $project: { hires:1, 'company.name':1 } }
    ]);

    res.json(top);
  } catch(err){ next(err); }
};
