const d = document,
    $gifSection = d.getElementById('gif-section'),
    $template = d.getElementById('gif-template').content,
    $searchResult = d.getElementById('search-result'),
    $fragment = d.createDocumentFragment();
let searchBtn = document.getElementById('search-icon');
let input = document.getElementById('search');
let searchMoreGifs = document.getElementById('ver-mas-gifos');

var offset = 0;
var limit = 12;

searchBtn.addEventListener('click', () => {
    let query = input.value;
    renderGifs(query);
    $searchResult.innerHTML = `<h2 id='query-title'>${query}</h2>`;
});


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