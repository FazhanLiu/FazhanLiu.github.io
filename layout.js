(() => {
  const root = document.documentElement;
  const screen = window.matchMedia("(max-width: 900px)");
  const translations = {
    zh: { mobile: "手机布局", desktop: "电脑布局", toMobile: "切换到手机布局", toDesktop: "切换到电脑布局", menu: "导航菜单" },
    en: { mobile: "Mobile layout", desktop: "Desktop layout", toMobile: "Switch to mobile layout", toDesktop: "Switch to desktop layout", menu: "Navigation menu" },
    ja: { mobile: "スマホ表示", desktop: "PC表示", toMobile: "スマホ表示に切り替え", toDesktop: "PC表示に切り替え", menu: "ナビゲーション" },
    ko: { mobile: "모바일 보기", desktop: "PC 보기", toMobile: "모바일 보기로 전환", toDesktop: "PC 보기로 전환", menu: "탐색 메뉴" },
  };
  const labels = translations[root.lang.split("-")[0]] || translations.zh;
  let savedLayout = null;
  try {
    const stored = localStorage.getItem("portfolio-layout");
    if (stored === "mobile" || stored === "desktop") savedLayout = stored;
  } catch {}
  let toggle;
  let menu;
  function closeMenu() {
    root.dataset.menuOpen = "false";
    if (menu) menu.setAttribute("aria-expanded", "false");
  }
  function apply(layout) {
    root.dataset.layout = layout;
    closeMenu();
    if (!toggle) return;
    const mobile = layout === "mobile";
    toggle.setAttribute("aria-pressed", String(mobile));
    toggle.setAttribute("aria-label", mobile ? labels.toDesktop : labels.toMobile);
    toggle.querySelector(".layout-toggle-label").textContent = mobile ? labels.desktop : labels.mobile;
    toggle.querySelector(".layout-toggle-icon").textContent = mobile ? "▱" : "▯";
    window.dispatchEvent(new Event("resize"));
  }
  apply(savedLayout || (screen.matches ? "mobile" : "desktop"));
  screen.addEventListener("change", (event) => {
    if (!savedLayout) apply(event.matches ? "mobile" : "desktop");
  });
  document.addEventListener("DOMContentLoaded", () => {
    toggle = document.querySelector(".layout-toggle");
    menu = document.querySelector(".menu-toggle");
    if (!toggle || !menu) return;
    apply(root.dataset.layout);
    toggle.addEventListener("click", () => {
      savedLayout = root.dataset.layout === "mobile" ? "desktop" : "mobile";
      apply(savedLayout);
      try { localStorage.setItem("portfolio-layout", savedLayout); } catch {}
    });
    menu.setAttribute("aria-label", labels.menu);
    menu.addEventListener("click", () => {
      const open = root.dataset.menuOpen !== "true";
      root.dataset.menuOpen = String(open);
      menu.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && root.dataset.menuOpen === "true") {
        closeMenu();
        menu.focus();
      }
    });
  });
})();
