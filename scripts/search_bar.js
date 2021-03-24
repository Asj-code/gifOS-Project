const d = document,
    $gifSection = d.getElementById('gif-section'),
    $template = d.getElementById('gif-template').content,
    $searchResult = d.getElementById('search-result'),
    $fragment = d.createDocumentFragment();
let searchBtn = document.getElementById('search-icon');
let closeSearchBtn = document.getElementById('close-search-btn');
let input = document.getElementById('search');
let searchMoreGifs = document.getElementById('ver-mas-gifos');

let cntInput = document.getElementById('input-ctn'); 
let gifName = document.getElementById('gif-name');

//autocomplete
let boxSearch = document.getElementById('box-search');
let linkGif1 = document.getElementById('link-gif1');
let linkGif2 = document.getElementById('link-gif2');
let linkGif3 = document.getElementById('link-gif3');
let linkGif4 = document.getElementById('link-gif4');
let linkGif5 = document.getElementById('link-gif5');


input.addEventListener('keyup',(e) =>{

    if (e.target.value.length >= 3) {
        var charCode = e.target.value;
        giveSuggestions(charCode);
        
    }
  }

);


//funcion que consume la api autocomplete cuando ingreso una letra 
async function giveSuggestions(term){
    try {
    let api = `https://api.giphy.com/v1/gifs/search/tags?api_key=IxndpBv8XXCauGIwjs48PBQm8ZbXIwQq&q=${term}`;
    let resp = await fetch(api);
    let json = await resp.json();
    console.log(json);

    //build template
    cntInput.style.height = "200px";
    $searchResult.style.marginTop = "-175px";
    boxSearch.style.display = "block";
    //render sugestions     
    linkGif1.innerText = `${json.data[0].name}`
    linkGif2.innerText = `${json.data[1].name}`
    linkGif3.innerText = `${json.data[2].name}`
    linkGif4.innerText = `${json.data[3].name}`
    linkGif5.innerText = `${json.data[4].name}`


    linkGif1.addEventListener('click', () => {
        boxSearch.style.display = "none";
        input.value = json.data[0].name;
        gifName.innerHTML = `<h2 id='query-title'>${json.data[0].name}</h2>`;
        closeSearchBtn.style.display = "block";
        searchBtn.style.display = 'none';
        renderGifs(json.data[0].name);
    })
    linkGif2.addEventListener('click', () => {
        boxSearch.style.display = "none";
        input.value = json.data[1].name;
        gifName.innerHTML = `<h2 id='query-title'>${json.data[1].name}</h2>`;
        closeSearchBtn.style.display = "block";
        searchBtn.style.display = 'none';
        renderGifs(json.data[1].name);
    })
    linkGif3.addEventListener('click', () => {
        boxSearch.style.display = "none";
        input.value = json.data[2].name;
        gifName.innerHTML = `<h2 id='query-title'>${json.data[2].name}</h2>`;
        closeSearchBtn.style.display = "block";
        searchBtn.style.display = 'none';
        renderGifs(json.data[2].name);
    })
    
    linkGif4.addEventListener('click', () => {
        boxSearch.style.display = "none";
        input.value = json.data[3].name;
        gifName.innerHTML = `<h2 id='query-title'>${json.data[3].name}</h2>`;
        closeSearchBtn.style.display = "block";
        searchBtn.style.display = 'none';
        renderGifs(json.data[3].name);
    })
    linkGif5.addEventListener('click', () => {
        boxSearch.style.display = "none";
        input.value = json.data[4].name;
        gifName.innerHTML = `<h2 id='query-title'>${json.data[4].name}</h2>`;
        closeSearchBtn.style.display = "block";
        searchBtn.style.display = 'none';
        renderGifs(json.data[4].name);
    })

    } catch {
        console.log("error");
    }
}

window.addEventListener('click', () => {
    boxSearch.style.display = "none";
    cntInput.style.height = "50px";
})



//renderiza los gifs
async function renderGifs(query) {
    try {
        $gifSection.innerHTML = `<img class='loader' src='assets/loader-image.svg' alt='Cargando...'>`;

        let api = `https://api.giphy.com/v1/gifs/search?api_key=IxndpBv8XXCauGIwjs48PBQm8ZbXIwQq&q=${query}&limit=${limit}&offset=${offset}`;
        let resp = await fetch(api);
        let json = await resp.json();
        console.log(json);

        if (!resp.ok) throw {
            status: resp.status,
            statusText: resp.statusText
        };

        if (json.data.length === 0) {
            $gifSection.innerHTML = `<h2>No existen resultados para : ${query}</h2>`;
        } else {

            json.data.forEach(element => {

                $gifSection.setAttribute('class', 'grid-fluid');

                $template.getElementById('search-gif').src = element.images.original.url ? element.images.original.url : 'no image';
                $template.getElementById('search-gif').alt = element.name;

                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);

            });
            //render gifs
            $gifSection.innerHTML = '';
            $gifSection.appendChild($fragment);
            //display search more button
            searchMoreGifs.style.display = "block";
        }
    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
        $gifSection.innerHTML = `<p>Error ${error.status}: ${message}</p>`;
    }
}





searchMoreGifs.addEventListener('click', () => {
    limit = limit + 12;
    renderGifs(input.value);

});

var offset = 0;
var limit = 12;

searchBtn.addEventListener('click', () => {

    let query = input.value;
    boxSearch.style.display = "none";
    renderGifs(query);
    gifName.innerHTML = `<h2 id='query-title'>${query}</h2>`;
    searchBtn.style.display = 'none';
    $searchResult.setAttribute("class", "text");
    closeSearchBtn.style.display = "block";

    if(localStorage.getItem("theme-mode") == "dark"){
        closeSearchBtn.src = "/assets/close-search-btn-dark.svg";
    }
});

closeSearchBtn.addEventListener('click', () => {
    $gifSection.style.display = 'none';
    $searchResult.innerHTML = '';
    input.value = '';
    searchMoreGifs.style.display = 'none';
    window.location.reload();
    closeSearchBtn.style.display = 'none';
    searchBtn.style.display = 'block';  //No muestra la lupa nuevamente
    if(localStorage.getItem("theme-mode") == "dark"){
        searchBtn.src = "/assets/search-icon-dark.svg";
    }else {
        searchBtn.src = "/assets/search-icon.svg";
    }
});
