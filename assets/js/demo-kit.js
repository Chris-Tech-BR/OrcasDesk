/* OrcasDesk — interações do site (sem dependências) */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header: estado ao rolar */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menu mobile */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    menu.classList.remove("is-open");
    header && header.classList.remove("menu-open");
    document.body.style.overflow = "";
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menu.classList.toggle("is-open", open);
      header && header.classList.toggle("menu-open", open);
      document.body.style.overflow = open ? "hidden" : "";
      if (open) { var first = menu.querySelector("a"); first && first.focus(); }
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { closeMenu(); toggle.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 920) closeMenu(); });
  }

  /* Animações ao rolar */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Brilho que acompanha o cursor nos cards */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* Parallax suave das janelas do hero */
  var showcase = document.querySelector(".showcase");
  if (showcase && !reduceMotion && window.matchMedia("(hover: hover)").matches) {
    var layers = showcase.querySelectorAll("[data-depth]");
    var hero = showcase.closest(".hero") || document.body;
    var raf = null;
    hero.addEventListener("pointermove", function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var x = (e.clientX / window.innerWidth - 0.5);
        var y = (e.clientY / window.innerHeight - 0.5);
        layers.forEach(function (l) {
          var d = parseFloat(l.getAttribute("data-depth")) || 0;
          l.style.transform = "translate3d(" + (x * d * 40) + "px," + (y * d * 30) + "px,0)";
        });
        raf = null;
      });
    });
  }

  /* Filtro da galeria de demonstrações */
  var chips = document.querySelectorAll("[data-filter]");
  var cards = document.querySelectorAll("[data-category]");
  var status = document.getElementById("filter-status");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      var shown = 0;
      cards.forEach(function (card) {
        var match = f === "todos" || card.getAttribute("data-category").split(" ").indexOf(f) > -1;
        card.classList.toggle("is-hidden", !match);
        if (match) { shown++; card.classList.add("is-visible"); }
      });
      if (status) status.textContent = shown + (shown === 1 ? " demonstração exibida" : " demonstrações exibidas");
    });
  });

  /* Ano no rodapé */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
