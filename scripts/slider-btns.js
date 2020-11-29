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