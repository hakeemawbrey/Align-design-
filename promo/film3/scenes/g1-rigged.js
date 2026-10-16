// G1 · RIGGED (0–3.7s). Cold B&W, heavy grain, harsh.
// 0–1.8  "Dating is rigged."  — a rigged machine sorts five face cards: scrambled mono scores slam in (0.04–0.16), the
//         low ones are stamped HIDDEN (0.22) / NOT SHOWN (0.36) and shoved off, a BOOST $ tag (0.62) pumps a 3.4 to 9.9
//         and flies it to centre as RANK #1 (0.78–1.06); the 7.8 it bumps is dimmed, the honest 9.1 is stamped NOT SHOWN.
// 1.8–3.7 "And superficial." — hard cut: one face fills the frame, scan brackets + beauty-filter sliders snap over it,
//         "JUDGED IN 0.3s", swiped at 2.45; then a strip of scored faces blurs past faster and faster and slams to a stop
//         on the H1 card (p7, "SCORE 6.2") dead centre, held still 3.40–3.70. g2 draws the identical card from 3.40; g1 keeps the
//         frozen backdrop / vignette / grain under it until 3.70 (g2 paints no backdrop before its break at 3.667).
// Pure function of t. Backdrop / card look / grain tiles copied from film2 f1-old.js.
import { clamp, lerp, prog, ease, rng, noise1, el } from '../../src/lib.js'
import { W, H, IMG, SERIF, MONO, fill, img } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
const TOP_GRAIN = 0.7   // heavier than the shared ≈0.5: the dark cold plate swallows overlay grain (reads like films 1/2)

const BONE = '#efe6d6'
export const COLD_FILTER = 'grayscale(1) contrast(1.42) brightness(1.08)'
const PHOTO = i => `${IMG}people/p${i}.jpg`

// ── H1 handoff (g1 → g2, 3.40–3.70): the exact end state; g2 may import makeH1Card / H1 to draw it identically
export const H1 = { x: 960, y: 520, w: 440, h: 702, r: 22, face: 7, tag: 'SCORE 6.2', still: 3.40 }
const TAG_STYLE = { position: 'absolute', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: MONO, fontSize: '30px',
  letterSpacing: '0.12em', color: BONE, background: 'rgba(8,9,12,0.86)', border: '2px solid rgba(239,230,214,0.6)', borderRadius: '8px',
  padding: '4px 18px 3px', lineHeight: '40px' }

/** a cold B&W face card centred on its parent's origin (parent = a 0×0 holder you translate). Returns {card, ph, tag} */
export function makeColdCard(parent, face, w, h, r, tagText, tagFont = 30) {
  const card = el('div', { position: 'absolute', left: -w / 2 + 'px', top: -h / 2 + 'px', width: w + 'px', height: h + 'px', borderRadius: r + 'px',
    overflow: 'hidden', background: '#16191f', boxShadow: '0 30px 70px rgba(0,0,0,0.6)' }, parent)
  const ph = img(card, PHOTO(face), { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 34%', filter: COLD_FILTER })
  el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,14,0.25) 0%, rgba(8,10,14,0) 18%, rgba(8,10,14,0) 62%, rgba(8,10,14,0.55) 100%)' }, card)
  el('div', { position: 'absolute', inset: 0, borderRadius: r + 'px', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.10)' }, card)
  let tag = null
  if (tagText != null) tag = el('div', { ...TAG_STYLE, top: (h / 2 + 22) + 'px', fontSize: tagFont + 'px', lineHeight: Math.round(tagFont * 1.33) + 'px' }, parent, tagText)
  return { card, ph, tag }
}
/** the H1 card exactly as g1 leaves it at 3.40–3.70 (holder already placed at 960,520) */
export function makeH1Card(parent) {
  const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transform: `translate(${H1.x}px, ${H1.y}px)` }, parent)
  return { holder, ...makeColdCard(holder, H1.face, H1.w, H1.h, H1.r, H1.tag) }
}

