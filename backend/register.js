const getUsers = () => {

    let newUser = {
        username:$( '#username' ).val(),
        email:$( '#email' ).val(),
        pass:$( '#pass' ).val()
    };
    console.log('ok frontend');

     request = $.ajax({
            url:'/user',
            method:'post', 
            data: JSON.stringify( newUser ), 
            contentType:'application/json',

           
            // success:( res )=>{
            //    if ( res.status == 'success' ) {
            //        console.log( 'User wurde gespeichert' );
            //    }                 
            // },
            // error:()=>{
            //     console.log( 'Request Error' );
            // }
        });
        request.done(() => console.log("we made it"));
        request.fail(() => console.log("we made it NOT"));

};