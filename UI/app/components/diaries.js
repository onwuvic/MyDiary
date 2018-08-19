(function () {
    app.addComponent({
      name: 'diaries',
      model: {
        loading: true,
        diaries: []
      },
      view,
      controller
    });
  
    function view() {
      if(this.loading) return 'Loading...';
  
      let diaries = this.diaries.reduce((html, diary) => html + template.diaryTemplate(diary), '');

      if (diaries.length === 0) {
        diaries = template.noDiaryTemplete;
      }
  
      return `
        <header>
            <div class="container container-fluid navbar-grid">
                ${template.navBarTemplate}
                ${template.sideNavBarTemplate}
            </div>
        </header>
        <section id="main" class="container grid-layout">
            ${diaries}
            ${template.newDiaryButton}
        </section>
        ${template.footerTemplate}
      `;
    }
  
    function controller() {
      this.loading = true;
  
      api.getAllDiaries()
        .then(data => {
            this.diaries = data;
            this.loading = false;
        });
    }
  })();