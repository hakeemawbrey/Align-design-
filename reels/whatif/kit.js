'use strict';
// Shared engine for the what-if explainers. A story page loads
// build/<id>/timeline.js, this kit, then stories/<id>/scene.js, which sets
// window.SCENE = { total, draw(t) }. Every frame is a pure function of time.

const W = 1920, H = 1080, FPS = 30;
const TL = window.TL;
const E = TL.events, LINES = TL.lines;
const lineStart = i => LINES[i].t0;
const lineEnd = i => LINES[i].t1;

// ---------- maths ----------
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const eio = t => (t = clamp(t), t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eoq = t => 1 - Math.pow(1 - clamp(t), 5);
const eoc = t => 1 - Math.pow(1 - clamp(t), 3);
const eic = t => Math.pow(clamp(t), 3);
const prog = (s, t0, d) => clamp((s - t0) / d);
const win = (s, a, b, fi = .3, fo = .3) => clamp((s - a) / fi) * (1 - clamp((s - b) / fo));
const TAU = Math.PI * 2;
// damped spring step response, damping .42–.5, frequency 12–16
function spring(dt, z = .45, w = 14) {
  if (dt <= 0) return 0;
  const wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * dt) * (Math.cos(wd * dt) + z * w / wd * Math.sin(wd * dt));
}
// a decaying wobble (0 → kick → settles), for squash and stretch
const wobble = (dt, w = 14, z = .45) => dt <= 0 ? 0 : Math.exp(-z * w * dt) * Math.sin(w * Math.sqrt(1 - z * z) * dt);
function rng(seed) {
  let a = seed >>> 0;
  return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const mod = (a, n) => ((a % n) + n) % n;

const fmt = n => Math.round(n).toLocaleString('en-US');

// ---------- camera: moves on easeInOutCubic, zoom interpolated in log space ----------
function camMix(a, b, p) { return { x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), z: Math.exp(lerp(Math.log(a.z), Math.log(b.z), p)) }; }
function makeCamera(cam0, moves) {
  moves = moves.filter(m => isFinite(m.t)).sort((a, b) => a.t - b.t);
  const at = (i, s) => camMix(moves[i].from, moves[i], eio(prog(s, moves[i].t, moves[i].d)));
  for (let i = 0; i < moves.length; i++) moves[i].from = i === 0 ? cam0 : at(i - 1, moves[i].t);
  return s => {
    let c = cam0;
    for (let i = moves.length - 1; i >= 0; i--) if (s >= moves[i].t) { c = at(i, s); break; }
    // nothing ever holds still: a slow drift on top of every shot
    return { x: c.x + 7 * Math.sin(s * .37), y: c.y + 5 * Math.sin(s * .29 + 1), z: c.z * (1 + .012 * Math.sin(s * .23)) };
  };
}
let CAM = { x: 960, y: 540, z: 1 };
const sx = x => (x - CAM.x) * CAM.z + W / 2;
const sy = y => (y - CAM.y) * CAM.z + H / 2;
const sz = r => r * CAM.z;
// a value that eases between keyframes [[t, v], ...]
function track(keys, s, d = .5, ease = eio) {
  let i = 0; while (i + 1 < keys.length && s >= keys[i + 1][0]) i++;
  if (i === 0 && s < keys[0][0]) return keys[0][1];
  const prev = i > 0 ? keys[i - 1][1] : keys[i][1];
  return lerp(prev, keys[i][1], ease((s - keys[i][0]) / d));
}

// ---------- canvases ----------
const out = document.getElementById('c');
const octx = out.getContext('2d');
const scene = document.createElement('canvas'); scene.width = W; scene.height = H;
const ctx = scene.getContext('2d');

// ---------- background: stars and nebulae ----------
const STAR_LAYERS = [.12, .35, .6].map((d, li) => {
  const r = rng(101 + li), P = { x: 2600, y: 1700 };
  const n = [520, 300, 170][li];
  const stars = [];
  for (let i = 0; i < n; i++) stars.push({
    x: r() * P.x, y: r() * P.y, s: [0.7, 1.1, 1.6][li] * (0.6 + r() * .8),
    a: .35 + r() * .55, f: .6 + r() * 2.2, ph: r() * TAU,
    sparkle: li === 2 && r() < .4, hue: r(),
  });
  return { d, P, stars };
});
const NEBULAE = [
  { x: -300, y: 200, r: 1300, c: [24, 150, 160], a: .20 },
  { x: 1500, y: -100, r: 1200, c: [40, 95, 195], a: .16 },
  { x: 900, y: 1100, r: 1100, c: [220, 95, 110], a: .10 },
  { x: 2400, y: 700, r: 1400, c: [60, 70, 175], a: .15 },
  { x: 300, y: 900, r: 1000, c: [24, 150, 160], a: .14 },
];

