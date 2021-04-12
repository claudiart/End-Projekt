var user = sessionStorage.getItem("letseatuser");
if (!user || user == "") {
  //if user is not logged in rediret to login page
  window.location.href = "/";
}
user = JSON.parse(user);
if (!user.admin) {
  // if user is logged in and not an admin, redirect to userHome
  window.location.href = "/user";
}
$("#nameUser").html(user.username + " Administrator");

$("#logout").on("click", function () {
  sessionStorage.clear();
  window.location.href = "/";
});

$("#addPlace").on("click", () => (window.location.href = "/admin/add"));

// http request with GET method to get all places
fetch(`/places/${user.id}`, {
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
            <div class="content col-12 rounded shadow text-dark pt-3 pb-3">
                <p class="placeName">${place.name}</p>
                <p class="address">${
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

const renderPlaces = (data) => {
  for (var place in data) {
    //for every place in data
    $("#places").append(renderPlace(data[place])); //call renderPlace function with single place object as and append to #places
  }
};

const handleDelete = (placeId) => {
  // http request with DELETE method to delete a place
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

//click on edit button leads to /admin/edit/placeId (sends place id to the backend)
const handleEdit = (placeId) => {
  top.location.href = `/admin/edit/${placeId}`;
};
