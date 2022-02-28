const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

// Login routes
router.get('/login', loginController.redirectHome, loginController.login_home);
router.post('/login', loginController.redirectHome, loginController.login);
router.get('/signup', loginController.redirectHome, loginController.signup);
router.post('/signup', loginController.redirectHome, loginController.create_user);
router.post('/signout', loginController.redirectLogin, loginController.signout);
router.get('/signout', loginController.redirectLogin, loginController.signout);

module.exports = router;