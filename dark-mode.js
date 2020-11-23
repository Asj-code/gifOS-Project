
//Objects to interact with

let body = document.querySelector('body');
let changeModeLink = document.getElementById('change-mode');
let searchBar = document.getElementById('searchBar');
let searchIcon = document.getElementById('searchIcon');
let trendings = document.getElementById('trending');
let logo = document.getElementById('logo');
let btnGifos = document.getElementById('btn-gifos');
let sliderRight = document.getElementById('right');
let sliderLeft = document.getElementById('left');



//HOST PATH 
let host = "http://"+window.location.hostname+":"+location.port;


//Change content functions

function changeLinkContent () {
    if(changeModeLink.textContent == 'Modo Diurno') {
        changeModeLink.textContent = 'Modo Nocturno';
    }else {
        changeModeLink.textContent = 'Modo Diurno';
    }
}


function changeLogo() {
    if(logo.src == host+"/assets/logo-mobile.svg") {
        logo.src = host+"/assets/logo-mobile-modo-noct.svg";
    }else {
        logo.src = host+"/assets/logo-mobile.svg";
    }
}


function changeSearchIcon() {
    if(searchIcon.src == host+"/assets/icon-search.svg") {
        searchIcon.src = host+"/assets/icon-search-modo-noct.svg";
    }else {
        searchIcon.src = host+"/assets/icon-search.svg";
    }
}

function changeBtnGifos() {
    if(btnGifos.src == host+"/assets/button-crear-gifo.svg") {
        btnGifos.src = host+"/assets/CTA-crar-gifo-modo-noc.svg";
    }else {
        btnGifos.src = host+"/assets/button-crear-gifo.svg";
    }
}

function changeSliders() {
    if(sliderRight.src == host+"/assets/Button-Slider-right.svg" && sliderLeft.src == host+"/assets/button-slider-left.svg") {
        sliderRight.src = host+"/assets/button-slider-right-md-noct.svg";
        sliderLeft.src = host+"/assets/button-slider-left-md-noct.svg";
    }else {
        sliderRight.src = host+"/assets/Button-Slider-right.svg";
        sliderLeft.src = host+"/assets/button-slider-left.svg";
    }
}


//CHANGE MODE FUNCTION
function darkMode() {
    changeModeLink.addEventListener('click', () => {
        body.classList.toggle('dark');
        trendings.classList.toggle('dark-bg');
        searchBar.classList.toggle('dark-border');
        changeLinkContent();
        changeLogo();
        changeSearchIcon();
        changeBtnGifos();
        changeSliders();
    });
}
darkMode();


   

