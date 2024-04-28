const AppError = require("../exceptions/AppError");
const userService = require('../services/UserService');


const UserAuthorization = async (req, res, next) => {
	const id = req.payload.id;
	const user = await userService.findById(id);

	if(!user)
		return next(new AppError('Acesso negado!', 403));

	next();
}

module.exports = UserAuthorization;