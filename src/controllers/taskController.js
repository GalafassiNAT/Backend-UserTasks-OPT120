const TaskService = require('../services/TaskService.js');

class TaskController{

	static async create(req, res){
		const title = req.body.title;
		const description = req.body.description;
		const deliveryDate = req.body.deliveryDate;

		if(!title || !description || !deliveryDate){
			return res.status(400).json({ message: 'Missing parameters' });
		}

		try{
			const task = await TaskService.create(title, description, deliveryDate); 
			if(task == null){
				throw new Error('Task not created');
			}
			res.status(201).json(task.toJSON());
		}catch(err){
			console.error('Error when creating a task: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	static async findById(req, res){
		const id = req.params.id;

		if(!id){
			return res.status(404).json({ message: 'Missing parameters' });
		}

		try{
			const task = await TaskService.findById(id);
			if(task == null){
				throw new Error('Task not found');
			}
			res.status(200).json(task.toJSON());
		}catch(err){
			console.error('Error when getting a task by id: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}
	}


	static async findAll(req, res){
		try{
			const tasks = await TaskService.findAll();
			if(tasks == null){
				throw new Error('Tasks not found');
			}
			res.status(200).json(tasks);
		}catch(err){
			console.error('Error when getting all tasks: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	static async update(req, res){
		const id = req.params.id;
		const title = req.body.title;
		const description = req.body.description;
		const deliveryDate = req.body.deliveryDate;

		if(!id || !title || !description || !deliveryDate){
			return res.status(400).json({ message: 'Missing parameters' });
		}

		try{
			const task = await TaskService.update(id, title, description, deliveryDate);
			if(task == null){
				throw new Error('Task not updated');
			}
			res.status(200).json(task.toJSON());
		}catch(err){
			console.error('Error when updating a task: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}
	}

}

module.exports = TaskController;