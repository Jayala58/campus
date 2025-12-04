const router = require('express').Router();
const ctrl = require('../controllers/report.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

router.get('/summary', protect, authorizeRoles('admin','recruiter'), ctrl.summary);
router.get('/monthly', protect, authorizeRoles('admin','recruiter'), ctrl.monthly);
router.get('/placements', protect, authorizeRoles('admin','recruiter'), ctrl.placements);

module.exports = router;
