(function () {
    app.addComponent({
      name: 'settings',
      model: {
        users: []
      },
      view,
      controller
    });
  
    function view() {
  
        return `
            <header>
                <div class="container container-fluid navbar-grid">
                    ${template.navBarTemplate}
                    ${template.sideNavBarTemplate}
                </div>
            </header>
            <section id="main" class="container-sm single-page">
                ${template.settingTemplate}
            </section>
            ${template.footerTemplate}
        `;
    }
  
    function controller() {
    }
  })();