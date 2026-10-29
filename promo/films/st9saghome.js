// st9saghome — Sagittarius's home for Star Talk season 9 "A Day in the Life" (promo/films/STARTALK10.md, S9 E41–45),
// plus the small episode KIT (speech bubbles, cuts, set blocks) that the Sag and Capricorn episodes share.
// Owned by the Sag + Capricorn session. st9caphome.js imports the kit from here. Pure f(t), no `document` at top level.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { DIO, SAG, drawSagHome, drawSagHomeFront, drawSag, SAG_SPOTS, SAG_EP,
//            R, blk, bubble, bubbleCues, bubbleDone, whip, whipCues, popIn, drawHeart, PIX } from '../../st9saghome.js'
//
// ── the set: a pixel diorama box floating in the Star Talk sky (DIO = { x0: 50, x1: 1030, y0: 560, y1: 1500,
//    floor: 1300 }). Each room's window is a HOLE: whatever sky you drew first (drawSky + st9day daySky) shows through.
// drawSagHome(ctx, t, { room = 'bed', ep = 'am', dark = 0, lamp = 0, unpacked = 0, pins })
//   room  'bed' | 'kitchen' | 'desk' | 'window'
//   ep    'am' | 'work' | 'love' | 'crew' | '3am': the per-episode change that rewards bingeing. The world map's pins go
//         3 → 7 (one new trip planned per episode) and a postcard joins the fridge each episode.
//   dark  0…1: the night overlay (3 AM uses ≈ 0.8; the window stays clear so the stars read).
//   lamp  0…1: the Jupiter lamp's warm glow (it's the room's night light).
//   unpacked 0…1: the backpack (always packed, by the door) slumps open with a shirt and a compass out (E45's payoff).
// drawSagHomeFront(ctx, t, opts)  the pieces in FRONT of a character: the blanket ('bed'), the desk front ('desk'),
//   the window-seat cushion lip ('window'). Same opts. Call it after you draw the characters.
// drawSag(ctx, x, y, size, t, opts)  the purple ♐ star (drawStarChar) with its packed hiking backpack on (opts.pack =
//   true; false = no pack) and every drawStarChar opt. Returns drawStarChar's { x, y, size, top }.
// SAG = { id, tag: '♐ SAG', color, glyph }   SAG_SPOTS = { room: { x, y, from } } ghost hideaways (one per room)
// SAG_EP = ['am', 'work', 'love', 'crew', '3am']
//
// ── the KIT (shared with st9caphome.js and all ten Sag + Capricorn episodes)
// R(ctx, color, x, y, w, h)               a crisp rect (rounded to whole px).
// blk(ctx, x, y, w, h, fill, { o = 6, hi, lo, ink })   a pixel block: ink outline o px, optional top highlight / bottom shade.
// bubble(ctx, t, { x, y, text, at, out, tag, tagColor, w = 560, size = 40, cps = 30, tail = 'down', tailX })
//   a pixel speech bubble (bone panel, ink border, a name tag chip on its top-left, Inter 700 type-on; '*word*' =
//   EB Garamond italic accent in tagColor). (x, y) = the TAIL tip (the speaker's mouth); the bubble sits above it
//   (tail 'down') or beside it ('left' = the bubble is to the right of the tip, 'right' = to the left). Pops in at
//   `at`, types at cps, pops out at `out`. Returns nothing. bubbleDone(b) → when it finishes typing (b = its opts).
// bubbleCues(bubbles, { pitch = {}, cps = 30 }) → talk blips + the pop in / out (pitch keyed by tag).
// whip(ctx, t, at, { dir = 1, dur = 0.32 })  the vlog's whip-pan cut: motion streaks across the frame around `at`
//   (draw it last on the canvas; swap rooms exactly at `at`). whipCues(at) → its whoosh + tick.
// popIn(t, t0, d = 0.32, s = 1.9) → 0…1+ easeOutBack pop factor.   drawHeart(ctx, x, y, cell, alpha)   PIX = bitmaps.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease } from '../src/lib.js'
import { easeOutBack } from './wheel.js'
import { drawStarChar, signStar } from './startalk.js'
import { drawBits } from './st5cast.js'

const INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c'
const SANS = "'Inter', system-ui, sans-serif", SERIF = "'EB Garamond', Georgia, serif", MONO = "'Space Mono', ui-monospace, monospace"

export const DIO = { x0: 50, x1: 1030, y0: 560, y1: 1500, floor: 1300 }
export const SAG_EP = ['am', 'work', 'love', 'crew', '3am']
const S0 = signStar('sagittarius')
export const SAG = { id: 'sagittarius', tag: '♐ SAG', color: S0.color, glyph: S0.glyph }

