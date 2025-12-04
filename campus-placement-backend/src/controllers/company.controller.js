const Company = require('../models/Company');

exports.create = async (req,res,next) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch(err){ next(err); }
};

exports.list = async (req,res,next) => {
  try {
    const { search, page=1, limit=10 } = req.query;
    const q = {};
    if(search) q.name = new RegExp(search,'i');
    const companies = await Company.find(q).skip((page-1)*limit).limit(Number(limit));
    const total = await Company.countDocuments(q);
    res.json({ data: companies, meta: { total, page:Number(page), limit:Number(limit) }});
  } catch(err){ next(err); }
};
