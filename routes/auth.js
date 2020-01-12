const express = require('express');
const Router = express.Router();
const { register, login, forgotPassword, resetPassword } = require('../controllers/auth');

Router.post('/register', register);
Router.post('/login', login);
Router.post('/forgotpassword', forgotPassword);
Router.put('/resetpassword/:resettoken', resetPassword);

module.exports = Router;