// ═══════════════════════════════════════════ the kit
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
export function blk(x, x0, y0, w, h, fill, { o = 6, hi = null, lo = null, ink = INK } = {}) {
  if (o) R(x, ink, x0 - o, y0 - o, w + 2 * o, h + 2 * o)
  R(x, fill, x0, y0, w, h)
  if (hi) R(x, hi, x0, y0, w, Math.max(4, Math.round(h * 0.12)))
  if (lo) R(x, lo, x0, y0 + h - Math.max(4, Math.round(h * 0.14)), w, Math.max(4, Math.round(h * 0.14)))
}
export const popIn = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)

export const PIX = {
  HEART: ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..'],
  HEART_C: { H: '#ff4f86', W: '#ffd1de' },
  BACKPACK: [
    '....rrrrrrrr....',
    '...rRRRRRRRRr...',
    '....rrrrrrrr....',
    '...ssPPPPPPss...',
    '..sPPPPPPPPPPs..',
    '..PPPPPPPPPPPP..',
    '..FFFFFFFFFFFF..',
    '..FFFFFFFFFFFF..',
    '..FFFFFbFFFFFF..',
    '..PPPPPPPPPPPP..',
    '..PPpppppppPPP..',
    '..PPpYpppGppPP..',
    '..PPpppppppPPP..',
    '..PPpppppppPPP..',
    '..PPPPPPPPPPPP..',
    '...dPPPPPPPPd...',
    '....dddddddd....',
  ],
  BACKPACK_C: { r: '#b8946a', R: '#d9b98a', s: '#2b1c4a', P: '#7a4bd0', F: '#f08a3c', b: '#ffd27a', p: '#6a3fbc', Y: '#ffd27a', G: '#7fe0a8', d: '#4e2f8e' },
}
export function drawHeart(x, cx, cy, cell = 6, alpha = 1) { drawBits(x, PIX.HEART, PIX.HEART_C, Math.round(cx), Math.round(cy), cell, { alpha }) }

// rich text: '*word*' accents → [{ s, acc }] runs, then wrapped lines of runs
function runs(text) { return text.split(/(\*[^*]+\*)/).filter(Boolean).map(s => (s[0] === '*' ? { s: s.slice(1, -1), acc: true } : { s, acc: false })) }
const fontOf = (acc, size) => (acc ? `italic 600 ${Math.round(size * 1.18)}px ${SERIF}` : `700 ${size}px ${SANS}`)
function layout(x, text, size, maxW) {
  const words = []
  for (const r of runs(text)) for (const w of r.s.split(/(\s+)/)) if (w) words.push({ s: w, acc: r.acc })
  const lines = [[]]; let cur = 0
  for (const w of words) {
    x.font = fontOf(w.acc, size); const ww = x.measureText(w.s).width
    if (/^\s+$/.test(w.s)) { if (lines[lines.length - 1].length) { lines[lines.length - 1].push({ ...w, w: ww }); cur += ww } continue }
    if (cur + ww > maxW && lines[lines.length - 1].length) { const L = lines[lines.length - 1]; while (L.length && /^\s+$/.test(L[L.length - 1].s)) L.pop(); lines.push([]); cur = 0 }
    lines[lines.length - 1].push({ ...w, w: ww }); cur += ww
  }
  return lines.map(L => ({ words: L, w: L.reduce((a, b) => a + b.w, 0) }))
}
const plainLen = text => text.replace(/\*/g, '').length
export const bubbleDone = b => b.at + 0.18 + plainLen(b.text) / (b.cps || 30)

