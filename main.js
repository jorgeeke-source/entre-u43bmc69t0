(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function safe(fn) { try { fn(); } catch (e) { if (window.console) console.warn(e); } }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  window.__BRAND__ = {
    phs: [
      { id: "quatrium", n: 1, name: "PH Quatrium", zone: "Vía Porras, San Francisco", lat: 8.9965, lng: -79.5062, img: "assets/img/ph-quatrium.webp",
        txt: "Edificio residencial con lobby y zona de coworking, gimnasio, cine, salón de juegos y terraza con piscina." },
      { id: "asia", n: 2, name: "PH Asia", zone: "Costa del Este", lat: 9.0112, lng: -79.4672, img: "assets/img/ph-asia.webp",
        txt: "Edificio residencial con piscina, gimnasio, canchas deportivas, salón de eventos y seguridad 24/7." },
      { id: "lumiere", n: 3, name: "PH Lumiere", zone: "Costa del Este · 144 apartamentos", lat: 9.0152, lng: -79.4608, img: "assets/img/ph-lumiere.webp",
        txt: "Complejo de 2 torres con piscinas, gimnasio, cancha de squash, parque infantil y salón de eventos." },
      { id: "vivendi", n: 4, name: "PH Vivendi Green", zone: "Edison Park · 240 unidades", lat: 9.0242, lng: -79.5248, img: "assets/img/ph-vivendi.webp",
        txt: "Complejo de 2 torres con dos áreas comunes, piscinas, jacuzzis, sauna, gimnasio y rooftop." },
      { id: "element", n: 5, name: "PH Element", zone: "Av. Balboa · 112 apartamentos", lat: 8.9802, lng: -79.5284, img: "assets/img/ph-element.webp",
        txt: "Complejo residencial con piscina, terraza, sala de eventos, squash, sauna, jacuzzi y rooftop." },
      { id: "creta", n: 6, name: "PH Creta", zone: "Chanis", lat: 9.0236, lng: -79.4762, img: "assets/img/ph-creta.webp",
        txt: "Edificio residencial con piscina, área de barbacoa y seguridad 24 horas; dos apartamentos por piso." }
    ],
    // Casos tomados del texto del informe de gestión operativa (enero 2026)
    cases: [
      { k: "baldosas", bt: "Piso con baldosas sueltas", b: "Cuatro baldosas presentaban desprendimiento y levantamiento del piso.",
        at: "Baldosas reparadas", a: "Se realizó la reparación de las cuatro (4) baldosas afectadas.",
        ab: "Antes: baldosas levantadas y área acordonada", aa: "Después: baldosas del lobby reparadas" },
      { k: "fisura", bt: "Fisuras y zonas deterioradas", b: "Pared con fisuras y desprendimientos sobre el zócalo.",
        at: "Pared saneada y con acabado restituido", a: "Resane con material compatible, nivelación del sustrato y acabado final con continuidad estética.",
        ab: "Antes: pared con fisura sobre el zócalo", aa: "Después: pared reparada y pintada" },
      { k: "pluma", bt: "Pluma de agua con fuga", b: "La pluma de agua del estacionamiento E2 no controlaba el suministro.",
        at: "Pluma reemplazada", a: "Reemplazo de la pluma de agua, garantizando la correcta operación y control del suministro.",
        ab: "Antes: pluma de agua con fuga", aa: "Después: pluma de agua nueva instalada" },
      { k: "luminaria", bt: "Luminarias defectuosas", b: "Dos luminarias sin funcionar entre el lobby principal y el lobby de ascensores.",
        at: "Luminarias reemplazadas", a: "Se realizó el reemplazo de las dos (2) luminarias defectuosas.",
        ab: "Antes: luminaria apagada en el techo", aa: "Después: luminaria nueva encendida" },
      { k: "gas", bt: "Tanques de gas por mantener", b: "Superficie exterior de los tanques con suciedad y residuos; señalización por renovar.",
        at: "Tanques protegidos y señalizados", a: "Limpieza técnica, pintura protectora anticorrosiva y reemplazo de letreros de seguridad.",
        ab: "Antes: trabajos de limpieza en el cuarto de tanques", aa: "Después: tanques limpios y pintados" }
    ],
    services: {
      adm: ["Administrativo", "Recursos humanos, informes y comunicación."],
      ope: ["Operativo", "Planificación, ejecución y seguimiento de los trabajos proyectados."],
      leg: ["Legal", "Asesoramiento en derecho laboral, comercial y fiscal."],
      con: ["Contable", "Recaudación de cuotas, control de gastos y optimización de costos."],
      inf: ["Informes a la Junta", "Informes periódicos detallados para la Junta Directiva."],
      ana: ["Análisis operativo", "Auditoría de la propiedad y mejoras de sistemas y equipos del PH."]
    }
  };
  var B = window.__BRAND__;

  /* Menú móvil y encabezado */
  safe(function () {
    var btn = $("#menuBtn"), nav = $("#nav"), header = $(".site-header");
    function close() { nav.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }
    btn.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", close); });
    window.addEventListener("scroll", function () { header.classList.toggle("is-scrolled", window.scrollY > 10); }, { passive: true });
  });

  /* Aparición al hacer scroll */
  safe(function () {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (e, i) {
      e.style.transitionDelay = ((i % 4) * 70) + "ms";
      io.observe(e);
    });
    // Red de seguridad: nada queda oculto
    setTimeout(function () { els.forEach(function (e) { e.classList.add("is-in"); }); }, 4500);
  });

  /* Parallax por transform (2-3 capas por escena). Desactivado con movimiento reducido. */
  safe(function () {
    if (reduced) return;
    var layers = $$("[data-depth]");
    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var host = el.closest("section") || el.parentElement;
        var r = host.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var center = r.top + r.height / 2 - vh / 2;
        var d = (parseFloat(el.getAttribute("data-depth")) || 0) * (window.innerWidth < 860 ? 0.55 : 1);
        el.style.setProperty("--py", (-center * d).toFixed(1) + "px");
      });
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  });

  /* Indicador de piso + menú activo */
  safe(function () {
    var floor = $("#floor"), num = $("#floorNum"), name = $("#floorName"), arrow = $("#floorArrow");
    var secs = $$("section[data-floor]");
    var navLinks = $$(".nav a[href^='#']");
    var last = window.scrollY, current = null;
    function tick() {
      var y = window.scrollY, mid = window.innerHeight * 0.4, active = secs[0];
      secs.forEach(function (s) { if (s.getBoundingClientRect().top <= mid) active = s; });
      arrow.classList.toggle("down", y > last);
      last = y;
      floor.classList.toggle("is-on", y > 200);
      if (active !== current) {
        current = active;
        num.textContent = active.getAttribute("data-floor");
        name.textContent = active.getAttribute("data-name");
        navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + active.id); });
      }
    }
    window.addEventListener("scroll", function () { requestAnimationFrame(tick); }, { passive: true });
    tick();
  });

  /* Antes y después */
  safe(function () {
    var stage = $("#baStage"), range = $("#baRange");
    var tabs = $$(".ba-tabs button");
    function setPos(v) { stage.style.setProperty("--pos", v + "%"); }
    range.addEventListener("input", function () { setPos(range.value); });
    function show(i) {
      var c = B.cases[i];
      $("#baBeforeT").textContent = c.bt; $("#baBeforeP").textContent = c.b;
      $("#baAfterT").textContent = c.at; $("#baAfter").textContent = c.a;
      var ib = $("#baImgBefore"), ia = $("#baImgAfter");
      ib.src = "assets/img/ba-" + c.k + "-antes.webp"; ib.alt = c.ab;
      ia.src = "assets/img/ba-" + c.k + "-despues.webp"; ia.alt = c.aa;
      tabs.forEach(function (t, k) { t.setAttribute("aria-selected", String(k === i)); });
      // pequeña invitación a deslizar
      if (reduced) { range.value = 50; setPos(50); return; }
      var from = 78, to = 50, t0 = null;
      function anim(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / 700), e = 1 - Math.pow(1 - p, 3);
        var v = from + (to - from) * e;
        range.value = v; setPos(v);
        if (p < 1) requestAnimationFrame(anim);
      }
      requestAnimationFrame(anim);
    }
    tabs.forEach(function (t, i) { t.addEventListener("click", function () { show(i); }); });
    setPos(50);
    // precargar los pares
    B.cases.forEach(function (c) { ["antes", "despues"].forEach(function (t) { var im = new Image(); im.src = "assets/img/ba-" + c.k + "-" + t + ".webp"; }); });
  });

  /* Carrusel "en campo": duplicar para un bucle sin cortes */
  safe(function () {
    var track = $("#fieldTrack");
    if (reduced) return;
    $$("figure", track).forEach(function (f) {
      var c = f.cloneNode(true); c.setAttribute("aria-hidden", "true");
      var img = c.querySelector("img"); if (img) img.alt = "";
      track.appendChild(c);
    });
  });

  /* Cotizador simulado: no envía ni guarda nada */
  safe(function () {
    var form = $("#qform"), list = $("#summaryList"), ok = $("#formOk");
    function renderSummary() {
      var sel = $$("input[name='s']:checked", form).map(function (i) { return i.value; });
      list.innerHTML = "";
      if (!sel.length) { list.innerHTML = '<li class="muted">Aún no eliges áreas.</li>'; return; }
      sel.forEach(function (k) {
        var s = B.services[k], li = document.createElement("li");
        var st = document.createElement("strong"); st.textContent = s[0];
        li.appendChild(st); li.appendChild(document.createTextNode(s[1]));
        list.appendChild(li);
      });
    }
    $$("input[name='s']", form).forEach(function (i) { i.addEventListener("change", renderSummary); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var req = $$("[required]", form), bad = null;
      req.forEach(function (f) {
        var invalid = !String(f.value).trim();
        f.classList.toggle("is-invalid", invalid);
        if (invalid && !bad) bad = f;
      });
      if (bad) { bad.focus(); return; }
      ok.hidden = false;
      form.reset();
      renderSummary();
      ok.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
    });
    $$("[required]", form).forEach(function (f) {
      f.addEventListener("input", function () { f.classList.remove("is-invalid"); });
      f.addEventListener("change", function () { f.classList.remove("is-invalid"); });
    });
  });

  /* Mapa de PH por zona: imagen estática + puntos interactivos */
  safe(function () {
    // Límites de la imagen en coordenadas de tesela (zoom 14)
    var X0 = 4572.046222222222, Y0 = 7778.861883587336, X1 = 4576.142222222222, Y1 = 7782.179566233535, N = Math.pow(2, 14);
    function pos(lat, lng) {
      var x = (lng + 180) / 360 * N;
      var y = (1 - Math.asinh(Math.tan(lat * Math.PI / 180)) / Math.PI) / 2 * N;
      return [(x - X0) / (X1 - X0) * 100, (y - Y0) / (Y1 - Y0) * 100];
    }
    var pins = $("#mapPins"), card = $("#mapCard"), byId = {};
    B.phs.forEach(function (p) {
      var xy = pos(p.lat, p.lng), b = document.createElement("button");
      b.className = "pin"; b.type = "button"; b.setAttribute("data-n", p.n);
      b.setAttribute("aria-label", p.name + ", " + p.zone);
      b.style.left = xy[0] + "%"; b.style.top = xy[1] + "%";
      if (!reduced) b.innerHTML = '<span class="pin-pulse"></span>';
      b.addEventListener("click", function () { select(p.id); });
      pins.appendChild(b); byId[p.id] = { p: p, el: b };
    });
    function select(id, scroll) {
      var p = byId[id].p;
      Object.keys(byId).forEach(function (k) { byId[k].el.classList.toggle("is-active", k === id); });
      $$(".ph-card").forEach(function (c) { c.classList.toggle("is-active", c.getAttribute("data-id") === id); });
      card.innerHTML = '<img src="' + p.img.replace(".webp", "-400.webp") + '" alt=""><div><strong>' + p.name + "</strong><span>" + p.zone + "</span><p>" + p.txt + "</p></div>";
      card.classList.remove("is-in"); void card.offsetWidth; card.classList.add("is-in");
      if (scroll && window.innerWidth < 860) $("#mapa").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    }
    $$(".ph-card").forEach(function (c) { c.addEventListener("click", function () { select(c.getAttribute("data-id"), true); }); });
    select("quatrium");
  });
})();
