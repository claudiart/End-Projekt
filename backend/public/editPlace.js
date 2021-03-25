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


const handleEdit = (e) => {
    e.preventDefault();

    let name = $("#name").val();
    let street = $("#street").val();
    let number = $("#number").val();
    let postcode = $("#postcode").val();
    let city = $("#city").val();
    let website = $('#website').val();

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
    if ($("#patisserie").is(':checked')) {checkedCategories.push("patisserie")}
    if ($("#bakery").is(':checked')) {checkedCategories.push("bakery")}
    if ($("#gelateria").is(':checked')) {checkedCategories.push("gelateria")}
    if ($("#highend").is(':checked')) {checkedCategories.push("highend")}
    if ($("#easygoing").is(':checked')) {checkedCategories.push("easygoing")}
    if ($("#between").is(':checked')) {checkedCategories.push("between")}
    if ($("#dollar").is(':checked')) {checkedCategories.push("dollar")}
    if ($("#ddollar").is(':checked')) {checkedCategories.push("ddollar")}
    if ($("#dddollar").is(':checked')) {checkedCategories.push("dddollar")}


    let checkedKitchen = [];

    if ($("#aroundhere").is(':checked')) {checkedKitchen.push("around here")}
    if ($("#fromthesea").is(':checked')) {checkedKitchen.push("from the sea")}
    if ($("#fireland").is(':checked')) {checkedKitchen.push("fire & land")}
    if ($("#bites").is(':checked')) {checkedKitchen.push("bites")}
    if ($("#bistrofrancais").is(':checked')) {checkedKitchen.push("bistro francais")}
    if ($("#cucinaitaliana").is(':checked')) {checkedKitchen.push("cucina italiana")}
    if ($("#farawayasia").is(':checked')) {checkedKitchen.push("faraway asia")}
    if ($("#plantbased").is(':checked')) {checkedKitchen.push("plant-based")}
    if ($("#streetfood").is(':checked')) {checkedKitchen.push("street-food")}
    if ($("#hummus").is(':checked')) {checkedKitchen.push("hummus & co")}
    if ($("#fusion").is(':checked')) {checkedKitchen.push("fusion")}
    if ($("#sweettooth").is(':checked')) {checkedKitchen.push("sweettooth")}

    let checkedLiquids = []; 

    if ($("#wine").is(':checked')) {checkedLiquids.push("wine")}
    if ($("#cocktail").is(':checked')) {checkedLiquids.push("cocktail")}
    if ($("#beer").is(':checked')) {checkedLiquids.push("beer")}
    if ($("#coffee").is(':checked')) {checkedLiquids.push("coffee")}
  

    let updatedPlace = {
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

    //Fill in data from existing place????
    // $('#name').val('claudia');


    // http request with PUT method
    fetch(`/places/${name}`, {
        method: "PUT",
        headers: { "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(updatedPlace),
    }).then(alert("You are awesome"))
        .catch((error) => {
            console.error("there was an error: ", error);
        });
};

$("#editplace").on("click", handleEdit);