export function bubble(x, t, { x: tx, y: ty, text, at, out, tag = null, tagColor = GOLD, w = 560, size = 40, cps = 30, tail = 'down', tailX = null }) {
  if (t < at || (out != null && t >= out + 0.2)) return
  const kIn = easeOutBack(prog(t, at, at + 0.26), 2.2), kOut = out != null ? 1 - ease.inCubic(prog(t, out, out + 0.2)) : 1
  const k = kIn * kOut
  if (k <= 0.01) return
  const pad = 26, lh = Math.round(size * 1.28)
  const L = layout(x, text, size, w - 2 * pad)
  const bw = Math.min(w, Math.max(...L.map(l => l.w)) + 2 * pad + 6), bh = L.length * lh + 2 * pad - (lh - size) + 6
  let bx, by
  if (tail === 'down') { const fx = tailX != null ? tailX : 0.3; bx = tx - bw * fx; by = ty - 34 - bh }
  else if (tail === 'left') { bx = tx + 34; by = ty - bh * 0.7 }
  else { bx = tx - 34 - bw; by = ty - bh * 0.7 }
  bx = clamp(bx, 74, 1006 - bw)
  const ox = tail === 'down' ? tx : tail === 'left' ? bx : bx + bw, oy = tail === 'down' ? by + bh : by + bh * 0.7
  x.save()
  x.translate(ox, oy); x.scale(k, k); x.translate(-ox, -oy)
  // the panel: ink border, stepped corners, bone fill, a soft drop
  const P = 6
  x.fillStyle = 'rgba(8,5,22,0.45)'; x.fillRect(bx + 10, by + 12, bw, bh)
  x.fillStyle = INK
  x.fillRect(bx + P, by - P, bw - 2 * P, bh + 2 * P); x.fillRect(bx - P, by + P, bw + 2 * P, bh - 2 * P); x.fillRect(bx, by, bw, bh)
  x.fillStyle = BONE; x.fillRect(bx + P, by, bw - 2 * P, bh); x.fillRect(bx, by + P, bw, bh - 2 * P)
  // the tail
  x.fillStyle = INK
  if (tail === 'down') {
    const c = clamp(tx, bx + 30, bx + bw - 30)
    for (let i = 0; i < 5; i++) x.fillRect(Math.round(lerp(c, tx, i / 5)) - (16 - i * 3) - 6, by + bh - 2 + i * 7, 2 * (16 - i * 3) + 12, 9)
    x.fillStyle = BONE
    for (let i = 0; i < 4; i++) x.fillRect(Math.round(lerp(c, tx, i / 5)) - (16 - i * 3), by + bh - 4 + i * 7, 2 * (16 - i * 3), 8)
  } else {
    const s = tail === 'left' ? -1 : 1, ex = tail === 'left' ? bx : bx + bw, yy = by + bh * 0.7
    for (let i = 0; i < 5; i++) x.fillRect(ex + s * i * 7 - (s < 0 ? 9 : 0), yy - (14 - i * 3) - 6, 9, 2 * (14 - i * 3) + 12)
    x.fillStyle = BONE
    for (let i = 0; i < 4; i++) x.fillRect(ex + s * i * 7 - (s < 0 ? 8 : 0), yy - (14 - i * 3), 8, 2 * (14 - i * 3))
  }
  // the type-on
  const n = Math.floor((t - at - 0.18) * cps)
  let shown = 0
  x.textBaseline = 'alphabetic'
  L.forEach((l, j) => {
    let cx = bx + pad + 3
    const cy = by + pad + 3 + j * lh + size * 0.82
    for (const w of l.words) {
      if (shown >= n) break
      const vis = w.s.slice(0, Math.max(0, n - shown)); shown += w.s.length
      x.font = fontOf(w.acc, size); x.fillStyle = w.acc ? shade(tagColor) : INK
      x.fillText(vis, cx, cy + (w.acc ? 2 : 0)); cx += w.w
    }
  })
  // the name tag chip
  if (tag) {
    x.font = `700 26px ${MONO}`
    const tw = x.measureText(tag).width + 28, tgx = bx + 18, tgy = by - 26
    R(x, INK, tgx - 4, tgy - 4, tw + 8, 44); R(x, tagColor, tgx, tgy, tw, 36)
    x.fillStyle = INK; x.fillText(tag, tgx + 14, tgy + 27)
  }
  x.restore()
}
/** accent colours darkened a touch so they read on the bone panel */
function shade(hex) { const n = parseInt(hex.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255, k = 0.72; return `rgb(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)})` }

const r3 = v => +v.toFixed(3)
export function bubbleCues(bubbles, { pitch = {}, cps = 30, gain = 0.016 } = {}) {
  const out = []
  for (const b of bubbles) {
    const hz = pitch[b.tag] || 880, c = b.cps || cps, n = plainLen(b.text)
    out.push(['pop', r3(b.at + 0.02), hz * 1.5, 0.03, 0])
    for (let i = 0; i < n; i += 2) if (b.text.replace(/\*/g, '')[i] !== ' ') out.push(['pop', r3(b.at + 0.18 + i / c), hz * (1 + 0.06 * ((i * 7) % 5 - 2)), gain, ((i % 4) - 1.5) * 0.12])
    out.push(['tick', r3(bubbleDone(b) + 0.02), 0.02])
    if (b.out != null) out.push(['pop', r3(b.out + 0.02), hz, 0.02, 0])
  }
  return out
}

export function whip(x, t, at, { dir = 1, dur = 0.32 } = {}) {
  const p = (t - (at - dur / 2)) / dur
  if (p <= 0 || p >= 1) return
  const k = Math.sin(Math.PI * p)
  x.save()
  x.globalAlpha = 0.85 * k
  x.fillStyle = 'rgba(12,8,30,1)'; x.fillRect(0, 0, 1080, 1920)
  x.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 46; i++) {
    const y = (i * 41.7) % 1920, len = 300 + ((i * 97) % 500), off = ((p * 2600 * dir) + i * 233) % 1700 - 300
    x.globalAlpha = 0.3 * k * (0.4 + ((i * 13) % 7) / 10)
    x.fillStyle = i % 3 ? '#cdb8ff' : '#ffd9a8'
    x.fillRect(dir > 0 ? off : 1080 - off - len, y, len, 4 + (i % 3) * 3)
  }
  x.restore()
}
export const whipCues = (at, { gain = 0.03 } = {}) => [['whoosh', r3(at + 0.08), 0.36, gain], ['tick', r3(at), 0.03]]

