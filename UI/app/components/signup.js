(function () {
    app.addComponent({
        name: 'signup',
        model: {
            loading: false
        },
        view,
        controller
    });

    function view() {
        return template.signupTemplate;
    }

    function controller() {
        const signupForm = document.getElementById('signupForm');
        const errorMessage = document.getElementById('error-message');
        const button = document.getElementById('button');
        const loader = document.getElementById('loader');

        function createNewUser(e) {
            e.preventDefault();
            const firstname = document.getElementById('firstname').value;
            const lastname = document.getElementById('lastname').value
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            this.loading = true;

            if(this.loading) {
                button.style.display = 'none';
                loader.style.display = 'block';
            }

            api.signUp(firstname, lastname, email, password)
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

        if(signupForm) {
            signupForm.addEventListener('submit', createNewUser);
        }
    }
})();