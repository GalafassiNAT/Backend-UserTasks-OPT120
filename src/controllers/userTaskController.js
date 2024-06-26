const AppError = require('../exceptions/AppError.js');
const UserTaskService = require('../services/UserTaskService.js');


class userTaskController {

	static async create(req, res){
		const userId = req.body.userId;
		const taskId = req.body.taskId;

		if(!userId || !taskId){
			return res.status(400).json({ message: 'Missing parameters' });
		}

		try{
			const userTask = await UserTaskService.create(userId, taskId);
			if(userTask == null){
				throw new Error('User task not created');
			}
			res.status(201).json(userTask.toJSON());

		}catch(err){
			console.error('Error when creating a user task: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}
	}
	


	static async findAll(req, res){
		try{
			const userTasks = await UserTaskService.findAll();
			if(userTasks == null){
				throw new Error('User tasks not found');
			}
			res.status(200).json(userTasks);
		}catch(err){
			console.log('Error when getting all user tasks: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}
	
	}


	static async findByUserId(req, res){
		const userId = req.params.userId;
		console.log("userId: ", userId);
		console.log('PAYLOAD: ', req.payload.profile);

		if(!userId){
			throw new AppError('Missing parameters', 404);
		}

		if(req.payload.profile.name === 'ADMIN')
			console.log('SOU UM ADMINISTRADOR');


		if(req.payload.profile.name != 'ADMIN' && req.payload.id != userId){
			throw new AppError('Access denied', 403);
		}

		try{
			const userTasks = await UserTaskService.findByUserId(userId);
			if(userTasks == null){
				throw new AppError('User tasks not found', 404);
			}
			res.status(200).json(userTasks);
		}catch(err){
			console.log('Error when getting user tasks by user id: ', err);
			throw new AppError('Internal server error', 500);
		}

	}

	static async findByTaskId(req, res){
		const taskId = req.params.taskId;
		if(!taskId){
			return res.status(404).json({ message: 'Missing parameters' });
		}
	
		try{
			const userTasks = await UserTaskService.findByTaskId(taskId);
			if(userTasks == null){
				throw new Error('User tasks not found');
			}
			res.status(200).json(userTasks);
		}catch(err){
			console.log('Error when getting user tasks by task id: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}
	}


	static async findByUserIdAndTaskId(req, res){
		const userId = req.params.userId;
		const taskId = req.params.taskId;
		if(!userId || !taskId){
			throw new AppError('Missing parameters', 404);
		}

		if(req.payload.profile.name != 'ADMIN' && req.payload.id != userId){
			throw new AppError('Access denied', 403);
		}		

		try{
			const userTask = await UserTaskService.findByUserIdAndTaskId(userId, taskId);
			if(userTask == null){
				throw new AppError('User task not found', 404);
			}
			res.status(200).json(userTask.toJSON());
		}catch(err){
			console.log('Error when getting user task by user id and task id: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}
	
	}

	static async update(req, res){
		const userId = req.params.userId;
		const taskId = req.params.taskId;
		const score = req.body.score;

		if(!userId || !taskId || !score){
			return res.status(400).json({ message: 'Missing parameters' });
		}

		if(req.payload.profile.name != 'ADMIN'){
			throw new AppError('Access denied', 403);
		}

		try{
			const userTask = await UserTaskService.update(userId, taskId, score);
			if(userTask == null){
				throw new Error('User task not updated');
			}
			res.status(200).json(userTask.toJSON());
		}catch(err){
			console.error('Error when updating a user task: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}
	}


	static async deliver(req, res){
		const userId = req.params.userId;
		const taskId = req.params.taskId;
		const deliveredDate = new Date();

		if(!userId || !taskId || !deliveredDate){
			return res.status(400).json({ message: 'Missing parameters' });
		}

		if(req.payload.profile.name != 'USER' || req.payload.id != userId){
			throw new AppError('Access denied', 403);
		}

		try{
			const userTask = await UserTaskService.deliver(userId, taskId, deliveredDate);
			if(userTask == null){
				throw new Error('User task not delivered');
			}
			res.status(200).json(userTask.toJSON());
		}catch(err){
			console.error('Error when delivering a user task: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}
	}


}

module.exports = userTaskController;