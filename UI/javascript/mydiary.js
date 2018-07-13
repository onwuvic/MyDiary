const close = document.getElementById('close-menu');
const open = document.getElementById('open-menu');

open.onclick = () => {
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
}

close.onclick = () => {
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
}