const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/students.routes');
const companyRoutes = require('./routes/companies.routes');
const driveRoutes = require('./routes/drives.routes');
const offerRoutes = require('./routes/offers.routes');
const reportRoutes = require('./routes/reports.routes');
const uploadRoutes = require('./routes/upload.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req,res) => res.json({ ok: true, msg: 'Campus Placement API' }));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/drives', driveRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/upload', uploadRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});


module.exports = app;
