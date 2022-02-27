const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.get('/login', loginController.login_home);
router.post('/login', loginController.redirectHome, loginController.login);
router.get('/signup', loginController.signup);
router.post('/signup', loginController.create_user);
router.post('/signout', loginController.redirectLogin, loginController.signout);

module.exports = router;