// ═══════════════════════════════════════════ Sag's home
const P = {
  wall: '#3a2a5f', wall2: '#45326f', wallDot: '#5a4590', trim: '#e9b46a', trim2: '#b9803f',
  floor: '#6e4636', floor2: '#5b3a2d', floorLine: '#4a2e24', rug: '#c1543b', rug2: '#e8794f', rugEdge: '#ffd27a',
  wood: '#8a5a3c', wood2: '#6f4630', woodHi: '#ad7650',
  blanket: '#f08a3c', blanket2: '#ffb36a', blanketLo: '#c86424', sheet: BONE, pillow: '#f7efe2',
  ocean: '#2c5f8f', ocean2: '#3a76aa', land: '#86c98a', land2: '#5fa86a', pin: '#ff4f6e',
  fridge: '#d8d2e8', fridgeLo: '#aaa2c4', metal: '#8b84a8', counter: '#e9e1d2', counterLo: '#c7bba6', tile: '#5b4a8a', tile2: '#6a58a0',
  jup1: '#f3c98b', jup2: '#d9925a', jup3: '#fbe7c4', jupSpot: '#c2493a',
  board: '#f4f1ea', boardLo: '#d7d1c4', glass: 'rgba(120,150,255,0.10)',
}
const ROOMS = {
  bed: { win: { x0: 620, y0: 640, x1: 960, y1: 960 } },
  kitchen: { win: { x0: 540, y0: 640, x1: 900, y1: 930 } },
  desk: { win: { x0: 780, y0: 640, x1: 990, y1: 900 } },
  window: { win: { x0: 150, y0: 620, x1: 930, y1: 1130 } },
}
export const SAG_SPOTS = {
  bed: { x: 896, y: 1205, from: 'right', where: 'leaning out from behind the packed backpack at the foot of the bed' },
  kitchen: { x: 286, y: 900, from: 'left', where: 'leaning out from behind the postcard fridge' },
  desk: { x: 120, y: 760, from: 'right', where: 'leaning out from behind the whiteboard’s left edge' },
  window: { x: 900, y: 1132, from: 'below', where: 'rising over the window sill beside the telescope' },
  bed3am: { x: 620, y: 1140, from: 'right', where: 'leaning out from behind the nightstand under the Jupiter lamp' },
}
const epIdx = ep => Math.max(0, SAG_EP.indexOf(ep))

