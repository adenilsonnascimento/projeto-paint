const canvas = document.getElementById('canvas');
const aumentarBtn = document.getElementById('aumentar');
const diminuirBtn = document.getElementById('diminuir');
const tamanhoEL = document.getElementById('tamanho');
const colorEl = document.getElementById('color');
const apagarEl = document.getElementById('apagar');

const ctx = canvas.getContext('2d');

let apagar = 10; 
let isPressed = false;
colorEl.value = 'black';
let color = colorEl.value;
let x;
let y;

function atualizarTamanhoCanvas() {
    canvas.width = window.innerWidth  * 0.8;
    canvas.height = window.innerHeight;
}

// Chamar a função de atualização do tamanho do canvas quando a janela for redimensionada
window.addEventListener('resize', atualizarTamanhoCanvas);

// Chamar a função de atualização do tamanho do canvas uma vez no carregamento inicial da página
atualizarTamanhoCanvas();

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

document.addEventListener('mouseup', (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);

        x = x2;
        y = y2;
    }
});

// Desenhar um círculo

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, apagar, 0, Math.PI * 2); 
    ctx.fillStyle = color;
    ctx.fill();
}

// Desenhar uma linha

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = apagar * 2; 
    ctx.stroke();
}

// Número na tela do tamanho do lapis 

function updateSizeOnScreen() {
    tamanhoEL.innerText = apagar; 
}

// aumentar lapis

aumentarBtn.addEventListener('click', () => {
    apagar += 1;

    if(apagar > 50) {
        apagar = 50;
    }

    updateSizeOnScreen();
});

// diminuir lapis

diminuirBtn.addEventListener('click', () => {
    apagar -= 1;

    if(apagar < 5) {
        apagar = 1;
    }

    updateSizeOnScreen();
});

// mudar cor

colorEl.addEventListener('change', (e) => color = e.target.value);

// apagar tudo

apagarEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));

