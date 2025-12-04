const router = require('express').Router();
const ctrl = require('../controllers/company.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

router.post('/', protect,authorizeRoles('admin','recruiter'),ctrl.create);
router.get('/', ctrl.list);

module.exports = router;
//authorizeRoles('admin','recruiter')
