// TEMPORARY: light/dark switch for testing. To remove: delete this file,
// its <script> tag on every page, and the "Theme test toggle" block in styles.css.
(function () {
  var root = document.documentElement, KEY = "handbook-theme";
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  var saved = get();
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  var inner = document.querySelector(".site-header .inner");
  if (!inner) return;
  var b = document.createElement("button");
  b.type = "button";
  b.className = "theme-toggle";
  function label() {
    var d = isDark();
    b.textContent = d ? "Light mode" : "Dark mode";
    b.setAttribute("aria-label", d ? "Switch to light mode" : "Switch to dark mode");
  }
  b.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    set(next);
    label();
  });
  label();
  inner.appendChild(b);
})();
