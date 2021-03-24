const api_key = 'IxndpBv8XXCauGIwjs48PBQm8ZbXIwQq';
var offset = 0;

async function getTrendingGifs(offset) {

    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&offset=${offset}&limit=3`;
    let response = await fetch(url);
    let result = await response.json();
    createThreeGifCards(result);
    return result;

};

function createThreeGifCards(result) {

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

    div.addEventListener("click", () => {
        console.log("hola");
        let modal = createModal();
        div.replaceChild(modal, div.firstChild);
    });
    
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

function createModal() {
    console.log("createmodal");
    
    let modalWindow = document.createElement('div');
    modalWindow.setAttribute("id", "ventana-modal");

    let modalContainer = document.createElement('div');
    modalContainer.setAttribute("class", "modal-container");

    let modalImg = document.createElement('div');
    modalImg.setAttribute("class", "modal-img");
    modalImg.innerHTML = `
        <img src="assets/favorite-icon.svg">
        <img src="assets/download-icon.svg">
        <img src="assets/max-icon.svg">
    `
    let modalText = document.createElement('div');
    modalText.setAttribute("class", "modal-text");
    modalText.innerHTML = `
    <p class="modal-content">User</p>
    <h3 class="modal-content">Title</h3>
    `
    modalContainer.appendChild(modalImg);
    modalContainer.appendChild(modalText);
    let node = modalWindow.appendChild(modalContainer);
    return node;
};

