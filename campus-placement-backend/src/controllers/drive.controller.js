const Drive = require('../models/Drive');
//const Student = require('../models/Student');
const User = require('../models/User');


exports.create = async (req,res,next) => {
  try {
    const drive = await Drive.create(req.body);
    res.status(201).json(drive);
  } catch(err){ next(err); }
};

exports.list = async (req,res,next) => {
  try {
    const { page=1, limit=10 } = req.query;
    const drives = await Drive.find({}).populate('company','name').skip((page-1)*limit).limit(Number(limit));
    const total = await Drive.countDocuments({});
    res.json({ data: drives, meta: { total, page:Number(page), limit:Number(limit) }});
  } catch(err){ next(err); }
};

exports.register = async (req,res,next) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if(!drive) return res.status(404).json({ message: 'Drive not found' });
    const { studentId } = req.body;
    //const student = await User.findById(studentId);
    //const student = await User.findOne({ _id: studentId, role: "student" });
    const student = await User.findById(studentId);

    if(!student) return res.status(404).json({ message: 'Student not found' });
    if(drive.registeredStudents.includes(student._id)) return res.status(400).json({ message: 'Already registered' });
    // simple eligibility checks
    if(drive.eligibility?.minCgpa && student.cgpa < drive.eligibility.minCgpa) return res.status(400).json({ message: 'Not eligible by CGPA' });
    drive.registeredStudents.push(student._id);
    await drive.save();
    res.json({ message: 'Registered', drive });
  } catch(err){ next(err); }
};
