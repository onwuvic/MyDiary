(function() {
    app.addComponent({
        name: 'edit',
        model: {
            // loading: true,
            diary: {
                id: 1,
                title: 'love is pain',
                body: 'bsbk duhuidhys shyufoi sfyusfy sfhusf siufyhouifs sfysfu'
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
        const updateDiaryForm = document.getElementById('updateDiaryForm');
        const errorMessage = document.getElementById('error-message');
        const button = document.getElementById('button');
        const loader = document.getElementById('loader');

        console.log(updateDiaryForm, errorMessage, button, loader);

        // function updateDiary(e) {
        //     e.preventDefault();
        //     const title = document.getElementById('title').value;
        //     const body = document.getElementById('body').value;
        //     const entryId = document.getElementById('id').value;

        //     console.log(title, body, entryId);
        // }

        // if(updateDiaryForm) {
        //     updateDiaryForm.addEventListener('submit', updateDiary, false);
        // }
    
        const id = router.params[0];

        this.loading = true;
        api.getOneDiaryById(id)
            .then(diary => {
                console.log(diary);
                this.diary = diary;
                this.loading = false;
            });
    }
})();