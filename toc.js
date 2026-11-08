// Marks the section you're reading in the "On this page" list.
(function () {
  var toc = document.querySelector(".toc");
  if (!toc) return;
  var items = [].slice.call(toc.querySelectorAll('a[href^="#"]')).map(function (a) {
    return { a: a, h: document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1))) };
  }).filter(function (x) { return x.h; });
  if (!items.length) return;
  var current = null, queued = false;

  function update() {
    queued = false;
    var line = window.innerHeight * 0.3, pick = null, best = -Infinity;
    items.forEach(function (x) {
      var top = x.h.getBoundingClientRect().top;
      if (top <= line && top > best) { best = top; pick = x; }
    });
    var doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) pick = items[items.length - 1];
    if (pick === current) return;
    if (current) current.a.removeAttribute("aria-current");
    current = pick;
    if (!current) return;
    current.a.setAttribute("aria-current", "location");
    // Keep the marked link visible when the list is taller than the window.
    if (toc.scrollHeight > toc.clientHeight) {
      var t = toc.getBoundingClientRect(), r = current.a.getBoundingClientRect();
      if (r.top < t.top + 8) toc.scrollTop -= t.top + 8 - r.top;
      else if (r.bottom > t.bottom - 8) toc.scrollTop += r.bottom - t.bottom + 8;
    }
  }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  update();
})();