function backWall(x, win, t) {
  const { x0, x1, y0, floor } = DIO
  x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, floor - y0); x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0); x.clip('evenodd')
  R(x, P.wall, x0, y0, x1 - x0, floor - y0)
  // wallpaper: tiny four-point stars and arrows (the archer's)
  for (let j = 0; j < 14; j++) for (let i = 0; i < 12; i++) {
    const px = x0 + 40 + i * 84 + (j % 2) * 42, py = y0 + 36 + j * 54
    if (py > floor - 30) continue
    if ((i + j) % 3 === 0) { R(x, P.wallDot, px - 2, py - 8, 4, 16); R(x, P.wallDot, px - 8, py - 2, 16, 4) }
    else if ((i * 7 + j) % 5 === 0) { R(x, P.wall2, px - 10, py, 20, 4); R(x, P.wall2, px + 6, py - 4, 4, 12) }
  }
  R(x, P.wall2, x0, floor - 60, x1 - x0, 60)                        // wainscot band
  R(x, P.trim2, x0, floor - 66, x1 - x0, 6)
  x.restore()
  // window frame + sill
  const fw = 14
  R(x, INK, win.x0 - fw - 6, win.y0 - fw - 6, win.x1 - win.x0 + 2 * fw + 12, fw + 6)
  R(x, INK, win.x0 - fw - 6, win.y1, win.x1 - win.x0 + 2 * fw + 12, fw + 6)
  R(x, INK, win.x0 - fw - 6, win.y0 - fw, fw + 6, win.y1 - win.y0 + 2 * fw)
  R(x, INK, win.x1, win.y0 - fw, fw + 6, win.y1 - win.y0 + 2 * fw)
  R(x, P.trim, win.x0 - fw, win.y0 - fw, win.x1 - win.x0 + 2 * fw, fw - 4)
  R(x, P.trim, win.x0 - fw, win.y1 + 4, win.x1 - win.x0 + 2 * fw, fw - 4)
  R(x, P.trim, win.x0 - fw, win.y0 - 4, fw - 4, win.y1 - win.y0 + 8)
  R(x, P.trim, win.x1 + 4, win.y0 - 4, fw - 4, win.y1 - win.y0 + 8)
  const mx = Math.round((win.x0 + win.x1) / 2)
  R(x, INK, mx - 5, win.y0, 10, win.y1 - win.y0); R(x, INK, win.x0, Math.round((win.y0 + win.y1) / 2) - 5, win.x1 - win.x0, 10)
  R(x, P.trim, mx - 2, win.y0, 4, win.y1 - win.y0)
  // glass glint
  x.save(); x.globalAlpha = 0.12; x.fillStyle = '#c9d6ff'
  x.beginPath(); x.moveTo(win.x0 + 20, win.y1); x.lineTo(win.x0 + 90, win.y0); x.lineTo(win.x0 + 120, win.y0); x.lineTo(win.x0 + 50, win.y1); x.fill(); x.restore()
  R(x, INK, win.x0 - 30, win.y1 + 16, win.x1 - win.x0 + 60, 18); R(x, P.trim, win.x0 - 24, win.y1 + 18, win.x1 - win.x0 + 48, 10)   // sill
}
function floorAndBox(x) {
  const { x0, x1, y0, y1, floor } = DIO
  R(x, P.floor, x0, floor, x1 - x0, y1 - floor)
  for (let j = 0; j < 4; j++) {
    const yy = floor + 8 + j * 50
    R(x, P.floorLine, x0, yy + 44, x1 - x0, 4)
    for (let i = 0; i < 6; i++) R(x, P.floorLine, x0 + ((i * 190 + j * 95) % (x1 - x0)), yy, 4, 46)
  }
  R(x, P.floor2, x0, y1 - 26, x1 - x0, 26)
  // the box: ceiling beam + ink frame (the dollhouse cutaway)
  R(x, INK, x0 - 14, y0 - 14, x1 - x0 + 28, 14); R(x, INK, x0 - 14, y1, x1 - x0 + 28, 14)
  R(x, INK, x0 - 14, y0 - 14, 14, y1 - y0 + 28); R(x, INK, x1, y0 - 14, 14, y1 - y0 + 28)
  R(x, '#5b467f', x0, y0, x1 - x0, 10)
}
function rug(x, cx, y, w) {
  R(x, INK, cx - w / 2 - 6, y - 6, w + 12, 50); R(x, P.rug, cx - w / 2, y, w, 38)
  for (let i = 0; i < w; i += 36) R(x, P.rug2, cx - w / 2 + i + 6, y + 14, 18, 10)
  R(x, P.rugEdge, cx - w / 2, y, w, 4); R(x, P.rugEdge, cx - w / 2, y + 34, w, 4)
}
/** the world map with pins: one more trip planned every episode */
const MAPBITS = [
  '...LLL......LLLLLLLLL...',
  '..LLLLL...LLLLLLLLLLLL..',
  '...LLLL...LLLLLLLLLLL...',
  '....LL.....LLLLLLLLL....',
  '.....LL...LLLL..LLLL....',
  '.....LLL..LLLL...LL..L..',
  '......LL...LLL.......LL.',
  '......L.....LL.......L..',
]
const PIN_AT = [[4, 2], [13, 1], [11, 5], [20, 4], [6, 6], [17, 2], [22, 6]]
function worldMap(x, x0, y0, w, h, nPins, t) {
  blk(x, x0, y0, w, h, P.ocean, { o: 8 })
  R(x, P.trim2, x0 - 4, y0 - 4, w + 8, 4)
  const c = Math.floor(Math.min(w / 24, h / 8) * 0.92), ox = x0 + (w - 24 * c) / 2, oy = y0 + (h - 8 * c) / 2
  for (let j = 0; j < 8; j++) for (let i = 0; i < 24; i++) if (MAPBITS[j][i] === 'L') { R(x, P.land, ox + i * c, oy + j * c, c, c); if ((i + j) % 4 === 0) R(x, P.land2, ox + i * c, oy + j * c + c / 2, c, c / 2) }
  for (let k = 0; k < nPins; k++) {
    const [i, j] = PIN_AT[k % PIN_AT.length], px = ox + i * c + c / 2, py = oy + j * c + c / 2
    const bob = k === nPins - 1 ? Math.round(Math.max(0, Math.sin(t * 3)) * 3) : 0
    R(x, INK, px - 7, py - 13 - bob, 14, 14); R(x, P.pin, px - 4, py - 10 - bob, 8, 8); R(x, '#fff', px - 3, py - 9 - bob, 3, 3); R(x, INK, px - 1, py - bob, 2, 10)
  }
  // a dashed trip line between the first and newest pin
  if (nPins > 1) {
    const [a, b] = [PIN_AT[0], PIN_AT[(nPins - 1) % PIN_AT.length]]
    const ax = ox + a[0] * c + c / 2, ay = oy + a[1] * c, bx = ox + b[0] * c + c / 2, by = oy + b[1] * c
    for (let s = 0; s < 1; s += 0.08) { const px = lerp(ax, bx, s), py = lerp(ay, by, s) - Math.sin(Math.PI * s) * 30; R(x, '#ffd27a', px - 2, py - 2, 5, 5) }
  }
}
/** the Jupiter lamp: a banded orb with the Great Red Spot (Sag's ruler, the biggest planet) */
export function jupiterLamp(x, cx, cy, r, t, glow = 0) {
  if (glow > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r * 6)
    g.addColorStop(0, `rgba(255,190,120,${0.45 * glow})`); g.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = g; x.fillRect(cx - r * 6, cy - r * 6, r * 12, r * 12); x.restore()
  }
  const c = Math.max(4, Math.round(r / 7))
  for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) {
    const d = Math.hypot(i + 0.5, j + 0.5)
    if (d > 7.4) continue
    const px = cx + i * c, py = cy + j * c
    if (d > 6.5) { R(x, INK, px, py, c, c); continue }
    const band = [P.jup3, P.jup1, P.jup2, P.jup1, P.jup3, P.jup2, P.jup1][((j + 7 + Math.floor(t * 0.5)) % 7 + 7) % 7]
    R(x, band, px, py, c, c)
  }
  R(x, P.jupSpot, cx + c, cy + 2 * c, 2 * c, c)
  R(x, INK, cx - 2 * c, cy + 7 * c, 4 * c, c); R(x, P.wood2, cx - 3 * c, cy + 8 * c, 6 * c, c * 1.4)
}
function backpack(x, cx, cy, cell, t, unpacked = 0) {
  if (unpacked < 0.5) { drawBits(x, PIX.BACKPACK, PIX.BACKPACK_C, cx, cy, cell); return }
  // slumped open: flap up, a folded shirt and a compass out on the floor
  drawBits(x, PIX.BACKPACK.slice(3), PIX.BACKPACK_C, cx, cy + 1.5 * cell, cell, { rot: -0.12 })
  const k = easeOutBack(clamp((unpacked - 0.5) * 2), 2)
  blk(x, cx + 9 * cell, cy + 4 * cell - 4 * k, 7 * cell, 3 * cell, '#7fd0ff', { o: 4, hi: '#b7e6ff' })    // the shirt
  R(x, '#ffffff', cx + 11 * cell, cy + 4 * cell - 4 * k, 3 * cell, cell)
  R(x, INK, cx - 15 * cell, cy + 5 * cell, 6 * cell, 4 * cell); R(x, GOLD, cx - 14 * cell, cy + 5.5 * cell, 4 * cell, 3 * cell)   // compass
  R(x, '#ff4f6e', cx - 12.4 * cell, cy + 6 * cell, cell * 0.8, 1.6 * cell)
}
function postcards(x, x0, y0, n) {
  const cols = ['#ffd27a', '#7fe0a8', '#ff9db8', '#9fd3ff', '#c9a6ff']
  for (let k = 0; k < n; k++) {
    const px = x0 + (k % 2) * 70 + 4, py = y0 + Math.floor(k / 2) * 66 + (k % 2) * 12
    R(x, INK, px - 3, py - 3, 66, 48); R(x, BONE, px, py, 60, 42); R(x, cols[k % cols.length], px + 4, py + 4, 26, 18)
    R(x, '#9a8fb5', px + 34, py + 8, 20, 3); R(x, '#9a8fb5', px + 34, py + 16, 16, 3); R(x, '#ff4f6e', px + 26, py - 4, 8, 8)
  }
}
function telescope(x, cx, base, t) {
  R(x, INK, cx - 4, base - 140, 8, 140)
  for (const s of [-1, 1]) for (let i = 0; i < 12; i++) R(x, INK, cx + s * i * 5 - 3, base - 70 + i * 6, 7, 8)
  x.save(); x.translate(cx, base - 150); x.rotate(-0.55)
  R(x, INK, -84, -20, 168, 40); R(x, '#d9d2ef', -80, -16, 150, 32); R(x, '#a39ac2', -80, 6, 150, 10); R(x, GOLD, 50, -18, 14, 36); R(x, INK, 70, -24, 18, 48); R(x, '#9fd3ff', 74, -20, 10, 40)
  x.restore()
}
function plant(x, cx, base, h, leaf = '#5fbf72', leaf2 = '#3f9a58') {
  blk(x, cx - 28, base - 46, 56, 46, '#c86424', { o: 5, hi: '#e8894a' })
  for (let i = 0; i < 6; i++) {
    const a = -1.2 + i * 0.48, L = h * (0.6 + 0.4 * ((i * 37) % 5) / 5)
    for (let s = 0; s < L; s += 10) R(x, i % 2 ? leaf : leaf2, cx + Math.sin(a) * s * 0.7 - 6, base - 50 - Math.cos(a * 0.6) * s, 12, 12)
  }
}

