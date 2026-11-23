// whop-club · "Cosmic Club Night": Align Houston Beta product-page film, 120 bpm (16:9, or 9:16 with &v)
//   0.0–4.0   OPEN   karaoke: "The stars have aligned / in Space City." one word per beat, aurora strobing in chakra colours
//   4.0–8.0   DECK   five mystery cards slam into a fan on 8th notes, then hop on the beat · "Mystery cards, every night." → "No photos. Yet."
//   8.0–12.0  GRID   split-screen of four cards flashing in sequence, zodiac chips popping like confetti · "Card first. Face last." · riser
//  12.0–16.0  HERO   DROP: Juniper's founders card falls in fast, hangs in slow motion (half-time), mirror-ball sparkle ·
//                    "When you both align, the photo drops." · then falls out of frame fast
//  16.0–20.0  TALK   five talk cards burst out and dance on the beat · "Then you talk in cards."
//  20.0–24.5  END    mark draws on the beat, "Align", HOUSTON BETA, "Dating, dealt by the stars." · last hit at 23.0
import { clamp, lerp, prog, ease, rng, el } from '../../../src/lib.js'
import { W, H, VERT, A, SERIF, MONO, fill, img, spaceBackdrop } from '../../../src/scenes/common.js'

export const DURATION = 24.5
const BONE = '#efe6d6', GOLD = '#f2c75c'
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const SPARKS = ['#f2c75c', '#fff4cf', '#ffbdf6', '#c9b6f0', '#efe6d6']
const U = Math.min(W, H) / 1080
const T = { deck: 4, grid: 8, hero: 12, talk: 16, end: 20, last: 23 }
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(',')

// ── the beat: every kick on the timeline (half-time through the slow-motion hero) ──
const range = (a, b, s) => Array.from({ length: Math.round((b - a) / s) }, (_, i) => a + i * s)
export const KICKS = [...range(0, 12, 0.5), 12, 13, 14, 15, ...range(16, 23, 0.5), 23]
function lastKick(t) { let k = -1; for (let i = 0; i < KICKS.length; i++) { if (KICKS[i] <= t + 1e-6) k = i; else break } return k }
const env = (t, d = 7) => { const k = lastKick(t); return k < 0 ? 0 : Math.exp(-(t - KICKS[k]) * d) }
const kix = (t) => lastKick(t)
/** 0..1 through the current beat (1 after the last kick) */
const phase = (t) => { const k = lastKick(t); return k < 0 || k >= KICKS.length - 1 ? 1 : (t - KICKS[k]) / (KICKS[k + 1] - KICKS[k]) }
/** a hop that leaves the floor on each kick and lands on the next */
const hop = (t) => { const p = phase(t); return t >= T.last ? 0 : 4 * p * (1 - p) }
// speed ramp: ambient motion (beams, nebula, bobbing) runs at 15% through the hero's slow motion
const SLOW = [12.3, 15.6], SR = 0.15
const clk = (t) => t < SLOW[0] ? t : t < SLOW[1] ? SLOW[0] + (t - SLOW[0]) * SR : SLOW[0] + (SLOW[1] - SLOW[0]) * SR + (t - SLOW[1])
const FLASHES = [4, 8, 12.3, 16, 20, 23]

// ── card geometry (body box inside each PNG's glow padding) ──
const prof = (n) => ({ src: `card-profile-${n}.png`, iw: 1496, ih: 2237, b: [120, 114, 1374, 2115], r: 0.067 })
const talk = (n) => ({ src: `card-talk-${n}.png`, iw: 744, ih: 1194, b: [60, 60, 684, 1134], r: 0.075 })
const G = {
  founder: { src: 'card-founder-juniper.png', iw: 2992, ih: 4466, b: [240, 218, 2748, 4223], r: 0.075 },
  event: { src: 'card-event.png', iw: 1496, ih: 2238, b: [120, 114, 1374, 2115], r: 0.067 },
  daily: { src: 'card-talk-daily.png', iw: 1178, ih: 1891, b: [96, 96, 1082, 1795], r: 0.075 },
}
const bodyH = (g, w) => w * (g.b[3] - g.b[1]) / (g.b[2] - g.b[0])

function face(parent, g, w, style = {}) {
  const bw = g.b[2] - g.b[0], k = w / bw, h = bodyH(g, w), rad = g.r * w
  const f = el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', borderRadius: rad + 'px', overflow: 'hidden', ...style }, parent)
  img(f, A + g.src, { left: -g.b[0] * k + 'px', top: -g.b[1] * k + 'px', width: g.iw * k + 'px', height: g.ih * k + 'px' })
  const glint = el('div', { position: 'absolute', top: '-30%', height: '160%', width: (w * 0.32) + 'px', left: 0, mixBlendMode: 'screen', opacity: 0,
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,246,232,0.10) 30%, rgba(255,250,240,0.55) 50%, rgba(255,246,232,0.10) 70%, rgba(255,255,255,0) 100%)' }, f)
  return { face: f, glint, w, h }
}
const sweep = (gl, w, p) => { gl.style.opacity = p > 0 && p < 1 ? String(Math.sin(Math.PI * p)) : '0'; gl.style.transform = `translateX(${lerp(-w * 0.5, w * 1.2, p)}px) skewX(-18deg)` }
/** a card centred on (0,0) of its box, with a glow you can pulse */
function card(parent, g, w, glowRGB = '214,170,255') {
  const h = bodyH(g, w)
  const box = el('div', { position: 'absolute', left: -w / 2 + 'px', top: -h / 2 + 'px', width: w + 'px', height: h + 'px', willChange: 'transform' }, parent)
  const glow = el('div', { position: 'absolute', inset: 0, borderRadius: g.r * w + 'px', boxShadow: `0 0 ${60 * U}px ${10 * U}px rgba(${glowRGB},0.55), 0 ${30 * U}px ${70 * U}px rgba(4,2,14,0.6)`, opacity: 0.5 }, box)
  const f = face(box, g, w)
  return { box, glow, ...f, h }
}

