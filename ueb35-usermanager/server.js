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
const E = require( 'events' );
let userEvent = new E();
const FILE = './data/user.json';

userEvent.on( 'read', ( callback ) => { 
    fs.readFile( FILE, (err, data ) => {
        if ( !err ) {
            try {
                data = JSON.parse(data);
            } catch(e) {
                data = {users:[]}; // wenn user.json kaputt od. leer ist
            }
            callback(data);
        }
    })
})
userEvent.on( 'write', ( data, callback ) => { 
    fs.writeFile( FILE, JSON.stringify( data ), (err) => {
        if (!err) {
           callback();
        }
    }) // writeFile
})

app.use( (req,res,next) => {
    res.set({ 'Content-Type': 'application/json' }); // alle schicken JSON zurück
    next();
});

app.post( '/user', (req,res) => {
    let neuerUser = req.body;

    /*
    loadUsers.then( addUser ).then( updateUsers ).then( responseSend )
    */

    userEvent.emit( 'read', (data)=>{
        data.users.push( neuerUser );
        userEvent.emit( 'write', data, ()=> {
            res.status(200)
                .end( JSON.stringify( {status:'success'} ) );
        })
    })
}) // app.post

// User löschen
app.delete( '/user/:id', (req,res) => {})

// User editieren
app.put( '/user/:id', (req,res)=> {})

// User abfragen
app.get( '/user', (req,res)=> {
    userEvent.emit( 'read', (data)=>{
        res.status(200)
            .end( JSON.stringify( data ) );   
    });
})

//app.get( '/user/:id', (req,res)=> {})


