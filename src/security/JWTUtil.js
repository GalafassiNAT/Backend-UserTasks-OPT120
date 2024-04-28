const jwt = require('jsonwebtoken');

class JWTUtil {
	secret = process.env.JWT_SECRET
	expires = process.env.EXPIRES_IN

	generateToken(payload){
		return jwt.sign(payload, this.secret, {expiresIn: this.expires});
	}

	decodeToken(token){
		return jwt.verify(token, this.secret);
	}
}

module.exports = new JWTUtil();