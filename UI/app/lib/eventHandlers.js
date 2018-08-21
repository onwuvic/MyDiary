window.addEventListener('DOMContentLoaded', function() {
    const close = document.getElementById('close-menu');
    const open = document.getElementById('open-menu');
    const sideMenu = document.getElementById('side-menu');
    const main = document.getElementById('main');
    let moreInfo = document.querySelectorAll('#more-info');
    let moreContent = document.querySelector('#more-content');
    let moreInformation = document.querySelector('#more-information');
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
});