// ── backdrop-only grain tiles (copied from f1-old.js)
const GRAIN_N = 6, GRAIN_TILE = 512
const cnv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
let GRAIN = null
function grainTiles() {
  if (GRAIN) return GRAIN
  const noiseTile = (S, seed, mean, amp) => {
    const c = cnv(S, S), x = c.getContext('2d'), id = x.createImageData(S, S), p = id.data, r = rng(seed)
    for (let i = 0; i < p.length; i += 4) { const g = (r() + r() + r() + r() - 2) * 0.5; p[i] = p[i + 1] = p[i + 2] = clamp(mean + g * amp) * 255; p[i + 3] = 255 }
    x.putImageData(id, 0, 0); return c
  }
  const wrapDraw = (dst, src, filter, alpha = 1) => {
    const T = GRAIN_TILE, big = cnv(T * 3, T * 3), bx = big.getContext('2d')
    for (let i = 0; i < 9; i++) bx.drawImage(src, (i % 3) * T, Math.floor(i / 3) * T, T, T)
    const dx = dst.getContext('2d'); dx.filter = filter; dx.globalAlpha = alpha
    dx.drawImage(big, -T, -T); dx.filter = 'none'; dx.globalAlpha = 1
  }
  GRAIN = Array.from({ length: GRAIN_N }, (_, n) => {
    const out = cnv(GRAIN_TILE, GRAIN_TILE)
    wrapDraw(out, noiseTile(GRAIN_TILE / 2, 3301 + n * 131, 0.46, 1.3), 'blur(0.5px) contrast(1.5)')
    wrapDraw(out, noiseTile(GRAIN_TILE, 4401 + n * 97, 0.46, 1.0), 'blur(0.35px)', 0.4)
    return out
  })
  return GRAIN
}
function grainLayer(parent, opacity) {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', opacity, pointerEvents: 'none' }, parent)
  c.width = W; c.height = H
  const gx = c.getContext('2d'), pats = grainTiles().map(t => gx.createPattern(t, 'repeat'))
  return {
    el: c,
    update(t) {
      const f = Math.round(t * 30), r = rng(f * 6151 + 3)
      const ox = Math.floor(r() * GRAIN_TILE), oy = Math.floor(r() * GRAIN_TILE)
      gx.setTransform(1, 0, 0, 1, -ox, -oy); gx.fillStyle = pats[f % GRAIN_N]; gx.fillRect(ox, oy, W, H); gx.setTransform(1, 0, 0, 1, 0, 0)
    },
  }
}

// ── cold backdrop: slate gradient + a blurred wall of faces scrolling (faster and faster, dead stop at H1.still)
const wallPos = t => { const tt = Math.min(t, H1.still); return 70 * tt + 30 * tt * tt * tt }
function coldBackdrop(parent) {
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden',
    background: 'radial-gradient(120% 100% at 50% 45%, #1b1f27 0%, #12151b 55%, #0a0c10 100%)' }, parent)
  const wall = el('div', { position: 'absolute', left: '-40px', top: 0, width: (W + 80) + 'px', height: H + 'px', filter: 'blur(4px) grayscale(1) brightness(0.8) contrast(1.2)', opacity: 0.26 }, root)
  const TW = 200, TH = 250, GAP = 14, COLS = 10, ROWS = 6, COLH = ROWS * (TH + GAP)
  const cols = Array.from({ length: COLS }, (_, c) => {
    const col = el('div', { position: 'absolute', left: c * (TW + GAP) + 'px', top: 0, width: TW + 'px', height: 2 * COLH + 'px' }, wall)
    for (let i = 0; i < ROWS * 2; i++) {
      const f = ((c * 5 + (i % ROWS) * 7) % 12) + 1
      const box = el('div', { position: 'absolute', left: 0, top: i * (TH + GAP) + 'px', width: TW + 'px', height: TH + 'px', borderRadius: '16px', overflow: 'hidden', background: '#222' }, col)
      img(box, PHOTO(f), { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
    }
    return { col, dir: c % 2 ? 1 : -1, off: (c * 137) % COLH, sp: 0.8 + (c % 3) * 0.15 }
  })
  el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 50% 48%, rgba(10,12,16,0.3) 0%, rgba(10,12,16,0.84) 70%, rgba(6,7,10,0.97) 100%)' }, root)
  return {
    root,
    update(t) {
      const p = wallPos(t)
      for (const c of cols) { const y = (c.off + p * c.sp) % COLH; c.col.style.transform = `translateY(${c.dir > 0 ? -y : y - COLH}px)` }
    },
  }
}

// horizontal motion-blur filters (copied from f1-old.js)
function blurDefs(parent, n, prefix) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.style.position = 'absolute'
  const blurs = []
  for (let i = 0; i < n; i++) {
    const f = document.createElementNS(svg.namespaceURI, 'filter')
    f.setAttribute('id', `${prefix}${i}`); f.setAttribute('x', '-50%'); f.setAttribute('width', '200%'); f.setAttribute('y', '-20%'); f.setAttribute('height', '140%')
    const g = document.createElementNS(svg.namespaceURI, 'feGaussianBlur'); g.setAttribute('stdDeviation', '0 0')
    f.appendChild(g); svg.appendChild(f); blurs.push(g)
  }
  parent.appendChild(svg)
  return blurs
}

