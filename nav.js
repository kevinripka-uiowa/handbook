// Site menu: one dropdown open at a time; Escape or a click outside closes it.
(function () {
  var groups = [].slice.call(document.querySelectorAll(".site-nav details"));
  if (!groups.length) return;
  groups.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) groups.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
  document.addEventListener("click", function (e) {
    groups.forEach(function (d) { if (d.open && !d.contains(e.target)) d.open = false; });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    groups.forEach(function (d) {
      if (d.open) { d.open = false; d.querySelector("summary").focus(); }
    });
  });
})();
