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
      .then((res) => {
        if (!res.ok) {
          // check if response is ok and if not
          return res.json().then((res) => {
            //return a JSON response and use then() to throw new Error
            throw new Error(res.message); //throw new error with the message
          });
        }
        return res.json(); //if response is ok return a JSON response to use it in the next then()
      })
      .then((res) => {
        user = JSON.parse(res);
        delete user.pass; // Passwort nicht in Session speichern
        if (user.admin === true) {
          sessionStorage.setItem("letseatuser", JSON.stringify(user));
          window.location.href = "/admin";
        } else if (user.admin === false) {
          sessionStorage.setItem("letseatuser", JSON.stringify(user));
          window.location.href = "/user";
        }
      })
      .catch((error) => {
        //catch the error form above and alert the message from the backend
        alert(error.message); //alert the message from the backend
      });
  }
};

$("#login").on("click", loginUser);