/** words that punch in (opacity, drop, de-blur), staggered */
function words(parent, text, style, at, gap = 0.1) {
  const box = el('div', { position: 'absolute', whiteSpace: 'nowrap', ...style }, parent)
  const ws = text.split(' ').map((w, i) => ({ t: at + i * gap, e: el('span', { display: 'inline-block', marginRight: '0.22em', opacity: 0 }, box, w) }))
  return {
    box,
    update(t, out = 1) {
      for (const w of ws) {
        const p = prog(t, w.t, w.t + 0.12), e = ease.outCubic(p)
        w.e.style.opacity = String(e * out)
        w.e.style.transform = `translateY(${(1 - e) * -26}px) scale(${lerp(1.25, 1, e)})`
        w.e.style.filter = p < 1 ? `blur(${(1 - e) * 10}px)` : 'none'
      }
    },
  }
}

// ── act 1: the sorting machine
const CUT = 1.8                                    // hard cut to the face
const SLOT = i => 960 + (i - 2) * 362, ROW_Y = 612, CW = 326, CH = 470
const M = [   // face, score, land time, fate (dir 0 = stamped but stays in frame)
  { face: 6, score: 9.1, land: 0.04, stamp: 'NOT SHOWN', at: 1.14, dir: 0, honest: true },
  { face: 2, score: 4.1, land: 0.07, stamp: 'HIDDEN', at: 0.22, dir: -1 },
  { face: 3, score: 7.8, land: 0.10, bumped: true },
  { face: 11, score: 2.6, land: 0.13, stamp: 'NOT SHOWN', at: 0.36, dir: 1 },
  { face: 1, score: 3.4, land: 0.16, boost: true },
]
const BOOST_AT = 0.62, BOOST_COUNT = [0.66, 0.84], BOOST_FLY = [0.78, 1.06], CROWN_AT = 1.0
const HONEST_X = 400, BUMP_X = 1520, BOOST_RISE = 60, BOOST_S = 1.25, DIM = 0.35
const SHOVE_D = 0.3, SHOVE_LAG = 0.16

// ── act 2: the face + the blur strip
const HERO_FACE = 12, SWIPE = 2.45, SWIPE_D = 0.2
const SPACING = 560, S0 = -2.6, LAST_GAP = 660   // the H1 card trails the strip by an extra gap so it ends alone                      // strip coordinate: card k is centred when s = k
const STREAM_FACES = [5, 9, 4, 10, 8, 2, 11, 6, 12]
const K = STREAM_FACES.length                      // the H1 card is index K
const STREAM_SCORES = ['7.4', '5.9', '8.2', '4.6', '6.8', '3.9', '9.0', '5.1', '7.7', '6.0', '4.4', '8.6', '5.5', '7.1', '3.2', '6.6']
const ACC_END = 3.22, STOP = H1.still
// speed profile (cards/s, before normalising): accelerating, then a hard ease-out into the stop
const vRaw = t => t < SWIPE ? 0 : t < ACC_END ? 1.6 + 33.6 * Math.pow((t - SWIPE) / (ACC_END - SWIPE), 2.6)
  : t < STOP ? 35.2 * Math.pow(1 - (t - ACC_END) / (STOP - ACC_END), 2.4) : 0
const DT = 1 / 1200
const S_TAB = (() => {
  const n = Math.ceil((STOP - SWIPE) / DT) + 1, raw = new Float64Array(n + 1); let acc = 0
  for (let i = 1; i <= n; i++) { acc += vRaw(SWIPE + (i - 0.5) * DT) * DT; raw[i] = acc }
  const k = (K - S0) / raw[n]
  return { raw, k, n }
})()
const sAt = t => {
  if (t <= SWIPE) return S0
  if (t >= STOP) return K
  const f = (t - SWIPE) / DT, i = Math.floor(f), a = S_TAB.raw[i], b = S_TAB.raw[Math.min(i + 1, S_TAB.n)]
  return Math.min(K, S0 + lerp(a, b, f - i) * S_TAB.k)
}
const SL = [['SMOOTH', 0.92, 1.98], ['SLIM', 0.78, 2.04], ['EYES', 0.86, 2.10], ['JAW', 0.7, 2.16]]
const vAt = t => vRaw(t) * S_TAB.k                  // cards / s

