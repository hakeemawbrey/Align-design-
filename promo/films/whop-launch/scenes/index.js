// whop-launch · "Space City Launch": Align Houston Beta, product-page film (16:9, or 9:16 with &v). 124 bpm, every beat lands something.
//   b0–b7    "The stars / have aligned / in Space City." slam in on the beat; the pixel Houston skyline pops up and glows
//   b8–b11   mission control: T-MINUS 3 · 2 · 1, pixel ring bursts, the skyline's windows all light, the camera tilts up
//   b12–b19  LAUNCH (drop): six mystery cards rocket up one per beat with motion streaks + pixel-star exhaust and slam into a fan
//            "Every night, / a new deck." → "No photos. / Just stars."
//   b20–b27  speed ramp: whip → Juniper's mystery card in slow motion (half-time beat) "Card first. / Face last." → spins up fast
//   b28–b35  docking: her card and yours collide → flash → Juniper's founders card, photo open, "Both align. / Then you see them."
//   b36–b43  talk cards fire in from both sides, one per beat: "Then you talk / in cards." → they get sucked into the centre
//   b44–end  boom: the Align mark draws, "Align", HOUSTON BETA, "Dating, dealt by the stars.", skyline back, fade
import { clamp, lerp, prog, ease, rng, el } from '../../../src/lib.js'
import { W, H, VERT, A, SERIF, MONO, fill, spaceBackdrop } from '../../../src/scenes/common.js'

// ── beat grid
export const BPM = 124
export const BEAT = 60 / BPM
const OFF = 0.3
export const b = (n) => OFF + n * BEAT
export const DURATION = Math.round((b(52) + 0.1) * 100) / 100

const BONE = '#efe6d6'
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const SPARKS = ['#f2c75c', '#fff4cf', '#ffbdf6', '#c9b6f0', '#efe6d6']
const EXHAUST = ['#fff4cf', '#f2c75c', '#ff7a2e', '#ffbdf6', '#ffd23f', '#b45cff']
const U = Math.min(W, H) / 1080

// whip cuts between shots: outgoing flies in `d`, incoming arrives from the opposite side
const CUT = { c1: { t: b(7.6), d: [0, -1] }, c2: { t: b(19.75), d: [-1, 0] }, c3: { t: b(27.1), d: [-1, 0] }, c4: { t: b(35.6), d: [0, -1] } }
const WHIP = 0.18

// ── card geometry (body box inside the glow padding of each PNG)
const PROF = (n) => ({ src: `card-profile-${n}.png`, iw: 1496, ih: 2237, b: [121, 114, 1374, 2115], r: 0.067 })
const TALK = (n) => ({ src: `card-talk-${n}.png`, iw: 744, ih: 1194, b: [60, 60, 684, 1134], r: 0.075 })
const G = {
  back: { src: 'card-back.png', iw: 1528, ih: 2347, b: [120, 119, 1440, 2227], r: 0.067 },
  founder: { src: 'card-founder-juniper.png', iw: 2992, ih: 4466, b: [240, 218, 2748, 4223], r: 0.075 },
}
const bodyH = (g, w) => w * (g.b[3] - g.b[1]) / (g.b[2] - g.b[0])

function face(parent, g, w, style = {}) {
  const bw = g.b[2] - g.b[0], k = w / bw, h = bodyH(g, w)
  const f = el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', borderRadius: g.r * w + 'px', overflow: 'hidden', ...style }, parent)
  const i = el('img', { position: 'absolute', display: 'block', left: -g.b[0] * k + 'px', top: -g.b[1] * k + 'px', width: g.iw * k + 'px', height: g.ih * k + 'px' }, f)
  i.src = A + g.src; i.decoding = 'sync'
  const glint = el('div', { position: 'absolute', top: '-30%', height: '160%', width: (w * 0.32) + 'px', left: 0, mixBlendMode: 'screen', opacity: 0,
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,246,232,0.10) 30%, rgba(255,250,240,0.55) 50%, rgba(255,246,232,0.10) 70%, rgba(255,255,255,0) 100%)' }, f)
  return { face: f, glint, w, h }
}
const sweep = (gl, w, p) => { gl.style.opacity = p > 0 && p < 1 ? String(Math.sin(Math.PI * p)) : '0'; gl.style.transform = `translateX(${lerp(-w * 0.5, w * 1.2, p)}px) skewX(-18deg)` }
const glowCss = (c, w) => `0 0 ${w * 0.14}px ${w * 0.02}px ${c}66, 0 ${w * 0.1}px ${w * 0.22}px rgba(4,2,14,0.6)`

/** a flat card that can fly: a motion streak (sibling, behind) + the card box */
function flyCard(parent, g, w, glow) {
  const h = bodyH(g, w)
  const streak = el('div', { position: 'absolute', left: 0, top: 0, width: w * 0.7 + 'px', height: '10px', transformOrigin: '50% 0', borderRadius: w * 0.35 + 'px', opacity: 0, filter: `blur(${10 * U}px)`,
    background: `linear-gradient(180deg, rgba(255,244,207,0.9), ${glow}aa 30%, rgba(180,92,255,0.25) 70%, rgba(180,92,255,0))` }, parent)
  const box = el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', willChange: 'transform', display: 'none' }, parent)
  el('div', { position: 'absolute', inset: 0, borderRadius: g.r * w + 'px', boxShadow: glowCss(glow, w) }, box)
  const f = face(box, g, w)
  return { box, streak, w, h, ...f }
}
function placeCard(c, x, y, r = 0, s = 1, extra = '') {
  c.box.style.display = 'block'
  c.box.style.transform = `translate(${x - c.w / 2}px, ${y - c.h / 2}px) ${extra} rotate(${r}deg) scale(${s})`
}

/** a launch path: arrives at (x1, y1) exactly at t1, with a sideways arc */
function flight(t0, t1, x0, y0, x1, y1, r0, r1, arc = 0, e = ease.outCubic) {
  const pos = (t) => {
    const p = clamp((t - t0) / (t1 - t0)), q = e(p)
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1
    const a = Math.sin(Math.PI * q) * arc
    return { x: lerp(x0, x1, q) - dy / L * a, y: lerp(y0, y1, q) + dx / L * a, r: lerp(r0, r1, q), p }
  }
  return { t0, t1, pos }
}
/** fly a card along a flight: streak follows the velocity */
function flyUpdate(c, f, t, s = 1) {
  const k = f.pos(t), k2 = f.pos(t - 1 / 60)
  placeCard(c, k.x, k.y, k.r, s)
  const vx = (k.x - k2.x) * 60, vy = (k.y - k2.y) * 60, v = Math.hypot(vx, vy)
  const len = clamp(v / 5000) * c.h * 1.6
  if (k.p > 0 && k.p < 1 && len > 8) {
    c.streak.style.opacity = String(clamp(v / 2500))
    c.streak.style.height = len + 'px'
    c.streak.style.transform = `translate(${k.x - c.w * 0.35}px, ${k.y}px) rotate(${Math.atan2(vx, -vy) * 180 / Math.PI}deg)`
  } else c.streak.style.opacity = '0'
  return k
}

