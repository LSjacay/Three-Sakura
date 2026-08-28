// --- 1. EFECTO DE TEXTO (TYPEWRITER) ---
const message = `Flores Amarillas para el amor de mi vida:

Si pudiera elegir un lugar seguro, sería a tu lado.

Cuanto más tiempo estoy contigo más te amo.

— I Love You! —`;

let textIndex = 0;
const typingElement = document.getElementById("typing-text");

function typeWriter() {
  if (textIndex < message.length) {
    typingElement.innerHTML += message.charAt(textIndex);
    textIndex++;
    setTimeout(typeWriter, 50);
  }
}

// --- 2. CONTADOR DE TIEMPO ---
// Cambia esta fecha por la fecha de tu aniversario o inicio de relación
const startDate = new Date("2025-08-27T00:00:00");

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("timer").innerText = 
    `${days} días ${hours.toString().padStart(2, '0')} horas ` +
    `${minutes.toString().padStart(2, '0')} minutos ` +
    `${seconds.toString().padStart(2, '0')} segundos`;
}

setInterval(updateTimer, 1000);

// --- 3. DIBUJO Y CRECIMIENTO DEL ÁRBOL ---
const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

function drawFlower(x, y, radius) {
  // Pétalos amarillos
  ctx.fillStyle = "#ffd700";
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    const angle = (i * Math.PI) / 4;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    ctx.arc(px, py, radius / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  // Centro marrón del girasol
  ctx.beginPath();
  ctx.arc(x, y, radius / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#5c3a21";
  ctx.fill();
}

function drawBranch(startX, startY, len, angle, branchWidth) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = "#5c3a21";
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  if (len < 10) {
    // Dibujar flor amarilla en el extremo de las ramas pequeñas
    drawFlower(0, -len, 4);
    ctx.restore();
    return;
  }

  // Generar ramas secundarias de forma recursiva
  drawBranch(0, -len, len * 0.75, angle + 20, branchWidth * 0.7);
  drawBranch(0, -len, len * 0.75, angle - 20, branchWidth * 0.7);

  ctx.restore();
}

// Iniciar animación al cargar la página
window.onload = () => {
  typeWriter();
  updateTimer();
  
  // Dibujar el tronco y las ramas (X, Y, Longitud inicial, Ángulo, Ancho)
  drawBranch(canvas.width / 2, canvas.height - 20, 100, 0, 12);
};