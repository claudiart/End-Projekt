//Prefill the input fields

const saveChanges = (e) => {
  e.preventDefault();

  //get all (new) values from the form
  let id = $("#placeId").val();

  let name = $("#name").val();
  let street = $("#street").val();
  let number = $("#number").val();
  let postcode = $("#postcode").val();
  let city = $("#city").val();
  let website = $("#website").val();

  let checkedCategories = [];

  if ($("#friends").is(":checked")) {
    checkedCategories.push("friends");
  }
  if ($("#business").is(":checked")) {
    checkedCategories.push("business");
  }
  if ($("#date").is(":checked")) {
    checkedCategories.push("date");
  }
  if ($("#family").is(":checked")) {
    checkedCategories.push("family");
  }
  if ($("#breakfast").is(":checked")) {
    checkedCategories.push("breakfast");
  }
  if ($("#brunch").is(":checked")) {
    checkedCategories.push("brunch");
  }
  if ($("#lunch").is(":checked")) {
    checkedCategories.push("lunch");
  }
  if ($("#dinner").is(":checked")) {
    checkedCategories.push("dinner");
  }
  if ($("#latesnack").is(":checked")) {
    checkedCategories.push("latesnack");
  }
  if ($("#patisserie").is(":checked")) {
    checkedCategories.push("patisserie");
  }
  if ($("#bakery").is(":checked")) {
    checkedCategories.push("bakery");
  }
  if ($("#gelateria").is(":checked")) {
    checkedCategories.push("gelateria");
  }
  if ($("#highend").is(":checked")) {
    checkedCategories.push("highend");
  }
  if ($("#easygoing").is(":checked")) {
    checkedCategories.push("easygoing");
  }
  if ($("#between").is(":checked")) {
    checkedCategories.push("between");
  }
  if ($("#dollar").is(":checked")) {
    checkedCategories.push("dollar");
  }
  if ($("#ddollar").is(":checked")) {
    checkedCategories.push("ddollar");
  }
  if ($("#dddollar").is(":checked")) {
    checkedCategories.push("dddollar");
  }
  if ($("#aroundhere").is(":checked")) {
    checkedCategories.push("aroundhere");
  }
  if ($("#fromthesea").is(":checked")) {
    checkedCategories.push("fromthesea");
  }
  if ($("#fireland").is(":checked")) {
    checkedCategories.push("fireland");
  }
  if ($("#bites").is(":checked")) {
    checkedCategories.push("bites");
  }
  if ($("#bistrofrancais").is(":checked")) {
    checkedCategories.push("bistrofrancais");
  }
  if ($("#cucinaitaliana").is(":checked")) {
    checkedCategories.push("cucinaitaliana");
  }
  if ($("#farawayasia").is(":checked")) {
    checkedCategories.push("farawayasia");
  }
  if ($("#plantbased").is(":checked")) {
    checkedCategories.push("plantbased");
  }
  if ($("#streetfood").is(":checked")) {
    checkedCategories.push("streetfood");
  }
  if ($("#hummus").is(":checked")) {
    checkedCategories.push("hummus");
  }
  if ($("#fusion").is(":checked")) {
    checkedCategories.push("fusion");
  }
  if ($("#sweettooth").is(":checked")) {
    checkedCategories.push("sweettooth");
  }
  if ($("#wine").is(":checked")) {
    checkedCategories.push("wine");
  }
  if ($("#cocktail").is(":checked")) {
    checkedCategories.push("cocktail");
  }
  if ($("#beer").is(":checked")) {
    checkedCategories.push("beer");
  }
  if ($("#coffee").is(":checked")) {
    checkedCategories.push("coffee");
  }

  //save all values to updatedPlaceObject
  let updatedPlace = {
    name: name,
    address: {
      streetAddress: street,
      number: number,
      city: city,
      postalCode: postcode,
    },
    website: website,
    categories: checkedCategories,
  };

  // http request with PUT method
  fetch(`/places/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(updatedPlace), //send updatedPlace  object as body to backend
  })
    .then(alert("The place has been edited"))
    .catch((error) => {
      console.error("there was an error: ", error);
    });
};

$("#editplace").on("click", saveChanges);

$("#goback").on("click", function () {
  window.location.href = "/admin";
});
