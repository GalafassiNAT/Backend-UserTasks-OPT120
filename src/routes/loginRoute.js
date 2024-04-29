const express = require('express');
const loginRoute = express.Router();

const LoginController = require('../controllers/loginController.js');

loginRoute.post('/', async  (req, res, next) => {
	try{
		await LoginController.login(req, res, next);
	} catch(err){
		next(err);
	}
});

module.exports = loginRoute;