// ── pixel sprites (same sprites and 15fps stepping as the whop film) ──
const PIX = VERT ? 7 : 6
const SPR = [
  ['X'], ['.X.', 'XWX', '.X.'], ['..X..', '..X..', 'XXWXX', '..X..', '..X..'],
  ['...X...', '...X...', '..XWX..', 'XXWWWXX', '..XWX..', '...X...', '...X...'],
  ['....X....', '....X....', '...XWX...', '..X.W.X..', 'XXWWWWWXX', '..X.W.X..', '...XWX...', '....X....', '....X....'],
].map((rows) => rows.map((r) => [...r]))
function pstar(ctx, x, y, size, color) {
  const s = SPR[Math.max(0, Math.min(SPR.length - 1, size))], o = (s.length - 1) / 2, cx = Math.round(x), cy = Math.round(y)
  for (let r = 0; r < s.length; r++) for (let c = 0; c < s[r].length; c++) { const ch = s[r][c]; if (ch === '.') continue; ctx.fillStyle = ch === 'W' ? '#ffffff' : color; ctx.fillRect(cx + c - o, cy + r - o, 1, 1) }
}
function pring(ctx, x, y, rad, color) {
  const n = Math.max(12, Math.round(rad * 2.2)); ctx.fillStyle = color
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; ctx.fillRect(Math.round(x + Math.cos(a) * rad), Math.round(y + Math.sin(a) * rad * 0.86), 1, 1) }
}
const step = (t) => Math.floor(t * 15) / 15
/** confetti burst of pixel stars from (x, y) screen px at t0 */
function burst(ctx, t, t0, x, y, seed, n = 22, pow = 1) {
  const tb = step(t) - t0
  if (tb < 0 || tb > 1.6) return
  const r = rng(seed), f = Math.floor(t * 15), k = pow * (VERT ? 1.1 : 1)
  if (tb < 0.35) pring(ctx, x / PIX, y / PIX, (4 + tb * 140) * k, tb < 0.17 ? '#fff4cf' : GOLD)
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, v = (60 + r() * 110) * k, life = 0.8 + r() * 0.8, c = r() < 0.5 ? CHAKRAS[Math.floor(r() * 7)] : SPARKS[Math.floor(r() * 5)], ph = Math.floor(r() * 4)
    const l = 1 - tb / life
    if (l <= 0 || (l < 0.25 && f % 2)) continue
    const px = x / PIX + Math.cos(a) * v * tb * 0.9 / (1 + tb), py = y / PIX + (Math.sin(a) * v * tb / (1 + tb)) * 0.9 + 30 * tb * tb
    pstar(ctx, px, py, l > 0.6 ? [2, 3, 2, 1][(f + ph) % 4] : 1, c)
  }
}
/** mirror-ball reflections: spots on a turning sphere, projected across the whole frame */
const BALL = (() => { const r = rng(404); return Array.from({ length: 120 }, (_, i) => ({ lon: r() * Math.PI * 2, lat: Math.asin(r() * 2 - 1) * 0.92, c: r() < 0.6 ? SPARKS[Math.floor(r() * 5)] : CHAKRAS[Math.floor(r() * 7)], ph: Math.floor(r() * 6) })) })()
function mirrorBall(ctx, t, density = 1, spin = 0.5, ex = null) {
  const a = clk(t) * spin, f = Math.floor(t * 15), cx = W / 2 / PIX, cy = H / 2 / PIX, rx = W * 0.62 / PIX, ry = H * 0.58 / PIX
  BALL.forEach((s, i) => {
    if (i / BALL.length > density) return
    const lon = s.lon + a, z = Math.cos(lon) * Math.cos(s.lat)
    if (z < 0.15) return
    const x = cx + rx * Math.sin(lon) * Math.cos(s.lat), y = cy + ry * Math.sin(s.lat)
    if (ex && x * PIX > ex[0] && x * PIX < ex[0] + ex[2] && y * PIX > ex[1] && y * PIX < ex[1] + ex[3]) return
    pstar(ctx, x, y, z > 0.75 ? [1, 2, 3, 2, 1, 0][(f + s.ph) % 6] : [0, 1, 2, 1, 0, 0][(f + s.ph) % 6], s.c)
  })
}
/** pixel stars raining down like confetti over [t0, t1] */
function rain(ctx, t, t0, t1, seed, n = 40) {
  if (t < t0 || t > t1 + 3) return
  const r = rng(seed), f = Math.floor(t * 15), ts = step(t)
  for (let i = 0; i < n; i++) {
    const x = r() * W / PIX, born = t0 + r() * (t1 - t0), v = 40 + r() * 50, sway = r() * 6.28, c = r() < 0.55 ? CHAKRAS[Math.floor(r() * 7)] : SPARKS[Math.floor(r() * 5)], ph = Math.floor(r() * 4)
    const lt = ts - born
    if (lt < 0) continue
    const y = -4 + lt * v * (VERT ? 1.3 : 1)
    if (y > H / PIX + 4) continue
    pstar(ctx, x + Math.sin(lt * 3 + sway) * 4, y, [1, 2, 1, 0][(f + ph) % 4], c)
  }
}

// ── the Align mark (copied from whop: seed-of-life rings + chakra column) ──
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
    draw(lt, pulse = 0) {
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(lt, i * 0.03, 0.4 + i * 0.03)))))
      halos.forEach((c, i) => { const p = ease.outCubic(prog(lt, 0.1 + i * 0.05, 0.5 + i * 0.05)); c.setAttribute('r', String(11 * p * (1 + 0.35 * pulse))); c.setAttribute('opacity', String(p)) })
      cores.forEach((c, i) => { const p = prog(lt, 0.1 + i * 0.05, 0.4 + i * 0.05); c.setAttribute('r', String(p < 0.6 ? 5.5 * p / 0.6 : lerp(5.5, 3.7, (p - 0.6) / 0.4))) })
    },
  }
}

