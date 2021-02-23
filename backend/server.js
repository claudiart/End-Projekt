const http = require('http');
const fs = require('fs');
const path = require('path');

let users = [];

// json file with the data 
var data = fs.readFileSync('./places.json');
var places = JSON.parse(data);
const express = require('express');
const app = express();
app.set("view engine", "hbs"); // hbs dateien statt html 
const viewsPath = path.join(__dirname, "views"); // __dirname und views zusammenfassen als String
app.set("views", viewsPath); // views in ViewsPath 
app.use(express.static(path.join(__dirname, 'public'))); // 


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // Middleware
app.use(bodyParser.json());


app.get('/', (req, res) => {
	res.render('register')
})

const PORT = 3000;
app.listen(PORT,
	() => console.log("Server Start at the Port " + PORT));

// ??? difference .send() .json()

// Endpoint for getting all places
app.get("/places", (req, res) => {
	res.send(places);
});

//Endpoint for getting a single place
app.get('/places/:place/', searchPlace);

function searchPlace(req, res) {
	var word = req.params.place;
	word = word.toLowerCase();

	if (places[word]) {
		var foundPlace = places[word];
	} else {
		var foundPlace = {
			status: "Not Found"
		}
	}

	res.send(foundPlace);
}

//Endpoint für die User-Registrierung
app.post('/user', registerUser);

function registerUser(req, res) {
	console.log("ok backend");
	var user = req.body;

	if (user.username && user.email && user.pass) {
		users.push(user);
		console.log(users);
		res.json(user);
	}
	else if (!user.username || !user.email || !user.pass) {
		throw new Error('fail');
	}

	let fileText = JSON.stringify(user);
	fs.writeFile(__dirname + '/users.json', fileText, (err, user) => {
		if (err) {
			throw err
		} if (user) {
			console.log(user);
		}
	})
}

