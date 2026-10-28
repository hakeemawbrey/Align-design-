// st4heights (15 s vertical Align ad, Star Talk S4 EP 010, thread F: Virgo × Pisces, date number three) · story 0–10.6,
//   then the shared end card.
//   0.00–4.70  "Dear Virgo: | date number *three.*"  A Heights bungalow at night: low gable, tapered porch columns on
//              brick piers, a porch light. The ♍ Virgo star repaints the faded siding with a floating roller, fast.
//              Its clipboard floats beside it: "date #2 ✓" is struck off; "date #3" heads a to-do list that keeps growing
//              (repaint porch, fix step, oil hinge, re-hang light). Drop (2.82): THE STARS: "you don't have to fix the porch."
//   4.70–7.90  "It's a date. | Not a *job.*"  The ♓ Pisces star walks up the path, wide-eyed at the scaffolding of chores.
//              THE STARS: "let them *help*." A brush floats to Pisces; it flicks paint everywhere: splats on the house,
//              the stars, the clipboard. Virgo squints at its ruined list… then laughs. They both laugh.
//   8.00 cut → "Let someone | *help.*"  The two of them on the steps, polka-dotted in paint, laughing; the clipboard
//              wears a paint heart. Out by 10.45; end card at 10.6.
// One canvas (sky + bungalow + stars + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, LAV, MONO, BEAT, pop01, outK, popOut, rgba, drawBits, sparkles, floatHearts } from './kit.js'

export const EP = 10
export const DURATION = 15
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const VIR = signStar('virgo'), PIS = signStar('pisces')
const TEAL = '#5fd0c0', OLD = '#5a4a7a'

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.55, h0Out: [4.52, 4.7],
  house: 0.2, virIn: 0.45, clip: 0.75, items: [1.2, 1.7, 2.2, 3.4], open: 2.62, l1: BEAT(4),     // the drop: 2.82
  h1: 4.76, h1Land: 5.1, pisIn: [4.75, 5.4], pisWide: 5.45, l2: 5.6, brush: [6.2, 6.55], fling: [6.6, 7.6],
  clipHit: 6.95, virSquint: 7.0, laugh: 7.35, close: 7.9, h1Out: [7.76, 7.94],
  cut: 8.0, h2: 8.08, h2Land: 8.46, h2Out: [10.2, 10.42], out: [10.1, 10.45],
}
const GHOST = { at: 8.75, x: 770, y: 1022, from: 'below', dur: 1.35 }    // rises over the front window's sill, inside
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "you don't have to fix the porch." },
  { t: T.l2, speaker: SPEAK, text: 'let them *help*.' },
]
const CPS = 30
const TODO = ['repaint porch', 'fix step', 'oil hinge', 're-hang light']

// ── layout
const HOUSE = { x: 90, y: 720, w: 900, h: 560 }          // the siding block; roof above, porch floor at the bottom
const PORCH = 1280
const WIN = { x: 640, y: 830, w: 260, h: 190 }
const DOOR = { x: 470, y: 820, w: 130, h: 300 }
const VIR_A = { x: 300, y: 1150, size: 230 }, VIR_F = { x: 380, y: 1200, size: 250 }
const PIS_A = { x: 790, y: 1160, size: 220 }, PIS_F = { x: 720, y: 1210, size: 240 }
const CLIP = { x: 840, y: 820, w: 250, h: 330 }
const LOW = 190
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

// paint splats: fixed spots, flung in order (pure: a table, not random at run time)
const SPLATS = Array.from({ length: 30 }, (_, i) => {
  const h = (n) => { const v = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return v - Math.floor(v) }
  return { x: 80 + h(1) * 920, y: 640 + h(2) * 640, r: 3 + Math.floor(h(3) * 4), col: [TEAL, PINK, GOLD, LAV, '#9be08a'][i % 5], t: T.fling[0] + (i / 30) * (T.fling[1] - T.fling[0]) }
})
SPLATS.push({ x: CLIP.x + 10, y: CLIP.y + 40, r: 7, col: PINK, t: T.clipHit, heart: true })

