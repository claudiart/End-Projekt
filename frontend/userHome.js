//fetch all places from backend

var ignoreFilter = true;

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
  // console.log("isVisiblePlace: " + ignoreFilter);
  // if (ignoreFilter) return true;
  // console.log(place);
  var isPlaceVisible = false;

  const allKitchens = ["fireland"];

  allKitchens.forEach((kitchen) => {
    if (place.kitchen.includes(kitchen)) {
      isPlaceVisible = true;
    }
  });

  const allLiquids = ["cocktail"];

  allLiquids.forEach((liquid) => {
    if (place.liquids.includes(liquid)) {
      isPlaceVisible = true;
    }
  });

  const allCategories = ["dddollar"];

  allCategories.forEach((category) => {
    if (place.categories.includes(category)) {
      isPlaceVisible = true;
    }
  });
  // console.log("isVisiblePlace: RETURN FALSE");
  console.log(isPlaceVisible);
  return isPlaceVisible;
};

const renderPlaces = (data) => {
  // console.log("RenderPlaces: " + ignoreFilter);
  // console.log("RenderPlaces: " + data);
  for (var place in data) {
    // console.log("RenderPlaces: " + place);
    if (isVisiblePlace(data[place])) {
      // console.log(place + " is visible");
      $("#places").append(renderPlace(data[place]));
    } else {
      // console.log(place + " is not visible");
    }
  }
};

//find filtered places
// const filterPlaces = (e) => {
//   e.preventDefault();
//   console.log(e.target.id);
//   console.log(e.target.className);
//   fetchPlaces()
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       let filteredPlaces = {};
//       for (let i in places) {
//         if ($("#cocktail").is(":checked")) {
//           // filteredPlaces = places[i];
//         }
//       }
//       renderPlaces(filteredPlaces);
//     });
//   // $("#-tBHZ").addClass("d-none");
// };

const resetFilter = () => {
  ignoreFilter = true;
  location.reload();
};

$("#apply").on("click", fetchPlaces);
$("#reset").on("click", resetFilter);
$("#showall").on("click", fetchPlaces);
