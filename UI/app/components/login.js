(function () {
    app.addComponent({
        name: 'login',
        model: {
            loading: false
        },
        view,
        controller
    });

    function view() {
        return template.loginTemplate;
    }

    function controller() {
        const loginForm = document.getElementById('loginForm');
        const errorMessage = document.getElementById('error-message');
        const button = document.getElementById('button');
        const loader = document.getElementById('loader');

        function logIn(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            this.loading = true;

            if(this.loading) {
                button.style.display = 'none';
                loader.style.display = 'block';
            }

            api.signIn(email, password)
                .then((data) => {
                    this.loading = false;
                    button.style.display = 'block';
                    loader.style.display = 'none';
                    if(data.status == 'error') {
                        errorMessage.style.display = 'block';
                        errorMessage.textContent = data.message;
                    } else {
                        window.localStorage.setItem("token", data.token);
                        window.location.replace('#/diary');
                    }
                });
        }

        if(loginForm) {
            loginForm.addEventListener('submit', logIn);
        }
    }
})();