export default function build(stage) {
  const root = fill(stage, { background: '#0a0c10' })
  const back = coldBackdrop(root)
  const backGrain = grainLayer(root, 0.55)          // extra harsh grain on the backdrop only
  const blurs = blurDefs(root, 8, 'g1mb')

  // ── act 1 DOM
  const act1 = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  const scan = el('div', { position: 'absolute', left: '80px', width: (W - 160) + 'px', top: 0, height: '3px', background: 'rgba(240,244,255,0.85)',
    boxShadow: '0 0 24px 6px rgba(220,230,255,0.35)', opacity: 0 }, act1)
  const mc = M.map((m, i) => {
    const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: String(10 + i) }, act1)
    const c = makeColdCard(holder, m.face, CW, CH, 18, 'SCORE 0.0', 28)
    let stamp = null, boost = null, crown = null
    if (m.stamp) stamp = el('div', { position: 'absolute', left: '50%', top: '-6px', transform: 'translate(-50%,-50%)', whiteSpace: 'nowrap', fontFamily: MONO, fontWeight: 700,
      fontSize: m.stamp.length > 7 ? '40px' : '50px', letterSpacing: '0.08em', color: '#f6f6f4', border: '6px solid #f6f6f4', borderRadius: '6px', padding: '2px 18px 0',
      background: 'rgba(6,7,10,0.55)', opacity: 0, boxShadow: '0 6px 30px rgba(0,0,0,0.6)' }, holder, m.stamp)
    if (m.boost) {
      boost = el('div', { position: 'absolute', left: (-CW / 2 - 30) + 'px', top: (-CH / 2 + 14) + 'px', whiteSpace: 'nowrap', fontFamily: MONO, fontWeight: 700, fontSize: '34px',
        letterSpacing: '0.06em', color: '#0a0b0e', background: '#f4f4f2', borderRadius: '6px 26px 26px 6px', padding: '6px 26px 4px 44px', opacity: 0,
        boxShadow: '0 10px 30px rgba(0,0,0,0.6)', transformOrigin: '20% 50%' }, holder,
        `<span style="position:absolute;left:14px;top:50%;width:14px;height:14px;margin-top:-7px;border-radius:50%;background:#0a0b0e"></span>BOOST $9.99`)
      crown = el('div', { position: 'absolute', left: (-CW / 2 + 16) + 'px', top: (-CH / 2 + 82) + 'px', whiteSpace: 'nowrap', fontFamily: MONO, fontWeight: 700,
        fontSize: '40px', lineHeight: '50px', letterSpacing: '0.1em', color: '#f6f6f4', background: 'rgba(6,7,10,0.82)', borderRadius: '6px', padding: '2px 14px 0',
        opacity: 0, boxShadow: '0 6px 24px rgba(0,0,0,0.6)', transformOrigin: '0 50%' }, holder, '▲ RANK #1')
    }
    return { holder, ...c, stamp, boost, crown }
  })

  // ── act 2 DOM: the hero face + overlays
  const act2 = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  const heroH = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: '5' }, act2)
  const HW = 860, HH = 1180
  const heroCard = el('div', { position: 'absolute', left: -HW / 2 + 'px', top: -HH / 2 + 'px', width: HW + 'px', height: HH + 'px', borderRadius: '28px', overflow: 'hidden',
    background: '#16191f', boxShadow: '0 40px 90px rgba(0,0,0,0.7)' }, heroH)
  const heroPh = img(heroCard, PHOTO(HERO_FACE), { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', filter: COLD_FILTER })
  el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,14,0.85) 0%, rgba(8,10,14,0.2) 22%, rgba(8,10,14,0) 50%, rgba(8,10,14,0.6) 100%)' }, heroCard)
  // scan brackets around the face (ride with the hero)
  const BX = 420, BY = 500, BCY = -80
  const brackets = el('div', { position: 'absolute', left: -BX / 2 + 'px', top: (BCY - BY / 2) + 'px', width: BX + 'px', height: BY + 'px', opacity: 0 }, heroH)
  const L = 70, T = 6
  for (const [h, v] of [['left', 'top'], ['right', 'top'], ['left', 'bottom'], ['right', 'bottom']]) {
    el('div', { position: 'absolute', [h]: 0, [v]: 0, width: L + 'px', height: T + 'px', background: '#f4f6fa' }, brackets)
    el('div', { position: 'absolute', [h]: 0, [v]: 0, width: T + 'px', height: L + 'px', background: '#f4f6fa' }, brackets)
  }
  el('div', { position: 'absolute', left: '50%', top: '50%', width: '34px', height: '2px', margin: '-1px 0 0 -17px', background: 'rgba(244,246,250,0.8)' }, brackets)
  el('div', { position: 'absolute', left: '50%', top: '50%', width: '2px', height: '34px', margin: '-17px 0 0 -1px', background: 'rgba(244,246,250,0.8)' }, brackets)
  el('div', { position: 'absolute', left: 0, top: (BY + 14) + 'px', whiteSpace: 'nowrap', fontFamily: MONO, fontSize: '26px', letterSpacing: '0.12em', color: '#f4f6fa' }, brackets, 'FACE SCAN · 0291')
  const bScan = el('div', { position: 'absolute', left: '8px', right: '8px', top: 0, height: '2px', background: 'rgba(240,244,255,0.9)', boxShadow: '0 0 18px 4px rgba(220,230,255,0.4)' }, brackets)
  // beauty-filter sliders (left panel)
  const panel = el('div', { position: 'absolute', left: '70px', top: '400px', width: '400px', padding: '26px 30px 10px', background: 'rgba(8,9,12,0.78)', border: '1.5px solid rgba(239,230,214,0.35)',
    borderRadius: '14px', opacity: 0, boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }, act2)
  el('div', { fontFamily: MONO, fontSize: '26px', letterSpacing: '0.14em', color: 'rgba(239,230,214,0.7)', marginBottom: '18px' }, panel, 'BEAUTY FILTER')
  const sliders = SL.map(([name, v, at]) => {
    const row = el('div', { position: 'relative', height: '62px' }, panel)
    el('div', { position: 'absolute', left: 0, top: 0, fontFamily: MONO, fontSize: '26px', letterSpacing: '0.1em', color: BONE }, row, name)
    const val = el('div', { position: 'absolute', right: 0, top: 0, fontFamily: MONO, fontSize: '26px', color: BONE }, row, '0%')
    el('div', { position: 'absolute', left: 0, right: 0, top: '42px', height: '4px', borderRadius: '2px', background: 'rgba(239,230,214,0.25)' }, row)
    const fillB = el('div', { position: 'absolute', left: 0, top: '42px', height: '4px', borderRadius: '2px', background: '#f4f4f2', width: '0px' }, row)
    const knob = el('div', { position: 'absolute', top: '35px', width: '18px', height: '18px', marginLeft: '-9px', borderRadius: '50%', background: '#f4f4f2', boxShadow: '0 0 12px rgba(255,255,255,0.5)' }, row)
    return { v, at, val, fillB, knob }
  })
  // black gradient over the photo's top so "And superficial." keeps its contrast (fades with the caption)
  const capShade = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: '260px', zIndex: '7', pointerEvents: 'none',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0) 100%)' }, act2)
  // readouts (right)
  const RO = [['ATTRACT', 6.4, 1, 2.0], ['SYMMETRY', 0.71, 2, 2.06], ['SKIN', 88, 0, 2.12], ['RANK', 41, 0, 2.18]]
  const ro = el('div', { position: 'absolute', left: '1460px', top: '410px', width: '390px', opacity: 0 }, act2)
  const reads = RO.map(([name, v, dp, at]) => {
    const row = el('div', { position: 'relative', height: '66px', borderBottom: '1.5px solid rgba(239,230,214,0.22)', marginBottom: '8px' }, ro)
    el('div', { position: 'absolute', left: 0, top: '14px', fontFamily: MONO, fontSize: '26px', letterSpacing: '0.12em', color: 'rgba(239,230,214,0.72)' }, row, name)
    const num = el('div', { position: 'absolute', right: 0, top: '6px', fontFamily: MONO, fontWeight: 700, fontSize: '38px', color: '#f6f6f4' }, row, '')
    return { v, dp, at, num, suf: name === 'RANK' ? '%' : '' }
  })
  // the strip of faces (+ the H1 card, index K)
  const strip = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, act2)
  const sc = Array.from({ length: K + 1 }, (_, k) => {
    const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, display: 'none' }, strip)
    const c = k === K ? makeColdCard(holder, H1.face, H1.w, H1.h, H1.r, H1.tag) : makeColdCard(holder, STREAM_FACES[k], H1.w, H1.h, H1.r, 'SCORE ' + STREAM_SCORES[k])
    return { holder, ...c }
  })
  // judge timer
  const timer = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '966px', textAlign: 'center', fontFamily: MONO, fontSize: '60px', letterSpacing: '0.06em',
    color: BONE, whiteSpace: 'pre', opacity: 0, zIndex: '8', textShadow: '0 2px 20px rgba(5,6,10,0.95)' }, act2)
  timer.innerHTML = 'JUDGED IN <b style="font-weight:700;color:#fff">0.3s</b>'

  // ── copy (top, centred, big)
  const CAP = { fontFamily: SERIF, fontStyle: 'italic', fontSize: '124px', color: BONE, lineHeight: 1, left: 0, width: W + 'px', textAlign: 'center', top: '58px',
    textShadow: '0 3px 34px rgba(4,5,8,0.95), 0 0 3px rgba(4,5,8,0.7)' }
  const capBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none', zIndex: '10' }, root)
  const capA = words(capBox, 'Dating is rigged.', CAP, -0.1, 0.1)
  const capB = words(capBox, 'And superficial.', CAP, 1.84, 0.12)

  // exposure flash / flicker, then the shared film grain (same as g2–g4, ≈0.5)
  const flash = el('div', { position: 'absolute', inset: 0, background: '#f2f4f8', opacity: 0, pointerEvents: 'none', zIndex: '20' }, root)
  const flick = el('div', { position: 'absolute', inset: 0, background: '#000', opacity: 0, pointerEvents: 'none', zIndex: '20' }, root)
  const gc = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(TOP_GRAIN), pointerEvents: 'none', zIndex: '30' })
  const gx = gc.getContext('2d')

  return {
    start: 0, end: 3.7, root,
    update(t) {
      const fr = Math.round(t * 30)
      back.update(t)
      const a1 = t < CUT
      act1.style.display = a1 ? 'block' : 'none'
      act2.style.display = a1 ? 'none' : 'block'

      if (a1) {
        // scanner sweeps the row while scores scramble (done by the last land)
        const sp = prog(t, -0.02, 0.18)
        scan.style.opacity = String(sp > 0 && sp < 1 ? 0.9 : 0)
        scan.style.top = lerp(360, 860, ease.inOutQuad(sp)) + 'px'
        // push-in so frame 0 is already moving; a slow triumphant creep 1.06–1.8
        const push = 1.04 - 0.04 * ease.outCubic(prog(t, 0, 0.4)) + 0.035 * ease.inOutQuad(prog(t, 1.06, CUT))
        act1.style.transform = `scale(${push})`; act1.style.transformOrigin = '960px 560px'
        M.forEach((m, i) => {
          const c = mc[i]
          let x = SLOT(i), y = ROW_Y, rot = 0, s = 1, op = 1, bl = 0, photo = 1, hop = 1
          // entry: drop in staggered, already mostly visible at frame 0
          const ein = ease.outCubic(prog(t, -0.1 + i * 0.02, 0.08 + i * 0.02))
          y += (1 - ein) * -40; op = clamp(0.4 + ein)
          // score text
          let txt
          if (t < m.land) { const r = rng(fr * 97 + i * 13); txt = (1 + r() * 8.9).toFixed(1) }
          else txt = m.score.toFixed(1)
          if (m.boost && t >= BOOST_COUNT[0]) { const u = prog(t, ...BOOST_COUNT); txt = (Math.round(lerp(3.4, 9.9, u) * 10) / 10).toFixed(1) }
          c.tag.textContent = 'SCORE ' + txt
          const landP = prog(t, m.land, m.land + 0.06)
          c.tag.style.transform = `translateX(-50%) scale(${lerp(1.4, 1, ease.outCubic(landP))})`
          let tagOp = t < m.land ? 0.7 : 1
          // stamp (text + border always at full opacity; only the photo dims) + shove
          let shoveU = 0
          if (m.stamp) {
            const p = prog(t, m.at, m.at + 0.07)
            c.stamp.style.opacity = String(clamp(p * 3))
            const srot = m.dir ? m.dir * -12 : -8
            c.stamp.style.transform = `translate(-50%,-50%) rotate(${srot}deg) scale(${lerp(2.0, 1, ease.outCubic(p))})`
            photo = lerp(1, m.dir ? 0.45 : DIM, p)
            if (m.dir) {
              const u = prog(t, m.at + SHOVE_LAG, m.at + SHOVE_LAG + SHOVE_D), e = u * u
              shoveU = u
              x += m.dir * (40 * u + 300 * e); y += 760 * e - 20 * Math.sin(Math.PI * u); rot = m.dir * 16 * e
              bl = 14 * u
              s *= 1 - 0.08 * u
            } else {
              // the honest top scorer: slam shake, and it stays in frame, buried
              const k = prog(t, m.at + 0.04, m.at + 0.2)
              x += (rng(fr * 53)() - 0.5) * 14 * (k > 0 && k < 1 ? 1 - k : 0)
            }
          }
          // the honest 9.1 slides inward as the row re-sorts
          if (m.honest) { const u = ease.inOutCubic(prog(t, ...BOOST_FLY)); x = lerp(SLOT(0), HONEST_X, u); s *= 1 - 0.04 * u }
          // the 7.8 at centre is bumped right and dimmed as the boosted card takes its place
          if (m.bumped) {
            const u = ease.inOutCubic(prog(t, BOOST_FLY[0] - 0.02, BOOST_FLY[1]))
            x = lerp(SLOT(2), BUMP_X, u); y += 24 * u; s *= 1 - 0.06 * u
            photo = lerp(1, DIM, u); tagOp = lerp(1, 0.5, u)
            bl = 6 * Math.sin(Math.PI * prog(t, BOOST_FLY[0] - 0.02, BOOST_FLY[1]))
          }
          // the boost: price tag slaps on, score pumps, card flies to centre, scales up and rises to RANK #1
          if (m.boost) {
            const p = prog(t, BOOST_AT, BOOST_AT + 0.08)
            c.boost.style.opacity = String(clamp(p * 3))
            c.boost.style.transform = `rotate(${lerp(-24, -6, ease.outBack(p))}deg) scale(${lerp(1.8, 1, ease.outCubic(p))})`
            const pump = prog(t, BOOST_COUNT[0], BOOST_COUNT[1])
            s *= 1 + 0.06 * Math.sin(pump * Math.PI * 4) * (1 - pump)
            const flp = prog(t, ...BOOST_FLY), fl = ease.inOutCubic(flp)
            x = lerp(SLOT(4), 960, fl); y -= BOOST_RISE * fl; s *= lerp(1, BOOST_S, fl)
            bl = 12 * Math.sin(Math.PI * flp)
            // triumphant: glow swells and breathes
            const glow = clamp(pump * 1.5) * (1 + 0.25 * fl + 0.2 * Math.sin((t - BOOST_FLY[1]) * 9) * prog(t, BOOST_FLY[1], BOOST_FLY[1] + 0.1))
            c.card.style.boxShadow = `0 30px 70px rgba(0,0,0,0.6), 0 0 ${80 * glow}px ${12 * glow}px rgba(240,244,255,${(0.38 * glow).toFixed(3)})`
            const cp = prog(t, CROWN_AT, CROWN_AT + 0.07)
            c.crown.style.opacity = String(clamp(cp * 3))
            c.crown.style.transform = `scale(${lerp(1.6, 1, ease.outCubic(cp))})`
          }
          c.holder.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${s})`
          c.holder.style.opacity = String(op * (1 - prog(shoveU, 0.7, 1)))
          c.holder.style.zIndex = m.boost ? '50' : String(10 + i)
          c.ph.style.filter = photo < 1 ? `${COLD_FILTER} brightness(${photo.toFixed(3)})` : COLD_FILTER
          c.tag.style.opacity = String(tagOp)
          let f = ''
          if (bl > 0.5) { blurs[i].setAttribute('stdDeviation', m.dir ? `${(bl * 0.4).toFixed(1)} ${bl.toFixed(1)}` : `${bl.toFixed(1)} ${(bl * 0.3).toFixed(1)}`); f = `url(#g1mb${i})` }
          c.holder.style.filter = f
        })
      } else {
        // ── act 2
        const hin = ease.outCubic(prog(t, CUT, CUT + 0.14))
        const sw = prog(t, SWIPE, SWIPE + SWIPE_D), swe = sw * sw
        const hx = 960 - swe * 1500, hrot = -14 * swe
        const hs = lerp(1.14, 1, hin) * (1 + 0.05 * prog(t, CUT, SWIPE))
        heroH.style.display = t < SWIPE + SWIPE_D ? 'block' : 'none'
        heroH.style.transform = `translate(${hx}px, ${600 - 60 * swe}px) rotate(${hrot}deg) scale(${hs})`
        // the beauty filter visibly applies as the sliders climb
        const beauty = ease.inOutQuad(prog(t, 1.98, 2.36))
        heroPh.style.filter = `${COLD_FILTER} blur(${(beauty * 1.4).toFixed(2)}px) brightness(${(1 + 0.12 * beauty).toFixed(3)})`
        const hbl = 40 * sw
        if (hbl > 0.5) { blurs[7].setAttribute('stdDeviation', `${hbl.toFixed(1)} ${(hbl * 0.1).toFixed(1)}`); heroCard.style.filter = 'url(#g1mb7)' } else heroCard.style.filter = ''
        // brackets snap
        const bp = prog(t, 1.92, 2.0)
        brackets.style.opacity = String(bp > 0 ? 1 : 0)
        const jit = t > 2.0 ? (rng(fr * 31)() - 0.5) * 6 * (1 - prog(t, 2.0, 2.2)) : 0
        brackets.style.transform = `translateX(${jit}px) scale(${lerp(1.5, 1, ease.outCubic(bp))})`
        const bs = prog(t, 2.0, 2.4)
        bScan.style.top = (BY * (0.5 - 0.5 * Math.cos(bs * Math.PI * 2))) + 'px'
        bScan.style.opacity = String(bs > 0 && bs < 1 ? 1 : 0)
        // panel + readouts snap in, snap off on the swipe
        // fade out 2.36–2.45, before the incoming strip reaches them
        const pin = ease.outCubic(prog(t, 1.94, 2.04)), pout = ease.outQuad(prog(t, 2.36, 2.45))
        panel.style.opacity = String(pin * (1 - pout)); panel.style.transform = `translateX(${(1 - pin) * -60 - pout * 40}px)`
        const rin = ease.outCubic(prog(t, 1.98, 2.08))
        ro.style.opacity = String(rin * (1 - pout)); ro.style.transform = `translateX(${(1 - rin) * 60 + pout * 40}px)`
        for (const s of sliders) {
          const u = ease.outCubic(prog(t, s.at, s.at + 0.22)), v = lerp(0.12, s.v, u)
          s.fillB.style.width = (340 * v) + 'px'; s.knob.style.left = (340 * v) + 'px'; s.val.textContent = Math.round(v * 100) + '%'
        }
        for (const r of reads) {
          const u = prog(t, r.at, r.at + 0.2)
          r.num.textContent = t < r.at ? '' : u < 1 ? (r.v * (0.3 + 0.7 * rng(fr * 7 + r.at * 100)())).toFixed(r.dp) + r.suf : r.v.toFixed(r.dp) + r.suf
        }
        // the strip
        const s = sAt(t), v = vAt(t), pxv = v * SPACING / 30
        let slot = 0
        sc.forEach((c, k) => {
          const x = 960 + (k - s) * SPACING - (k < K ? LAST_GAP : 0)
          if (t < SWIPE || x < -400 || x > W + 400) { c.holder.style.display = 'none'; return }
          c.holder.style.display = 'block'
          c.holder.style.transform = `translate(${x}px, ${H1.y}px)`
          const bl = Math.min(42, Math.max(0, pxv - 24) * 0.24)
          if (bl > 0.6 && slot < 6) { blurs[slot].setAttribute('stdDeviation', `${bl.toFixed(1)} ${(bl * 0.04).toFixed(1)}`); c.holder.style.filter = `url(#g1mb${slot})`; slot++ }
          else c.holder.style.filter = ''
        })
        // timer
        const tin = prog(t, 2.12, 2.2), tout = 1 - prog(t, 3.2, 3.32)
        timer.style.opacity = String(tin * tout)
        timer.style.transform = `scale(${lerp(1.3, 1, ease.outCubic(tin))})`
      }

      // copy: A on 0–1.8 (hard cut), B 1.84 → out by 3.36 so the H1 frame is clean
      capA.box.style.display = a1 ? 'block' : 'none'
      capA.update(t, 1)
      capB.box.style.display = a1 ? 'none' : 'block'
      const capBOut = 1 - ease.inQuad(prog(t, 3.22, 3.36))
      capB.update(t, capBOut)
      capShade.style.opacity = String(capBOut)

      // flashes: a decaying exposure kick on the boom and on the cut (≥ 3 frames, never a one-frame pop)
      const kick = (t0, a, d) => t >= t0 ? a * Math.exp(-(t - t0) / d) : 0
      // capped so the cut never more than ~+30 Y (QA: 0.24 took Y 42→86)
      flash.style.opacity = String(clamp(kick(0.22, 0.1, 0.08) + kick(CUT, 0.13, 0.08), 0, 0.14))
      // nervous exposure flicker, gone before the H1 hold
      const tempo = (0.4 + prog(t, 2.45, 3.2)) * (1 - prog(t, 3.25, 3.38))
      const fq = rng(fr * 4271 + 11), dip = fq() < 0.16 ? (0.015 + 0.02 * fq()) * tempo : 0
      flick.style.opacity = String(clamp((noise1(t * 7.3, 5) - 0.5) * 0.12 * tempo + dip, 0, 0.1))
      backGrain.update(t)
      drawGrain(gx, t)
    },
  }
}

