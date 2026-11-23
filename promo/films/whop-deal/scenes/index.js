// whop-deal · "Deal me in": Align Houston Beta product-page film, 128 bpm, 16:9 (or 9:16 with &v)
// The stars are the dealer. Every beat lands something: a word, a slam, a flash, a zoom punch.
//   beats  0–8    "The stars have aligned in Space City." dealt in word by word, one per beat, gold slam on "City."
//   beats  8–20   the deck: two half-stacks whip in, riffle shuffle (16ths), spin cut, fan spread,
//                 three mystery cards flick in and SLAM (13, 14, 15) · "No photos until you align / Card first. Face last."
//   beats 20–28   a hand of talk cards fans open, the Empress pops and spins 360 · "Then you talk in cards."
//   beats 28–40   Juniper's mystery card spins in, slow-motion flip (music drops out) → founders card, holo flash on 32
//                 · "It's mutual / Both align. Then you see them."
//   beats 40–52   seven chakra-lit card backs wheel round, collapse → flash → the Align mark, "Align", HOUSTON BETA,
//                 "Dating, dealt by the stars."
import { clamp, lerp, prog, ease, rng, el } from '../../../src/lib.js'
import { W, H, VERT, A, SERIF, MONO, fill, spaceBackdrop, img } from '../../../src/scenes/common.js'

export const BPM = 128
const B = 60 / BPM, T0 = 0.3
/** time of beat n (beat 0 = the first word) */
export const bt = (n) => T0 + n * B
export const DURATION = +(bt(52) + 0.9).toFixed(2)

const BONE = '#efe6d6', GOLD = '#f2c75c'
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
const SPARKS = ['#f2c75c', '#fff4cf', '#ffbdf6', '#c9b6f0', '#efe6d6']
const U = Math.min(W, H) / 1080
const sine = (x) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(x))

// ── card geometry (body box inside the glow padding of each PNG) ──
const G = {
  back: { src: 'card-back.png', iw: 1528, ih: 2347, b: [120, 119, 1440, 2227], r: 0.075 },
  maya: { src: 'card-profile-1.png', iw: 1496, ih: 2237, b: [120, 114, 1374, 2115], r: 0.067 },
  juni: { src: 'card-profile-3.png', iw: 1496, ih: 2237, b: [120, 114, 1374, 2115], r: 0.067 },
  ari: { src: 'card-profile-4.png', iw: 1496, ih: 2237, b: [120, 114, 1374, 2115], r: 0.067 },
  founder: { src: 'card-founder-juniper.png', iw: 2992, ih: 4466, b: [240, 218, 2748, 4223], r: 0.075 },
  ...Object.fromEntries([1, 2, 3, 5, 6].map((i) => [`talk${i}`, { src: `card-talk-${i}.png`, iw: 744, ih: 1194, b: [60, 60, 684, 1134], r: 0.075 }])),
}
const bodyH = (g, w) => w * (g.b[3] - g.b[1]) / (g.b[2] - g.b[0])

/** one card face clipped to its body, `w` wide, with a glint band to sweep */
function face(parent, g, w, h = bodyH(g, w), style = {}) {
  const k = w / (g.b[2] - g.b[0]), kh = h / (g.b[3] - g.b[1])
  const f = el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', borderRadius: g.r * w + 'px', overflow: 'hidden', ...style }, parent)
  img(f, A + g.src, { left: -g.b[0] * k + 'px', top: -g.b[1] * kh + 'px', width: g.iw * k + 'px', height: g.ih * kh + 'px' })
  const glint = el('div', { position: 'absolute', top: '-30%', height: '160%', width: (w * 0.34) + 'px', left: 0, mixBlendMode: 'screen', opacity: 0,
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,246,232,0.12) 30%, rgba(255,250,240,0.6) 50%, rgba(255,246,232,0.12) 70%, rgba(255,255,255,0) 100%)' }, f)
  return { face: f, glint }
}
const sweep = (gl, w, p) => { gl.style.opacity = p > 0 && p < 1 ? String(Math.sin(Math.PI * p)) : '0'; gl.style.transform = `translateX(${lerp(-w * 0.5, w * 1.2, p)}px) skewX(-18deg)` }

/** a card centred on the parent's origin: place it with translate(x, y) */
function card(parent, g, w, { glow = 'rgba(214,170,255,0.30)', back = null } = {}) {
  const h = bodyH(g, w)
  const box = el('div', { position: 'absolute', left: -w / 2 + 'px', top: -h / 2 + 'px', width: w + 'px', height: h + 'px', willChange: 'transform', transformStyle: back ? 'preserve-3d' : 'flat' }, parent)
  const shade = el('div', { position: 'absolute', inset: 0, borderRadius: g.r * w + 'px', boxShadow: `0 0 ${40 * U}px ${5 * U}px ${glow}, 0 ${30 * U}px ${70 * U}px rgba(4,2,14,0.65)`, backfaceVisibility: back ? 'hidden' : 'visible' }, box)
  const f = face(box, g, w, h, back ? { backfaceVisibility: 'hidden' } : {})
  let bf = null
  if (back) {
    bf = face(box, back, w, h, { backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' })
    el('div', { position: 'absolute', inset: 0, borderRadius: back.r * w + 'px', boxShadow: `0 0 ${40 * U}px ${5 * U}px ${glow}`, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', zIndex: -1 }, box)
  }
  return { box, w, h, shade, ...f, backFace: bf }
}
const put = (c, x, y, rot = 0, s = 1, extra = '') => { c.box.style.transform = `translate(${x}px, ${y}px) ${extra} rotate(${rot}deg) scale(${s})` }

// ── pixel stars (same sprites + 15fps stepping as the beta site) ──
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
/** a burst of pixel stars from (x, y) screen px at time t0 */
function burst(ctx, t, b) {
  const dt = Math.floor((t - b.t) * 15) / 15
  if (dt < 0 || dt > 1.2) return
  const r = rng(b.seed), px = b.x / PIX, py = b.y / PIX, sp = (b.speed || 1) * U * 6 / PIX
  if (b.ring && dt < 0.5) { pring(ctx, px, py, (6 + dt * 260) * sp, dt < 0.25 ? '#fff4cf' : GOLD); if (dt > 0.07) pring(ctx, px, py, (3 + (dt - 0.07) * 190) * sp, '#ffbdf6') }
  for (let i = 0; i < b.n; i++) {
    const a = r() * Math.PI * 2, v = (30 + r() * 70) * sp, life = 0.45 + r() * 0.6, c = (b.colors || SPARKS)[Math.floor(r() * (b.colors || SPARKS).length)]
    const k = 1 - dt / life
    if (k <= 0 || (k < 0.3 && Math.floor(t * 15) % 2)) continue
    const x = px + Math.cos(a) * v * dt * (1 - 0.35 * dt), y = py + Math.sin(a) * v * dt * (1 - 0.35 * dt) + 18 * sp * dt * dt
    pstar(ctx, x, y, k > 0.7 ? 3 : k > 0.4 ? 2 : 1, c)
  }
}

// ── the Align mark (copied from the whop film) ──
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
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(lt, i * 0.03, 0.4 + i * 0.03)))))
      halos.forEach((c, i) => { const p = ease.outCubic(prog(lt, 0.05 + i * 0.04, 0.4 + i * 0.04)); c.setAttribute('r', String(11 * p)); c.setAttribute('opacity', String(p)) })
      cores.forEach((c, i) => { const p = prog(lt, 0.05 + i * 0.04, 0.35 + i * 0.04); c.setAttribute('r', String(p < 0.6 ? 5.5 * p / 0.6 : lerp(5.5, 3.7, (p - 0.6) / 0.4))) })
    },
  }
}

