const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport')

router.post('/register', userController.registerUser);

router.get('/login', userController.loginUser);

router.put('/admin', passport.authenticate('jwt', { session: false }), userController.makeAdmin);

router.get('/getall', userController.getAllUsers);

module.exports = router;
