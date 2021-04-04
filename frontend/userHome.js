//fetch all places from backend

const fetchPlaces = () =>
  fetch(`/places`, {
    method: "GET",
    headers: { "content-type": "application/json; charset=UTF-8" },
  });

fetchPlaces()
  .then((res) => res.json())
  .then((data) => {
    renderPlaces(data);
  });

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

const renderPlaces = (data) => {
  for (var place in data) {
    $("#places").append(renderPlace(data[place]));
  }
};

//find filtered places
const filterPlaces = (e) => {
  e.preventDefault();
  console.log(e.target.id);
  console.log(e.target.className);
  fetchPlaces()
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let filteredPlaces = {};
      for (let i in places) {
        if ($("#cocktail").is(":checked")) {
          // filteredPlaces = places[i];
        }
      }
      renderPlaces(filteredPlaces);
    });
  // $("#-tBHZ").addClass("d-none");
};

const resetFilter = () => {
  location.reload();
};

$("#apply").on("click", filterPlaces);
$("#reset").on("click", resetFilter);
