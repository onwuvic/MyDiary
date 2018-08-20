(function() {
    app.addComponent({
        name: 'diary',
        model: {
            loading: true,
            diary: {}
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
            <section id="main" class="container-sm single-page">
                ${template.singleDiaryTemplate(this.diary)}
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
            });
    }
})();