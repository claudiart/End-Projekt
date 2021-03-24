$('#addPlace').on('click', () => window.location.href = "/admin/add");


fetch(`/places`, {
    method: 'GET',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
}).then(res => res.json())
    .then(data => {
        renderPlaces(data);
    });

const renderPlace = (place) => {

const liquids = place.liquids.length > 0 ? place.liquids : "";
const kitchen = place.kitchen.length > 0 ? place.kitchen : "";

    return (
        `
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="content col-12 rounded shadow text-dark pt-3 pb-3">
                <p class="text-dark font-weight-bold">${place.name}</p>
                <p class="mt-3 mb-0">${place.address.streetAddress + ", " + place.address.postalCode + " " + place.address.city}</p>
                <a href="${place.website}">${place.website}</a>
                <p class="mb-0">${liquids}</p>
                <p class="mb-0">${kitchen}</p>
                <button class="btn btn-lg btn-block mt-3 mb-3" onclick='handleEdit("${place.name}")'>edit</button>
                <button class="btn btn-lg btn-block mt-3 mb-3" onclick='handleDelete("${place.name}")'>delete</button>
            </div>
        </div>
        `
    )
}

const handleDelete = (placeName) => {
    // http request with DELETE method
    fetch(`/places/${placeName}`, {
        method: "DELETE",
        headers: { "content-type": "application/json; charset=UTF-8" },
    }).then(response => alert("Successfully deleted")).then(location.reload())
        .catch((error) => {
            console.error("there was an error: ", error);
        });
};

const handleEdit = (placeName) => {
    // http request with PUT method
    fetch(`/places/${placeName}`, {
        method: "PUT",
        headers: { "content-type": "application/json; charset=UTF-8" },
    }).then(console.log("I am here"))
        .catch((error) => {
            console.error("there was an error: ", error);
        });
};

const renderPlaces = (data) => {
    for (var place in data) {
        $('#places').append(renderPlace(data[place]));
    }
}