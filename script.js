// const animation1 = lottie.loadAnimation({
//   container: document.getElementById('scheme'),
//   renderer: 'svg',
//   loop: true,
//   autoplay: true,
//   path: './assets/anim1corr.json'
// });

// const animation2 = lottie.loadAnimation({
//   container: document.getElementById('circs'),
//   renderer: 'svg',
//   loop: true,
//   autoplay: true,
//   path: './assets/circs.json'
// });

const btnLimbs = document.getElementById('btn-limbs');
const btnOrgans = document.getElementById('btn-organs');

const mediaViewer = document.querySelector('.media-viewer');
const mediaImage = document.getElementById('media-image');
const defaultContent = document.querySelectorAll('.default-left-content');

const limbsImages = [
  './assets/leg1.jpg',
  './assets/leg2.jpg',
  './assets/hand1.jpg',
  './assets/hand2.jpg'
];

const organsImages = [
  './assets/heart1.webp',
  './assets/eye1.jpg',
  './assets/liver1.webp'
];

let currentImages = [];
let currentIndex = 0;
let sliderInterval = null;
let currentMode = null;

function showDefaultContent() {
  defaultContent.forEach(el => el.classList.remove('hidden'));
  mediaViewer.classList.add('hidden');
}

function showMediaViewer() {
  defaultContent.forEach(el => el.classList.add('hidden'));
  mediaViewer.classList.remove('hidden');
}

function setActiveButton(activeBtn) {
  btnLimbs.classList.remove('active');
  btnOrgans.classList.remove('active');
  activeBtn.classList.add('active');
}

function changeSlide() {
  if (!currentImages.length) return;

  mediaViewer.classList.add('fade-out');

  setTimeout(() => {
    mediaImage.src = currentImages[currentIndex];
    mediaViewer.classList.remove('fade-out');
    currentIndex = (currentIndex + 1) % currentImages.length;
  }, 500);
}

function startSlider(images, mode, activeBtn) {
  if (currentMode === mode) return;

  currentMode = mode;
  currentImages = images;
  currentIndex = 0;

  clearInterval(sliderInterval);

  showMediaViewer();
  setActiveButton(activeBtn);

  mediaImage.src = currentImages[currentIndex];
  currentIndex = (currentIndex + 1) % currentImages.length;

  sliderInterval = setInterval(changeSlide, 2500);
}

btnLimbs.addEventListener('click', () => {
  startSlider(limbsImages, 'limbs', btnLimbs);
});

btnOrgans.addEventListener('click', () => {
  startSlider(organsImages, 'organs', btnOrgans);
});

//black panels
const blackPanels = document.querySelectorAll('.black-panel');
blackPanels.forEach(panel => {
  setInterval(() => {
    const randomWidth = 50 + Math.random() * 50; // от 30% до 70%
    panel.style.width = `${randomWidth}%`;
  }, 120);
});


//screen3 full
const lines = document.querySelectorAll('.lines');
const blockScheme = document.querySelector('.block-scheme');
const schemeCircle = document.querySelector('.circ-on-scheme');

function updateSchemeState() {
  const allLinesExpanded = [...lines].every(line =>
    line.classList.contains('expanded')
  );

  const blockConnected = blockScheme.classList.contains('shifted');

  if (allLinesExpanded && blockConnected) {
    schemeCircle.classList.add('rotating');
  } else {
    schemeCircle.classList.remove('rotating');
  }
}

lines.forEach(line => {
  line.addEventListener('click', () => {
    line.classList.toggle('expanded');
    updateSchemeState();
  });
});

if (blockScheme) {
  blockScheme.addEventListener('click', () => {
    blockScheme.classList.toggle('shifted');
    updateSchemeState();
  });
}



//screen4

const puzzleBox = document.querySelector('.puzzle-box');
if (puzzleBox) {
  puzzleBox.addEventListener('click', () => {
    const cells = puzzleBox.querySelectorAll('.cell');

    cells.forEach(cell => {
      if (cell.classList.contains('pos-1')) {
        cell.classList.remove('pos-1');
        cell.classList.add('pos-2');
      } else if (cell.classList.contains('pos-2')) {
        cell.classList.remove('pos-2');
        cell.classList.add('pos-3');
      } else if (cell.classList.contains('pos-3')) {
        cell.classList.remove('pos-3');
        cell.classList.add('pos-4');
      } else if (cell.classList.contains('pos-4')) {
        cell.classList.remove('pos-4');
        cell.classList.add('pos-1');
      }
    });
  });
}

//screen5 пеинт полностью

const canvas = document.getElementById('paint-canvas');
const clearButton = document.querySelector('.button-clear');
const randomColorButton = document.querySelector('.button-random-color');

if (canvas && clearButton && randomColorButton) {
  const ctx = canvas.getContext('2d');

  let isDrawing = false;
  let currentColor = '#FB00FF';
  let lastX = 0;
  let lastY = 0;

  function setupBrush() {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 8;
    ctx.strokeStyle = currentColor;
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    setupBrush();
  }

  function getCoords(event) {
    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  function startDrawing(event) {
    isDrawing = true;
    const coords = getCoords(event);
    lastX = coords.x;
    lastY = coords.y;
  }

  function draw(event) {
    if (!isDrawing) return;

    const coords = getCoords(event);

    ctx.strokeStyle = currentColor;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    lastX = coords.x;
    lastY = coords.y;
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);
    setupBrush();
  }

  function getRandomPink() {
    const pinks = [
      '#FFB6C1',
      '#FF69B4',
      '#FF1493',
      '#DB7093',
      '#FF85C1',
      '#FB00FF',
      '#F8A1D1',
      '#E75480',
      '#FF77FF',
      '#FF5DA2'
    ];

    return pinks[Math.floor(Math.random() * pinks.length)];
  }

  function setRandomPinkColor() {
    currentColor = getRandomPink();
    ctx.strokeStyle = currentColor;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);

  clearButton.addEventListener('click', clearCanvas);
  randomColorButton.addEventListener('click', setRandomPinkColor);
}