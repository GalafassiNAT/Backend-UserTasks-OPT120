const express = require('express');
const userController = require('../controllers/userController.js');
const requireTokenJWT = require('../middlewares/RequireJWT.js');
const UserAuthorization = require('../middlewares/UserAuthorization.js');
const AdminAuthorization = require('../middlewares/AdminAuthorization.js');

const userRoute = express.Router();

userRoute.post('/', async (req, res, next) => {
	try{
		await userController.create(req, res, next);
	}catch (err){
		next(err);
	}
});

userRoute.get('/email/:email', requireTokenJWT, AdminAuthorization, userController.findByEmail);

userRoute.get('/:id', requireTokenJWT, UserAuthorization, userController.findById);


userRoute.get('/', requireTokenJWT, AdminAuthorization , async  (req, res, next) => {
	try{
		await userController.findAll(req, res, next);
	} catch(err){
		next(err);
	}
});

userRoute.put('/:id', requireTokenJWT, UserAuthorization, userController.update);

module.exports = userRoute;