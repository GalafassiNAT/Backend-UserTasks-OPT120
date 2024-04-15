const Task = require('../models/Task');
const db = require('../dabatase/dbConnection');


class TaskService{

	static async create(title, description, deliveryDate){
		let task = new Task();
		task.id = null;
		task.title = title;
		task.description = description;
		task.deliveryDate = new Date(deliveryDate);
		let taskJson = task.toJSON();
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('INSERT INTO Task SET ?', taskJson, (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			task.id = result.insertId;
			return task;
		}catch(err){
			console.log('Error when creating a task: ', err);
			return null;
		}
	}

	static async findById(id){
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('SELECT * FROM Task WHERE id = ?', id, (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			const task = new Task();
			if(result.length > 0){
				task.id = result[0].id;
				task.title = result[0].title;
				task.description = result[0].description;
				task.deliveryDate = result[0].deliveryDate;
			}else{
				console.log('Task not found!');
				return null;
			}
			return task;
		}catch(err){
			console.log('Error when getting a task by id: ', err);
			return null;
		}
	}

	static async findAll(){
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('SELECT * FROM Task', (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			let tasks = [];
			for(let i = 0; i < result.length; i++){
				const task = new Task();
				task.id = result[i].id;
				task.title = result[i].title;
				task.description = result[i].description;
				task.deliveryDate = result[i].deliveryDate;
				tasks.push(task);
			}
			return tasks;
		}catch(err){
			console.log('Error when getting all tasks: ', err);
			return null;
		}
	}

	static async update(id, title, description, deliveryDate){
		let task = await this.findById(id);
		
		if(task == null){
			console.log('Task not found!');
			return null;
		}

		if(title != null){
			task.title = title;
		}

		if(description != null){
			task.description = description;
		}

		if(deliveryDate != null){
			task.deliveryDate = deliveryDate;
		}

		try{
			const result = await new Promise((resolve, reject) => {
				db.query('UPDATE Task SET title = ?, description = ?, deliveryDate = ? WHERE id = ?', [task.title, task.description, task.deliveryDate, task.id], (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			return result;
		}catch(err){
			console.log('Error when updating a task: ', err);
			return null;
		}
	}


}

module.exports = TaskService;