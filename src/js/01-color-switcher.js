
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
};


const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let intervalId = null;

function onStart() {
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();           
    }, 1000);

    startBtn.disabled = true; 
    stopBtn.disabled = false;
};
  
function onStop() {
    clearInterval(intervalId);

    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);
