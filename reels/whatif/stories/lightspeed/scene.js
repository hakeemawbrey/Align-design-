'use strict';
// "What if 'I love you' had a speed limit?"
(() => {
  const SUN = { x: 0, y: 540, r: 300 };
  const EARTH = { x: 1000, y: 560, r: 170 };
  const ASTRO = { x: 700, y: 800, scale: .62 };
  const MOON = { x: 1760, y: 330, r: 48 };
  const MARS = { x: 4700, y: 780, r: 96 };
  const PROX = { x: 16500, y: 200, r: 130 };
  const GC = { x: -62000, y: 52000 };                    // the galaxy's centre; the Sun is ~half way out
  const GAL = { rx: 150000, ry: 66000 };
  const YOU_P = [EARTH.x - EARTH.r * .58, EARTH.y - EARTH.r * .5];
  const THEM_P = [YOU_P[0] + 30, YOU_P[1] + 22];        // across a room
  const RW = E.rewind, RWD = .8, S_BACK = E.room + 1.3;
  const FIN = RW + RWD;
  const TITLE = E.title, TOTAL = TITLE + 3.2;
  const storyTime = t => t < RW ? t : t < FIN ? lerp(RW, S_BACK, eio((t - RW) / RWD)) : S_BACK;
  const head = [ASTRO.x + 6, ASTRO.y - 200];            // where the words start

  const cameraAt = makeCamera({ x: ASTRO.x + 60, y: ASTRO.y - 110, z: 2.2 }, [
    { t: E.limit - .1, d: 1.2, x: ASTRO.x + 90, y: ASTRO.y - 120, z: 2.35 },
    { t: E.light, d: 1.3, x: 1000, y: 560, z: 1.0 },
    { t: E.circle - .1, d: 1.0, x: 1000, y: 560, z: 1.35 },
    { t: E.room - .35, d: 1.0, x: YOU_P[0] + 30, y: YOU_P[1] + 20, z: 2.6 },
    { t: E.moon - .25, d: 1.2, x: 1380, y: 470, z: .88 },
    { t: E.mars - .2, d: 1.3, x: 2900, y: 640, z: .32 },
    { t: E.wonder - .25, d: 1.1, x: ASTRO.x + 20, y: ASTRO.y - 90, z: 1.9 },
    { t: E.star - .3, d: 1.6, x: 8300, y: 420, z: .046 },
    { t: E.date - .25, d: 1.1, x: ASTRO.x + 60, y: ASTRO.y - 120, z: 1.75 },
    { t: E.galaxy - .25, d: 2.6, x: GC.x + 20000, y: GC.y - 8000, z: .0058 },
    { t: E.time, d: 2.4, x: GC.x + 26000, y: GC.y - 10000, z: .0062 },
  ]);

  // where THEM is: a room away, then the Moon, Mars, the nearest star
  const STOPS = [[0, THEM_P], [E.moon, [MOON.x - MOON.r * .5, MOON.y - MOON.r * .6]], [E.mars, [MARS.x - MARS.r * .5, MARS.y - MARS.r * .6]], [E.star, [PROX.x - PROX.r * .4, PROX.y - PROX.r * .75]]];
  function themAt(s) {
    let i = 0; while (i + 1 < STOPS.length && s >= STOPS[i + 1][0]) i++;
    if (i === 0) return STOPS[0][1];
    const a = STOPS[i - 1][1], b = STOPS[i][1], u = eio(prog(s, STOPS[i][0], .9));
    const hop = Math.sin(u * Math.PI) * Math.hypot(b[0] - a[0], b[1] - a[1]) * .18;
    return [lerp(a[0], b[0], u), lerp(a[1], b[1], u) - hop];
  }
  const pinK = () => clamp(.35 + .26 * Math.log2(CAM.z + 1), .34, .95);

  // ---------- the galaxy ----------
  const STARS_G = (() => {
    const r = rng(3), out = [];
    for (let i = 0; i < 3600; i++) {
      const arm = i % 2, u = Math.pow(r(), .8), th = u * 2.6 * Math.PI;
      const ang = th + arm * Math.PI + (r() - .5) * .32 * (1.2 - u);
      const rad = .1 + .9 * u + (r() - .5) * .05;
      out.push({ x: Math.cos(ang) * rad, y: Math.sin(ang) * rad, s: .6 + r() * 1.8, c: r() < .2 ? '255,217,138' : r() < .3 ? '255,170,180' : '210,230,255', a: .3 + r() * .6 });
    }
    for (let i = 0; i < 1600; i++) { const a = r() * TAU, d = Math.pow(r(), 2.2) * .3; out.push({ x: Math.cos(a) * d, y: Math.sin(a) * d, s: .6 + r() * 1.4, c: '255,226,180', a: .4 + r() * .5 }); }
    return out;
  })();
  function drawGalaxy(t, a) {
    if (a <= 0) return;
    const rot = t * .01;
    glow(sx(GC.x), sy(GC.y), sz(GAL.rx * .5), '255,210,160', .45 * a);
    glow(sx(GC.x), sy(GC.y), sz(GAL.rx * 1.1), '90,110,220', .25 * a);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const p of STARS_G) {
      const c = Math.cos(rot), s2 = Math.sin(rot);
      const x = GC.x + (p.x * c - p.y * s2) * GAL.rx, y = GC.y + (p.x * s2 + p.y * c) * GAL.ry;
      const X = sx(x), Y = sy(y);
      if (X < -5 || X > W + 5 || Y < -5 || Y > H + 5) continue;
      ctx.fillStyle = `rgba(${p.c},${p.a * a * .8})`; ctx.beginPath(); ctx.arc(X, Y, p.s, 0, TAU); ctx.fill();
    }
    ctx.restore();
  }

  function heart(x, y, r, col, a = 1) {
    if (r <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(r / 50, r / 50); ctx.globalAlpha = a;
    ctx.fillStyle = col; ctx.beginPath();
    ctx.moveTo(0, 38); ctx.bezierCurveTo(-60, -2, -42, -58, 0, -28); ctx.bezierCurveTo(42, -58, 60, -2, 0, 38); ctx.fill();
    ctx.restore();
  }
  function speedSign(x, y, k) {
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    glow(0, 0, 220, '255,143,143', .3);
    ctx.fillStyle = '#ff6f7d'; ctx.beginPath(); ctx.arc(0, 0, 132, 0, TAU); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(0, 0, 108, 0, TAU); ctx.fill();
    ctx.fillStyle = '#16233f'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = FONT(700, 46); ctx.letterSpacing = '1px'; ctx.fillText('299,792', 0, -8);
    ctx.font = FONT(700, 26); ctx.letterSpacing = '4px'; ctx.fillText('KM/S', 2, 34);
    ctx.restore();
  }
  // a photon flying from a to b between t0 and t0+d, with a tail
  function flight(a, b, s, t0, d, col = '255,150,170', ease = u => u) {
    const u = ease(prog(s, t0, d));
    if (s < t0 || u >= 1) return null;
    const x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u);
    photon(sx(x), sy(y), 1, sx(a[0]) - sx(b[0]), sy(a[1]) - sy(b[1]), col, Math.min(340, Math.hypot(sx(b[0]) - sx(a[0]), sy(b[1]) - sy(a[1])) * u + 20));
    return [x, y];
  }

  function draw(t) {
    const s = storyTime(t);
    const rewinding = t >= RW && t < FIN, fin = t >= FIN;
    CAM = cameraAt(s);
    if (fin) CAM = finaleCam(t, CAM);
    drawBackground(t, s, 0);
    drawGalaxy(t, clamp((.03 - CAM.z) / .02));

    drawStar(sx(SUN.x), sy(SUN.y), Math.max(sz(SUN.r), 2.5), t, PAL_WARM, 1);
    const lx = sx(SUN.x), ly = sy(SUN.y);
    drawSphere(sx(EARTH.x), sy(EARTH.y), sz(EARTH.r), lx, ly, { rot: .35 + t * .55 * Math.PI / 180, tilt: .26 });
    drawSphere(sx(MOON.x), sy(MOON.y), sz(MOON.r), lx, ly, { rot: t * .01, tilt: .1, mode: 3 });
    drawSphere(sx(MARS.x), sy(MARS.y), sz(MARS.r), lx, ly, { rot: t * .02 + 1, tilt: .44, mode: 2 });
    drawStar(sx(PROX.x), sy(PROX.y), Math.max(sz(PROX.r), 3), t, PAL_RED, 1);
    glow(sx(PROX.x), sy(PROX.y), 70, '255,120,110', .7 * clamp((.2 - CAM.z) / .1) * clamp((CAM.z - .012) / .01));
    if (CAM.z < .02) { glow(sx(SUN.x), sy(SUN.y), 40, '255,217,138', .9); }

    // the words, the limit, the photon
    const lt = lineStart(0) + .45;
    if (!fin && s < E.light + .3) {
      const squish = eic(prog(s, E.limit, .28));
      ctx.save(); ctx.translate(sx(head[0]), sy(head[1])); ctx.scale(1 - squish, 1 - squish * .4); ctx.translate(-sx(head[0]), -sy(head[1]));
      caption(sx(head[0]), sy(head[1]), [{ text: 'I LOVE YOU', color: COL.coral, size: 44 }], s, lt, 1e9);
      ctx.restore();
      if (s > E.limit) {
        const k = spring(s - E.limit, .45, 15);
        heart(sx(head[0]), sy(head[1]), 30 * k, '#ff6f7d');
        glow(sx(head[0]), sy(head[1]), 120 * k, '255,150,170', .8);
      }
      const sk = (1.7 - .7 * spring(s - E.limit - .05, .45, 14)) * (s > E.limit + .05 ? 1 : 0) * (1 - eic(prog(s, E.light + .1, .3)));
      speedSign(420, 300, sk);
      caption(420, 490, [{ text: 'SPEED LIMIT', color: COL.gold, size: 30 }], s, E.limit + .15, E.light + .05);
    }
    // it zips off and circles the Earth seven times in a second
    if (!fin) {
      const c0 = E.light + .05;
      if (s > c0 && s < E.circle + .1) {
        const u = eoc(prog(s, c0, E.circle + .1 - c0));
        const p = [lerp(head[0], EARTH.x - EARTH.r * 1.5, u), lerp(head[1], EARTH.y, u)];
        photon(sx(p[0]), sy(p[1]), 1, sx(head[0]) - sx(p[0]), sy(head[1]) - sy(p[1]), '255,150,170', 260);
      }
      const cd = s - (E.circle + .1);
      if (cd > 0 && cd < 1.6) {
        const lap = clamp(cd / 1.0) * 7, ang = Math.PI + lap * TAU;
        const R = EARTH.r * 1.45;
        const a = 1 - clamp((cd - 1.05) / .5);
        for (let k = 0; k < 18; k++) {
          const aa = ang - k * .09;
          glow(sx(EARTH.x + Math.cos(aa) * R), sy(EARTH.y + Math.sin(aa) * R * .42), 34 - k * 1.6, '255,150,170', a * (1 - k / 18) * .8);
        }
        photon(sx(EARTH.x + Math.cos(ang) * R), sy(EARTH.y + Math.sin(ang) * R * .42), a, Math.sin(ang), -Math.cos(ang) * .42, '255,150,170', 120);
        caption(W / 2, 150, [{ text: 'LAPS IN ONE SECOND', color: COL.teal, size: 30 }, { text: String(Math.min(7, Math.floor(lap + .001))), color: COL.gold, size: 72, w: measure('7', 72) + 80 }], s, E.circle + .1, E.room - .4);
      }
    }

    // YOU and THEM
    const k = pinK() * clamp((CAM.z - .012) / .01);
    drawPin(sx(YOU_P[0]), sy(YOU_P[1]), s - (E.room - .2), 'YOU', k);
    const them = themAt(s);
    const smile = .25 * wobble(s - E.smiling, 13, .4);
    drawPin(sx(them[0]), sy(them[1]), s - (E.room - .05), 'THEM', k * (1 + smile), ['#a4f2ff', '#2a98b3']);
    if (s > E.smiling && s < E.moon + .2) {
      const hk = spring(s - E.smiling, .45, 14) * (1 - eic(prog(s, E.moon - .1, .3)));
      heart(sx(them[0]) + 40 * k, sy(them[1]) - 190 * k, 26 * hk, '#ff6f7d');
    }
    // across a room: instant
    if (!fin) {
      const hop = s - (E.room + .55);
      if (hop > 0 && hop < .5) { const u = eoc(hop / .12); glow(lerp(sx(YOU_P[0]), sx(them[0]), u), lerp(sy(YOU_P[1]), sy(them[1]), u) - 120 * k, 60, '255,150,170', 1 - hop / .5); }
      caption(W / 2, H - 150, [{ text: '0.00000001 SECONDS', color: COL.gold, size: 44 }], s, E.room + .6, E.moon - .2);
    }

    if (!fin) {
      // the Moon: over a second, counted live
      const m0 = E.second - .5;
      flight(YOU_P, them, s, m0, 1.28);
      if (s > m0) {
        const el = Math.min(1.28, s - m0);
        caption(W / 2, 150, [{ text: 'EARTH TO MOON', color: COL.teal, size: 30 }, { text: el.toFixed(2) + ' SEC', color: COL.gold, size: 72, w: measure('1.28 SEC', 72) + 20 }], s, m0, E.mars - .15);
        if (s > m0 + 1.28) ringGlow(sx(them[0]), sy(them[1]) - 60 * k, 40 + 140 * eoc((s - m0 - 1.28) / .6), 1 - clamp((s - m0 - 1.28) / .7), 4, '255,150,170');
      }
      // Mars: up to 22 minutes, and the photon barely gets going
      if (s > E.minutes - .1 && s < E.star + .2) {
        const u = clamp((s - E.minutes) * .06);
        const a = [YOU_P[0], YOU_P[1] - 60], b = [MARS.x - MARS.r * .5, MARS.y - MARS.r * .6 - 60];
        const p = [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
        photon(sx(p[0]), sy(p[1]), 1, sx(a[0]) - sx(b[0]), sy(a[1]) - sy(b[1]), '255,150,170', 160);
        const mm = 22 * eoc(prog(s, E.minutes, 1.5));
        caption(W / 2, 150, [{ text: 'EARTH TO MARS, UP TO', color: COL.teal, size: 30 }, { text: `${String(Math.floor(mm)).padStart(2, '0')}:${String(Math.floor((mm % 1) * 60)).padStart(2, '0')} MIN`, color: COL.gold, size: 72, w: measure('22:00 MIN', 72) + 20 }], s, E.minutes - .05, E.star - .3);
      }
      // the nearest star: four years
      if (s > E.star) {
        caption(sx(PROX.x), sy(PROX.y) + 110, [{ text: 'NEAREST STAR', color: COL.coral, size: 32 }], s, E.star + .5, E.date - .3);
        const yv = 4.2 * eoc(prog(s, E.years, 1.0));
        if (s > E.years - .05) caption(W / 2, 150, [{ text: 'ONE WAY', color: COL.teal, size: 30 }, { text: yv.toFixed(1) + ' YEARS', color: COL.gold, size: 72, w: measure('4.2 YEARS', 72) + 20 }], s, E.years - .05, E.date - .25);
      }
      // the first date, and the eighth anniversary
      if (s > E.date + .3 && s < E.galaxy + .3) {
        const yr = 1 + Math.floor(7 * eio(prog(s, E.date + .4, E.anniversary - E.date - .5)));
        caption(sx(ASTRO.x) + 300, sy(ASTRO.y - 260), [{ text: 'WAITING FOR A REPLY', color: COL.teal, size: 28 }, { text: 'YEAR ' + yr, color: COL.gold, size: 60, w: measure('YEAR 8', 60) + 30 }], s, E.date + .3, E.galaxy - .2);
        const rp = flight([ASTRO.x + 1400, ASTRO.y - 600], [ASTRO.x + 10, ASTRO.y - 210], s, E.anniversary - .45, .45, '150,235,255', eic);
        if (s > E.anniversary) {
          caption(sx(ASTRO.x) - 40, sy(ASTRO.y - 330), [{ text: 'ME TOO', color: COL.coral, size: 40 }], s, E.anniversary + .15, E.galaxy - .2);
          heart(sx(ASTRO.x - 160), sy(ASTRO.y - 260), 24 * spring(s - E.anniversary - .2, .45, 14), '#ff6f7d');
        }
      }
      // the galaxy, and recorded history inside the silence
      if (s > E.galaxy + 1) {
        const y = GC.y + GAL.ry * 1.05, x0 = GC.x - GAL.rx, x1 = GC.x + GAL.rx;
        const dr = eoc(prog(s, E.galaxy + 1, .8));
        ctx.save(); ctx.strokeStyle = 'rgba(143,216,230,.8)'; ctx.lineWidth = 3; ctx.lineCap = 'round';
        const mid = sx(GC.x), hw = (sx(x1) - sx(x0)) / 2 * dr;
        ctx.beginPath(); ctx.moveTo(mid - hw, sy(y)); ctx.lineTo(mid + hw, sy(y)); ctx.stroke();
        for (const xx of [mid - hw, mid + hw]) { ctx.beginPath(); ctx.moveTo(xx, sy(y) - 14); ctx.lineTo(xx, sy(y) + 14); ctx.stroke(); }
        ctx.restore();
        caption(mid, sy(y) - 4, [{ text: '100,000 LIGHT YEARS', color: COL.teal, size: 30 }], s, E.galaxy + 1.1, 1e9);
        if (s > E.silence) {
          const hx = sx(SUN.x), seg = (sx(x1) - sx(x0)) * .05 * eoc(prog(s, E.silence, .8));
          ctx.save(); ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.shadowColor = 'rgba(255,217,138,.9)'; ctx.shadowBlur = 20;
          ctx.beginPath(); ctx.moveTo(hx, sy(SUN.y) + 30); ctx.lineTo(hx + seg, sy(SUN.y) + 30); ctx.stroke(); ctx.restore();
          caption(hx + 30, sy(SUN.y) + 120, [{ text: 'ALL OF RECORDED HISTORY', color: COL.white, size: 30 }, { text: '5,000 YEARS', color: COL.gold, size: 44 }], s, E.silence + .05, 1e9);
        }
        caption(sx(SUN.x), sy(SUN.y) - 70, [{ text: 'YOU', color: COL.coral, size: 28 }], s, E.galaxy + 1.4, 1e9);
        if (s > E.time) caption(W / 2, 140, [{ text: 'DISTANCE IS TIME', color: COL.gold, size: 50 }], s, E.time, 1e9);
      }
    }

    // the astronaut
    const eyes = [[0, () => head], [E.light + .1, () => [EARTH.x, EARTH.y]], [E.room, () => YOU_P], [E.moon, () => themAt(s)], [E.wonder, () => [ASTRO.x + 60, ASTRO.y - 150]],
      [E.wonder + 1.1, () => [MARS.x, MARS.y]], [E.date + .2, () => [ASTRO.x + 400, ASTRO.y - 300]], [E.anniversary - .4, () => [ASTRO.x + 900, ASTRO.y - 500]], [E.anniversary + .3, () => [CAM.x, CAM.y + 300]]];
    const poses = [[0, 'idle'], [E.limit, 'hug'], [E.light, 'point'], [E.circle + 1.2, 'idle'], [E.wonder - .05, 'watch'], [E.star - .3, 'idle'], [E.date + .1, 'droop'], [E.anniversary, 'wow'], [E.anniversary + .8, 'hug']];
    const tap = s > E.wonder && s < E.star - .3 ? .06 * Math.max(0, Math.sin((s - E.wonder) * 11)) : 0;
    const wait = eoc(prog(s, E.date + .1, .6)) * (1 - eoc(prog(s, E.anniversary, .3)));
    const bonk = s - E.anniversary;
    drawAstronaut(t, {
      x: ASTRO.x, y: ASTRO.y, scale: ASTRO.scale, arms: poseAt(poses, s), eye: eyesAt(eyes, s), watch: s > E.wonder - .1 && s < E.star,
      sq: squashAt([E.limit, E.light, E.room, E.wonder, E.date, E.anniversary, E.anniversary + .8], s) + tap + (bonk > 0 ? .25 * wobble(bonk, 15, .35) : 0),
      tilt: (bonk > 0 ? .35 * wobble(bonk, 9, .3) : 0) + .08 * wait, lookDown: wait * .7, happy: clamp((s - E.anniversary - .3) / .3) * (1 - clamp((s - E.galaxy) / .4)),
      prop: () => {
        // "..." while wondering
        if (s > E.wonder + .2 && s < E.star - .3) {
          rr(56, -230, 120, 52, 26, 'rgba(6,20,40,.62)');
          for (let i = 0; i < 3; i++) { const b = .5 + .5 * Math.sin(t * 7 - i * .9); ctx.fillStyle = `rgba(143,216,230,${.4 + .6 * b})`; ctx.beginPath(); ctx.arc(86 + i * 30, -204 - 5 * b, 8, 0, TAU); ctx.fill(); }
        }
      },
    });

    if (fin) finale(t, k);
    if (rewinding) rewindBadge((t - RW) / RWD);
  }

  function finaleCam(t, base) {
    let c = camMix(base, { x: YOU_P[0] + 18, y: YOU_P[1] - 30, z: 3.1 }, eio(prog(t, FIN, E.instant - FIN + .6)));
    return { x: c.x + 5 * Math.sin(t * .37), y: c.y + 4 * Math.sin(t * .29), z: c.z * (1 + .01 * Math.sin(t * .23)) };
  }
  function finale(t, k) {
    const hd = t - E.here;
    if (hd > 0) ringGlow(sx(YOU_P[0]), sy(YOU_P[1]) - 100 * k, 70 + 20 * Math.sin(t * 5), clamp(hd / .3) * (1 - clamp((t - E.instant) / .3)) * .6, 3, '255,150,170');
    const id = t - E.instant;
    if (id > 0) {
      const u = eoc(id / .1);
      const a = [sx(YOU_P[0]), sy(YOU_P[1]) - 110 * k], b = [sx(THEM_P[0]), sy(THEM_P[1]) - 110 * k];
      glow(lerp(a[0], b[0], u), lerp(a[1], b[1], u), 120, '255,150,170', 1 - clamp(id / .6));
      flash(id, .35, .5);
      ringGlow((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 60 + 260 * spring(id, .42, 9), (1 - clamp((id - 1) / 1.2)) * .9, 6, '255,150,170');
      const hk = spring(id - .1, .45, 14) * (1 - eic(prog(t, TITLE - .35, .3)));
      heart((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 190, 46 * hk, '#ff6f7d');
      caption(W / 2, H - 150, [{ text: 'INSTANT', color: COL.gold, size: 54 }], t, E.instant + .05, TITLE - .25);
    }
    title(t, TITLE, 'SAY IT WHILE IT IS INSTANT');
  }

  window.SCENE = { total: TOTAL, draw };
})();