// ── pixel art (same sprites as the whop film; 15fps stepped)
const PIX = 6
const COLS = Math.ceil(W / PIX), ROWS = Math.ceil(H / PIX)
const SPR = [
  ['X'], ['.X.', 'XWX', '.X.'], ['..X..', '..X..', 'XXWXX', '..X..', '..X..'],
  ['...X...', '...X...', '..XWX..', 'XXWWWXX', '..XWX..', '...X...', '...X...'],
  ['....X....', '....X....', '...XWX...', '..X.W.X..', 'XXWWWWWXX', '..X.W.X..', '...XWX...', '....X....', '....X....'],
].map((rows) => rows.map((r) => [...r]))
function pstar(ctx, x, y, size, color) {
  if (size < 0) return
  const s = SPR[Math.max(0, Math.min(SPR.length - 1, size))], o = (s.length - 1) / 2, cx = Math.round(x), cy = Math.round(y)
  for (let r = 0; r < s.length; r++) for (let c = 0; c < s[r].length; c++) { const ch = s[r][c]; if (ch === '.') continue; ctx.fillStyle = ch === 'W' ? '#ffffff' : color; ctx.fillRect(cx + c - o, cy + r - o, 1, 1) }
}
function pring(ctx, x, y, rad, color) {
  const n = Math.max(12, Math.round(rad * 2.2)); ctx.fillStyle = color
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; ctx.fillRect(Math.round(x + Math.cos(a) * rad), Math.round(y + Math.sin(a) * rad * 0.86), 1, 1) }
}
const F15 = (t) => Math.floor(t * 15)
/** ring burst + debris at screen (x, y), born at tb */
function burst(ctx, t, tb, x, y, k = 1, seed = 1, colors = CHAKRAS, life = 1.1) {
  const a = t - tb
  if (a < 0 || a > life) return
  const tt = F15(a) / 15, f = F15(t), cx = x / PIX, cy = y / PIX
  if (tt < 0.5) { pring(ctx, cx, cy, (5 + tt * 150) * k, tt < 0.2 ? '#fff4cf' : '#f2c75c'); if (tt > 0.07) pring(ctx, cx, cy, (3 + (tt - 0.07) * 110) * k, '#ffbdf6') }
  const r = rng(seed)
  for (let i = 0; i < 22; i++) {
    const ang = r() * Math.PI * 2, v = (35 + r() * 70) * k, l = (0.5 + r() * 0.6) * life, c = r() < 0.3 ? '#fff4cf' : colors[i % colors.length]
    const lf = 1 - tt / l
    if (lf <= 0 || (lf < 0.3 && f % 2)) continue
    pstar(ctx, cx + Math.cos(ang) * v * tt, cy + Math.sin(ang) * v * tt + 20 * tt * tt * k, lf > 0.7 ? 2 : lf > 0.4 ? 1 : 0, c)
  }
}
/** pixel-star exhaust left along a flight */
function trail(ctx, t, f, seed) {
  if (t < f.t0 || t > f.t1 + 0.5) return
  const r = rng(seed), fr = F15(t)
  for (let k = 1; k <= 18; k++) {
    const s = t - k * 0.024, j = (r() - 0.5) * 5, jy = (r() - 0.5) * 5, c = EXHAUST[Math.floor(r() * EXHAUST.length)]
    if (s < f.t0 || s > f.t1) continue
    const age = t - s, q = f.pos(s)
    if (age > 0.5 || (age > 0.3 && (fr + k) % 2)) continue
    pstar(ctx, q.x / PIX + j, q.y / PIX + jy, age < 0.07 ? 3 : age < 0.18 ? 2 : age < 0.32 ? 1 : 0, c)
  }
}
function twinkleField(ctx, t, t0, t1, box, seed, n = 14) {
  if (t < t0 || t > t1) return
  const r = rng(seed), f = F15(t)
  for (let i = 0; i < n; i++) {
    const x = (box[0] + r() * box[2]) / PIX, y = (box[1] + r() * box[3]) / PIX, c = SPARKS[Math.floor(r() * 5)], ph = Math.floor(r() * 6), at = t0 + r() * Math.max(0.1, t1 - t0 - 0.6)
    if (t < at || t > at + 1.4) continue
    pstar(ctx, x, y, [0, 1, 2, 3, 2, 1][(f + ph) % 6], c)
  }
}

