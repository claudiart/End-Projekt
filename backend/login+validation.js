//let $ = require( 'jquery' );

let newUser = {};
randomNick = '';


$('#btnProfile').on('click', function(e) {
  e.preventDefault();
    getUserValues();

  if ( newUser.vorname == '' || newUser.nachname == '' || newUser.passwort == '' || newUser.server == '') {
    console.log('Alle Felder ausfüllen..!')
    // Validation
    if ( newUser.vorname == '' ) {
      $('#vorname').addClass('is-invalid');
    } 
    if ( newUser.nachname == '' ) {
      $('#nachname').addClass('is-invalid');
    } 
    if ( newUser.passwort == '' ) {
      $('#passwort').addClass('is-invalid');
    }

  } else {
    if ( newUser.nickname == '' ) {
      randomNick = newUser.vorname+'_'+ Math.floor((Math.random() * 1000) + 100);
      $('#nickname').val(randomNick);
      newUser.nickname = randomNick;
    }
    // Speicher des neuen Users
    saveUser();
    console.log('gespeichert', newUser);
  }

}) // onclick

// Werte des Users speichern
function getUserValues() {
  newUser = {
    vorname: $('#vorname').val(),
    nachname: $('#nachname').val(),
    nickname: $('#nickname').val(),
    passwort: $('#pwd').val(),
    server: $('#server').val()
  }
} // getUserValues()

$( '#bilduploader' ).on( 'submit', function(e) {
  e.preventDefault();

  var formData = new FormData();
  formData.append('photo', $('#photo')[0].files[0]);

  $.ajax({
    url:'http://localhost:3000/upload',
    method:'post',
    data:formData,
    processData: false,  
    contentType: false,
    success:function(res) {
      $( '#userImg' ).attr('src', 'http://localhost:5001/images/'+res )
    }
  });
})

// User-Daten an Server schicken
function saveUser() {
  $.ajax({
    url:newUser.server,
    method:'post',
    data:JSON.stringify({
      vorname: newUser.vorname,       
      nachname: newUser.nachname,   
      nickname: newUser.nickname,
      passwort: newUser.passwort,
      server: newUser.server
    }),
    contentType:'application/json',
    success:function( response ) {    
      console.log(response);
      $('#vorname').val('');
      $('#nachname').val('');
      $('#nickname').val('');
      $('#pwd').val('');
      $('#server').val('');

    },
    error:function() {
      console.log( 'XHR Error' );
    }
  }) // ajax 

} // saveUser()

/////////////////////////////////////////////////////////////////////////////

$( '#add form' ).on( 'submit', e => {
    e.preventDefault();

    let neuerUser = {
        name:$( '#username' ).val(),
        email:$( '#email' ).val(),
        pass:$( '#pass' ).val()
    }

    $( '.is-invalid' ).removeClass( 'is-invalid' );
    if ( neuerUser.name == '' ) {
        $( '#username' ).addClass( 'is-invalid' );
    }
    if ( neuerUser.email.length < 7 || neuerUser.email.indexOf( '@' ) == -1 ) {
        $( '#email' ).addClass( 'is-invalid' );
    }
    if ( neuerUser.pass.length < 6 ) {
        $( '#pass' ).addClass( 'is-invalid' );
    }
    if ( $('.is-invalid').length == 0 ) {
        $( '#add button' ).prop( 'disabled', true ); // damit man nicht zweimal klicken kann
        $.ajax({
            url:'/user', // Daten über URL schicken od. als Query-Paramter (GET-Params)
            method:'post', 
            
            //JSON
            data: JSON.stringify( neuerUser ), // '{"name":"Alex",...}'
            contentType:'application/json',
            
            //FormData
            //data:neuerUser,

            success:( res )=>{
               if ( res.status == 'success' ) {
                   // Meldung ausgeben "User wurde gespeichert"
                   $( '#add input' ).val('');
                   $( '#add button' ).prop( 'disabled', false );
               }                 
            },
            error:()=>{
                console.log( 'Request Error' );
            }
        });
}