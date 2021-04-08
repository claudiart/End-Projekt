const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const hbs = require("hbs");

app.set("view engine", "hbs"); // hbs dateien statt html
const viewsPath = path.join(__dirname, "views"); // __dirname und views zusammenfassen als String
const partialsPath = path.join(__dirname, "../frontend/partials");
app.set("views", viewsPath); // views in ViewsPath
app.use(express.static(path.join(__dirname, "public"))); //
app.use(express.static(path.join(__dirname, "../frontend"))); //

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true })); // Middleware
app.use(bodyParser.json());
hbs.registerPartials(partialsPath);

const PORT = 3000;
app.listen(PORT, () => console.log("Server Start at the Port " + PORT));

//render register on start page (change this later to login)
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// app.get("/user", (req, res) => {
//   res.render("../../frontend/userHome");
// });

app.get("/admin", (req, res) => {
  res.render("adminHome");
});

app.get("/admin/add", (req, res) => {
  res.render("addPlace");
});

//Endpoint for editing place by id
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

//Endpoint for getting all places
app.get("/places", getAllPlaces);

function getAllPlaces(req, res) {
  var data = fs.readFileSync("./places.json");
  var places = JSON.parse(data);
  if (places) {
    res.json(places);
  } else {
    res.send("No places found");
  }
}

//Endpoint for getting a single place by name
app.get("/places/:place", searchPlace);

function searchPlace(req, res) {
  var name = req.params.place.toLowerCase();
  var data = fs.readFileSync("./places.json");
  var places = JSON.parse(data);
  if (places[name]) {
    res.json(places[name]);
  } else {
    res.send("Place not found");
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
  if (placeId) {
    //get places from places.json and save them in var places
    fs.readFile("places.json", function (err, data) {
      var places = JSON.parse(data);

      //update place with placeId with new values from updatedPlaceData
      places[placeId].name = updatedPlaceData.name;
      places[placeId].address = updatedPlaceData.address;
      places[placeId].website = updatedPlaceData.website;
      places[placeId].categories = updatedPlaceData.categories;

      //save places to places.json
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

//Endpoint for user registration

const registerUser = (req, res) => {
  var newUser = req.body; //get user object from the request body and save it to newUser
  if (newUser.username && newUser.email && newUser.pass) {
    //if username, email and pass are truthy ...

    fs.readFile("users.json", async (err, data) => {
      // ...read existing users data from users.js..
      var users = JSON.parse(data); // ...parse that data to a JS object and save it to users...

      //check if user exists, if yes set userIsNew to false
      let userIsNew = true;

      users.forEach((item) => {
        if (item.email == newUser.email) {
          userIsNew = false;
        }
      });

      if (userIsNew) {
        newUser.admin = false; //... all users are false at the beginning...
        newUser.id = nanoid(5);
        await bcrypt
          .hash(newUser.pass, 8)
          .then((hash) => {
            if (hash) {
              newUser.pass = hash;
            } else {
              //todo smth if hash not valid
            }
          })
          .catch((err) => console.log(err));

        users.push(newUser); //...push newUser to users array...

        fs.writeFile("users.json", JSON.stringify(users), (err) => {
          //stringify users (onverts a JavaScript value to a JSON string) and write it to users.json file
          if (err) {
            //if there is an error throw error
            throw err;
          }
          console.log(newUser.username + " has been added"); //if success then console.log this sentence
        });
        newUser.ok = true; // wurde angelegt
        console.log(newUser);
        res.json(newUser); //send response to client with newUser information
      } else {
        res.json({ ok: false });
      }
    });
  } else {
    res.send("Failed to add user - missing data"); // if username, email and pass are NOT truthy (are missing) send response to client with this sentence
    throw new Error("Failed to add user - missing data"); //and throw new error in the backend
  }
};

app.post("/user", registerUser);

//Endpoint for user login
app.post("/login", loginUser);

function loginUser(req, res) {
  var userData = req.body;
  if (userData.email && userData.pass) {
    fs.readFile("users.json", function (err, data) {
      var users = JSON.parse(data);

      //find user by email
      const findUserByEmail = (email) => {
        return users.find((user) => email === user.email);
      };

      let foundUser = findUserByEmail(userData.email);

      if (foundUser) {
        bcrypt
          .compare(userData.pass, foundUser.pass)
          .then(res.json(JSON.stringify(foundUser)));
      } else {
        console.log("didn't find user");
        throw new Error("didnt find user in database");
      }
    });
  } else {
    console.log("failed to log in");
    throw new Error("no valid data found in request");
  }
}

//Endpint for single user
app.get("/user/:username", (req, res) => {
  var username = req.params.username;

  fs.readFile("users.json", function (err, data) {
    var users = JSON.parse(data);

    //find user by username
    const findUserByUsername = (username) => {
      return users.find((user) => {
        user.username === username;
        console.log(username);
      });
    };

    //WHY IS foundUser undefined?
    let foundUser = findUserByUsername(username);
    console.log("found user " + JSON.stringify(foundUser));

    if (foundUser.admin === false) {
      res.render("../../frontend/userHome", {
        user: foundUser,
      });
    }
  });
});
