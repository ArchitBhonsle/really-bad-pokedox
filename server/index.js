const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'test',
	password: 'test',
	database: 'pokemon'
});

conn.connect();

app.get('/pokedex', (req, res) => {
	conn.query('SELECT * FROM pokedex', function(error, results) {
		if (error) console.log(error);
		results.forEach((pokemon) => {
			pokemon.image = pokemon.image.toString('base64');
		});
		res.json(results);
	});
});

app.post('/pokedex', (req, res) => {
	const id = req.body.id;
	const name = req.body.name;
	const image = req.body.image.slice(22);
	const query = `INSERT INTO pokedex VALUES (${id}, '${name}', FROM_BASE64('${image}'))`;
	conn.query(query, (error) => {
		if (error) console.log(error);
		res.status(200).end();
	});
});

app.delete('/pokedex', (req, res) => {
	const id = req.body.id;
	const query = `DELETE FROM pokedex WHERE id=${id}`;
	conn.query(query, (error) => {
		if (error) console.log(error);
		res.status(200).end();
	});
});

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});
