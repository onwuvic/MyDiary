class Router {
    constructor(app, defaultUrl) {
        this.app = app;
        this.defaultUrl = defaultUrl;
        this.routes = [];
        this.hashChange = this.hashChange.bind(this);

        window.addEventListener('hashchange', this.hashChange);
        window.addEventListener('DOMContentLoaded', this.hashChange);
    }

    addRouter(name , url) {
        this.routes.push({
            name,
            url
        });
    }

    hashChange() {
        let url = window.location.hash.substring(1);
        if(!url) {
            url = this.defaultUrl;
            window.location.hash = `#${url}`;
        }
        
        const routes = this.routes.filter(route => url.match(new RegExp(route.url, 'gi')));

        if (routes.length > 0) {
            const route = routes[0];
            this.params = new RegExp(route.url, 'gi').exec(url).slice(1);
            this.app.showComponent(route.name);
        } else {
            this.app.showComponent();
        }
        
    }
}