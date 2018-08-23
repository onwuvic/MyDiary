(function() {
    app.addComponent({
        name: 'edit',
        model: {
            loading: true,
            diary: {
                // id: 1,
                // title: 'love is pain',
                // body: 'bsbk duhuidhys shyufoi sfyusfy sfhusf siufyhouifs sfysfu'
            }
        },
        view,
        controller
    });

    function view() {
        if(this.loading) return 'Loading...';

        return `
            <header>
                <div class="container container-fluid navbar-grid">
                    ${template.navBarTemplate}
                    ${template.sideNavBarTemplate}
                </div>
            </header>
            <section id="main" class="container">
                ${template.editDiaryForm(this.diary)}
            </section>
            ${template.footerTemplate}
        `;
    }

    function controller() {

        const id = router.params[0];

        this.loading = true;
        api.getOneDiaryById(id)
            .then(diary => {
                console.log(diary);
                this.diary = diary;
                this.loading = false;
            })
            .then(() => {
                loadPage();
            });
    }

    function loadPage() {
        const updateDiaryForm = document.getElementById('updateDiaryForm');
        const errorMessage = document.getElementById('error-message');
        const button = document.getElementById('button');
        const loader = document.getElementById('loader');

        function updateDiary(e) {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const body = document.getElementById('body').value;
            const entryId = document.getElementById('id').value;

            this.loading = true;

            if(this.loading) {
                button.style.display = 'none';
                loader.style.display = 'block';
            }

            api.getDiaryByIdandUpdate(entryId, title, body)
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

        if(updateDiaryForm) {
            updateDiaryForm.addEventListener('submit', updateDiary, false);
        }
    }
})();