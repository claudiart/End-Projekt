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
    if ($("#meeting").is(':checked')) {checkedCategories.push("meeting")}
    if ($("#business").is(':checked')) {checkedCategories.push("business")}
    if ($("#date").is(':checked')) {checkedCategories.push("date")}
    if ($("#family").is(':checked')) {checkedCategories.push("family")}
    if ($("#eat").is(':checked')) {checkedCategories.push("eat")}
    if ($("#breakfast").is(':checked')) {checkedCategories.push("breakfast")}
    if ($("#brunch").is(':checked')) {checkedCategories.push("brunch")}
    if ($("#lunch").is(':checked')) {checkedCategories.push("lunch")}
    if ($("#dinner").is(':checked')) {checkedCategories.push("dinner")}
    if ($("#latesnack").is(':checked')) {checkedCategories.push("latesnack")}
    if ($("#aroundhere").is(':checked')) {checkedCategories.push("aroundhere")}
    if ($("#fromthesea").is(':checked')) {checkedCategories.push("fromthesea")}
    if ($("#fireland").is(':checked')) {checkedCategories.push("fireland")}
    if ($("#bites").is(':checked')) {checkedCategories.push("bites")}
    if ($("#bistrofrancais").is(':checked')) {checkedCategories.push("bistrofrancais")}
    if ($("#cucinaitaliana").is(':checked')) {checkedCategories.push("cucinaitaliana")}
    if ($("#farawayasia").is(':checked')) {checkedCategories.push("farawayasia")}
    if ($("#plantbased").is(':checked')) {checkedCategories.push("plantbased")}
    if ($("#streetfood").is(':checked')) {checkedCategories.push("streetfood")}
    if ($("#hummus").is(':checked')) {checkedCategories.push("hummus")}
    if ($("#fusion").is(':checked')) {checkedCategories.push("fusion")}
    if ($("#sweettooth").is(':checked')) {checkedCategories.push("sweettooth")}
    if ($("#patisserie").is(':checked')) {checkedCategories.push("patisserie")}
    if ($("#bakery").is(':checked')) {checkedCategories.push("bakery")}
    if ($("#gelateria").is(':checked')) {checkedCategories.push("gelateria")}
    if ($("#wine").is(':checked')) {checkedCategories.push("wine")}
    if ($("#cocktail").is(':checked')) {checkedCategories.push("cocktail")}
    if ($("#beer").is(':checked')) {checkedCategories.push("beer")}
    if ($("#coffee").is(':checked')) {checkedCategories.push("coffee")}
    if ($("#highend").is(':checked')) {checkedCategories.push("highend")}
    if ($("#easygoing").is(':checked')) {checkedCategories.push("easygoing")}
    if ($("#between").is(':checked')) {checkedCategories.push("between")}
    if ($("#dollar").is(':checked')) {checkedCategories.push("dollar")}
    if ($("#ddollar").is(':checked')) {checkedCategories.push("ddollar")}
    if ($("#dddollar").is(':checked')) {checkedCategories.push("dddollar")}


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