// ── the pixel Houston skyline (procedural; a few landmark-ish silhouettes near the middle)
const SKY = (() => {
  const maxH = Math.round(ROWS * (VERT ? 0.19 : 0.26)), r = rng(77)
  const hts = new Array(COLS).fill(0), bid = new Array(COLS).fill(0)
  let x = 0, id = 1
  while (x < COLS) {
    const w = 4 + Math.floor(r() * 7), cn = (x + w / 2) / COLS, env = 0.3 + 0.7 * Math.exp(-(((cn - 0.5) / 0.3) ** 2))
    const h = Math.round(maxH * (0.15 + 0.45 * r()) * env + 3)
    for (let i = x; i < Math.min(COLS, x + w); i++) { hts[i] = h; bid[i] = id }
    x += w + (r() < 0.2 ? 1 : 0); id++
  }
  const put = (c0, prof) => { prof.forEach((f, i) => { const c = c0 + i; if (c >= 0 && c < COLS) { hts[c] = Math.round(f * maxH); bid[c] = id } }); id++; return c0 }
  const mid = Math.round(COLS * 0.5)
  put(mid - 22, [0.74, 0.8, 0.84, 0.86, 0.86, 0.84, 0.8, 0.74])                                          // rounded tower
  const chase = put(mid - 9, [0.9, 0.96, 1, 1, 1, 1, 1, 0.96, 0.9])                                       // the tallest, chamfered
  put(mid + 3, [0.6, 0.64, 0.64, 0.7, 0.74, 0.74, 0.8, 0.84, 0.8, 0.74, 0.74, 0.7, 0.64, 0.64, 0.6])     // stepped gables
  const wil = put(Math.round(COLS * (VERT ? 0.84 : 0.8)), [0.7, 0.78, 0.8, 0.78, 0.7])                    // the slim one out west, with a beacon
  const win = []
  for (let c = 0; c < COLS; c++) {
    const start = c === 0 || bid[c - 1] !== bid[c]
    const end = c === COLS - 1 || bid[c + 1] !== bid[c]
    if (start || end) continue
    let s = c; while (s > 0 && bid[s - 1] === bid[c]) s--
    if ((c - s) % 2 !== 1) continue
    for (let y = 3; y < hts[c] - 1; y += 2) win.push({ c, y, ph: r(), k: r() })
  }
  return { maxH, hts, win, beacon: [wil + 2, Math.round(0.8 * maxH) + 1], spire: [chase + 4, maxH] }
})()
function drawSkyline(ctx, t, off, pump) {
  if (off >= SKY.maxH + 4) return
  const f = F15(t)
  ctx.fillStyle = '#120828'
  for (let c = 0; c < COLS; c++) { const h = SKY.hts[c]; ctx.fillRect(c, ROWS - h + off, 1, h + 2) }
  // rim light along the roofline
  for (let c = 0; c < COLS; c++) { const h = SKY.hts[c]; ctx.fillStyle = c % 7 < 4 ? '#4a3290' : '#5d3a9a'; ctx.fillRect(c, ROWS - h + off, 1, 1) }
  // spire on the tallest
  ctx.fillStyle = '#4a3290'; ctx.fillRect(SKY.spire[0], ROWS - SKY.maxH - 4 + off, 1, 4)
  for (const w of SKY.win) {
    const flick = rng(Math.floor(w.ph * 9973) + Math.floor(f / (6 + w.k * 14)))()
    if (flick > 0.38 + 0.5 * pump) continue
    ctx.fillStyle = w.k < 0.62 ? '#f2c75c' : w.k < 0.86 ? '#fff4cf' : w.k < 0.93 ? '#ffbdf6' : '#2fd0e6'
    ctx.fillRect(w.c, ROWS - w.y + off, 1, 1)
  }
  if (f % 8 < 4) { ctx.fillStyle = '#ff2d3a'; ctx.fillRect(SKY.beacon[0], ROWS - SKY.beacon[1] + off - 1, 1, 1); ctx.fillStyle = '#ff2d3a'; ctx.fillRect(SKY.spire[0], ROWS - SKY.maxH - 5 + off, 1, 1) }
}
/** skyline rows hidden below the frame (0 = fully up) */
function skyOff(t) {
  const hid = SKY.maxH + 6
  if (t < b(1.9)) return hid
  if (t < b(12.2)) return Math.round(lerp(hid, 0, ease.outBack(prog(t, b(1.9), b(2.35)))) + hid * ease.inCubic(prog(t, b(11), b(12))))
  if (t < b(43.9)) return hid
  return Math.round(lerp(hid, 0, ease.outCubic(prog(t, b(43.9), b(44.6)))))
}

// ── the Align mark: seed-of-life rings + the chakra column (copied from the whop film)
const R0 = 20
const PET = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R0, Math.sin(a) * R0] })]
const CIRC = [...PET.map(([x, y]) => ({ x, y, r: R0 })), { x: 0, y: 0, r: 40 }]
function markSVG(parent, size, cx, cy, id) {
  const defs = CHAKRAS.map((c, i) => `<radialGradient id="${id}g${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="${id}c${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const m = el('div', { position: 'absolute', left: (cx - size / 2) + 'px', top: (cy - size / 2) + 'px', width: size + 'px', height: size + 'px' }, parent,
    `<svg width="${size}" height="${size}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.85" stroke-width="0.9" stroke-linecap="round">${CIRC.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHAKRAS.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#${id}g${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#${id}c${i})"/>`).join('')}</svg>`)
  const rings = [...m.querySelectorAll('.ring')], halos = [...m.querySelectorAll('.halo')], cores = [...m.querySelectorAll('.core')]
  return {
    m,
    draw(lt) {
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(lt, i * 0.04, 0.6 + i * 0.04)))))
      halos.forEach((c, i) => { const p = ease.outCubic(prog(lt, 0.1 + i * 0.05, 0.6 + i * 0.05)); c.setAttribute('r', String(11 * p)); c.setAttribute('opacity', String(p)) })
      cores.forEach((c, i) => { const p = prog(lt, 0.1 + i * 0.05, 0.45 + i * 0.05); c.setAttribute('r', String(p < 0.6 ? 5.5 * p / 0.6 : lerp(5.5, 3.7, (p - 0.6) / 0.4))) })
    },
  }
}

// ── kinetic type: every word slams in on its beat
function slam(e, t, tIn, tOut, from = 1.55) {
  if (t < tIn - 0.03) { e.style.opacity = '0'; return }
  const p = prog(t, tIn - 0.03, tIn + 0.2), o = ease.inQuad(prog(t, tOut - 0.14, tOut))
  const s = lerp(from, 1, ease.outBack(p)) * (1 + 0.25 * o)
  e.style.opacity = String(clamp(p * 4) * (1 - o))
  e.style.transform = `translateY(${-24 * o}px) scale(${s})`
  const bl = 8 * (1 - clamp(p * 1.6)) + 6 * o
  e.style.filter = bl > 0.05 ? `blur(${bl}px)` : 'none'
}
const DISPLAY = { fontFamily: SERIF, fontStyle: 'italic', color: '#fff6ea', textShadow: '0 0 30px rgba(8,4,24,0.9), 0 3px 4px rgba(4,2,14,0.5)' }
const GOLDGLOW = { textShadow: '0 0 26px rgba(242,199,92,0.55), 0 0 60px rgba(255,122,46,0.35), 0 3px 4px rgba(4,2,14,0.5)' }
/**
 * kin(parent, { box, eyebrow: [text, tIn], lines: [{ parts: [[html, tIn, style?]], size? }], size, tOut, pool })
 */
