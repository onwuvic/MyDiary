class App {
    constructor() {
        this.components = {};
        this.currentComponent = null;
    }

    mount(selector) {
        this.appElement = document.querySelector(selector);
        this.updateView();
    }

    addComponent(component) {
        this.components[component.name] = component;

        if(component.model) {
            component.model = this.proxify(component.model);
        }

        component.view = component.view.bind(component.model);

        if(component.controller) {
            component.controller = component.controller.bind(component.model);
        }
    }

    updateView() {
        this.appElement.innerHTML = this.getView(); 
        this.events();
    }

    getView() {
        if(this.currentComponent) {
            return this.currentComponent.view();
        } else {
            return '<h2 class="text-center"> Not Found</h2>';
        }
    }

    showComponent(componentName) {
        this.currentComponent = this.components[componentName];
        this.updateView();
        if(this.currentComponent && this.currentComponent.controller) {
            this.currentComponent.controller();
        }
    }

    proxify(model) {
        const app = this;
        return new Proxy(model, {
            set(target, property, value, receiver) {
                target[property] = value;
                app.updateView();
                return true;
            }
        });
    }

    events() {
        const close = document.getElementById('close-menu');
        const open = document.getElementById('open-menu');
        const sideMenu = document.getElementById('side-menu');
        const main = document.getElementById('main');
        const moreInfo = document.querySelectorAll('#more-info');
        const moreContent = document.querySelector('#more-content');
        const moreInformation = document.querySelector('#more-information');
        const logOut = document.getElementById('logout');
    
        function closeSideMenu() {
            sideMenu.style.cssText = "";
            main.style.cssText = "";
        }
    
        function openSideMenu() {
            sideMenu.style.width = '250px';
            main.style.marginLeft = '250px';
        }
    
        function toggleOpen() {
            this.parentNode.classList.toggle('clicked');
        }
        
        function display() {
            moreContent.classList.toggle('clicked');
        }
    
        function logOutApp() {
            window.localStorage.clear();
            window.location.replace('#/');
        }
    
        if (close) {
            close.addEventListener('click', closeSideMenu, false);
        }
    
        if (open) {
            open.addEventListener('click', openSideMenu, false); 
        }
        
        if (moreInformation) {
            moreInformation.addEventListener('click', display, false);  
        }
    
        if (logOut) {
            logOut.addEventListener('click', logOutApp, false);
        }
        
        moreInfo.forEach(panel => panel.addEventListener('click', toggleOpen, false));
    
        console.log(open);
    }
}