// ── kinetic type: words dealt in like cards ──
const GOLD_TEXT = { background: 'linear-gradient(100deg, #c8962e 0%, #f2c75c 28%, #fff4cf 46%, #f2c75c 62%, #c8962e 100%)', backgroundSize: '220% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }
/**
 * lines: [[ [text, beat, gold?], ... ], ...]; returns { box, words: [{ e, at, gold }] }
 * size in px; align 'center' | 'left'
 */
function dealt(parent, lines, { size, align = 'center', layout, lh = 1.06, eyebrow, eyebrowAt }) {
  const box = el('div', { position: 'absolute', textAlign: align, ...layout }, parent)
  // a soft night pool behind the words keeps them readable over anything
  const pool = el('div', { position: 'absolute', left: -160 * U + 'px', right: -160 * U + 'px', top: -110 * U + 'px', bottom: -110 * U + 'px', zIndex: -1, opacity: 0, background: 'radial-gradient(closest-side, rgba(11,6,32,0.72), rgba(11,6,32,0.45) 60%, rgba(11,6,32,0) 100%)' }, box)
  let eb = null
  if (eyebrow) eb = el('div', { fontFamily: MONO, fontWeight: 700, fontSize: (VERT ? 30 : 26) * U + 'px', letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', marginBottom: 18 * U + 'px', textShadow: '0 0 18px rgba(8,4,24,0.9)', opacity: 0 }, box, eyebrow)
  const words = []
  lines.forEach((ln) => {
    const row = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: size + 'px', lineHeight: lh, whiteSpace: 'nowrap' }, box)
    ln.forEach(([txt, at, gold], i) => {
      if (i) row.appendChild(document.createTextNode(' '))
      const e = el('span', { display: 'inline-block', opacity: 0, color: '#fff6ea', textShadow: gold ? 'none' : '0 0 30px rgba(8,4,24,0.85), 0 2px 3px rgba(4,2,14,0.5)', ...(gold ? GOLD_TEXT : {}), ...(gold && gold !== true ? { fontSize: gold + 'px' } : {}) }, row, txt)
      words.push({ e, at, gold: !!gold, k: words.length })
    })
  })
  return { box, words, eb, eyebrowAt, pool }
}
/** deal one word: flicked in over 0.15s, lands exactly on its beat, little bounce after */
function dealWord(w, t) {
  const { e, at, k, gold } = w
  if (t < at - 0.16) { e.style.opacity = '0'; return }
  const p = prog(t, at - 0.16, at), q = ease.outCubic(p), dir = k % 2 ? 1 : -1
  const bump = Math.sin(Math.PI * prog(t, at, at + 0.2))
  e.style.opacity = String(Math.min(1, p * 3))
  e.style.transform = `translate(${dir * (1 - q) * 220 * U}px, ${-(1 - q) * 70 * U}px) rotate(${dir * (1 - q) * -26}deg) scale(${lerp(1.7, 1, q) + 0.08 * bump})`
  const shadow = gold ? ' drop-shadow(0 0 22px rgba(242,199,92,0.45)) drop-shadow(0 0 30px rgba(8,4,24,0.9))' : ''
  e.style.filter = (p < 1 ? `blur(${(1 - q) * 7}px)` : '') + shadow || 'none'
  if (gold) e.style.backgroundPosition = `${lerp(110, -10, prog(t, at, at + 0.9))}% 0`
}
function dealAll(d, t) {
  const first = Math.min(...d.words.map((w) => w.at), d.eyebrowAt ?? Infinity)
  d.pool.style.opacity = String(prog(t, first - 0.2, first + 0.2))
  d.words.forEach((w) => dealWord(w, t))
  if (d.eb) { const p = ease.outCubic(prog(t, d.eyebrowAt - 0.1, d.eyebrowAt + 0.2)); d.eb.style.opacity = String(p); d.eb.style.letterSpacing = lerp(0.6, 0.3, p) + 'em' }
}
/** word centre in stage px (measured once, before any transform) */
function centreOf(e, stage) {
  const r = e.getBoundingClientRect(), s = stage.getBoundingClientRect(), k = window.__stageScale || 1
  return [(r.left + r.width / 2 - s.left) / k, (r.top + r.height / 2 - s.top) / k]
}

// ── beat FX: zoom punches, shakes, flashes, pixel bursts ──
const PUNCH = [[0, 0.012], [1, 0.012], [2, 0.012], [3, 0.012], [4, 0.012], [5, 0.012], [6, 0.05], [7, 0.025], [8, 0.03], [11, 0.03], [12, 0.03], [13, 0.04], [14, 0.04], [15, 0.045],
  [16, 0.015], [17, 0.015], [18, 0.03], [20, 0.025], [22, 0.015], [23, 0.02], [25, 0.04], [26, 0.02], [29, 0.05], [32, 0.07], [34, 0.015], [36, 0.03], [44, 0.06], [45, 0.03], [46, 0.015], [47, 0.01], [48, 0.015]]
const SHAKE = [[6, 14], [8, 8], [13, 12], [14, 12], [15, 14], [25, 9], [29, 14], [32, 10], [44, 12]]
const FLASH = [[6, 0.35, '255,236,190'], [8, 0.12, '255,240,220'], [13, 0.12, '255,200,240'], [14, 0.12, '255,220,240'], [15, 0.14, '200,230,255'], [25, 0.14, '255,230,180'], [29, 0.2, '255,220,250'], [32, 0.8, '255,248,236'], [44, 0.7, '255,246,232']]
function camera(t) {
  let s = 1, x = 0, y = 0
  for (const [b, a] of PUNCH) { const d = t - bt(b); if (d >= 0 && d < 0.6) s += a * Math.exp(-d * 9) }
  for (const [b, a] of SHAKE) { const d = t - bt(b); if (d >= 0 && d < 0.4) { const k = a * U * Math.exp(-d * 12); x += k * Math.sin(d * 70 + b); y += k * Math.cos(d * 55 + b * 2) } }
  return { s, x, y }
}
function flashAt(t) {
  let best = 0, col = '255,246,232'
  for (const [b, a, c] of FLASH) { const d = t - bt(b); if (d >= -0.03 && d < 0.5) { const v = a * (d < 0 ? 1 + d / 0.03 : Math.exp(-d * 8)); if (v > best) { best = v; col = c } } }
  return [best, col]
}

// ───────────────────────────────────────────── scenes
/** slow-mo time warp for the background during the hero flip (beats 29.5–32 run at 30%) */
const warp = (t) => t - 0.7 * clamp(t - bt(29.5), 0, bt(32) - bt(29.5))

function bg(stage) {
  const root = fill(stage, { background: '#0b0620' })
  const space = spaceBackdrop(root, 'aurora', { seed: 17, grain: 0.16, stars: 260 })
  const pulse = fill(root, { background: 'radial-gradient(70% 60% at 50% 50%, rgba(201,166,255,0.22), rgba(180,92,255,0) 70%)', mixBlendMode: 'screen', opacity: 0 })
  const deep = fill(root, { background: 'radial-gradient(85% 70% at 50% 48%, rgba(11,6,32,0) 0%, rgba(11,6,32,0.6) 100%)' })
  return {
    start: 0, end: DURATION, root,
    update(t) {
      const tw = warp(t)
      space.update(tw * 0.8)
      space.root.style.transform = `scale(${1.05 + 0.1 * tw / DURATION}) translateY(${-tw * 2}px)`
      // the room breathes on the kick (not during the slow-mo)
      const n = Math.floor((t - T0) / B), since = t - bt(n)
      const drive = (n >= 0 && n < 29) || (n >= 32 && n < 50)
      pulse.style.opacity = String(drive ? 0.9 * Math.exp(-since * 7) : 0)
      void deep
    },
  }
}

function film(stage) {
  const root = fill(stage, { background: 'transparent' })
  const world = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: '50% 50%' }, root)
  const layer = (z) => el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', zIndex: String(z) }, world)
  const shots = []
  const bursts = []
  let measured = false
  const toMeasure = []

  // ─── A · opener: "The stars have aligned in Space City." (beats 0–8) ───
  {
    const L = layer(10)
    const big = VERT ? 132 : 128, gold = VERT ? 164 : 172
    const lines = VERT
      ? [[['The', 0], ['stars', 1]], [['have', 2], ['aligned', 3]], [['in', 4], ['Space', 5, gold], ['City.', 6, gold]]]
      : [[['The', 0], ['stars', 1], ['have', 2], ['aligned', 3]], [['in', 4], ['Space', 5, gold], ['City.', 6, gold]]]
    const lb = lines.map((ln) => ln.map(([s, b, g]) => [s, bt(b), g]))
    const d = dealt(L, lb, { size: big * U, lh: 1.12, layout: { left: 0, width: W + 'px', top: (VERT ? H * 0.5 - 330 * U : H * 0.5 - 175 * U) + 'px' } })
    // the last row ("in Space City.") stacks Space and City on one line: break before "Space" in 16:9? no, keep
    d.words.forEach((w) => toMeasure.push(w))
    shots.push({
      start: 0, end: bt(8.2), root: L,
      update(t) {
        dealAll(d, t)
        // beat 7: punch; 7.5 → 8: whip away up and out
        const o = ease.inCubic(prog(t, bt(7.45), bt(8)))
        d.box.style.transform = `translateY(${-o * 260 * U}px) scale(${1 + 0.5 * o})`
        d.box.style.opacity = String(1 - o)
        d.box.style.filter = o > 0 ? `blur(${o * 14}px)` : 'none'
      },
    })
  }

  // ─── B · the deck: riffle, cut, fan, three mystery slams (beats 8–20) ───
  {
    const L = layer(20)
    const BW = (VERT ? 270 : 260) * U, PX = W / 2, PY = VERT ? H * 0.42 : H * 0.47
    const N = 16, rr = rng(5)
    const pile = Array.from({ length: N }, (_, i) => ({ c: card(L, G.back, BW), side: i % 2 ? 1 : -1, k: Math.floor(i / 2), jit: (rr() - 0.5) * 6, dep: bt(8) + i * B / 8 }))
    const R = (VERT ? 470 : 640) * U, FA = VERT ? 30 : 42
    // three mystery cards: dealt from the stars, flipping back → face in flight
    const MW = (VERT ? 290 : 320) * U, MH = bodyH(G.maya, MW), GAP = (VERT ? 318 : 400) * U, RY = VERT ? H * 0.38 : H * 0.41
    const minis = [G.maya, G.juni, G.ari].map((g, j) => ({ c: card(L, g, MW, { back: G.back, glow: ['rgba(255,120,190,0.40)', 'rgba(214,150,255,0.45)', 'rgba(90,200,255,0.40)'][j] }), j, at: bt(13 + j), x: PX + (j - 1) * GAP, rot: [-5, 0, 5][j],
      from: [[-W * 0.35, RY + H * 0.25, -220], [PX, -H * 0.45, 200], [W * 1.35, RY + H * 0.2, 240]][j] }))
    const cap = dealt(L, VERT
      ? [[['Card', bt(15.5)], ['first.', bt(16)]], [['Face', bt(17)], ['last.', bt(17.5), true]]]
      : [[['Card', bt(15.5)], ['first.', bt(16)], ['Face', bt(17)], ['last.', bt(17.5), true]]],
    { size: (VERT ? 104 : 96) * U, eyebrow: 'No photos until you align', eyebrowAt: bt(15), layout: { left: 0, width: W + 'px', top: (RY + MH / 2 + (VERT ? 70 : 52) * U) + 'px' } })
    const deckEb = dealt(L, [], { size: 10, eyebrow: '✦ Tonight’s deck ✦', eyebrowAt: bt(10), layout: { left: 0, width: W + 'px', top: (PY - BW * 0.8 - (VERT ? 150 : 120) * U) + 'px' } })
    shots.push({
      start: bt(7.4), end: bt(20.2), root: L,
      update(t) {
        // pile cards
        const spin = ease.inOutCubic(prog(t, bt(10), bt(11)))
        const spinPunch = Math.sin(Math.PI * prog(t, bt(10), bt(11)))
        const fan = ease.outExpo(prog(t, bt(12) - 0.03, bt(12) + 0.32))
        pile.forEach((p, i) => {
          const { c, side, k, jit, dep } = p
          // in their half-stacks
          const inP = ease.outCubic(prog(t, bt(7.45), bt(8)))
          let x = PX + side * BW * 0.95 + side * (1 - inP) * W * 0.7, y = PY + k * 2.6 * U - (1 - inP) * 80 * U, rot = side * 10 + side * (1 - inP) * 30, s = 1, z = 50 - k
          // riffle into the middle (16ths)
          const rp = ease.outCubic(prog(t, dep, dep + 0.11))
          if (t >= dep) {
            const px = PX, py = PY - i * 2.2 * U
            x = lerp(x, px, rp); y = lerp(y, py, rp) - 50 * U * Math.sin(Math.PI * rp); rot = lerp(rot, jit, rp); z = 100 + i
          }
          // spin cut on beat 10
          rot += 360 * spin; s *= 1 + 0.14 * spinPunch
          // fan spread on beat 12
          if (fan > 0) {
            const a = lerp(-FA, FA, i / (N - 1)) * Math.PI / 180
            const fx = PX + R * Math.sin(a), fy = PY + R - R * Math.cos(a)
            x = lerp(x, fx, fan); y = lerp(y, fy, fan); rot = lerp(rot, a * 180 / Math.PI, fan); z = 100 + i
          }
          // the fan drops away as the first mystery card lands
          const dp = ease.inCubic(prog(t, bt(12.85) + i * 0.012, bt(13.25) + i * 0.012))
          y += dp * H * 0.9; rot += dp * (i - 7.5) * 4
          put(c, x, y, rot, s)
          c.box.style.zIndex = String(z)
          c.box.style.opacity = String(1 - prog(dp, 0.7, 1))
          c.box.style.filter = inP < 1 ? `blur(${(1 - inP) * 8}px)` : 'none'
          sweep(c.glint, BW, prog(t, bt(12.3) + i * 0.025, bt(12.3) + i * 0.025 + 0.35))
        })
        // mystery cards: flick in, flip, SLAM on 13 / 14 / 15
        minis.forEach((m) => {
          const { c, j, at, x, rot, from } = m
          const t0 = at - 0.32
          if (t < t0) { c.box.style.opacity = '0'; return }
          c.box.style.opacity = '1'
          const fp = ease.outQuad(prog(t, t0, at - 0.06))
          const slam = ease.inQuad(prog(t, at - 0.06, at))
          let px = lerp(from[0], x, fp), py = lerp(from[1], RY, fp), r = lerp(from[2], rot, fp)
          let s = lerp(1.35, 1.22, fp) - 0.22 * slam - 0.035 * Math.sin(Math.PI * prog(t, at, at + 0.16))
          const flip = 180 * (1 - ease.outCubic(prog(t, t0, at - 0.08)))
          // hold: gentle float and glints, punch on 18
          const lt = t - at
          if (lt > 0) { py += -8 * U * Math.sin(lt * 2.4 + j * 1.3); r += 1.2 * Math.sin(lt * 1.7 + j) }
          // out on 19.5: flicked up and away, one after another
          const o = ease.inCubic(prog(t, bt(19.4) + j * 0.06, bt(20) + j * 0.06))
          py -= o * H * 1.0; r += o * (j - 1) * 50; px += o * (j - 1) * 220 * U
          put(m.c, px, py, r, s, `perspective(${1800 * U}px) rotateY(${flip}deg)`)
          c.box.style.zIndex = String(200 + j)
          c.box.style.filter = fp < 1 ? `blur(${(1 - fp) * 6}px)` : 'none'
          sweep(c.glint, MW, prog(t, bt(16.5) + j * 0.12, bt(16.5) + j * 0.12 + 0.6))
          if (t > bt(18)) sweep(c.glint, MW, prog(t, bt(18) + j * 0.1, bt(18) + j * 0.1 + 0.5))
        })
        dealAll(cap, t)
        dealAll(deckEb, t)
        deckEb.box.style.opacity = String(1 - prog(t, bt(12.6), bt(13)))
        const co = ease.inCubic(prog(t, bt(19.3), bt(19.8)))
        cap.box.style.opacity = String(1 - co); cap.box.style.transform = `translateY(${co * 60 * U}px)`
      },
    })
    bursts.push({ t: bt(8), x: PX - BW, y: PY, n: 10, seed: 3 }, { t: bt(8), x: PX + BW, y: PY, n: 10, seed: 4 })
    minis.forEach((m) => { bursts.push({ t: m.at, x: m.x - MW * 0.55, y: RY + MH * 0.45, n: 12, seed: 40 + m.j, colors: [GOLD, '#fff4cf', CHAKRAS[2 + m.j * 2]] }, { t: m.at, x: m.x + MW * 0.55, y: RY - MH * 0.45, n: 12, seed: 50 + m.j }) })
  }

  // ─── C · the talk deck: a hand fans open, the Empress spins up (beats 20–28) ───
  {
    const L = layer(30)
    const TW = (VERT ? 260 : 250) * U, TH = bodyH(G.talk2, TW)
    const HX = VERT ? W / 2 : W * 0.34, HY = VERT ? H * 0.37 : H * 0.53, R = (VERT ? 600 : 640) * U
    const ANG = VERT ? [-21, -10.5, 0, 10.5, 21] : [-26, -13, 0, 13, 26]
    const hand = [G.talk3, G.talk6, G.talk2, G.talk5, G.talk1].map((g, k) => ({ c: card(L, g, TW, { glow: 'rgba(242,199,92,0.30)', back: k === 2 ? G.back : null }), k }))
    const cap = dealt(L, [[['Then', bt(21)], ['you', bt(21.5)], ['talk', bt(22)]], [['in', bt(22.5)], ['cards.', bt(23), true]]],
      { size: (VERT ? 112 : 112) * U, align: VERT ? 'center' : 'left', eyebrow: 'The talk deck', eyebrowAt: bt(20.5),
        layout: VERT ? { left: 0, width: W + 'px', top: (HY + TH * 0.5 + 150 * U) + 'px' } : { left: W * 0.6 + 'px', top: (H * 0.5 - 170 * U) + 'px' } })
    shots.push({
      start: bt(19.6), end: bt(28.2), root: L,
      update(t) {
        const rise = ease.outCubic(prog(t, bt(19.55), bt(20)))
        const out = ease.inCubic(prog(t, bt(27.4), bt(28)))
        hand.forEach(({ c, k }) => {
          const op = ease.outBack(prog(t, bt(20) + k * B / 4, bt(20) + k * B / 4 + 0.3))
          const a = ANG[k] * op * Math.PI / 180
          let x = HX + R * Math.sin(a), y = HY + R - R * Math.cos(a) + (1 - rise) * H * 0.8, rot = a * 180 / Math.PI + (1 - rise) * (k - 2) * 6, s = 1, extra = ''
          const lt = t - bt(20)
          if (lt > 0) y += -6 * U * Math.sin(lt * 2 + k)
          if (k === 2) {
            // pop up out of the hand and spin a full turn, slam on 25
            const up = ease.outCubic(prog(t, bt(24), bt(24.4)))
            const spinP = ease.outCubic(prog(t, bt(24), bt(25)))
            y -= up * (VERT ? 150 : 120) * U; s = 1 + 0.3 * up - 0.06 * Math.sin(Math.PI * prog(t, bt(25), bt(25.25)))
            extra = `perspective(${1800 * U}px) rotateY(${360 * spinP}deg)`
            // out: zooms past the camera
            s *= 1 + 2.5 * out; y -= out * 120 * U
            c.box.style.opacity = String(1 - prog(out, 0.5, 1))
            c.box.style.zIndex = '10'
          } else {
            y += out * H * 0.9; rot += out * (k - 2) * 10
            c.box.style.zIndex = String(k < 2 ? k : 6 - k)
            c.box.style.filter = `brightness(${1 - 0.35 * ease.outQuad(prog(t, bt(24), bt(24.5)))})`
          }
          put(c, x, y, rot, s, extra)
          sweep(c.glint, TW, prog(t, bt(21) + k * 0.08, bt(21) + k * 0.08 + 0.5))
          if (k === 2 && t > bt(25)) sweep(c.glint, TW, prog(t, bt(25.5), bt(26.5)))
        })
        dealAll(cap, t)
        cap.box.style.opacity = String(1 - out); cap.box.style.transform = `translateX(${out * (VERT ? 0 : 200) * U}px) translateY(${out * (VERT ? 120 : 0) * U}px)`
      },
    })
    bursts.push({ t: bt(25), x: HX, y: HY - (VERT ? 150 : 120) * U - TH * 0.65, n: 18, seed: 61, colors: [GOLD, '#fff4cf', '#ffd23f'] })
  }

  // ─── D · the reveal: Juniper's mystery card spins in, slow-mo flip to her founders card (beats 28–40) ───
  const D = (() => {
    const L = layer(40)
    const DW = (VERT ? 580 : 460) * U, DH = bodyH(G.founder, DW)
    const DX = VERT ? W / 2 : W * 0.34, DY = VERT ? H * 0.405 : H * 0.5
    const c = card(L, G.juni, DW, { back: G.founder, glow: 'rgba(214,170,255,0.40)' })
    // holo: a rainbow sheen over the founders face, and a white highlight running round its border
    const holo = el('div', { position: 'absolute', inset: 0, borderRadius: G.founder.r * DW + 'px', mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none',
      background: 'linear-gradient(125deg, rgba(255,45,58,0.6), rgba(255,210,63,0.6) 25%, rgba(95,220,84,0.55) 45%, rgba(47,208,230,0.6) 65%, rgba(180,92,255,0.65) 85%)' }, c.backFace.face)
    const ring = el('div', { position: 'absolute', inset: 0, borderRadius: G.founder.r * DW + 'px', pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.65,
      padding: (0.036 * DW) + 'px', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }, c.backFace.face)
    const cap = dealt(L, VERT
      ? [[['Both', bt(32.5)], ['align.', bt(33), true]], [['Then', bt(34)], ['you', bt(34.5)], ['see', bt(35)], ['them.', bt(35.5)]]]
      : [[['Both', bt(32.5)], ['align.', bt(33), true]], [['Then', bt(34)], ['you', bt(34.5)]], [['see', bt(35)], ['them.', bt(35.5)]]],
    { size: (VERT ? 100 : 110) * U, align: VERT ? 'center' : 'left', eyebrow: '✦ It’s mutual', eyebrowAt: bt(32.2),
      layout: VERT ? { left: 0, width: W + 'px', top: (DY + DH * 0.55 + 80 * U) + 'px' } : { left: W * 0.585 + 'px', top: (H * 0.5 - 250 * U) + 'px' } })
    const endY = VERT ? 700 : 370
    shots.push({
      start: bt(27.6), end: bt(40.1), root: L,
      update(t) {
        // whip in from deep space, spinning; SLAM on 29
        const t0 = bt(28) - 0.12
        const ip = ease.outCubic(prog(t, t0, bt(29) - 0.07)), slam = ease.inQuad(prog(t, bt(29) - 0.07, bt(29)))
        let s = lerp(0.12, 1.14, ip) - 0.14 * slam, rz = lerp(-720, -4, ip), ry = 0, x = DX, y = DY
        // anticipation lift, then the slow-motion flip (29.5 → 32)
        const lift = ease.outCubic(prog(t, bt(29), bt(29.6)))
        s += 0.05 * lift; rz = lerp(rz, 0, lift)
        ry = 180 * sine(prog(t, bt(29.5), bt(31.97)))
        // flip lands: punch
        s -= 0.07 * Math.sin(Math.PI * prog(t, bt(32), bt(32.3)))
        // slow push + drift while the caption deals
        const lt = t - bt(32)
        if (lt > 0) { s += 0.08 * ease.outQuad(prog(t, bt(32), bt(38.5))); ry += 5 * Math.sin(lt * 1.3); rz += 1.5 * Math.sin(lt * 0.9); y += -8 * U * Math.sin(lt * 1.8) }
        // out: spins down into the centre of the end wheel
        const o = ease.inCubic(prog(t, bt(38.6), bt(40)))
        x = lerp(x, W / 2, o); y = lerp(y, VERT ? H * 0.45 : H * 0.5, o); s *= lerp(1, 0.1, o); rz += 540 * o
        put(c, x, y, rz, s, `perspective(${2400 * U}px) rotateY(${ry}deg)`)
        c.box.style.opacity = String(Math.min(prog(t, t0, t0 + 0.08), 1 - prog(o, 0.8, 1)))
        c.box.style.filter = ip < 1 ? `blur(${(1 - ip) * 8}px)` : 'none'
        holo.style.opacity = String(0.85 * Math.exp(-Math.max(0, t - bt(32)) * 3.5) * (t > bt(31.6) ? 1 : 0))
        holo.style.backgroundPosition = `${lt * 40}% 0`
        ring.style.background = `conic-gradient(from ${(lt * 110) % 360}deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.95) 16deg, rgba(255,255,255,0) 40deg, rgba(255,255,255,0) 180deg, rgba(255,255,255,0.7) 196deg, rgba(255,255,255,0) 220deg, rgba(255,255,255,0) 360deg)`
        sweep(c.glint, DW, prog(t, bt(29.6), bt(30.6)))
        sweep(c.backFace.glint, DW, t < bt(34.5) ? prog(t, bt(32.6), bt(33.8)) : prog(t, bt(36), bt(37.2)))
        dealAll(cap, t)
        const co = ease.inCubic(prog(t, bt(38.4), bt(39)))
        cap.box.style.opacity = String(1 - co); cap.box.style.filter = co > 0 ? `blur(${co * 10}px)` : 'none'
        void endY
      },
    })
    bursts.push({ t: bt(29), x: DX, y: DY + DH * 0.5, n: 22, seed: 71 },
      { t: bt(32), x: DX, y: DY, n: 0, seed: 72, ring: true, speed: 1.6 },
      { t: bt(32), x: DX - DW * 0.55, y: DY - DH * 0.5, n: 22, seed: 73, speed: 1.3, colors: [...CHAKRAS, '#fff4cf'] },
      { t: bt(32), x: DX + DW * 0.55, y: DY + DH * 0.5, n: 22, seed: 74, speed: 1.3, colors: [...CHAKRAS, '#fff4cf'] })
    return { DX, DY, DW, DH }
  })()

  // ─── E · the end: chakra wheel of cards → flash → the Align mark (beats 40–52) ───
  {
    const L = layer(50)
    const S = (VERT ? 420 : 300) / 88, cy = VERT ? 740 : 340
    const EW = (VERT ? 170 : 140) * U, RR = (VERT ? 360 : 300) * U
    const wheel = CHAKRAS.map((col, k) => ({ c: card(L, G.back, EW, { glow: col + 'cc' }), k, at: bt(40) + k * B / 2 }))
    const glow = el('div', { position: 'absolute', left: (W / 2 - 800 * U) + 'px', top: (cy - 700 * U) + 'px', width: 1600 * U + 'px', height: 1400 * U + 'px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
      background: 'radial-gradient(closest-side, rgba(201,166,255,0.38), rgba(180,92,255,0) 100%)' }, L)
    const mark = markSVG(L, 88 * S, W / 2, cy, 'dm')
    const wy = cy + 44 * S + (VERT ? 34 : 14)
    const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: wy + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: (VERT ? 190 : 150) * U + 'px', lineHeight: 1, color: BONE, textShadow: '0 0 50px rgba(239,230,214,0.3)', opacity: 0 }, L, 'Align')
    const tag = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (wy + (VERT ? 220 : 172) * U) + 'px', textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: (VERT ? 40 : 32) * U + 'px', letterSpacing: '0.42em', textIndent: '0.42em', color: GOLD, textShadow: '0 0 24px rgba(242,199,92,0.45)', opacity: 0 }, L, 'HOUSTON BETA')
    const line = dealt(L, [[['Dating,', bt(47)], ['dealt', bt(47.5)], ['by', bt(48)], ['the', bt(48.25)], ['stars.', bt(48.5), true]]],
      { size: (VERT ? 74 : 66) * U, layout: { left: 0, width: W + 'px', top: (wy + (VERT ? 310 : 245) * U) + 'px' } })
    const lockup = [mark.m, word, tag, line.box, glow]
    const lock = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: `${W / 2}px ${cy + 120 * U}px` }, L)
    lockup.forEach((e) => lock.appendChild(e))
    shots.push({
      start: bt(39.6), end: DURATION, root: L,
      update(t) {
        // the wheel: cards appear on 8ths, orbit faster and faster, collapse into the mark on 44
        const lt = t - bt(40), col = ease.inExpo(prog(t, bt(43.4), bt(44)))
        const ccx = W / 2, ccy = lerp(VERT ? H * 0.45 : H * 0.5, cy, col)
        wheel.forEach(({ c, k, at }) => {
          const ap = ease.outBack(prog(t, at - 0.05, at + 0.22))
          if (t < at - 0.05 || col >= 1) { c.box.style.opacity = '0'; return }
          const a = (k * 360 / 7 - 90 + 110 * lt + 160 * lt * lt) * Math.PI / 180
          const r = RR * ap * (1 - col)
          put(c, ccx + Math.cos(a) * r, ccy + Math.sin(a) * r * (VERT ? 1 : 0.92), a * 180 / Math.PI + 90, lerp(0.2, 1, Math.min(ap, 1)) * (1 - 0.8 * col))
          c.box.style.opacity = String(Math.min(1, ap * 2) * (1 - prog(col, 0.85, 1)))
          c.box.style.zIndex = String(k)
        })
        const ml = t - bt(44)
        mark.draw(ml)
        mark.m.style.opacity = String(prog(ml, 0, 0.05))
        mark.m.style.transform = `scale(${1 + 0.25 * Math.exp(-Math.max(0, ml) * 8) * (ml > 0 ? 1 : 0)})`
        glow.style.opacity = String(ease.outQuad(prog(ml, 0.1, 1.0)))
        // "Align" slams on 45
        const wp = prog(t, bt(45) - 0.14, bt(45)), wq = ease.outCubic(wp)
        word.style.opacity = String(Math.min(1, wp * 3)); word.style.transform = `scale(${lerp(1.8, 1, wq) + 0.05 * Math.sin(Math.PI * prog(t, bt(45), bt(45) + 0.2))})`; word.style.filter = wp < 1 ? `blur(${(1 - wq) * 10}px)` : 'none'
        const tp = ease.outCubic(prog(t, bt(46) - 0.1, bt(46) + 0.25))
        tag.style.opacity = String(tp); tag.style.letterSpacing = lerp(0.9, 0.42, tp) + 'em'
        dealAll(line, t)
        lock.style.transform = `scale(${1 + 0.04 * prog(t, bt(45), DURATION)})`
      },
    })
    bursts.push({ t: bt(44), x: W / 2, y: cy, n: 56, seed: 91, ring: true, speed: 1.9, colors: [...CHAKRAS, '#fff4cf', GOLD] },
      { t: bt(45), x: W / 2 - 300 * U, y: wy + 70 * U, n: 10, seed: 92 }, { t: bt(45), x: W / 2 + 300 * U, y: wy + 70 * U, n: 10, seed: 93 })
  }

  // flash + final fade overlays
  const flash = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', zIndex: '90', mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none' }, root)
  const black = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', zIndex: '95', background: '#000', opacity: 1, pointerEvents: 'none' }, root)

  // pixel layer (coarse canvas, blown up onto #fx)
  const pcv = document.createElement('canvas'); pcv.width = Math.ceil(W / PIX); pcv.height = Math.ceil(H / PIX)
  const pctx = pcv.getContext('2d')
  const tr = rng(77)
  const twinkles = Array.from({ length: 34 }, () => ({ x: tr() * W, y: tr() * H, c: SPARKS[Math.floor(tr() * 5)], ph: Math.floor(tr() * 6), per: 1.4 + tr() * 2.2, off: tr() * 3 }))

  return {
    start: 0, end: DURATION, root,
    update(t) {
      if (!measured) {
        measured = true
        for (const w of toMeasure) { const [x, y] = centreOf(w.e, root); bursts.push({ t: w.at, x, y, n: w.gold ? (w.at === bt(6) ? 40 : 14) : 7, seed: 100 + w.k, speed: w.at === bt(6) ? 1.6 : 0.8, ring: w.at === bt(6), colors: w.gold ? [GOLD, '#fff4cf', '#ffd23f'] : SPARKS }) }
      }
      for (const s of shots) {
        const on = t >= s.start && t < s.end
        s.root.style.display = on ? 'block' : 'none'
        if (on) s.update(t)
      }
      const cam = camera(t)
      world.style.transform = `translate(${cam.x}px, ${cam.y}px) scale(${cam.s})`
      const [fa, fc] = flashAt(t)
      flash.style.opacity = String(fa)
      flash.style.background = `radial-gradient(75% 75% at 50% 50%, rgba(${fc},1), rgba(${fc},0.35) 60%, rgba(${fc},0.1))`
      black.style.opacity = String(Math.max(1 - ease.outQuad(prog(t, 0, 0.3)), ease.inQuad(prog(t, DURATION - 0.7, DURATION))))
    },
    fx(ctx, t) {
      pctx.clearRect(0, 0, pcv.width, pcv.height)
      const f = Math.floor(t * 15)
      const fade = 1 - prog(t, DURATION - 0.8, DURATION - 0.3)
      if (fade > 0) {
        const hero = t > bt(28.5) && t < bt(39.5)
        for (const s of twinkles) { const ph = ((t + s.off) % s.per) / s.per; if (ph > 0.4) continue
          if (hero && Math.abs(s.x - D.DX) < D.DW * 0.75 && Math.abs(s.y - D.DY) < D.DH * 0.7) continue; pstar(pctx, s.x / PIX, s.y / PIX, [0, 1, 2, 3, 2, 1][(f + s.ph) % 6], s.c) }
        for (const b of bursts) burst(pctx, t, b)
      }
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(pcv, 0, 0, pcv.width * PIX, pcv.height * PIX)
    },
  }
}

