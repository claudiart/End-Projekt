// Express 
// UI - Tabs
// Form Speichern
// Tabelle Daten ausgeben
const fs = require( 'fs' ); 
const express = require( 'express' );
const app = express();
const server = app.listen(5002, function() {
    console.log( 'Server läuft.' );
});

// Request-Log in Console (Apache like)
const morgan = require( 'morgan' );
app.use( morgan( ':url :method :status :remote-addr' ) );

app.use( express.static( 'www' ) );

const bp = require( 'body-parser' );
app.use( bp.json() ); // Daten als JSON im POST-Request

// Daten als Formdata
app.use( bp.urlencoded({extended:false}) );

// Endpoint: "user"
// neuer User hinzufügen

const FILE = './data/user.json';

app.post( '/user', (req,res) => {
    let neuerUser = req.body;
    // Daten speichern in JSON-File
    // 1. JSON Datei einlesen
    fs.readFile( FILE, (err, data ) => {
        if ( !err ) {
            try {
                data = JSON.parse(data);
            } catch(e) {
                data = {users:[]}; // wenn user.json kaputt od. leer ist
            }
            // 2. neuen User in den Array hinzufügen
            data.users.push( neuerUser );
            // 3. JSON Datei mit neuen Daten überschreiben
            fs.writeFile( FILE, JSON.stringify( data ), (err) => {
                if (!err) {
                    res.status(200)
                        .set({ 'Content-Type': 'application/json' })
                        .end( JSON.stringify( {status:'success'} ) );
                }
            }) // writeFile
        } // if
    }) // readFile    
}) // app.post

// User löschen
app.delete( '/user/:id', (req,res) => {})

// User editieren
app.put( '/user/:id', (req,res)=> {})

// User abfragen
app.get( '/user', (req,res)=> {})

//app.get( '/user/:id', (req,res)=> {})