function kin(parent, { box, eyebrow, lines, size, tOut = 1e9, pool = false }) {
  const wrap = el('div', { position: 'absolute', ...box }, parent)
  const firstIn = Math.min(...lines.flatMap((l) => l.parts.map((p) => p[1])))
  const poolEl = pool ? el('div', { position: 'absolute', left: -170 * U + 'px', right: -170 * U + 'px', top: -120 * U + 'px', bottom: -120 * U + 'px', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(11,6,32,0.9), rgba(11,6,32,0.7) 55%, rgba(11,6,32,0) 100%)' }, wrap) : null
  const eb = eyebrow ? el('div', { position: 'relative', fontFamily: MONO, fontSize: (VERT ? 30 : 26) * U + 'px', letterSpacing: '0.28em', color: 'rgba(239,230,214,0.92)', textTransform: 'uppercase', marginBottom: 18 * U + 'px', textShadow: '0 0 18px rgba(8,4,24,0.95)', opacity: 0, whiteSpace: 'nowrap' }, wrap, eyebrow[0]) : null
  const parts = []
  for (const ln of lines) {
    const row = el('div', { position: 'relative', ...DISPLAY, textShadow: 'none', fontSize: (ln.size || size) * U + 'px', lineHeight: 1.06, whiteSpace: 'nowrap' }, wrap)
    ln.parts.forEach(([html, tIn, st], i) => {
      const e = el('span', { display: 'inline-block', marginRight: i < ln.parts.length - 1 ? '0.24em' : 0, textShadow: DISPLAY.textShadow, opacity: 0, ...(st || {}) }, row, html)
      parts.push({ e, tIn })
    })
  }
  return {
    wrap,
    update(t) {
      for (const p of parts) slam(p.e, t, p.tIn, tOut)
      if (eb) { const p = ease.outCubic(prog(t, eyebrow[1], eyebrow[1] + 0.3)), o = prog(t, tOut - 0.14, tOut); eb.style.opacity = String(p * (1 - o)); eb.style.letterSpacing = lerp(0.6, 0.28, p) + 'em' }
      if (poolEl) poolEl.style.opacity = String(Math.min(prog(t, firstIn - 0.1, firstIn + 0.15), 1 - prog(t, tOut - 0.14, tOut)))
    },
  }
}
const ROW = (parts, size) => ({ parts, size })
const SUB = { position: 'absolute' }

// ───────────────────────────────────────────── shots
// each: { start, end, root, update(t), back?(ctx,t), front?(ctx,t), inCut?, outCut? }

function intro(cam) {
  const root = fill(cam, { background: 'transparent' })
  const k = kin(root, {
    box: { left: 0, width: W + 'px', top: (VERT ? 470 : 150) * U + 'px', textAlign: 'center' },
    eyebrow: ['<span style="color:#f2c75c">✦</span> Mission control · Houston, TX', b(3)],
    size: VERT ? 150 : 132,
    lines: [ROW([['The stars', b(0)]]), ROW([['have aligned', b(1)]]), ROW([['in', b(2)], ['Space City.', b(2), GOLDGLOW]], VERT ? 160 : 150)],
  })
  return { start: 0, end: CUT.c1.t, root, outCut: CUT.c1, update(t) { k.update(t) } }
}

function countdown(cam) {
  const root = fill(cam, { background: 'transparent' })
  const cy = VERT ? H * 0.4 : H * 0.43
  const eb = kin(root, { box: { left: 0, width: W + 'px', top: (cy - (VERT ? 420 : 330) * U) + 'px', textAlign: 'center' }, eyebrow: ['T-minus', b(7.9)], lines: [], tOut: b(11.2) })
  const COL = ['#ff7a2e', '#ffd23f', '#2fd0e6']
  const nums = ['3', '2', '1'].map((n, i) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (cy - (VERT ? 330 : 250) * U) + 'px', textAlign: 'center', fontFamily: MONO, fontWeight: 700,
    fontSize: (VERT ? 560 : 440) * U + 'px', lineHeight: 1, color: '#fff6ea', opacity: 0, textShadow: `0 0 40px ${COL[i]}, 0 0 110px ${COL[i]}99, 0 4px 6px rgba(4,2,14,0.5)` }, root, n))
  return {
    start: CUT.c1.t, end: b(12), root, inCut: CUT.c1,
    update(t) {
      eb.update(t)
      nums.forEach((e, i) => slam(e, t, b(8 + i), b(9 + i) - 0.04, 2.1))
    },
    front(ctx, t) {
      for (let i = 0; i < 3; i++) burst(ctx, t, b(8 + i), W / 2, cy, VERT ? 1.3 : 1.1, 40 + i, [COL[i], '#fff4cf', '#f2c75c'], 0.7)
      burst(ctx, t, b(11), W / 2, H * 0.92, 1.6, 47)
    },
  }
}

function launch(cam) {
  const root = fill(cam, { background: 'transparent' })
  const deck = [[PROF(1), '#ff8fb1'], [PROF(2), '#ff7a2e'], [PROF(4), '#2fd0e6'], [PROF(5), '#4a72ff'], [PROF(6), '#5fdc54'], [G.back, '#b45cff']]
  const cw = (VERT ? 300 : 280) * U
  const FC = VERT ? [W / 2, H * 0.33] : [W * 0.29, H * 0.53]
  const slots = deck.map((_, i) => { const d = i - 2.5; return { dx: d * (VERT ? 112 : 104) * U, dy: d * d * 9 * U, r: d * 9 } })
  const cards = deck.map(([g, c], i) => {
    const card = flyCard(root, g, cw, c), s = slots[i], tl = b(12 + i)
    const x1 = FC[0] + s.dx, y1 = FC[1] + s.dy
    const f = VERT
      ? flight(tl - 0.42, tl, i % 2 ? W + cw : -cw, H * 0.62, x1, y1, i % 2 ? 40 : -40, s.r, i % 2 ? -160 : 160)
      : flight(tl - 0.42, tl, x1 + (i - 2.5) * 80 * U, H + cw * 1.2, x1, y1, -s.r * 2 + (i % 2 ? 30 : -30), s.r, i % 2 ? 120 : -120)
    return { card, f, s, tl }
  })
  const tbox = VERT ? { left: 0, width: W + 'px', top: H * 0.6 + 'px', textAlign: 'center' } : { left: W * 0.575 + 'px', top: H * 0.31 + 'px', textAlign: 'left' }
  const sz = VERT ? 124 : 124
  const tA = kin(root, { box: tbox, eyebrow: ['<span style="color:#f2c75c">✦</span> Tonight’s deck', b(12)], size: sz, tOut: b(15.85), lines: [ROW([['Every night,', b(12)]]), ROW([['a new deck.', b(13)]])] })
  const tB = kin(root, { box: tbox, eyebrow: ['<span style="color:#f2c75c">✦</span> Mystery cards', b(16)], size: sz, tOut: 1e9, lines: [ROW([['No photos.', b(16)]]), ROW([['Just stars.', b(17)]])] })
  return {
    start: b(11), end: CUT.c2.t, root, outCut: CUT.c2,
    update(t) {
      const spread = 1 + 0.16 * ease.outBack(prog(t, b(18), b(18) + 0.3))
      cards.forEach(({ card, f, s, tl }, i) => {
        if (t < f.t0) { card.box.style.display = 'none'; card.streak.style.opacity = '0'; return }
        if (t < tl) { flyUpdate(card, f, t); return }
        card.streak.style.opacity = '0'
        const land = t - tl, bump = 1 + 0.09 * Math.exp(-land * 12) * Math.cos(land * 30)
        const bob = Math.sin((t - b(12)) * 2.2 + i) * 6 * U
        placeCard(card, FC[0] + s.dx * spread, FC[1] + s.dy * spread + bob, s.r * spread, bump)
        sweep(card.glint, card.w, prog(t, b(18) + i * 0.06, b(19) + i * 0.06))
      })
      tA.update(t); tB.update(t)
    },
    back(ctx, t) { cards.forEach(({ f }, i) => trail(ctx, t, f, 100 + i)) },
    front(ctx, t) { cards.forEach(({ s, tl }, i) => { if (t > tl && t < tl + 0.35) burst(ctx, t, tl, FC[0] + s.dx, FC[1] + s.dy, 0.7, 200 + i, [SPARKS[i % 5], '#fff4cf'], 0.35) }) },
  }
}