export const SCENES = [bg, film]

// ── sound cues (teaser-sound format) ──
const NOTES = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const clap = (b, g = 0.1) => [['tick', bt(b), g], ['tick', bt(b) + 0.009, g * 0.8], ['tick', bt(b) + 0.021, g * 0.9]]
const drive = (a, z) => { const out = []; for (let b = a; b < z; b++) { if (b % 2 === 1) out.push(...clap(b)); out.push(['tick', bt(b + 0.25), 0.022], ['tick', bt(b + 0.75), 0.03]) } return out }
export const CUES = [
  ['riser', 0, bt(0), 0.05],
  // opener: a pop per word, climbing; City. lands with a boom and glitter
  ...[0, 1, 2, 3, 4, 5].map((b, i) => ['pop', bt(b), NOTES[i] / 2, 0.07, (i % 2 ? 0.3 : -0.3)]),
  ['boom', bt(6), 0.42], ['glitter', bt(6), bt(6) + 0.8], ['bell', bt(6), 587.33, 0.05, 1.8, 0], ['bell', bt(6), 880, 0.04, 1.8, 0.2],
  ...clap(3, 0.06), ...clap(5, 0.07), ...clap(7),
  ['riser', bt(6.2), bt(8), 0.08],
  ['whoosh', bt(7.9), 0.5, 0.13], ['boom', bt(8), 0.2],
  // riffle: a tick per card on the 16ths
  ...Array.from({ length: 16 }, (_, i) => ['tick', bt(8) + i * B / 8 + 0.08, 0.1]),
  ['whoosh', bt(10.7), 0.6, 0.1], ['pop', bt(11), 440, 0.06],
  ['pop', bt(10), 1174.66, 0.04, 0.2],
  // the fan: a fast brrrp
  ...Array.from({ length: 16 }, (_, i) => ['tick', bt(12) - 0.02 + i * 0.018, 0.06]), ['whoosh', bt(12.1), 0.4, 0.09],
  // three slams
  ...[13, 14, 15].flatMap((b, j) => [['whoosh', bt(b) - 0.05, 0.35, 0.1], ['boom', bt(b), 0.26 + j * 0.03], ['pop', bt(b), [220, 247, 294][j], 0.08]]),
  ['glitter', bt(16.5), bt(17.4)],
  ...[15.5, 16, 17, 17.5].map((b, i) => ['pop', bt(b), NOTES[i + 2], 0.03, 0.2]),
  ['whoosh', bt(19.8), 0.5, 0.12],
  // talk hand
  ['whoosh', bt(20), 0.45, 0.1], ...[0, 1, 2, 3, 4].map((k) => ['pop', bt(20) + k * B / 4, NOTES[k], 0.06, (k - 2) * 0.25]),
  ...[21, 21.5, 22, 22.5, 23].map((b, i) => ['pop', bt(b), NOTES[i + 1], 0.03, -0.2]),
  ['whoosh', bt(24.6), 0.8, 0.1], ['boom', bt(25), 0.22], ['bell', bt(25), 739.99, 0.05, 1.6, 0.1], ['glitter', bt(25.5), bt(26.5)],
  // reveal
  ['whoosh', bt(27.9), 0.5, 0.13], ['riser', bt(27.6), bt(29), 0.07], ['whoosh', bt(28.8), 0.6, 0.1], ['boom', bt(29), 0.34],
  ['riser', bt(29.5), bt(32), 0.12], ['glitter', bt(30), bt(31.9)],
  ['bell', bt(29.6), 587.33, 0.03, 2.6, -0.3], ['bell', bt(30.6), 739.99, 0.03, 2.6, 0.3], ['bell', bt(31.4), 880, 0.03, 2.6, 0],
  ['boom', bt(32), 0.5], ['glitter', bt(32), bt(33.6)], ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', bt(32) + i * 0.03, f, 0.05, 2.4, (i - 1.5) * 0.2]),
  ...[32.5, 33, 34, 34.5, 35, 35.5].map((b, i) => ['pop', bt(b), NOTES[i % 7], 0.03, 0.2]),
  ['glitter', bt(36), bt(37)],
  ['whoosh', bt(39.6), 1.0, 0.12],
  // the wheel: a chakra bell on every 8th, a riser into the mark
  ...CHAKRAS.map((_, k) => ['bell', bt(40) + k * B / 2, [293.66, 329.63, 369.99, 440, 493.88, 554.37, 587.33][k] * 2, 0.04, 1.2, (k - 3) * 0.15]),
  ['riser', bt(40.5), bt(44), 0.12], ['whoosh', bt(43.95), 0.5, 0.12],
  ['boom', bt(44), 0.55], ['glitter', bt(44), bt(45.4)], ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', bt(44) + i * 0.05, f, 0.05, 2.4, (i - 3) * 0.12]),
  ['boom', bt(45), 0.22], ['bell', bt(45), 587.33, 0.05, 2.4, 0],
  ['pop', bt(46), 880, 0.05],
  ...[47, 47.5, 48, 48.25, 48.5].map((b, i) => ['pop', bt(b), NOTES[i + 1], 0.035, (i - 2) * 0.2]),
  ['bell', bt(48.5), 1174.66, 0.04, 2.6, 0], ['glitter', bt(48.5), bt(49.5)],
  ...drive(8, 29), ...drive(32, 44), ...[45, 47, 49].flatMap((b) => clap(b, 0.07)),
]
