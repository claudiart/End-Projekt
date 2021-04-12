const getUsers = (e) => {
  e.preventDefault();

  let username = $("#username").val();
  let email = $("#email").val();
  let pass = $("#pass").val();

  // validation for username, email and pass
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

  //error handling if user exists
  if ($(".is-invalid").length == 0) {
    const showError = () => {
      $("#userExists").addClass("userExistsShow").removeClass("userExistsHide");
    };

    const hideError = () => {
      $("#userExists").removeClass("userExistsShow").addClass("userExistsHide");
    };

    //register success message
    const showRegisterInfo = () => {
      $("#registerInfo")
        .addClass("registerInfoShow")
        .removeClass("registerInfoHide");
    };

    // http request with POST method
    fetch(`/user`, {
      method: "POST",
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ username: username, email: email, pass: pass }),
    })
      .then((res) => res.json())
      .then((res) => {
        hideError();
        if (!res.ok) {
          showError(); // display message "User already exists";
        } else {
          showRegisterInfo(); //display message "User successfully registered"
        }
      })
      .catch((error) => {
        console.error("there was an error: ", error);
      });
  }
};

$("#register").on("click", getUsers);
