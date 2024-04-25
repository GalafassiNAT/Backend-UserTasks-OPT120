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
		if(!userId){
			return res.status(404).json({ message: 'Missing parameters' });
		}

		try{
			const userTasks = await UserTaskService.findByUserId(userId);
			if(userTasks == null){
				throw new Error('User tasks not found');
			}
			res.status(200).json(userTasks);
		}catch(err){
			console.log('Error when getting user tasks by user id: ', err);
			res.status(500).json({ message: 'Internal server error' });
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
			return res.status(404).json({ message: 'Missing parameters' });
		}

		try{
			const userTask = await UserTaskService.findByUserIdAndTaskId(userId, taskId);
			if(userTask == null){
				throw new Error('User task not found');
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