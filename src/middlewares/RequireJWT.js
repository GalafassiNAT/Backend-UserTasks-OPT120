const jwt = require('jsonwebtoken');
const AppError = require('../exceptions/AppError');

const requireTokenJWT = async (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	if(!authorizationHeader){
		return next(new AppError('Cabeçalho de autorização não encontrado', 401));
	}

	const token = authorizationHeader.replace('Bearer ', '');
	if(!token){
		return next(new AppError('Token não encontrado', 401));

	}

	const jwtsecret = process.env.JWT_SECRET;
	try{
		req.payload = jwt.verify(token, jwtsecret);
	} catch(err){
		return next(new AppError('Token inválido', 401));
	}

	next();

}

module.exports = requireTokenJWT;