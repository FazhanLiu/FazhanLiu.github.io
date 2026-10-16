(() => {
  const root = document.documentElement;
  const labelsByLanguage = {
    zh: { light: "白天模式", dark: "黑夜模式", lightAction: "切换到白天模式", darkAction: "切换到黑夜模式" },
    en: { light: "Light mode", dark: "Dark mode", lightAction: "Switch to light mode", darkAction: "Switch to dark mode" },
    ko: { light: "라이트 모드", dark: "다크 모드", lightAction: "라이트 모드로 전환", darkAction: "다크 모드로 전환" },
    ja: { light: "ライトモード", dark: "ダークモード", lightAction: "ライトモードに切り替え", darkAction: "ダークモードに切り替え" },
  };
  const labels = labelsByLanguage[root.lang.split("-")[0]] || labelsByLanguage.zh;
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  let savedTheme = null;
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") savedTheme = saved;
  } catch {
    // Theme switching still works when browser storage is unavailable.
  }

  let button;
  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (!button) return;
    const dark = theme === "dark";
    button.setAttribute("aria-pressed", String(dark));
    button.setAttribute("aria-label", dark ? labels.lightAction : labels.darkAction);
    button.querySelector(".theme-toggle-icon").textContent = dark ? "☀" : "☾";
    button.querySelector(".theme-toggle-label").textContent = dark ? labels.light : labels.dark;
  }

  // Apply before the stylesheet loads to prevent a flash of the wrong theme.
  applyTheme(savedTheme || (preference.matches ? "dark" : "light"));
  preference.addEventListener("change", (event) => {
    if (!savedTheme) applyTheme(event.matches ? "dark" : "light");
  });
  document.addEventListener("DOMContentLoaded", () => {
    button = document.querySelector(".theme-toggle");
    if (!button) return;
    applyTheme(root.dataset.theme);
    button.addEventListener("click", () => {
      savedTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(savedTheme);
      try { localStorage.setItem("portfolio-theme", savedTheme); } catch {}
    });
  });
})();
