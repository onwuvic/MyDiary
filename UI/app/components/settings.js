(function () {
    app.addComponent({
      name: 'settings',
      model: {
        users: []
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
            <section id="main" class="container-sm single-page">
                ${template.settingTemplate(user)}
            </section>
            ${template.footerTemplate}
        `;
    }
  
    function controller() {
    }
  })();