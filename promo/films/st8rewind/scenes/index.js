// st8rewind (40 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E21, an 80s sci-fi movie) · story 0–35.6,
// then the shared end card.
//   "The twin built a *time machine.*"  Gemini's mustached twin (st5cast) welds a wedge-shaped pixel time car in a garage
//   that opens onto a synthwave horizon. Venus is still retrograde (the day chip), and he wants to go back to his ex.
//   0.00       frame 0: the hook card is already up; the twin is mid-weld on the car's tail, sparks flying. The car faces
//              LEFT (the past). The loop it opens: will he really go back?
//   2.35       the title slams in, chrome and pink, like the poster: "BACK TO THE *EX*".
//   3.15       TWIN: "one trip back. this time i *fix* it."
//   5.30       the time circuits light up: DESTINATION TIME · LAST SPRING / PRESENT TIME · VENUS Rx DAY 37.
//   6.55       Retro (season 4's backwards-spinning Mercury orb) rolls in. RETRO: "i've been backwards. it's a *rerun.*"
//   10.1       TWIN: "relax. *88* or bust."  He jumps in; the gull-wing door slams. 86 · 87 · 88 MPH, flames, FLASH.
//   14.1       VHS: ▶ PLAY · LAST SPRING · 11:11 PM, a RERUN bug. The twin and his ex on the same couch, the same fight:
//              EX: "you never text *back.*" / TWIN: "i was GOING to!"  ◀◀ REW: again (RERUN ×2), and again (×3), faster.
//   21.3       EX (kindly): "we've *had* this fight. it ends the same."  Gasp zoom on the twin. ◀◀ back to the garage.
//   24.42      card cut.  RETRO: "look back to *learn.* then drive *forward.*"  The dial flips to TOMORROW, the car turns
//              round to face RIGHT, TWIN: "new destination: *tomorrow.*"
//   30.95      "The past is a | *rerun.*"  The last shot rhymes with frame 0 (car, twin, garage), turned round; the car
//              launches right and leaves two fire tracks. Everything is out by 35.4.
// Rewatch bait: the plate reads NO REDO; the clock in the rerun room says 11:11 every single time, and the tiny TV behind
// the couch is showing the same fight. The hidden Comet crosses the synthwave sky through the garage door at 8.6.
// Real: Mercury and Venus retrogrades are apparent backward drifts (Retro is Mercury, season 4). No fortune-telling.
// One canvas (sky + garage / rerun room + cast + HUDs), DOM type, the dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { TWIN, drawTwin, drawBits, gaspZoom, drawGaspLines, gaspCues } from '../../st5cast.js'
import { drawComet, exPin, drawDayChip, hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'

export const DURATION = 40
const KEY = 'F#m'
const STORY_END = DURATION - ENDCARD_LEN       // 35.6
const W = 1080
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fdcff', MINT = '#7fe0b8', HOT = '#ff4f9a', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const SYM = "'Noto Sans Symbols 2', 'Noto Sans Symbols', 'Segoe UI Symbol', 'DejaVu Sans', sans-serif"

// ── the timeline
const T = {
  hookOut: 2.3, weld: [0, 2.9],
  title: 2.35, titleOut: [4.85, 5.1],
  open1: 2.95, l1: 3.15, hud: 5.3, hudOut: [10.0, 10.25],
  retro: 6.55, l2: 6.9, comet: 8.6, l3: 10.1, close1: 12.7,
  hop: 11.15, door: [11.2, 11.45], speedo: 11.75, mph: [11.9, 12.4, 12.9], rumble: [11.6, 13.5], flash: 13.5, trails: [13.5, 14.1],
  room: 14.1, h1: 14.3, h1Land: 14.75, h1Out: [20.75, 20.95],
  pass: [[14.6, 15.4, 17.4], [17.95, 18.25, 19.5], [20.0, 20.15, 21.0]], rew: [[17.4, 17.9], [19.5, 19.95]],
  ghost: 18.6, open2: 21.1, l4: 21.3, h2: 21.05, h2Land: 21.5, h2Out: [24.05, 24.25], gasp: 22.75, rewBack: [23.7, 24.4],
  cut: 24.42, garage2: 24.42, l5: 24.95, hud2: 26.9, flipDial: 27.35, turn: [27.75, 28.25], hop2: 28.3, l6: 28.45, close2: 30.6,
  hud2Out: [30.4, 30.65],
  h3: 30.95, h3Land: 31.45, launch: [33.55, 34.1], h3Out: [35.0, 35.35], out: [35.05, 35.4],
}
const TWN = TWIN.tag, RET = '☿ RETRO', EXN = 'THE EX', NARR = 'THE STARS'
const EXC = '#b9a4e8'
const LINES1 = [
  { t: T.l1, speaker: TWN, text: 'one trip back. this time i *fix* it.', color: TWIN.tagColor },
  { t: T.l2, speaker: RET, text: 'i’ve been backwards. it’s a *rerun.*', color: GOLD },
  { t: T.l3, speaker: TWN, text: 'relax. *88* or bust.', color: TWIN.tagColor },
]
const LINES2 = [
  { t: T.l4, speaker: EXN, text: 'we’ve *had* this fight. it ends the same.', color: EXC },
  { t: T.l5, speaker: RET, text: 'look back to *learn.* then drive *forward.*', color: GOLD },
  { t: T.l6, speaker: TWN, text: 'new destination: *tomorrow.*', color: TWIN.tagColor },
]
const CPS = 28
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })
const HOOK = 'The twin built a | *time machine.*'
const LAST = 'The past is a | *rerun.*'
const BUBBLES = { ex: 'you never text *back.*', twin: 'i was GOING to!' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inRoom = t => t >= T.room && t < T.rewBack[1]

// ── layout
const FLOOR = 1330                                   // the garage floor line (wheels stand on it)
const DOOR = { x0: 110, x1: 970, y0: 560, y1: FLOOR }  // the open roller door onto the synthwave horizon
const HORIZON = 1140
const CAR = { x: 456, y: FLOOR, c: 9 }               // x = centre, y = the floor under the wheels, c = cell px
const TW0 = { x: 935, y: 1196, size: 236 }            // the twin, standing by the car's tail (car faces left)
const ORB = { x: 150, y: 1060, r: 74 }                // Retro, parked on the left
const EXS = { x: 770, y: 1196, size: 250 }, TWR = { x: 310, y: 1196, size: 250 }   // the rerun couch
const TV = { x: 540, y: 905 }
const CLOCK = { x: 540, y: 690 }
export const GHOST = { at: T.ghost, x: 952, y: 1262, where: 'leaning out past the right arm of the rerun couch, under the EX’s side' }
export const COMET = { at: T.comet }

// ── the car: a wedge, steel, gull-wing door, built from cells. Columns 0…83, rows 0…22 (row 21 = the sill); nose at col 0
// when it faces left (dir = -1 flips it to face right).
const NC = 84
function carTop(i) {
  if (i < 10) return Math.round(lerp(15, 11, i / 10))       // the nose wedge
  if (i < 26) return Math.round(lerp(11, 9, (i - 10) / 16))  // the long hood
  if (i < 36) return Math.round(lerp(9, 2, (i - 26) / 10))   // the windshield rake
  if (i < 54) return 2                                         // the roof
  if (i < 64) return Math.round(lerp(2, 8, (i - 54) / 10))   // the rear louvres
  return i < 80 ? 8 : 9                                        // the deck and the tail
}
const WHEELS = [18, 66]
function carCell(i, j) {
  if (j < carTop(i) || j > 21) return null
  for (const w of WHEELS) if (Math.hypot(i - w, j - 21) < 8.2) return null
  const glass = j < 9 && i > 27 && i < 60 && j >= carTop(i) + 1
  if (glass) return (i + j) % 9 === 0 || (i - j) % 13 === 0 ? 'G' : 'g'
  if (j === carTop(i)) return 'h'
  if (j === 14 || j === 15) return 'k'                        // the black waist stripe
  if (i === 44 && j > 9 && j < 14) return 'd'                 // the door seam
  if (j > 17) return 'l'
  return 's'
}
const CAR_COL = { h: '#eef2f8', s: '#b4bccb', l: '#8790a3', k: '#2a2440', d: '#6e7690', g: '#253457', G: '#5fa8d8' }
const CAP = ['XXXXX', '.X.X.', '.X.X.', '.X.X.', 'XXXXX']    // the "twin capacitor": a ♊ that glows in the cabin
const PLATE = 'NO REDO'

/** the twin's state per beat: where, how big, mood */
function twinState(t) {
  if (t < T.weld[1]) return { x: TW0.x, y: TW0.y, size: TW0.size, mood: 'squint', look: [-1, 0.6], pop: 1 }
  if (t < T.l2) return { x: TW0.x, y: TW0.y, size: TW0.size, mood: 'happy', look: [0, 0], pop: 1 }
  if (t < T.l3) return { x: TW0.x, y: TW0.y, size: TW0.size, mood: t < LT1[1].done ? 'eyeroll' : 'neutral', look: [-1, 0], pop: 1 }
  if (t < T.hop) return { x: TW0.x, y: TW0.y, size: TW0.size, mood: 'sparkle', look: [0, 0], pop: 1 }
  if (t < T.room) return { cabin: true, mood: t < T.speedo ? 'happy' : 'wide', look: [-1, 0] }
  if (t < T.rewBack[1]) return null                            // he's on the couch (drawn in the room)
  if (t < T.hop2) return { x: TW0.x, y: TW0.y, size: TW0.size, mood: t < T.l5 + 1.2 ? 'neutral' : t < T.flipDial ? 'squint' : 'sparkle', look: t < T.flipDial ? [-1, -0.4] : [0, 0], pop: 1 }
  return { cabin: true, mood: t < T.launch[0] ? 'happy' : 'wide', look: [1, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 44px Inter", "italic 500 190px 'EB Garamond'", "italic 700 120px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 74px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const hook = hookCard(root, { text: HOOK, at: 0, out: T.hookOut, accentColor: PINK })
  const H1 = popText(root, 'Last spring. | *Again.*', { top: 196, size: 112, accentSize: 172, at: T.h1, gap: 0.09, accentColor: PINK, wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Same fight. | Same *ending.*', { top: 196, size: 108, accentSize: 164, at: T.h2, gap: 0.08, accentColor: LAV, wobble: true, late: 1, lateAt: T.h2Land, fit: true })
  const H3 = popText(root, LAST, { top: 190, size: 120, accentSize: 190, at: T.h3, gap: 0.09, accentColor: PINK, wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1452, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1452, width: 960, height: 290, open: T.open2, close: T.close2, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // Retro's orb sprite (16-cell gold ball, as in stretro / st4retrosorry)
  const ORB_G = 16
  const orbBuf = document.createElement('canvas'); orbBuf.width = orbBuf.height = ORB_G
  {
    const o = orbBuf.getContext('2d'), h = ORB_G / 2
    for (let j = 0; j < ORB_G; j++) for (let i = 0; i < ORB_G; i++) {
      const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
      if (d > 1) continue
      let c = d > 0.86 ? '#b8792a' : (u * 0.6 + v * 0.8 > 0.35 ? '#e0a743' : '#f7cf68')
      if (d <= 0.86 && Math.hypot(u + 0.38, v + 0.4) < 0.24) c = '#fff1c8'
      if (d > 0.86 && u + v < -0.6) c = '#ffd98a'
      o.fillStyle = c; o.fillRect(i, j, 1, 1)
    }
  }
  // the car body, baked once to an offscreen canvas (1 px per cell; drawn scaled with smoothing off)
  const carBuf = document.createElement('canvas'); carBuf.width = NC + 2; carBuf.height = 24
  {
    const o = carBuf.getContext('2d')
    for (let j = 0; j < 23; j++) for (let i = 0; i < NC; i++) {
      const c = carCell(i, j)
      if (c) { o.fillStyle = CAR_COL[c]; o.fillRect(i + 1, j + 1, 1, 1) }
      else if (carCell(i - 1, j) || carCell(i + 1, j) || carCell(i, j - 1) || carCell(i, j + 1)) { o.fillStyle = INK; o.fillRect(i + 1, j + 1, 1, 1) }
    }
  }
  const STARS = (() => { const r = rng(2108); return Array.from({ length: 26 }, () => [DOOR.x0 + 20 + r() * (DOOR.x1 - DOOR.x0 - 40), DOOR.y0 + 20 + r() * (HORIZON - DOOR.y0 - 200), r()]) })()

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function mono(text, cx, cy, size, col, { align = 'center', shadow = true, ls = 0 } = {}) {
    x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.letterSpacing = ls + 'px'
    if (shadow) { x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(text, cx + 3, cy + 4) }
    x.fillStyle = col; x.fillText(text, cx, cy); x.letterSpacing = '0px'
  }

  // ── the garage: brick wall, the open roller door onto a synthwave horizon, a pegboard, the floor
  function garage(t) {
    // the horizon through the door: the sky shows through, then a striped sun and a magenta grid
    x.save(); x.beginPath(); x.rect(DOOR.x0, DOOR.y0, DOOR.x1 - DOOR.x0, DOOR.y1 - DOOR.y0); x.clip()
    for (const [sx, sy, ph] of STARS) { const tw = 0.5 + 0.5 * Math.sin(t * 2 + ph * 9); drawPixelStar(x, sx, sy, 10 + 8 * ph, tw > 0.7 ? 1 : 0, ph > 0.6 ? PINK : BONE) }
    // the hidden Comet: one tiny pass across the door's sky (it shows up for real in E02; it still drifts by here)
    drawComet(x, lerp(DOOR.x1 + 40, DOOR.x0 - 60, prog(t, T.comet, T.comet + 1.6)), lerp(640, 700, prog(t, T.comet, T.comet + 1.6)), 30, t, { aura: false, exPin: false, tail: 90, mood: 'happy', sunDir: [-1, 0.2], alpha: t > T.comet && t < T.comet + 1.6 ? 0.85 : 0 })
    const sunR = 170, scx = 540, scy = HORIZON - 30
    for (let yy = scy - sunR; yy < HORIZON; yy += 6) {
      const dy = yy - scy, half = Math.sqrt(Math.max(0, sunR * sunR - dy * dy)), k = (yy - (scy - sunR)) / (sunR + 30)
      if (yy > scy - 40 && Math.floor((yy - scy + 40) / 14) % 2 === 1) continue          // the classic stripes
      x.fillStyle = k < 0.45 ? '#ffd36e' : k < 0.75 ? '#ff9a6a' : '#ff5f8f'
      x.fillRect(Math.round(scx - half), yy, Math.round(half * 2), 6)
    }
    glow(scx, scy, 420, '#ff5f8f', 0.55)
    x.fillStyle = '#1a0b33'; x.fillRect(DOOR.x0, HORIZON, DOOR.x1 - DOOR.x0, DOOR.y1 - HORIZON)
    x.strokeStyle = 'rgba(255,79,154,0.75)'; x.lineWidth = 3
    const scroll = (t * 0.9) % 1
    for (let k = 0; k < 9; k++) { const p = (k + scroll) / 9, yy = HORIZON + (DOOR.y1 - HORIZON) * p * p; x.beginPath(); x.moveTo(DOOR.x0, Math.round(yy)); x.lineTo(DOOR.x1, Math.round(yy)); x.stroke() }
    for (let k = -10; k <= 10; k++) { x.beginPath(); x.moveTo(540 + k * 40, HORIZON); x.lineTo(540 + k * 220, DOOR.y1); x.stroke() }
    x.restore()
    // the wall around the door
    x.fillStyle = '#21183f'; x.fillRect(0, 430, DOOR.x0, FLOOR - 430); x.fillRect(DOOR.x1, 430, W - DOOR.x1, FLOOR - 430); x.fillRect(0, 430, W, DOOR.y0 - 430)
    x.fillStyle = '#2b2150'
    for (let yy = 440; yy < FLOOR; yy += 28) for (let xx = ((yy / 28) % 2) * 30; xx < W; xx += 60) {
      if (xx + 54 > DOOR.x0 && xx < DOOR.x1 && yy + 22 > DOOR.y0) continue
      x.fillRect(xx, yy, 54, 22)
    }
    // the rolled-up door drum, the frame
    x.fillStyle = INK; x.fillRect(DOOR.x0 - 14, DOOR.y0 - 14, DOOR.x1 - DOOR.x0 + 28, 14); x.fillRect(DOOR.x0 - 14, DOOR.y0, 14, FLOOR - DOOR.y0); x.fillRect(DOOR.x1, DOOR.y0, 14, FLOOR - DOOR.y0)
    x.fillStyle = '#4a4070'; x.fillRect(DOOR.x0, DOOR.y0, DOOR.x1 - DOOR.x0, 34)
    x.fillStyle = '#5c5488'; for (let xx = DOOR.x0; xx < DOOR.x1; xx += 12) x.fillRect(xx, DOOR.y0 + 4, 6, 26)
    // a hanging bulb, swinging a little
    const sw = Math.sin(t * 1.3) * 0.08
    x.save(); x.translate(980, 430); x.rotate(sw); x.fillStyle = INK; x.fillRect(-2, 0, 4, 80); x.fillStyle = '#fff1c8'; x.fillRect(-12, 80, 24, 26); x.restore()
    glow(980 + Math.sin(sw) * 90, 525, 180, GOLD, 0.6)
    // the floor
    const fg = x.createLinearGradient(0, FLOOR, 0, 1920); fg.addColorStop(0, '#2a2246'); fg.addColorStop(1, '#100b22')
    x.fillStyle = fg; x.fillRect(0, FLOOR, W, 1920 - FLOOR)
    x.fillStyle = INK; x.fillRect(0, FLOOR - 4, W, 8)
    x.fillStyle = 'rgba(255,79,154,0.14)'; x.fillRect(DOOR.x0, FLOOR + 4, DOOR.x1 - DOOR.x0, 40)  // the sunset spilling in
    // the sunset's reflection on the polished floor: broken pink and gold stripes
    for (let j = 0; j < 14; j++) {
      const yy = FLOOR + 30 + j * 22, ww = (420 - j * 22) * (0.8 + 0.2 * Math.sin(t * 1.5 + j)), a = 0.22 - j * 0.014
      x.fillStyle = rgba(j < 5 ? '#ffd36e' : '#ff5f8f', a); x.fillRect(Math.round(540 - ww / 2 + Math.sin(t * 2 + j) * 10), yy, Math.round(ww), 8)
    }
    // the floor's grid of tiles, receding
    x.strokeStyle = 'rgba(201,166,255,0.10)'; x.lineWidth = 2
    for (let k = 1; k < 8; k++) { const yy = FLOOR + 12 + k * k * 9; x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke() }
    for (let k = -8; k <= 8; k++) { x.beginPath(); x.moveTo(540 + k * 70, FLOOR + 8); x.lineTo(540 + k * 260, 1920); x.stroke() }
    // a red tool chest (left) and a coiled power cable running to the car
    x.fillStyle = INK; x.fillRect(14, FLOOR - 196, 96, 200); x.fillStyle = '#c0304e'; x.fillRect(20, FLOOR - 190, 84, 190)
    for (let k = 0; k < 4; k++) { x.fillStyle = '#8f2038'; x.fillRect(24, FLOOR - 180 + k * 46, 76, 6); x.fillStyle = '#e8e2f4'; x.fillRect(52, FLOOR - 166 + k * 46, 20, 6) }
    x.strokeStyle = INK; x.lineWidth = 9; x.beginPath(); x.moveTo(110, FLOOR - 40); x.bezierCurveTo(200, FLOOR + 120, 360, FLOOR + 60, 300, FLOOR + 10); x.stroke()
    x.strokeStyle = '#ffb347'; x.lineWidth = 4; x.beginPath(); x.moveTo(110, FLOOR - 40); x.bezierCurveTo(200, FLOOR + 120, 360, FLOOR + 60, 300, FLOOR + 10); x.stroke()
  }

  // ── the car
  function drawCar(t, { cx, dir, door = 0, glowA = 0, shake = 0, alpha = 1, cap = 0, scaleX = 1 }) {
    if (alpha <= 0.01) return
    const c = CAR.c, w = (NC + 2) * c, h = 24 * c
    const sx = Math.round(cx + (shake ? Math.sin(t * 90) * shake : 0)), sy = Math.round(CAR.y - 22 * c + (shake ? Math.sin(t * 77) * shake * 0.6 : 0))
    x.save(); x.globalAlpha = alpha
    x.translate(sx, sy); x.scale(dir === 1 ? -scaleX : scaleX, 1)        // the bitmap's nose is on the left
    // shadow
    x.fillStyle = 'rgba(6,4,18,0.55)'; x.fillRect(-w / 2 + 30, 21 * c, w - 60, 2 * c)
    // the gull-wing door (raised), drawn behind the body
    if (door > 0.01) {
      x.save(); x.translate(-w / 2 + 30 * c, 3 * c); x.rotate(-1.15 * door)
      x.fillStyle = INK; x.fillRect(-c, -c, 16 * c + 2 * c, 8 * c)
      x.fillStyle = '#b4bccb'; x.fillRect(0, 0, 16 * c, 6 * c)
      x.fillStyle = '#253457'; x.fillRect(2 * c, c, 12 * c, 3 * c)
      x.fillStyle = '#5fa8d8'; x.fillRect(3 * c, c, 2 * c, c)
      x.restore()
    }
    x.imageSmoothingEnabled = false
    x.drawImage(carBuf, -w / 2, 0, w, h)
    // the twin capacitor, glowing in the rear glass
    if (cap > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(-w / 2 + 50 * c, 5 * c, 0, -w / 2 + 50 * c, 5 * c, 9 * c)
      g.addColorStop(0, rgba(GOLD, 0.7 * cap)); g.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = g; x.fillRect(-w / 2 + 40 * c, -4 * c, 20 * c, 18 * c); x.restore()
      drawBits(x, CAP, { X: (0.6 + 0.4 * Math.sin(t * 14)) > 0.5 ? '#fff1c8' : GOLD }, -w / 2 + 50 * c, 5 * c, 1.2 * c, { flip: dir === 1 })
    }
    // headlight (nose) + tail lights
    x.fillStyle = '#fff6c8'; x.fillRect(-w / 2 + 2 * c, 12 * c, 3 * c, 2 * c)
    x.fillStyle = '#ff3d6e'; x.fillRect(w / 2 - 4 * c, 10 * c, 3 * c, 3 * c)
    // the rear vents: they glow when the machine is charged
    for (let k = 0; k < 4; k++) { x.fillStyle = glowA > 0 ? rgba('#7fdcff', 0.4 + 0.6 * glowA) : '#4a4f66'; x.fillRect(-w / 2 + (64 + k * 3) * c, 10 * c, 2 * c, 3 * c) }
    // the plate (the bitmap is mirrored when facing right, so the plate is written un-mirrored)
    x.save(); x.translate(w / 2 - 9 * c, 17 * c); x.scale(dir === 1 ? -1 : 1, 1)
    x.fillStyle = '#efe6d6'; x.fillRect(-46, -14, 92, 28); x.strokeStyle = INK; x.lineWidth = 3; x.strokeRect(-46, -14, 92, 28)
    x.font = `700 17px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#c02a52'; x.fillText(PLATE, 0, 1)
    x.restore()
    // wheels
    for (const wi of WHEELS) {
      const wx = -w / 2 + (wi + 1) * c, wy = 22 * c
      x.fillStyle = INK; x.beginPath(); x.arc(wx, wy - c, 7 * c, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#3b3654'; x.beginPath(); x.arc(wx, wy - c, 6 * c, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#c9cfdb'; x.beginPath(); x.arc(wx, wy - c, 2.6 * c, 0, Math.PI * 2); x.fill()
      const a = -t * 9 * (glowA > 0 ? 3 : 0.3)
      x.fillStyle = INK; for (let k = 0; k < 3; k++) { const b = a + k * 2.09; x.fillRect(Math.round(wx + Math.cos(b) * 4 * c - c / 2), Math.round(wy - c + Math.sin(b) * 4 * c - c / 2), c, c) }
    }
    x.restore()
    if (glowA > 0) glow(cx, CAR.y - 10, 300, '#7fdcff', glowA * 0.5)
  }
  /** fire tracks: two parallel flame lines on the floor where the wheels were */
  function fireTracks(t, x0, x1, t0, k = 1) {
    if (k <= 0) return
    const life = 1.6
    for (let s = 0; s < 2; s++) {
      const y0 = CAR.y - 6 + s * 22
      for (let xx = Math.min(x0, x1); xx < Math.max(x0, x1); xx += 14) {
        const born = t0 + Math.abs(xx - x0) / Math.abs(x1 - x0 || 1) * 0.25, a = t < born ? 0 : 1 - prog(t, born + 0.4, born + life)
        if (a <= 0) continue
        const fl = 10 + 10 * Math.abs(Math.sin(t * 30 + xx * 0.3 + s))
        x.fillStyle = rgba('#ffb347', a * k); x.fillRect(xx, y0 - fl, 10, fl)
        x.fillStyle = rgba('#fff1c8', a * k); x.fillRect(xx + 2, y0 - fl * 0.45, 6, fl * 0.45)
      }
    }
    glow((x0 + x1) / 2, CAR.y, Math.abs(x1 - x0) * 0.6, '#ff8a3d', 0.4 * k * (1 - prog(t, t0 + 0.6, t0 + life)))
  }

  // ── Retro (the Mercury orb): spins backwards; tag ℞ RETROGRADE
  function drawRetro(t) {
    const a1 = pop01(t, T.retro, 0.5, 1.6) * (t < T.room ? 1 - prog(t, T.hop, T.hop + 0.3) : 0)
    const a2 = t >= T.garage2 ? pop01(t, T.garage2 + 0.15, 0.4, 1.8) * popOut(t, T.out) : 0
    const k = Math.max(a1, a2)
    if (k <= 0.01) return
    const roll = t < T.retro + 0.6 ? lerp(-200, ORB.x, ease.outCubic(prog(t, T.retro, T.retro + 0.6))) : ORB.x
    const cx = roll, cy = ORB.y + Math.sin(t * 2.3) * 6, r = ORB.r * k
    glow(cx, cy, r * 3, GOLD, 0.8)
    const spin = -t * 3.2
    // three rewind arrows chasing it the wrong way
    for (let i = 0; i < 3; i++) {
      const a = spin + i * Math.PI * 2 / 3, R = r * 1.6
      drawBits(x, ['..X..', '.XX..', 'XXXXX', '.XX..', '..X..'], { X: '#fff1c8' }, cx + Math.cos(a) * R, cy + Math.sin(a) * R, 4, { rot: a + Math.PI / 2 })
    }
    const S = Math.round(r * 2 / ORB_G) * ORB_G || r * 2
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(spin); x.imageSmoothingEnabled = false
    x.fillStyle = 'rgba(14,8,32,0.6)'; x.beginPath(); x.arc(0, 0, S / 2 + 4, 0, Math.PI * 2); x.fill()
    x.drawImage(orbBuf, -S / 2, -S / 2, S, S); x.restore()
    // the face stays upright
    const c = Math.max(3, Math.round(r / 9)), talking = (t > LT1[1].start && t < LT1[1].done) || (t > LT2[1].start && t < LT2[1].done)
    const lookX = t < T.room ? 1 : 1, blinkT = (t + 0.3) % 3.3 < 0.13
    for (const s of [-1, 1]) {
      const ex = Math.round(cx + s * 2.6 * c), ey = Math.round(cy - 0.6 * c)
      x.fillStyle = INK
      if (blinkT) { x.fillRect(ex - 1.5 * c, ey + 0.5 * c, 3 * c, c * 0.8); continue }
      x.fillRect(ex - c + lookX * c * 0.6, ey - c - (talking ? 0.3 * c : 0), 2 * c, 2.6 * c)
      x.fillStyle = '#ffffff'; x.fillRect(ex - c + lookX * c * 0.6, ey - c, c * 0.8, c * 0.8)
    }
    // the ☿ coin badge
    const bx = cx + r * 0.72, by = cy + r * 0.72, br = r * 0.3
    x.fillStyle = 'rgba(14,8,32,0.9)'; x.beginPath(); x.arc(bx, by, br + 4, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(bx, by, br, 0, Math.PI * 2); x.fill()
    x.font = `700 ${Math.round(br * 1.5)}px ${SYM}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('☿︎', bx, by + br * 0.08)
  }

  // ── the time circuits: two LED rows, like the dashboard (red destination, green present)
  function timeCircuits(t) {
    const in1 = t >= T.hud && t < T.hudOut[1], in2 = t >= T.hud2 && t < T.hud2Out[1]
    if (!in1 && !in2) return
    const k = in1 ? pop01(t, T.hud, 0.36, 1.8) * outK(t, T.hudOut) : pop01(t, T.hud2, 0.36, 1.8) * outK(t, T.hud2Out)
    if (k <= 0.01) return
    const PW = 900, PH = 300, cx = 540, cy = 760
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-PW / 2 - 8, -PH / 2 - 8, PW + 16, PH + 16)
    x.fillStyle = '#3a3552'; x.fillRect(-PW / 2, -PH / 2, PW, PH)
    x.fillStyle = '#4c4668'; x.fillRect(-PW / 2, -PH / 2, PW, 8)
    for (const [sx, sy] of [[-PW / 2 + 16, -PH / 2 + 22], [PW / 2 - 16, -PH / 2 + 22], [-PW / 2 + 16, PH / 2 - 16], [PW / 2 - 16, PH / 2 - 16]]) { x.fillStyle = '#8a84a8'; x.fillRect(sx - 5, sy - 5, 10, 10) }
    const flipK = in2 ? prog(t, T.flipDial, T.flipDial + 0.45) : 0
    const rows = [
      { label: 'DESTINATION TIME', val: flipK < 0.5 ? 'LAST SPRING' : 'TOMORROW', col: flipK > 0.5 ? MINT : '#ff5a5a', y: -62, flip: flipK },
      { label: 'PRESENT TIME', val: 'VENUS Rx · DAY 37', col: '#7dff8a', y: 72, flip: 0 },
    ]
    for (const r of rows) {
      x.fillStyle = '#c9a23a'; x.fillRect(-150, r.y - 92, 300, 30)
      mono(r.label, 0, r.y - 76, 22, INK, { shadow: false, ls: 3 })
      x.fillStyle = '#0c0814'; x.fillRect(-PW / 2 + 40, r.y - 50, PW - 80, 96)
      const sy = Math.abs(Math.cos(r.flip * Math.PI))
      const typed = in1 ? Math.floor(clamp((t - T.hud - 0.35) * 22, 0, r.val.length)) : r.val.length
      x.save(); x.translate(0, r.y); x.scale(1, r.flip > 0 && r.flip < 1 ? sy : 1)
      x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '6px'
      const full = x.measureText(r.val).width
      x.textAlign = 'left'; x.fillStyle = rgba(r.col, 0.14); x.fillText(r.val.replace(/[^ ·]/g, '8'), -full / 2, 2)
      x.shadowColor = r.col; x.shadowBlur = 18; x.fillStyle = r.col; x.fillText(r.val.slice(0, typed), -full / 2, 2)
      x.letterSpacing = '0px'; x.restore()
    }
    x.restore()
  }
  // ── the speedometer: 86 · 87 · 88 MPH
  function speedo(t) {
    if (t < T.speedo || t >= T.flash) return
    const k = pop01(t, T.speedo, 0.3, 2)
    const n = t < T.mph[0] ? 85 : t < T.mph[1] ? 86 : t < T.mph[2] ? 87 : 88
    x.save(); x.translate(540, 760); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-250, -110, 500, 220); x.fillStyle = '#0c0814'; x.fillRect(-240, -100, 480, 200)
    const col = n === 88 ? '#ff5a5a' : '#ffb347', pulse = n === 88 ? 1 + 0.06 * Math.sin(t * 40) : 1
    x.scale(pulse, pulse)
    x.font = `700 150px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = col; x.shadowBlur = 24
    x.fillStyle = col; x.fillText(String(n), -50, 4)
    x.font = `700 40px ${MONO}`; x.fillText('MPH', 150, 40)
    x.restore()
  }

  // ── the rerun room: wallpaper, a clock stuck on 11:11, a tiny TV playing the same fight, the couch
  function room(t) {
    x.fillStyle = '#2a1f45'; x.fillRect(0, 430, W, FLOOR + 60 - 430)
    for (let xx = 0; xx < W; xx += 72) { x.fillStyle = '#33275a'; x.fillRect(xx, 430, 30, FLOOR + 60 - 430) }
    x.fillStyle = '#5a3f2a'; x.fillRect(0, FLOOR + 40, W, 30)
    const fg = x.createLinearGradient(0, FLOOR + 70, 0, 1920); fg.addColorStop(0, '#3b2a4e'); fg.addColorStop(1, '#140c22')
    x.fillStyle = fg; x.fillRect(0, FLOOR + 70, W, 1920 - FLOOR - 70)
    // a round rug under the couch
    x.fillStyle = INK; x.beginPath(); x.ellipse(540, 1560, 470, 150, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#4a2f6a'; x.beginPath(); x.ellipse(540, 1560, 456, 140, 0, 0, Math.PI * 2); x.fill()
    x.strokeStyle = '#ff8fb1'; x.lineWidth = 6; x.setLineDash([16, 12]); x.beginPath(); x.ellipse(540, 1560, 390, 112, 0, 0, Math.PI * 2); x.stroke(); x.setLineDash([])
    // the clock
    x.fillStyle = INK; x.fillRect(CLOCK.x - 120, CLOCK.y - 50, 240, 100); x.fillStyle = '#0c0814'; x.fillRect(CLOCK.x - 110, CLOCK.y - 40, 220, 80)
    x.save(); x.shadowColor = '#ff5a5a'; x.shadowBlur = 14; mono('11:11', CLOCK.x, CLOCK.y + 2, 54, '#ff5a5a', { shadow: false }); x.restore()
    // the TV on a stand, showing the same two stars arguing (in miniature)
    x.fillStyle = INK; x.fillRect(TV.x - 92, TV.y - 64, 184, 128); x.fillStyle = '#4a3a6a'; x.fillRect(TV.x - 84, TV.y - 56, 168, 112)
    x.fillStyle = '#2b3a6a'; x.fillRect(TV.x - 70, TV.y - 46, 140, 88)
    drawStarChar(x, TV.x - 34, TV.y + 4, 46, t, { color: TWIN.color, mood: 'wide', look: [1, 0], tips: false, glow: 0.2, hops: [Math.floor(t * 1.4) / 1.4] })
    drawStarChar(x, TV.x + 34, TV.y + 4, 46, t, { color: EXC, mood: 'squint', look: [-1, 0], tips: false, glow: 0.2, hops: [Math.floor(t * 1.4 + 0.5) / 1.4] })
    for (let yy = TV.y - 46; yy < TV.y + 42; yy += 6) { x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(TV.x - 70, yy, 140, 2) }
    x.fillStyle = INK; x.fillRect(TV.x - 60, TV.y + 64, 120, 70)
    // the couch
    const cy0 = 1228
    x.fillStyle = INK; x.fillRect(100, cy0 - 8, 880, 230)
    x.fillStyle = '#7a3b5e'; x.fillRect(108, cy0, 864, 210)
    x.fillStyle = '#9a4f78'; x.fillRect(108, cy0, 864, 16)
    x.fillStyle = '#5e2c48'; x.fillRect(108, cy0 + 120, 864, 90)
    x.fillStyle = INK; x.fillRect(536, cy0 + 20, 8, 100)
    for (const ax of [92, 948]) { x.fillStyle = INK; x.fillRect(ax - 8, cy0 - 40, 56, 270); x.fillStyle = '#8a4569'; x.fillRect(ax, cy0 - 32, 40, 254) }
  }
  /** a pixel speech bubble: Inter 800, '*word*' accent; tail points at (tx, ty) */
  function bubble(text, cx, cy, tx, ty, k, col = BONE, acc = PINK) {
    if (k <= 0.01) return
    const parts = text.split('*')
    x.font = `800 46px ${INTER}`
    const widths = parts.map((p, i) => { x.font = i % 2 ? `italic 600 56px ${SERIF}` : `800 46px ${INTER}`; return x.measureText(p).width })
    const tw = widths.reduce((a, b) => a + b, 0), bw = tw + 64, bh = 104
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-bw / 2 - 6, -bh / 2 - 6, bw + 12, bh + 12)
    x.beginPath(); x.moveTo(-20, bh / 2); x.lineTo((tx - cx) * 0.3, bh / 2 + 44); x.lineTo(24, bh / 2); x.fill()
    x.fillStyle = col; x.fillRect(-bw / 2, -bh / 2, bw, bh)
    x.beginPath(); x.moveTo(-12, bh / 2 - 2); x.lineTo((tx - cx) * 0.3, bh / 2 + 32); x.lineTo(14, bh / 2 - 2); x.fill()
    let px = -tw / 2
    parts.forEach((p, i) => {
      x.font = i % 2 ? `italic 600 56px ${SERIF}` : `800 46px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillStyle = i % 2 ? acc : INK; x.fillText(p, px, 4); px += widths[i]
    })
    x.restore()
  }
  /** the VHS on-screen display + scanlines, tracking noise, and the rewind smear */
  function vhs(t, rewK) {
    x.save()
    for (let yy = 0; yy < 1920; yy += 6) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(0, yy, W, 2) }
    const band = (t * 260) % 2400 - 240
    x.fillStyle = 'rgba(255,255,255,0.05)'; x.fillRect(0, band, W, 40)
    if (rewK > 0) {
      const r = rng(Math.floor(t * 30))
      for (let i = 0; i < 18; i++) { const yy = 430 + r() * 1000; x.fillStyle = `rgba(255,255,255,${0.12 + r() * 0.25 * rewK})`; x.fillRect(0, yy, W, 3 + r() * 10) }
      x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(255,60,120,${0.08 * rewK})`; x.fillRect(0, 430, W, 900)
      x.globalCompositeOperation = 'source-over'
    }
    const blink = Math.floor(t * 2) % 2 === 0
    mono(rewK > 0 ? '◀◀ REW' : '▶ PLAY', 90, 520, 44, BONE, { align: 'left' })
    if (rewK <= 0 && blink) { x.fillStyle = '#ff5a5a'; x.fillRect(66, 510, 14, 14) }
    mono('LAST SPRING  11:11 PM', 90, 1800, 30, BONE, { align: 'left' })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const ok = popOut(t, T.out)
      const zG = gaspZoom(t, { at: T.gasp, dur: 1.2, x: TWR.x, y: TWR.y, amount: 0.38, follow: 0.7, cy: 1100 })
      const punch = 1 + 0.05 * ease.outCubic(prog(t, T.rumble[0], T.flash)) + 0.04 * pop01(t, 0, 0.01) * (1 - prog(t, 0, 0.5)) * 0
      x.save()
      if (inRoom(t)) {
        zG.apply(x)
        room(t)
        // the fight, three passes; then the ex says the true thing kindly
        let p = -1
        T.pass.forEach((ps, i) => { if (t >= ps[0] && t < (T.pass[i + 1] ? T.pass[i + 1][0] : T.rewBack[1])) p = i })
        const rewK = T.rew.some(([a, b]) => t >= a && t < b) || t >= T.rewBack[0] ? 1 : 0
        const talkEx = p >= 0 && t >= T.pass[p][0] && t < T.pass[p][0] + 0.5, talkTw = p >= 0 && t >= T.pass[p][1] && t < T.pass[p][1] + 0.5
        const exMood = t >= T.l4 ? (t < LT2[0].done ? 'neutral' : 'happy') : t >= T.pass[2][2] ? 'eyeroll' : 'squint'
        const twMood = t >= T.gasp ? 'wide' : t >= T.l4 ? 'neutral' : 'wide'
        drawStarChar(x, EXS.x, EXS.y, EXS.size, t, { color: EXC, mood: exMood, look: [-1, 0], seed: 9, hops: talkEx ? [T.pass[p][0]] : t >= T.l4 ? talkHops(LINES2, EXN, { cps: CPS }) : [] })
        exPin(x, EXS.x + 86, EXS.y - 118, t)
        drawTwin(x, TWR.x, TWR.y, TWR.size, t, { mood: twMood, look: [1, 0], blink: twMood === 'wide' ? false : undefined, hops: talkTw ? [T.pass[p][1]] : [], twitch: [T.gasp] })
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'right', cell: 3 })
        if (p >= 0 && !rewK) {
          const [a, b, e] = T.pass[p]
          const kEx = pop01(t, a, 0.22, 2.4) * (t < e ? 1 : 0), kTw = pop01(t, b, 0.22, 2.4) * (t < e ? 1 : 0)
          bubble(BUBBLES.ex, 760, 930, EXS.x, EXS.y - 100, kEx, BONE, '#a46cff')
          bubble(BUBBLES.twin, 330, 1062, TWR.x, TWR.y - 100, kTw, '#fff1c8')
          if (p > 0) {   // the rerun counter stamp
            const sk = pop01(t, a - 0.05, 0.25, 3)
            x.save(); x.translate(540, 1500); x.rotate(-0.08); x.scale(sk, sk)
            x.strokeStyle = HOT; x.lineWidth = 8; x.strokeRect(-170, -48, 340, 96)
            mono(`RERUN ×${p + 1}`, 0, 2, 54, HOT, { shadow: false }); x.restore()
          }
        }
        x.restore()
        genreBug(x, t, { text: 'RERUN', x: 900, y: 520, color: HOT })
        vhs(t, rewK)
        drawGaspLines(x, t, { at: T.gasp, dur: 1.2, x: TWR.x, y: TWR.y, follow: 0.7, cy: 1100, color: TWIN.color })
      } else {
        // the garage (before the jump, and after the rewind)
        x.translate(540, 1000); x.scale(punch, punch); x.translate(-540, -1000)
        garage(t)
        const before = t < T.room
        if (before && t < T.flash) {
          const carX = t < T.rumble[0] ? CAR.x : CAR.x - 40 * ease.inQuad(prog(t, T.rumble[0], T.flash))
          const door = t < T.door[0] ? 1 : 1 - ease.outBack(prog(t, ...T.door))
          drawCar(t, { cx: carX, dir: -1, door: clamp(door), cap: t > T.hud ? 0.6 + 0.4 * prog(t, T.rumble[0], T.flash) : 0.25, glowA: prog(t, T.rumble[0], T.flash), shake: t > T.rumble[0] ? 3 + 6 * prog(t, ...T.rumble) : 0 })
        }
        if (before) fireTracks(t, CAR.x + 280, -60, T.flash, 1 - prog(t, T.flash + 0.3, T.room))
        if (!before) {
          // back from the rerun: the car rewinds into place; then it turns round to face forward, and launches
          const turnP = prog(t, ...T.turn), dir = turnP < 0.5 ? -1 : 1, sxk = Math.max(0.04, Math.abs(Math.cos(turnP * Math.PI)))
          const launchP = ease.inCubic(prog(t, ...T.launch))
          const carX = CAR.x + launchP * 1500
          const door = t < T.hop2 ? 1 : 1 - ease.outBack(prog(t, T.hop2, T.hop2 + 0.25))
          drawCar(t, { cx: carX, dir, scaleX: sxk, door: clamp(door), cap: 0.6, glowA: turnP > 0 ? 0.35 + 0.65 * prog(t, T.launch[0] - 0.6, T.launch[0]) : 0, shake: t > T.launch[0] - 0.6 && t < T.launch[1] ? 4 : 0, alpha: pop01(t, T.garage2, 0.3, 1.6) })
          if (turnP > 0 && turnP < 1) { for (let i = 0; i < 6; i++) drawPixelStar(x, CAR.x + Math.cos(i + t * 6) * 380, CAR.y - 120 + Math.sin(i * 2 + t * 6) * 90, 24, 1, MINT) }
          fireTracks(t, CAR.x - 220, 1140, T.launch[0] + 0.1, 1)
        }
        drawRetro(t)
        // the twin, standing (or in the driver's seat, just his top showing through the glass)
        const s = twinState(t)
        if (s) {
          if (s.cabin) {
            const turnP = prog(t, ...T.turn), dir = t < T.room ? -1 : (turnP < 0.5 ? -1 : 1)
            const launchP = ease.inCubic(prog(t, ...T.launch))
            const carX = (t < T.room ? (t < T.rumble[0] ? CAR.x : CAR.x - 40 * ease.inQuad(prog(t, T.rumble[0], T.flash))) : CAR.x + launchP * 1500)
            const seatX = carX + (dir === 1 ? 5 : -5) * CAR.c
            if (t < T.flash || t >= T.garage2) {
              x.save(); x.beginPath(); x.rect(seatX - 90, CAR.y - 22 * CAR.c - 60, 180, 9 * CAR.c + 60); x.clip()
              drawTwin(x, seatX, CAR.y - 22 * CAR.c + 78, 132, t, { mood: s.mood, look: s.look, bob: 0, tips: false, glow: 0.4 })
              x.restore()
            }
          } else {
            const hops = [T.hop - 0.3, ...talkHops(LINES1, TWN, { cps: CPS }), ...talkHops(LINES2, TWN, { cps: CPS }), T.flipDial + 0.2]
            drawTwin(x, s.x, s.y, s.size, t, { mood: s.mood, look: s.look, pop: s.pop * (t < T.room ? 1 - prog(t, T.hop, T.hop + 0.15) : pop01(t, T.garage2 + 0.1, 0.35, 2)), hops, twitch: [T.l3, T.flipDial] })
            // welding sparks off the car's tail at frame 0
            if (t < T.weld[1]) {
              const r = rng(Math.floor(t * 24) + 3)
              const wx = CAR.x + 300, wy = CAR.y - 120
              glow(wx, wy, 120, '#fff1c8', 0.7 + 0.3 * r())
              for (let i = 0; i < 9; i++) { const a = -Math.PI * (0.15 + r() * 0.7), d = 20 + r() * 110; drawPixelStar(x, wx + Math.cos(a) * d * -1, wy + Math.sin(a) * d * -0.4 + d * 0.5, 10 + r() * 14, 1, r() > 0.5 ? GOLD : '#fff1c8') }
              // the torch in his hand
              x.fillStyle = INK; x.fillRect(wx + 8, wy - 10, 70, 18); x.fillStyle = '#8a84a8'; x.fillRect(wx + 12, wy - 6, 62, 10)
              x.fillStyle = '#fff6c8'; x.fillRect(wx - 6, wy - 6, 14, 10)
            }
          }
        }
        x.restore()
        timeCircuits(t)
        speedo(t)
      }
      // the title: chrome "BACK TO THE EX", slammed in like the poster
      const tk = pop01(t, T.title, 0.3, 2.6) * outK(t, T.titleOut)
      if (tk > 0.01 && t < T.titleOut[1]) {
        x.save(); x.translate(540, 300); x.rotate(-0.07); x.scale(tk, tk); x.transform(1, 0, -0.18, 1, 0, 0)
        x.font = `900 108px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillStyle = INK; x.fillText('BACK TO THE', 6, -54 + 8)
        const cg = x.createLinearGradient(0, -110, 0, 0); cg.addColorStop(0, '#ffffff'); cg.addColorStop(0.5, '#9fb4d8'); cg.addColorStop(0.55, '#5a6a9a'); cg.addColorStop(1, '#e8f0ff')
        x.fillStyle = cg; x.fillText('BACK TO THE', 0, -54)
        x.font = `italic 700 190px ${SERIF}`; x.fillStyle = INK; x.fillText('ex', 8, 92 + 8)
        const pg = x.createLinearGradient(0, 20, 0, 170); pg.addColorStop(0, '#ffd36e'); pg.addColorStop(0.5, HOT); pg.addColorStop(1, '#a46cff')
        x.fillStyle = pg; x.fillText('ex', 0, 92)
        x.restore()
        // a lens glint sweeping across
        const gp = prog(t, T.title + 0.25, T.title + 1.0)
        if (gp > 0 && gp < 1) drawPixelStar(x, lerp(220, 860, gp), 250, 70, 2, '#ffffff')
      }
      // the flash into the past
      const fl = prog(t, T.flash - 0.05, T.flash + 0.45)
      if (fl > 0 && fl < 1) { x.save(); x.globalAlpha = fl < 0.1 ? fl / 0.1 : 1 - ease.outQuad((fl - 0.1) / 0.9); x.fillStyle = '#e8f6ff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      // and the rewind back (a white smear)
      const rb = prog(t, T.rewBack[1] - 0.2, T.rewBack[1] + 0.15)
      if (rb > 0 && rb < 1) { x.save(); x.globalAlpha = Math.sin(Math.PI * rb) * 0.7; x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      drawDayChip(x, t, { day: 37, phase: 'retro' })
      x.globalAlpha = ok; x.globalAlpha = 1
      box1.update(t); box2.update(t)
      hook.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 24.42, the rewind back into the garage (the only one, so it plays).
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E21' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the film's key by the engine)
const NOTE = [554.37, 659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hookCues(0, { key: KEY }),
  // the welding torch at frame 0
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(0.05 + i * 0.27), 0.03]),
  ...stingerCues(T.title, { key: KEY, kind: 'trailer' }), ['crash', T.title + 0.02, { gain: 0.05, len: 2 }],
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES1, { cps: CPS, pitch: { [TWN]: 660, [RET]: 520 } }),
  ['chip', T.hud, 880, 0.12, { wave: 'square', gain: 0.02 }], ['chip', T.hud + 0.14, 1318.51, 0.12, { wave: 'square', gain: 0.02 }],
  ...Array.from({ length: 11 }, (_, i) => ['tick', r3(T.hud + 0.36 + i / 22), 0.02]),
  ['whoosh', T.retro, 0.5, 0.04], ...[0, 1, 2, 3].map(i => ['pop', r3(T.retro + 0.1 + i * 0.12), NOTE[6 - i], 0.022, -0.5]),
  ['tick', T.comet + 0.6, 0.012],
  ['boom', T.door[1], 0.2], ['tick', T.door[1], 0.08],
  ['riser', T.rumble[0], T.flash, 0.1],
  ...T.mph.map((m, i) => ['chip', m, 660 + i * 110, 0.1, { wave: 'square', gain: 0.025 }]),
  ['pop', T.close1, 880, 0.03, 0],
  ['crash', T.flash, { gain: 0.07, len: 2.4 }], ['boom', T.flash, 0.4], ['whoosh', T.flash - 0.3, 0.6, 0.06],
  ...stingerCues(T.room, { key: KEY, kind: 'sitcom' }).slice(0, 2),
  ...wordPops(T.h1, 2, 0.09, 0, 0.026), ['pop', T.h1Land, 1108.73, 0.045, 0],
  ...T.pass.flatMap(([a, b], i) => [['pop', a, 880 + i * 60, 0.04, 0.3], ['pop', b, 660 + i * 60, 0.04, -0.3]]),
  ...T.rew.flatMap(([a, b]) => [['whoosh', a, b - a, 0.05], ['chip', a, 1400, b - a, { wave: 'square', slide: 1200, gain: 0.014 }]]),
  ['tick', T.ghost + 0.05, 0.014],
  ['pop', T.open2, 739.99, 0.04, 0],
  ...talkCues(LINES2, { cps: CPS, pitch: { [TWN]: 660, [RET]: 520, [EXN]: 784 } }),
  ...wordPops(T.h2, 3, 0.08, 2, 0.026), ['pop', T.h2Land, 987.77, 0.045, 0],
  ...gaspCues(T.gasp, { key: KEY }),
  ['whoosh', T.rewBack[0], 0.7, 0.06], ['chip', T.rewBack[0], 1600, 0.7, { wave: 'square', slide: 1500, gain: 0.016 }],
  ['bell', T.flipDial + 0.2, 1318.51, 0.04, 1.4, 0], ['chip', T.flipDial, 1108.73, 0.1, { wave: 'square', gain: 0.02 }],
  ['whoosh', T.turn[0], 0.5, 0.04], ['glitter', T.turn[0], T.turn[1] + 0.3],
  ['boom', T.hop2 + 0.25, 0.14], ['pop', T.close2, 880, 0.03, 0],
  ...wordPops(T.h3, 3, 0.09, 1, 0.026), ['pop', T.h3Land, 1318.51, 0.05, 0], ['pluck', T.h3Land, 1108.73, 0.045, 0.7, 0],
  ['riser', T.launch[0] - 0.6, T.launch[0], 0.07], ['whoosh', T.launch[0], 0.6, 0.06], ['boom', T.launch[0] + 0.1, 0.25],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
