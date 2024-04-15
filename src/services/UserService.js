require('dotenv').config();
const User = require('../models/User');
const db = require('../dabatase/dbConnection')
const bcrypt = require('bcryptjs');

class UserService{
	
	 static async create(name, email, password){
		let user = new User();
		user.id = null;

		if(await this.findByEmail(email) != null){
			throw new Error('Email already exists');
		}

		const saltRounds = Number(process.env.SALT) || 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		
		user = { name: name, email: email, password: bcrypt.hashSync(password, salt) };
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('INSERT INTO User SET ?', user, (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			user.id = result.insertId;
			return user;
		}catch(err){
			console.log('Error when creating an user: ', err);
			return null;
		}
	} 
	

	static async findById(id){
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('SELECT * FROM User WHERE id = ?', id, (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			const user = new User();
			if(result.length > 0){
				user.id = result[0].Id;
				user.name = result[0].Name;
				user.email = result[0].Email;
				user.password = result[0].Password;
			}else{
				
				console.log('User not found!');
				return null;
			}
			return user;
				
		}catch(err){
			console.log('Error when getting an user by id: ', err);
			return null;
		}
	}

	static async findByEmail(email){
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('SELECT * FROM User WHERE Email = ?', email, (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			const user = new User();
			if(result.length > 0){
				user.id = result[0].Id;
				user.name = result[0].Name;
				user.email = result[0].Email;
				user.password = result[0].Password;
			}else{
				console.log('User not found!');
				return null;
			}
			return user;
		}catch(err){
			console.log('Error when getting an user by email: ', err);
			return null;
		}
	
	}


	static async findAll(){
		try{
			const result = await new Promise((resolve, reject) => {
				db.query('SELECT * FROM User', (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			const users = [];
			for(let i = 0; i < result.length; i++){
				const user = new User();
				user.id = result[i].Id;
				user.name = result[i].Name;
				user.email = result[i].Email;
				user.password = result[i].Password;
				users.push(user);
			}
			return users;
		}catch(err){
			console.log('Error when getting all users: ', err);
			return null;
		}
	
	}
	
	static async update(id, name, email, password){
		
		let user =  await this.findById(id);
		if(user == null){
			console.log('User not found!');
			return null;
		}

		if(name != null){
			user.name = name;
		}
		if(email != null){
			user.email = email;
		}
		if(password != null){
			const saltRounds = Number(process.env.SALT) || 10;
			const salt = bcrypt.genSaltSync(saltRounds);
			user.password = bcrypt.hashSync(password, salt);
		}

		try{
			
			const result = await new Promise((resolve, reject) => {
				db.query('UPDATE User SET Name = ?, Email = ?, Password = ? WHERE Id = ?', [user.name,  user.email, user.password, user.id], (err, result) => {
					if(err) reject(err);
					else resolve(result);
				});
			});
			return result;
		}catch(err){
			console.log('Error when updating an user: ', err);
			return null;
		}
	}

}

module.exports = UserService;