/** a 3D card with a face and a back (card-back.png), for the slow-motion hero */
function card3dFB(parent, gF, w, glow) {
  const h = bodyH(gF, w)
  const holder = el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', perspective: (2400 * U) + 'px' }, parent)
  const body = el('div', { position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }, holder)
  const mk = (g, flip) => {
    const side = el('div', { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', ...(flip ? { transform: 'rotateY(180deg)' } : {}) }, body)
    el('div', { position: 'absolute', inset: 0, borderRadius: g.r * w + 'px', boxShadow: glowCss(glow, w) }, side)
    return face(side, g, w)
  }
  const fr = mk(gF, false); mk(G.back, true)
  return { holder, body, glint: fr.glint, w, h }
}

function hero(cam) {
  const root = fill(cam, { background: 'transparent' })
  const cw = (VERT ? 600 : 450) * U
  const c = card3dFB(root, PROF(3), cw, '#ff8fb1')
  const cx = VERT ? W / 2 : W * 0.32, cy = VERT ? H * 0.37 : H / 2
  c.holder.style.left = (cx - cw / 2) + 'px'; c.holder.style.top = (cy - c.h / 2) + 'px'
  const t20 = b(20)
  const txt = kin(root, {
    box: VERT ? { left: 0, width: W + 'px', top: H * 0.665 + 'px', textAlign: 'center' } : { left: W * 0.56 + 'px', top: H * 0.31 + 'px', textAlign: 'left' },
    eyebrow: ['<span style="color:#f2c75c">✦</span> Juniper · Libra', b(21)], size: VERT ? 140 : 140, tOut: CUT.c3.t,
    lines: [ROW([['Card first.', b(22)]]), ROW([['Face last.', b(24)]])],
  })
  return {
    start: CUT.c2.t, end: CUT.c3.t, root, inCut: CUT.c2, outCut: CUT.c3,
    update(t) {
      // speed ramp: a whip-fast arrival, slow motion while it talks, then it spins up fast
      const arr = ease.outExpo(prog(t, t20 - 0.14, t20 + 0.26))
      const slow = prog(t, t20 + 0.26, b(26))
      const spin = ease.inCubic(prog(t, b(26), b(27.1)))
      const ry = lerp(-50, -22, arr) + 40 * slow + 720 * spin
      const rz = lerp(28, -3, arr) + 2 * Math.sin(t * 1.4)
      const rx = 7 * Math.sin((t - t20) * 1.1) - 3
      const s = lerp(0.18, 1, arr) * lerp(1, 1.05, slow) * lerp(1, 1.12, spin)
      const fy = -12 * Math.sin((t - t20) * 1.6) * U
      c.body.style.transform = `translateY(${fy}px) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${s})`
      sweep(c.glint, cw, prog(t, b(21), b(23)))
      txt.update(t)
    },
    front(ctx, t) {
      twinkleField(ctx, t, b(20.4), b(26.5), [cx - cw * 0.85, cy - c.h * 0.62, cw * 1.7, c.h * 1.24], 61, 18)
      burst(ctx, t, t20, cx, cy, VERT ? 1.5 : 1.2, 300, CHAKRAS, 0.8)
    },
  }
}

function align(cam) {
  const root = fill(cam, { background: 'transparent' })
  const g = G.founder
  const cw = (VERT ? 600 : 460) * U, ch = bodyH(g, cw)
  const cx = VERT ? W / 2 : W * 0.32, cy = VERT ? H * 0.37 : H / 2
  const dw = cw * 0.92
  const her = flyCard(root, PROF(3), dw, '#ff8fb1'), you = flyCard(root, G.back, dw, '#b45cff')
  const td = b(28), t0 = CUT.c3.t + 0.02
  const fHer = flight(t0, td, -dw, cy + 140 * U, cx - dw * 0.05, cy, -24, -4, 0, ease.inQuad)
  const fYou = flight(t0, td, W + dw, cy - 140 * U, cx + dw * 0.05, cy, 24, 4, 0, ease.inQuad)
  // the founders card, photo open
  const holder = el('div', { position: 'absolute', left: (cx - cw / 2) + 'px', top: (cy - ch / 2) + 'px', width: cw + 'px', height: ch + 'px', perspective: (2800 * U) + 'px' }, root)
  const body = el('div', { position: 'absolute', inset: 0, transformStyle: 'preserve-3d', opacity: 0 }, holder)
  el('div', { position: 'absolute', inset: 0, borderRadius: g.r * cw + 'px', boxShadow: `0 0 ${80 * U}px ${14 * U}px rgba(214,170,255,0.38), 0 ${40 * U}px ${90 * U}px rgba(4,2,14,0.6)` }, body)
  const f = face(body, g, cw)
  const ring = el('div', { position: 'absolute', inset: 0, borderRadius: g.r * cw + 'px', pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.6,
    padding: (0.034 * cw) + 'px', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }, body)
  const txt = kin(root, {
    box: VERT ? { left: 0, width: W + 'px', top: H * 0.675 + 'px', textAlign: 'center' } : { left: W * 0.56 + 'px', top: H * 0.27 + 'px', textAlign: 'left' },
    eyebrow: ['<span style="color:#f2c75c">✦</span> It’s mutual', b(28.5)], size: VERT ? 124 : 132, tOut: CUT.c4.t,
    lines: VERT ? [ROW([['Both align.', b(29)]]), ROW([['Then you', b(31)], ['see them.', b(32)]])]
      : [ROW([['Both align.', b(29)]]), ROW([['Then you', b(31)]]), ROW([['see them.', b(32)]])],
  })
  return {
    start: CUT.c3.t, end: CUT.c4.t, root, outCut: CUT.c4,
    update(t) {
      if (t < td) { flyUpdate(her, fHer, t); flyUpdate(you, fYou, t) } else { her.box.style.display = you.box.style.display = 'none'; her.streak.style.opacity = you.streak.style.opacity = '0' }
      const lt = t - td
      body.style.opacity = t < td ? '0' : '1'
      const pop = ease.spring ? ease.spring(prog(lt, 0, 0.6), 0.22) : ease.outBack(prog(lt, 0, 0.6))
      const push = ease.outQuad(prog(lt, 0.4, CUT.c4.t - td))
      const ry = lerp(-14, 10, ease.inOutQuad(prog(lt, 0, 7 * BEAT)))
      body.style.transform = `translateY(${-10 * Math.sin(lt * 1.6) * U}px) rotateY(${ry}deg) rotateX(${3 * Math.sin(lt * 1.2)}deg) scale(${lerp(1.35, 1, pop) * lerp(1, 1.06, push)})`
      ring.style.background = `conic-gradient(from ${(lt * 160) % 360}deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.95) 16deg, rgba(255,255,255,0) 40deg, rgba(255,255,255,0) 360deg)`
      sweep(f.glint, cw, prog(lt, 0.3, 1.5))
      txt.update(t)
    },
    back(ctx, t) { trail(ctx, t, fHer, 401); trail(ctx, t, fYou, 402) },
    front(ctx, t) {
      burst(ctx, t, td, cx, cy, VERT ? 2.2 : 1.8, 410, CHAKRAS, 1.3)
      // twinkles beside the card only, never over Juniper's face
      twinkleField(ctx, t, td + 0.5, CUT.c4.t, [cx - cw * 0.85, cy - ch * 0.6, cw * 0.3, ch * 1.2], 89, 8)
      twinkleField(ctx, t, td + 0.5, CUT.c4.t, [cx + cw * 0.55, cy - ch * 0.6, cw * 0.3, ch * 1.2], 91, 8)
    },
  }
}

function talk(cam) {
  const root = fill(cam, { background: 'transparent' })
  const cw = (VERT ? 290 : 250) * U
  const NOTES = ['#f2c75c']
  const slots = Array.from({ length: 6 }, (_, i) => VERT
    ? { x: W / 2 + ((i % 3) - 1) * 325 * U, y: H * (i < 3 ? 0.47 : 0.745), r: [-5, 2, 6, -4, 5, -2][i] }
    : { x: W / 2 + (i - 2.5) * 276 * U, y: H * 0.64, r: [-6, 3, -2, 5, -4, 6][i] })
  const order = VERT ? [0, 1, 2, 3, 4, 5] : [0, 5, 1, 4, 2, 3]   // landing order: outside in on 16:9
  const cards = order.map((si, k) => {
    const s = slots[si], card = flyCard(root, TALK(si + 1), cw, NOTES[0]), tl = b(36 + k)
    const fromRight = VERT ? k % 2 === 1 : s.x > W / 2
    const f = flight(tl - 0.4, tl, fromRight ? W + cw : -cw, s.y + (VERT ? -200 : 260) * U, s.x, s.y, fromRight ? 50 : -50, s.r, fromRight ? 140 : -140)
    return { card, f, s, tl, k }
  })
  const txt = kin(root, {
    box: VERT ? { left: 0, width: W + 'px', top: H * 0.1 + 'px', textAlign: 'center' } : { left: 0, width: W + 'px', top: H * 0.1 + 'px', textAlign: 'center' },
    eyebrow: ['<span style="color:#f2c75c">✦</span> The talk deck', b(36)], size: VERT ? 130 : 128, tOut: b(42.6),
    lines: VERT ? [ROW([['Then you talk', b(36)]]), ROW([['in cards.', b(37)]])] : [ROW([['Then you talk', b(36)], ['in cards.', b(37)]])],
  })
  const CX = W / 2, CY = H * 0.5
  return {
    start: CUT.c4.t, end: b(44), root, inCut: CUT.c4,
    update(t) {
      const suck = ease.inCubic(prog(t, b(42), b(43.85)))
      cards.forEach(({ card, f, s, tl, k }) => {
        if (t < f.t0) { card.box.style.display = 'none'; card.streak.style.opacity = '0'; return }
        if (t < tl) { flyUpdate(card, f, t); return }
        card.streak.style.opacity = '0'
        const land = t - tl, bump = 1 + 0.08 * Math.exp(-land * 12) * Math.cos(land * 30)
        const bob = Math.sin((t - b(36)) * 2.4 + k) * 5 * U
        const x = lerp(s.x, CX, suck), y = lerp(s.y + bob, CY, suck)
        placeCard(card, x, y, s.r + 540 * suck * (k % 2 ? 1 : -1), bump * lerp(1, 0.15, suck))
        card.box.style.opacity = String(1 - prog(t, b(43.6), b(43.95)))
        sweep(card.glint, card.w, prog(t, b(40) + k * 0.08, b(41) + k * 0.08))
      })
      txt.update(t)
    },
    back(ctx, t) { cards.forEach(({ f }, i) => trail(ctx, t, f, 500 + i)) },
    front(ctx, t) { cards.forEach(({ s, tl }, i) => { if (t > tl && t < tl + 0.35) burst(ctx, t, tl, s.x, s.y, 0.6, 520 + i, ['#f2c75c', '#fff4cf'], 0.35) }) },
  }
}

function endCard(cam) {
  const root = fill(cam, { background: 'transparent' })
  const cy = (VERT ? 640 : 300) * U
  const S = (VERT ? 400 : 270) / 88
  const glow = el('div', { position: 'absolute', left: (W / 2 - 800 * U) + 'px', top: (cy - 700 * U) + 'px', width: 1600 * U + 'px', height: 1400 * U + 'px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(201,166,255,0.38), rgba(180,92,255,0) 100%)' }, root)
  const mark = markSVG(root, 88 * S, W / 2, cy, 'lm')
  const wy = cy + 44 * S + (VERT ? 30 : 18) * U
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: wy + 'px', textAlign: 'center', ...DISPLAY, color: BONE, fontSize: (VERT ? 180 : 136) * U + 'px', lineHeight: 1, opacity: 0, textShadow: '0 0 50px rgba(239,230,214,0.3)' }, root, 'Align')
  const tag = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (wy + (VERT ? 215 : 162) * U) + 'px', textAlign: 'center', fontFamily: MONO, fontSize: (VERT ? 42 : 34) * U + 'px', letterSpacing: '0.42em', textIndent: '0.42em', color: '#f2c75c', textShadow: '0 0 24px rgba(242,199,92,0.5)', opacity: 0 }, root, 'HOUSTON BETA')
  const line = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (wy + (VERT ? 300 : 228) * U) + 'px', textAlign: 'center', ...DISPLAY, color: 'rgba(239,230,214,0.94)', fontSize: (VERT ? 66 : 58) * U + 'px', opacity: 0 }, root, 'Dating, dealt by the stars.')
  const t0 = b(44)
  return {
    start: t0, end: DURATION, root,
    update(t) {
      const lt = t - t0
      mark.draw(lt * 1.6)
      mark.m.style.transform = `scale(${lerp(1.4, 1, ease.outBack(prog(lt, 0, 0.35)))})`
      glow.style.opacity = String(ease.outQuad(prog(lt, 0.1, 1.0)))
      slam(word, t, b(45), 1e9, 1.5)
      slam(tag, t, b(46), 1e9, 1.3)
      const lp = ease.outCubic(prog(t, b(47), b(47) + 0.5))
      line.style.opacity = String(lp); line.style.transform = `translateY(${lerp(22, 0, lp)}px)`; line.style.filter = lp < 1 ? `blur(${6 * (1 - lp)}px)` : 'none'
      root.style.transform = `scale(${1 + 0.035 * prog(lt, 0, DURATION - t0)})`
    },
    front(ctx, t) {
      burst(ctx, t, t0, W / 2, cy, VERT ? 2.4 : 2, 700, CHAKRAS, 1.4)
      twinkleField(ctx, t, t0 + 0.6, DURATION, [W * 0.08, cy - 300 * U, W * 0.84, (VERT ? 900 : 560) * U], 97, 14)
    },
  }
}

