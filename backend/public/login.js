const loginUser = (e) => {
    e.preventDefault();

    let email = $('#email').val();
    let pass = $('#pass').val();

    //send http request to server
    fetch(`/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ email: email, pass: pass })
    }).then(res => res.json())
      .then(json => {
            window.location.href = "/admin";
        });
};

$('#login').on('click', loginUser);