// ── karaoke captions: words pop in one at a time; the word being "sung" glows gold ──
/** lines: [[[word, t], …], …]; returns update(t, tOut) */
function kara(parent, lines, { size, layout, align = 'center', pool = true, eyebrow }) {
  const box = el('div', { position: 'absolute', textAlign: align, isolation: 'isolate', ...layout }, parent)
  let pl = null
  if (pool) pl = el('div', { position: 'absolute', left: -160 * U + 'px', right: -160 * U + 'px', top: -110 * U + 'px', bottom: -110 * U + 'px', zIndex: -1,
    background: 'radial-gradient(closest-side, rgba(11,6,32,0.88), rgba(11,6,32,0.62) 55%, rgba(11,6,32,0) 100%)' }, box)
  let eb = null
  if (eyebrow) eb = el('div', { fontFamily: MONO, fontSize: (VERT ? 30 : 26) * U + 'px', letterSpacing: '0.3em', color: GOLD, marginBottom: 18 * U + 'px', textShadow: '0 0 18px rgba(8,4,24,0.9)', opacity: 0 }, box, eyebrow[0])
  const words = []
  lines.forEach((ln) => {
    const row = el('div', { whiteSpace: 'nowrap', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: size + 'px', lineHeight: 1.08 }, box)
    ln.forEach(([w, at], j) => {
      const s = el('span', { display: 'inline-block', marginRight: j < ln.length - 1 ? '0.24em' : 0, transformOrigin: '50% 85%', color: BONE, opacity: 0 }, row, w)
      words.push({ s, at })
    })
  })
  words.forEach((w, i) => { w.next = words[i + 1]?.at ?? Infinity })
  return {
    box,
    update(t, tOut, tIn = -1) {
      const o = ease.inQuad(prog(t, tOut - 0.2, tOut))
      box.style.opacity = String(1 - o)
      box.style.transform = `scale(${1 + 0.22 * o})`
      box.style.filter = o > 0 ? `blur(${8 * o}px)` : 'none'
      if (pl) pl.style.opacity = String(prog(t, (eyebrow ? eyebrow[1] : words[0].at) - 0.05, words[0].at + 0.2))
      if (eb) { const p = ease.outCubic(prog(t, eyebrow[1], eyebrow[1] + 0.3)); eb.style.opacity = String(p); eb.style.letterSpacing = lerp(0.6, 0.3, p) + 'em' }
      const e = env(t)
      for (const w of words) {
        const p = prog(t, w.at, w.at + 0.3)
        w.s.style.opacity = String(prog(t, w.at, w.at + 0.05))
        const active = t >= w.at && t < Math.min(w.next, w.at + 0.9)
        const sc = p <= 0 ? 0.3 : lerp(0.3, 1, ease.outBack(p)) * (1 + (active ? 0.05 : 0.02) * e)
        w.s.style.transform = `translateY(${lerp(0.45, 0, ease.outCubic(p)) * size}px) scale(${sc}) rotate(${lerp(-8, 0, ease.outCubic(p))}deg)`
        w.s.style.color = active ? GOLD : BONE
        w.s.style.textShadow = active ? '0 0 28px rgba(242,199,92,0.65), 0 2px 3px rgba(4,2,14,0.6)' : '0 0 26px rgba(8,4,24,0.85), 0 2px 3px rgba(4,2,14,0.5)'
      }
    },
  }
}

// ── zodiac sign chips (confetti) ──
const SIGNS = [['♈', 'ARIES'], ['♊', 'GEMINI'], ['♋', 'CANCER'], ['♌', 'LEO'], ['♍', 'VIRGO'], ['♎', 'LIBRA'], ['♏', 'SCORPIO'], ['♐', 'SAGITTARIUS'], ['♑', 'CAPRICORN'], ['♒', 'AQUARIUS'], ['♓', 'PISCES']]
function chips(parent, list) {
  // list: [{ at, x, y, sign, c, vx, vy, rot }]
  return list.map((d) => {
    const e = el('div', { position: 'absolute', left: d.x + 'px', top: d.y + 'px', transform: 'translate(-50%,-50%)', opacity: 0, whiteSpace: 'nowrap',
      padding: `${10 * U}px ${22 * U}px`, borderRadius: '999px', background: 'rgba(24,12,54,0.82)', border: `${2 * U}px solid ${d.c}`, boxShadow: `0 0 ${24 * U}px rgba(${rgb(d.c)},0.55)`,
      fontFamily: MONO, fontSize: (VERT ? 28 : 24) * U + 'px', letterSpacing: '0.16em', color: BONE }, parent,
      `<span style="font-family:'DejaVu Sans',sans-serif;color:${d.c};margin-right:${10 * U}px;font-size:1.15em">${d.sign[0]}&#xFE0E;</span>${d.sign[1]}`)
    return { e, d }
  })
}
function chipsUpdate(list, t) {
  for (const { e, d } of list) {
    const lt = t - d.at
    if (lt < 0 || lt > 1.6) { e.style.opacity = '0'; continue }
    const p = ease.outBack(prog(lt, 0, 0.22))
    e.style.opacity = String(Math.min(1, lt / 0.05, (1.6 - lt) / 0.3))
    e.style.transform = `translate(-50%,-50%) translate(${d.vx * lt}px, ${d.vy * lt + 120 * lt * lt}px) rotate(${d.rot * lt}deg) scale(${p})`
  }
}
function makeChipList(seed, times, region) {
  const r = rng(seed)
  return times.map((at, i) => {
    const [x0, y0, w, h] = region[i % region.length]
    return { at, x: x0 + r() * w, y: y0 + r() * h, sign: SIGNS[Math.floor(r() * SIGNS.length)], c: CHAKRAS[(i * 3) % 7], vx: (r() - 0.5) * 160, vy: -60 - r() * 80, rot: (r() - 0.5) * 40 }
  })
}