function roomBed(x, t, o) {
  const i = epIdx(o.ep), F = DIO.floor
  worldMap(x, 110, 650, 380, 210, 3 + i, t)
  // bed: headboard against the wall, mattress, blanket (the blanket's front lip is in drawSagHomeFront)
  blk(x, 140, 1000, 470, 150, P.wood, { o: 8, hi: P.woodHi })
  R(x, P.wood2, 160, 1030, 430, 8)
  blk(x, 120, 1150, 520, 120, P.sheet, { o: 8 })
  blk(x, 170, 1090, 150, 70, P.pillow, { o: 6, lo: '#d9cfbf' })
  R(x, INK, 120, 1270, 20, 34); R(x, INK, 620, 1270, 20, 34)
  // nightstand + Jupiter lamp
  blk(x, 660, 1120, 130, 150, P.wood, { o: 6, hi: P.woodHi }); R(x, INK, 690, 1180, 70, 6); R(x, GOLD, 716, 1196, 18, 8)
  if (!o.noLamp) jupiterLamp(x, 725, 1050, 42, t, o.lamp)
  rug(x, 760, F + 70, 360)
  backpack(x, 940, 1236, 7, t, o.unpacked)
}
function roomKitchen(x, t, o) {
  const i = epIdx(o.ep), F = DIO.floor
  // backsplash tiles under the window
  for (let j = 0; j < 3; j++) for (let k = 0; k < 11; k++) R(x, (j + k) % 2 ? P.tile : P.tile2, 300 + k * 66, 1000 + j * 26, 64, 24)
  // fridge (postcards: one per episode, 1 → 5)
  blk(x, 80, 720, 200, F - 720, P.fridge, { o: 8, lo: P.fridgeLo })
  R(x, INK, 80, 900, 200, 6); R(x, P.metal, 250, 790, 10, 70); R(x, P.metal, 250, 950, 10, 110)
  postcards(x, 100, 740, 1 + i)
  // counter + stove + kettle
  blk(x, 300, 1090, 700, 40, P.counter, { o: 8 }); blk(x, 300, 1130, 700, F - 1130, P.wood, { o: 0, hi: P.woodHi })
  for (let k = 0; k < 4; k++) { R(x, INK, 330 + k * 172, 1150, 150, 110); R(x, P.wood2, 336 + k * 172, 1156, 138, 98); R(x, GOLD, 395 + k * 172, 1170, 20, 6) }
  R(x, INK, 640, 1080, 160, 12); R(x, '#3a3550', 646, 1082, 148, 6)
  blk(x, 840, 1030, 70, 56, '#ff7b54', { o: 6, hi: '#ffa77f' }); R(x, INK, 900, 1040, 26, 8)
  // hanging string lights
  for (let k = 0; k < 9; k++) { const px = 330 + k * 80, py = 610 + Math.sin(k * 0.8) * 10; R(x, INK, px, py, 4, 14); R(x, ['#ffd27a', '#ff9db8', '#7fe0a8'][k % 3], px - 4, py + 12, 12, 12) }
  backpack(x, 1000, 1240, 6, t, o.unpacked)
}
function roomDesk(x, t, o) {
  const i = epIdx(o.ep)
  // the whiteboard (big ideas live here)
  blk(x, 120, 650, 600, 360, P.board, { o: 10, lo: P.boardLo })
  R(x, P.metal, 140, 1012, 560, 12)
  for (let k = 0; k < 3; k++) R(x, ['#ff4f6e', '#3a76aa', '#3f9a58'][k], 470 + k * 56, 1000, 44, 10)
  worldMap(x, 800, 930, 190, 110, 3 + i, t)
  if (!o.noLamp) jupiterLamp(x, 940, 1090, 26, t, o.lamp)
  backpack(x, 120, 1232, 6, t, o.unpacked)
}
function roomWindow(x, t, o) {
  const F = DIO.floor
  // window seat bench under the big window
  blk(x, 120, 1170, 840, F - 1170, P.wood, { o: 8, hi: P.woodHi })
  for (let k = 0; k < 4; k++) { R(x, INK, 150 + k * 205, 1205, 180, 80); R(x, P.wood2, 156 + k * 205, 1211, 168, 68) }
  blk(x, 130, 1135, 820, 40, P.blanket, { o: 6, hi: P.blanket2 })
  telescope(x, 920, 1170, t)
  plant(x, 110, F, 120)
  if (!o.noLamp) jupiterLamp(x, 1000, 1080, 22, t, o.lamp)
  backpack(x, 300, 1380, 6, t, o.unpacked)
}

