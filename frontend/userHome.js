
var user = sessionStorage.getItem("letseatuser");

if (!user || user == "") {
  window.location.href = "/";
}
user = JSON.parse(user);
$("#nameUser").html(user.username);

$("#logout").on("click", function () {
  sessionStorage.clear();
  window.location.href = "/";
});

$("#searchbyfilter").on("click", function () {
  $("#filterBox").toggle();
});

// F03
// http request with GET method to get all places 

const fetchPlaces = () => {
  fetch(`/places/${user.id}`, {
    method: "GET",
    headers: { "content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      renderPlaces(data);
    });
};

// Render all places on page load
fetchPlaces();

const renderPlace = (place, showButtonType, showButton) => {
  let buttonCode = "";
  if (showButton) {
    if (showButtonType) {
      buttonCode = `
            <button class="btn btn-lg btn-block mt-3 mb-3" onclick='handleSave("${place.id}")'>save</button>`;
    } else {
      buttonCode = `
            <button class="btn btn-lg btn-block mt-3 mb-3" onclick='handleUnsave("${place.id}")'>remove</button>`;
    }
  }

  return `
    <div id="${place.id}" class=" cards col-md-6 col-lg-3 mb-3 ">
      <div class="content col-12 rounded shadow text-dark pt-3 pb-3">
        <p class="placeName">${place.name}</p>
        <p class="address">${
          place.address.streetAddress +
          ", " +
          place.address.postalCode +
          " " +
          place.address.city
        }</p>
        <a class="website" href="${place.website}">${place.website.replace(
    "https://",
    ""
  )}</a>
        <br>
          ${buttonCode}
      </div>
  </div> `;
};

const isVisiblePlace = (place) => {
  var isPlaceVisible = true;

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

  checkedCategories.forEach((category) => {
    if (!place.categories.includes(category)) {
      isPlaceVisible = false;
    }
  });

  return isPlaceVisible;
};

// F08
// http request with POST method 

const handleSave = (placeId) => {

  fetch(`/places/${placeId}/${user.id}`, {
    method: "POST",
    headers: { "content-type": "application/json; charset=UTF-8" },
  })
    .then(location.reload())
    .catch((error) => {
      console.error("there was an error: ", error);
    });
};

// F09
// http request with DELETE method

const handleUnsave = (placeId) => {
 
  fetch(`/places/${placeId}/${user.id}`, {
    method: "DELETE",
    headers: { "content-type": "application/json; charset=UTF-8" },
  })
    .then(location.reload())
    .catch((error) => {
      console.error("there was an error: ", error);
    });
};

const renderPlaces = (data) => {
  $("#places > div").remove(); //remove all divs from places before rendering them again
  $("#savedPlaces > div").remove(); //remove all divs from savedPlaces before rendering them again
  for (var place in data) {
    isFavorite = data[place].isFavorite;
    if (isVisiblePlace(data[place])) {
      $("#places").append(renderPlace(data[place], true, !isFavorite));
    }
    if (isFavorite) {
      $("#savedPlaces").append(renderPlace(data[place], false, true));
    }
  }
};

const resetFilter = () => {
  location.reload();
};

$("#apply").on("click", fetchPlaces);
$("#reset").on("click", resetFilter);
