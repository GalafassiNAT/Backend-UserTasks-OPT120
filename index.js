require('dotenv').config();
const express = require('express');
const app = express();
const PORT= 3000;
const router = require('./src/routes/indexRoute.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	res.send("Running...");
});

app.use(router);


app.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT} 🚀🚀🚀`);
});