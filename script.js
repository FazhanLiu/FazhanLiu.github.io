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

// Add more exported photographs here; keep the originals outside the web assets.
const galleryPhotos = [
  {
    "src": "assets/photography/dscf2459.jpg",
    "title": "向天空延伸",
    "alt": "蓝天下高耸的教堂与前方雕像"
  },
  {
    "src": "assets/photography/dscf2992.jpg",
    "title": "桥与河岸",
    "alt": "跨越河流的拱桥与河岸建筑"
  },
  {
    "src": "assets/photography/dscf3196.jpg",
    "title": "屋顶上的光",
    "alt": "阳光照亮教堂顶部与十字架"
  },
  {
    "src": "assets/photography/dscf3254.jpg",
    "title": "城堡前的骑士",
    "alt": "骑马雕像与后方金色城堡建筑"
  },
  {
    "src": "assets/photography/dscf3458.jpg",
    "title": "花开的颜色",
    "alt": "阳光下盛开的彩色花朵"
  },
  {
    "src": "assets/photography/dscf4585.jpg",
    "title": "暮色雪山",
    "alt": "粉紫色暮光下的雪山与水面"
  },
  {
    "src": "assets/photography/dscf4620.jpg",
    "title": "山间小镇",
    "alt": "雪山脚下临水的小镇与船只"
  },
  {
    "src": "assets/photography/dscf7224.jpg",
    "title": "暮色中的城市",
    "alt": "夕阳余晖下的城市天际线与河畔建筑剪影"
  },
  {
    "src": "assets/photography/dscf7571.jpg",
    "title": "晨光中的雪峰",
    "alt": "蓝天下晨光照亮覆盖积雪的山峰"
  },
  {
    "src": "assets/photography/dscf7930.jpg",
    "title": "山前小憩",
    "alt": "人们坐在石墙上眺望远处群山"
  },
  {
    "src": "assets/photography/dscf9287.jpg",
    "title": "蓝调时刻的桥",
    "alt": "蓝调夜色下亮灯的悬索桥与倒影"
  },
  {
    "src": "assets/photography/dscf9415.jpg",
    "title": "街头掠影",
    "alt": "行驶中的汽车与模糊的街头背景"
  },
  {
    "src": "assets/photography/img_4944.jpg",
    "title": "夜空极光",
    "alt": "夜空中绿色极光与稀疏星点"
  }
];

const gallery = document.querySelector(".gallery-viewport");
const galleryTrack = document.querySelector(".gallery-track");
const galleryToggle = document.querySelector(".gallery-toggle");

if (gallery && galleryTrack && galleryToggle && galleryPhotos.length > 0) {
  // Keep a full loop wider than the viewport even with only a few photographs.
  const sequence = Array.from(
    { length: Math.max(1, Math.ceil(6 / galleryPhotos.length)) },
    () => galleryPhotos,
  ).flat();
  sequence.forEach((photo, index) => {
    const card = document.createElement("figure");
    card.className = "gallery-photo";
    if (index >= galleryPhotos.length) card.setAttribute("aria-hidden", "true");
    const placeholder = document.createElement("div");
    placeholder.className = "gallery-placeholder";
    const number = document.createElement("strong");
    number.textContent = String((index % galleryPhotos.length) + 1).padStart(2, "0");
    const label = document.createElement("span");
    label.textContent = "照片待添加";
    placeholder.append(number, label);
    if (photo.src) {
      const image = document.createElement("img");
      image.className = "gallery-image";
      image.alt = photo.alt;
      image.decoding = "async";
      image.addEventListener("error", () => {
        image.hidden = true;
        placeholder.hidden = false;
      });
      placeholder.hidden = true;
      image.src = photo.src;
      card.append(image);
    }
    const caption = document.createElement("figcaption");
    caption.textContent = photo.title;
    card.append(placeholder, caption);
    galleryTrack.append(card);
  });

  // A second set makes the transition from the last photo to the first seamless.
  Array.from(galleryTrack.children).forEach((card) => {
    const copy = card.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    const image = copy.querySelector("img");
    if (image) {
      image.alt = "";
      image.addEventListener("error", () => {
        image.hidden = true;
        copy.querySelector(".gallery-placeholder").hidden = false;
      });
    }
    galleryTrack.append(copy);
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let manuallyPaused = reducedMotion.matches;
  let hovered = false;
  let focused = false;
  let dragging = false;
  let interactionUntil = 0;
  let velocity = 0;
  let lastTime = null;
  let loopWidth = 0;
  let position = 0;

  function updateButton() {
    galleryToggle.textContent = manuallyPaused ? "继续播放" : "暂停播放";
    galleryToggle.setAttribute("aria-pressed", String(manuallyPaused));
  }

  function measureGallery() {
    loopWidth = galleryTrack.children[sequence.length].offsetLeft - galleryTrack.children[0].offsetLeft;
  }

  galleryToggle.addEventListener("click", () => {
    manuallyPaused = !manuallyPaused;
    updateButton();
  });
  gallery.addEventListener("mouseenter", () => { hovered = true; });
  gallery.addEventListener("mouseleave", () => { hovered = false; });
  gallery.addEventListener("focusin", () => { focused = true; });
  gallery.addEventListener("focusout", () => { focused = false; });
  gallery.addEventListener("pointerdown", () => { dragging = true; });
  window.addEventListener("pointerup", () => { dragging = false; });
  window.addEventListener("pointercancel", () => { dragging = false; });
  gallery.addEventListener("wheel", () => { interactionUntil = performance.now() + 1500; }, { passive: true });
  gallery.addEventListener("touchmove", () => { interactionUntil = performance.now() + 1500; }, { passive: true });
  reducedMotion.addEventListener("change", (event) => {
    manuallyPaused = event.matches;
    velocity = 0;
    updateButton();
  });
  new ResizeObserver(measureGallery).observe(gallery);
  updateButton();
  measureGallery();

  function animateGallery(time) {
    const elapsed = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    const interacting = dragging || time < interactionUntil;
    const paused = manuallyPaused || hovered || focused || interacting || document.hidden;
    // Exponential easing brings 32 px/s to a gentle stop in about one second.
    const targetVelocity = paused ? 0 : 32;
    velocity += (targetVelocity - velocity) * (1 - Math.exp(-elapsed * 5));
    if (Math.abs(velocity) < 0.1) velocity = 0;
    if (interacting) {
      position = gallery.scrollLeft;
    } else if (loopWidth > 0 && velocity > 0) {
      // Preserve fractional pixels so slow movement does not stall on rounding.
      if (Math.abs(gallery.scrollLeft - position) > 2) position = gallery.scrollLeft;
      position = (position + velocity * elapsed) % loopWidth;
      gallery.scrollLeft = position;
    }
    requestAnimationFrame(animateGallery);
  }
  requestAnimationFrame(animateGallery);
}
