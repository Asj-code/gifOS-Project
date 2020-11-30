// import api from './get_api.js';
// import {getTrendingGifs} from './trending_carrousel';


// function createThreeGifCards (result) {

//     let card1 = createGifCard(result.data[0]);
//     let card2 = createGifCard(result.data[1]);
//     let card3 = createGifCard(result.data[2]);

//     let contenedor = document.getElementById('main-gifs-container');
//         // contenedor.appendChild(card);
//     contenedor.replaceChild(card1, contenedor.children[0]);
//     contenedor.replaceChild(card2, contenedor.children[1]);
//     contenedor.replaceChild(card3, contenedor.children[2]);
// }


// function createGifCard(gif) {
//     let div = document.createElement('div');
//     div.innerHTML = `
//         <img src=${gif.images.original.url} class='gif-img' id='gif'>
//     `;
//     return div;
// };

// getTrendingGifs();