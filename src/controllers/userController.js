const UserService = require('../services/UserService.js');


class UserController {
	

	static async create(req, res){

		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		if(!name || !email || !password){
			return res.status(400).json({ message: 'Missing parameters' });
		}
		try{
			const user = await UserService.create(name, email, password);
			res.status(201).json(user);
		}catch(err){
			console.error('Error when creating an user: ', err);
			res.status(500).json({ message: 'Internal server error' });
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
			res.status(200).json(user.toJSON());
			
		}catch(err){
			console.error('Error when getting an user by id: ', err);
		}
	}

	static async findAll(req, res){
		
		try{
			const users = await UserService.findAll();
			if(users == null){
				throw new Error('Users not found');
			}
			res.status(200).json(users);
		}catch(err){
			console.error('Error when getting all users: ', err);
			res.status(500).json({ message: 'Internal server error' });
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


}

module.exports = UserController;