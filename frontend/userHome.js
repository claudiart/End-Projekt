//fetch all places from backend

// var ignoreFilter = true;

$("#searchbyfilter").on("click", function () {
  $("#filterBox").toggle();
});

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
  console.log(place.website);
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
                  <a href="${place.website}">${place.website.replace(
    "https://",
    ""
  )}</a>
              </div>
          </div>
          `;
};

const isVisiblePlace = (place) => {
  var isPlaceVisible = false;

  let checkedCategories = [];

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

  // checkedKitchen.forEach((kitchen) => {
  //   if (place.kitchen.includes(kitchen)) {
  //     isPlaceVisible = true;
  //   }
  // });

  // checkedLiquids.forEach((liquid) => {
  //   if (place.liquids.includes(liquid)) {
  //     isPlaceVisible = true;
  //   }
  // });

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
$("#reset").on("click", resetFilter);
// $("#showall").on("click", showAllPlaces);
