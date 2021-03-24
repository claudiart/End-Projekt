const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

app.set("view engine", "hbs"); // hbs dateien statt html 
const viewsPath = path.join(__dirname, "views"); // __dirname und views zusammenfassen als String
app.set("views", viewsPath); // views in ViewsPath 
app.use(express.static(path.join(__dirname, 'public'))); // 

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // Middleware
app.use(bodyParser.json());

const PORT = 3000;
app.listen(PORT, () => console.log("Server Start at the Port " + PORT));

//render register on start page (change this later to login)
app.get('/', (req, res) => {
	res.render('login')
})

app.get('/register', (req, res) => {
	res.render('register')
})


app.get('/user', (req, res) => {
	res.render('../../frontend/index')
})

app.get('/admin', (req, res) => {
	res.render('adminHome');
})

app.get('/admin/add', (req, res) => {
		res.render('addPlace');
})

app.get('/admin/edit', (req, res) => {
	res.render('editPlace');
})

//Endpoint for getting all places
app.get('/places', getAllPlaces);

function getAllPlaces(req, res) {
	var data = fs.readFileSync('./places.json');
	var places = JSON.parse(data);
	if (places) {
		res.json(places);
	} else {
		res.send("No places found");
	}
}

//Endpoint for getting a single place by name
app.get('/places/:place', searchPlace);

function searchPlace(req, res) {
	var name = req.params.place.toLowerCase();
	var data = fs.readFileSync('./places.json');
	var places = JSON.parse(data);
	if (places[name]) {
		res.json(places[name]);
	} else {
		res.send("Place not found");
	}
}

//Endpoint for adding a place
app.post('/places/add', addPlace);

function addPlace(req, res) {
	var newPlace = req.body;
	if (newPlace.name) {
		fs.readFile('places.json', function (err, data) {
			var places = JSON.parse(data);
			places[newPlace.name] = { id: nanoid(5), name: newPlace.name, address: newPlace.address, website: newPlace.website, kitchen: newPlace.kitchen, liquids: newPlace.liquids, categories: newPlace.categories };
			fs.writeFile('places.json', JSON.stringify(places), (err) => {
				if (err) {
					throw err
				}
				console.log(newPlace.name + " has been added"); //if success then console.log this sentence
			});
		});
		res.json(newPlace); //send response to client with newUser information
	} else {
		res.send('Failed to add place'); // if username, email and pass are NOT truthy (are missing) send response to client with this sentence
		throw new Error('Failed to add place'); //and throw new error in the backend
	}
}

//Endpoint for editing a place
app.put('/places/:name', editPlace);

function editPlace(req, res) {
    var placeName = req.params.name;
	console.log("'" + placeName + "'");
	var updatedPlaceData = req.body;
	console.log(updatedPlaceData);
    if (placeName) {
        fs.readFile('places.json', function (err, data) {
            var places = JSON.parse(data);
            //suche place mit dem namen placeName // gib das Objekt aus dem Array und überschreibe die Daten 
			// var placeToUpdate = places[placeName];
			//send this data to editPlace (redirect)???
			
			//update object with new values
			places[placeName].name = updatedPlaceData.name; 
			places[placeName].address = updatedPlaceData.address; 
			places[placeName].website = updatedPlaceData.website;
			places[placeName].kitchen = updatedPlaceData.kitchen;
			places[placeName].liquids = updatedPlaceData.liquid;
			places[placeName].categories = updatedPlaceData.categories;
			
			//befülle das Formular mit den daten
			//on save überschreibe place mit dem namen placeName mit neuen daten
            fs.writeFile('places.json', JSON.stringify(places), (err) => {
                if (err) {
                    throw err
                }
            });
            console.log(placeName + " has been edited");
        });
        res.json(placeName); 
    } else {
        res.send('Failed to edit place'); 
        throw new Error('Failed to edit place'); 
    }

}

//Endpoint for deleting a place
app.delete('/places/:name', deletePlace);

function deletePlace(req, res) {
    var placeName = req.params.name;

    if (placeName) {
        fs.readFile('places.json', function (err, data) {
            var places = JSON.parse(data);
            delete places[placeName];
            fs.writeFile('places.json', JSON.stringify(places), (err) => {
                if (err) {
                    throw err
                }
            });
            console.log(placeName + " has been deleted");
        });
        res.json(placeName); 
    } else {
        res.send('Failed to delete place'); 
        throw new Error('Failed to delete place'); 
    }

}



//Endpoint for user registration

const registerUser = (req, res) => {
	var newUser = req.body; //get user object from the request body and save it to newUser
	if (newUser.username && newUser.email && newUser.pass) { //if username, email and pass are truthy ...

		fs.readFile('users.json', async (err, data) => { // ...read existing users data from users.js..
			var users = JSON.parse(data); // ...parse that data to a JS object and save it to users...

			//check if user exists, if yes set userIsNew to false
			let userIsNew = true;

			users.forEach(item => {
				if (item.email == newUser.email) {
					userIsNew = false;
				}
			})

			if (userIsNew) {
				newUser.admin = false; //... all users are false at the beginning...
				newUser.id = nanoid(5);
				await bcrypt.hash(newUser.pass, 8).then(hash => {
					if (hash) {
						newUser.pass = hash;
					} else {
						//todo smth if hash not valid
					}
				}).catch(err => console.log(err))

				users.push(newUser);//...push newUser to users array...

				fs.writeFile('users.json', JSON.stringify(users), (err) => { //stringify users (onverts a JavaScript value to a JSON string) and write it to users.json file
					if (err) { //if there is an error throw error
						throw err
					}
					console.log(newUser.username + " has been added"); //if success then console.log this sentence
				});
				newUser.ok = true; // wurde angelegt
				console.log(newUser)
				res.json(newUser); //send response to client with newUser information
			} else {
				// res.status(404);
				// res.send('User already exists'); 
				// throw new Error('User already exists');
				res.json({ok:false});
			};
		});
	
	} else {
		res.send('Failed to add user - missing data'); // if username, email and pass are NOT truthy (are missing) send response to client with this sentence
		throw new Error('Failed to add user - missing data'); //and throw new error in the backend
	}
}
app.post('/user', registerUser);

//Endpoint for user login
app.post('/login', loginUser);

function loginUser(req, res) {
	var userData = req.body;
	if (userData.email && userData.pass) {
		fs.readFile('users.json', function (err, data) {
			var users = JSON.parse(data);

			//find user by email	
			const findUserByEmail = (email) => {
				return users.find(user => email === user.email);
			}

			let foundUser = findUserByEmail(userData.email);
	console.log(foundUser);

			if (foundUser) { 
				// bcrypt.compare(userData.pass, foundUser.pass).then(function(result) {
				// 	res.json(JSON.stringify(result)); 
				// 	// result true or false
				bcrypt.compare(userData.pass, foundUser.pass).then(
				res.json(JSON.stringify(foundUser)));

			} else {
				console.log("didn't find user");
				throw new Error('didnt find user in database');
			}
		});
	} else {
		console.log("failed to log in");
		throw new Error('no valid data found in request');
	}
}

