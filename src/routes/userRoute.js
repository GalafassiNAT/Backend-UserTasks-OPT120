const express = require('express');
const userController = require('../controllers/userController.js');

const userRoute = express.Router();

userRoute.post('/', userController.create);

userRoute.get('/:id', userController.findById);

userRoute.get('/', userController.findAll);

userRoute.put('/:id', userController.update);

module.exports = userRoute;