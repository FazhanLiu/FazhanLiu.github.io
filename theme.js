(() => {
  const root = document.documentElement;
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
    button.setAttribute("aria-label", dark ? "切换到白天模式" : "切换到黑夜模式");
    button.querySelector(".theme-toggle-icon").textContent = dark ? "☀" : "☾";
    button.querySelector(".theme-toggle-label").textContent = dark ? "白天模式" : "黑夜模式";
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
