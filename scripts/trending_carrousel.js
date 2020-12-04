
// import api from './get_api.js';

// async function getTrendingGifs(offset) {
    
//     let url = `${api.URL}?api_key=${api.API_KEY}&limit=${api.LIMIT}&offset=${api.OFF_SET}`;
//     let response = await fetch(url);
//     let result = await response.json();
//     createThreeGifCards(result);
//     return result;
 
// };



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
    contenedor.replaceChild(card1, contenedor.children[0]);
    contenedor.replaceChild(card2, contenedor.children[1]);
    contenedor.replaceChild(card3, contenedor.children[2]);
};


function createGifCard(gif) {
    let div = document.createElement('div');
    div.innerHTML = `
        <img src=${gif.images.original.url} class='gif-img' id='gif'>
    `;
    return div;
};

getTrendingGifs();

let sliderRight = document.getElementById('right');
let sliderLeft = document.getElementById('left'); 

sliderRight.addEventListener('click', () => {
    offset = offset + 3;
    getTrendingGifs(offset);
});

sliderLeft.addEventListener('click', () => {
    offset = offset - 3;
    getTrendingGifs(offset);

});



///modal/////

let cerrar = document.querySelector('.close');
let abrir = document.querySelector('.cta');
let modal = document.querySelector('.modal');
let modalC = document.querySelector('.modal-container');

abrir.addEventListener('click', function(e){
    e.preventDefault();
    modalC.style.opacity = '1';
    modalC.style.visibility = 'visible';
    modal.classList.toggle('modal-close');

});

cerrar.addEventListener('click', function() {
    modal.classList.toggle('modal-close');
    
    setTimeout(function(){
        modalC.style.opacity = '0';
        modalC.style.visibility = 'hidden';
    }, 900);
});
