$("#addPlace").on("click", () => (window.location.href = "/admin/add"));

fetch(`/places`, {
  method: "GET",
  headers: { "content-type": "application/json; charset=UTF-8" },
})
  .then((res) => res.json())
  .then((data) => {
    renderPlaces(data);
  });

const renderPlace = (place) => {
  return `
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="content col-12 rounded shadow text-dark fill #e4b370 pt-3 pb-3">
                <p class="placeName">${place.name}</p>
                <p class="mt-3 mb-0">${
                  place.address.streetAddress +
                  " " +
                  place.address.number +
                  ", " +
                  place.address.postalCode +
                  " " +
                  place.address.city
                }</p>
                <a class="website" href="${
                  place.website
                }">${place.website.replace("https://", "")}</a>
                <br>
            
                <button class="btn btn-lg btn-block mt-3 mb-3" onclick='handleEdit("${
                  place.id
                }")'>edit</button>
                <button class="btn btn-lg btn-block mt-3 mb-3" onclick='handleDelete("${
                  place.id
                }")'>delete</button>
            </div>
        </div>
        `;
};

const handleDelete = (placeId) => {
  // http request with DELETE method
  fetch(`/places/${placeId}`, {
    method: "DELETE",
    headers: { "content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => alert("Place will be deleted"))
    .then(location.reload())
    .catch((error) => {
      console.error("there was an error: ", error);
    });
};

const handleEdit = (placeId) => {
  top.location.href = "/admin/edit/" + placeId;
};

const renderPlaces = (data) => {
  for (var place in data) {
    $("#places").append(renderPlace(data[place]));
  }
};