function drawBackground(t, s, boost) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#081d2c'); g.addColorStop(1, '#102348');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // nebula blobs, deep parallax
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const [i, n] of NEBULAE.entries()) {
    const d = .07, zl = Math.pow(CAM.z, .1);
    const x = W / 2 + (n.x + 60 * Math.sin(t * .05 + i) - CAM.x * d - 500) * zl;
    const y = H / 2 + (n.y + 40 * Math.cos(t * .04 + i * 2) - CAM.y * d - 300) * zl;
    const r = n.r * zl;
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, `rgba(${n.c},${n.a})`); rg.addColorStop(.5, `rgba(${n.c},${n.a * .45})`); rg.addColorStop(1, `rgba(${n.c},0)`);
    ctx.fillStyle = rg; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
  ctx.restore();
  // three star layers
  for (const L of STAR_LAYERS) {
    const zl = Math.max(.3, Math.pow(CAM.z, L.d));
    const Px = L.P.x * zl, Py = L.P.y * zl;
    for (const st of L.stars) {
      const bx = mod((st.x - CAM.x * L.d) * zl + W / 2, Px), by = mod((st.y - CAM.y * L.d) * zl + H / 2, Py);
      const tw = .62 + .38 * Math.sin(t * st.f + st.ph);
      const a = clamp(st.a * tw * (1 + boost));
      const size = st.s * Math.max(.7, Math.pow(zl, .5)) * (1 + boost * .4);
      const col = st.hue < .7 ? '230,244,255' : st.hue < .85 ? '255,226,170' : '170,230,240';
      for (let X = bx - Px; X < W + 20; X += Px) {
        if (X < -20) continue;
        for (let Y = by - Py; Y < H + 20; Y += Py) {
          if (Y < -20) continue;
          if (st.sparkle) sparkle(X, Y, size * 4.2, a, col, t * .3 + st.ph);
          else { ctx.fillStyle = `rgba(${col},${a})`; ctx.beginPath(); ctx.arc(X, Y, size, 0, TAU); ctx.fill(); }
        }
      }
    }
  }
}
function sparkle(x, y, r, a, col, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(rot) * .2);
  ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r * .9);
  g.addColorStop(0, `rgba(${col},${a * .5})`); g.addColorStop(1, `rgba(${col},0)`);
  ctx.fillStyle = g; ctx.fillRect(-r, -r, 2 * r, 2 * r);
  ctx.fillStyle = `rgba(${col},${a})`;
  ctx.beginPath();
  const k = r * .13;
  ctx.moveTo(0, -r); ctx.quadraticCurveTo(k, -k, r, 0); ctx.quadraticCurveTo(k, k, 0, r);
  ctx.quadraticCurveTo(-k, k, -r, 0); ctx.quadraticCurveTo(-k, -k, 0, -r); ctx.fill();
  ctx.restore();
}

