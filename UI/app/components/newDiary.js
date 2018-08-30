(function () {
    app.addComponent({
        name: 'newDiary',
        model: {
            loading: false
        },
        view,
        controller
    });

    function view(user) {
        return `
            <header>
                <div class="container container-fluid navbar-grid">
                    ${template.navBarTemplate}
                    ${template.sideNavBarTemplate(user)}
                </div>
            </header>
            <section id="main" class="container">
                ${template.createDiaryForm}
            </section>
            ${template.footerTemplate}
        `;
    }

    function controller() {
        const createDiaryForm = document.getElementById('createDiaryForm');
        const errorMessage = document.getElementById('error-message');
        const button = document.getElementById('button');
        const loader = document.getElementById('loader');

        function createDiary(e) {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const body = document.getElementById('body').value;

            this.loading = true;

            if(this.loading) {
                button.style.display = 'none';
                loader.style.display = 'block';
            }

            api.create(title, body)
                .then((data) => {
                    this.loading = false;
                    button.style.display = 'block';
                    loader.style.display = 'none';
                    if(data.status == 'error') {
                        errorMessage.style.display = 'block';
                        errorMessage.textContent = data.message;
                    } else {
                        window.location.replace('#/diary');
                    }
                });
        }

        if(createDiaryForm) {
            createDiaryForm.addEventListener('submit', createDiary);
        }
    }
})();