(function () {
    app.addComponent({
      name: 'notification',
      model: {
        notifications: [
            // {
            //     message: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            //     Nisi sapiente eveniet obcaecati ipsa eos expedita quod fuga quis 
            //     totam tempore nesciunt ducimus, quibusdam nemo esse dolore necessitatibus 
            //     fugiat mollitia? Esse?`,
            //     created_at: '4 July 2018'
            // },
            // {
            //     message: `Hi Victor, Don't forget to pen your thought down today. 
            //     Keeping a journal is great for your mental health.`,
            //     created_at: '5 July 2018'
            // },
            // {
            //     message: `Hi Victor, Don't forget to pen your thought down today. 
            //     Keeping a journal is great for your mental health.`,
            //     created_at: '6 July 2018'
            // },
            // {
            //     message: `Hi Victor, Don't forget to pen your thought down today. 
            //     Keeping a journal is great for your mental health.`,
            //     created_at: '7 July 2018'
            // }
        ]
      },
      view,
      controller
    });
  
    function view() {
        let notifications = this.notifications.reduce((html, notify) => html + template.notificationTemplate(notify), '');

        if (notifications.length === 0) {
            notifications = template.noNotificationTemplate;
        }
  
        return `
            <header>
                <div class="container container-fluid navbar-grid">
                    ${template.navBarTemplate}
                    ${template.sideNavBarTemplate}
                </div>
            </header>
            <section id="main" class="container-sm single-page">
                <div>
                    ${notifications}
                </div>
            </section>
            ${template.footerTemplate}
        `;
    }
  
    function controller() {
    }
  })();