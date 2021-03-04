const getUsers = (e) => {
    e.preventDefault();


    let username = $('#username').val();
    let email = $('#email').val();
    let pass = $('#pass').val();

// validation 

$('.is-invalid').removeClass('is-invalid');
if (username == '') {
    $('#username').addClass('is-invalid');
}

if (email.length < 7 || email.indexOf( '@' ) == -1 ){
    $('#email').addClass('is-invalid');
}
if (pass.length < 6 ) {
    $('#pass').addClass('is-invalid');
}
if ( $('.is-invalid').length == 0 ) {
    $( '#register' ).prop( 'disabled', true ); // damit man nicht zweimal klicken kann


    fetch(`/user`, {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ username: username, email: email, pass: pass })
    }).then(res => res.json);


};
};
$('#register').on('click', getUsers)