const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signToken(user){
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.register = async (req,res,next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch(err){ next(err); }
};

exports.login = async (req,res,next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if(!match) return res.status(400).json({ message: 'Invalid credentials' });
    res.json({ token: signToken(user) });
  } catch(err){ next(err); }
};

exports.profile = async (req,res) => {
  res.json(req.user);
};

