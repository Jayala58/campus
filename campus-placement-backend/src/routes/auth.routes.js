const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/profile', protect, ctrl.profile);

module.exports = router;

