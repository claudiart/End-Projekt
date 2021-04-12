const http = require("http");
const ss1Redirect = require("heroku-ssl-redirect");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const hbs = require("hbs");

app.use(ss1Redirect.default());
app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "views");
const partialsPath = path.join(__dirname, "frontend/partials");
app.set("views", viewsPath);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "frontend")));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
hbs.registerPartials(partialsPath);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server Start at the Port " + PORT));

//render login on start page
app.get("/", (req, res) => {
  res.render("login");
});

//render login on register page
app.get("/register", (req, res) => {
  res.render("register");
});

//render userHome on user page
app.get("/user", (req, res) => {
  res.render("../frontend/userHome");
});

//render adminHome on admin page
app.get("/admin", (req, res) => {
  res.render("adminHome");
});

//render addPlace on admin/add page
app.get("/admin/add", (req, res) => {
  res.render("addPlace");
});

//=================================
//API ENDPOINTS
//===================================

//Endpoint for user login
app.post("/login", loginUser);

function loginUser(req, res) {
  let userData = req.body;
  if (userData.email && userData.pass) {
    fs.readFile("users.json", function (err, data) {
      let users = JSON.parse(data);
      //find user by email function
      const findUserByEmail = (email) => {
        return users.find((user) => email === user.email);
      };

      let foundUser = findUserByEmail(userData.email); //call function findUserByEmail and save the data to foundUser

      if (foundUser) {
        bcrypt.compare(userData.pass, foundUser.pass, (err, result) => {
          if (err || !result) {
            res.status(403).json({ message: "wrong password" }); //sent error to frontend
          } else if (result) {
            res.json(JSON.stringify(foundUser));
          }
        });
      } else {
        res
          .status(403)
          .json({ message: "this e-mail address is not registered" });
      }
    });
  } else {
    throw new Error("no valid data found in request");
  }
}

//API Endpoint for user registration
app.post("/user", registerUser);

function registerUser(req, res) {
  var newUser = req.body; //get user object from the request body and save it to newUser
  if (newUser.username && newUser.email && newUser.pass) {
    //if username, email and pass are truthy ...

    fs.readFile("users.json", async (err, data) => {
      // ...take all existing users from users.js..
      let users = JSON.parse(data); // ...parse that data to a JS object and save it to users...

      let userIsNew = true;
      //check if user exists, if yes set userIsNew to false
      users.forEach((user) => {
        if (user.email === newUser.email) {
          userIsNew = false;
        }
      });

      if (userIsNew) {
        newUser.admin = false; //add admin and set it to false, because all users are false at the beginning
        newUser.id = nanoid(5); //add unique id to the user
        await bcrypt
          .hash(newUser.pass, 8)
          .then((hash) => {
            newUser.pass = hash;
          })
          .catch((err) => console.log(err));

        users.push(newUser); //...push newUser to users array.

        fs.writeFile(
          "users.json",
          JSON.stringify(users), //stringify users (converts a JavaScript value to a JSON string) and write it to users.json file
          (err) => {
            if (err) {
              //if there is an error throw error
              throw err;
            }
            console.log(newUser.username + " has been added"); //if success then console.log this sentence
          }
        );
        newUser.ok = true; // user is registered
        res.json(newUser); //send response to client with newUser information
      } else {
        res.json({ ok: false });
      }
    });
  } else {
    res.send("Failed to add user - missing data"); // if username, email and pass are NOT truthy (are missing) send response to client with this sentence
    throw new Error("Failed to add user - missing data"); //and throw new error in the backend
  }
}

//API Endpoint for editing place by id
app.get("/admin/edit/:id", (req, res) => {
  var placeId = req.params.id;
  var data = fs.readFileSync("./places.json");
  var places = JSON.parse(data);
  for (let i in places) {
    if (places[i].id == placeId) {
      var place = places[i];
    }
  }
  res.render("editPlace", {
    place,
  });
});

//API Endpoint for getting all places
app.get("/places/:userid", getAllPlaces);

function getAllPlaces(req, res) {
  var data = fs.readFileSync("places.json");
  var places = JSON.parse(data);
  if (places) {
    var userId = req.params.userid;
    var data = fs.readFileSync("users.json");
    var users = JSON.parse(data);
    //find user by id
    const findUserById = (id) => {
      return users.find((user) => id === user.id);
    };
    const foundUser = findUserById(userId);
    const usersSavedPlaces = foundUser.savedplaces;

    if (usersSavedPlaces) {
      for (let i in places) {
        if (usersSavedPlaces.includes(places[i].id)) {
          places[i].isFavorite = true;
        } else {
          places[i].isFavorite = false;
        }
      }
    }
    res.json(places);
  } else {
    res.send("No places found");
  }
}

