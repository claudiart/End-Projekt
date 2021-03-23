$('#addPlace').on('click', () => window.location.href = "/admin/add");


fetch(`/places`, {
    method: 'GET',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
}).then(res => res.json())
    .then(data => {
        renderPlaces(data);

    });

const renderPlace = (place) => { // wenn beides ? 
  let category = '';
  if (place.liquids.length > 0) {
      category = place.liquids;
    } else if (place.kitchen.length > 0) {
      category = place.kitchen;
  }

  console.log(place.liquids);
    return (
        `
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="content col-12 rounded shadow text-dark pt-3 pb-3">
                <p class="text-dark font-weight-bold">${place.name}</p>
                <p class="mt-3 mb-0">${place.address.streetAddress + ", " + place.address.postalCode + " " + place.address.city}</p>
                <a href="${place.website}">${place.website}</a>
                <p class="mb-0">${category}</p>
                <button>edit</button>
                <button id="delete" onclick='handleDelete("${place.name}")'>delete</button>
            </div>
        </div>
        `
    )
}

const handleDelete = (placeName) => {
        // http request with POST method
        fetch(`/places/delete`, {
            method: "POST",
            headers: { "content-type": "application/json; charset=UTF-8" },
            body: placeName,
          }).then(response => console.log(response))
            .catch((error) => {
              console.error("there was an error: ", error);
              // showError();
            });
};

const renderPlaces = (data) => {
    for (var place in data) {
        $('#places').append(renderPlace(data[place]));
    }
}