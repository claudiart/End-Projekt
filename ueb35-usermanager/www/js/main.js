$('.nav-tabs a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show');

    if ( $(this).attr('href') == '#edit' ) {
        $.ajax({
            url:'/user',
            method:'get',
            data:{}, // 0-99
            success:(res)=>{
                console.log(res);
                // alte entferne
                $( '#edit table tr + tr' ).remove(); // alle <tr> außer der ersten werden entfernt
                for ( let i in res.users ) {
                    $( '<tr>' )
                        .append( $( '<td>' ).html( 'ID???' ) )
                        .append( $( '<td>' ).html( res.users[i].name ) )
                        .append( $( '<td>' ).html( '..löschen/edit..') )
                        .appendTo( '#edit table' );
                }
            },
            error:()=>{
                console.log( 'Request Error' );  
            }
        })
    }

});

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

})