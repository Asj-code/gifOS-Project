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
let videoWidget = document.getElementById('videoWidget');
let videoContent = document.getElementById('video-content');



/////////Funcionalidad de los botones///////////

//Cuando presiono el botón comenzar
cameraBtn.addEventListener('click', () => {
    cameraBtn.style.display = 'none';
    record.style.display = 'block';



    init();

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






//Función que calcula los segundos que corren de grabación
function counter() {
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


const config = {
    audio: false,
    video: {
        height: 480,
        width: 720
    }
}


async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(config);
        videoWidget.srcObject = stream;
        videoWidget.play();
        videoWidget.style.display = 'block';
        createContainer.style.display = 'none';

        test(stream);

    } catch (error) {
        console.log(error);
    }
}


async function test(stream) {
    let recorder = RecordRTC(stream, {
        type: 'gif'
    });

    record.addEventListener('click', () => {
        recorder.startRecording();
        record.style.display = 'none';
        endRecord.style.display = 'block';
        counter();
        test(stream);
        // se fija si esta en modo nocturno o no la pagina
        if (localStorage.getItem("theme-mode") == "dark") {
            number1.src = '/assets/paso-a-paso-btn-dark-1.svg';
            number2.src = '/assets/paso-a-paso-dark-hover-2.svg';
        } else {
            number1.src = '/assets/paso-a-paso-btn-1.svg';
            number2.src = '/assets/paso-a-paso-btn-hover-2.svg';
        }
    });

    endRecord.addEventListener('click', () => {
        endRecord.style.display = 'none';
        uploadGifo.style.display = 'block';
        recorder.stopRecording(function () {
            let blob = recorder.getBlob();
            save(blob);
        })
    });

    videoContent.addEventListener('click', () => {
        videoContent.textContent = "";
        record.style.display = 'block';
        uploadGifo.style.display = 'none';
        test(stream);
    });

}


async function save(gif) {
    try {
        const API_KEY = 'IxndpBv8XXCauGIwjs48PBQm8ZbXIwQq';
        const URL = `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`;
        const formData = new FormData();
        formData.append('file', gif);
        console.log(gif);
        console.log(formData);


        const apiConfig = {
            mode: "cors",
            method: 'POST',
            body: formData
        }

        const response = await fetch(URL, apiConfig);
        const json = await response.json();
        console.log(json);

    } catch (error) {
        console.log(error);
        
    }
}