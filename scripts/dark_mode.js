// /**
//  * @method changeTheme
//  * @description Change dark/light theme
//  * @param {object} e event information
//  */

//  //funcion que se llame como el metodo
//  //parametros que voy a utilizar


 //Objects to interact with

let body = document.querySelector('body');
let changeModeLink = document.getElementById('change-mode');
let search = document.getElementById('input-ctn');
// let searchIcon = document.getElementById('searchIcon');
let trendings = document.getElementById('trending');
let logo = document.getElementById('logo');
let btnGifos = document.getElementById('btn-gifos');
let sliderRight = document.getElementById('right');
let sliderLeft = document.getElementById('left');



//HOST PATH 
let host = "http://"+window.location.hostname+":"+location.port;


//CHANGE CONTENT FUNCTIONS

//Update source function

function update_src(img, src) {
    img.src = host+src;
}

//Toggle source function

function toggle_src(img, ligth_src, dark_src) {
    if(img.src == host+ligth_src) {
        update_src(img, dark_src)
    }else {
        update_src(img, ligth_src)
    }
}


function changeLogo() {
    toggle_src(logo, "/assets/logo-desktop.svg", "/assets/logo-dark.svg")
}


function changeBtnGifos() {
    toggle_src(btnGifos, "/assets/create-gifo-btn.svg", "/assets/create-gifo-btn-dark.svg")
}

// function changeSearchIcon() {
//     toggle_src(searchIcon, "/assets/icon-search.svg", "/assets/icon-search-modo-noct.svg")
// }

function changeSliders() {
    toggle_src(sliderRight, "/assets/slider-right-btn.svg", "/assets/slider-right-btn-dark.svg")
    toggle_src(sliderLeft, "/assets/slider-left-bnt.svg", "/assets/slider-left-btn-dark.svg")
}


function changeLinkContent () {
    if(changeModeLink.textContent == 'Modo Diurno') {
        changeModeLink.textContent = 'Modo Nocturno';
    }else {
        changeModeLink.textContent = 'Modo Diurno';
    }
}



//CHANGE MODE FUNCTION
function darkMode() {
    changeModeLink.addEventListener('click', () => {
        body.classList.toggle('dark');
        trendings.classList.toggle('dark-bg');
        search.classList.toggle('dark-border');
        changeLinkContent();
        changeLogo();
        // changeSearchIcon();
        changeBtnGifos();
        changeSliders();
    });
}
darkMode();