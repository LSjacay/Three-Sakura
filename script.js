// ==========================================
// 1. LÓGICA DEL CONTADOR DE TIEMPO
// ==========================================

const startTime = Date.now();

function updateCounter() {
  const currentTime = Date.now();
  const elapsedTimeSeconds = Math.floor((currentTime - startTime) / 1000);

  const hours = Math.floor(elapsedTimeSeconds / 3600);
  const minutes = Math.floor((elapsedTimeSeconds % 3600) / 60);
  const seconds = elapsedTimeSeconds % 60;

  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCounter, 1000);
updateCounter();


// ==========================================
// 2. ANIMACIÓN DE PÉTALOS DE SAKURA (CANVAS)
// ==========================================

const canvas = document.getElementById('sakuraCanvas');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const petalColors = [
  '#ffb6c1',
  '#ffc0cb',
  '#ffe4e1',
  '#ff69b4',
  '#fff0f5'
];

class Petal {
  constructor() {
    this.init();
  }

  init() {
    this.x = Math.random() * width;
    this.y = Math.random() * height - height;
    this.size = Math.random() * 5 + 5;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.angle = Math.random() * 360;
    this.spin = Math.random() * 0.02 - 0.01;
    this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.y * 0.01) + this.speedX;
    this.angle += this.spin;

    if (this.y > height + 10) {
      this.init();
      this.y = -10;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.restore();
  }
}

const petals = Array.from({ length: 70 }, () => new Petal());

function animate() {
  ctx.clearRect(0, 0, width, height);
  petals.forEach((petal) => {
    petal.update();
    petal.draw();
  });
  requestAnimationFrame(animate);
}

animate();


// ==========================================
// 3. REPRODUCCIÓN AUTOMÁTICA DE MÚSICA
// ==========================================

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');

function playAudio() {
  bgMusic.play().then(() => {
    if (musicIcon) musicIcon.textContent = '🔊';
    if (musicBtn) musicBtn.classList.add('playing');
  }).catch(() => {
    // Si el navegador bloquea el autoplay inicial, espera interacción
  });
}

// Intentar reproducir de inmediato al cargar la página
window.addEventListener('load', playAudio);

// Disparar audio en el primer clic o toque en cualquier lugar
const handleFirstInteraction = () => {
  if (bgMusic.paused) {
    playAudio();
  }
  document.removeEventListener('click', handleFirstInteraction);
  document.removeEventListener('keydown', handleFirstInteraction);
  document.removeEventListener('touchstart', handleFirstInteraction);
};

document.addEventListener('click', handleFirstInteraction);
document.addEventListener('keydown', handleFirstInteraction);
document.addEventListener('touchstart', handleFirstInteraction);

// Control de pausa/play manual en el botón
if (musicBtn) {
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgMusic.paused) {
      bgMusic.play();
      musicIcon.textContent = '🔊';
      musicBtn.classList.add('playing');
    } else {
      bgMusic.pause();
      musicIcon.textContent = '🎵';
      musicBtn.classList.remove('playing');
    }
  });
}