export function drawSagHome(x, t, o = {}) {
  const opts = { room: 'bed', ep: 'am', dark: 0, lamp: 0, unpacked: 0, ...o }
  const win = ROOMS[opts.room].win
  backWall(x, win, t)
  floorAndBox(x)
  ;({ bed: roomBed, kitchen: roomKitchen, desk: roomDesk, window: roomWindow })[opts.room](x, t, opts)
  nightPass(x, opts, win)
}
/** the night overlay (window kept clear) + the lamp's glow back on top of it */
function nightPass(x, o, win) {
  if (o.dark <= 0) return
  const { x0, x1, y0, y1 } = DIO
  x.save(); x.beginPath(); x.rect(x0 - 14, y0 - 14, x1 - x0 + 28, y1 - y0 + 28); x.rect(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0); x.clip('evenodd')
  x.fillStyle = `rgba(8,6,34,${0.78 * clamp(o.dark)})`; x.fillRect(x0 - 14, y0 - 14, x1 - x0 + 28, y1 - y0 + 28)
  x.restore()
  // moonlight falling through the window onto the floor
  x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.1 * o.dark; x.fillStyle = '#9fb4ff'
  x.beginPath(); x.moveTo(win.x0, win.y1); x.lineTo(win.x1, win.y1); x.lineTo(win.x1 - 120, DIO.y1); x.lineTo(win.x0 - 220, DIO.y1); x.fill(); x.restore()
}
export function drawSagHomeFront(x, t, o = {}) {
  const opts = { room: 'bed', dark: 0, ...o }
  if (opts.room === 'bed') {
    blk(x, 300, 1140, 340, 130, P.blanket, { o: 8, hi: P.blanket2, lo: P.blanketLo })
    for (let k = 0; k < 4; k++) R(x, P.blanket2, 330 + k * 80, 1190, 40, 8)
    R(x, P.blanketLo, 300, 1146, 6, 120)
  }
  if (opts.room === 'desk') {
    blk(x, 200, 1170, 680, 36, P.woodHi, { o: 8 }); blk(x, 220, 1206, 640, DIO.floor - 1206 + 40, P.wood, { o: 0 })
    R(x, INK, 220, 1206, 640, 6); R(x, INK, 510, 1220, 60, 8)
    // the laptop's back (the vlog camera's POV is the laptop)
    blk(x, 400, 1060, 280, 110, '#cfc8e2', { o: 6, lo: '#a39ac2' }); R(x, '#ffffff', 528, 1100, 24, 24)
  }
  if (opts.room === 'window') R(x, P.blanketLo, 130, 1166, 820, 6)
  if (opts.dark > 0) {
    x.save(); x.globalAlpha = 0.78 * clamp(opts.dark); x.fillStyle = 'rgb(8,6,34)'
    if (opts.room === 'bed') x.fillRect(292, 1132, 356, 146)
    if (opts.room === 'desk') x.fillRect(192, 1052, 696, DIO.floor - 1052 + 48)
    x.restore()
  }
}

/** the ♐ star with its backpack on */
export function drawSag(x, cx, cy, size, t, o = {}) {
  const { pack = true, ...rest } = o
  const pop = rest.pop ?? 1
  if (pack && pop > 0.05) {
    const bob = Math.sin(t * 2.1 + (rest.seed || 1)) * size * 0.035
    drawBits(x, PIX.BACKPACK, PIX.BACKPACK_C, Math.round(cx + size * 0.33 * pop), Math.round(cy - size * 0.02 + bob), Math.max(3, Math.round(size / 26 * pop)), { rot: 0.12 })
  }
  const r = drawStarChar(x, cx, cy, size, t, { color: SAG.color, glyph: size >= 120 ? SAG.glyph : null, glow: 0.8, ...rest })
  if (pack && pop > 0.05) {      // the strap across the front
    x.save(); x.globalAlpha = rest.alpha ?? 1
    const c = Math.max(3, Math.round(size / 40 * pop))
    for (let k = 0; k < 7; k++) R(x, '#2b1c4a', r.x + size * 0.1 + k * c * 0.9, r.y - size * 0.02 + k * c * 1.3, c * 1.2, c * 1.2)
    x.restore()
  }
  return r
}
void ease
