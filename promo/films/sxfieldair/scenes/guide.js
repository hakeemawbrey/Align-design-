// guide.js — the FIRST-DATE FIELD GUIDE kit (Star Talk Shows, show 7). The same file sits in sxfieldfire, sxfieldearth,
// sxfieldair and sxfieldwater so all four episodes share one look: a pixel topo TRAIL MAP at night, a gold backpack
// star guide (ranger hat, bedroll pack, binoculars), a dotted trail with three numbered stops and a SUMMIT flag.
//
//   0.00–4.7   hook: the map unrolls, "Dating a | *<Element>* sign."  The guide spots the element's signs zooming across
//              the map like wildlife (binoculars). Box 1.
//   4.75–9.8   STOP 1 · WHERE TO GO     (whip-pan + zoom to pin 1; the episode's vignette; a "GO HERE" stamp)
//   9.85–15.4  STOP 2 · WHAT TO TALK ABOUT (pin 2; a TALK CARD prop; an "ASK THIS" stamp)
//   15.45–20.7 STOP 3 · WHAT TO SKIP    (pin 3; the thing to skip; a red "SKIP IT" stamp)
//   20.75–25.45 the SUMMIT: the guide plants a "2ND DATE" flag, the signs hop up; last line headline. Pops out by 25.45.
//   25.6       the shared end card.
// ♓ Pisces cries at PISCES POND in the background (the running gag). Show bug "FIELD GUIDE · <ELEMENT>" top-left.
// Each film passes a config (text, colours, its wildlife and three vignette drawers). Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 30
export const STORY_END = DURATION - ENDCARD_LEN          // 25.6
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MINT = '#7dffb0', RED = '#ff4f5e'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * 0.5556                // 108 bpm grid
export const SPEAK = 'THE GUIDE'
const PIS = signStar('pisces')

// ── the shared timeline (every episode runs on it)
export const T = {
  unroll: [0.05, 0.9], bug: 0.45,
  h0: 0.2, h0Land: 0.7, h0Out: [4.5, 4.7],
  guideIn: 0.6, binoc: [1.9, 4.4],
  wild: [1.35, 2.15, 2.95],                               // each wildlife star zooms across from here (0.9 s)
  box0: [1.0, 4.7], l1: 1.2,
  stops: [
    { pan: [4.75, 5.3], k: 5.0, h: 5.05, hLand: 5.4, hOut: [9.55, 9.78], box: [5.5, 9.75], l: 5.7, gag: [6.95, 7.5, 8.05], stamp: 8.62 },
    { pan: [9.85, 10.35], k: 10.1, h: 10.12, hLand: 10.47, hOut: [15.15, 15.38], box: [10.6, 15.3], l: 10.8, gag: [12.4, 12.95, 13.5], stamp: 14.1 },
    { pan: [15.45, 15.95], k: 15.66, h: 15.7, hLand: 16.05, hOut: [20.45, 20.68], box: [16.15, 20.65], l: 16.35, gag: [17.6, 18.15, 18.7], stamp: 18.72 },
  ],
  sum: { pan: [20.75, 21.4], box: [21.1, 24.65], l: 21.25, flag: 21.62, crew: 21.8, h: 22.4, hLand: 22.75, hOut: [25.0, 25.4] },
  out: [24.75, 25.45],
}
// card-cut candidates: the three whip-pans (cardfx keeps the middle one, 15.55, for a 30 s film)
export const CUTS = [9.98, 15.55, 20.88]

// ── map geometry (world px; the overview camera shows world = screen)
export const TH = { x: 540, y: 1360 }
export const WPS = [{ x: 330, y: 1180 }, { x: 700, y: 900 }, { x: 330, y: 640 }]
export const SUMMIT = { x: 690, y: 430 }
const POND = { x: 960, y: 1110 }
const CTRL = [TH, { x: 440, y: 1300 }, WPS[0], { x: 450, y: 1070 }, { x: 610, y: 1000 }, WPS[1], { x: 610, y: 790 }, { x: 440, y: 740 }, WPS[2], { x: 450, y: 545 }, { x: 590, y: 470 }, SUMMIT]
const Z = 1.45
const CAMS = [{ x: 540, y: 980, z: 1 }, ...WPS.map(w => ({ x: w.x + 40, y: w.y - 60, z: Z })), { x: 562, y: 606, z: 1.25 }]
const STAND = [{ x: 470, y: 1300 }, ...WPS.map(w => ({ x: w.x - 130, y: w.y + 40 })), { x: 474, y: 630 }]
// where an episode's featured star stands at each stop, and the vignette's centre (both relative to the pin)
export const FEAT = { dx: 150, dy: 60 }, VIG = { dx: 143, dy: -184 }
// the summit crew (world) — the signs pop up here for the last beat
export const CREW = [{ x: 650, y: 742 }, { x: 812, y: 690 }, { x: 330, y: 770 }]

