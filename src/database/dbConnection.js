require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
	host: process.env.HOST,
	port: process.env.PORT,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

db.connect((err) => {
	if(err){
		console.log('Erro ao conectar ao banco de dados: ', err);
		return db;
	}
	console.log('Conexão estabelecida com sucesso!: Batata');
})



module.exports = db;
