const loginUser = (e) => {
    e.preventDefault();

    let email = $('#email').val();
    let pass = $('#pass').val();

        fetch(`/login`, {
            method: 'GET',
            headers: { 'content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ email: email, pass: pass })
        }).then(res => res.json).then(console.log(res))
};

$('#login').on('click', loginUser)