const express = require('express');
const userTaskController = require('../controllers/userTaskController.js');
const AdminAuthorization = require('../middlewares/AdminAuthorization.js');
const UserAuthorization = require('../middlewares/UserAuthorization.js');

const userTaskRoute = express.Router();

userTaskRoute.post('/', AdminAuthorization,userTaskController.create);
userTaskRoute.get('/', UserAuthorization,userTaskController.findAll);
userTaskRoute.get('/task/:taskId', UserAuthorization, userTaskController.findByTaskId);
userTaskRoute.get('/user/:userId', UserAuthorization, userTaskController.findByUserId);
userTaskRoute.get('/user/:userId/task/:taskId', UserAuthorization, userTaskController.findByUserIdAndTaskId);
userTaskRoute.put('/:userId/:taskId', UserAuthorization,userTaskController.deliver);
userTaskRoute.put('/score/:userId/:taskId', AdminAuthorization, userTaskController.update)

module.exports = userTaskRoute;