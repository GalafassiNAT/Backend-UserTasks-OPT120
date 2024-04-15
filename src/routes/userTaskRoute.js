const express = require('express');
const userTaskController = require('../controllers/userTaskController.js');

const userTaskRoute = express.Router();

userTaskRoute.post('/', userTaskController.create);
userTaskRoute.get('/', userTaskController.findAll);
userTaskRoute.get('/task/:id', userTaskController.findByTaskId);
userTaskRoute.get('/user/:id', userTaskController.findByUserId);
userTaskRoute.get('/user/:userId/task/:taskId', userTaskController.findByUserIdAndTaskId);
userTaskRoute.put('/:userId/:taskId', userTaskController.deliver);
userTaskRoute.put('/score/:userId/:taskId', userTaskController.update)

module.exports = userTaskRoute;