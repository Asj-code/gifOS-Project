// ////////////SLIDERS BUTTONS FUNCTION //////////
// sliderRight.addEventListener('click', () => {
//     offset = offset + 3;
//     getTrendingGifs(offset);
// });

// sliderLeft.addEventListener('click', () => {
//     if(offset >= 3) {
//         offset = offset - 3;
//         getTrendingGifs(offset);
//     }
// });


///HOVER////
/**
 * obtener los elementos que voy a cambiar y guardarlos en una variable
 * crear la funcion que realiza el cambio
 * crear un handler para los elementos
 */


let leftBtn = document.querySelector('#left');
let rightBtn = document.querySelector('#right');

leftBtn.addEventListener('mouseover', () => {
    leftBtn.src = '/assets/slider-left-btn-hover.svg';
});

leftBtn.addEventListener('mouseout', () => {
    leftBtn.src = '/assets/slider-left-btn.svg';
});

rightBtn.addEventListener('mouseover', () => {
    rightBtn.src = '/assets/slider-right-btn-hover.svg';
});

rightBtn.addEventListener('mouseout', () => {
    rightBtn.src = '/assets/slider-right-btn.svg';
});