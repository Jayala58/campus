/*const Offer = require('../models/Offer');
const Student = require('../models/Student');

exports.create = async (req,res,next) => {
  try {
    const offer = await Offer.create(req.body);
    if(offer.status === 'accepted') {
      await Student.findByIdAndUpdate(offer.student, { placed: true });
    }
    res.status(201).json(offer);
  } catch(err){ next(err); }
};

exports.forStudent = async (req,res,next) => {
  try {
    const offers = await Offer.find({ student: req.params.id }).populate('company','name').populate('drive','title');
    res.json(offers);
  } catch(err){ next(err); }
};*/
const Offer = require('../models/Offer');
const User = require('../models/User');

exports.create = async (req, res, next) => {
  try {
    const offer = await Offer.create(req.body);

    // If offer is accepted → mark student as placed
    if (offer.status === 'accepted') {
      console.log("Accepted Offer:", offer);
      await User.findByIdAndUpdate(offer.student, { placed: true });
    }

    res.status(201).json(offer);
  } catch (err) {
    next(err);
  }
};

exports.forStudent = async (req, res, next) => {
  try {
    const offers = await Offer.find({ student: req.params.id })
      .populate('company', 'name logo publicId')
      .populate('drive', 'title date venue');

    res.json(offers);
  } catch (err) {
    next(err);
  }
};

