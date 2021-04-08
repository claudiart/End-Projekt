const loginUser = (e) => {
  e.preventDefault();

  let email = $("#email").val();
  let pass = $("#pass").val();

  // validation

  $(".is-invalid").removeClass("is-invalid");
  if (email.length < 7 || email.indexOf("@") == -1) {
    $("#email").addClass("is-invalid");
  }
  if (pass.length < 6) {
    $("#pass").addClass("is-invalid");
  }
  if ($(".is-invalid").length == 0) {
    // $( '#login' ).prop( 'disabled', true ); // damit man nicht zweimal klicken kann

    // send http request to server
    fetch(`/login`, {
      method: "POST",
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ email: email, pass: pass }),
    })
      .then((res) => res.json())
      .then((res) => {
        user = JSON.parse(res);
        if (user.admin === true) {
          window.location.href = "/admin";
        } else if (user.admin === false) {
          window.location.href = `/user/${user.username}`;
          // http request with PUT method
          //   fetch(`/user/${user.id}`, {
          //     method: "PUT",
          //     headers: { "content-type": "application/json; charset=UTF-8" },
          //     body: JSON.stringify(user),
          //   }).catch((error) => {
          //     console.error("there was an error: ", error);
          //   });
        } else {
          alert("pass is not correct");
        }
      });
  }
};

$("#login").on("click", loginUser);
