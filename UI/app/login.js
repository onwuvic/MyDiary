
const loginForm = document.getElementById('loginForm');
const apiUrl = 'https://tranquil-harbor-77266.herokuapp.com/api/v1';
const errorMessage = document.getElementById('error-message');

function logIn(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;



    fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Accept':'application/json. text/plain, */*',
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.status == 'error') {
            errorMessage.style.display = 'block';
            errorMessage.textContent = data.message;
        } else {
            window.localStorage.setItem("token", data.token);
            redirect: window.location.replace('diaries.html');
        }
    }).catch((error) => {});
}

if(loginForm) {
    loginForm.addEventListener('submit', logIn);
}