// ───────────────────────────────────────────── background: nebula + a warp starfield whose speed is the edit's speed ramp
const VKEYS = [[0, 25], [b(10.8), 40], [b(11.6), 2400], [b(12.2), 1500], [b(19.5), 1200], [b(19.9), 2800], [b(20.4), 50], [b(25.8), 60], [b(27), 3000], [b(28.1), 700], [b(29), 140],
  [b(35.3), 160], [b(35.8), 1900], [b(36.6), 700], [b(41.8), 700], [b(43.8), 3400], [b(44.4), 40], [99, 30]]
function speed(t) { let i = 0; while (i < VKEYS.length - 2 && t > VKEYS[i + 1][0]) i++; const [t0, v0] = VKEYS[i], [t1, v1] = VKEYS[i + 1]; return lerp(v0, v1, clamp((t - t0) / (t1 - t0))) }
function scroll(t) {
  let s = 0
  for (let i = 0; i < VKEYS.length - 1; i++) {
    const [t0, v0] = VKEYS[i], [t1, v1] = VKEYS[i + 1]
    if (t <= t0) break
    const te = Math.min(t, t1), ve = lerp(v0, v1, (te - t0) / (t1 - t0))
    s += (v0 + ve) / 2 * (te - t0)
  }
  return s
}
function bg(stage) {
  const root = fill(stage, { background: '#0b0620' })
  const space = spaceBackdrop(root, 'aurora', { seed: 5, grain: 0.16, stars: 120 })
  fill(root, { background: 'radial-gradient(90% 70% at 50% 40%, rgba(11,6,32,0.4) 0%, rgba(11,6,32,0.8) 100%)' })
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d'), r = rng(9)
  const RM = Math.hypot(W, H) * 0.62, CX = W / 2, CY = H * 0.45
  const stars = Array.from({ length: 190 }, () => ({ a: r() * Math.PI * 2, u: r(), d: 0.35 + r() * 0.65, c: r() < 0.15 ? '255,214,140' : r() < 0.3 ? '255,189,246' : '255,247,236' }))
  return {
    start: 0, end: DURATION, root,
    update(t) {
      space.update(t * 0.6)
      const v = speed(t), sc = scroll(t)
      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = 'round'
      for (const s of stars) {
        // hyperspace: each star slides out from the vanishing point, faster the further out it is
        const u = (s.u + sc * s.d / (RM * 1.6)) % 1, q = u * u, rr = RM * q
        const len = Math.min(rr, Math.max(1.5, v * s.d * 0.11 * (0.15 + q)))
        const ca = Math.cos(s.a), sa = Math.sin(s.a)
        ctx.strokeStyle = `rgba(${s.c},${clamp(0.15 + q * 1.4) * (0.35 + 0.55 * s.d)})`
        ctx.lineWidth = 0.8 + s.d * 1.8 * (0.3 + q)
        ctx.beginPath(); ctx.moveTo(CX + ca * rr, CY + sa * rr); ctx.lineTo(CX + ca * (rr - len), CY + sa * (rr - len)); ctx.stroke()
      }
    },
  }
}

