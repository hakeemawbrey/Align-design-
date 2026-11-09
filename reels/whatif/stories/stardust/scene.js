'use strict';
// "What if the person you're meant to find was made in the same star as you?"
(() => {
  const STAR = { x: 960, y: 540, r: 210 };
  const SUN = { x: 0, y: 540, r: 300 };
  const EARTH = { x: 1300, y: 540, r: 170 };
  const ASTRO = { x: 1545, y: 712, scale: .55 };
  const KNOT = { x: 740, y: 210 };
  const PIN_YOU = [EARTH.x - EARTH.r * .62, EARTH.y - EARTH.r * .48];
  const PIN_THEM = [EARTH.x + EARTH.r * .52, EARTH.y + EARTH.r * .4];
  const M = { x: 1300, y: 300 };                 // the line the two sparks drift along
  const EXP = E.exploded + .55;                  // the star blows
  const RW = E.rewind, RWD = .8, S_BACK = E.lifetimes + 1.0;
  const FIN = RW + RWD;
  const TITLE = E.title, TOTAL = TITLE + 3.2;
  const storyTime = t => t < RW ? t : t < FIN ? lerp(RW, S_BACK, eio((t - RW) / RWD)) : S_BACK;

  const cameraAt = makeCamera({ x: 960, y: 540, z: 2.25 }, [
    { t: E.star - .2, d: 2.2, x: 960, y: 548, z: 2.45 },
    { t: EXP, d: 2.4, x: 960, y: 540, z: .85 },
    { t: E.carbon - .15, d: 1.1, x: 930, y: 480, z: 1.02 },
    { t: E.blood - .1, d: 1.0, x: 990, y: 640, z: 1.3 },
    { t: E.sun - .25, d: 1.25, x: 650, y: 540, z: .85 },
    { t: E.you - .45, d: 1.0, x: 1290, y: 525, z: 2.3 },
    { t: E.them - .1, d: .9, x: 1330, y: 560, z: 2.2 },
    { t: E.same - .3, d: 1.1, x: 1070, y: 420, z: 1.2 },
    { t: E.scattered - .05, d: 1.0, x: 1300, y: 380, z: .9 },
    { t: E.oceans, d: .9, x: 1300, y: 320, z: .55 },
    { t: E.centuries, d: .9, x: 1300, y: 320, z: .3 },
    { t: E.lifetimes, d: 1.2, x: 1300, y: 340, z: .16 },
    { t: E.millions - .1, d: 1.9, x: 1300, y: 500, z: .08 },
    { t: E.notice - .35, d: 1.3, x: ASTRO.x - 60, y: ASTRO.y - 50, z: 1.9 },
  ]);

  // ---------- the dust of the dead star ----------
  const DUST = (() => {
    const r = rng(31), out = [];
    const cols = ['143,216,230', '255,217,138', '255,143,120', '170,180,255', '235,245,255'];
    for (let i = 0; i < 1500; i++) {
      const u = r();
      out.push({
        a: r() * TAU, f: Math.pow(r(), .6), sp: .6 + r() * .6, ph: r() * TAU,
        col: cols[(r() * cols.length) | 0], s: 2.6 + r() * 6,
        grp: u < .68 ? 'sun' : u < .76 ? 'earth' : 'rest',
        tx: (r() - .5), ty: (r() - .5),
      });
    }
    return out;
  })();
  function dustPos(p, s) {
    const e = eoc((s - EXP) / 2.8);
    const R = p.f * 980 * e + 30 * Math.sin(s * .25 * p.sp + p.ph);
    const swirl = p.a + .05 * s * p.sp;
    let x = STAR.x + Math.cos(swirl) * R, y = STAR.y + Math.sin(swirl) * R * .72;
    let fade = 1;
    if (p.grp === 'sun') {
      const u = eio(prog(s, E.sun - .6 + p.f * .4, 1.2));
      x = lerp(x, SUN.x + p.tx * 260, u); y = lerp(y, SUN.y + p.ty * 260, u); fade = 1 - eic(u);
    } else if (p.grp === 'earth') {
      const u = eio(prog(s, E.planet - .55 + p.f * .3, 1.0));
      x = lerp(x, EARTH.x + p.tx * 120, u); y = lerp(y, EARTH.y + p.ty * 120, u); fade = 1 - eic(u);
    } else fade = .55;
    return [x, y, fade];
  }
  function drawDust(s, t) {
    if (s < EXP) return;
    const born = clamp((s - EXP) / .25);
    // the cloud's glow, gone once gravity has gathered it
    const cloud = born * (1 - .75 * eio(prog(s, E.sun - .5, 1.4)));
    glow(sx(STAR.x - 120), sy(STAR.y - 60), sz(1000), '24,150,160', .42 * cloud);
    glow(sx(STAR.x + 200), sy(STAR.y + 80), sz(800), '220,95,110', .34 * cloud);
    glow(sx(STAR.x), sy(STAR.y), sz(520), '255,217,138', .26 * cloud);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const p of DUST) {
      const [x, y, f] = dustPos(p, s);
      const X = sx(x), Y = sy(y);
      if (X < -20 || X > W + 20 || Y < -20 || Y > H + 20) continue;
      const a = born * f * (.55 + .45 * Math.sin(t * 1.3 * p.sp + p.ph));
      if (a <= .01) continue;
      const r = Math.max(1, sz(p.s));
      ctx.fillStyle = `rgba(${p.col},${a})`;
      ctx.beginPath(); ctx.arc(X, Y, r, 0, TAU); ctx.fill();
    }
    ctx.restore();
  }

  // ---------- element badges ----------
  const ELEMENTS = [
    { k: 'carbon', sym: 'C', name: 'CARBON', x: 690, y: 370, col: COL.teal, rgb: '143,216,230' },
    { k: 'oxygen', sym: 'O', name: 'OXYGEN', x: 1230, y: 330, col: COL.white, rgb: '235,245,255' },
    { k: 'iron', sym: 'Fe', name: 'IRON', x: 1010, y: 735, col: COL.gold, rgb: '255,217,138' },
  ];
  function drawElements(s, t) {
    const out = E.sun - .3;
    for (const el of ELEMENTS) {
      const d = s - E[el.k];
      if (d <= 0 || s > out + .6) continue;
      const k = spring(d, .45, 14) * (1 - eic((s - out) / .45));
      if (k <= 0) continue;
      const X = sx(el.x), Y = sy(el.y);
      const blood = el.k === 'iron' ? clamp((s - E.blood) / .3) : 0;
      // heartbeat: lub-dub, twice
      if (el.k === 'iron') for (const b of [0, .28, .9, 1.18]) {
        const bd = s - E.blood - b;
        if (bd > 0 && bd < .9) ringGlow(X, Y, 56 + bd * 220, (1 - bd / .9) * .8 * k, 4, '255,120,120');
      }
      const beat = el.k === 'iron' ? .12 * (wobble(s - E.blood, 16, .45) + wobble(s - E.blood - .9, 16, .45)) : 0;
      ctx.save(); ctx.translate(X, Y); ctx.scale(k * (1 + beat), k * (1 + beat));
      glow(0, 0, 120, blood > 0 ? '255,110,110' : el.rgb, .35);
      ctx.fillStyle = 'rgba(6,20,40,.62)'; ctx.beginPath(); ctx.arc(0, 0, 52, 0, TAU); ctx.fill();
      ctx.fillStyle = blood > 0 ? `rgba(230,80,95,${blood})` : 'rgba(0,0,0,0)'; ctx.beginPath(); ctx.arc(0, 0, 52, 0, TAU); ctx.fill();
      ctx.restore();
      ctx.save(); ctx.translate(X, Y); ctx.scale(1 + beat, 1 + beat); ctx.translate(-X, -Y);
      riseText(el.sym, X, Y, 46, blood > 0 ? '#ffffff' : el.col, s, E[el.k] + .06, out, { spacing: 2 });
      ctx.restore();
      caption(X, Y + 96, [{ text: el.name, color: el.col, size: 30 }], s, E[el.k] + .1, out);
    }
    caption(sx(1010), sy(735) + 168, [{ text: 'IN YOUR BLOOD', color: COL.coral, size: 34 }], s, E.blood + .05, out);
  }

  // ---------- the two sparks ----------
  const D_KEYS = [[E.scattered, 300], [E.oceans, 1500], [E.centuries, 3400], [E.lifetimes, 7600]];
  function sparkPos(s) {
    const d = track(D_KEYS, s, .9, eoc);
    const u = eio(prog(s, E.scattered, .9));
    const a = [M.x - d / 2, M.y], b = [M.x + d / 2, M.y + 40];
    return [[lerp(PIN_YOU[0], a[0], u), lerp(PIN_YOU[1], a[1], u)], [lerp(PIN_THEM[0], b[0], u), lerp(PIN_THEM[1], b[1], u)]];
  }
  function spark(x, y, col, label, a, t, k = 1) {
    glow(x, y, 80 * k, col, .7 * a);
    glow(x, y, 26 * k, '255,255,255', .9 * a);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.beginPath(); ctx.arc(x, y, 6 * k, 0, TAU); ctx.fill(); ctx.restore();
  }

  // ---------- frame ----------
  function draw(t) {
    const s = storyTime(t);
    const rewinding = t >= RW && t < FIN, fin = t >= FIN;
    CAM = cameraAt(s);
    if (fin) CAM = finaleCam(t, CAM);
    drawBackground(t, s, .3 * spring(s - E.same, .5, 12) * (1 - eic(prog(s, E.same + 1.2, 1.4))));

    // millions of strangers
    const fa = clamp((.3 - CAM.z) / .18);
    const dim = 1 - .7 * eoc(prog(s, E.notice - .1, .8));
    drawField(M.x, 500, fa * (fin ? .5 : dim), t, 1);

    drawDust(s, t);
    // the star, then the Sun it becomes part of
    const ss = swellCollapse(s - E.exploded, true);
    if (ss > 0) {
      const pulse = 1 + .05 * wobble(s - E.star, 9, .4);
      drawStar(sx(STAR.x), sy(STAR.y), sz(STAR.r) * ss * pulse, t, PAL_WARM, 1 + .4 * spring(s - E.star, .5, 10));
    }
    flash(s - EXP);
    shockwave(sx(STAR.x), sy(STAR.y), sz(STAR.r) * .3, s - EXP, '255,230,190');
    const sunK = spring(s - E.sun, .45, 12);
    if (sunK > 0) {
      glow(sx(SUN.x), sy(SUN.y), sz(900), '255,200,110', .5 * (1 - eoc((s - E.sun) / 1.2)));
      drawStar(sx(SUN.x), sy(SUN.y), sz(SUN.r) * sunK, t, PAL_WARM, 1);
    }
    const earthK = spring(s - E.planet, .45, 13);
    if (earthK > 0) drawSphere(sx(EARTH.x), sy(EARTH.y), sz(EARTH.r) * earthK, sx(SUN.x), sy(SUN.y), { rot: .35 + t * .55 * Math.PI / 180, tilt: .26 });

    drawElements(s, t);

    // YOU and THEM
    const pinK = clamp(.35 + .3 * Math.log2(CAM.z + 1), .3, 1) * (1 - eic(prog(s, E.scattered, .4)));
    drawPin(sx(PIN_YOU[0]), sy(PIN_YOU[1]), s - E.you, 'YOU', pinK);
    drawPin(sx(PIN_THEM[0]), sy(PIN_THEM[1]), s - E.them, 'THEM', pinK, ['#a4f2ff', '#2a98b3']);

    // both of you, traced back to one cloud
    const th = eoc(prog(s, E.same - .1, 1.0)) * (1 - eic(prog(s, E.scattered + .1, .5)));
    if (th > 0) {
      glow(sx(KNOT.x), sy(KNOT.y), sz(260), '255,217,138', .5 * th);
      glow(sx(KNOT.x), sy(KNOT.y), sz(420), '143,216,230', .3 * th);
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
      for (const [P, col] of [[PIN_YOU, '255,170,150'], [PIN_THEM, '160,240,255']]) {
        const c = [lerp(P[0], KNOT.x, .5) + (P === PIN_YOU ? -140 : 160), lerp(P[1], KNOT.y, .5) - 120];
        for (const [w, a] of [[sz(14), .15], [sz(5), .9]]) {
          ctx.strokeStyle = `rgba(${col},${a * th})`; ctx.lineWidth = w;
          ctx.beginPath(); ctx.moveTo(sx(P[0]), sy(P[1] - 40));
          const N = 40;
          for (let i = 1; i <= N * th; i++) { const u = i / N; const q = [(1 - u) * (1 - u) * P[0] + 2 * (1 - u) * u * c[0] + u * u * KNOT.x, (1 - u) * (1 - u) * (P[1] - 40) + 2 * (1 - u) * u * c[1] + u * u * KNOT.y]; ctx.lineTo(sx(q[0]), sy(q[1])); }
          ctx.stroke();
        }
        for (let k = 0; k < 3; k++) {
          const u = mod(t * .5 + k / 3, 1) * th;
          const q = [(1 - u) * (1 - u) * P[0] + 2 * (1 - u) * u * c[0] + u * u * KNOT.x, (1 - u) * (1 - u) * (P[1] - 40) + 2 * (1 - u) * u * c[1] + u * u * KNOT.y];
          glow(sx(q[0]), sy(q[1]), 30, col, .8 * th);
        }
      }
      ctx.restore();
      caption(sx(KNOT.x), sy(KNOT.y) - 90, [{ text: 'THE SAME CLOUD', color: COL.gold, size: 38 }], s, E.same + .1, E.scattered);
    }

    // scattered: two sparks drift apart
    let sp = null;
    if (s > E.scattered || fin) {
      sp = fin ? finaleSparks(t) : sparkPos(s);
      const a = clamp((s - E.scattered) / .3);
      const [A, B] = sp;
      ctx.save(); ctx.strokeStyle = `rgba(143,216,230,${.35 * a})`; ctx.lineWidth = 2; ctx.setLineDash([8, 10]); ctx.lineDashOffset = -t * 20;
      ctx.beginPath(); ctx.moveTo(sx(A[0]), sy(A[1])); ctx.lineTo(sx(B[0]), sy(B[1])); ctx.stroke(); ctx.restore();
      const touch = fin ? clamp((t - E.recognition) / .25) : 0;
      spark(sx(A[0]), sy(A[1]), '255,150,130', 'YOU', a, t, 1 + touch * .4);
      spark(sx(B[0]), sy(B[1]), '150,235,255', 'THEM', a, t, 1 + touch * .4);
      if (!fin) {
        const tagA = clamp((s - E.scattered - .3) / .3) * (1 - clamp((s - E.notice + .5) / .3));
        if (tagA > 0) {
          caption(sx(A[0]), sy(A[1]) - 64, [{ text: 'YOU', color: COL.coral, size: 28 }], s, E.scattered + .3, E.notice - .5);
          caption(sx(B[0]), sy(B[1]) - 64, [{ text: 'THEM', color: COL.teal, size: 28 }], s, E.scattered + .4, E.notice - .5);
        }
        const mid = [sx((A[0] + B[0]) / 2), sy((A[1] + B[1]) / 2) + 260];
        caption(mid[0], mid[1], [{ text: 'BY OCEANS', color: COL.teal, size: 40 }], s, E.oceans + .05, E.centuries - .05);
        caption(mid[0], mid[1], [{ text: 'BY CENTURIES', color: COL.white, size: 40 }], s, E.centuries + .05, E.lifetimes - .05);
        caption(mid[0], mid[1], [{ text: 'BY LIFETIMES', color: COL.gold, size: 40 }], s, E.lifetimes + .05, E.millions - .1);
      }
    }

    // millions: a live counter
    if (!fin && s > E.millions - .05) {
      const n = 1e6 * eoc((s - E.millions) / 2.0);
      caption(W / 2, 150, [{ text: 'STRANGERS YOU WILL PASS', color: COL.teal, size: 30 }, { text: fmt(n) + (n > 999999 ? '+' : ''), color: COL.gold, size: 72, w: measure('1,000,000+', 72) + 20 }], s, E.millions, E.notice - .2);
    }

    // a stranger zips past; the wave goes unanswered
    const zd = s - (E.notice + .35);
    let zip = null;
    if (!fin && zd > 0 && zd < 1.2) {
      const u = eio(zd / 1.0);
      zip = [lerp(ASTRO.x + 900, ASTRO.x - 1100, u), ASTRO.y - 120 + 80 * Math.sin(u * 3)];
      photon(sx(zip[0]), sy(zip[1]), 1, 1, 0, '200,230,255', 220);
    }

    // the astronaut
    const eyes = [[0, () => [STAR.x, STAR.y]], [E.you - .2, () => PIN_YOU], [E.them, () => PIN_THEM], [E.them + .7, () => PIN_YOU], [E.them + 1.4, () => PIN_THEM],
      [E.same, () => [KNOT.x, KNOT.y]], [E.scattered + .2, () => sparkPos(s)[0]], [E.notice + .1, () => zip || [ASTRO.x + 600, ASTRO.y - 120]], [E.notice + 1.3, () => [ASTRO.x - 300, ASTRO.y + 200]]];
    const poses = [[0, 'idle'], [E.exploded + .55, 'shield'], [E.sun, 'idle'], [E.them + .15, 'hug'], [E.same, 'point'], [E.scattered + .4, 'idle'], [E.notice + .05, 'wave'], [E.notice + 1.35, 'droop']];
    const droop = eoc(prog(s, E.notice + 1.35, .5));
    drawAstronaut(t, {
      x: ASTRO.x, y: ASTRO.y, scale: ASTRO.scale, arms: poseAt(poses, s), eye: eyesAt(eyes, s),
      sq: squashAt([EXP, E.sun, E.you, E.them, E.same, E.notice + .05, E.notice + 1.35], s),
      wave: s > E.notice && s < E.notice + 1.3 ? 1 : 0, lookDown: droop * .8, tilt: droop * .1,
    });

    if (fin) finale(t);
    if (rewinding) rewindBadge((t - RW) / RWD);
  }

  // ---------- finale: two sparks find their way back ----------
  function finaleCam(t, base) {
    let c = camMix(base, { x: M.x, y: M.y + 20, z: .34 }, eio(prog(t, FIN, E.feet - FIN)));
    c = camMix(c, { x: M.x, y: M.y + 10, z: 1.5 }, eio(prog(t, E.feet, 1.4)));
    c = camMix(c, { x: M.x, y: M.y + 10, z: 1.8 }, eio(prog(t, E.recognition, 3)));
    return { x: c.x + 6 * Math.sin(t * .37), y: c.y + 4 * Math.sin(t * .29), z: c.z * (1 + .01 * Math.sin(t * .23)) };
  }
  function finaleSparks(t) {
    const d0 = track(D_KEYS, S_BACK, .9, eoc);
    let d = lerp(d0, 5400, eio(prog(t, FIN, E.feet - FIN)));
    d = lerp(d, 70, eio(prog(t, E.feet, 1.4)));
    d = lerp(d, 0, spring(t - E.recognition, .45, 12) * clamp((t - E.recognition) * 100));
    return [[M.x - d / 2, M.y + 20], [M.x + d / 2, M.y + 20]];
  }
  const BURST = (() => { const r = rng(12); return Array.from({ length: 90 }, () => ({ a: r() * TAU, v: 120 + r() * 520, s: 1.5 + r() * 3, c: r() < .5 ? '255,217,138' : r() < .5 ? '143,216,230' : '255,150,130' })); })();
  function finale(t) {
    // years apart, counting down to a few feet
    let label = '5,000,000,000 YEARS';
    if (t > E.feet) { const p = eio(prog(t, E.feet, 1.2)); label = p < 1 ? fmt(5e9 * (1 - p)) + ' YEARS' : '3 FEET'; }
    caption(W / 2, 150, [{ text: 'APART', color: COL.teal, size: 30 }, { text: label, color: COL.gold, size: 64, w: measure('5,000,000,000 YEARS', 64) }], t, E.apart, E.recognition - .1);
    const rd = t - E.recognition;
    if (rd > 0) {
      const c = [sx(M.x), sy(M.y + 20)];
      flash(rd, .45, .7);
      ringGlow(c[0], c[1], 40 + 220 * spring(rd, .42, 9), (1 - clamp((rd - 1.2) / 1.5)) * .9, 6);
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      for (const b of BURST) {
        const r = b.v * eoc(rd / 2.2), a = (1 - clamp(rd / 2.6)) * .9;
        ctx.fillStyle = `rgba(${b.c},${a})`; ctx.beginPath(); ctx.arc(c[0] + Math.cos(b.a) * r, c[1] + Math.sin(b.a) * r * .8, b.s, 0, TAU); ctx.fill();
      }
      ctx.restore();
      glow(c[0], c[1], 260, '255,217,138', .5 * clamp(rd / .4));
    }
    caption(W / 2, H - 170, [{ text: 'NOT SOMEONE NEW', color: COL.teal, size: 40 }], t, E.new - .05, TITLE - .25);
    title(t, TITLE, 'MADE IN THE SAME STAR');
  }

  window.SCENE = { total: TOTAL, draw };
})();
