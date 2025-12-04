const router = require('express').Router();
const ctrl = require('../controllers/drive.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

router.post('/', protect, authorizeRoles('admin','recruiter'),ctrl.create);
router.get('/', ctrl.list);
router.post('/:id/register', protect,ctrl.register);

module.exports = router;