// ───────────────────────────────────────────── background: nebula, chakra strobe, club beams
function bg(stage) {
  const root = fill(stage, { background: '#0b0620' })
  const space = spaceBackdrop(root, 'aurora', { seed: 11, grain: 0.16, stars: 240 })
  const wash = fill(root, { mixBlendMode: 'screen', opacity: 0 })
  const beams = [0, 1].map((side) => {
    const S = 3200 * U
    const b = el('div', { position: 'absolute', left: (side ? W * 0.86 : W * 0.14) - S / 2 + 'px', top: (H + 60 * U) - S / 2 + 'px', width: S + 'px', height: S + 'px', mixBlendMode: 'screen', opacity: 0, filter: `blur(${4 * U}px)`,
      WebkitMaskImage: 'radial-gradient(closest-side, #000 8%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 80%)' }, root)
    return b
  })
  const night = fill(root, { background: 'rgba(11,6,32,0.42)' })
  const deep = fill(root, { background: 'radial-gradient(85% 70% at 50% 50%, rgba(11,6,32,0) 0%, rgba(11,6,32,0.7) 100%)' })
  const black = fill(root, { background: '#000', opacity: 1 })
  const beamBg = (k, side) => {
    const rays = [-52, -34, -16, 2, 20].map((a, i) => { const c = rgb(CHAKRAS[(k + i * 2 + side * 3) % 7]); const aa = side ? -a : a; return `rgba(${c},0) ${aa - 1.6}deg, rgba(${c},0.9) ${aa}deg, rgba(${c},0) ${aa + 1.6}deg` })
    // conic stops must ascend: sort by angle
    const segs = rays.map((s, i) => ({ s, a: side ? -[-52, -34, -16, 2, 20][i] : [-52, -34, -16, 2, 20][i] })).sort((x, y) => x.a - y.a)
    return `conic-gradient(from -90deg at 50% 50%, rgba(0,0,0,0) 0deg, ${segs.map((x) => x.s.replace(/(-?\d+\.?\d*)deg/g, (m, n) => (Number(n) + 90) + 'deg')).join(', ')}, rgba(0,0,0,0) 360deg)`
  }
  return {
    start: 0, end: DURATION, root,
    update(t) {
      const c = clk(t), e = env(t, 6), k = Math.max(0, kix(t))
      space.update(c * 0.7)
      space.root.style.transform = `scale(${1.05 + 0.025 * e + 0.04 * t / DURATION}) translateY(${-c * 3}px)`
      const col = rgb(CHAKRAS[k % 7]), col2 = rgb(CHAKRAS[(k + 3) % 7])
      wash.style.background = `radial-gradient(70% 60% at ${k % 2 ? 30 : 70}% 40%, rgba(${col},0.55), rgba(${col},0) 70%), radial-gradient(60% 55% at ${k % 2 ? 75 : 25}% 85%, rgba(${col2},0.45), rgba(${col2},0) 70%)`
      const slowMo = t >= SLOW[0] && t < SLOW[1]
      wash.style.opacity = String((slowMo ? 0.26 : 0.36) * e + 0.04)
      void night
      beams.forEach((b, side) => {
        b.style.background = beamBg(k, side)
        b.style.transform = `rotate(${(side ? -1 : 1) * 16 * Math.sin(c * 1.3 + side * 1.7)}deg)`
        b.style.opacity = String(t < 0.3 ? 0 : (0.16 + 0.34 * e) * (t > T.last + 0.6 ? Math.max(0.4, 1 - (t - T.last - 0.6)) : 1))
      })
      deep.style.opacity = String(0.85)
      black.style.opacity = String(1 - ease.outQuad(prog(t, 0, 0.25)))
    },
  }
}

// ───────────────────────────────────────────── shots
function open(stage) {
  const root = fill(stage, { background: 'transparent' })
  const L = VERT
    ? [[['The', 0.0], ['stars', 0.5]], [['have', 1.0], ['aligned', 1.5]], [['in', 2.0], ['Space', 2.5], ['City.', 3.0]]]
    : [[['The', 0.0], ['stars', 0.5], ['have', 1.0], ['aligned', 1.5]], [['in', 2.0], ['Space', 2.5], ['City.', 3.0]]]
  const size = (VERT ? 150 : 150) * U
  const k = kara(root, L, { size, layout: { left: 0, width: W + 'px', top: (H / 2 - (L.length * size * 1.08) / 2 - 30 * U) + 'px' } })
  return {
    start: 0, end: T.deck + 0.05, root,
    update(t) {
      k.update(t, T.deck)
      root.style.transform = `scale(${1 + 0.012 * env(t)})`
    },
    fx(ctx, t) {
      const pts = VERT ? [[180, 560], [900, 640], [200, 1300], [880, 1380], [540, 470], [540, 1460], [860, 1000]] : [[260, 330], [1660, 330], [360, 760], [1560, 760], [960, 250], [960, 830], [1700, 540]]
      for (let i = 0; i < 7; i++) burst(ctx, t, i * 0.5, pts[i][0] * U, pts[i][1], 100 + i, 16, 0.7)
      mirrorBall(ctx, t, 0.35, 0.4)
    },
  }
}