// ── trail (Catmull-Rom through CTRL, sampled by arc length)
const TRAIL = (() => {
  const pts = []
  for (let i = 0; i < CTRL.length - 1; i++) {
    const p0 = CTRL[Math.max(0, i - 1)], p1 = CTRL[i], p2 = CTRL[i + 1], p3 = CTRL[Math.min(CTRL.length - 1, i + 2)]
    for (let k = 0; k < 24; k++) {
      const s = k / 24, s2 = s * s, s3 = s2 * s
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * s + (2 * a - 5 * b + 4 * c - d) * s2 + (-a + 3 * b - 3 * c + d) * s3)
      pts.push({ x: f(p0.x, p1.x, p2.x, p3.x), y: f(p0.y, p1.y, p2.y, p3.y) })
    }
  }
  pts.push({ ...CTRL[CTRL.length - 1] })
  let L = 0
  pts.forEach((p, i) => { if (i) L += Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y); p.l = L })
  const near = q => { let b = 0, bd = 1e9; pts.forEach((p, i) => { const d = Math.hypot(p.x - q.x, p.y - q.y); if (d < bd) { bd = d; b = i } }); return pts[b].l }
  return { pts, L, at: [0, ...WPS.map(near), L] }
})()

// ── small helpers
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.' || !cols[ch]) continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK], size = 22) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
/** canvas text, centred, with an ink drop shadow */
export function label(x, text, cx, cy, { size = 20, color = BONE, font = MONO, weight = 700, alpha = 1, align = 'center', shadow = true, spacing = 0 } = {}) {
  x.save(); x.globalAlpha *= alpha
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (spacing) x.letterSpacing = spacing + 'px'
  if (shadow) { x.fillStyle = 'rgba(8,5,22,0.85)'; x.fillText(text, cx + size * 0.08, cy + size * 0.1) }
  x.fillStyle = color; x.fillText(text, cx, cy)
  x.restore()
}
/** wrap words into lines no wider than w (canvas font must be set) */
export function wrap(x, text, w) {
  const out = []; let cur = ''
  for (const word of text.split(' ')) { const nx = cur ? cur + ' ' + word : word; if (x.measureText(nx).width > w && cur) { out.push(cur); cur = word } else cur = nx }
  if (cur) out.push(cur)
  return out
}
/** a pixel speech/thought bubble with text, popping in at t0 (out = fade) */
export function bubble(x, t, text, cx, cy, t0, { size = 22, out = 1, tail = -1, fillC = BONE, ink = INK, w: forceW } = {}) {
  const a = pop01(t, t0, 0.3, 2.4) * out
  if (a <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(a, a)
  x.font = `700 ${size}px ${MONO}`
  const tw = forceW || x.measureText(text).width, pw = tw + size * 1.2, ph = size * 1.9, c = 4
  x.fillStyle = INK
  x.fillRect(-pw / 2 - c, -ph / 2 + c, pw + 2 * c, ph - 2 * c); x.fillRect(-pw / 2, -ph / 2, pw, ph)
  x.fillStyle = fillC
  x.fillRect(-pw / 2, -ph / 2 + c, pw, ph - 2 * c); x.fillRect(-pw / 2 + c, -ph / 2 + c * 0, pw - 2 * c, ph - c * 0)
  x.fillStyle = INK; x.fillRect(-pw / 2 + c, -ph / 2, pw - 2 * c, c); x.fillRect(-pw / 2 + c, ph / 2 - c, pw - 2 * c, c)
  // tail (pixel steps toward the speaker)
  x.fillStyle = INK; x.fillRect(tail * pw * 0.25 - 8, ph / 2 - 2, 16, 12); x.fillRect(tail * pw * 0.25 + tail * 8 - 6, ph / 2 + 8, 12, 10)
  x.fillStyle = fillC; x.fillRect(tail * pw * 0.25 - 4, ph / 2 - 4, 8, 10); x.fillRect(tail * pw * 0.25 + tail * 8 - 2, ph / 2 + 6, 4, 8)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, size * 0.06)
  x.restore()
}

