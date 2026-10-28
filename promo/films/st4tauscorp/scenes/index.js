// st4tauscorp (20 s vertical, Star Talk season 4 · EP 085 · thread F, the six couples) · story 0–15.6, then the end card.
//   0.00–4.75  "Taurus and Scorpio, | *finally.*"  The kolache date from EP 004: the ♉ Taurus star (Venus-ruled, fixed earth,
//              blanket cape, its snack bag) at a little café table with a plate of kolaches; across from it, its date
//              still behind the lavender veil, a ♏ badge glinting. Drop (2.82): the veil lifts. It's Scorpio (fixed water,
//              Mars/Pluto), in its detective coat and fedora. Taurus: wide eyes → heart eyes. Scorpio: squint → smile.
//   4.80–6.95  "Fixed signs. | *Fixed seats.*"  One good velvet armchair pops up. Both rush it, bump, squint at each
//              other: "mine." / "mine." A stubborn shove-off, both jittering, neither budging.
//   7.00–13.3  "Then they | *laughed.*"  Both crack up; the armchair stretches into a loveseat for two. THE STARS:
//              "opposites: same intensity, different *style*." → "loyalty looks good on you two." Taurus splits the
//              last kolache with Scorpio (a callback to EP 004).
//   13.35      card cut (flip), the box has shut.
//   13.4–15.5  "Stubborn, but | *together.*"  Side by side on the loveseat, both heart-eyed. End card at 15.6.
// Easter eggs: the seed constellation (EP 085) top-left, the frame's EP cartouche, the ghost peeks out of the plant pot.
// One canvas, DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 85
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', VEIL = '#c9a6ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const TAU = signStar('taurus'), SCO = signStar('scorpio')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.62, h0Out: [4.55, 4.75],
  tauIn: 0.35, scoIn: 0.6, glint: 1.6,
  lift: [BEAT(4) + 0.02, 3.45], gasp: 3.0, heart: 3.55,                    // the drop: 2.82
  h1: 4.8, h1Land: 5.15, seat: 4.95, rush: [5.35, 5.75], bump: 5.75, mineT: 5.9, mineS: 6.25, shove: [6.4, 6.95], h1Out: [6.78, 6.96],
  laugh: 7.0, stretch: [7.05, 7.45], settle: [7.1, 7.6],
  h1b: 7.05, h1bLand: 7.35, open: 7.25, l1: 7.45,
  l2: 10.7, offer: 11.0, split: 11.45, hand: 11.7, hearts: 12.1,
  close: 13.25, h1bOut: [13.06, 13.24],
  cut: 13.35,
  h2: 13.4, h2Land: 13.8, h2Out: [15.2, 15.42], out: [15.08, 15.48],
  ghost: 9.5,
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'opposites: same intensity, different *style*.' },
  { t: T.l2, speaker: NARR, text: 'loyalty looks good on you two.' },
]
const CPS = 30
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── pixel bits (the coat, fedora, kolache, snack bag and plaid match EP 004 / 013 / 048)
const BMP = s => s.trim().split(/\s+/)
const HAT = BMP(`
....HHHHHHH....
...HHHHHHHHH...
...HhhhhhhhH...
...BBBBBBBBB...
HHHHHHHHHHHHHHH
.HHHHHHHHHHHHH.`)
const COAT = BMP(`
LL.........LL
CLL.......LLC
CCLL.....LLCC
CCCLL...LLCCC
CCCCLL.LLCCCC
CCCCCCoCCCCCC
bbbbbbbbbbbbb
CCCCCCoCCCCCC
CCCCCC.CCCCCC
CCCCCC.CCCCCC`)
const SNACK = ['.KKKK.', 'KYYYYK', 'KYOOYK', 'KYYYYK', 'KYOOYK', 'KYYYYK', '.KKKK.']
const SNACK_C = { K: '#c98a1f', Y: '#f7c948', O: '#ff9a52' }
const BUN = ['.yyyy.', 'yYYYYy', 'YYrYYY', 'YYYYrY', '.YYYY.']
const HALF = ['.yy', 'yYY', 'YrY', 'YYY', '.YY']
const BUN_C = { y: '#fff1c8', Y: '#e8b26a', r: '#c96a3a' }
const PLAID = { A: '#c8443a', B: '#f1e3c4', C: '#8a2a2a' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const ANGER = ['X.X', '.X.', 'X.X']
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch] || cols.X; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// ── layout
const FLOOR = 1330
const TAU0 = { x: 270, y: 1050, size: 320 }, SCO0 = { x: 805, y: 1055, size: 305 }
const TAU_RUSH = { x: 430 }, SCO_RUSH = { x: 660 }
const TAU2 = { x: 380, y: 1075, size: 310 }, SCO2 = { x: 705, y: 1080, size: 296 }
const SEAT = { x: 540, y: 1180 }
const TABLE = { x: 540, top: 1268 }
const POT = { x: 985, top: 1200 }

