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
    "alt": "蓝天下高耸的教堂与前方雕像",
    "titleEn": "Reaching for the Sky",
    "altEn": "A tall church and statue beneath a blue sky",
    "titleJa": "空へ伸びる",
    "altJa": "青空にそびえる教会と手前の彫像",
    "titleKo": "하늘을 향해",
    "altKo": "푸른 하늘 아래 솟은 교회와 앞에 있는 동상"
  },
  {
    "src": "assets/photography/dscf2992.jpg",
    "title": "桥与河岸",
    "alt": "跨越河流的拱桥与河岸建筑",
    "titleEn": "Bridge and Riverbank",
    "altEn": "An arch bridge spanning a river beside hillside buildings",
    "titleJa": "橋と川辺",
    "altJa": "川に架かるアーチ橋と川沿いの建物",
    "titleKo": "다리와 강변",
    "altKo": "강을 가로지르는 아치형 다리와 강변 건물들"
  },
  {
    "src": "assets/photography/dscf3196.jpg",
    "title": "屋顶上的光",
    "alt": "阳光照亮教堂顶部与十字架",
    "titleEn": "Light on the Rooftop",
    "altEn": "Sunlight on a church rooftop and cross",
    "titleJa": "屋根を照らす光",
    "altJa": "教会の屋根と十字架を照らす陽光",
    "titleKo": "지붕 위의 빛",
    "altKo": "교회 지붕과 십자가를 비추는 햇빛"
  },
  {
    "src": "assets/photography/dscf3254.jpg",
    "title": "城堡前的骑士",
    "alt": "骑马雕像与后方金色城堡建筑",
    "titleEn": "Rider by the Castle",
    "altEn": "An equestrian statue in front of a sunlit castle",
    "titleJa": "城の前の騎士",
    "altJa": "日を浴びる城を背にした騎馬像",
    "titleKo": "성 앞의 기사",
    "altKo": "햇빛을 받는 성을 배경으로 한 기마상"
  },
  {
    "src": "assets/photography/dscf3458.jpg",
    "title": "花开的颜色",
    "alt": "阳光下盛开的彩色花朵",
    "titleEn": "Colors in Bloom",
    "altEn": "Colorful flowers blooming in sunlight",
    "titleJa": "花の彩り",
    "altJa": "陽光の中に咲く色とりどりの花",
    "titleKo": "꽃의 빛깔",
    "altKo": "햇살 아래 피어난 형형색색의 꽃"
  },
  {
    "src": "assets/photography/dscf4585.jpg",
    "title": "暮色雪山",
    "alt": "粉紫色暮光下的雪山与水面",
    "titleEn": "Mountains at Dusk",
    "altEn": "Snow-covered mountains and water under a pink-purple evening sky",
    "titleJa": "夕暮れの雪山",
    "altJa": "ピンクと紫の夕空の下に広がる雪山と水面",
    "titleKo": "황혼의 설산",
    "altKo": "분홍빛과 보랏빛 황혼 아래 펼쳐진 설산과 수면"
  },
  {
    "src": "assets/photography/dscf4620.jpg",
    "title": "山间小镇",
    "alt": "雪山脚下临水的小镇与船只",
    "titleEn": "A Mountain Town",
    "altEn": "A waterfront town and boats below snowy mountains",
    "titleJa": "山あいの町",
    "altJa": "雪山の麓にある水辺の町と船",
    "titleKo": "산속 마을",
    "altKo": "설산 아래 물가에 자리한 마을과 배"
  },
  {
    "src": "assets/photography/dscf7224.jpg",
    "title": "暮色中的城市",
    "alt": "夕阳余晖下的城市天际线与河畔建筑剪影",
    "titleEn": "City at Dusk",
    "altEn": "City skyline and riverside buildings silhouetted against the sunset",
    "titleJa": "夕暮れの街",
    "altJa": "夕焼けを背景にした街のスカイラインと川沿いの建物",
    "titleKo": "해 질 녘의 도시",
    "altKo": "노을을 배경으로 한 도시 스카이라인과 강변 건물의 실루엣"
  },
  {
    "src": "assets/photography/dscf7571.jpg",
    "title": "晨光中的雪峰",
    "alt": "蓝天下晨光照亮覆盖积雪的山峰",
    "titleEn": "First Light on the Peak",
    "altEn": "Morning light illuminating a snow-covered peak beneath a blue sky",
    "titleJa": "朝日に染まる峰",
    "altJa": "青空の下で朝日に照らされた雪の峰",
    "titleKo": "아침 햇살의 봉우리",
    "altKo": "푸른 하늘 아래 아침 햇살이 비추는 눈 덮인 봉우리"
  },
  {
    "src": "assets/photography/dscf7930.jpg",
    "title": "山前小憩",
    "alt": "人们坐在石墙上眺望远处群山",
    "titleEn": "A Pause in the Mountains",
    "altEn": "People sitting on a stone wall looking toward distant mountains",
    "titleJa": "山を眺めてひと休み",
    "altJa": "石壁に腰掛けて遠くの山々を眺める人々",
    "titleKo": "산을 바라보며 쉬다",
    "altKo": "돌담에 앉아 먼 산을 바라보는 사람들"
  },
  {
    "src": "assets/photography/dscf9287.jpg",
    "title": "蓝调时刻的桥",
    "alt": "蓝调夜色下亮灯的悬索桥与倒影",
    "titleEn": "Blue Hour Bridge",
    "altEn": "An illuminated suspension bridge reflected in the water at blue hour",
    "titleJa": "ブルーアワーの橋",
    "altJa": "ブルーアワーに水面へ映るライトアップされた吊り橋",
    "titleKo": "블루아워의 다리",
    "altKo": "블루아워에 수면에 비치는 조명 켜진 현수교"
  },
  {
    "src": "assets/photography/dscf9415.jpg",
    "title": "街头掠影",
    "alt": "行驶中的汽车与模糊的街头背景",
    "titleEn": "Passing Through",
    "altEn": "A moving car against a blurred street background",
    "titleJa": "街角の残像",
    "altJa": "ぼやけた街並みを背景に走る車",
    "titleKo": "거리의 잔상",
    "altKo": "흐릿한 거리를 배경으로 달리는 자동차"
  },
  {
    "src": "assets/photography/img_4944.jpg",
    "title": "夜空极光",
    "alt": "夜空中绿色极光与稀疏星点",
    "titleEn": "Northern Lights",
    "altEn": "Green aurora and scattered stars in the night sky",
    "titleJa": "夜空のオーロラ",
    "altJa": "星が点在する夜空に広がる緑のオーロラ",
    "titleKo": "밤하늘의 오로라",
    "altKo": "별이 드문드문 보이는 밤하늘의 초록빛 오로라"
  }
];

const galleryLanguage = document.documentElement.lang.split("-")[0];
const gallerySuffix = { en: "En", ja: "Ja", ko: "Ko" }[galleryLanguage] || "";
const galleryLabels = {
  zh: { unavailable: "照片待添加", resume: "继续播放", pause: "暂停播放" },
  en: { unavailable: "Photo unavailable", resume: "Resume slideshow", pause: "Pause slideshow" },
  ko: { unavailable: "사진을 표시할 수 없습니다", resume: "슬라이드 재생", pause: "슬라이드 일시정지" },
  ja: { unavailable: "写真を表示できません", resume: "再生を再開", pause: "再生を一時停止" },
}[galleryLanguage] || { unavailable: "照片待添加", resume: "继续播放", pause: "暂停播放" };
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
    label.textContent = galleryLabels.unavailable;
    placeholder.append(number, label);
    if (photo.src) {
      const image = document.createElement("img");
      image.className = "gallery-image";
      image.alt = photo[`alt${gallerySuffix}`];
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
    caption.textContent = photo[`title${gallerySuffix}`];
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
    galleryToggle.textContent = manuallyPaused ? galleryLabels.resume : galleryLabels.pause;
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
