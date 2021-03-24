console.log('hi')

// $('#name').val('claudia');

const handleEdit = () => {
    // http request with PUT method
    var placeName = $('name').val();
    fetch(`/places/${placeName}`, {
        method: "PUT",
        headers: { "content-type": "application/json; charset=UTF-8" },
    }).then(console.log("I am here"))
        .catch((error) => {
            console.error("there was an error: ", error);
        });
};

$("#editplace").on("click", handleEdit);