function deck(stage) {
  const root = fill(stage, { background: 'transparent' })
  const S0 = T.deck, S1 = T.grid + 0.05
  const cw = (VERT ? 320 : 320) * U, spread = (VERT ? 128 : 235) * U, arc = 14 * U
  const cx = W / 2, cy = VERT ? 760 : 420
  const order = [4, 2, 3, 1, 6]                  // Juniper (veiled, 3) in the middle
  const entry = [0, 4, 1, 3, 2]                  // slam order: outside in, centre lands on the beat at 5.0
  const fan = el('div', { position: 'absolute', left: cx + 'px', top: cy + 'px', width: 0, height: 0 }, root)
  const cards = order.map((n, i) => { const c = card(fan, prof(n), cw, rgb(CHAKRAS[[0, 2, 6, 4, 3][i]])); return { ...c, d: i - 2, at: S0 + entry[i] * 0.25 } })
  // the centre card renders on top
  cards[2].box.style.zIndex = '5'; cards[1].box.style.zIndex = cards[3].box.style.zIndex = '3'
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (VERT ? 260 : 46) * U + 'px', textAlign: 'center', fontFamily: MONO, fontSize: (VERT ? 32 : 26) * U + 'px', letterSpacing: '0.34em', textIndent: '0.34em', color: GOLD, opacity: 0, textShadow: '0 0 20px rgba(8,4,24,0.9)' }, root, '✦ TONIGHT’S DECK ✦')
  const capTop = VERT ? 1230 : 800
  const k1 = kara(root, VERT ? [[['Mystery', 4.5], ['cards,', 5.0]], [['every', 5.5], ['night.', 6.0]]] : [[['Mystery', 4.5], ['cards,', 5.0], ['every', 5.5], ['night.', 6.0]]],
    { size: (VERT ? 128 : 112) * U, layout: { left: 0, width: W + 'px', top: capTop + 'px' } })
  const k2 = kara(root, [[['No', 6.5], ['photos.', 7.0], ['Yet.', 7.5]]], { size: (VERT ? 140 : 112) * U, layout: { left: 0, width: W + 'px', top: capTop + (VERT ? 60 : 0) + 'px' } })
  const chipRegion = VERT ? [[190, 340, 220, 160], [670, 340, 220, 160], [190, 1100, 200, 80], [690, 1100, 200, 80]] : [[190, 160, 200, 500], [1530, 160, 200, 500]]
  const ch = chips(root, makeChipList(7, [5.0, 5.5, 6.0, 6.5, 7.0, 7.5], chipRegion))
  return {
    start: S0, end: S1, root,
    update(t) {
      const e = env(t), out = ease.inCubic(prog(t, T.grid - 0.25, T.grid))
      eyebrow.style.opacity = String(Math.min(prog(t, S0 + 0.1, S0 + 0.4), 1 - out))
      for (const c of cards) {
        const p = prog(t, c.at - 0.2, c.at), land = t - c.at
        const fall = (1 - ease.inQuad(p)) * -(H * 0.9)
        const squash = land >= 0 ? Math.exp(-land * 9) : 0
        const myBeat = (Math.max(0, kix(t)) + c.d + 2) % 2 === 0
        const dance = t > S0 + 1.1 ? -hop(t) * (myBeat ? 26 : 8) * U : 0
        const x = c.d * spread * (1 + 1.6 * out), y = c.d * c.d * arc + fall + dance - (c.d === 0 ? 20 * U : 0) - 260 * U * out * (c.d === 0 ? 1 : 0.3)
        const rot = c.d * 7 + (1 - p) * c.d * 20 + (t > S0 + 1.1 ? (myBeat ? 2.5 : -2.5) * hop(t) : 0) + c.d * 25 * out
        c.box.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${(1 + 0.08 * squash) * (1 + 0.02 * e)}, ${(1 - 0.05 * squash) * (1 + 0.02 * e)})`
        c.box.style.opacity = String(p > 0 ? 1 - out : 0)
        c.glow.style.opacity = String(0.35 + 0.6 * e)
        sweep(c.glint, cw, prog(t, c.at + 0.4 + c.d * 0.08, c.at + 1.4 + c.d * 0.08))
      }
      k1.update(t, 6.45); k2.update(t, T.grid)
      chipsUpdate(ch, t)
    },
    fx(ctx, t) {
      cards.forEach((c, i) => burst(ctx, t, c.at, cx + c.d * spread, cy + c.h * 0.42, 200 + i, 14, 0.6))
      mirrorBall(ctx, t, 0.3, 0.4)
    },
  }
}

function grid(stage) {
  const root = fill(stage, { background: 'transparent' })
  const S0 = T.grid, S1 = T.hero + 0.05
  const G4 = [prof(1), G.event, prof(5), prof(2)]
  const tint = [CHAKRAS[0], CHAKRAS[4], CHAKRAS[6], CHAKRAS[2]]
  const gap = 24 * U
  const pw = VERT ? (W - 2 * 48 * U - gap) / 2 : (W - 2 * 60 * U - 3 * gap) / 4
  const ph = VERT ? 640 * U : 640 * U
  const pos = VERT ? [0, 1, 2, 3].map((i) => [48 * U + (i % 2) * (pw + gap), 190 * U + Math.floor(i / 2) * (ph + gap)]) : [0, 1, 2, 3].map((i) => [60 * U + i * (pw + gap), 96 * U])
  const cw = (VERT ? 330 : 300) * U
  const cells = G4.map((g, i) => {
    const p = el('div', { position: 'absolute', left: pos[i][0] + 'px', top: pos[i][1] + 'px', width: pw + 'px', height: ph + 'px', borderRadius: 26 * U + 'px', overflow: 'hidden',
      background: `radial-gradient(90% 70% at 50% 45%, rgba(${rgb(tint[i])},0.55), rgba(24,12,54,0.9) 75%)`, border: `${2 * U}px solid rgba(${rgb(tint[i])},0.6)`, opacity: 0 }, root)
    const hold = el('div', { position: 'absolute', left: pw / 2 + 'px', top: ph / 2 + 'px', width: 0, height: 0 }, p)
    const c = card(hold, g, cw, rgb(tint[i]))
    const dim = el('div', { position: 'absolute', inset: 0, background: 'rgba(11,6,32,1)', opacity: 0 }, p)
    return { p, c, dim, at: S0 + i * 0.5 }
  })
  const capTop = VERT ? 1530 : 800
  const k = kara(root, VERT ? [[['Card', 8.5], ['first.', 9.0]], [['Face', 10.0], ['last.', 10.5]]] : [[['Card', 8.5], ['first.', 9.0], ['Face', 10.0], ['last.', 10.5]]],
    { size: (VERT ? 130 : 120) * U, layout: { left: 0, width: W + 'px', top: capTop + 'px' } })
  const chipRegion = VERT ? [[220, 120, 640, 70], [220, 840, 640, 70], [220, 1460, 640, 50]] : [[240, 70, 1440, 60], [260, 740, 1400, 40]]
  const ch = chips(root, makeChipList(23, [8.25, 8.75, 9.25, 9.75, 10.25, 10.75, 11.25, 11.5, 11.75], chipRegion))
  /** which cell is lit: one per beat, then 8ths, then all strobing */
  const lit = (t) => {
    if (t < S0 + 2) return Math.max(0, kix(t)) % 4
    if (t < S0 + 3) return Math.floor((t - S0) * 4) % 4
    return -1
  }
  return {
    start: S0, end: S1, root,
    update(t) {
      const e = env(t), L = lit(t), strobe = t >= S0 + 3 ? (Math.floor((t - S0) * 8) % 2 ? 0.1 : 0.45) : 0
      const out = ease.inCubic(prog(t, T.hero - 0.3, T.hero))
      cells.forEach((cl, i) => {
        const p = ease.outBack(prog(t, cl.at, cl.at + 0.25))
        cl.p.style.opacity = String(t >= cl.at ? 1 - out : 0)
        const isLit = L === i || L === -1
        // collapse toward the frame centre at the end
        const ccx = pos[i][0] + pw / 2 - W / 2, ccy = pos[i][1] + ph / 2 - H / 2
        cl.p.style.transform = `translate(${-ccx * out}px, ${-ccy * out}px) scale(${lerp(0.6, 1, p) * (1 - 0.6 * out) * (isLit ? 1 + 0.02 * e : 1)}) rotate(${(i % 2 ? 1 : -1) * 6 * out}deg)`
        const since = t - cl.at
        cl.dim.style.opacity = String(isLit ? strobe : 0.55)
        cl.c.box.style.transform = `translateY(${-hop(t) * (isLit ? 18 : 4) * U}px) scale(${(isLit ? 1.06 : 0.96) * (1 + 0.04 * Math.exp(-Math.max(0, since) * 8))}) rotate(${(isLit ? (i % 2 ? 2 : -2) : 0)}deg)`
        cl.c.glow.style.opacity = String(isLit ? 0.5 + 0.5 * e : 0.2)
        sweep(cl.c.glint, cw, prog(t, cl.at + 0.2, cl.at + 1.0))
      })
      k.update(t, T.hero - 0.1)
      chipsUpdate(ch, t)
    },
    fx(ctx, t) {
      cells.forEach((cl, i) => burst(ctx, t, cl.at, pos[i][0] + pw / 2, pos[i][1] + ph / 2, 300 + i, 16, 0.8))
      mirrorBall(ctx, t, 0.3, 0.5)
    },
  }
}

function hero(stage) {
  const root = fill(stage, { background: 'transparent' })
  const S0 = T.hero, S1 = T.talk + 0.05, g = G.founder
  const ch = (VERT ? 960 : 800) * U, cw = ch * (g.b[2] - g.b[0]) / (g.b[3] - g.b[1])
  const FX = VERT ? W / 2 : W * 0.33, FY = VERT ? 690 : H / 2
  const cam = el('div', { position: 'absolute', left: FX + 'px', top: FY + 'px', width: 0, height: 0, perspective: 3000 * U + 'px' }, root)
  const rig = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d' }, cam)
  const c = card(rig, g, cw, '255,189,246')
  // holo shimmer travelling round the founders border
  const ring = el('div', { position: 'absolute', inset: 0, borderRadius: g.r * cw + 'px', pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.6,
    padding: (0.034 * cw) + 'px', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }, c.box)
  const halo = el('div', { position: 'absolute', left: FX - 700 * U + 'px', top: FY - 700 * U + 'px', width: 1400 * U + 'px', height: 1400 * U + 'px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(255,214,250,0.45), rgba(180,92,255,0.18) 50%, rgba(180,92,255,0) 100%)' }, root)
  root.insertBefore(halo, cam)
  const layout = VERT ? { left: 0, width: W + 'px', top: 1330 * U + 'px' } : { left: W * 0.585 + 'px', width: W * 0.4 + 'px', top: 300 * U + 'px' }
  const k = kara(root, [[['When', 12.55], ['you', 12.8]], [['both', 13.05], ['align,', 13.4]], [['the', 14.0], ['photo', 14.3], ['drops.', 14.75]]],
    { size: (VERT ? 104 : 100) * U, layout, align: VERT ? 'center' : 'left', eyebrow: ['✦ FOUNDERS EDITION', 12.4] })
  // fall path (offset from the focus point): fast in, slow-motion hang, fast out
  const top0 = -(FY + ch / 2 + 80 * U), drift = 50 * U, bot = H - FY + ch / 2 + 80 * U
  const fall = (t) => {
    if (t < SLOW[0]) return { y: lerp(top0, -drift, prog(t, S0, SLOW[0])), fast: 1 }
    if (t < SLOW[1]) return { y: lerp(-drift, drift, prog(t, SLOW[0], SLOW[1])), fast: 0 }
    return { y: lerp(drift, bot, ease.inQuad(prog(t, SLOW[1], T.talk))), fast: 1 }
  }
  return {
    start: S0, end: S1, root,
    update(t) {
      const { y, fast } = fall(t)
      const pIn = prog(t, S0, SLOW[0]), pS = prog(t, SLOW[0], SLOW[1]), pOut = prog(t, SLOW[1], T.talk)
      const rz = t < SLOW[0] ? lerp(-22, -4, pIn) : t < SLOW[1] ? lerp(-4, 3, pS) : lerp(3, 18, pOut)
      const rx = t < SLOW[0] ? lerp(35, 6, pIn) : t < SLOW[1] ? 6 * Math.cos(pS * Math.PI) : lerp(-6, -30, pOut)
      const ry = t < SLOW[0] ? 30 * (1 - pIn) - 18 * pIn : t < SLOW[1] ? -18 + 34 * Math.sin(pS * Math.PI * 0.5) : lerp(16, 30, pOut)
      // landing punch at the start of the slow motion
      const hit = t >= SLOW[0] ? Math.exp(-(t - SLOW[0]) * 6) : 0
      rig.style.transform = `translateY(${y}px) rotateZ(${rz}deg) rotateX(${rx}deg) rotateY(${ry * (VERT ? 0.6 : 1)}deg) scale(${1 + 0.05 * hit})`
      rig.style.filter = fast && (t < SLOW[0] - 0.03 || pOut > 0.25) ? `blur(${3 * U}px)` : 'none'
      c.glow.style.opacity = String(0.4 + 0.5 * env(t, 3))
      ring.style.background = `conic-gradient(from ${(clk(t) * 260) % 360}deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.95) 16deg, rgba(255,255,255,0) 38deg, rgba(255,255,255,0) 360deg)`
      sweep(c.glint, cw, prog(t, SLOW[0] + 0.3, SLOW[0] + 2.3))
      halo.style.opacity = String(t < SLOW[0] ? 0 : (0.55 + 0.35 * env(t, 3)) * (1 - pOut))
      halo.style.transform = `scale(${1 + 0.1 * hit}) translateY(${y * 0.4}px)`
      k.update(t, SLOW[1] + 0.2)
    },
    fx(ctx, t) {
      // keep Juniper's card clear: bursts either side of it, reflections skip it
      burst(ctx, t, SLOW[0], FX - cw * 0.85, FY - ch * 0.2, 777, 26, 1.0)
      burst(ctx, t, SLOW[0] + 0.08, FX + cw * 0.85, FY + ch * 0.15, 778, 26, 1.0)
      mirrorBall(ctx, t, 1, 0.9, [FX - cw * 0.6, FY - ch * 0.62 + fall(t).y, cw * 1.2, ch * 1.24])
    },
  }
}

function talkShot(stage) {
  const root = fill(stage, { background: 'transparent' })
  const S0 = T.talk, S1 = T.end + 0.05
  const set = [talk(1), talk(4), G.daily, talk(6), talk(2)]
  const cw = (VERT ? 228 : 255) * U, spread = (VERT ? 162 : 280) * U, arc = (VERT ? 22 : 26) * U
  const cx = W / 2, cy = VERT ? 790 : 420
  const fan = el('div', { position: 'absolute', left: cx + 'px', top: cy + 'px', width: 0, height: 0, perspective: 2400 * U + 'px' }, root)
  const cards = set.map((g, i) => { const c = card(fan, g, cw * (i === 2 ? 1.18 : 1), '242,199,92'); return { ...c, d: i - 2, w: cw * (i === 2 ? 1.18 : 1) } })
  cards[2].box.style.zIndex = '5'; cards[1].box.style.zIndex = cards[3].box.style.zIndex = '3'
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (VERT ? 330 : 46) * U + 'px', textAlign: 'center', fontFamily: MONO, fontSize: (VERT ? 32 : 26) * U + 'px', letterSpacing: '0.34em', textIndent: '0.34em', color: GOLD, opacity: 0, textShadow: '0 0 20px rgba(8,4,24,0.9)' }, root, '✦ THE TALK DECK ✦')
  const k = kara(root, VERT ? [[['Then', 16.5], ['you', 17.0], ['talk', 17.5]], [['in', 18.0], ['cards.', 18.5]]] : [[['Then', 16.5], ['you', 17.0], ['talk', 17.5], ['in', 18.0], ['cards.', 18.5]]],
    { size: (VERT ? 130 : 120) * U, layout: { left: 0, width: W + 'px', top: (VERT ? 1260 : 800) * U + 'px' } })
  return {
    start: S0, end: S1, root,
    update(t) {
      const e = env(t), out = ease.inCubic(prog(t, T.end - 0.25, T.end))
      eyebrow.style.opacity = String(Math.min(prog(t, S0 + 0.1, S0 + 0.4), 1 - out))
      cards.forEach((c, i) => {
        const at = S0 + Math.abs(c.d) * 0.08
        const p = ease.spring(prog(t, at, at + 0.7), 0.2)
        const myBeat = (Math.max(0, kix(t)) + i) % 2 === 0
        const dance = -hop(t) * (myBeat ? 30 : 10) * U
        // a spin on 19.0 (odd cards) and 19.5 (even cards)
        const spinAt = 19 + (i % 2 ? 0 : 0.5), spin = 360 * ease.inOutCubic(prog(t, spinAt - 0.05, spinAt + 0.4))
        const x = c.d * spread * p * (1 - out), y = (c.d * c.d * arc) * p + dance * p - (1 - p) * 40 * U
        const rot = c.d * 8 * p + (myBeat ? 3 : -3) * hop(t) + c.d * 30 * out
        c.box.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) rotateY(${spin}deg) scale(${lerp(0.2, 1, Math.min(1, p)) * (1 + 0.025 * e) * (1 - 0.8 * out)})`
        c.box.style.opacity = String(t >= at ? 1 - out : 0)
        c.glow.style.opacity = String(0.3 + 0.6 * e)
        sweep(c.glint, c.w, prog(t, S0 + 0.8 + i * 0.25, S0 + 1.8 + i * 0.25))
      })
      k.update(t, T.end - 0.05)
    },
    fx(ctx, t) {
      burst(ctx, t, S0, cx, cy, 555, 40, 1.3)
      mirrorBall(ctx, t, 0.4, 0.5)
    },
  }
}

