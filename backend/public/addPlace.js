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
    let website = $('#website').val();
    let friends = $("#friends").is(':checked');
    let meeting = $("#meeting").is(':checked');
    let business = $("#business").is(':checked');
    let date = $("#date").is(':checked');
    let family = $("#family").is(':checked');
    let eat = $("#eat").is(':checked');
    let drink = $("#drink").is(':checked');
    let breakfast = $("#breakfast").is(':checked');
    let brunch = $("#brunch").is(':checked');
    let lunch = $("#lunch").is(':checked');
    let dinner = $("#dinner").is(':checked');
    let latesnack = $("#latesnack").is(':checked');
    let aroundhere = $("#aroundhere").is(':checked');
    let fromthesea = $("#fromthesea").is(':checked');
    let fireland = $("#fireland").is(':checked');
    let bites = $("#bites").is(':checked');
    let bistrofrancais = $("#bistrofrancais").is(':checked');
    let cucinaitaliana = $("#cucinaitaliana").is(':checked');
    let farawayasia = $("#farawayasia").is(':checked');
    let plantbased = $("#plantbased").is(':checked');
    let streetfood = $("#streetfood").is(':checked');
    let hummus = $("#hummus").is(':checked');
    let fusion = $("#fusion").is(':checked');
    let sweettooth = $("#sweettooth").is(':checked');
    let patisserie = $("#patisserie").is(':checked');
    let bakery = $("#bakery").is(':checked');
    let gelateria = $("#gelateria").is(':checked');
    let wine = $("#wine").is(':checked');
    let cocktail = $("#cocktail").is(':checked');
    let beer = $("#beer").is(':checked');
    let coffee = $("#coffee").is(':checked');
    let highend = $("#highend").is(':checked');
    let easygoing = $("#easygoing").is(':checked');
    let between = $("#between").is(':checked');
    let dollar = $("#dollar").is(':checked');
    let ddollar = $("#ddollar").is(':checked');
    let dddollar = $("#dddollar").is(':checked');

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
    // if ($("#aroundhere").is(':checked')) {checkedCategories.push("aroundhere")}
    // if ($("#fromthesea").is(':checked')) {checkedCategories.push("fromthesea")}
    // if ($("#fireland").is(':checked')) {checkedCategories.push("fireland")}
    // if ($("#bites").is(':checked')) {checkedCategories.push("bites")}
    // if ($("#bistrofrancais").is(':checked')) {checkedCategories.push("bistrofrancais")}
    // if ($("#cucinaitaliana").is(':checked')) {checkedCategories.push("cucinaitaliana")}
    // if ($("#farawayasia").is(':checked')) {checkedCategories.push("farawayasia")}
    // if ($("#plantbased").is(':checked')) {checkedCategories.push("plantbased")}
    // if ($("#streetfood").is(':checked')) {checkedCategories.push("streetfood")}
    // if ($("#hummus").is(':checked')) {checkedCategories.push("hummus")}
    // if ($("#fusion").is(':checked')) {checkedCategories.push("fusion")}
    // if ($("#sweettooth").is(':checked')) {checkedCategories.push("sweettooth")}
    if ($("#patisserie").is(':checked')) {checkedCategories.push("patisserie")}
    if ($("#bakery").is(':checked')) {checkedCategories.push("bakery")}
    if ($("#gelateria").is(':checked')) {checkedCategories.push("gelateria")}
    // if ($("#wine").is(':checked')) {checkedCategories.push("wine")}
    // if ($("#cocktail").is(':checked')) {checkedCategories.push("cocktail")}
    // if ($("#beer").is(':checked')) {checkedCategories.push("beer")}
    // if ($("#coffee").is(':checked')) {checkedCategories.push("coffee")}
    if ($("#highend").is(':checked')) {checkedCategories.push("highend")}
    if ($("#easygoing").is(':checked')) {checkedCategories.push("easygoing")}
    if ($("#between").is(':checked')) {checkedCategories.push("between")}
    if ($("#dollar").is(':checked')) {checkedCategories.push("dollar")}
    if ($("#ddollar").is(':checked')) {checkedCategories.push("ddollar")}
    if ($("#dddollar").is(':checked')) {checkedCategories.push("dddollar")}


    checkedKitchen = [];

    if ($("#aroundhere").is(':checked')) {checkedKitchen.push("aroundhere")}
    if ($("#fromthesea").is(':checked')) {checkedKitchen.push("fromthesea")}
    if ($("#fireland").is(':checked')) {checkedKitchen.push("fireland")}
    if ($("#bites").is(':checked')) {checkedKitchen.push("bites")}
    if ($("#bistrofrancais").is(':checked')) {checkedKitchen.push("bistrofrancais")}
    if ($("#cucinaitaliana").is(':checked')) {checkedKitchen.push("cucinaitaliana")}
    if ($("#farawayasia").is(':checked')) {checkedKitchen.push("farawayasia")}
    if ($("#plantbased").is(':checked')) {checkedKitchen.push("plantbased")}
    if ($("#streetfood").is(':checked')) {checkedKitchen.push("streetfood")}
    if ($("#hummus").is(':checked')) {checkedKitchen.push("hummus")}
    if ($("#fusion").is(':checked')) {checkedKitchen.push("fusion")}
    if ($("#sweettooth").is(':checked')) {checkedKitchen.push("sweettooth")}

    checkedLiquids = []; 

    if ($("#wine").is(':checked')) {checkedLiquids.push("wine")}
    if ($("#cocktail").is(':checked')) {checkedLiquids.push("cocktail")}
    if ($("#beer").is(':checked')) {checkedLiquids.push("beer")}
    if ($("#coffee").is(':checked')) {checkedLiquids .push("coffee")}

    let placeData = {
        name: name,
        address: {
            streetAddress: street,
            number: number,
            city: city,
            postalCode: postcode
        },
        website: website,  
        kitchen: checkedKitchen, 
        liquids: checkedLiquids,
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
