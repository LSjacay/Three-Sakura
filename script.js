// ==========================================
// 1. LÓGICA DEL CONTADOR DE TIEMPO
// ==========================================

// Guardamos el momento exacto en que carga la página
const startTime = Date.now();

function updateCounter() {
  const currentTime = Date.now();
  // Diferencia en segundos
  const elapsedTimeSeconds = Math.floor((currentTime - startTime) / 1000);

  // Cálculos de horas, minutos y segundos
  const hours = Math.floor(elapsedTimeSeconds / 3600);
  const minutes = Math.floor((elapsedTimeSeconds % 3600) / 60);
  const seconds = elapsedTimeSeconds % 60;

  // Actualizamos el HTML (formato con 2 dígitos: "05", "09", etc.)
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Actualizar cada 1 segundo (1000 ms)
setInterval(updateCounter, 1000);
updateCounter(); // Ejecución inicial inmediata


// ==========================================
// 2. ANIMACIÓN DE PÉTALOS DE SAKURA (CANVAS)
// ==========================================

const canvas = document.getElementById('sakuraCanvas');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// Ajustar el canvas si se cambia el tamaño de la ventana
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Tonos rosados para los pétalos
const petalColors = [
  '#ffb6c1', // Rosa claro
  '#ffc0cb', // Rosa pastel
  '#ffe4e1', // Rosa muy suave
  '#ff69b4', // Rosa fucsia suave
  '#fff0f5'  // Blanco rosado
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

    // Si sale de la pantalla por abajo, reaparece arriba
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

// Crear 70 pétalos en pantalla
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
// 3. CONTROL DE REPRODUCCIÓN DE MÚSICA
// ==========================================

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');

// Control mediante el botón flotante
musicBtn.addEventListener('click', () => {
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

// Iniciar música automáticamente con el primer clic del usuario en la página
document.body.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      musicIcon.textContent = '🔊';
      musicBtn.classList.add('playing');
    }).catch(() => {
      // Si el navegador bloquea el auto-play, el botón manual sigue funcionando
    });
  }
}, { once: true });