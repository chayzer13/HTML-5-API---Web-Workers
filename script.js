const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const page1Btn = document.getElementById('page1Btn');
const page2Btn = document.getElementById('page2Btn');
const contentDiv = document.getElementById('content');

function updateContent(page) {
  let htmlContent = '';
  switch (page) {
    case 'page1':
      htmlContent = `<h3>Страница 1</h3><p>Содержимое страницы 1.</p>`;
      break;
    case 'page2':
      htmlContent = `<h3>Страница 2</h3><p>Содержимое страницы 2.</p>`;
      break;
    default:
      htmlContent = `<h3>Добро пожаловать!</h3>`;
  }
  contentDiv.innerHTML = htmlContent;
}

page1Btn.addEventListener('click', () => {
  history.pushState({ page: 'page1' }, 'Страница 1', '?page=1');
  updateContent('page1');
});

page2Btn.addEventListener('click', () => {
  history.pushState({ page: 'page2' }, 'Страница 2', '?page=2');
  updateContent('page2');
});

backBtn.addEventListener('click', () => {
  history.back();
});

forwardBtn.addEventListener('click', () => {
  history.forward();
});

window.addEventListener('popstate', (event) => {
  updateContent(event.state ? event.state.page : null);
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let angle = 0;
let radius = 1;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let spiralSpeed = 0.05;

function drawSpiral() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);

  for (let i = 0; i < 100; i++) {
    angle += spiralSpeed;
    radius += 0.5;
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();

  requestAnimationFrame(drawSpiral);
}

drawSpiral();

const factorialInput = document.getElementById('factorial-input');
const calculateBtn = document.getElementById('calculateBtn');
const workerResult = document.getElementById('worker-result');
const errorMessage = document.getElementById('error-message');

const worker = new Worker('worker.js');

calculateBtn.addEventListener('click', () => {
  const number = parseInt(factorialInput.value);

  if (isNaN(number) || number < 0) {
    errorMessage.textContent = 'Введите положительное число.';
    return;
  }

  errorMessage.textContent = '';
  worker.postMessage(number);
});

worker.addEventListener('message', (event) => {
  workerResult.textContent = `Результат: ${event.data}`;
});
