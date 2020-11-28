let btnCreategif = document.getElementById('btn-comenzar');
let titleCreate = document.getElementById('create-title');
let paragraph = document.getElementById('create-paragraph');
let numbers = document.getElementById('bg-numb');
let recordBtn = document.getElementById('record-num');

btnCreategif.addEventListener('click', () => {
    btnCreategif.style.display = 'none';
    titleCreate.textContent = 'Nos das acceso a tu cámara?';
    paragraph.textContent = 'El acceso a tu cámara será válido sólo por el tiempo en el que estes creando el GIFO.';
    numbers.style.backgroundColor = '#572EE5';
    numbers.style.color = 'white';
});

recordBtn.addEventListener('click', () => {
    
    recordBtn.style.backgroundColor = '#572EE5';
    recordBtn.style.color = 'white';
    btnCreategif.style.display = 'block';
    btnCreategif.textContent = 'GRABAR';
    titleCreate.style.display = 'none';
    paragraph.style.display = 'none';
    numbers.style.backgroundColor = 'white';
    numbers.style.color = '#572EE5';
});

