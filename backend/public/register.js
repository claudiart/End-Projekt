const getUsers = (e) => {
  e.preventDefault();

  let username = $("#username").val();
  let email = $("#email").val();
  let pass = $("#pass").val();

  let doubleUserError = null;
  // validation

  $(".is-invalid").removeClass("is-invalid");
  if (username == "") {
    $("#username").addClass("is-invalid");
  }

  if (email.length < 7 || email.indexOf("@") == -1) {
    $("#email").addClass("is-invalid");
  }
  if (pass.length < 6) {
    $("#pass").addClass("is-invalid");
  }
  if ($(".is-invalid").length == 0) {
    // $('#register').prop('disabled', true); // damit man nicht zweimal klicken kann

    const showError = () => {
      $("#userExists").addClass("userExistsShow").removeClass("userExistsHide");
    };

    const hideError = () => {
      $("#userExists").removeClass("userExistsShow").addClass("userExistsHide");
    };

    // http request with POST method
    fetch(`/user`, {
      method: "POST",
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ username: username, email: email, pass: pass }),
    })
      .then((res) => {
        hideError();
        if (!res.ok) {
          throw new Error("User already exists");
        }
        return res.json;
      })
      .catch((error) => {
        console.error("there was an error: ", error);
        showError();
      });
  }
};
$("#register").on("click", getUsers);
