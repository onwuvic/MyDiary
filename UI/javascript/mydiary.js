const close = document.getElementById('close-menu');
const open = document.getElementById('open-menu');
const sideMenu = document.getElementById('side-menu');
const main = document.getElementById('main');
let moreInfo = document.querySelectorAll('#more-info');
let moreContent = document.querySelector('#more-content');
let moreInformation = document.querySelector('#more-information');

open.onclick = () => {
    sideMenu.style.width = '250px';
    main.style.marginLeft = '250px';
}

close.onclick = () => {
    sideMenu.style.cssText = "";
    main.style.cssText = "";    
}

function toggleOpen() {
    this.parentNode.classList.toggle('clicked');
}
 
function display() {
    moreContent.classList.toggle('clicked');
}
 
if (moreInformation) {
    moreInformation.addEventListener('click', display, false);  
}
 
moreInfo.forEach(panel => panel.addEventListener('click', toggleOpen, false));