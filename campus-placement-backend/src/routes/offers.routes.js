const router = require('express').Router();
const ctrl = require('../controllers/offer.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

router.post('/', protect, authorizeRoles('admin','recruiter'), ctrl.create);
router.get('/student/:id', protect, ctrl.forStudent);

module.exports = router;