function endCard(stage) {
  const root = fill(stage, { background: 'transparent' })
  const S0 = T.end
  const cy = VERT ? 760 : 340
  const S = (VERT ? 440 : 320) / 88
  const glow = el('div', { position: 'absolute', left: (W / 2 - 800 * U) + 'px', top: (cy - 700 * U) + 'px', width: 1600 * U + 'px', height: 1400 * U + 'px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(201,166,255,0.38), rgba(180,92,255,0) 100%)' }, root)
  const pool = el('div', { position: 'absolute', left: W / 2 - 900 * U + 'px', top: (cy + 44 * S - 60 * U) + 'px', width: 1800 * U + 'px', height: (VERT ? 640 : 520) * U + 'px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(11,6,32,0.8), rgba(11,6,32,0.5) 60%, rgba(11,6,32,0) 100%)', opacity: 0 }, root)
  const markBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: `${W / 2}px ${cy}px` }, root)
  const mark = markSVG(markBox, 88 * S, W / 2, cy, 'cm')
  const wy = cy + 44 * S + (VERT ? 30 : 16) * U
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: wy + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: (VERT ? 200 : 156) * U + 'px', lineHeight: 1, color: BONE, opacity: 0, textShadow: '0 0 50px rgba(239,230,214,0.3)' }, root, 'Align')
  const TAG = 'HOUSTON BETA'
  const tag = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (wy + (VERT ? 236 : 186) * U) + 'px', textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: (VERT ? 44 : 36) * U + 'px', letterSpacing: '0.42em', textIndent: '0.42em', color: GOLD, textShadow: '0 0 24px rgba(242,199,92,0.45)' }, root,
    [...TAG].map((ch) => `<span style="display:inline-block;opacity:0">${ch === ' ' ? '&nbsp;' : ch}</span>`).join(''))
  const letters = [...tag.querySelectorAll('span')]
  const k = kara(root, [[['Dating,', 21.5], ['dealt', 21.75], ['by', 22.0], ['the', 22.25], ['stars.', 22.5]]],
    { size: (VERT ? 76 : 66) * U, pool: false, layout: { left: 0, width: W + 'px', top: (wy + (VERT ? 330 : 260) * U) + 'px' } })
  return {
    start: S0, end: DURATION, root,
    update(t) {
      const lt = t - S0, e = t < T.last + 0.01 ? env(t) : env(t) * 1.6
      mark.draw(lt * 1.3, e)
      markBox.style.transform = `scale(${lerp(0.6, 1, ease.outBack(prog(lt, 0, 0.4))) * (1 + 0.035 * e)})`
      glow.style.opacity = String(ease.outQuad(prog(lt, 0.1, 0.8)) * (0.7 + 0.3 * e))
      pool.style.opacity = String(ease.outQuad(prog(lt, 0.3, 0.8)))
      const wp = prog(lt, 0.5, 0.8)
      word.style.opacity = String(prog(lt, 0.5, 0.55))
      word.style.transform = `translateY(${lerp(-80, 0, ease.outBack(wp)) * U}px) scale(${(wp < 1 ? lerp(1.3, 1, ease.outCubic(wp)) : 1) * (1 + 0.02 * e)})`
      letters.forEach((s, i) => { const p = prog(lt, 1.0 + i * 0.0625, 1.0 + i * 0.0625 + 0.12); s.style.opacity = String(p); s.style.transform = `translateY(${lerp(-24, 0, ease.outBack(p)) * U}px)` })
      k.update(t, DURATION + 1)
      root.style.transform = `scale(${1 + 0.025 * prog(lt, 0, DURATION - S0)})`
    },
    fx(ctx, t) {
      burst(ctx, t, S0, W / 2, cy, 901, 40, 1.4)
      burst(ctx, t, T.last, W / 2 - (VERT ? 330 : 520) * U, cy + 60 * U, 902, 30, 1.1)
      burst(ctx, t, T.last, W / 2 + (VERT ? 330 : 520) * U, cy + 60 * U, 903, 30, 1.1)
      rain(ctx, t, S0 + 0.3, DURATION, 904, 70)
      mirrorBall(ctx, t, 0.45, 0.4)
    },
  }
}