//Endpoint for adding a place
app.post("/places/add", addPlace);

function addPlace(req, res) {
  var newPlace = req.body;
  if (newPlace.name) {
    fs.readFile("places.json", function (err, data) {
      var places = JSON.parse(data);
      const id = nanoid(5);
      places[id] = {
        id,
        name: newPlace.name,
        address: newPlace.address,
        website: newPlace.website,
        categories: newPlace.categories,
      };
      fs.writeFile("places.json", JSON.stringify(places), (err) => {
        if (err) {
          throw err;
        }
        console.log(newPlace.name + " has been added"); //if success then console.log this sentence
      });
    });
    res.json(newPlace); //send response to client with newUser information
  } else {
    res.send("Failed to add place"); // if username, email and pass are NOT truthy (are missing) send response to client with this sentence
    throw new Error("Failed to add place"); //and throw new error in the backend
  }
}

//Endpoint for editing a place by id
app.put("/places/:id", editPlace);

function editPlace(req, res) {
  var placeId = req.params.id;
  var updatedPlaceData = req.body;
  console.log(updatedPlaceData);
  if (placeId) {
    fs.readFile("places.json", function (err, data) {
      var places = JSON.parse(data);

      //update object with new values
      places[placeId].name = updatedPlaceData.name;
      places[placeId].address = updatedPlaceData.address;
      places[placeId].website = updatedPlaceData.website;
      places[placeId].categories = updatedPlaceData.categories;

      //befülle das Formular mit den daten

      //on save überschreibe place mit dem namen placeId mit neuen daten
      fs.writeFile("places.json", JSON.stringify(places), (err) => {
        if (err) {
          throw err;
        }
      });
      console.log("Place with id" + placeId + " has been edited");
    });
    res.json(placeId);
  } else {
    res.send("Failed to edit place");
    throw new Error("Failed to edit place");
  }
}

//Endpoint for deleting a place
app.delete("/places/:id", deletePlace);

function deletePlace(req, res) {
  var placeId = req.params.id;

  if (placeId) {
    fs.readFile("places.json", function (err, data) {
      var places = JSON.parse(data);
      for (let i in places) {
        if (places[i].id == placeId) {
          delete places[i];
          break;
        }
      }
      fs.writeFile("places.json", JSON.stringify(places), (err) => {
        if (err) {
          throw err;
        }
      });
      console.log(placeId + " has been deleted");
    });
    res.json(placeId);
  } else {
    res.send("Failed to delete place");
    throw new Error("Failed to delete place");
  }
}

//Endpoint for saving a place id in user
app.post("/places/:placeid/:userid", savePlace);

function savePlace(req, res) {
  var placeId = req.params.placeid;
  var userId = req.params.userid;

  if (placeId && userId) {
    fs.readFile("users.json", function (err, data) {
      var users = JSON.parse(data);
      //find user by id
      const findUserById = (id) => {
        return users.find((user) => id === user.id);
      };
      const foundUser = findUserById(userId);

      const saved = foundUser.savedplaces ? [...foundUser.savedplaces] : []; //if the user already has saved places then spread this array and save it to saved. Otherwise just save empty array to saved.
      saved.push(placeId); //push placeId to savedplaces
      foundUser.savedplaces = saved; //add saved to the users savedplaces
      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
          throw err;
        }
      });
      console.log(placeId + " has been saved");
      res.json(saved);
    });
  } else {
    res.send("Failed to save place");
    throw new Error("Failed to save place");
  }
}

//Endpoint for removing a place id from user
app.delete("/places/:placeid/:userid", unsavePlace);

function unsavePlace(req, res) {
  var placeId = req.params.placeid;
  var userId = req.params.userid;

  if (placeId && userId) {
    fs.readFile("users.json", function (err, data) {
      var users = JSON.parse(data);
      //find user by id
      const findUserById = (id) => {
        return users.find((user) => id === user.id);
      };
      const foundUser = findUserById(userId);

      let saved = foundUser.savedplaces ? [...foundUser.savedplaces] : [];
      saved = saved.filter((place) => place != placeId);
      foundUser.savedplaces = saved; //add saved to the users savedplaces
      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
          throw err;
        }
      });
      console.log(placeId + " has been removed");
      res.json(saved);
    });
  } else {
    res.send("Failed to remove place");
    throw new Error("Failed to remove place");
  }
}
