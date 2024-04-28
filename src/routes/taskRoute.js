const express = require('express');
const taskRoute = express.Router();
const taskController = require('../controllers/taskController');
const AdminAuthorization = require('../middlewares/AdminAuthorization');
const UserAuthorization = require('../middlewares/UserAuthorization');

taskRoute.post('/', AdminAuthorization, taskController.create);
taskRoute.get('/', AdminAuthorization,taskController.findAll);
taskRoute.get('/:id', UserAuthorization, taskController.findById);
taskRoute.put('/:id', AdminAuthorization, taskController.update);


module.exports = taskRoute;