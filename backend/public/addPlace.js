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


const submitPlace = (e) => {
    e.preventDefault();

    let name = $("#name").val();
    let street = $("#street").val();
    let number = $("#number").val();
    let postcode = $("#postcode").val();
    let city = $("#city").val();

    fetch(`/places/add`, {
        method: "POST",
        headers: { "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ name: name, adress: {streetAddress: street, number: number, city: city, postalCode: postcode}}),
      }).then(response => response.json())
        .then((res) => res.json)
        .catch((error) => {
          console.error("there was an error: ", error);
          // showError();
        });
}

$("#submitplace").on("click", submitPlace);
