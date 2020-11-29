//API
import getTrendingApi from '.get_api.js';
//import{nombre de las funcione que voy a utilizar} from 'archivo donde estan esas funciones';



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




