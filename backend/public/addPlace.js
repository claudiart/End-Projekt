$( '#eat' ).on( 'change', function() {
    if ( $(this).is(':checked') ) {
        $( '#timeoftheday').show();
    } else {
        $( '#timeoftheday').hide();
    }
})

$( '#breakfast, #lunch, #brunch, #dinner, #latesnack' ).on( 'click', function() {
    if ( $(this).is(':checked') ) {
        $( '#cuisine').show();
    } else {
        $( '#cuisine').hide();
    }
})

$( '#sweettooth' ).on( 'click', function() {
    if ( $(this).is(':checked') ) {
        $( '#sweet').show();
    } else {
        $( '#sweet').hide();
    }
})

$( '#drink' ).on( 'change', function() {
    if ( $(this).is(':checked') ) {
        $( '#bars').show();
    } else {
        $( '#bars').hide();
    }
})