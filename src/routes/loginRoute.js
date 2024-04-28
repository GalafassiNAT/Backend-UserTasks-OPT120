const express = require('express');
const loginRoute = express.Router();

const LoginController = require('../controllers/loginController.js');

loginRoute.post('/', LoginController.login);

module.exports = loginRoute;