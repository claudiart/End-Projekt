const getUsers = (e) => {
    e.preventDefault();


    let username = $('#username').val();
    let email = $('#email').val();
    let pass = $('#pass').val();
    console.log('ok frontend');

    fetch(`/user`, {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ username: username, email: email, pass: pass })
    }).then((res) => res.json).then(res => res.json)


    //  request = $.ajax({
    //         url:'/user',
    //         method:'POST', 
    //         data: JSON.stringify( newUser ), 
    //         contentType:'application/json',


    // success:( res )=>{
    //    if ( res.status == 'success' ) {
    //        console.log( 'User wurde gespeichert' );
    //    }                 
    // },
    // error:()=>{
    //     console.log( 'Request Error' );
    // }
    // });
    // request.done(() => console.log("we made it"));
    // request.fail(() => console.log("we made it NOT"));

};
$('#register').on('click', getUsers)