// ── pixel bits
const HAT = ['....CCCCCC....', '...CCCCCCCC...', '...CCCCCCCC...', '...BBBBBBBB...', 'bbbbbbbbbbbbbb', '.bbbbbbbbbbbb.']
const BINO = ['GGGGG.GGGGG', 'GKKKGGGKKKG', 'GKWKG.GKWKG', 'GKKKG.GKKKG', 'GGGGG.GGGGG']
const SHADES = ['KKKKKKKKKKKK', 'KWKKKKKKWKKK', '.KKKK..KKKK.', '..KK....KK..']
const PIN = ['.AAAAA.', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', '.AAAAA.', '..AAA..', '...A...']
const TREE = ['..g..', '.ggg.', '.gGg.', 'ggggg', '.gGg.', 'ggggg', '..t..']
const FLAGB = ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']

// ── the low-res map (6 world px per map pixel), baked once
const MP = 6, MX0 = -420, MY0 = -300, MW = 320, MH = 432
function hash2(i, j, s) { let h = (i * 374761393 + j * 668265263 + s * 1442695) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296 }
function vnoise(x, y, s) {
  const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy)
  return lerp(lerp(hash2(i, j, s), hash2(i + 1, j, s), u), lerp(hash2(i, j + 1, s), hash2(i + 1, j + 1, s), u), v)
}
const toM = p => ({ i: (p.x - MX0) / MP, j: (p.y - MY0) / MP })
function bakeMap(accent) {
  const c = document.createElement('canvas'); c.width = MW; c.height = MH
  const x = c.getContext('2d')
  const sm = toM(SUMMIT), pd = toM(POND)
  const H = (i, j) => {
    let h = vnoise(i / 46, j / 46, 3) * 0.62 + vnoise(i / 19, j / 19, 7) * 0.28 + vnoise(i / 8, j / 8, 11) * 0.1
    h += 0.9 * Math.exp(-((i - sm.i) ** 2 + (j - sm.j) ** 2) / (2 * 26 ** 2))
    return h
  }
  const lv = new Int16Array(MW * MH)
  for (let j = 0; j < MH; j++) for (let i = 0; i < MW; i++) lv[j * MW + i] = Math.floor(H(i, j) * 10)
  const img = x.createImageData(MW, MH), d = img.data
  const put = (i, j, [r, g, b]) => { if (i < 0 || j < 0 || i >= MW || j >= MH) return; const k = (j * MW + i) * 4; d[k] = r; d[k + 1] = g; d[k + 2] = b; d[k + 3] = 255 }
  for (let j = 0; j < MH; j++) for (let i = 0; i < MW; i++) {
    const L = lv[j * MW + i]
    let col = L % 2 ? [22, 17, 56] : [18, 14, 46]
    if ((i % 24 === 0 || j % 24 === 0) && (i + j) % 2 === 0) col = [32, 26, 74]                        // map grid
    if (i < MW - 1 && j < MH - 1 && (lv[j * MW + i + 1] !== L || lv[(j + 1) * MW + i] !== L)) col = L > 9 ? [70, 60, 128] : [46, 38, 98]   // contours
    put(i, j, col)
  }
  // mountain under the summit
  const mtn = (pi, pj, hgt, snow) => {
    for (let r = 0; r <= hgt; r++) {
      const hw = Math.round(r * 1.15)
      for (let k = -hw; k <= hw; k++) {
        const left = k < 0, edge = Math.abs(k) >= hw - 0
        let col = left ? [52, 44, 110] : [36, 30, 84]
        if (r < snow - ((k * 7 + r * 3) % 3)) col = left ? [222, 214, 246] : [170, 160, 214]
        if (edge) col = [14, 10, 34]
        put(pi + k, pj + r, col)
      }
    }
  }
  mtn(Math.round(sm.i) - 30, Math.round(sm.j) + 14, 26, 6)
  mtn(Math.round(sm.i) + 34, Math.round(sm.j) + 10, 30, 7)
  mtn(Math.round(sm.i), Math.round(sm.j), 38, 9)
  // pond
  for (let j = -9; j <= 9; j++) for (let i = -22; i <= 22; i++) {
    const e = (i / 21) ** 2 + (j / 8) ** 2
    if (e <= 1) put(Math.round(pd.i) + i, Math.round(pd.j) + j, e > 0.72 ? [70, 112, 190] : (i + j * 3) % 11 === 0 ? [150, 190, 245] : [38, 64, 132])
    else if (e <= 1.25) put(Math.round(pd.i) + i, Math.round(pd.j) + j, [14, 10, 34])
  }
  // trail bed
  for (const p of TRAIL.pts) { const m = toM(p); for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) put(Math.round(m.i) + a, Math.round(m.j) + b, [40, 32, 86]) }
  x.putImageData(img, 0, 0)
  // trees (avoid the trail, the pond, the mountain, the pins)
  let seed = 5
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
  const busy = (i, j) => {
    for (const p of TRAIL.pts) { const m = toM(p); if (Math.abs(m.i - i) < 8 && Math.abs(m.j - j) < 9) return true }
    if (((i - pd.i) / 28) ** 2 + ((j - pd.j) / 14) ** 2 < 1) return true
    if (Math.abs(i - sm.i) < 75 && j > sm.j - 6 && j < sm.j + 46) return true
    return false
  }
  const TC = { g: '#1d5a45', G: '#2f8a62', t: '#5a3a26' }
  for (let n = 0; n < 420; n++) {
    const i = Math.floor(rnd() * MW), j = Math.floor(rnd() * MH)
    if (busy(i, j)) continue
    drawBits(x, TREE, TC, i, j, 1, { outline: '#0c0820' })
  }
  return c
}

