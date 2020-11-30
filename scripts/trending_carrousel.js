// ADD TRENDING GIFS FUNCTION

import api from './get_api.js';

async function getTrendingGifs(offset) {
    
    let url = `${api.URL}?api_key=${api.API_KEY}&limit=${api.LIMIT}&offset=${api.OFF_SET}`;
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
}


function createGifCard(gif) {
    let div = document.createElement('div');
    div.innerHTML = `
        <img src=${gif.images.original.url} class='gif-img' id='gif'>
    `;
    return div;
};

getTrendingGifs();








// const api_key = 'IxndpBv8XXCauGIwjs48PBQm8ZbXIwQq';
// var offset = 0;

// async function getTrendingGifs(offset) {
    
//     let url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&offset=${offset}&limit=3`;
//     let response = await fetch(url);
//     let result = await response.json();
//     createThreeGifCards(result);
//     return result;
 
// };