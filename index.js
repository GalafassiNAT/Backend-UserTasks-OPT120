require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT= 3000;
const router = require('./src/routes/indexRoute.js');
const AppError = require('./src/exceptions/AppError.js');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({ origin: '*'}));


app.get('/', (req, res) => {
	res.send("Running...");
});

app.use(router);

app.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT} 🚀🚀🚀`);
});

// Middleware de erro
app.use((err, req, res, next) => {
	let statusCode = err.statusCode || 500;
	if(err instanceof AppError){
		console.log(err);
		console.log("AppError MIDDLEWARE:" + AppError);
		res.status(statusCode).json({
			status: "erro",
			message: err.message
		});
	} else {
		res.status(500).json({
			status: "erro",
			message: `Ocorreu um erro interno - ${err.message}`
		});
	}
	next();
});