// ── the episode builder
export function fieldGuide(cfg) {
  const ACC = cfg.accent, ACC2 = cfg.accent2 || BONE
  const S = T.stops
  const LINES = [
    { t: T.l1, speaker: SPEAK, text: cfg.lines[0] },
    ...S.map((s, i) => ({ t: s.l, speaker: SPEAK, text: cfg.lines[i + 1] })),
    { t: T.sum.l, speaker: SPEAK, text: cfg.lines[4] },
  ]
  const BOXES = [T.box0, ...S.map(s => s.box), T.sum.box]
  const shots = [{ t: [0, 0], ...CAMS[0] }, ...S.map((s, i) => ({ t: s.pan, ...CAMS[i + 1] })), { t: T.sum.pan, ...CAMS[4] }]
  const pans = shots.map(s => s.t)

  // the guide's hops: talking + walking (two hops per pan) + the stop gags (from the film)
  const GUIDE_HOPS = [T.guideIn + 0.3, ...talkHops(LINES, SPEAK, { cps: 30 }), ...pans.slice(1).flatMap(([a, b]) => [a + 0.02, (a + b) / 2]), ...(cfg.guideHops || [])].sort((a, b) => a - b)

  function cam(t) {
    let c = shots[0]
    for (let i = 1; i < shots.length; i++) {
      const [a, b] = shots[i].t
      if (t >= a) { const k = ease.inOutCubic(prog(t, a, b)); c = { x: lerp(c.x, shots[i].x, k), y: lerp(c.y, shots[i].y, k), z: lerp(c.z, shots[i].z, k) } }
    }
    if (t < S[0].pan[0]) c = { ...c, z: lerp(1.07, 1, ease.outCubic(prog(t, 0, 4.7))) }
    return c
  }
  // where the guide is (world) + which stop it's at
  function guidePos(t) {
    let p = STAND[0], arc = 0
    for (let i = 1; i < shots.length; i++) {
      const [a, b] = shots[i].t
      if (t >= a) { const k = ease.inOutCubic(prog(t, a, b)); p = { x: lerp(p.x, STAND[i].x, k), y: lerp(p.y, STAND[i].y, k) }; arc = Math.sin(Math.PI * k) * 120 * (k < 1 ? 1 : 0) }
    }
    return { x: p.x, y: p.y - arc }
  }
  // trail lit up to here (arc length)
  function trailLit(t) {
    let L = 0
    for (let i = 1; i < shots.length; i++) { const [a, b] = shots[i].t; if (t >= a) L = lerp(TRAIL.at[i - 1], TRAIL.at[i], ease.inOutCubic(prog(t, a, b))) }
    return L
  }
  const stopOf = t => { let k = -1; for (let i = 0; i < S.length; i++) if (t >= S[i].pan[0]) k = i; return t >= T.sum.pan[0] ? 3 : k }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const MAP = bakeMap(ACC)
    // scrims for the type (top) and the box (bottom)
    const scrim = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(6,4,18,0.78) 0%, rgba(6,4,18,0.45) 26%, rgba(6,4,18,0) 36%, rgba(6,4,18,0) 70%, rgba(6,4,18,0.55) 100%)' }, root)
    // the show bug
    const bug = el('div', { position: 'absolute', left: '56px', top: '56px', fontFamily: INTER, fontWeight: 800, fontSize: '34px', letterSpacing: '0.16em', fontVariant: 'all-small-caps', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, root)
    el('span', { color: GOLD }, bug, '★ field guide')
    el('span', { color: ACC, opacity: 0.85 }, bug, ' · ' + cfg.element.toLowerCase())
    // headlines + stop kickers
    const H0 = popText(root, cfg.h0, { top: 236, size: 124, accentSize: 176, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: ACC, lineHeight: 0.98 })
    const kick = S.map((s, i) => el('div', { position: 'absolute', left: '70px', width: '940px', top: '224px', textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: '34px', letterSpacing: '0.12em', color: ACC, textShadow: '0 2px 14px rgba(6,4,18,0.9)', opacity: 0 }, root, cfg.stops[i].kicker))
    const HS = S.map((s, i) => popText(root, cfg.stops[i].head, { top: 282, size: 104, accentSize: 150, at: s.h, late: 1, lateAt: s.hLand, wobble: true, accentColor: i === 2 ? RED : ACC, lineHeight: 0.98 }))
    const HL = popText(root, cfg.last, { top: 236, size: cfg.lastSize || 128, accentSize: (cfg.lastSize || 128) * 1.44, at: T.sum.h, late: cfg.lastLate || 1, lateAt: T.sum.hLand, wobble: true, accentColor: ACC, lineHeight: 0.98 })
    const boxes = LINES.map((L, i) => dialogueBox(root, { lines: [L], y: 1436, width: 960, height: 270, open: BOXES[i][0], close: BOXES[i][1], cps: 30 }))
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    // ── world drawing
    function drawMap(t, mapA) {
      const un = ease.inOutCubic(prog(t, ...T.unroll))
      if (un <= 0 || mapA <= 0) return
      x.save(); x.globalAlpha = mapA
      // unroll: clip to the revealed part (in screen space, top → bottom)
      const yCut = un * 1980
      x.save(); x.setTransform(1, 0, 0, 1, 0, 0); x.beginPath(); x.rect(0, 0, 1080, yCut); x.restore()
      x.clip()
      const sm = x.imageSmoothingEnabled; x.imageSmoothingEnabled = false
      x.drawImage(MAP, MX0, MY0, MW * MP, MH * MP)
      x.imageSmoothingEnabled = sm
      x.restore()
      if (un < 1) {   // the rolled edge
        x.save(); x.setTransform(1, 0, 0, 1, 0, 0)
        x.fillStyle = '#2b2462'; x.fillRect(0, yCut - 14, 1080, 28); x.fillStyle = '#4a3f8f'; x.fillRect(0, yCut - 14, 1080, 6); x.fillStyle = '#0c0820'; x.fillRect(0, yCut + 14, 1080, 6)
        x.restore()
      }
    }
    function drawTrail(t, a) {
      const lit = trailLit(t)
      x.save(); x.globalAlpha *= a
      let next = 0
      for (const p of TRAIL.pts) {
        if (p.l < next) continue
        next = p.l + 24
        const on = p.l <= lit + 1
        const pulse = on ? 0.75 + 0.25 * Math.sin(t * 6 - p.l * 0.03) : 0.4
        x.fillStyle = on ? ACC : '#8a7fc0'; x.globalAlpha = a * pulse
        x.fillRect(Math.round(p.x) - 5, Math.round(p.y) - 5, 10, 10)
      }
      x.restore()
    }
    function drawLabels(t, a) {
      label(x, 'TRAILHEAD', TH.x + 70, TH.y + 38, { size: 22, color: '#b9b0e0', alpha: a * 0.8 })
      label(x, 'PISCES POND', POND.x, POND.y + 76, { size: 20, color: '#9cc0ff', alpha: a * 0.8 })
      // compass rose
      const cx = 140, cy = 1290, c = 6
      x.save(); x.globalAlpha *= a * 0.85
      drawBits(x, ['....B....', '...BWB...', '...BWB...', 'BBBBWBBBB', 'BWWW.WWWB', 'BBBBWBBBB', '...BWB...', '...BWB...', '....B....'], { B: '#4a3f8f', W: '#d9d0f5' }, cx, cy, c, { outline: '#0c0820' })
      x.restore()
      label(x, 'N', cx, cy - 46, { size: 22, color: GOLD, alpha: a * 0.9 })
    }
    function drawPins(t, a) {
      WPS.forEach((w, i) => {
        const s = S[i], hit = t >= s.pan[1] - 0.05
        const bounce = hit ? 1 + 0.35 * Math.exp(-(t - s.pan[1]) * 6) * Math.abs(Math.sin((t - s.pan[1]) * 14)) : 1
        const cell = 7 * bounce
        const col = hit ? ACC : '#6e64a8'
        if (hit) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(w.x, w.y, 0, w.x, w.y, 70); g.addColorStop(0, ACC + '66'); g.addColorStop(1, ACC + '00'); x.fillStyle = g; x.beginPath(); x.arc(w.x, w.y, 70, 0, 7); x.fill(); x.restore() }
        x.save(); x.globalAlpha *= a
        x.fillStyle = 'rgba(8,5,22,0.6)'; x.fillRect(w.x - 16, w.y - 4, 32, 8)
        drawBits(x, PIN, { A: col }, w.x, w.y - 26 * bounce, cell)
        label(x, String(i + 1), w.x, w.y - 34 * bounce, { size: Math.round(26 * bounce), color: INK, shadow: false })
        x.restore()
      })
    }
    function drawPisces(t, a) {
      // ♓ on the pond bank, crying (tears drip into the pond, a sob hop now and then)
      const px = POND.x + 66, py = POND.y - 40
      const sob = [3.1, 8.1, 13.9, 19.3, 23.0, ...(cfg.pisSob || [])]
      const r = drawStarChar(x, px, py, 112, t, { color: PIS.color, mood: 'squint', blink: false, hops: sob, seed: 12, glow: 0.8, alpha: a, tips: false })
      x.save(); x.globalAlpha *= a
      for (let k = 0; k < 6; k++) {
        const ph = (t * 1.3 + k / 6) % 1, side = k % 2 ? 1 : -1
        const tx = r.x + side * (16 + ph * 22), ty = r.y + 4 + ph * ph * 70
        x.fillStyle = ph > 0.85 ? '#9cc0ff' : '#7fd0ff'; x.fillRect(Math.round(tx), Math.round(ty), 7, 9)
      }
      x.restore()
    }
    function drawGuide(t, gp, opts) {
      const { mood, look, squash = 0, binoc = 0, shades = 0, hatLift = 0, alpha = 1, pop = 1 } = opts
      const size = 176
      // the backpack (behind): bedroll + pack peeking out on the right
      x.save(); x.globalAlpha *= alpha * clamp(pop)
      const bx = gp.x + 50 * pop, by = gp.y - 14
      drawBits(x, ['.rrrrrrrrrr.', 'rRrrrrrrrrRr', '.rrrrrrrrrr.'], { r: '#c9573f', R: '#ff8f6b' }, bx + 4, by - 52 * pop, 7 * pop)
      drawBits(x, ['bbbbbbbbb', 'bBBBBBBBb', 'bBBBBBBBb', 'bbbbbbbbb', 'bbbFFFbbb', 'bbbFFFbbb', 'bbbbbbbbb', 'bbbbbbbbb', '.bbbbbbb.'], { b: '#7a4f2e', B: '#5c3a22', F: GOLD }, bx + 10, by - 2, 8 * pop)
      x.restore()
      const r = drawStarChar(x, gp.x, gp.y, size, t, { color: STAR.sky, mood, look, squash, hops: GUIDE_HOPS, seed: 2, glow: 1, alpha, pop })
      const cell = Math.max(1, Math.round(size * pop / 36))
      x.save(); x.globalAlpha *= alpha
      // ranger hat on the top tip
      const hl = hatLift > 0 ? Math.sin(Math.PI * hatLift) * 110 : 0
      drawBits(x, HAT, { C: '#c79a55', B: ACC, b: '#9a733c' }, r.x, r.top + cell * 1.4 - hl, cell * 1.25, { rot: hatLift > 0 ? Math.sin(Math.PI * 2 * hatLift) * 0.5 : -0.06 })
      const ey = r.y + cell * 1.4
      if (binoc > 0) drawBits(x, BINO, { G: '#3a3550', K: '#0d0a1c', W: '#8fd8f6' }, r.x, ey - (1 - binoc) * 60, cell * 1.45, { alpha: clamp(binoc * 2) })
      if (shades > 0) drawBits(x, SHADES, { K: '#0d0a1c', W: PINK }, r.x, ey - (1 - ease.outBack(shades)) * 90, cell * 1.3, { alpha: clamp(shades * 3) })
      x.restore()
      return r
    }
    // stamp: slams in at t0 (scale 2.4 → 1), then holds; good = mint check, else red cross
    function drawStamp(t, t0, cx, cy, text, good, out = 1) {
      const p = prog(t, t0, t0 + 0.16)
      if (p <= 0 || out <= 0) return
      const s = lerp(2.4, 1, ease.inCubic(p)) * (1 + 0.06 * Math.exp(-(t - t0 - 0.16) * 9) * Math.sin((t - t0) * 40) * (p >= 1 ? 1 : 0))
      const col = good ? MINT : RED
      x.save(); x.globalAlpha *= clamp(p * 2) * out; x.translate(cx, cy); x.rotate(good ? -0.12 : 0.1); x.scale(s, s)
      x.font = `700 40px ${MONO}`
      const tw = x.measureText(text).width + 70, th = 74
      x.fillStyle = 'rgba(8,5,22,0.7)'; x.fillRect(-tw / 2, -th / 2, tw, th)
      x.strokeStyle = col; x.lineWidth = 6; x.strokeRect(-tw / 2, -th / 2, tw, th); x.lineWidth = 2; x.strokeRect(-tw / 2 + 9, -th / 2 + 9, tw - 18, th - 18)
      const ix = -tw / 2 + 36
      if (good) drawBits(x, ['......G', '.....GG', 'G...GG.', 'GG.GG..', '.GGG...', '..G....'], { G: col }, ix, 0, 4.5, { outline: null })
      else drawBits(x, ['R....R', 'RR..RR', '.RRRR.', '.RRRR.', 'RR..RR', 'R....R'], { R: col }, ix, 0, 4.5, { outline: null })
      x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 18, 2)
      x.restore()
    }
    // a TALK CARD (the real feature): pops in with a flip; returns nothing
    function drawTalkCard(t, t0, cx, cy, text, { out = 1, scale = 1 } = {}) {
      const p = prog(t, t0, t0 + 0.36)
      if (p <= 0 || out <= 0) return
      const flip = Math.cos((1 - ease.outBack(p)) * Math.PI / 2)
      const w = 228, h = 292
      x.save(); x.globalAlpha *= clamp(p * 3) * out; x.translate(cx, cy + Math.sin(t * 2.2) * 4); x.rotate(-0.04 + 0.02 * Math.sin(t * 1.7)); x.scale(Math.max(0.02, flip) * scale, scale)
      x.fillStyle = 'rgba(8,5,22,0.55)'; x.fillRect(-w / 2 + 10, -h / 2 + 14, w, h)
      x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 + 4, w + 8, h - 8); x.fillRect(-w / 2 + 4, -h / 2 - 4, w - 8, h + 8)
      x.fillStyle = '#f5ecd9'; x.fillRect(-w / 2, -h / 2 + 4, w, h - 8); x.fillRect(-w / 2 + 4, -h / 2, w - 8, h)
      x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
      x.fillStyle = INK; x.font = `700 17px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.letterSpacing = '3px'; x.fillText('TALK CARD', 0, -h / 2 + 40); x.letterSpacing = '0px'
      x.fillStyle = GOLD; x.fillRect(-36, -h / 2 + 58, 72, 4)
      x.font = `800 27px ${INTER}`; x.fillStyle = INK
      const ls = wrap(x, text, w - 50), lh = 32
      ls.forEach((ln, i) => x.fillText(ln, 0, -6 + (i - (ls.length - 1) / 2) * lh))
      drawPixelStar(x, 0, h / 2 - 34, 22, 2, GOLD)
      x.restore()
    }
    // the wildlife zooming across the map in the hook
    function drawWild(t, a) {
      cfg.wild.forEach((wd, i) => {
        if (wd.pond) return
        const t0 = T.wild[i], p = prog(t, t0, t0 + (wd.stop ? 2.1 : wd.dur || 0.9))
        if (p <= 0 || p >= 1) return
        const path = wd.path
        let k = p
        if (wd.stop) k = p < 0.3 ? ease.outCubic(p / 0.3) * 0.5 : p < 0.72 ? 0.5 : 0.5 + ease.inCubic((p - 0.72) / 0.28) * 0.5
        const px = lerp(path[0], path[2], k), py = lerp(path[1], path[3], k) - Math.sin(Math.PI * k) * (path[4] || 90)
        const dir = Math.sign(path[2] - path[0])
        const st = signStar(wd.sign)
        // the trail behind it
        for (let n = 1; n <= 9; n++) {
          const kk = Math.max(0, k - n * 0.03), tx = lerp(path[0], path[2], kk), ty = lerp(path[1], path[3], kk) - Math.sin(Math.PI * kk) * (path[4] || 90)
          if (wd.stop && p > 0.3 && p < 0.72) continue
          cfg.trailFx(x, t, tx, ty, n, i, a)
        }
        const paused = wd.stop && p > 0.3 && p < 0.72
        const walkHops = wd.walk ? Array.from({ length: 12 }, (_, n) => t0 + n * 0.32) : null
        drawStarChar(x, px, py, 132, t, { color: st.color, glyph: st.glyph, mood: paused ? (wd.mood || 'wink') : wd.walk ? (wd.mood || 'happy') : 'wide', look: paused ? [0, 0] : [dir, 0], blink: false, squash: paused || wd.walk ? 0 : -0.12, hops: paused ? [t0 + 0.7, t0 + 1.05] : walkHops, seed: 20 + i, alpha: a })
      })
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        const mapA = 1 - ease.inOutQuad(prog(t, T.out[0], T.out[1]))
        const c = cam(t)
        x.save()
        x.translate(540, 980); x.scale(c.z, c.z); x.translate(-c.x, -c.y)
        drawMap(t, mapA)
        const un = ease.inOutCubic(prog(t, ...T.unroll))
        const wa = mapA * clamp((un - 0.6) / 0.4)
        if (wa > 0) {
          drawTrail(t, wa); drawLabels(t, wa); drawPins(t, wa)
          drawPisces(t, wa * pop01(t, 0.9, 0.4))
          // vignettes: each visible from its pan to the next pan's end (then it pops out)
          const st = stopOf(t)
          S.forEach((s, i) => {
            const nextPan = i < 2 ? S[i + 1].pan : T.sum.pan
            if (t < s.pan[0] - 0.05 || t > nextPan[1] + 0.05) return
            const wp = WPS[i], ok = popOut(t, [nextPan[0] + 0.05, nextPan[1]])
            const H = {
              x, t, lt: t - s.k, s, i, wp, ok, a: wa * clamp(ok), ACC, ACC2,
              V: { x: wp.x + VIG.dx, y: wp.y + VIG.dy }, F: { x: wp.x + FEAT.dx, y: wp.y + FEAT.dy },
              stamp: (cx, cy, out = 1) => drawStamp(t, s.stamp, cx, cy, cfg.stops[i].stamp, i < 2, out * ok),
              talkCard: (t0, cx, cy, text, o) => drawTalkCard(t, t0, cx, cy, text, { ...o, out: (o?.out ?? 1) * ok }),
            }
            cfg.stops[i].scene(H)
          })
          if (t < S[0].pan[1]) drawWild(t, wa)
          // the summit: flag + crew
          if (t >= T.sum.pan[0] - 0.1) {
            const fp = pop01(t, T.sum.flag, 0.4, 2.2), ok = popOut(t, T.out)
            if (fp > 0.01 && ok > 0) {
              x.save(); x.globalAlpha *= wa * clamp(ok)
              const fx = SUMMIT.x, fy = SUMMIT.y + 6
              const ph = 150 * fp
              x.fillStyle = INK; x.fillRect(fx - 5, fy - ph - 4, 10, ph + 8)
              x.fillStyle = '#d9d0f5'; x.fillRect(fx - 2, fy - ph, 4, ph)
              const wv = t * 7
              for (let k = 0; k < 16; k++) {
                const yo = Math.sin(wv - k * 0.5) * 5 * (k / 16)
                x.fillStyle = INK; x.fillRect(fx + 2 + k * 9, fy - ph - 3 + yo, 10, 68)
                x.fillStyle = k % 4 === 3 ? ACC2 : ACC; x.fillRect(fx + 2 + k * 9, fy - ph + yo, 10, 62)
              }
              x.save(); x.translate(fx + 76, fy - ph + 31 + Math.sin(wv - 4) * 3); x.scale(fp, fp)
              label(x, '2ND DATE', 0, 0, { size: 22, color: INK, shadow: false })
              x.restore()
              x.restore()
              sparkles(x, t, fx + 60, fy - ph + 20, T.sum.flag + 0.3, 10, 110, 1, [ACC, GOLD, BONE], 26)
            }
            cfg.summit && cfg.summit({ x, t, lt: t - T.sum.flag, a: wa * clamp(popOut(t, T.out)), ACC, ACC2, CREW })
          }
          // the guide
          const gp = guidePos(t)
          const sIdx = stopOf(t)
          let g = { mood: 'happy', look: [0, 0] }
          if (t < S[0].pan[0]) {
            const bi = prog(t, T.binoc[0], T.binoc[0] + 0.25) * (1 - prog(t, T.binoc[1] - 0.2, T.binoc[1]))
            g = cfg.hookGuide ? cfg.hookGuide(t) : { mood: t < T.binoc[0] ? 'happy' : 'wide', look: [0, 0] }
            g.binoc = bi
          } else if (sIdx < 3 && cfg.stops[sIdx].guide) g = cfg.stops[sIdx].guide(t, t - S[sIdx].k) || g
          else if (sIdx === 3) g = { mood: t > T.sum.h ? 'heart' : 'happy', look: [0, 0] }
          const walking = pans.slice(1).some(([a0, b0]) => t > a0 && t < b0)
          if (walking) g = { mood: 'happy', look: [1, 0], squash: -0.08 }
          drawGuide(t, gp, { ...g, pop: pop01(t, T.guideIn, 0.4, 2.2) * popOut(t, T.out), alpha: wa })
        }
        x.restore()

        // DOM
        for (const b of boxes) b.update(t)
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
        bug.style.opacity = String(clamp((t - T.bug) / 0.3) * (1 - prog(t, 25.15, 25.42)))
        bug.style.transform = `translateY(${(1 - ease.outBack(prog(t, T.bug, T.bug + 0.35))) * -30}px)`
        scrim.style.opacity = String(clamp(un * 1.5) * mapA)
        H0.update(t, outK(t, T.h0Out))
        S.forEach((s, i) => {
          const o = outK(t, s.hOut), kp = prog(t, s.h - 0.08, s.h + 0.12)
          kick[i].style.opacity = String(t >= s.hOut[1] ? 0 : kp * o)
          kick[i].style.transform = `translateY(${(1 - ease.outCubic(kp)) * 16}px)`
          HS[i].update(t, o)
        })
        HL.update(t, outK(t, T.sum.hOut))
        drawGrain(gx, t)
      },
    }
  }

  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const nWords = s => s.split(' ').filter(w => w !== '|').length
  const CUES = [
    // hook: the map unrolls, headline, guide pops in, wildlife whooshes
    ['whoosh', 0.05, 0.8, 0.035], ['tick', 0.5, 0.03], ['tick', 0.75, 0.03],
    ...wordPops(T.h0, nWords(cfg.h0) - 1, 0.07, 0), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pluck', T.h0Land, 880, 0.035, 0.5, 0],
    ['pop', T.bug + 0.05, 1318.51, 0.02, -0.5],
    ['pop', T.guideIn + 0.05, 739.99, 0.04, -0.2], ['pop', T.guideIn + 0.3, 987.77, 0.03, -0.2],
    ['tick', T.binoc[0], 0.04], ['tick', T.binoc[0] + 0.08, 0.03],
    ...cfg.wild.flatMap((w, i) => w.pond ? [] : [['whoosh', T.wild[i] - 0.05, 0.5, 0.05]]),
    ...talkCues(LINES, { cps: 30 }),
    ...BOXES.flatMap(([o, c]) => [['pop', o, 739.99, 0.03, 0], ['pop', o + 0.06, 987.77, 0.022, 0], ['pop', c, 880, 0.022, 0], ['pop', c + 0.07, 587.33, 0.02, 0]]),
    // stops: whip-pan, pin bounce, kicker, headline, stamp
    ...S.flatMap((s, i) => [
      ['whoosh', s.pan[0] - 0.05, 0.5, 0.045], ['pop', s.pan[1], 1174.66, 0.04, 0], ['tick', s.h, 0.035],
      ...wordPops(s.h, nWords(cfg.stops[i].head) - 1, 0.07, i + 1), ['pop', s.hLand, 1318.51, 0.045, 0], ['pluck', s.hLand, i === 2 ? 587.33 : 1174.66, 0.035, 0.5, 0],
      ['boom', s.stamp, i === 2 ? 0.22 : 0.14], ['tick', s.stamp, 0.07], ['tick', s.stamp + 0.05, 0.04],
      ...(i < 2 ? [['pluck', s.stamp + 0.06, 1567.98, 0.035, 0.5, 0.2]] : [['pop', s.stamp + 0.04, 293.66, 0.04, 0]]),
    ]),
    // summit
    ['whoosh', T.sum.pan[0] - 0.05, 0.6, 0.045], ['pluck', T.sum.flag + 0.1, 1174.66, 0.04, 0.6, 0.2], ['bell', T.sum.flag + 0.3, 1760, 0.025, 1.2, 0.2], ['glitter', T.sum.flag + 0.3, T.sum.flag + 0.8],
    ...wordPops(T.sum.h, nWords(cfg.last) - (cfg.lastLate || 1), 0.07, 2), ['pop', T.sum.hLand, 1318.51, 0.05, 0], ['pluck', T.sum.hLand, 1174.66, 0.05, 0.7, 0], ['bell', T.sum.hLand + 0.05, 1760, 0.025, 1.0, 0],
    ['whoosh', T.out[0], 0.4, 0.03],
    ...(cfg.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]
  return { SCENES, CUES, LINES, BOXES }
}
