const express = require('express');
const taskRoute = express.Router();
const taskController = require('../controllers/taskController')

taskRoute.post('/', taskController.create);
taskRoute.get('/', taskController.findAll);
taskRoute.get('/:id', taskController.findById);
taskRoute.put('/:id', taskController.update);


module.exports = taskRoute;