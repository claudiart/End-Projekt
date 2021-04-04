//fetch all places from backend

// var ignoreFilter = true;

const fetchPlaces = () => {
  fetch(`/places`, {
    method: "GET",
    headers: { "content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      renderPlaces(data);
    });
};

const renderPlace = (place) => {
  const liquids = place.liquids.length > 0 ? place.liquids : "";
  const kitchen = place.kitchen.length > 0 ? place.kitchen : "";

  return `
          <div id="${place.id}" class="col-md-6 col-lg-3 mb-3 ">
              <div class="content col-12 rounded shadow text-dark pt-3 pb-3">
                  <p class="text-dark font-weight-bold">${place.name}</p>
                  <p class="mt-3 mb-0">${
                    place.address.streetAddress +
                    ", " +
                    place.address.postalCode +
                    " " +
                    place.address.city
                  }</p>
                  <a href="${place.website}">${place.website}</a>
                  <p class="mb-0">${liquids}</p>
                  <p class="mb-0">${kitchen}</p>
              </div>
          </div>
          `;
};

const isVisiblePlace = (place) => {
  var isPlaceVisible = false;

  let checkedCategories = [];
  let checkedKitchen = [];
  let checkedLiquids = [];

  if ($("#friends").is(":checked")) {
    checkedCategories.push("friends");
  }
  if ($("#meeting").is(":checked")) {
    checkedCategories.push("meeting");
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
    checkedKitchen.push("around here");
  }
  if ($("#fromthesea").is(":checked")) {
    checkedKitchen.push("from the sea");
  }
  if ($("#fireland").is(":checked")) {
    checkedKitchen.push("fireland");
  }
  if ($("#bites").is(":checked")) {
    checkedKitchen.push("bites");
  }
  if ($("#bistrofrancais").is(":checked")) {
    checkedKitchen.push("bistro francais");
  }
  if ($("#cucinaitaliana").is(":checked")) {
    checkedKitchen.push("cucina italiana");
  }
  if ($("#farawayasia").is(":checked")) {
    checkedKitchen.push("faraway asia");
  }
  if ($("#plantbased").is(":checked")) {
    checkedKitchen.push("plant-based");
  }
  if ($("#streetfood").is(":checked")) {
    checkedKitchen.push("street-food");
  }
  if ($("#hummus").is(":checked")) {
    checkedKitchen.push("hummus & co");
  }
  if ($("#fusion").is(":checked")) {
    checkedKitchen.push("fusion");
  }
  if ($("#sweettooth").is(":checked")) {
    checkedKitchen.push("sweettooth");
  }

  if ($("#wine").is(":checked")) {
    checkedLiquids.push("wine");
  }
  if ($("#cocktail").is(":checked")) {
    checkedLiquids.push("cocktail");
  }
  if ($("#beer").is(":checked")) {
    checkedLiquids.push("beer");
  }
  if ($("#coffee").is(":checked")) {
    checkedLiquids.push("coffee");
  }

  checkedKitchen.forEach((kitchen) => {
    if (place.kitchen.includes(kitchen)) {
      isPlaceVisible = true;
    }
  });

  checkedLiquids.forEach((liquid) => {
    if (place.liquids.includes(liquid)) {
      isPlaceVisible = true;
    }
  });

  checkedCategories.forEach((category) => {
    if (place.categories.includes(category)) {
      isPlaceVisible = true;
    }
  });

  // if (ignoreFilter) {
  //   isPlaceVisible = true;
  // }

  return isPlaceVisible;
};

const renderPlaces = (data) => {
  for (var place in data) {
    if (isVisiblePlace(data[place])) {
      $("#places").append(renderPlace(data[place]));
    }
  }
};

// const resetFilter = () => {
//   ignoreFilter = false;
// };

// const showAllPlaces = () => {
//   ignoreFilter = true;
// };

$("#apply").on("click", fetchPlaces);
// $("#reset").on("click", resetFilter);
// $("#showall").on("click", showAllPlaces);
