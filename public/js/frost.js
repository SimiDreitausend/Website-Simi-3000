// Frosted photo: the pointer (or a finger) wipes the frost clear, leaving a trail that frosts
// over again. On desktop the frost also breathes while idle, to show that it's interactive.
// All tuned values come from CSS custom properties on .photo (see css/home.css).
(() => {
  const photo = document.querySelector('.photo');
  if (!photo) return;
  const sharp = photo.querySelector('img');
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  photo.append(canvas);
  const ctx = canvas.getContext('2d');

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(hover: hover) and (pointer: fine)');

  // ---- Settings from CSS -------------------------------------------------------------------
  let s = {};
  function readSettings() {
    const css = getComputedStyle(photo);
    const num = (name, fallback = 0) => {
      const v = parseFloat(css.getPropertyValue(name));
      return Number.isFinite(v) ? v : fallback;
    };
    s = {
      blur: num('--blur'), milk: num('--milk'),
      brush: num('--brush'), soft: num('--soft'), trail: num('--trail', 1),
      hintStrength: num('--hint-strength'), hintPeriod: num('--hint-period', 6),
      hintIdle: num('--hint-idle', 8),
    };
    // Thick layer: at full opacity the two layers together give blur and haze k times the base.
    // Stacked blurs add in quadrature; stacked hazes multiply their transparency.
    const k = 1 + 0.7 * s.hintStrength;
    const milkTarget = Math.min(0.95, s.milk * k);
    photo.style.setProperty('--blur-thick', s.blur * Math.sqrt(k * k - 1));
    photo.style.setProperty('--milk-thick', s.milk < 1 ? (milkTarget - s.milk) / (1 - s.milk) : 0);
    requestDraw();
  }
  desktop.addEventListener('change', readSettings);
  reduceMotion.addEventListener('change', readSettings);

  // ---- Canvas sizing -----------------------------------------------------------------------
  let width = 0, height = 0, dpr = 1;
  new ResizeObserver(() => {
    const rect = photo.getBoundingClientRect();
    width = rect.width; height = rect.height; dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    requestDraw();
  }).observe(photo);

  // ---- Trail ------------------------------------------------------------------------------
  // Each point is a spot the pointer passed and when. It's fully clear when fresh and fades
  // back to frosted over `trail` seconds.
  let points = [];
  let last = null;

  function addPoint(x, y, t) {
    const radius = s.brush * width;
    if (last) {
      // Fill gaps when the pointer moves fast, so the trail stays continuous.
      const dist = Math.hypot(x - last.x, y - last.y);
      const step = Math.max(2, radius * 0.25);
      for (let d = step; d < dist; d += step) {
        const f = d / dist;
        points.push({ x: last.x + (x - last.x) * f, y: last.y + (y - last.y) * f, t });
      }
    }
    points.push({ x, y, t });
    last = { x, y };
    requestDraw();
  }

  photo.addEventListener('pointerenter', () => { last = null; discovered = true; });
  photo.addEventListener('pointerleave', () => { last = null; });
  photo.addEventListener('pointerdown', (e) => {
    last = null;
    photo.releasePointerCapture?.(e.pointerId); // let touch drags keep reporting moves here
  });
  photo.addEventListener('pointermove', (e) => {
    discovered = true;
    if (reduceMotion.matches) return;
    const rect = photo.getBoundingClientRect();
    const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
    for (const ev of events.length ? events : [e]) {
      addPoint(ev.clientX - rect.left, ev.clientY - rect.top, performance.now());
    }
  });

  // ---- Idle breathing (desktop) ------------------------------------------------------------
  // Runs until the visitor first moves over the photo, then eases out. Afterwards it returns
  // only once the pointer has been still for `hintIdle` seconds; any movement stops it again.
  // Each run starts from the thin end, so it never jumps.
  let discovered = false;
  let lastActivity = performance.now();
  addEventListener('pointermove', () => { lastActivity = performance.now(); }, { passive: true });

  let hintLevel = 0; // 0..1, eased toward 1 while the hint should run
  let hintClock = 0, hintPrev = performance.now();

  const hintWanted = () => {
    if (s.hintStrength <= 0 || reduceMotion.matches) return false;
    return !discovered || performance.now() - lastActivity > s.hintIdle * 1000;
  };

  function stepHint(now) {
    const dt = Math.min(0.05, (now - hintPrev) / 1000); hintPrev = now;
    hintLevel += ((hintWanted() ? 1 : 0) - hintLevel) * Math.min(1, dt * 3); // ~0.4 s ease
    if (hintLevel < 0.002) hintLevel = 0;
    if (!hintLevel) { hintClock = 0; photo.style.setProperty('--thick', 0); return; }
    hintClock += dt;
    const breath = 0.5 - 0.5 * Math.cos((2 * Math.PI * hintClock) / s.hintPeriod);
    photo.style.setProperty('--thick', breath * hintLevel);
  }

  // While nothing moves, the draw loop sleeps; wake it when the idle time could run out.
  let idleTimer = 0;
  function scheduleIdleCheck() {
    clearTimeout(idleTimer);
    if (s.hintStrength <= 0 || reduceMotion.matches) return;
    const wait = s.hintIdle * 1000 - (performance.now() - lastActivity) + 50;
    idleTimer = setTimeout(requestDraw, Math.max(50, wait));
  }

  // ---- Drawing ----------------------------------------------------------------------------
  let frame = 0;
  function requestDraw() { if (!frame) frame = requestAnimationFrame(draw); }

  function draw(now) {
    frame = 0;
    stepHint(now);
    const life = s.trail * 1000;
    points = points.filter((p) => now - p.t < life);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (points.length && sharp.complete) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const radius = s.brush * width;
      const inner = radius * Math.min(1 - s.soft, 0.99); // equal radii would paint nothing
      for (const p of points) {
        const age = (now - p.t) / life;
        const alpha = 1 - age * age * (3 - 2 * age); // smoothstep: holds, then eases out
        const g = ctx.createRadialGradient(p.x, p.y, inner, p.x, p.y, radius);
        g.addColorStop(0, `rgba(0,0,0,${alpha})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      // Keep only the sharp photo where the mask is painted.
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(sharp, 0, 0, width, height);
    }

    if (points.length || hintLevel > 0 || hintWanted()) requestDraw();
    else scheduleIdleCheck();
  }

  sharp.addEventListener('load', requestDraw);
  readSettings();
})();
