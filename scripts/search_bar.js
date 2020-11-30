////////////////////SEARCH BAR FUNCTION/////////////////////////////////////

const d = document,
$gifSection = d.getElementById('gif-section'),
$template = d.getElementById('gif-template').content,
$fragment = d.createDocumentFragment();

d.addEventListener('keypress', async event => {
    if(event.target.matches('#search')){
    // console.log(event.key);
        if(event.key === 'Enter'){
            try {
                $gifSection.innerHTML = `<img class='loader' src='loader.svg' alt='Cargando...'>`;
                
                let query = event.target.value;
                let api = `https://api.giphy.com/v1/gifs/search?api_key=IxndpBv8XXCauGIwjs48PBQm8ZbXIwQq&q=${query}`;
                let resp = await fetch(api);
                let json = await resp.json();
                // console.log(resp);
                // console.log(json.data.length);
                if(!resp.ok) throw { status: resp.status, statusText: resp.statusText };
                if(json.data.length === 0){
                    $gifSection.innerHTML = `<h2>No existen resultados para : ${query}</h2>`;
                }else{
                    json.data.forEach(element => {
                                
                    $template.getElementById('search-gif').src = element.images.original.url ? element.images.original.url : 'no image';
                    $template.getElementById('search-gif').alt = element.name;
                    $template.getElementById('search-gif').style.maxWidth='100%';
                    $template.getElementById('gifs').style.margin = '40px';
                    $template.getElementById('gifs').style.width = '260px';
                    $template.getElementById('gifs').style.height = '200px';
                    
                    let $clone = d.importNode($template, true);
                    $fragment.appendChild($clone);
                    });

                    $gifSection.innerHTML = '';
                    $gifSection.appendChild($fragment);
                }
                } catch (error) {
                    // console.log(error);
                    let message = error.statusText || "Ocurrió un error";
                    $gifSection.innerHTML = `<p>Error ${error.status}: ${message}</p>`;
                    }
                }
            }
        })

