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


//Grabar button ////

const videoWidget = document.getElementById('videoWidget');
const config = {
    audio: false,
    video: {
        height: 400,
        width: 1050
    }
}

init();

async function init () {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(config);
        videoWidget.srcObject = stream;
        videoWidget.play();
    }
    catch (error) {
        console.log(error);
        
    }
}

async function test(stream) {
    let recorder = RecordRTC(stream, {
        type: 'gif'
    });
    let recordBtn = document.getElementById('camera-on');
    recordBtn.addEventListener('click', () => {
        recorder.startRecording();
    });


    // recorder.startRecording();


    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);

    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);
        // saveGif(blob);
    });
}

/////
// usar fetch para subir el gif POST

// necesito url para subir el gif

// Buscar info de como usar el POST con fetch

// Como subir data en la peticion

//obtener api_key

// loguear la respuesta

//recueprar el id para sumarlo a la pagina de los gifs

//get gif by id endpoint (en la pagina de giphy) original
// en el local estorage guarda el id del gif para poder subirlo y quede en la pagina

async function saveGif(gif) {
    const API_KEY = 'IxndpBv8XXCauGIwjs48PBQm8ZbXIwQq';
    const URL = `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`;
    const formData = new FormData();
    formData.append('file', gif);
    const apiConfig = {
        method: 'POST',
        body: formData
        
    }
    const response = await fetch(URL, apiConfig);
    const json = await response.json();

    console.log(json);
    
}