// ── sound: boom on "rigged", ticks on score lands + stamps, whooshes on shoves / boost / swipes, accelerating strip ticks
export const cues = (() => {
  const out = [['boom', 0.22, 0.55], ['tick', 0.0, 0.08]]
  for (const m of M) out.push(['tick', m.land, 0.05])
  for (const m of M.filter(m => m.stamp)) {
    out.push(['tick', m.at, 0.16], ['tick', m.at + 0.03, 0.08])
    if (m.dir) out.push(['whoosh', m.at + SHOVE_LAG, 0.26, 0.12])
  }
  out.push(['tick', BOOST_AT, 0.18])
  for (let i = 0; i < 6; i++) out.push(['tick', BOOST_COUNT[0] + i * 0.03, 0.04])
  out.push(['whoosh', BOOST_FLY[0], 0.28, 0.16], ['tick', BOOST_FLY[1], 0.12], ['tick', CROWN_AT, 0.14], ['boom', M[0].at, 0.16])
  out.push(['boom', CUT, 0.22], ['tick', CUT, 0.14], ['tick', 1.92, 0.14])
  for (const [, , at] of SL) out.push(['tick', at, 0.05])
  out.push(['tick', 2.12, 0.1], ['whoosh', SWIPE, 0.26, 0.22], ['riser', 2.5, 3.38, 0.07])
  // a tick + small whoosh each time a face crosses centre (thinned once they get too dense)
  let last = -1
  for (let k = Math.ceil(S0); k < K; k++) {
    let lo = SWIPE, hi = STOP
    for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (sAt(mid) < k) lo = mid; else hi = mid }
    if (hi - last < 0.05) continue
    out.push(['tick', hi, 0.05], ['whoosh', hi - 0.04, 0.12, 0.05]); last = hi
  }
  out.push(['tick', STOP - 0.02, 0.2], ['boom', STOP - 0.02, 0.18])
  return out
})()
