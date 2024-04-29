const AppError = require("../exceptions/AppError");
const UserService = require("../services/UserService");
const bcrypt = require('bcrypt');
const jwtUtil = require('../security/JWTUtil');

class LoginController {
	static async login(req, res) {
		const {email, password} = req.body;
		
		if(!email || !password){
			throw new AppError('Email e senha são necessários!', 400);
		}

		const user = await UserService.findByEmail(email);
		if(!user){
			throw new AppError('Email ou senha inválidos!', 401);
		}

		if(!bcrypt.compare(password, user.password)){
			throw new AppError('Email ou senha inválidos!', 401);
		}

		const profile = user.profile;	
		const token = jwtUtil.generateToken({id: user.id, name: user.name, profile: profile});
		
		const decodedToken = jwtUtil.decodeToken(token);
		console.log('Exp: ', decodedToken.exp);

		res.setHeader('Authorization', `Bearer ${token}`)
		res.status(200).json({token: token});
	}
}

module.exports = LoginController;