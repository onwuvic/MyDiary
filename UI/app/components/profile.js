(function () {
    app.addComponent({
      name: 'profile',
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
                ${template.profileTemplate(user)}
            </section>
            ${template.footerTemplate}
        `;
    }
  
    function controller() {
    }
  })();