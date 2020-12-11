//Crear GIFO button
let createGifoBtn = document.querySelector('#create-gif');

createGifoBtn.addEventListener('mouseover', () => {
    createGifoBtn.src = 'assets/create-gifo-btn-hover.svg';
});
createGifoBtn.addEventListener('mouseout', () => {
    createGifoBtn.src = 'assets/create-gifo-btn.svg';
});


//Variables

let cameraBtn = document.getElementById('camera-btn');
let record = document.getElementById('grabar-btn');
let endRecord = document.getElementById('finalizar-btn');
let uploadGifo = document.getElementById('subir-btn');

let mainTitle = document.getElementById('create-title');
let paragraph = document.getElementById('create-paragraph-one');
let paragraph2 = document.getElementById('create-paragraph-two');

let number1 = document.getElementById('btn-1');
let number2 = document.getElementById('btn-2');
let number3 = document.getElementById('btn-3');

let createContainer = document.getElementById('create-container');
let video = document.getElementById('videoWidget');
let videoContent = document.getElementById('video-content');

//Configuración del video
const config = {
    audio: false,
    video: {
        height: 450,
        width: 930
    }
}

//Cuando presiono el botón comenzar
cameraBtn.addEventListener('click', () => {
    cameraBtn.style.display = 'none';
    record.style.display = 'block';
    //cambia el contenido del html
    mainTitle.textContent = 'Nos das acceso a tu cámara?';
    paragraph.textContent = 'El acceso a tu cámara será válido sólo';
    paragraph2.textContent = 'por el tiempo en el que estés creando el GIFO';
    //se fija si esta en modo nocturno o no
    if (localStorage.getItem("theme-mode") == "dark") {
        number1.src = '/assets/paso-a-paso-dark-hover-1.svg';
    } else {
        number1.src = '/assets/paso-a-paso-btn-hover-1.svg';
    }
});

//cuando presiono el botón grabar se borra el contenido del html y aparece el video
record.addEventListener('click', () => {
    record.style.display = 'none';
    endRecord.style.display = 'block';
    createContainer.style.display = 'none';
    videoWidget.style.display = 'block';
    init();
    counter();
    //se fija si esta en modo nocturno o no la pagina
    if (localStorage.getItem("theme-mode") == "dark") {
        number1.src = '/assets/paso-a-paso-btn-dark-1.svg';
        number2.src = '/assets/paso-a-paso-dark-hover-2.svg';
    } else {
        number1.src = '/assets/paso-a-paso-btn-1.svg';
        number2.src = '/assets/paso-a-paso-btn-hover-2.svg';
    }
});


//Función que calcula los segundos que corren de grabación
function counter () {
    let seconds = 0;
    let id = setInterval(() => {
        seconds++;
        videoContent.innerHTML = `00:0${seconds}`;
        endRecord.addEventListener('click', () => {
            clearInterval(id);
            videoContent.textContent = "REPETIR GRABACION";
            
        });
            
    }, 1000);
}

videoContent.addEventListener('click', () => {
    videoContent.textContent = "";
    record.style.display = 'block';
    uploadGifo.style.display = 'none';
});


endRecord.addEventListener('click', () => {
    endRecord.style.display = 'none';
    uploadGifo.style.display = 'block';
});
//usar el modulo para calcular los minutos 3600 segundo 1 hora

//Función para grabar el video ////
async function init () {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(config);
        video.srcObject = stream;
        video.play();
    }
    catch (error) {
        console.log(error);
        
    }
}

async function recordGifo(stream) {
    let recorder = RecordRTC(stream, {
        type: 'gif'
    });

    record.addEventListener('click', () => {
        recorder.startRecording();
    });
    //recorder.startRecording();

    endRecord.addEventListener('click', 
    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);
        // saveGif(blob);
    }));
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