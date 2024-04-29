const express = require('express');
const AppError = require('../exceptions/AppError.js');
const Profile = require('../models/Profile.js');
const UserService = require('../services/UserService.js');


class UserController {
	

	static async create(req, res){

		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		try{
			if(!name || !email || !password){
				throw new AppError('Missing parameters', 400);
			}
			const user = await UserService.create(name, email, password);
			res.status(201).json(user);
		}catch(err){
			next(err);
		}

	}

	static async findById(req, res){

		const id = req.params.id;

		if(!id){
			return re.status(404).json({message: 'Missing parameters'});
		}

		try{
			const user = await UserService.findById(id);
			if(user == null){
				throw new Error('User not found');
			}
			
			console.log('PROFILE NAME: ', user.profile.name);

			if(req.payload.profile.name != 'ADMIN' && user.id != req.payload.id){
				throw new AppError('Access denied', 403);
			}
			console.log('User found: ', user.toJSON());
			res.status(200).json(user.toJSON());
			
		}catch(err){
			console.error('Error when getting an user by id: ', err);
		}
	}

	static async findAll(req, res, next){
		
		try{
			const users = await UserService.findAll();
			if(users == null){
				throw new Error('Users not found');
			}

			console.log("Payload Profile: " + req.payload.profile);
			console.log("ADMIN ID: " + Profile.ADMIN.id);

			if(req.payload.profile.id != Profile.ADMIN.id){
				throw new AppError('Access denied', 403);
			}
			
			res.status(200).json(users);
		}catch(err){
			next(err);
		}

	}

	static async update(req, res){
		const id = req.params.id;
		if(!id){
			return res.status(400).json({ message: 'Missing parameters' });
		}
		
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		if(!name && !email && !password){
			return res.status(400).json({ message: 'Missing parameters' });
		}

		try{
			const user = await UserService.update(id, name, email, password);
			if(user == null){
				throw new Error('User not found');
			}
			res.status(200).json(user);
		}catch(err){
			console.error('Error when updating an user: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}

	}

	static async findByEmail(req, res){
		const email = req.params.email;
		console.log('Email: ', email);
		if(!email){
			return res.status(400).json({ message: 'Missing parameters' });
		}
		try{
			const user = await UserService.findByEmail(email);
			if(user == null){
				throw new Error('User not found');
			}
			res.status(200).json(user.toJSON());
		} catch(err){
			console.error('Error when getting an user by email: ', err);
			res.status(500).json({ message: 'Internal server error' });
		}
	}


}

module.exports = UserController;