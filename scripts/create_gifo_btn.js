// /**
//  * obtener el elemento que voy a cambiar y guardarlo en una variable
//  * agregar un listener que cambie el src de la imagen
//  */


let createGifoBtn = document.querySelector('#create-gif');

createGifoBtn.addEventListener('mouseover', () => {
    createGifoBtn.src = 'assets/create-gifo-btn-hover.svg';
});
createGifoBtn.addEventListener('mouseout', () => {
    createGifoBtn.src = 'assets/create-gifo-btn.svg';
});


