

//Getting gifs from Giphy Trending API


let imgCtn = document.getElementById('cards-container');

function getTrendingImg(url) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json);

            let trendingImg1 = document.createElement('iframe');
            trendingImg1.setAttribute('src', json.data[0].embed_url);
            trendingImg1.setAttribute('class', 'trending-img');
            

            let trendingImg2 = document.createElement('iframe');
            trendingImg2.setAttribute('src', json.data[1].embed_url);
            trendingImg1.setAttribute('class', 'trending-img');
            

            let trendingImg3 = document.createElement('iframe');
            trendingImg3.setAttribute('src', json.data[2].embed_url);
            trendingImg1.setAttribute('class', 'trending-img');
            
            imgCtn.appendChild(trendingImg1);
            imgCtn.appendChild(trendingImg2);
            imgCtn.appendChild(trendingImg3);

        }).catch(err => {
            console.error('fetch failed', err);
        });
}
getTrendingImg("https://api.giphy.com/v1/gifs/trending?api_key=IxndpBv8XXCauGIwjs48PBQm8ZbXIwQq&limit=3");



 
//

/*

let imgCtn = document.getElementById('cards-container');

function getTrendingImg(url) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            let trendings = [];
            for (let i = 0; i < 3; i++) {
                const image = json[i];
                trendings.push(image);  
            }
            console.log(trendings)

            

        }).catch(err => {
            console.error('fetch failed', err);
        });
}
getTrendingImg("https://api.giphy.com/v1/trending/searches?api_key=IxndpBv8XXCauGIwjs48PBQm8ZbXIwQq");

*/
