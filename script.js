const canvas = document.querySelector("#signal-field");
const context = canvas.getContext("2d");

let width = 0;
let height = 0;
let particles = [];

function resize() {
  const ratio = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(54, Math.floor((width * height) / 26000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    size: Math.random() * 1.2 + 0.6,
  }));
}

function draw() {
  context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(32, 92, 115, 0.42)";
  context.strokeStyle = "rgba(166, 124, 61, 0.12)";
  context.lineWidth = 1;

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    context.beginPath();
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fill();

    for (let i = index + 1; i < particles.length; i += 1) {
      const target = particles[i];
      const distance = Math.hypot(particle.x - target.x, particle.y - target.y);
      if (distance < 126) {
        context.globalAlpha = 1 - distance / 126;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(target.x, target.y);
        context.stroke();
        context.globalAlpha = 1;
      }
    }
  });

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
resize();
draw();
