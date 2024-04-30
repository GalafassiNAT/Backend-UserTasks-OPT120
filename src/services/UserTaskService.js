const UserTask = require('../models/UserTask.js');
const db = require('../dabatase/dbConnection.js');


class UserTaskService{

	static async create(userId, taskId){
		if(!userId || !taskId)
			return null;

		if(await this.findByUserIdAndTaskId(userId, taskId) != null)
			return null;

		let userTask = new UserTask();
		userTask.userId = userId;
		userTask.taskId = taskId;
		userTask.score = 0;
		userTask.delivered = null;
		userTask.isDelivered = false;
		userTask.isDeleted = false;
		let userTaskJson = userTask.toJSON();
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('INSERT INTO UserTask SET ?', userTaskJson, (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			return userTask;
		}catch(err){
			console.log('Error when creating an user task: ', err);
			return null;
		}
	}



	static async findAll(){
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('SELECT * FROM UserTask', (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			let userTasks = [];
			for(let i = 0; i < result.length; i++){
				const userTask = new UserTask();
				userTask.userId = result[i].UserId;
				userTask.taskId = result[i].TaskId;
				userTask.score = result[i].Score;
				userTask.delivered = result[i].Delivered;
				userTask.isDelivered = result[i].IsDelivered.toString() == '1' ? true : false;
				userTasks.push(userTask);
			}
			return userTasks;
		}catch(err){
			console.log('Error when getting all user tasks: ', err);
			return null;
		}
	}

	static async findByUserId(userId){
		console.log('userId: ', userId);
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('SELECT * FROM UserTask WHERE userId = ?', userId, (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			let userTasks = [];
			for(let i = 0; i < result.length; i++){
				const userTask = new UserTask();
				userTask.userId = result[i].UserId;
				userTask.taskId = result[i].TaskId;
				userTask.score = result[i].Score;
				userTask.delivered = result[i].Delivered;
				userTask.isDelivered = result[i].IsDelivered.toString() == '1' ? true : false;
				userTasks.push(userTask);
			}
			return userTasks;
		}catch(err){
			console.log('Error when getting user tasks by user id: ', err);
			return null;
		}
	}

	static async findByTaskId(taskId){
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('SELECT * FROM UserTask WHERE taskId = ?', taskId, (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			let userTasks = [];
			for(let i = 0; i < result.length; i++){
				const userTask = new UserTask();
				userTask.userId = result[i].UserId;
				userTask.taskId = result[i].TaskId;
				userTask.score = result[i].Score;
				userTask.delivered = result[i].Delivered;
				userTask.isDelivered = result[i].IsDelivered.toString() == '1' ? true : false;
				userTasks.push(userTask);
			}
			return userTasks;
		}catch(err){
			console.log('Error when getting user tasks by task id: ', err);
			return null;
		}
	}

	static async update(userId, taskId, score){
		let userTask = await this.findByUserIdAndTaskId(userId, taskId);
		if(userTask == null){
			return null;
		}
		userTask.score = score;
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('UPDATE UserTask SET score = ? WHERE userId = ? AND taskId = ?', [score, userId, taskId], (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			return userTask;
		}catch(err){
			console.log('Error when updating an user task: ', err);
			return null;
		}
	}

	static async findByUserIdAndTaskId(userId, taskId){
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('SELECT * FROM UserTask WHERE userId = ? AND taskId = ?', [userId, taskId], (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			if(result.length == 0){
				return null;
			}
			const userTask = new UserTask();
			userTask.userId = result[0].UserId;
			userTask.taskId = result[0].TaskId;
			userTask.score = result[0].Score;
			userTask.delivered = result[0].Delivered;
			userTask.isDelivered = result[0].IsDelivered.toString() == '1' ? true : false;
			return userTask;
		}catch(err){
			console.log('Error when getting an user task by user id and task id: ', err);
			return null;
		}
	}

	static async deliver(userId, taskId){
		let userTask = await this.findByUserIdAndTaskId(userId, taskId);
		if(userTask == null){
			return null;
		}
		userTask.delivered = new Date();
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('UPDATE UserTask SET delivered = ?, isDelivered = ? WHERE userId = ? AND taskId = ?', [userTask.delivered, userTask.isDelivered = true, userId, taskId], (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			return userTask;
		}catch(err){
			console.log('Error when delivering an user task: ', err);
			return null;
		}
	}

}

module.exports = UserTaskService;