// ───────────────────────────────────────────── the master: camera, pixel layers, flashes
const PUNCH = [
  ...[0, 1, 2].map((n) => [n, 0.045]), ...[3, 4, 5, 6, 7].map((n) => [n, 0.018]),
  [8, 0.05], [9, 0.05], [10, 0.06], [11, 0.03], [12, 0.08], ...[13, 14, 15, 16, 17, 18, 19].map((n) => [n, 0.026]),
  [20, 0.06], [22, 0.03], [24, 0.03], [26, 0.03], [26.5, 0.02], [28, 0.09], ...[29, 30, 31, 32, 33, 34, 35].map((n) => [n, 0.022]),
  ...[36, 37, 38, 39, 40, 41].map((n) => [n, 0.03]), [42, 0.015], [43, 0.015], [44, 0.07], [45, 0.025], [46, 0.02],
]
const FLASH = [[0, 0.12], [1, 0.1], [2, 0.18], [8, 0.18], [9, 0.18], [10, 0.22], [11, 0.3], [12, 0.5], [20, 0.35], [28, 0.6], [36, 0.15], [44, 0.65]]
const SHAKE = [11, 12, 20, 28, 44]
const CUTS = Object.values(CUT)

function master(stage) {
  const root = fill(stage, { background: 'transparent' })
  el('div', { position: 'absolute', width: 0, height: 0 }, root, `<svg width="0" height="0" style="position:absolute"><filter id="lwhip" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="0 0"/></filter></svg>`)
  const blurEl = root.querySelector('#lwhip feGaussianBlur')
  const cam = fill(root, { background: 'transparent', overflow: 'visible', transformOrigin: '50% 50%' })
  const skyGlow = el('div', { position: 'absolute', left: 0, width: W + 'px', bottom: 0, height: SKY.maxH * PIX * 2.2 + 'px', opacity: 0,
    background: 'linear-gradient(0deg, rgba(255,122,46,0.30) 0%, rgba(232,98,138,0.22) 35%, rgba(180,92,255,0.10) 65%, rgba(180,92,255,0) 100%)' }, cam)
  const pcv = () => { const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: COLS * PIX + 'px', height: ROWS * PIX + 'px', imageRendering: 'pixelated' }, cam); c.width = COLS; c.height = ROWS; return c.getContext('2d') }
  const backCtx = pcv()
  const shots = [intro, countdown, launch, hero, align, talk, endCard].map((f) => f(cam))
  const frontCtx = pcv()
  const flash = fill(root, { background: '#fff4cf', opacity: 0, mixBlendMode: 'screen' })
  const black = fill(root, { background: '#000', opacity: 1 })
  return {
    start: 0, end: DURATION, root,
    update(t) {
      // beat punches + a little shake on the big hits
      let s = 1, rot = 0, sx = 0, sy = 0
      for (const [n, k] of PUNCH) { const d = t - b(n); if (d >= 0 && d < 0.6) s += k * Math.exp(-d * 9) }
      for (const n of SHAKE) { const d = t - b(n); if (d >= 0 && d < 0.35) { const e = Math.exp(-d * 12), rr = rng(Math.floor(t * 30) + n); sx += (rr() - 0.5) * 26 * e * U; sy += (rr() - 0.5) * 26 * e * U; rot += (rr() - 0.5) * 1.2 * e } }
      cam.style.transform = `translate(${sx}px, ${sy}px) rotate(${rot}deg) scale(${s})`
      // whip blur
      let bx = 0, by = 0
      for (const c of CUTS) { const a = clamp(1 - Math.abs(t - c.t) / (WHIP + 0.04)); bx = Math.max(bx, a * a * 40 * Math.abs(c.d[0])); by = Math.max(by, a * a * 40 * Math.abs(c.d[1])) }
      if (bx + by > 0.2) { blurEl.setAttribute('stdDeviation', `${bx.toFixed(1)} ${by.toFixed(1)}`); cam.style.filter = 'url(#lwhip)' } else cam.style.filter = 'none'
      for (const sh of shots) {
        const on = t >= sh.start && t < sh.end
        sh.root.style.display = on ? 'block' : 'none'
        if (!on) continue
        let ox = 0, oy = 0
        if (sh.outCut) { const e = ease.inCubic(prog(t, sh.outCut.t - WHIP, sh.outCut.t)); ox += sh.outCut.d[0] * e * W; oy += sh.outCut.d[1] * e * H }
        if (sh.inCut) { const e = 1 - ease.outCubic(prog(t, sh.inCut.t, sh.inCut.t + WHIP)); ox -= sh.inCut.d[0] * e * W; oy -= sh.inCut.d[1] * e * H }
        sh.root.style.transform = ox || oy ? `translate(${ox}px, ${oy}px)` : 'none'
        sh.update(t)
      }
      // pixel layers
      backCtx.clearRect(0, 0, COLS, ROWS); frontCtx.clearRect(0, 0, COLS, ROWS)
      const off = skyOff(t)
      let pump = 0
      for (let n = 0; n < 48; n++) { const d = t - b(n); if (d >= 0 && d < 0.5) pump = Math.max(pump, Math.exp(-d * 7)) }
      if (t > b(11) && t < b(12)) pump = 1
      drawSkyline(backCtx, t, off, t < b(12.5) || t > b(44) ? pump : 0)
      const vis = 1 - off / (SKY.maxH + 6)
      skyGlow.style.opacity = String(vis * (0.75 + 0.25 * pump))
      skyGlow.style.transform = `translateY(${off * PIX}px)`
      for (const sh of shots) {
        if (t < sh.start - 0.5 || t > sh.end + 0.6) continue
        if (sh.back) sh.back(backCtx, t)
        if (sh.front) sh.front(frontCtx, t)
      }
      // flashes
      let fl = 0
      for (const [n, k] of FLASH) { const d = t - b(n); if (d >= -0.04 && d < 0.6) fl = Math.max(fl, k * (d < 0 ? (d + 0.04) / 0.04 : Math.exp(-d * 8))) }
      flash.style.opacity = String(fl)
      black.style.opacity = String(Math.max(1 - ease.outQuad(prog(t, 0, OFF)), ease.inQuad(prog(t, DURATION - 0.55, DURATION))))
    },
  }
}