function virState(t) {
  if (t < T.l1) return { mood: 'squint', look: [-1, -1], blink: false }            // focused on the siding
  if (t < T.h1) return { mood: 'neutral', look: [1, -0.5] }
  if (t < T.pisWide) return { mood: 'squint', look: [-1, -1], blink: false }        // back to work
  if (t < T.brush[0]) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.virSquint) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.laugh) return { mood: 'squint', look: [1, -1], blink: false }           // its list. its beautiful list.
  if (t < T.cut) return { mood: 'happy' }
  return { mood: t > 9.4 ? 'heart' : 'happy' }
}
function pisState(t) {
  if (t < T.pisWide) return { mood: 'happy' }
  if (t < T.brush[0]) return { mood: 'wide', look: [-1, -1], blink: false }        // the chore list
  if (t < T.laugh) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.cut) return { mood: 'happy' }
  return { mood: t > 9.6 ? 'heart' : 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear Virgo: | date number *three.*', { top: 200, size: 104, accentSize: 160, at: T.h0, gap: 0.09, late: 1, lateAt: T.h0Land, wobble: true, accentColor: VIR.color, fit: true })
  const H1 = popText(root, "It's a date. | Not a *job.*", { top: 200, size: 116, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Let someone | *help.*', { top: 200, size: 128, accentSize: 210, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: TEAL, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const painted = t => t < 0.7 ? 0 : t < T.h1 ? lerp(0, 0.46, ease.inOutQuad(prog(t, 0.7, T.h1))) : t < T.pisWide ? lerp(0.46, 0.55, prog(t, T.h1, T.pisWide)) : 0.55
  function rollerPos(t, dy) {
    const p = painted(t), busy = t > 0.7 && t < T.pisWide
    return { x: HOUSE.x + HOUSE.w * p, y: HOUSE.y + HOUSE.h * (0.42 + 0.3 * (busy ? Math.sin(t * 11) : 0)) + dy }
  }

  function drawHouse(t, dy, ok, rise) {
    const H = HOUSE, oy = dy + (1 - rise) * 900
    x.save(); x.globalAlpha *= ok; x.translate(0, oy)
    // roof: a low, wide gable with deep eaves + exposed rafter tails
    x.fillStyle = INK; x.beginPath(); x.moveTo(H.x - 50, H.y + 4); x.lineTo(540, H.y - 150); x.lineTo(H.x + H.w + 50, H.y + 4); x.closePath(); x.fill()
    x.fillStyle = '#3d2756'; x.beginPath(); x.moveTo(H.x - 34, H.y - 4); x.lineTo(540, H.y - 138); x.lineTo(H.x + H.w + 34, H.y - 4); x.closePath(); x.fill()
    x.fillStyle = '#2a1a3e'; for (let i = 0; i < 9; i++) x.fillRect(H.x - 30 + i * 118, H.y - 2, 14, 18)
    x.fillStyle = '#ffd98a'; x.fillRect(520, H.y - 92, 40, 30); x.fillStyle = INK; x.fillRect(538, H.y - 92, 4, 30); x.fillRect(520, H.y - 79, 40, 4)   // attic vent window
    // siding: faded, then repainted left → right
    const sid = (col, line) => { x.fillStyle = col; x.fillRect(H.x, H.y, H.w, H.h - 40); x.fillStyle = line; for (let j = 0; j < (H.h - 40) / 26; j++) x.fillRect(H.x, H.y + 22 + j * 26, H.w, 4) }
    sid(OLD, '#4a3c68')
    const pw = painted(t)
    if (pw > 0) { x.save(); x.beginPath(); x.rect(H.x, H.y, H.w * pw, H.h); x.clip(); sid(TEAL, '#46a89a'); x.restore() }
    if (pw > 0.02 && pw < 0.99) { x.fillStyle = TEAL; for (let k = 0; k < 5; k++) x.fillRect(H.x + H.w * pw - 6, H.y + 60 + k * 90, 6, 10 + 14 * ((Math.sin(k * 2.3 + t * 3) + 1) / 2)) }
    // door + window
    x.fillStyle = INK; x.fillRect(DOOR.x - 10, DOOR.y - 10, DOOR.w + 20, DOOR.h + 10)
    x.fillStyle = '#8a4a3a'; x.fillRect(DOOR.x, DOOR.y, DOOR.w, DOOR.h)
    x.fillStyle = '#ffd98a'; for (let i = 0; i < 3; i++) x.fillRect(DOOR.x + 16 + i * 36, DOOR.y + 24, 26, 40)
    x.fillStyle = GOLD; x.fillRect(DOOR.x + DOOR.w - 26, DOOR.y + 160, 12, 12)
    x.fillStyle = INK; x.fillRect(WIN.x - 12, WIN.y - 12, WIN.w + 24, WIN.h + 24)
    const wg = x.createLinearGradient(0, WIN.y, 0, WIN.y + WIN.h); wg.addColorStop(0, '#ffd98a'); wg.addColorStop(1, '#f2a65a')
    x.fillStyle = wg; x.fillRect(WIN.x, WIN.y, WIN.w, WIN.h)
    x.restore()
  }
  function drawWindowFrame(t, dy, ok, rise) {   // the sill + mullions on top (the ghost hides below the sill)
    x.save(); x.globalAlpha *= ok; x.translate(0, dy + (1 - rise) * 900)
    x.fillStyle = INK; x.fillRect(WIN.x + WIN.w / 2 - 5, WIN.y, 10, WIN.h); x.fillRect(WIN.x, WIN.y + 60, WIN.w, 8)
    x.fillStyle = '#efe6d6'; x.fillRect(WIN.x - 22, WIN.y + WIN.h + 2, WIN.w + 44, 16); x.fillStyle = INK; x.fillRect(WIN.x - 22, WIN.y + WIN.h + 18, WIN.w + 44, 6)
    x.restore()
  }
  function drawPorch(t, dy, ok, rise) {
    const oy = dy + (1 - rise) * 900
    x.save(); x.globalAlpha *= ok; x.translate(0, oy)
    // porch floor + steps
    x.fillStyle = INK; x.fillRect(60, PORCH - 46, 960, 60)
    x.fillStyle = '#6a4a3a'; x.fillRect(66, PORCH - 40, 948, 44)
    x.fillStyle = '#8a6a4a'; x.fillRect(66, PORCH - 40, 948, 8)
    for (let s = 0; s < 3; s++) { x.fillStyle = INK; x.fillRect(430 - s * 20, PORCH + 4 + s * 34, 220 + s * 40, 36); x.fillStyle = s === 1 ? '#5a3a2e' : '#7a5a40'; x.fillRect(436 - s * 20, PORCH + 6 + s * 34, 208 + s * 40, 28) }
    // tapered columns on brick piers, a railing between
    for (const cx of [120, 400, 680, 960]) {
      x.fillStyle = INK; x.fillRect(cx - 44, PORCH - 200, 88, 164)
      x.fillStyle = '#9a4a3a'; x.fillRect(cx - 38, PORCH - 194, 76, 154)
      x.fillStyle = '#7a3a2e'; for (let j = 0; j < 6; j++) x.fillRect(cx - 38, PORCH - 186 + j * 26, 76, 4)
      x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 34, PORCH - 196); x.lineTo(cx - 20, HOUSE.y + 30); x.lineTo(cx + 20, HOUSE.y + 30); x.lineTo(cx + 34, PORCH - 196); x.fill()
      x.fillStyle = '#efe6d6'; x.beginPath(); x.moveTo(cx - 26, PORCH - 200); x.lineTo(cx - 14, HOUSE.y + 34); x.lineTo(cx + 14, HOUSE.y + 34); x.lineTo(cx + 26, PORCH - 200); x.fill()
    }
    x.fillStyle = '#efe6d6'; x.fillRect(HOUSE.x - 30, HOUSE.y + 14, HOUSE.w + 60, 18)   // porch beam
    // porch light
    const fl = 0.85 + 0.15 * Math.sin(t * 7)
    x.fillStyle = INK; x.fillRect(612, DOOR.y + 20, 22, 34); x.fillStyle = '#fff3c4'; x.fillRect(616, DOOR.y + 24, 14, 24)
    const g = x.createRadialGradient(623, DOOR.y + 36, 0, 623, DOOR.y + 36, 140); g.addColorStop(0, `rgba(255,220,150,${0.35 * fl})`); g.addColorStop(1, 'rgba(255,220,150,0)')
    x.fillStyle = g; x.fillRect(483, DOOR.y - 104, 280, 280)
    x.restore()
  }
  function drawRoller(t, dy, ok, pop) {
    if (pop <= 0.02 || t > T.brush[0]) return
    const R = rollerPos(t, dy), c = 6, a = 1 - prog(t, T.pisWide, T.brush[0])
    x.save(); x.globalAlpha *= ok * a; x.translate(R.x, R.y); x.scale(pop, pop)
    x.fillStyle = INK; x.fillRect(-4, 18, 12, 120); x.fillStyle = '#c98a1f'; x.fillRect(-1, 20, 6, 116)
    x.fillStyle = INK; x.fillRect(-14 * c / 2 - 6, -30, 14 * c + 12, 60)
    x.fillStyle = TEAL; x.fillRect(-14 * c / 2, -24, 14 * c, 48); x.fillStyle = '#9cf0e4'; x.fillRect(-14 * c / 2, -24, 14 * c, 10)
    x.restore()
  }
  function drawBrush(t, dy, ok) {
    if (t < T.brush[0] || t > T.cut) return
    const p = ease.outBack(prog(t, ...T.brush)), flick = t > T.fling[0] && t < T.fling[1] ? Math.sin(t * 26) * 0.7 : 0
    const bx = lerp(560, PIS_A.x - 130, p), by = lerp(PORCH + dy - 10, PIS_A.y + dy - 120, p)
    x.save(); x.globalAlpha *= ok; x.translate(bx, by); x.rotate(-0.5 + flick)
    x.fillStyle = INK; x.fillRect(-8, -10, 16, 90); x.fillStyle = '#c98a1f'; x.fillRect(-4, -6, 8, 82)
    x.fillStyle = INK; x.fillRect(-20, -54, 40, 48); x.fillStyle = '#c0c0d0'; x.fillRect(-16, -22, 32, 14)
    x.fillStyle = PINK; x.fillRect(-16, -50, 32, 28)
    x.restore()
  }
  function drawClipboard(t, dy, ok) {
    const k = easeOutBack(prog(t, T.clip, T.clip + 0.4), 1.8) * ok * (t > T.cut ? 1 : 1)
    if (k <= 0.01) return
    const C = t < T.cut ? CLIP : { x: 540, y: 820, w: 250, h: 330 }
    x.save(); x.translate(C.x, C.y + dy + Math.sin(t * 1.8) * 6); x.rotate(t < T.cut ? 0.06 : -0.05); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-C.w / 2 - 8, -C.h / 2 - 8, C.w + 16, C.h + 16)
    x.fillStyle = '#b07a3a'; x.fillRect(-C.w / 2, -C.h / 2, C.w, C.h)
    x.fillStyle = '#fbf6ea'; x.fillRect(-C.w / 2 + 16, -C.h / 2 + 30, C.w - 32, C.h - 44)
    x.fillStyle = INK; x.fillRect(-46, -C.h / 2 - 16, 92, 36); x.fillStyle = '#c0c0d0'; x.fillRect(-38, -C.h / 2 - 10, 76, 24)
    x.textAlign = 'left'; x.textBaseline = 'middle'
    const L = -C.w / 2 + 30
    x.font = `700 26px ${MONO}`; x.fillStyle = '#8a8aa0'; x.fillText('date #2', L, -C.h / 2 + 60)
    x.fillStyle = '#3a9a5a'; x.fillText('✓', L + 134, -C.h / 2 + 60)
    x.fillStyle = '#8a8aa0'; x.fillRect(L - 4, -C.h / 2 + 60, 120, 3)
    x.font = `700 30px ${MONO}`; x.fillStyle = VIR.color; x.fillText('date #3', L, -C.h / 2 + 104)
    x.font = `700 20px ${MONO}`; x.fillStyle = '#2a2040'
    TODO.forEach((item, i) => {
      const ip = prog(t, T.items[i], T.items[i] + 0.2)
      if (ip <= 0) return
      x.save(); x.globalAlpha *= ip; x.translate((1 - ip) * 20, 0)
      x.strokeStyle = '#2a2040'; x.lineWidth = 2; x.strokeRect(L, -C.h / 2 + 136 + i * 38, 16, 16)
      x.fillText(item, L + 26, -C.h / 2 + 145 + i * 38)
      x.restore()
    })
    // the paint heart it gets, right over the list
    if (t > T.clipHit) {
      const hp = easeOutBack(prog(t, T.clipHit, T.clipHit + 0.25), 2.2)
      drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 0, 40, 18 * hp, { outline: null })
    }
    x.restore()
  }
  function drawSplats(t, dy, ok) {
    for (const s of SPLATS) {
      if (s.heart || t < s.t) continue
      if (s.x > WIN.x - 60 && s.x < WIN.x + WIN.w + 60 && s.y > WIN.y - 60 && s.y < WIN.y + WIN.h + 40) continue   // keep the window clear
      const p = easeOutBack(prog(t, s.t, s.t + 0.18), 2.4), c = 7
      x.save(); x.globalAlpha *= ok; x.fillStyle = s.col
      const R = s.r * p
      for (let j = -s.r; j <= s.r; j++) for (let i = -s.r; i <= s.r; i++) if ((i + 0.5) ** 2 + (j + 0.5) ** 2 <= R * R) x.fillRect(Math.round(s.x + i * c), Math.round(s.y + dy + j * c), c, c)
      if (p >= 1) x.fillRect(Math.round(s.x), Math.round(s.y + dy + s.r * c), c, c * (1 + Math.min(4, (t - s.t) * 3)))
      x.restore()
    }
  }
  /** paint polka dots on a star (deterministic), after the fling */
  function dots(t, cx, cy, size, seed, t0) {
    if (t < t0) return
    const cols = [TEAL, GOLD, LAV, '#9be08a', PINK]
    for (let i = 0; i < 6; i++) {
      const born = t0 + i * 0.12; if (t < born) continue
      const a = seed + i * 2.1, r = size * (0.12 + 0.18 * ((i * 37) % 5) / 4)
      const s = Math.round(size / 26) * (i % 2 ? 2 : 3)
      x.fillStyle = cols[(i + seed) % 5]; x.fillRect(Math.round(cx + Math.cos(a) * r - s / 2), Math.round(cy + Math.sin(a) * r * 0.8 - s / 2), s, s)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), dy = LOW * lowK(t), rise = ease.outCubic(prog(t, T.house, T.house + 0.55))
      if (ok > 0) {
        drawHouse(t, dy, ok, rise)
        drawWindowFrame(t, dy, ok, rise)
        drawPorch(t, dy, ok, rise)
        drawSplats(t, dy, ok)
        drawGhostCameo(x, t, { ...GHOST, y: GHOST.y + dy })
        const vp = pop01(t, T.virIn, 0.34, 2.1) * ok
        const V = t < T.cut ? VIR_A : VIR_F, P = t < T.cut ? PIS_A : PIS_F
        if (vp > 0.02) {
          const laughing = (t > T.laugh && t < T.cut) || t > T.h2Land ? 0.05 * Math.sin(t * 22) : 0
          drawStarChar(x, V.x, V.y + dy, V.size, t, { color: VIR.color, glyph: VIR.glyph, ...virState(t), pop: vp, seed: 2, glow: 1, squash: laughing, hops: [T.virIn + 0.3, T.pisWide, T.laugh, T.laugh + 0.4, T.h2Land, 9.2, 9.9] })
          dots(t, V.x, V.y + dy, V.size, 1, T.fling[0] + 0.3)
          if (t < T.brush[0]) drawRoller(t, dy, ok, vp)
        }
        const wk = ease.inOutCubic(prog(t, ...T.pisIn))
        if (t > T.pisIn[0]) {
          const px = t < T.cut ? lerp(1250, P.x, wk) : P.x, walk = t < T.pisIn[1] ? Math.abs(Math.sin(t * 14)) * 24 : 0
          const laughing = (t > T.laugh && t < T.cut) || t > T.h2Land ? 0.05 * Math.sin(t * 22 + 1) : 0
          drawStarChar(x, px, P.y + dy - walk, P.size * ok, t, { color: PIS.color, glyph: PIS.glyph, ...pisState(t), seed: 6, glow: 1, squash: laughing, hops: [T.pisWide, T.brush[1], T.laugh + 0.2, T.laugh + 0.6, T.h2Land + 0.1, 9.5, 10.0] })
          dots(t, px, P.y + dy, P.size, 3, T.fling[0] + 0.5)
        }
        drawBrush(t, dy, ok)
        drawClipboard(t, dy, ok)
        sparkles(x, t, CLIP.x, CLIP.y + dy, T.clipHit, 10, 160, 1, [PINK, GOLD, BONE])
        if (t > T.laugh) floatHearts(x, t, 540, 1050 + dy, t < T.cut ? T.laugh : T.h2Land, t < T.cut ? T.cut - 0.3 : T.out[0] - 0.3, 2, 6, 380)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.74 (inert: H0 → H1 while the box talks) and 8.0 (box shut → "Let someone help.").
const CUTS = [4.74, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.09, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['whoosh', T.house, 0.5, 0.03], ['pop', T.virIn + 0.05, 659.25, 0.035, -0.3], ['pop', T.clip + 0.1, 880, 0.035, 0.4],
  ...T.items.map((it, i) => ['tick', it, 0.03 + i * 0.004]),
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SPEAK]: 880 } }),
  ...wordPops(T.h1, 4, 0.08, 2, 0.025), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ...Array.from({ length: 4 }, (_, i) => ['tick', +(T.pisIn[0] + 0.1 + i * 0.15).toFixed(3), 0.02]), ['pop', T.pisWide, 440, 0.035, 0.3],
  ['whoosh', T.brush[0], 0.3, 0.03], ['pop', T.brush[1], 987.77, 0.035, 0.3],
  ...SPLATS.filter((_, i) => i % 3 === 0).map((s, i) => ['pop', +s.t.toFixed(3), [523.25, 659.25, 783.99][i % 3], 0.022, (s.x - 540) / 600]),
  ['pop', T.clipHit, 392, 0.045, 0.3], ['tick', T.virSquint, 0.03], ['pluck', T.laugh, 1174.66, 0.04, 0.5, 0], ['glitter', T.laugh, T.laugh + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['bell', 9.4, 1760, 0.022, 1.0, -0.2], ['bell', 9.6, 1567.98, 0.022, 1.0, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