// ---------- stars (the Sun look) ----------
const GRAN = (() => { const r = rng(7); return Array.from({ length: 28 }, () => ({ a: r() * TAU, d: Math.sqrt(r()) * .82, s: .05 + r() * .07, v: (r() - .5) * .08, ph: r() * TAU })); })();
const PAL_WARM = { core: ['#fff7dc', '#ffc857', '#ff8f4a'], halo: '255,190,100', ray: '255,215,140', gran: '255,248,215' };
const PAL_RED = { core: ['#ffe3d0', '#ff9a6e', '#e2505f'], halo: '255,120,110', ray: '255,170,150', gran: '255,225,210' };
const PAL_COOL = { core: ['#ffffff', '#e6f7ff', '#8fd8e6'], halo: '150,225,240', ray: '200,240,255', gran: '255,255,255' };
function drawStar(x, y, r, t, pal, glow = 1, rayRot = 0) {
  if (x + r * 2.4 < 0 || x - r * 2.4 > W || y + r * 2.4 < 0 || y - r * 2.4 > H) return;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  // 18 faint rotating ray wedges
  ctx.save(); ctx.translate(x, y); ctx.rotate(t * .025 + rayRot);
  for (let i = 0; i < 18; i++) {
    const a = i / 18 * TAU, w = .055 + .02 * Math.sin(i * 1.7);
    const len = r * (2.2 + .5 * Math.sin(i * 2.3 + t * .2));
    const g = ctx.createRadialGradient(0, 0, r * .9, 0, 0, len);
    g.addColorStop(0, `rgba(${pal.ray},${.05 * glow})`); g.addColorStop(1, `rgba(${pal.ray},0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, len, a - w, a + w); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
  // additive halo rings
  for (const [k, a] of [[2.1, .045], [1.76, .055], [1.48, .07], [1.23, .09]]) {
    ctx.fillStyle = `rgba(${pal.halo},${a * glow})`;
    ctx.beginPath(); ctx.arc(x, y, r * k, 0, TAU); ctx.fill();
  }
  const sg = ctx.createRadialGradient(x, y, r * .9, x, y, r * 3.2);
  sg.addColorStop(0, `rgba(${pal.halo},${.18 * glow})`); sg.addColorStop(1, `rgba(${pal.halo},0)`);
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(x, y, r * 3.2, 0, TAU); ctx.fill();
  ctx.restore();
  // body, offset highlight
  const bg = ctx.createRadialGradient(x - r * .32, y - r * .3, r * .05, x, y, r);
  bg.addColorStop(0, pal.core[0]); bg.addColorStop(.55, pal.core[1]); bg.addColorStop(1, pal.core[2]);
  ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  // 28 drifting glowing granules
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r * .97, 0, TAU); ctx.clip();
  ctx.globalCompositeOperation = 'lighter';
  for (const g of GRAN) {
    const a = g.a + t * g.v, d = g.d + .04 * Math.sin(t * .3 + g.ph);
    const gx = x + Math.cos(a) * d * r, gy = y + Math.sin(a) * d * r, gr = g.s * r * (1 + .25 * Math.sin(t * .7 + g.ph));
    const gg = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
    gg.addColorStop(0, `rgba(${pal.gran},.22)`); gg.addColorStop(1, `rgba(${pal.gran},0)`);
    ctx.fillStyle = gg; ctx.fillRect(gx - gr, gy - gr, gr * 2, gr * 2);
  }
  ctx.restore();
}

// ---------- Earth (WebGL) ----------
const MW = 2048, MH = 1024;
const LAND = {
  na: [[-168, 66], [-162, 70], [-140, 70], [-125, 70], [-110, 73], [-95, 72], [-82, 68], [-78, 62], [-64, 60], [-56, 52], [-66, 45], [-70, 42], [-76, 38], [-81, 31], [-80, 25], [-84, 30], [-90, 29], [-97, 27], [-97, 21], [-92, 18], [-87, 21], [-84, 15], [-80, 9], [-78, 8], [-83, 8], [-90, 14], [-96, 16], [-105, 20], [-110, 24], [-113, 31], [-117, 33], [-121, 36], [-124, 41], [-124, 48], [-130, 55], [-138, 59], [-150, 60], [-158, 58], [-165, 62]],
  gl: [[-50, 60], [-42, 60], [-20, 70], [-18, 77], [-30, 83], [-55, 82], [-70, 78], [-56, 70]],
  sa: [[-80, 8], [-72, 12], [-62, 10], [-50, 0], [-35, -5], [-38, -13], [-40, -22], [-48, -27], [-53, -34], [-58, -38], [-65, -42], [-68, -50], [-72, -54], [-75, -48], [-73, -38], [-71, -30], [-70, -18], [-76, -14], [-81, -5], [-80, 0], [-77, 4]],
  eu: [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [2, 51], [8, 54], [10, 58], [5, 62], [14, 67], [22, 70], [30, 70], [40, 67], [55, 69], [70, 73], [80, 73], [100, 77], [115, 74], [130, 72], [150, 71], [170, 70], [180, 67], [180, 64], [170, 60], [162, 58], [156, 51], [142, 53], [140, 46], [132, 43], [128, 39], [126, 35], [121, 31], [122, 25], [118, 23], [110, 21], [108, 16], [109, 12], [104, 9], [100, 13], [100, 7], [103, 1], [98, 8], [97, 16], [94, 17], [90, 22], [86, 20], [80, 15], [77, 8], [73, 17], [72, 21], [67, 25], [58, 25], [56, 27], [50, 30], [48, 29], [51, 25], [56, 24], [59, 22], [52, 16], [44, 12], [42, 16], [35, 28], [33, 31], [35, 36], [28, 36], [26, 40], [24, 38], [22, 37], [20, 40], [14, 45], [12, 44], [16, 41], [16, 38], [12, 38], [12, 42], [8, 44], [3, 43], [-1, 37], [-6, 36]],
  af: [[-17, 21], [-16, 28], [-10, 30], [-6, 35], [10, 37], [11, 33], [20, 31], [30, 31], [32, 31], [34, 28], [38, 22], [43, 12], [51, 12], [51, 10], [45, 2], [40, -3], [40, -10], [40, -15], [35, -23], [33, -27], [27, -34], [20, -35], [18, -32], [15, -27], [12, -18], [13, -10], [12, -5], [9, -1], [9, 4], [5, 6], [-5, 5], [-8, 4], [-12, 7], [-15, 11], [-17, 15]],
  au: [[114, -22], [114, -30], [116, -35], [123, -34], [130, -32], [135, -35], [138, -35], [141, -38], [146, -39], [150, -37], [153, -31], [153, -25], [150, -22], [146, -19], [145, -15], [142, -11], [141, -14], [136, -12], [132, -11], [129, -15], [125, -14], [122, -18]],
  mg: [[44, -25], [47, -25], [50, -15], [49, -12], [44, -17]],
  uk: [[-5, 50], [1, 51], [0, 53], [-3, 56], [-5, 58], [-6, 56], [-4, 54], [-5, 52]],
  jp: [[130, 31], [135, 34], [140, 36], [142, 40], [141, 45], [140, 42], [136, 36], [131, 34]],
  bo: [[109, 1], [114, 4], [118, 6], [119, 1], [116, -4], [110, -3]],
  su: [[95, 5], [98, 4], [104, -3], [106, -6], [101, -3]],
  ng: [[131, -1], [138, -2], [147, -6], [150, -10], [143, -9], [137, -5], [132, -3]],
  nz: [[172, -35], [178, -38], [175, -41], [168, -46], [166, -45], [172, -41]],
  ic: [[-24, 64], [-18, 63], [-13, 65], [-16, 67], [-22, 66]],
};
const ANT = (() => { const p = [[-180, -90]]; for (let lo = -180; lo <= 180; lo += 10) p.push([lo, -68 + 3 * Math.sin(lo * .07) + 2 * Math.sin(lo * .19)]); p.push([180, -90]); return p; })();
const ll = (lo, la) => [(lo + 180) / 360 * MW, (90 - la) / 180 * MH];
function poly(c, pts) { c.beginPath(); pts.forEach(([lo, la], i) => { const [x, y] = ll(lo, la); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath(); }
function blob(c, lo, la, rx, ry, rot = 0) { const [x, y] = ll(lo, la); c.beginPath(); c.ellipse(x, y, rx / 360 * MW, ry / 180 * MH, rot, 0, TAU); }
function makeMaps() {
  const r = rng(42);
  // land with biomes
  const land = document.createElement('canvas'); land.width = MW; land.height = MH;
  const lc = land.getContext('2d');
  lc.fillStyle = '#5fc47a';
  for (const k in LAND) { poly(lc, LAND[k]); lc.fill(); }
  lc.globalCompositeOperation = 'source-atop';
  for (let i = 0; i < 260; i++) { lc.fillStyle = r() < .5 ? '#48ad6b' : '#6bcd84'; blob(lc, r() * 360 - 180, r() * 140 - 60, 2 + r() * 6, 1.5 + r() * 4, r() * 3); lc.fill(); }
  lc.fillStyle = '#48ad6b';
  for (let lo = -170; lo < 180; lo += 6) { blob(lc, lo, 56 + 5 * Math.sin(lo * .1), 7, 6); lc.fill(); }
  lc.fillStyle = '#3a9d62';
  for (const [lo, la, rx, ry] of [[-62, -5, 14, 9], [20, 0, 9, 6], [112, 0, 13, 6], [-85, 12, 5, 4], [80, 22, 5, 4], [102, 18, 6, 5]]) { blob(lc, lo, la, rx, ry); lc.fill(); }
  lc.fillStyle = '#f5c75f';
  poly(lc, [[-16, 18], [-12, 28], [8, 32], [32, 30], [36, 20], [25, 15], [10, 14], [-5, 15]]); lc.fill();
  poly(lc, [[36, 29], [48, 30], [57, 24], [53, 16], [44, 14], [38, 20]]); lc.fill();
  for (const [lo, la, rx, ry] of [[133, -25, 13, 8], [100, 42, 12, 5], [-112, 33, 6, 5], [21, -23, 6, 5], [60, 40, 8, 5], [-69, -24, 3, 7]]) { blob(lc, lo, la, rx, ry); lc.fill(); }
  lc.fillStyle = '#f1f8ff';
  poly(lc, LAND.gl); lc.fill();
  lc.fillRect(0, 0, MW, (90 - 71) / 180 * MH);
  lc.globalCompositeOperation = 'source-over';
  lc.fillStyle = '#f1f8ff'; poly(lc, ANT); lc.fill();
  // day map
  const day = document.createElement('canvas'); day.width = MW; day.height = MH;
  const dc = day.getContext('2d');
  const og = dc.createLinearGradient(0, 0, 0, MH);
  og.addColorStop(0, '#1a66b8'); og.addColorStop(.32, '#3aa9df'); og.addColorStop(.5, '#4dc7eb'); og.addColorStop(.68, '#3aa9df'); og.addColorStop(1, '#1a66b8');
  dc.fillStyle = og; dc.fillRect(0, 0, MW, MH);
  // a lighter shelf around the coasts
  dc.save(); dc.filter = 'blur(14px)'; dc.globalAlpha = .45; dc.drawImage(land, 0, 0); dc.restore();
  dc.drawImage(land, 0, 0);
  dc.fillStyle = 'rgba(241,248,255,.92)'; dc.fillRect(0, 0, MW, (90 - 82) / 180 * MH);
  // white capsule clouds
  for (let i = 0; i < 120; i++) {
    const lo = r() * 360 - 180, la = (r() - .5) * 120, len = 40 + r() * 170, w = 9 + r() * 16;
    const [x, y] = ll(lo, la);
    dc.fillStyle = `rgba(255,255,255,${.5 + r() * .4})`;
    for (const off of [-MW, 0, MW]) { dc.beginPath(); dc.roundRect(x + off - len / 2, y - w / 2, len, w, w / 2); dc.fill(); }
  }
  // night: r,g = city lights, b = ocean mask
  const night = document.createElement('canvas'); night.width = MW; night.height = MH;
  const nc = night.getContext('2d');
  nc.fillStyle = 'rgb(0,0,255)'; nc.fillRect(0, 0, MW, MH);
  nc.fillStyle = '#000'; for (const k in LAND) { poly(nc, LAND[k]); nc.fill(); } poly(nc, ANT); nc.fill();
  const lpx = lc.getImageData(0, 0, MW, MH).data;
  const okLand = (x, y) => { const i = ((y | 0) * MW + (x | 0)) * 4; return lpx[i + 3] > 200 && !(lpx[i] > 230 && lpx[i + 2] > 230) && !(lpx[i] > 230 && lpx[i + 2] < 120); };
  nc.globalCompositeOperation = 'lighter';
  let placed = 0, guard = 0;
  while (placed < 380 && guard++ < 50000) {
    const cx = r() * MW, cy = (90 - (r() * 105 - 42)) / 180 * MH;
    if (!okLand(cx, cy)) continue;
    const n = 3 + (r() * 6 | 0);
    for (let k = 0; k < n && placed < 380; k++) {
      const x = cx + (r() - .5) * 46, y = cy + (r() - .5) * 30;
      if (!okLand(x, y)) continue;
      const rr = 2 + r() * 4;
      const g = nc.createRadialGradient(x, y, 0, x, y, rr);
      g.addColorStop(0, 'rgba(255,214,0,1)'); g.addColorStop(1, 'rgba(255,214,0,0)');
      nc.fillStyle = g; nc.fillRect(x - rr, y - rr, rr * 2, rr * 2);
      placed++;
    }
  }
  return { day, night };
}

const glc = document.createElement('canvas');
const gl = glc.getContext('webgl', { premultipliedAlpha: true, preserveDrawingBuffer: true, antialias: false });
const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;
const FS = `
precision highp float;
uniform sampler2D uDay, uNight;
uniform vec2 uRes; uniform float uR, uRot, uTilt, uBright, uMode, uFrost;
uniform vec3 uL;
const float PI = 3.14159265;
vec3 banded(float lat, float lon){
  float b = sin(lat*13. + sin(lon*3.+lat*6.)*.35)*.5+.5;
  vec3 c = mix(vec3(.96,.78,.37), vec3(1.,.56,.29), b);
  c = mix(c, vec3(.98,.93,.82), smoothstep(.75,.95, sin(lat*29.+1.)*.5+.5)*.6);
  return c;
}
float hsh(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)))*43758.5453); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hsh(i),hsh(i+vec2(1,0)),f.x), mix(hsh(i+vec2(0,1)),hsh(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ return vn(p)*.5 + vn(p*2.1)*.27 + vn(p*4.3)*.15 + vn(p*8.7)*.08; }
vec3 mars(float lat, float lon){
  vec2 q = vec2(lon*2.2, lat*3.);
  float n = fbm(q*1.6 + 3.);
  vec3 c = mix(vec3(.93,.45,.27), vec3(.66,.27,.18), smoothstep(.42,.68,n));
  c = mix(c, vec3(1.,.7,.47), smoothstep(.72,.9,fbm(q*3.+9.))*.5);
  return mix(c, vec3(.98,.95,.93), smoothstep(1.2,1.34,abs(lat)));
}
vec3 moon(float lat, float lon){
  vec2 q = vec2(lon*2.4, lat*3.);
  float n = fbm(q*1.3 + 7.);
  vec3 c = mix(vec3(.86,.87,.92), vec3(.6,.62,.72), smoothstep(.45,.7,n));
  float cr = smoothstep(.82,.9, vn(q*5.+2.)); c *= 1. - cr*.18;
  return c;
}
vec4 shade(vec2 p){
  float r2 = dot(p,p);
  if (r2 > 1.) {
    float r = sqrt(r2);
    float h = smoothstep(1.18, 1., r);
    float lit = clamp(dot(vec3(p/r, 0.), uL)*.6 + .45, 0., 1.);
    float a = pow(h, 2.4) * (.12 + .7*lit) * (uMode > .5 ? .5 : 1.);
    vec3 hc = uMode < .5 ? vec3(.42,.84,1.) : uMode < 1.5 ? vec3(1.,.8,.55) : uMode < 2.5 ? vec3(1.,.55,.4) : vec3(.75,.8,.95);
    return vec4(hc*a, a);
  }
  vec3 n = vec3(p, sqrt(1. - r2));
  float ct = cos(uTilt), st = sin(uTilt);
  vec3 b = vec3(ct*n.x + st*n.y, -st*n.x + ct*n.y, n.z);
  float lon = atan(b.x, b.z) + uRot;
  float lat = asin(clamp(b.y, -1., 1.));
  vec2 uv = vec2(fract(lon/(2.*PI) + .5), .5 - lat/PI);
  float nl = dot(n, uL);
  float d = smoothstep(-.12, .24, nl);
  vec3 day, cities = vec3(0.); float ocean = 0.;
  if (uMode < .5) {
    day = texture2D(uDay, uv).rgb;
    vec3 nt = texture2D(uNight, uv).rgb;
    cities = vec3(nt.r, nt.g*.78, nt.g*.32);
    ocean = nt.b;
  } else day = uMode < 1.5 ? banded(lat, lon) : uMode < 2.5 ? mars(lat, lon) : moon(lat, lon);
  vec3 nightc = vec3(.04,.07,.19) + day*.05;
  vec3 c = mix(nightc + cities*1.35*(1.-d), day*(.9 + .4*uBright), d);
  float band = exp(-pow((nl - .04)/.085, 2.));
  c = mix(c, vec3(1., .5, .43), band*.38);
  vec3 hv = normalize(uL + vec3(0.,0.,1.));
  c += vec3(1.,.96,.86) * pow(max(dot(n, hv), 0.), 46.) * ocean * d * .55;
  float rim = pow(1. - n.z, 2.6);
  c += (uMode < .5 ? vec3(.33,.86,1.) : vec3(1.,.85,.6)) * rim * (.18 + .55*d);
  return vec4(c, 1.);
}
void main(){
  vec2 px = gl_FragCoord.xy;
  vec4 acc = vec4(0.);
  vec2 o[4]; o[0]=vec2(.125,.375); o[1]=vec2(.375,-.125); o[2]=vec2(-.125,-.375); o[3]=vec2(-.375,.125);
  for (int i = 0; i < 4; i++) acc += shade((px + o[i] - uRes*.5) / uR);
  gl_FragColor = acc * .25;
}`;
function mkShader(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
const prg = gl.createProgram();
gl.attachShader(prg, mkShader(gl.VERTEX_SHADER, VS)); gl.attachShader(prg, mkShader(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prg);
gl.useProgram(prg);
const vb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vb);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
const pl = gl.getAttribLocation(prg, 'p'); gl.enableVertexAttribArray(pl); gl.vertexAttribPointer(pl, 2, gl.FLOAT, false, 0, 0);
const U = n => gl.getUniformLocation(prg, n);
function tex(unit, img) {
  const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}
const MAPS = makeMaps();
tex(0, MAPS.day); tex(1, MAPS.night);
gl.uniform1i(U('uDay'), 0); gl.uniform1i(U('uNight'), 1);

// draw a sphere centred at screen (x, y) with screen radius r, lit from screen point (lx, ly)
function drawSphere(x, y, r, lx, ly, opt) {
  if (r < .5 || x + r * 1.2 < 0 || x - r * 1.2 > W || y + r * 1.2 < 0 || y - r * 1.2 > H) return;
  // the canvas is at least 2 × radius × 1.18 or the sphere clips flat in close-ups
  const S = Math.ceil(2 * r * 1.18) + 4;
  if (glc.width !== S) { glc.width = S; glc.height = S; }
  gl.viewport(0, 0, S, S);
  gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
  const dx = lx - x, dy = -(ly - y), dl = Math.hypot(dx, dy) || 1;
  const L = [dx / dl, dy / dl, .42]; const ln = Math.hypot(...L);
  gl.uniform2f(U('uRes'), S, S); gl.uniform1f(U('uR'), r);
  gl.uniform1f(U('uRot'), opt.rot); gl.uniform1f(U('uTilt'), opt.tilt);
  gl.uniform1f(U('uBright'), opt.bright || 0); gl.uniform1f(U('uMode'), opt.mode || 0);
  gl.uniform3f(U('uL'), L[0] / ln, L[1] / ln, L[2] / ln);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  ctx.drawImage(glc, x - S / 2, y - S / 2);
}


// ---------- type ----------
const FONT = (w, s) => `${w} ${s}px Fredoka`;
const COL = { teal: '#8fd8e6', gold: '#ffd98a', white: '#ffffff', coral: '#ff8f8f' };
// a line of text that rises 1.3× its own height through a clip, ease-out-quint
function riseText(text, x, y, size, color, s, t0, t1 = 1e9, o = {}) {
  const p = eoq((s - t0) / (o.dur || .6));
  if (p <= 0) return;
  const q = eic((s - t1) / .32);
  if (q >= 1) return;
  ctx.save();
  ctx.font = FONT(o.weight || 700, size);
  ctx.letterSpacing = (o.spacing ?? 5) + 'px';
  ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle';
  const h = size * 1.3;
  const tw = ctx.measureText(text).width + 40;
  const lx = o.align === 'left' ? x - 10 : x - tw / 2;
  ctx.beginPath(); ctx.rect(lx, y - h / 2, tw, h); ctx.clip();
  const off = (1 - p) * h - q * h;
  ctx.fillStyle = color;
  if (o.glow) { ctx.shadowColor = o.glow; ctx.shadowBlur = o.glowBlur || 24; }
  ctx.fillText(text, x + (o.align === 'left' ? 0 : (o.spacing ?? 5) / 2), y + off + size * .04);
  ctx.restore();
}
function measure(text, size, weight = 700, spacing = 5) {
  ctx.save(); ctx.font = FONT(weight, size); ctx.letterSpacing = spacing + 'px';
  const w = ctx.measureText(text).width; ctx.restore(); return w;
}
// rounded pill of rgb(6,20,40) at 62% that pops on a spring, with rising lines
function caption(x, y, lines, s, t0, t1 = 1e9, o = {}) {
  if (s < t0 || s > t1 + .8) return;
  const pad = o.pad || 28, gap = o.gap || 10;
  const sizes = lines.map(l => l.size || 40);
  const w = Math.max(...lines.map((l, i) => l.w || measure(l.text, sizes[i], 700, l.spacing ?? 5))) + pad * 2;
  const h = sizes.reduce((a, b) => a + b * 1.25, 0) + gap * (lines.length - 1) + pad * 1.15;
  const pop = spring(s - t0, .45, 14) * (1 - eic((s - t1 - .12) / .35));
  if (pop <= 0.001) return;
  ctx.save();
  ctx.translate(x, y); ctx.scale(lerp(.55, 1, pop), pop);
  ctx.fillStyle = 'rgba(6,20,40,.62)';
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, Math.min(h / 2, 34)); ctx.fill();
  ctx.restore();
  let yy = y - h / 2 + pad * .58;
  lines.forEach((l, i) => {
    const lh = sizes[i] * 1.25;
    riseText(l.text, x, yy + lh / 2, sizes[i], l.color || COL.white, s, t0 + .08 + i * .09, t1 - (lines.length - 1 - i) * .05, { spacing: l.spacing ?? 5 });
    yy += lh + gap;
  });
}


// ---------- the astronaut mascot ----------
function rr(x, y, w, h, r, fill) { ctx.fillStyle = fill; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); }
const POSES = {
  idle: [.35, -.35], wow: [2.5, -2.5], cool: [.75, -2.75], shield: [2.0, -.5],
  wave: [.35, -2.6], droop: [.08, -.08], watch: [.35, -1.9], hug: [1.55, -1.55], point: [.35, -1.45],
};
// pose keys [[t, 'name'], ...]; each change springs into place
function poseAt(keys, s) {
  let prev = POSES.idle, cur = POSES.idle, tk = -10;
  for (const [t, p] of keys) if (s >= t) { prev = cur; cur = POSES[p]; tk = t; }
  const k = spring(s - tk, .45, 13);
  return [lerp(prev[0], cur[0], k), lerp(prev[1], cur[1], k)];
}
const squashAt = (times, s) => times.reduce((a, e) => a + .13 * wobble(s - e, 13, .42), 0);
// eye keys [[t, () => [wx, wy]], ...], eased between
function eyesAt(keys, s) {
  let a = keys[0], b = keys[0];
  for (const k of keys) if (s >= k[0]) { a = b; b = k; }
  const pa = a[1](), pb = b[1](), p = eio((s - b[0]) / .35);
  return [lerp(pa[0], pb[0], p), lerp(pa[1], pb[1], p)];
}
// o: { x, y, scale, arms:[l,r], sq, eye:[wx,wy], shades (seconds since they dropped, or -1), wave (0..1 arm wiggle), tint }
function drawAstronaut(t, o) {
  const k = CAM.z * .74 * (o.scale || 1);
  const bob = 7 * Math.sin(t * 1.55);
  const X = sx(o.x), Y = sy(o.y) + bob * CAM.z * (o.scale || 1);
  if (X < -400 || X > W + 400 || Y < -500 || Y > H + 500 || k < .02) return;
  const sq = o.sq || 0;
  let [la, ra] = o.arms || POSES.idle;
  if (o.wave) ra += Math.sin(t * 14) * .45 * o.wave;
  const hx = X, hy = Y - 92 * k;
  let ex = 0, ey = 0;
  if (o.eye) { ex = sx(o.eye[0]) - hx; ey = sy(o.eye[1]) - hy; const el = Math.hypot(ex, ey) || 1; if (el < 30) { ex = 0; ey = 0; } else { ex /= el; ey /= el; } }
  if (o.lookDown) { ex = lerp(ex, 0, o.lookDown); ey = lerp(ey, 1, o.lookDown); }
  const accent = o.tint || '#ff8f4a';
  ctx.save();
  ctx.translate(X, Y + 66 * k);
  ctx.rotate(.05 * Math.sin(t * 1.1) + (o.tilt || 0));
  ctx.scale(k * (1 - sq * .55), k * (1 + sq));
  ctx.translate(0, -66);
  const ag = ctx.createRadialGradient(0, -50, 10, 0, -50, 190);
  ag.addColorStop(0, 'rgba(143,216,230,.10)'); ag.addColorStop(1, 'rgba(143,216,230,0)');
  ctx.fillStyle = ag; ctx.fillRect(-200, -250, 400, 400);
  rr(-46, -60, 92, 74, 20, '#c3cfdc');
  const arm = (side, ang) => {
    ctx.save(); ctx.translate(side * 33, -44); ctx.rotate(ang);
    rr(-11, -6, 22, 52, 11, '#e7eef6'); rr(-13, 38, 26, 22, 11, '#ffffff');
    ctx.restore();
  };
  arm(-1, la); arm(1, ra);
  rr(-24, 16, 22, 40, 10, '#e7eef6'); rr(3, 16, 22, 40, 10, '#e7eef6');
  rr(-28, 48, 28, 18, 9, accent); rr(1, 48, 28, 18, 9, accent);
  const bg = ctx.createLinearGradient(-36, 0, 36, 0); bg.addColorStop(0, '#ffffff'); bg.addColorStop(1, '#dbe4ee');
  rr(-36, -58, 72, 82, 26, bg);
  rr(-18, -38, 36, 22, 7, '#1f5a73');
  ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(-7, -27, 4.5, 0, TAU); ctx.fill();
  ctx.fillStyle = '#8fd8e6'; ctx.beginPath(); ctx.arc(7, -27, 4.5, 0, TAU); ctx.fill();
  rr(-36, 6, 72, 9, 4, '#e3eaf2');
  if (o.watch) { ctx.save(); ctx.translate(33, -44); ctx.rotate(ra); rr(-12, 26, 24, 12, 5, '#1f5a73'); ctx.restore(); }
  rr(19, -170, 6, 34, 3, '#c3cfdc');
  const blink = .5 + .5 * Math.sin(t * 4.2);
  ctx.save(); ctx.shadowColor = 'rgba(255,143,74,.9)'; ctx.shadowBlur = 26 * blink;
  ctx.fillStyle = `rgb(255,${lerp(150, 200, blink) | 0},${lerp(90, 140, blink) | 0})`;
  ctx.beginPath(); ctx.arc(22, -172, 8, 0, TAU); ctx.fill(); ctx.restore();
  const hg = ctx.createLinearGradient(-56, -150, 56, -40); hg.addColorStop(0, '#ffffff'); hg.addColorStop(1, '#dde6ef');
  rr(-57, -146, 114, 98, 44, hg);
  const vg = ctx.createLinearGradient(0, -130, 0, -64); vg.addColorStop(0, '#1f5a73'); vg.addColorStop(1, '#0a1c2c');
  rr(-43, -131, 86, 66, 31, vg);
  ctx.save(); ctx.globalAlpha = .16; rr(-34, -124, 34, 14, 7, '#ffffff'); ctx.restore();
  const bl = (t % 3.4) < .13 ? .12 : 1;
  const happy = o.happy || 0;
  ctx.save(); ctx.shadowColor = 'rgba(120,240,255,.95)'; ctx.shadowBlur = 18;
  for (const side of [-1, 1]) {
    const h = 20 * bl * (1 - .55 * happy);
    rr(side * 14 - 6 + ex * 9, -100 - h / 2 + ey * 7 - 6 * happy, 12, h, 6, '#9ff6ff');
  }
  ctx.restore();
  if (o.shades >= 0) {
    const dy = -190 * (1 - spring(o.shades, .42, 13));
    ctx.save(); ctx.translate(ex * 4, dy);
    rr(-40, -110, 36, 22, 9, '#0b0f1a'); rr(4, -110, 36, 22, 9, '#0b0f1a'); rr(-6, -104, 12, 5, 2, '#0b0f1a');
    ctx.globalAlpha = .3; rr(-34, -106, 14, 5, 2.5, '#ffffff'); rr(10, -106, 14, 5, 2.5, '#ffffff');
    ctx.restore();
  }
  if (o.prop) o.prop(ctx);
  ctx.restore();
}

// ---------- small things ----------
// a map pin that drops on a spring; label inside
function drawPin(x, y, d, label, k = 1, cols = ['#ff9a8a', '#dc5f6e']) {
  if (d <= 0 || k <= 0) return;
  const drop = -260 * (1 - spring(d, .45, 14));
  const sq = .18 * wobble(d - .12, 14, .45);
  ctx.save(); ctx.translate(x, y + drop); ctx.scale(k * (1 + sq * .6), k * (1 - sq));
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(0, 4, 18, 6, 0, 0, TAU); ctx.fill();
  const g = ctx.createLinearGradient(0, -130, 0, 0); g.addColorStop(0, cols[0]); g.addColorStop(1, cols[1]);
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-18, -32, -60, -58, -60, -94); ctx.arc(0, -94, 60, Math.PI, 0); ctx.bezierCurveTo(60, -58, 18, -32, 0, 0); ctx.fill();
  ctx.font = FONT(700, label.length > 3 ? 28 : 34); ctx.letterSpacing = '3px'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff';
  ctx.fillText(label, 2, -92);
  ctx.restore();
}
// a glowing photon at (x, y) with a tail pointing back along (dx, dy)
function photon(x, y, a = 1, dx = -1, dy = 0, col = '255,217,138', len = 320) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(x, y, 0, x, y, 60);
  g.addColorStop(0, `rgba(255,255,240,${a})`); g.addColorStop(.25, `rgba(${col},${.6 * a})`); g.addColorStop(1, `rgba(${col},0)`);
  ctx.fillStyle = g; ctx.fillRect(x - 60, y - 60, 120, 120);
  const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
  ctx.translate(x, y); ctx.rotate(Math.atan2(dy, dx));
  const tg = ctx.createLinearGradient(0, 0, len, 0);
  tg.addColorStop(0, `rgba(${col},${.7 * a})`); tg.addColorStop(1, `rgba(${col},0)`);
  ctx.fillStyle = tg; ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(len, -1); ctx.lineTo(len, 1); ctx.lineTo(0, 7); ctx.fill();
  ctx.restore();
}
function ringGlow(x, y, r, a, width, col = '255,217,138') {
  if (a <= 0 || r <= 0) return;
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const [w, al] of [[width * 4, .12], [width * 2, .25], [width, .9]]) {
    ctx.strokeStyle = `rgba(${col},${a * al})`; ctx.lineWidth = w;
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
  }
  ctx.restore();
}
function glow(x, y, r, col, a) {
  if (a <= 0 || r <= 0) return;
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(.35, `rgba(${col},${a * .35})`); g.addColorStop(1, `rgba(${col},0)`);
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore();
}
// the white flash and shockwave of a star dying (or a beat landing)
function flash(dt, a = .95, d = .55) { if (dt > 0 && dt < d) { ctx.fillStyle = `rgba(255,255,255,${a * (1 - eoc(dt / d))})`; ctx.fillRect(0, 0, W, H); } }
function shockwave(x, y, r0, dt, col = '200,245,255') {
  if (dt <= 0 || dt > 1.1) return;
  const p = eoc(dt / 1.05);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = `rgba(${col},${.85 * (1 - p)})`; ctx.lineWidth = lerp(46, 3, p);
  ctx.beginPath(); ctx.arc(x, y, r0 + p * 1500, 0, TAU); ctx.stroke(); ctx.restore();
}
// swell 6% for .22 s, collapse in .33 s, then (dying) to nothing or (living) spring back
function swellCollapse(d, dies) {
  if (d < 0) return 1;
  if (d < .22) return 1 + .06 * eoc(d / .22);
  if (d < .55) return lerp(1.06, dies ? .04 : .9, eic((d - .22) / .33));
  return dies ? 0 : lerp(.9, 1, spring(d - .55, .45, 14));
}
// a field of many tiny drifting stars, for "millions"
const FIELD = (() => { const r = rng(5), n = 16000, a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { a[i * 3] = (r() - .5) * 26000; a[i * 3 + 1] = (r() - .5) * 15000; a[i * 3 + 2] = r(); } return a; })();
function drawField(cx, cy, a, t, drift = 0) {
  if (a <= 0) return;
  ctx.fillStyle = `rgba(215,235,255,${.55 * a})`;
  for (let i = 0; i < FIELD.length; i += 3) {
    const X = sx(cx + FIELD[i] + drift * 300 * Math.sin(i * .7) * t * .02), Y = sy(cy + FIELD[i + 1] + drift * 200 * Math.cos(i) * t * .02);
    if (X < 0 || X > W || Y < 0 || Y > H) continue;
    const tw = .5 + .5 * Math.sin(t * (1 + FIELD[i + 2] * 2) + i);
    const s2 = 1 + FIELD[i + 2] * 1.6 * tw;
    ctx.fillRect(X, Y, s2, s2);
  }
}
function vignette() {
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * .38, W / 2, H / 2, H * 1.05);
  vg.addColorStop(0, 'rgba(4,4,20,0)'); vg.addColorStop(1, 'rgba(4,4,20,.45)');
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
}
function rewindBadge(p) {
  const g = Math.sin(Math.PI * clamp(p * 1.4));
  if (g <= 0) return;
  ctx.save(); ctx.translate(W / 2, H - 140); ctx.scale(g, g);
  rr(-90, -46, 180, 92, 46, 'rgba(6,20,40,.62)');
  ctx.fillStyle = '#ffd98a';
  for (const o of [-34, 6]) { ctx.beginPath(); ctx.moveTo(o + 30, -24); ctx.lineTo(o - 8, 0); ctx.lineTo(o + 30, 24); ctx.closePath(); ctx.fill(); }
  ctx.restore();
}
function title(t, t0, sub, main = 'ALIGN') {
  const td = t - t0;
  if (td <= -0.2) return;
  ctx.save(); ctx.fillStyle = `rgba(4,8,22,${.42 * eoc(prog(t, t0 - .2, .6))})`; ctx.fillRect(0, 0, W, H); ctx.restore();
  const grow = 1 + .035 * eoc(prog(t, t0, 3.2));
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(grow, grow); ctx.translate(-W / 2, -H / 2);
  if (sub) riseText(sub, W / 2, H / 2 - 150, 52, COL.teal, t, t0 - .05, 1e9, { spacing: 6 });
  riseText(main, W / 2, H / 2 + 30, 270, '#ffffff', t, t0 + .08, 1e9, { spacing: 36, dur: .8, glow: 'rgba(255,217,138,.45)', glowBlur: 50 });
  ctx.restore();
}

// ---------- grain ----------
const GRAIN = Array.from({ length: 24 }, (_, i) => {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d'), im = g.createImageData(256, 256), r = rng(900 + i);
  for (let k = 0; k < im.data.length; k += 4) { const v = 128 + (r() - .5) * 2 * 7.7; im.data[k] = im.data[k + 1] = im.data[k + 2] = v; im.data[k + 3] = 255; }
  g.putImageData(im, 0, 0); return c;
});
function grain(t) {
  const c = GRAIN[Math.floor(t * 24) % 24];
  const pat = octx.createPattern(c, 'repeat');
  octx.save(); octx.globalCompositeOperation = 'overlay'; octx.fillStyle = pat;
  const r = rng(Math.floor(t * 24) + 1); octx.translate(-r() * 256, -r() * 256);
  octx.fillRect(0, 0, W + 256, H + 256); octx.restore();
}

// ---------- public API ----------
// draw frame t; blend 2 subframes (shutter .6) for motion blur
window.FPS = FPS;
window.seek = (t, blur = true) => {
  const S = window.SCENE;
  if (blur) {
    const off = .6 / FPS * .25;
    S.draw(Math.max(0, t - off)); vignette(); octx.globalAlpha = 1; octx.drawImage(scene, 0, 0);
    S.draw(t + off); vignette(); octx.globalAlpha = .5; octx.drawImage(scene, 0, 0); octx.globalAlpha = 1;
  } else { S.draw(t); vignette(); octx.drawImage(scene, 0, 0); }
  grain(t);
};
window.ready = document.fonts.load(FONT(700, 80)).then(() => document.fonts.load(FONT(600, 80))).then(() => { window.TOTAL = window.SCENE.total; window.seek(0); return true; });