export const SCENES = [bg, master]

// ───────────────────────────────────────────── sound cues (teaser-sound format)
const PENTA = [587.33, 659.25, 739.99, 880, 987.77, 1174.66]
export const CUES = [
  ['riser', 0, b(0), 0.04],
  ['boom', b(0), 0.22], ['pop', b(0), 587.33, 0.07], ['whoosh', b(0) + 0.05, 0.3, 0.07],
  ['pop', b(1), 659.25, 0.07], ['whoosh', b(1) + 0.05, 0.3, 0.06],
  ['boom', b(2), 0.32], ['pop', b(2), 880, 0.07], ['glitter', b(2), b(3.2)],
  ['bell', b(3), 1174.66, 0.035, 1.2, 0.2],
  ['whoosh', CUT.c1.t + 0.08, 0.4, 0.13],
  ...[0, 1, 2].flatMap((i) => [['bell', b(8 + i), [880, 987.77, 1174.66][i], 0.07, 0.9, 0], ['pop', b(8 + i), 1760, 0.05], ['tick', b(8 + i), 0.14]]),
  ['riser', b(8), b(12), 0.11],
  ['whoosh', b(11) + 0.35, 0.9, 0.16],
  ['boom', b(12), 0.55], ['glitter', b(12), b(13.2)],
  ...[0, 1, 2, 3, 4, 5].flatMap((i) => [['whoosh', b(12 + i) - 0.02, 0.36, 0.08], ['pop', b(12 + i), PENTA[i], 0.07, (i - 2.5) * 0.15]]),
  ['boom', b(16), 0.2],
  ['glitter', b(18), b(19)],
  ['whoosh', CUT.c2.t + 0.1, 0.45, 0.15],
  ['boom', b(20), 0.38], ['glitter', b(21), b(23)],
  ['bell', b(22), 739.99, 0.05, 2.0, -0.3], ['bell', b(24), 880, 0.05, 2.0, 0.3],
  ['riser', b(26), b(28), 0.13],
  ...Array.from({ length: 8 }, (_, i) => ['tick', b(26) + i * BEAT / 4, 0.08 + i * 0.01]),
  ['whoosh', CUT.c3.t + 0.08, 0.4, 0.12],
  ['whoosh', b(28) - 0.02, 0.7, 0.15],
  ['boom', b(28), 0.65], ['glitter', b(28), b(29.6)],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', b(28) + 0.04 + i * 0.045, f, 0.045, 2.0, (i - 3) * 0.12]),
  ['pop', b(29), 739.99, 0.06], ['pop', b(31), 880, 0.06], ['pop', b(32), 987.77, 0.06],
  ['whoosh', CUT.c4.t + 0.1, 0.45, 0.14],
  ...[0, 1, 2, 3, 4, 5].flatMap((i) => [['whoosh', b(36 + i) - 0.02, 0.36, 0.08], ['pluck', b(36 + i), PENTA[i] / 2, 0.08, 0.5, (i % 2 ? 0.3 : -0.3)]]),
  ['riser', b(42), b(44), 0.14],
  ...Array.from({ length: 12 }, (_, i) => ['tick', b(42) + (i < 4 ? i * BEAT / 2 : 2 * BEAT + (i - 4) * BEAT / 4), 0.07 + i * 0.008]),
  ['boom', b(44), 0.6], ['glitter', b(44), b(45.5)],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', b(44) + 0.2 + i * 0.06, f, 0.055, 2.4, (i - 3) * 0.12]),
  ['pop', b(45), 587.33, 0.06], ['bell', b(46), 1174.66, 0.04, 1.6, 0], ['glitter', b(47), b(48)],
  // claps on 2 and 4
  ...[1, 3, 5, 7, 13, 15, 17, 19, 29, 31, 33, 35, 37, 39, 41].map((n) => ['tick', b(n), 0.13]),
]
