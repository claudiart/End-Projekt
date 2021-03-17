$('#eat').on('change', function () {
    if ($(this).is(':checked')) {
        $('#timeoftheday').show();
    } else {
        $('#timeoftheday').hide();
    }
})

$('#breakfast, #lunch, #brunch, #dinner, #latesnack').on('click', function () {
    if ($(this).is(':checked')) {
        $('#cuisine').show();
    } else {
        $('#cuisine').hide();
    }
})

$('#sweettooth').on('click', function () {
    if ($(this).is(':checked')) {
        $('#sweet').show();
    } else {
        $('#sweet').hide();
    }
})

$('#drink').on('change', function () {
    if ($(this).is(':checked')) {
        $('#bars').show();
    } else {
        $('#bars').hide();
    }
})


const submitPlace = (e) => {
    e.preventDefault();

    let name = $("#name").val();
    let street = $("#street").val();
    let number = $("#number").val();
    let postcode = $("#postcode").val();
    let city = $("#city").val();
    let friends = $("#friends").is(':checked');
    let meeting = $("#meeting").is(':checked');
    let business = $("#business").is(':checked');
    let date = $("#date").is(':checked');
    let family = $("#family").is(':checked');
    let eat = $("#eat").val();
    let drink = $("#drink").val();
    let breakfast = $("#breakfast").val();
    let brunch = $("#brunch").val();
    let lunch = $("#lunch").val();
    let dinner = $("#dinner").val();
    let latesnack = $("#latesnack").val();
    let aroundhere = $("#aroundhere").val();
    let fromthesea = $("#fromthesea").val();
    let fireland = $("#fireland").val();
    let bites = $("#bites").val();
    let bistrofrancais = $("#bistrofrancais").val();
    let cucinaitaliana = $("#cucinaitaliana").val();
    let farawayasia = $("#farawayasia").val();
    let plantbased = $("#plantbased").val();
    let streetfood = $("#streetfood").val();
    let hummus = $("#hummus").val();
    let fusion = $("#fusion").val();
    let sweettooth = $("#sweettooth").val();
    let patisserie = $("#patisserie").val();
    let bakery = $("#bakery").val();
    let gelateria = $("#gelateria").val();
    let wine = $("#wine").val();
    let cocktail = $("#cocktail").val();
    let beer = $("#beer").val();
    let coffee = $("#coffee").val();
    let highend = $("#highend").val();
    let easygoing = $("#easygoing").val();
    let between = $("#between").val();
    let dollar = $("#dollar").val();
    let ddollar = $("#ddollar").val();
    let dddollar = $("#dddollar").val();

    let checkedCategories = [];
    if ($("#friends").is(':checked')) {checkedCategories.push("friends")}

    let placeData = {
        name: name,
        address: {
            streetAddress: street,
            number: number,
            city: city,
            postalCode: postcode
        },
        categories: checkedCategories
    }

    fetch(`/places/add`, {
        method: "POST",
        headers: { "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(placeData),
    }).then(response => response.json())
        .catch((error) => {
            console.error("there was an error: ", error);
        });
}

$("#submitplace").on("click", submitPlace);
