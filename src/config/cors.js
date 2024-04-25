const cors = require('cors');

const allowedOrigins = [
	'https://my-flutter-web-app.com',
	'http://localhost:8080'
];

const corsOptions = {
	origin: (origin, callback) => {
		if(!origin) return callback(null, true);

		if(allowedOrigins.includes(origin)){
			callback(null, true);
		}else{
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
};

module.exports = cors(corsOptions);