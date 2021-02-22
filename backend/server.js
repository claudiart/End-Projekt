const http = require ('http');
const fs = require('fs');
let users =[];

// json file with the data 
var data = fs.readFileSync('./places.json'); 
var places = JSON.parse(data); 
const express = require("express"); 
const app = express(); 

// ??? To solve the cors issue 
    // const cors = require('cors'); 
    // app.use(express.static('public')); 
    // app.use(cors()); 

const PORT = 3000;
app.listen(PORT, 
	() => console.log("Server Start at the Port "+ PORT)); 

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
	
	if(places[word]) { 
		var foundPlace = places[word];		 
	} else { 
		var foundPlace = { 
			status:"Not Found"
		} 
	} 
	
	res.send(foundPlace); 
} 

//Endpoint für die User-Registrierung
app.post('/user', registerUser); 

function registerUser(req, res) { 
	console.log("ok backend");
	var user = req.body; 
	
	if(!user.username || !user.email || !user.pass  ) { 
		return res.sendStatus(400);	 
	} else { 
			users.push(user);
			console.log(users);
			res.json(user);
		} 
} 
	
 