/** section flashes (bone white, very short) */
function flashLayer(stage) {
  const root = fill(stage, { background: '#fff4e6', opacity: 0, pointerEvents: 'none' })
  return {
    start: 0, end: DURATION, root,
    update(t) {
      let o = 0
      for (const f of FLASHES) if (t >= f) o = Math.max(o, (f === T.last ? 0.45 : 0.6) * Math.exp(-(t - f) * 11))
      root.style.opacity = String(o)
    },
  }
}

function fxLayer() {
  const cv = document.createElement('canvas'); cv.width = Math.ceil(W / PIX); cv.height = Math.ceil(H / PIX)
  const c = cv.getContext('2d')
  const parts = []
  return {
    add(s) { parts.push(s) },
    fx(ctx, t) {
      c.clearRect(0, 0, cv.width, cv.height)
      for (const s of parts) if (t >= s.start && t < s.end) s.fx(c, t)
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(cv, 0, 0, cv.width * PIX, cv.height * PIX)
    },
  }
}

const builders = [open, deck, grid, hero, talkShot, endCard]
export const SCENES = [
  bg,
  (stage) => {
    const layer = fxLayer()
    const built = builders.map((b) => b(stage))
    built.forEach((s, i) => { layer.add(s); s.root.style.zIndex = String(30 + i) })
    const fl = flashLayer(stage); fl.root.style.zIndex = '90'
    const parts = built.map((s) => ({ ...s, fx: undefined }))
    // a camera punch on every kick, for the whole film
    return {
      start: 0, end: DURATION, root: null,
      update(t) {
        for (const s of parts) { const on = t >= s.start && t < s.end; s.root.style.display = on ? 'block' : 'none'; if (on) s.update(t) }
        fl.update(t)
      },
      fx: layer.fx,
    }
  },
]

// sound cues (teaser-sound format) live in ../cues.js, built from KICKS and T
export { T }
export const CUES = []
