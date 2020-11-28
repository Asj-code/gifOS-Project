
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
    toggle_src(logo, "/assets/logo-mobile.svg", "/assets/logo-mobile-modo-noct.svg")
}


function changeBtnGifos() {
    toggle_src(btnGifos, "/assets/button-crear-gifo.svg", "/assets/CTA-crar-gifo-modo-noc.svg")
}

// function changeSearchIcon() {
//     toggle_src(searchIcon, "/assets/icon-search.svg", "/assets/icon-search-modo-noct.svg")
// }

function changeSliders() {
    toggle_src(sliderRight, "/assets/Button-Slider-right.svg", "/assets/button-slider-right-md-noct.svg")
    toggle_src(sliderLeft, "/assets/button-slider-left.svg", "/assets/button-slider-left-md-noct.svg")
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


//ADD TRENDING GIFS FUNCTION

const api_key = 'IxndpBv8XXCauGIwjs48PBQm8ZbXIwQq';
var offset = 0;

async function getTrendingGifs(offset) {
    
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&offset=${offset}&limit=3`;
    let response = await fetch(url);
    let result = await response.json();
    createThreeGifCards(result);
    return result;
 
};


function createThreeGifCards (result) {

    let card1 = createGifCard(result.data[0]);
    let card2 = createGifCard(result.data[1]);
    let card3 = createGifCard(result.data[2]);

    let contenedor = document.getElementById('main-gifs-container');
        // contenedor.appendChild(card);
    contenedor.replaceChild(card1, contenedor.children[0]);
    contenedor.replaceChild(card2, contenedor.children[1]);
    contenedor.replaceChild(card3, contenedor.children[2]);
}


function createGifCard(gif) {
    let div = document.createElement('div');
    div.innerHTML = `
        <img src=${gif.images.original.url} class='gif-img' id='gif'>
    `;
    return div;
};

getTrendingGifs();

////////////SLIDERS BUTTONS FUNCTION //////////
sliderRight.addEventListener('click', () => {
    offset = offset + 3;
    getTrendingGifs(offset);
});

sliderLeft.addEventListener('click', () => {
    if(offset >= 3) {
        offset = offset - 3;
        getTrendingGifs(offset);
    }
});



//////////////////////SEARCH BAR FUNCTION/////////////////////////////////////

const d = document,
$gifSection = d.getElementById('gif-section'),
$template = d.getElementById('gif-template').content,
$fragment = d.createDocumentFragment();

d.addEventListener('keypress', async event => {
    if(event.target.matches('#search')){
    // console.log(event.key);
        if(event.key === 'Enter'){
            try {
                $gifSection.innerHTML = `<img class='loader' src='loader.svg' alt='Cargando...'>`;
                
                let query = event.target.value;
                let api = `https://api.giphy.com/v1/gifs/search?api_key=IxndpBv8XXCauGIwjs48PBQm8ZbXIwQq&q=${query}`;
                let resp = await fetch(api);
                let json = await resp.json();
                // console.log(resp);
                // console.log(json.data.length);
                if(!resp.ok) throw { status: resp.status, statusText: resp.statusText };
                if(json.data.length === 0){
                    $gifSection.innerHTML = `<h2>No existen resultados para : ${query}</h2>`;
                }else{
                    json.data.forEach(element => {
                                
                    $template.getElementById('search-gif').src = element.images.original.url ? element.images.original.url : 'no image';
                    $template.getElementById('search-gif').alt = element.name;
                    $template.getElementById('search-gif').style.maxWidth='100%';
                    $template.getElementById('gif-title').textContent = element.title ? element.title : 'no title';
                    $template.getElementById('gif-user').textContent = element.username ? element.username : 'no user';
                    
                    let $clone = d.importNode($template, true);
                    $fragment.appendChild($clone);
                    });

                    $gifSection.innerHTML = '';
                    $gifSection.appendChild($fragment);
                }
                } catch (error) {
                    // console.log(error);
                    let message = error.statusText || "Ocurrió un error";
                    $gifSection.innerHTML = `<p>Error ${error.status}: ${message}</p>`;
                    }
                }
            }
        })




////////CREAR GIFOS FUNCTIONS///////






