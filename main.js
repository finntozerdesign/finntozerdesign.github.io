/* =====================================================================
   finntozerdesign — MAIN SCRIPT
   ---------------------------------------------------------------------
   You shouldn't need to edit this file. It reads window.SITE (from
   content.js) and builds each page from it.

   Contents
     1. Small helpers (escaping text, images, dates, word counts)
     2. Shared behaviour (header, footer year, content error message)
     3. Home page   — intro, work (record wheel + grid), about, journal, contact
     4. Project page — project.html?id=...
     5. Post page    — post.html?id=...
     6. Start
   ===================================================================== */
(function () {
  "use strict";

  /* ===================================================================
     1. HELPERS
     =================================================================== */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** Make text safe to put inside HTML (so "&" or "<" can't break the page). */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /**
   * Turn content text into HTML, allowing three simple formats:
   *   [link text](https://example.com)  → a link
   *   *word*                            → emphasis (orange in the intro)
   *   [PLACEHOLDER: …]                  → flagged with a dashed outline
   */
  function fmt(str) {
    return esc(str)
      .replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[PLACEHOLDER[^\]]*\]/g, '<span class="placeholder">$&</span>');
  }

  /** Plain text version (for page titles / descriptions). */
  function plain(str) {
    return String(str || "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*/g, "");
  }

  /** "001", "002"… */
  const num = (i) => String(i + 1).padStart(3, "0");

  /** "2026-11-25" → "25 Nov 2026" (done by hand to avoid time-zone surprises). */
  function niceDate(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return esc(iso || "");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`;
  }

  /**
   * An <img>, or a striped placeholder box if no image file is set yet.
   * opts.eager = true for images at the top of a page.
   */
  function img(image, opts = {}) {
    const src = image && image.src;
    const alt = (image && image.alt) || "";
    if (!src) {
      return `<div class="img-ph" role="img" aria-label="Image to come">${fmt(alt || "[PLACEHOLDER: image]")}</div>`;
    }
    const loading = opts.eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
    // Optional focus point for cropped images, e.g. position: "70% 40%"
    const pos = image.position ? ` style="object-position:${esc(image.position)}"` : "";
    return `<img src="${esc(src)}" alt="${esc(plain(alt))}" ${loading} decoding="async"${pos}>`;
  }

  function figure(image, opts = {}) {
    const cap = image.caption ? `<figcaption>${fmt(image.caption)}</figcaption>` : "";
    return `<figure>${img(image, opts)}${cap}</figure>`;
  }

  /** Count words in a post's paragraphs and headings. */
  function wordCount(post) {
    const text = (post.body || []).map((b) => {
      if (typeof b === "string") return plain(b);
      if (b && b.type === "heading") return plain(b.text);
      return "";
    }).join(" ");
    const words = text.trim().split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w));
    return words.length;
  }

  function wipTag(project) {
    return project.status === "in-progress" ? '<span class="tag tag--wip">In progress</span>' : "";
  }

  function factsList(facts) {
    return (facts || [])
      .filter((f) => f && f.value)
      .map((f) => `<dt class="mono">${esc(f.label)}</dt><dd>${fmt(f.value)}</dd>`)
      .join("");
  }

  /** Respect the visitor's "reduce motion" setting. */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");


  /* ===================================================================
     2. SHARED BEHAVIOUR
     =================================================================== */

  /** If content.js has a typo, window.SITE won't exist. Say so clearly. */
  function contentError() {
    const main = $("#main");
    if (main) {
      main.innerHTML = `
        <div class="wrap not-found">
          <h1>Content couldn’t load.</h1>
          <p>There’s probably a small typo in <strong>content.js</strong> — usually a missing comma,
          quote mark or bracket near the last thing you edited. Undo that change, or see “Fixing mistakes”
          in HOW-TO-UPDATE.md.</p>
        </div>`;
    }
    console.error("finntozerdesign: window.SITE is missing — content.js has a syntax error. Open the browser console to see the line number.");
  }

  function setupHeader() {
    const header = $(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setYear() {
    $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
  }

  /** Helps you find what's left to write: open the browser console. */
  function reportPlaceholders() {
    const n = $$(".placeholder").length;
    if (n) console.info(`finntozerdesign: ${n} placeholder(s) still on this page.`);
  }


  /* ===================================================================
     3. HOME PAGE
     =================================================================== */

  function renderHome(S) {
    /* ---- Intro ---- */
    $("#intro-name").innerHTML = fmt(S.intro.name);
    $("#intro-role").innerHTML = fmt(S.intro.role);
    $("#intro-detail").innerHTML = fmt(S.intro.detail);

    /* ---- Closing thought (before Contact) ---- */
    const Cl = S.closing || {};
    $("#closing-label").innerHTML = fmt(Cl.label || "");
    $("#closing-statement").innerHTML = fmt(Cl.statement || "");
    $("#closing-detail").innerHTML = fmt(Cl.detail || "");
    $("#closing-detail").hidden = !Cl.detail;
    if (!Cl.statement) $("#closing").hidden = true;
    $("#intro-qualities").innerHTML = (S.intro.qualities || [])
      .map((q, i) => `<li><span class="mono">${String(i + 1).padStart(2, "0")}</span><strong>${esc(q)}</strong></li>`)
      .join("");

    /* ---- Work ---- */
    renderWorkGrid(S.projects);
    renderWheel(S.projects);
    setupWorkViews();

    /* ---- About ---- */
    const A = S.about;
    $("#about-photo").innerHTML = img(A.portrait);
    $("#about-lead").innerHTML = (A.paragraphs || []).map((p) => `<p>${fmt(p)}</p>`).join("")
      + (A.quote && A.quote.text ? `<figure class="about-quote"><blockquote><p>${fmt(A.quote.text)}</p></blockquote>${A.quote.cite ? `<figcaption class="mono">— ${fmt(A.quote.cite)}</figcaption>` : ""}</figure>` : "")
      + (A.approach ? `<div class="about-approach">${A.approach.heading ? `<h3>${fmt(A.approach.heading)}</h3>` : ""}${(A.approach.paragraphs || []).map((p) => `<p>${fmt(p)}</p>`).join("")}</div>` : "");
    $("#about-facts").innerHTML = factsList(A.facts);
    $("#about-cv").innerHTML = A.cv ? `<a href="${esc(A.cv)}">Download CV (PDF) <span class="arrow" aria-hidden="true">→</span></a>` : "";

    /* ---- Journal ---- */
    const posts = (S.posts || []).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
    $("#journal-list").innerHTML = posts.length
      ? posts.map((p) => `
          <li>
            <a href="post.html?id=${encodeURIComponent(p.id)}">
              <span class="mono muted"><time datetime="${esc(p.date)}">${niceDate(p.date)}</time></span>
              <div>
                <h3>${fmt(p.title)}</h3>
                ${p.summary ? `<p>${fmt(p.summary)}</p>` : ""}
              </div>
              <span class="mono muted">${wordCount(p)} words <span class="arrow" aria-hidden="true">→</span></span>
            </a>
          </li>`).join("")
      : `<li><p class="muted" style="padding-block:1.25rem">First post coming soon.</p></li>`;

    /* ---- Contact ---- */
    const C = S.contact;
    const emailLink = $("#contact-email");
    emailLink.href = `mailto:${C.email}`;
    emailLink.textContent = C.email;
    $("#contact-links").innerHTML = (C.links || [])
      .map((l) => `<li><a href="${esc(l.url)}" rel="me noopener"><span class="mono muted">${esc(l.label)}</span> ${esc(l.handle || "")}</a></li>`)
      .join("");
    setupCopyEmail(C.email);

    setupSectionHighlight();
  }

  /* ---------- Work: grid view (always built; the plain alternative to the wheel) ---------- */
  function renderWorkGrid(projects) {
    $("#work-grid").innerHTML = projects.map((p, i) => `
      <li class="card">
        <a href="project.html?id=${encodeURIComponent(p.id)}">
          <div class="card-media">${img(p.sleeve || p.cover, { eager: i < 2 })}${wipTag(p)}</div>
          <div class="card-meta mono"><span>${num(i)}</span><span>${fmt(p.year)}</span></div>
          <h3>${fmt(p.title)}</h3>
          <p>${fmt(p.subtitle)}</p>
          ${p.context ? `<p class="card-context">${fmt(p.context)}</p>` : ""}
        </a>
      </li>`).join("");
  }

  /* ---------- Work: the record wheel ----------
     Sleeves sit around a stand (a 3D ring). State is kept as `pos`: the
     index of the record facing you, as a decimal while it turns
     (0 = first project, 1.5 = halfway between the 2nd and 3rd).
       • Mouse: left↔right across the stand turns it (no clicking needed)
       • Touch: swipe to turn
       • Keyboard: ← → turn, Home/End jump, Enter pulls out / opens, Esc puts back
       • Click/tap the front record to pull it out; again to open the project
       • ‹ › buttons under it do the same as the arrow keys                     */
  const Wheel = { start: null, resize: null };

  function renderWheel(projects) {
    const root = $("#wheel");
    const n = projects.length;
    const fineMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    root.innerHTML = `
      <p class="wheel-hint mono">
        <span id="wheel-hint">${fineMouse ? "Move across to spin — click a record to pull it out" : "Swipe to spin — tap a record to pull it out"}</span>
        <span id="wheel-count" aria-hidden="true"></span>
      </p>
      <div class="wheel-stage" id="wheel-stage">
        <div class="wheel-ring" id="wheel-ring">
          ${projects.map((p, i) => `
            <div class="record" data-index="${i}">
              <div class="lift">
                <button type="button" class="sleeve" tabindex="-1"
                        aria-label="${esc(plain(p.title))} — ${esc(plain(p.subtitle))}"
                        aria-describedby="wheel-help">
                  ${img(p.sleeve || p.cover, { eager: i < 3 })}
                  <span class="sleeve-num">${num(i)}</span>
                  ${wipTag(p)}
                  <span class="sleeve-band"><span class="sleeve-title">${esc(plain(p.title))}</span><span class="sleeve-year">${esc(plain(String(p.year)).slice(0, 4))}</span></span>
                </button>
              </div>
            </div>`).join("")}
        </div>
      </div>
      <p class="visually-hidden" id="wheel-help">Left and right arrow keys turn the wheel. Enter pulls the record out; Enter again opens the project. Escape puts it back.</p>
      <p class="visually-hidden" id="wheel-live" aria-live="polite"></p>
      <div class="wheel-caption grid" id="wheel-caption">
        <div class="wc-title">
          <p class="mono muted wc-meta"></p>
          <h3 class="wc-name"></h3>
          <p class="sub wc-sub"></p>
        </div>
        <div class="wc-body">
          <p class="wc-summary"></p>
          <p class="wc-context"></p>
          <div class="wc-actions">
            <a class="cta" href="#">View project <span class="arrow" aria-hidden="true">→</span></a>
            <span class="wc-wip"></span>
            <span class="wc-step">
              <button type="button" data-step="-1" aria-label="Previous record">←</button>
              <button type="button" data-step="1" aria-label="Next record">→</button>
            </span>
          </div>
        </div>
      </div>`;

    const stage = $("#wheel-stage", root);
    const ring = $("#wheel-ring", root);
    const records = $$(".record", root);
    const sleeves = records.map((r) => $(".sleeve", r));
    const caption = $("#wheel-caption", root);
    const live = $("#wheel-live", root);
    const count = $("#wheel-count", root);

    const STEP = Math.min(30, 360 / n);   // degrees between records on the stand
    let radius = 0;
    // Start on the middle record so there are sleeves either side of it
    let pos = Math.floor((n - 1) / 2), target = pos;   // current and wanted front index
    let front = -1, out = -1;            // which record faces you / is pulled out
    let raf = null;

    const clamp = (v) => Math.max(0, Math.min(n - 1, v));

    function layout() {
      const size = sleeves[0].offsetWidth || 300;
      radius = size * 2.25;   // wide enough that sleeves don't touch
      records.forEach((r, i) => {
        r.style.setProperty("--a", `${i * STEP}deg`);
        r.style.setProperty("--r", `${radius}px`);
      });
      draw();
    }

    // Put every record where `pos` says it should be
    function draw() {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${-pos * STEP}deg)`;
      records.forEach((r, i) => {
        const rel = Math.abs(i - pos) * STEP;                   // degrees away from the front
        r.style.setProperty("--d", Math.min(rel / (STEP * 2), 1).toFixed(3));
        r.classList.toggle("is-hidden", rel > 100);             // round the back of the stand
      });
      const f = Math.round(pos);
      if (f !== front) setFront(f);
    }

    function setFront(f) {
      front = f;
      records.forEach((r, i) => {
        const isFront = i === f;
        r.classList.toggle("is-front", isFront);
        sleeves[i].tabIndex = isFront ? 0 : -1;
        // Only the front record is offered to screen readers; the caption and Grid view list everything
        r.setAttribute("aria-hidden", String(!isFront));
      });
      const p = projects[f];
      count.textContent = `${num(f)} / ${num(n - 1)}`;
      // Only the words change; the buttons stay put so keyboard focus isn't lost
      $(".wc-meta", caption).innerHTML = `${num(f)} / ${num(n - 1)} — ${fmt(p.year)}`;
      $(".wc-name", caption).innerHTML = fmt(p.title);
      $(".wc-sub", caption).innerHTML = fmt(p.subtitle);
      $(".wc-summary", caption).innerHTML = fmt(p.summary);
      $(".wc-context", caption).innerHTML = fmt(p.context || "");
      $(".wc-wip", caption).innerHTML = wipTag(p);
      $(".cta", caption).href = `project.html?id=${encodeURIComponent(p.id)}`;
      if (out !== -1 && out !== f) pushBack();
    }

    // Smoothly ease `pos` towards `target`
    function tick() {
      const diff = target - pos;
      if (reduceMotion.matches || Math.abs(diff) < 0.002) { pos = target; draw(); raf = null; return; }
      pos += diff * 0.14;
      draw();
      raf = requestAnimationFrame(tick);
    }
    function go(t, announce) {
      target = t;
      if (!raf) raf = requestAnimationFrame(tick);
      if (announce) {
        const p = projects[Math.round(t)];
        live.textContent = `${num(Math.round(t))} of ${num(n - 1)}: ${plain(p.title)}, ${plain(p.subtitle)}`;
      }
    }
    function stepBy(d, focus) {
      const t = clamp(Math.round(target) + d);
      go(t, true);
      if (focus) { pos = t; draw(); sleeves[t].focus({ preventScroll: true }); }
    }

    function pullOut(i) {
      out = i;
      records.forEach((r, k) => r.classList.toggle("is-out", k === i));
      stage.classList.add("has-out");
      live.textContent = `${plain(projects[i].title)} pulled out. Press Enter again to open the project.`;
    }
    function pushBack() {
      out = -1;
      records.forEach((r) => r.classList.remove("is-out"));
      stage.classList.remove("has-out");
    }
    function open(i) { location.href = `project.html?id=${encodeURIComponent(projects[i].id)}`; }

    /* ---- Clicking / tapping ----
       With a mouse the cursor position turns the stand, so a click anywhere on it
       acts on the FRONT record. On touch, tapping a side record turns it to the front. */
    let suppressClick = false;
    let lastPointer = "mouse";
    stage.addEventListener("pointerdown", (e) => { lastPointer = e.pointerType; }, true);
    function frontAction() {
      if (out === front) open(front); else pullOut(front);   // pull out, then open
    }
    stage.addEventListener("click", (e) => {
      if (suppressClick) return;
      const s = e.target.closest(".sleeve");
      if (lastPointer !== "mouse" && e.detail !== 0) {          // touch / pen tap (detail 0 = keyboard)
        if (!s) return;
        const i = sleeves.indexOf(s);
        if (i !== front) { go(i, true); return; }
      }
      frontAction();
    });

    /* ---- Mouse: the stand follows the cursor across it ---- */
    stage.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const box = stage.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width;            // 0 (left) … 1 (right)
      const raw = clamp(((x - 0.12) / 0.76) * (n - 1));        // keep a margin at each edge
      // Gentle "detents": records settle facing you, and turn in between
      const base = Math.floor(raw), f = raw - base;
      const eased = f * f * f * (f * (f * 6 - 15) + 10);       // smootherstep
      const t = clamp(base + eased);
      if (out !== -1 && Math.abs(raw - out) < 0.9) return;     // hold still while a record is out
      go(t);
    });
    stage.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "mouse") go(Math.round(target));   // settle on the nearest record
    });

    /* ---- Touch / pen: swipe to turn ---- */
    let drag = null;
    stage.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      drag = { x: e.clientX, y: e.clientY, start: target, moved: false };
    });
    stage.addEventListener("pointermove", (e) => {
      if (!drag || e.pointerType === "mouse") return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - drag.y)) drag.moved = true;
      if (drag.moved) go(clamp(drag.start - dx / (sleeves[0].offsetWidth * 0.75)));
    });
    const endDrag = () => {
      if (!drag) return;
      if (drag.moved) {
        suppressClick = true; setTimeout(() => { suppressClick = false; }, 60);
        go(Math.round(target), true);
      }
      drag = null;
    };
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);

    /* ---- Keyboard ---- */
    stage.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); stepBy(1, true); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); stepBy(-1, true); }
      else if (e.key === "Home") { e.preventDefault(); stepBy(-n, true); }
      else if (e.key === "End") { e.preventDefault(); stepBy(n, true); }
      else if (e.key === "Escape" && out !== -1) { pushBack(); }
    });

    /* ---- ‹ › buttons in the caption ---- */
    caption.addEventListener("click", (e) => {
      const b = e.target.closest("[data-step]");
      if (b) stepBy(Number(b.dataset.step), false);
    });

    /* ---- Click anywhere else puts a pulled-out record back ---- */
    document.addEventListener("click", (e) => {
      if (out !== -1 && !e.target.closest("#wheel-stage")) pushBack();
    });

    Wheel.resize = layout;
    if ("ResizeObserver" in window) new ResizeObserver(layout).observe(stage);
    else window.addEventListener("resize", layout);
    layout();
  }

  /* ---------- Work: choose wheel or grid ---------- */
  function setupWorkViews() {
    const section = $("#work");
    const buttons = $$("[data-view-btn]", section);

    let chosen = null;
    try { chosen = sessionStorage.getItem("ftd-view"); } catch (e) { /* storage blocked: ignore */ }

    function show(view) {
      section.dataset.view = view;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.viewBtn === view)));
      if (view === "wheel" && Wheel.resize) Wheel.resize();
    }

    buttons.forEach((b) => b.addEventListener("click", () => {
      chosen = b.dataset.viewBtn;
      try { sessionStorage.setItem("ftd-view", chosen); } catch (e) { /* ignore */ }
      show(chosen);
    }));

    // Visitors who've asked their device to reduce motion start on the grid (they can still pick the wheel)
    show(chosen || (reduceMotion.matches ? "grid" : "wheel"));
  }

  /* ---------- Contact: copy email button ---------- */
  function setupCopyEmail(email) {
    const btn = $("#copy-email");
    const status = $("#copy-status");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      let ok = false;
      try {
        await navigator.clipboard.writeText(email);
        ok = true;
      } catch (e) {
        // Fallback for older browsers / local file previews
        const t = document.createElement("textarea");
        t.value = email; t.setAttribute("readonly", ""); t.style.position = "absolute"; t.style.left = "-9999px";
        document.body.appendChild(t); t.select();
        try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
        t.remove();
      }
      btn.textContent = ok ? "Copied ✓" : "Copy failed";
      status.textContent = ok ? "Email address copied to clipboard" : "Couldn’t copy — the address is " + email;
      setTimeout(() => { btn.textContent = "Copy email"; }, 2200);
    });
  }

  /* ---------- Nav: underline the section you're reading ---------- */
  function setupSectionHighlight() {
    if (!("IntersectionObserver" in window)) return;
    const links = $$(".site-nav a");
    const byId = {};
    links.forEach((a) => { const id = a.hash.slice(1); if (id) byId[id] = a; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const a = byId[en.target.id];
        if (a) a.classList.toggle("is-current", en.isIntersecting);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }


  /* ===================================================================
     4. PROJECT PAGE
     =================================================================== */

  function renderBlock(b) {
    switch (b.type) {
      case "text":
        return `<div class="grid block-text">
          ${b.heading ? `<h2>${fmt(b.heading)}</h2>` : ""}
          <div class="copy">${(b.paragraphs || []).map((p) => `<p>${fmt(p)}</p>`).join("")}</div>
        </div>`;
      case "list":
        return `<div class="grid block-list${b.heading ? "" : " no-heading"}">
          ${b.heading ? `<h2>${fmt(b.heading)}</h2>` : ""}
          <div class="copy"><ol>${(b.items || []).map((x) => `<li>${fmt(x)}</li>`).join("")}</ol></div>
        </div>`;
      case "quote":
        return `<div class="grid block-quote"><figure>
          <blockquote><p>${fmt(b.text)}</p></blockquote>
          ${b.cite ? `<figcaption class="mono">— ${fmt(b.cite)}</figcaption>` : ""}
        </figure></div>`;
      case "image":
        return `<div class="grid block-image${b.narrow ? " is-narrow" : ""}">${figure(b)}</div>`;
      case "pair":
        return `<div class="grid block-pair">${(b.images || []).map((im) => figure(im)).join("")}</div>`;
      case "gallery":
        return `<figure class="grid block-gallery">
          <ul role="list">${(b.images || []).map((im) => `<li>${img(im)}</li>`).join("")}</ul>
          ${b.caption ? `<figcaption>${fmt(b.caption)}</figcaption>` : ""}
        </figure>`;
      case "turntable":
        // Photos of each side of an object, stacked; setupTurntables() makes them turn
        return `<div class="grid block-turntable"><figure>
          <p class="mono muted tt-hint" aria-hidden="true">${matchMedia("(pointer: fine)").matches ? "Drag to turn" : "Swipe to turn"} ↔</p>
          <div class="turntable" tabindex="0" role="group" aria-roledescription="turntable"
               aria-label="${esc(plain(b.label || "Turn the object"))}. Use the left and right arrow keys to turn it.">
            ${(b.images || []).map((im, k) => `<img src="${esc(im.src)}" alt="${esc(plain(im.alt || ""))}" ${k ? 'loading="lazy"' : ""} decoding="async" draggable="false">`).join("")}
          </div>
          <div class="tt-controls">
            <button type="button" data-tt="-1" aria-label="Turn left">←</button>
            <span class="mono tt-count" aria-live="polite"></span>
            <button type="button" data-tt="1" aria-label="Turn right">→</button>
          </div>
          ${b.caption ? `<figcaption>${fmt(b.caption)}</figcaption>` : ""}
        </figure></div>`;
      case "video":
        return `<div class="grid block-video"><figure>
          <video controls playsinline preload="none" ${b.poster ? `poster="${esc(b.poster)}"` : ""} aria-label="${esc(plain(b.label || b.caption || "Video"))}">
            <source src="${esc(b.src)}" type="video/mp4">
            Your browser can’t play this video. <a href="${esc(b.src)}">Download it instead</a>.
          </video>
          ${b.caption ? `<figcaption>${fmt(b.caption)}</figcaption>` : ""}
        </figure></div>`;
      case "deck": {
        // A spread of face-down cards; setupDecks() makes them drawable
        const cards = b.cards || [];
        return `<div class="grid block-deck"><div class="deck" data-deck style="--deck-ar:${esc(b.ratio || "2 / 3")}">
          <div class="deck-head">
            ${b.heading ? `<h2>${fmt(b.heading)}</h2>` : ""}
            ${b.intro ? `<p class="deck-intro">${fmt(b.intro)}</p>` : ""}
          </div>
          <div class="deck-table">
            <div class="deck-drawn">
              <div class="drawn-slot">
                <div class="drawn-card" aria-hidden="true">
                  <div class="drawn-inner">
                    <img class="face face-front" alt="" src="${esc((cards[0] || {}).src || "")}">
                    <img class="face face-back" alt="" src="${esc(b.back)}">
                  </div>
                </div>
                <p class="drawn-empty mono muted">Pick a card from the spread</p>
              </div>
              <div class="drawn-info" aria-live="polite">
                <p class="mono muted drawn-meta"></p>
                <p class="drawn-text"></p>
                <div class="drawn-actions" hidden>
                  <button type="button" class="deck-btn" data-deck-return>Put it back</button>
                </div>
              </div>
            </div>
            <div class="deck-tools">
              <span class="mono muted deck-hint" aria-hidden="true">${matchMedia("(pointer: fine)").matches ? "Click" : "Tap"} a card to draw it</span>
              <button type="button" class="deck-btn" data-deck-shuffle>Shuffle</button>
            </div>
            <ul class="deck-fan" role="list" style="--ar:${esc(b.ratio || "2 / 3")}">
              ${cards.map((c, i) => `
                <li class="deck-slot" data-i="${i}">
                  <button type="button" class="deck-card" aria-label="Draw card ${i + 1} of ${cards.length} (face down)">
                    <img src="${esc(c.back || b.back)}" alt="" draggable="false" loading="lazy">
                  </button>
                </li>`).join("")}
            </ul>
          </div>
          <details class="deck-all">
            <summary class="mono">See all ${cards.length} cards</summary>
            <ul class="deck-all-grid" role="list">
              ${cards.map((c) => `<li><img src="${esc(c.src)}" alt="${esc(plain(c.alt || [c.kind, c.text].filter(Boolean).join(": ")))}" loading="lazy"><p>${c.kind ? `<span class="mono muted">${esc(c.kind)}</span> ` : ""}${fmt(c.text || c.name || "")}</p></li>`).join("")}
            </ul>
          </details>
          <script type="application/json" class="deck-data">${JSON.stringify(cards.map((c) => Object.assign({ back: b.back }, c))).replace(/</g, "\\u003c")}</script>
        </div></div>`;
      }
      case "poem":
        // Set in the typewriter-style mono font; line breaks and stanzas are kept exactly
        return `<div class="grid block-poem"><figure>
          ${b.title ? `<figcaption><h2>${fmt(b.title)}</h2></figcaption>` : ""}
          ${(b.stanzas || []).map((st) => `<p>${st.map((l) => `<span class="line">${fmt(l)}</span>`).join("")}</p>`).join("")}
        </figure></div>`;
      default:
        console.warn("finntozerdesign: unknown block type", b.type);
        return "";
    }
  }

  /* Turntable: drag, swipe, arrow keys or the ← → buttons turn between photos
     of each side. Neighbouring photos cross-fade and slide a little, so it reads
     as the object turning. (Photos, not a true 3D model.) */
  function setupTurntables(root) {
    $$(".turntable", root).forEach((tt) => {
      const imgs = $$("img", tt);
      const n = imgs.length;
      const count = $(".tt-count", tt.parentNode);
      let pos = 0, target = 0, raf = null, drag = null;
      const wrap = (v) => ((v % n) + n) % n;
      // signed shortest distance from photo i to the current position, round the circle
      const dist = (i) => { let d = i - wrap(pos); if (d > n / 2) d -= n; if (d < -n / 2) d += n; return d; };

      function draw() {
        imgs.forEach((im, i) => {
          const d = dist(i);
          // Each photo stays solid for most of the turn and hands over quickly in the middle,
          // so you never see a muddy double exposure
          const w = Math.min(1, Math.max(0, (0.5 - Math.abs(d)) * 5 + 0.5));
          im.style.opacity = w.toFixed(3);
          im.style.transform = `translateX(${(d * 22).toFixed(2)}%) scale(${(0.96 + 0.04 * w).toFixed(3)})`;
        });
        const f = wrap(Math.round(pos));
        imgs.forEach((im, i) => im.setAttribute("aria-hidden", String(i !== f)));
        count.textContent = `Side ${f + 1} / ${n}`;
      }
      function tick() {
        const diff = target - pos;
        if (reduceMotion.matches || Math.abs(diff) < 0.002) { pos = target; draw(); raf = null; return; }
        pos += diff * 0.18; draw(); raf = requestAnimationFrame(tick);
      }
      const go = (t) => { target = t; if (!raf) raf = requestAnimationFrame(tick); };

      tt.addEventListener("pointerdown", (e) => {
        drag = { x: e.clientX, start: target }; tt.setPointerCapture(e.pointerId); tt.classList.add("is-dragging");
      });
      tt.addEventListener("pointermove", (e) => {
        if (!drag) return;
        go(drag.start - (e.clientX - drag.x) / (tt.offsetWidth * 0.45));   // drag right = turn the object right
      });
      const end = () => { if (!drag) return; drag = null; tt.classList.remove("is-dragging"); go(Math.round(target)); };
      tt.addEventListener("pointerup", end);
      tt.addEventListener("pointercancel", end);
      tt.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(Math.round(target) + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(Math.round(target) - 1); }
      });
      tt.parentNode.addEventListener("click", (e) => {
        const b = e.target.closest("[data-tt]");
        if (b) go(Math.round(target) + Number(b.dataset.tt));
      });
      draw();
    });
  }

  /* Card deck: face-down cards fanned out like a spread deck. Click / tap / Enter
     draws one: it flies out of the spread, flips over and shows what it does.
     "Shuffle" re-deals the spread; "See all cards" lists every card without the game. */
  function setupDecks(root) {
    $$("[data-deck]", root).forEach((deck) => {
      const cards = JSON.parse($(".deck-data", deck).textContent);
      const fan = $(".deck-fan", deck);
      const slots = $$(".deck-slot", deck);
      const drawn = $(".drawn-card", deck);
      const inner = $(".drawn-inner", deck);
      const front = $(".face-front", deck);
      const empty = $(".drawn-empty", deck);
      const meta = $(".drawn-meta", deck);
      const text = $(".drawn-text", deck);
      const actions = $(".drawn-actions", deck);
      let order = cards.map((_, i) => i);   // which card sits in each position of the spread
      let current = -1;                      // position currently drawn

      // Lay the cards out in an arc that fits the width available
      function layout() {
        const n = slots.length;
        const w = fan.clientWidth;
        const cw = Math.min(130, Math.max(78, w / 6.5));
        fan.style.setProperty("--cw", `${cw}px`);
        const ch = slots[0] ? slots[0].offsetHeight || cw * 1.5 : cw * 1.5;
        const radius = ch * 3.2;                                 // distance to the arc's pivot point
        const half = Math.max(0, (w - cw) / 2 - 4);
        const maxA = Math.asin(Math.min(1, half / radius)) * 180 / Math.PI;
        const step = Math.min(7, (2 * maxA) / Math.max(1, n - 1));
        slots.forEach((s, pos) => {
          s.style.setProperty("--rot", `${((pos - (n - 1) / 2) * step).toFixed(2)}deg`);
          s.style.zIndex = String(pos + 1);
        });
        // The outer cards swing below the spread's baseline; reserve exactly that much room
        // (cards pivot 2.2 card-heights below their bottom edge — see .deck-slot in the CSS)
        const outer = ((n - 1) / 2) * step * Math.PI / 180;
        const drop = 2.2 * ch * (1 - Math.cos(outer)) + (cw / 2) * Math.sin(outer);
        fan.style.marginBottom = `${Math.ceil(drop + 16)}px`;
      }

      function show(pos) {
        const c = cards[order[pos]];
        const fromBtn = $(".deck-card", slots[pos]);
        if (current !== -1) slots[current].classList.remove("is-drawn");
        current = pos;
        slots[pos].classList.add("is-drawn");
        front.src = c.src;
        front.alt = "";
        $(".face-back", deck).src = c.back;   // each card keeps its own back (e.g. two kinds of card in one deck)
        meta.textContent = [c.kind, c.name].filter(Boolean).join(" · ");
        text.innerHTML = fmt(c.text || "");
        empty.hidden = true;
        actions.hidden = false;
        drawn.classList.add("is-visible");

        // Fly from the spread to the drawn spot (FLIP), then flip face-up
        const a = fromBtn.getBoundingClientRect();
        drawn.style.transition = "none"; inner.style.transition = "none";
        inner.style.transform = "rotateY(180deg)";
        drawn.style.transform = "none";
        const b2 = drawn.getBoundingClientRect();
        if (!reduceMotion.matches && b2.width) {
          const rot = parseFloat(getComputedStyle(slots[pos]).getPropertyValue("--rot")) || 0;
          drawn.style.transform = `translate(${a.left - b2.left}px, ${a.top - b2.top}px) scale(${a.width / b2.width}) rotate(${rot}deg)`;
          void drawn.offsetWidth;   // apply the start position before animating
          drawn.style.transition = ""; inner.style.transition = "";
          drawn.style.transform = "none";
          inner.style.transform = "rotateY(0deg)";
        } else {
          drawn.style.transform = "none"; inner.style.transform = "rotateY(0deg)";
          drawn.style.transition = ""; inner.style.transition = "";
        }
      }

      function putBack() {
        if (current === -1) return;
        slots[current].classList.remove("is-drawn");
        const btn = $(".deck-card", slots[current]);
        current = -1;
        drawn.classList.remove("is-visible");
        inner.style.transform = "rotateY(180deg)";
        meta.textContent = ""; text.textContent = "Card returned to the spread.";
        empty.hidden = false; actions.hidden = true;
        btn.focus({ preventScroll: true });
      }

      function shuffle() {
        putBack();
        for (let i = order.length - 1; i > 0; i--) {          // Fisher–Yates
          const j = Math.floor(Math.random() * (i + 1));
          [order[i], order[j]] = [order[j], order[i]];
        }
        // the spread shows the backs in their new order (cards can have different backs)
        slots.forEach((s, pos) => { $(".deck-card img", s).src = cards[order[pos]].back; });
        fan.classList.add("is-shuffling");
        setTimeout(() => fan.classList.remove("is-shuffling"), reduceMotion.matches ? 0 : 450);
        text.textContent = "Cards shuffled.";
      }

      slots.forEach((s, pos) => $(".deck-card", s).addEventListener("click", () => {
        if (current === pos) { putBack(); return; }
        show(pos);
      }));
      $("[data-deck-return]", deck).addEventListener("click", putBack);
      $("[data-deck-shuffle]", deck).addEventListener("click", shuffle);
      deck.addEventListener("keydown", (e) => { if (e.key === "Escape") putBack(); });

      if ("ResizeObserver" in window) new ResizeObserver(layout).observe(fan);
      else window.addEventListener("resize", layout);
      layout();
    });
  }

  function renderProject(S) {
    const root = $("#project");
    const id = new URLSearchParams(location.search).get("id");
    const list = S.projects || [];
    const i = list.findIndex((p) => p.id === id);

    if (i === -1) {
      document.title = "Project not found | finntozerdesign";
      root.innerHTML = `<div class="wrap not-found">
        <h1>That record isn’t on the stand.</h1>
        <p><a href="index.html#work">See all work <span class="arrow" aria-hidden="true">→</span></a></p>
      </div>`;
      return;
    }

    const p = list[i];
    document.title = `${plain(p.title)} — ${plain(p.subtitle)} | Finn Tozer`;
    const meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", plain(p.summary));

    const prev = list[(i - 1 + list.length) % list.length];
    const next = list[(i + 1) % list.length];

    root.innerHTML = `
      <div class="wrap crumbs"><a class="mono" href="index.html#work">← All work</a></div>

      <header class="project-head wrap">
        <div class="eyebrow mono"><span>${num(i)} / ${num(list.length - 1)}</span><span>${fmt(p.year)}</span>${wipTag(p)}</div>
        <h1>${fmt(p.title)}</h1>
        <p class="sub">${fmt(p.subtitle)}</p>
      </header>

      <div class="project-intro wrap grid">
        <div class="summary">
          <p>${fmt(p.summary)}</p>
          ${p.context ? `<p class="context">${fmt(p.context)}</p>` : ""}
        </div>
        <dl class="facts">${factsList(p.facts)}</dl>
      </div>

      <figure class="project-cover wrap">${img(p.cover, { eager: true })}</figure>

      <div class="blocks wrap">${(p.body || []).map(renderBlock).join("")}</div>

      ${list.length > 1 ? `
      <nav class="project-nav wrap" aria-label="More projects">
        <div class="grid">
          <a class="prev" href="project.html?id=${encodeURIComponent(prev.id)}">
            <span class="mono muted">← Previous record</span><strong>${fmt(prev.title)}</strong>
          </a>
          <a class="next" href="project.html?id=${encodeURIComponent(next.id)}">
            <span class="mono muted">Next record →</span><strong>${fmt(next.title)}</strong>
          </a>
        </div>
      </nav>` : ""}`;
    setupTurntables(root);
    setupDecks(root);
  }


  /* ===================================================================
     5. POST PAGE
     =================================================================== */

  function renderPostBlock(b) {
    if (typeof b === "string") return `<p>${fmt(b)}</p>`;
    if (!b) return "";
    if (b.type === "heading") return `<h2>${fmt(b.text)}</h2>`;
    if (b.type === "image") return figure(b);
    if (b.type === "quote") return `<figure><blockquote><p>${fmt(b.text)}</p></blockquote>${b.cite ? `<figcaption class="mono">— ${fmt(b.cite)}</figcaption>` : ""}</figure>`;
    return "";
  }

  function renderPost(S) {
    const root = $("#post");
    const id = new URLSearchParams(location.search).get("id");
    const post = (S.posts || []).find((p) => p.id === id);

    if (!post) {
      document.title = "Post not found | finntozerdesign";
      root.innerHTML = `<div class="wrap not-found">
        <h1>That post doesn’t exist (yet).</h1>
        <p><a href="index.html#journal">Back to the journal <span class="arrow" aria-hidden="true">→</span></a></p>
      </div>`;
      return;
    }

    const words = wordCount(post);
    document.title = `${plain(post.title)} | Finn Tozer — Journal`;
    const meta = $('meta[name="description"]');
    if (meta && post.summary) meta.setAttribute("content", plain(post.summary));

    root.innerHTML = `
      <div class="wrap">
        <div class="post">
          <a class="mono post-back" href="index.html#journal" style="text-decoration:none">← Journal</a>
          <p class="mono muted print-only">${esc(location.href)}</p>
          <h1>${fmt(post.title)}</h1>
          <div class="post-meta mono">
            <span>Finn Tozer</span>
            <time datetime="${esc(post.date)}">${niceDate(post.date)}</time>
            <span>${words} words</span>
            <span>${Math.max(1, Math.round(words / 220))} min read</span>
          </div>
          <div class="post-body">${(post.body || []).map(renderPostBlock).join("")}</div>
          ${post.source && post.source.url ? `<p class="post-source mono"><a href="${esc(post.source.url)}" rel="noopener">${fmt(post.source.label || post.source.url)} <span class="arrow" aria-hidden="true">↗</span></a></p>` : ""}
          <div class="post-end mono"><a href="index.html#journal">← Back to the journal</a></div>
        </div>
      </div>`;
  }


  /* ===================================================================
     6. START
     =================================================================== */

  function start() {
    setupHeader();
    setYear();
    const S = window.SITE;
    if (!S) { contentError(); return; }

    const page = document.body.dataset.page;
    try {
      if (page === "home") renderHome(S);
      if (page === "project") renderProject(S);
      if (page === "post") renderPost(S);
    } catch (err) {
      console.error(err);
      contentError();
      return;
    }

    // If the address has a #section (e.g. coming back from a project), jump to it now the page is built
    if (location.hash && page === "home") {
      const target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView();
    }
    reportPlaceholders();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
