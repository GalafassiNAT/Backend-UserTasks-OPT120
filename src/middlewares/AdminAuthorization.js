const userService = require('../services/UserService');
const AppError = require('../exceptions/AppError');
const Profile = require('../models/Profile');


const AdminAuthorization = async (req, res, next) => {
	const id = req.payload.id;
	const user = await userService.findById(id);

	if(!user)
		return next(new AppError('Usuário não encontrado', 401));

	if(user.profile.id !== Profile.ADMIN.id)
		return next(new AppError('Acesso negado!', 403));

	next();
}

module.exports = AdminAuthorization;