const close = document.getElementById('close-menu');
const open = document.getElementById('open-menu');
const sideMenu = document.getElementById('side-menu');
const main = document.getElementById('main');

open.onclick = () => {
    sideMenu.style.width = '250px';
    main.style.marginLeft = '250px';
}

close.onclick = () => {
    sideMenu.style.cssText = "";
    main.style.cssText = "";    
}