const TAU_HOPS = [T.tauIn + 0.3, T.gasp + 0.2, T.heart, T.rush[1], T.mineT, T.laugh, T.laugh + 0.45, T.laugh + 0.9, T.offer, T.hearts, T.h2Land]
const SCO_HOPS = [T.lift[1], T.rush[1], T.mineS, T.laugh + 0.2, T.laugh + 0.65, T.laugh + 1.1, T.hand + 0.1, T.h2Land + 0.1]

function tauState(t) {
  if (t < T.gasp) return { mood: 'happy' }
  if (t < T.heart) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.seat) return { mood: 'heart' }
  if (t < T.bump) return { mood: 'wide', look: [1, -1], blink: false }        // the good seat!
  if (t < T.laugh) return { mood: 'squint', look: [1, 0] }                    // mine.
  if (t < T.l1) return { mood: 'happy' }
  if (t < T.offer) return { mood: 'happy' }
  if (t < T.hearts) return { mood: 'sparkle', look: [1, 0] }
  return { mood: 'heart' }
}
function scoState(t) {
  if (t < T.lift[1]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.seat) return { mood: 'happy' }
  if (t < T.bump) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.laugh) return { mood: 'squint', look: [-1, 0] }
  if (t < T.l1) return { mood: 'happy' }
  if (t < T.hand) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.hearts + 0.2) return { mood: 'happy' }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 44px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Taurus and Scorpio, | *finally.*', { top: 170, size: 104, accentSize: 196, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: LAV, lineHeight: 1.0, fit: true })
  const H1 = popText(root, 'Fixed signs. | *Fixed seats.*', { top: 170, size: 112, accentSize: 172, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.14, wobble: true, accentColor: '#ff7a8f', lineHeight: 1.0, fit: true })
  const H1b = popText(root, 'Then they | *laughed.*', { top: 170, size: 116, accentSize: 190, at: T.h1b, late: 1, lateAt: T.h1bLand, wobble: true, accentColor: GOLD, lineHeight: 1.0, fit: true })
  const H2 = popText(root, 'Stubborn, but | *together.*', { top: 170, size: 116, accentSize: 196, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK, lineHeight: 1.0, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H1b, T.h1bOut], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function bits(bm, cx, cy, cell, cols, { rot = 0, a = 1 } = {}) {
    if (a <= 0 || cell <= 0) return
    const w = bm[0].length, h = bm.length
    x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
    x.fillStyle = 'rgba(14,8,32,0.88)'
    bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
    bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || cols.X; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
    x.restore()
  }

  // ── the café: string lights, a warm floor, a plant pot (the ghost's spot), the little table
  function drawRoom(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    // string lights sagging across
    for (let i = 0; i <= 36; i++) {
      const u = i / 36, lx = lerp(-20, 1100, u), ly = 690 + Math.sin(Math.PI * u) * 70
      x.fillStyle = INK; x.fillRect(lx - 2, ly - 2, 5, 5)
      if (i % 3 === 0) { const on = 0.7 + 0.3 * Math.sin(t * 2 + i); glow(lx, ly + 10, 40, '#ffc27a', 0.5 * on); x.fillStyle = rgba('#ffe2b0', on); x.fillRect(lx - 6, ly + 4, 12, 12) }
    }
    // floor
    const g = x.createLinearGradient(0, FLOOR - 220, 0, FLOOR)
    g.addColorStop(0, 'rgba(255,170,110,0)'); g.addColorStop(1, 'rgba(255,170,110,0.13)')
    x.fillStyle = g; x.fillRect(0, FLOOR - 220, 1080, 220)
    x.fillStyle = INK; x.fillRect(0, FLOOR - 4, 1080, 4)
    for (let k = 0; k < 12; k++) { x.fillStyle = k % 2 ? '#3a2340' : '#4a2c48'; x.fillRect(k * 90, FLOOR, 90, 36) }
    // the plant pot (a fern on top)
    x.fillStyle = INK; x.fillRect(POT.x - 66, POT.top - 6, 132, FLOOR - POT.top + 6)
    x.fillStyle = '#c9683a'; x.fillRect(POT.x - 60, POT.top, 120, FLOOR - POT.top)
    x.fillStyle = '#e08a52'; x.fillRect(POT.x - 60, POT.top, 120, 14)
    x.restore()
  }
  function drawFern(t, a) {
    x.save(); x.globalAlpha = a
    for (let k = 0; k < 7; k++) {
      const an = -Math.PI / 2 + (k - 3) * 0.32 + Math.sin(t * 1.3 + k) * 0.04
      for (let s = 0; s < 9; s++) {
        const r = s * 13, px = POT.x + Math.cos(an) * r * (1 + Math.abs(k - 3) * 0.12), py = POT.top - 8 + Math.sin(an) * r + Math.abs(k - 3) * s * 2.5
        x.fillStyle = INK; x.fillRect(px - 7, py - 7, 14, 14)
        x.fillStyle = s % 3 ? '#4fb26a' : '#7ad48c'; x.fillRect(px - 5, py - 5, 10, 10)
      }
    }
    x.restore()
  }
  function drawTable(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    x.fillStyle = INK; x.fillRect(TABLE.x - 16, TABLE.top + 10, 32, FLOOR - TABLE.top - 10); x.fillRect(TABLE.x - 70, FLOOR - 12, 140, 12)
    x.fillStyle = '#7a5040'; x.fillRect(TABLE.x - 10, TABLE.top + 14, 20, FLOOR - TABLE.top - 14)
    x.fillStyle = INK; x.beginPath(); x.ellipse(TABLE.x, TABLE.top, 200, 34, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#efe0c8'; x.beginPath(); x.ellipse(TABLE.x, TABLE.top - 4, 192, 26, 0, 0, Math.PI * 2); x.fill()
    // the plate
    x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(TABLE.x, TABLE.top - 8, 92, 15, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(27,18,54,0.25)'; x.beginPath(); x.ellipse(TABLE.x, TABLE.top - 6, 70, 9, 0, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  // the one good seat: a velvet armchair that stretches into a loveseat
  function drawSeat(t) {
    const pk = pop01(t, T.seat, 0.35, 2.2) * popOut(t, T.out)
    if (pk <= 0.02) return
    const st = easeOutBack(prog(t, ...T.stretch), 1.6)
    const w = lerp(300, 640, st) * pk, h = 440 * pk, cx = SEAT.x, base = SEAT.y + 110
    x.save()
    const P = 8
    const rect = (l, tp, ww, hh, col) => { x.fillStyle = INK; x.fillRect(l - P, tp - P, ww + 2 * P, hh + 2 * P); x.fillStyle = col; x.fillRect(l, tp, ww, hh) }
    rect(cx - w / 2, base - h, w, h * 0.7, '#2f6f74')                      // back
    x.fillStyle = '#4a9a96'; x.fillRect(cx - w / 2, base - h, w, 12)
    // buttons (tufting)
    x.fillStyle = '#1c4a50'
    for (let k = 1; k < Math.round(w / 70); k++) x.fillRect(cx - w / 2 + k * (w / Math.round(w / 70)) - 4, base - h * 0.62, 8, 8)
    rect(cx - w / 2 - 36 * pk, base - h * 0.45, 60 * pk, h * 0.45, '#245a60')  // arms
    rect(cx + w / 2 - 24 * pk, base - h * 0.45, 60 * pk, h * 0.45, '#245a60')
    rect(cx - w / 2 + 10, base - h * 0.3, w - 20, h * 0.3, '#3f8a88')      // cushion
    x.fillStyle = INK; x.fillRect(cx - w / 2, base, 14, 26); x.fillRect(cx + w / 2 - 14, base, 14, 26)
    x.restore()
    if (t > T.seat + 0.2 && t < T.seat + 1.0) sparkles(t, cx, base - h * 0.6, T.seat + 0.2, 8, 170, 1, [GOLD, BONE])
  }

  function cape(r, size, ok) {
    const c = Math.max(4, Math.round(size / 36)), cy = r.y + size * 0.02
    x.save(); x.globalAlpha = clamp(ok * 2)
    for (const sd of [-1, 1]) for (let j = 0; j < 9; j++) for (let i = 0; i < 4; i++) {
      const px = r.x + sd * (size * 0.36 + i * c) - (sd < 0 ? c : 0), py = cy + j * c - 2 * c + i * c * 0.6
      x.fillStyle = (i + j) % 3 === 0 ? PLAID.C : (i + j) % 2 ? PLAID.A : PLAID.B
      x.fillRect(Math.round(px), Math.round(py), c, c)
    }
    x.restore()
  }
  function veil(t, r, size, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = 0.55 * a
    const c = Math.max(4, Math.round(size / 30)), top = r.top - c * 2
    for (let j = 0; j < 30; j++) {
      const yy = top + j * c, k = j / 30, hw = size * (0.14 + 0.42 * Math.min(1, k * 1.6)) + Math.sin(j * 0.8 + t * 2) * c * 0.5
      x.fillStyle = j % 4 === 0 ? '#e7d8ff' : VEIL
      x.fillRect(Math.round(r.x - hw), Math.round(yy), Math.round(2 * hw), c)
    }
    x.restore()
    for (let i = 0; i < 5; i++) {
      const ph = (t * 0.5 + i * 0.21) % 1
      x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9 * a
      drawPixelStar(x, r.x + Math.cos(i * 2.3) * size * 0.4, r.y + Math.sin(i * 1.7) * size * 0.3 - ph * 30, 16, 2, '#fff', '#e7d8ff')
      x.restore()
    }
  }
  function bubble(cx, cy, text, { side = -1, k = 1, fill = BONE, ink = INK, size = 44 } = {}) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 ${size}px ${INTER}`
    const tw = x.measureText(text).width, w = tw + 56, h = size + 40
    x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, 18); x.fill()
    x.fillStyle = fill; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 14); x.fill()
    x.beginPath(); x.moveTo(side * (w / 2 - 50), h / 2 - 4); x.lineTo(side * (w / 2 - 22), h / 2 + 22); x.lineTo(side * (w / 2 - 80), h / 2 - 2); x.fill()
    x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
    x.restore()
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 6, spread = 220) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * spread + Math.sin(p * 6 + i) * 14), Math.round(cy - 90 - p * 230), cell, { alpha: Math.sin(Math.PI * p) })
    }
  }
  // laughter: little "ha" pixel puffs
  function haPuffs(t, cx, cy, t0, seed) {
    for (let i = 0; i < 4; i++) {
      const born = t0 + i * 0.28, p = (t - born) / 0.9
      if (p < 0 || p >= 1) continue
      x.save(); x.globalAlpha = Math.sin(Math.PI * p)
      x.font = `700 ${40 + (i % 2) * 8}px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK
      const hx = cx + (seed + i % 2 ? 1 : -1) * (40 + p * 50), hy = cy - p * 90
      x.fillText('ha', hx + 3, hy + 3); x.fillStyle = GOLD; x.fillText('ha', hx, hy)
      x.restore()
    }
  }

  function posT(t) {
    const r = ease.inOutCubic(prog(t, ...T.rush)), s = ease.inOutCubic(prog(t, ...T.settle))
    const shove = t > T.shove[0] && t < T.shove[1] ? Math.sin((t - T.shove[0]) * 38) * 10 : 0
    return { x: lerp(lerp(TAU0.x, TAU_RUSH.x, r), TAU2.x, s) + shove, y: lerp(TAU0.y, TAU2.y, s), size: lerp(TAU0.size, TAU2.size, s) }
  }
  function posS(t) {
    const r = ease.inOutCubic(prog(t, ...T.rush)), s = ease.inOutCubic(prog(t, ...T.settle))
    const shove = t > T.shove[0] && t < T.shove[1] ? -Math.sin((t - T.shove[0]) * 38 + 1) * 10 : 0
    return { x: lerp(lerp(SCO0.x, SCO_RUSH.x, r), SCO2.x, s) + shove, y: lerp(SCO0.y, SCO2.y, s), size: lerp(SCO0.size, SCO2.size, s) }
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const bumpSq = t > T.bump && t < T.bump + 0.5 ? 0.14 * Math.exp(-(t - T.bump) * 8) * Math.cos((t - T.bump) * 22) : 0
    const strain = t > T.shove[0] && t < T.shove[1] ? 0.05 : 0
    // Taurus: cape behind, snack bag beside
    const tp = pop01(t, T.tauIn, 0.38, 2) * ok, P = posT(t)
    cape({ x: P.x, y: P.y }, P.size * tp, tp)
    const rT = drawStarChar(x, P.x, P.y, P.size, t, { color: TAU.color, glyph: TAU.glyph, ...tauState(t), hops: TAU_HOPS, pop: tp, seed: 5, squash: bumpSq + strain, glow: 1.1 })
    drawBits(x, SNACK, SNACK_C, Math.round(rT.x - P.size * 0.62), Math.round(rT.y + P.size * 0.18), 10 * tp)
    // Scorpio: veiled → revealed in coat + fedora
    const sp = pop01(t, T.scoIn, 0.38, 2) * ok, Q = posS(t)
    const rS = drawStarChar(x, Q.x, Q.y, Q.size, t, { color: SCO.color, glyph: SCO.glyph, ...scoState(t), hops: SCO_HOPS, pop: sp, seed: 11, squash: bumpSq + strain, glow: lerp(0.7, 1, prog(t, ...T.lift)) })
    const cell = Q.size * sp / 34
    bits(COAT, rS.x, rS.y + cell * 10, cell * 0.85, { C: '#c9a46a', L: '#e2c48c', b: '#7a5a2a', o: '#3a2a14' })
    const hatHop = t > T.gasp && t < T.gasp + 0.4 ? -24 * Math.sin(Math.PI * prog(t, T.gasp, T.gasp + 0.4)) : 0
    bits(HAT, rS.x, rS.top + cell * 3.2 + hatHop, cell * 1.05, { H: '#6b5a44', h: '#8a765a', B: '#2a2016' }, { rot: -0.1 })
    const lift = ease.inOutCubic(prog(t, ...T.lift))
    if (lift < 1) {
      x.save(); x.translate(0, -lift * 260)
      veil(t, rS, Q.size * sp, (1 - lift) * clamp(sp * 2))
      x.restore()
    }
    // the ♏ badge glints through the veil before the reveal
    if (t > T.glint && t < T.glint + 0.45) { x.save(); x.globalAlpha = Math.sin(Math.PI * (t - T.glint) / 0.45); drawPixelStar(x, rS.x + Q.size * 0.3, rS.y + Q.size * 0.18, 34, 2, '#fffbe8'); x.restore() }
    sparkles(t, rS.x, rS.y, T.lift[1] - 0.15, 12, 220, 1, [LAV, '#e7d8ff', GOLD, BONE])
    // the argument
    if (t < T.laugh + 0.1) {
      bubble(rT.x - 30, rT.top - 70, 'mine.', { side: 1, k: pop01(t, T.mineT, 0.25, 2.6) * (1 - prog(t, T.laugh - 0.05, T.laugh + 0.1)), fill: '#f7c948' })
      bubble(rS.x + 30, rS.top - 70, 'mine.', { side: -1, k: pop01(t, T.mineS, 0.25, 2.6) * (1 - prog(t, T.laugh - 0.05, T.laugh + 0.1)), fill: '#ff8fa8' })
    }
    if (t > T.bump && t < T.laugh) {
      const fl = Math.floor(t * 8) % 2
      drawBits(x, ANGER, { X: '#ff4f6e' }, Math.round((rT.x + rS.x) / 2), Math.round(rT.y - P.size * 0.55 - fl * 6), 9 + fl * 2)
      if (t < T.bump + 0.4) sparkles(t, (rT.x + rS.x) / 2, rT.y, T.bump, 8, 70, 2, [BONE, GOLD])
    }
    // laughter
    if (t > T.laugh) { haPuffs(t, rT.x, rT.top - 20, T.laugh, 0); haPuffs(t, rS.x, rS.top - 20, T.laugh + 0.14, 1) }
    if (t > T.heart && t < T.seat) floatHearts(t, rT.x, rT.y, T.heart, T.seat - 0.6, 1, 6, 160)
    if (t > T.hearts) floatHearts(t, (rT.x + rS.x) / 2, rT.y, T.hearts, T.out[0], 3, 7, 420)
    return { rT, rS }
  }
  function drawKolaches(t, r) {
    const ok = popOut(t, T.out), k = clamp(prog(t, 0.3, 0.6)) * ok
    if (k <= 0) return
    const cy = TABLE.top - 24
    // two kolaches early, the last one later (Taurus ate one, obviously)
    if (t < T.offer) {
      drawBits(x, BUN, BUN_C, TABLE.x - 34, cy, 10, { alpha: k })
      if (t < 4.2) drawBits(x, BUN, BUN_C, TABLE.x + 34, cy, 10, { alpha: k * (1 - prog(t, 3.9, 4.2)) })
      return
    }
    const lift = ease.outCubic(prog(t, T.offer, T.offer + 0.35))
    const bx = TABLE.x - 34 + lift * 34, by = cy - lift * 90
    if (t < T.split) { drawBits(x, BUN, BUN_C, Math.round(bx), Math.round(by + Math.sin(t * 8) * 3), 11, { alpha: k }); return }
    const sp = easeOutBack(prog(t, T.split, T.split + 0.4), 2), hp = ease.inOutCubic(prog(t, T.hand, T.hand + 0.5))
    const tx = lerp(TABLE.x - 30 - sp * 40, TABLE.x - 125, hp), sx = lerp(TABLE.x + 30 + sp * 40, TABLE.x + 125, hp), yy = lerp(by, TABLE.top - 40 + Math.sin(t * 3) * 4, hp)
    drawBits(x, HALF, BUN_C, Math.round(tx), Math.round(yy), 13, { alpha: k })
    drawBits(x, HALF, BUN_C, Math.round(sx), Math.round(yy), 13, { alpha: k, flip: true })
    sparkles(t, TABLE.x, by, T.split, 8, 90, 2, [GOLD, BONE, PINK])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.55, SKY_H.zoom, ss), dy: lerp(-20, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, dim: (base.dim ?? 1) * 0.85 })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.05) {
        const ra = clamp(prog(t, 0.15, 0.45)) * popOut(t, [T.out[0] - 0.05, T.out[1]])
        drawRoom(t, ra)
        drawGhostCameo(x, t, { x: POT.x - 66, y: 1266, at: T.ghost, dur: 1.4, from: 'right', cell: 3.4 })
        drawFern(t, ra)
        drawSeat(t)
        const r = drawStars(t)
        drawTable(t, ra)
        if (r) drawKolaches(t, r)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.77 (reveal → the seat fight), 6.98 (the laugh), 13.35 (box shut → the last line). cardfx keeps 6.98.
// Keep the 13.35 flip instead: it is the cleaner beat change (the box has shut), so pass it alone as the one cut.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['pop', T.tauIn + 0.05, 659.25, 0.04, -0.3], ['pop', T.scoIn + 0.05, 587.33, 0.035, 0.3],
  ['bell', T.glint, 2093, 0.02, 0.9, 0.3],
  ['riser', T.lift[0] - 0.6, T.lift[0], 0.05], ['whoosh', T.lift[0], 0.6, 0.04], ['glitter', T.lift[1] - 0.15, T.lift[1] + 0.4], ['bell', T.lift[1] - 0.1, 1567.98, 0.03, 1.6, 0.3],
  ['pop', T.gasp, 440, 0.035, -0.3], ['pluck', T.heart, 1174.66, 0.045, 0.5, -0.3], ['pluck', T.heart + 0.12, 1567.98, 0.04, 0.5, -0.3],
  ...wordPops(T.h1, 2, 0.1, 2, 0.025), ['pop', T.h1Land, 987.77, 0.045, 0], ['pop', T.h1Land + 0.14, 1174.66, 0.045, 0],
  ['pop', T.seat, 783.99, 0.04, 0], ['bell', T.seat + 0.2, 1318.51, 0.025, 1.0, 0],
  ['whoosh', T.rush[0], 0.4, 0.035], ['boom', T.bump, 0.14], ['tick', T.bump, 0.05],
  ['pop', T.mineT, 392, 0.04, -0.4], ['pop', T.mineT + 0.08, 349.23, 0.035, -0.4], ['pop', T.mineS, 349.23, 0.04, 0.4], ['pop', T.mineS + 0.08, 311.13, 0.035, 0.4],
  ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.shove[0] + i * 0.09).toFixed(3), 0.03]),
  ...[0, 0.14, 0.28, 0.42, 0.56, 0.7].map((d, i) => ['pop', +(T.laugh + d).toFixed(3), NOTE[(i * 2) % 7] * 1.5, 0.03, (i % 2 ? 0.4 : -0.4)]),
  ['whoosh', T.stretch[0], 0.4, 0.03], ['pluck', T.stretch[1], 1046.5, 0.04, 0.6, 0],
  ...wordPops(T.h1b, 2, 0.1, 1, 0.025), ['pop', T.h1bLand, 1174.66, 0.045, 0],
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  ['pop', T.offer, 880, 0.03, -0.2], ['pop', T.split, 1318.51, 0.035, 0], ['tick', T.split + 0.02, 0.04], ['glitter', T.split, T.split + 0.35],
  ['pluck', T.hearts, 1174.66, 0.04, 0.6, 0], ['bell', T.hearts + 0.05, 1760, 0.022, 1.2, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.1, 1, 0.028), ['pop', T.h2Land, 1174.66, 0.055, 0], ['pluck', T.h2Land, 1046.5, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
