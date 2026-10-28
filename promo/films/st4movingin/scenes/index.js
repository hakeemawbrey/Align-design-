// st4movingin (EP 094, 20 s vertical, Star Talk season 4, thread F: Cancer × Capricorn) · story 0–15.6, then the end card.
//   0.00–5.80  "Cancer and Capricorn | move *in.*"  A new apartment: a window on the Houston skyline (generic), one empty
//              shelf. Two moving boxes slide in. The ♋ Cancer star packs its crab shell into "SHELL (FRAGILE)"; the ♑
//              Capricorn star (tie on, cast bible) packs its calendar, booked till 2031, into "CALENDAR (2031)". The shell
//              pops out and takes the WHOLE shelf. The calendar hovers, homeless.
//              Box (♋ CANCER): "where does your calendar go?"
//   5.95–12.1  "Two homes. | *One* shelf."  Box (♑ CAPRICORN): "next to your shell. we'll make *room.*"  Cancer scoots its
//              shell over; the calendar lands beside it, and a Friday turns into a pink heart.
//              THE STARS: "home is a schedule *and* a feeling."  (Ghost: rises over the calendar box's top edge.)
//  12.25       card cut (flip).
//  12.35–15.5  "Make *room.*"  The shelf, shell and calendar side by side; the two stars on either side, heart-eyed. Out 15.5.
// Astrology: Cancer (Moon-ruled, the 4th sign: home) and Capricorn (Saturn-ruled, structure and time) are opposite signs.
// One canvas (sky + room + props + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
export const EP = 94
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', AQUA = '#7fd8f6'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const CAN = signStar('cancer'), CAP = signStar('capricorn')

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.9, h0Out: [5.6, 5.8],
  roomIn: [0.1, 0.5], starsIn: [0.35, 0.5], boxIn: [0.6, 1.0],
  packShell: [1.35, 1.85], packCal: [1.9, 2.4], tape: 2.55,
  unShell: [BEAT(4), BEAT(4) + 0.5], unCal: [3.05, 3.45],                       // 2.82
  open: 3.45, l1: 3.6,
  h1: 5.95, h1Land: 6.3, l2: 6.15, scoot: [7.35, 7.8], hang: [7.65, 8.1], heartDay: 8.3,
  l3: 9.35, ghost: 10.0, close: 12.1, h1Out: [11.9, 12.1], boxOut: [11.75, 12.05],
  cut: 12.25,
  h2: 12.35, h2Land: 12.7, hearts: 13.4, h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const CS = '♋ CANCER', CP = '♑ CAPRICORN', NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: CS, color: AQUA, text: 'where does your *calendar* go?' },
  { t: T.l2, speaker: CP, color: '#7fe0b8', text: 'next to your shell. we’ll make *room.*' },
  { t: T.l3, speaker: NARR, text: 'home is a schedule *and* a feeling.' },
]
const CPS = 27
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
const HEART = ['.HH.HH.', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const TIE = ['.KKK.', '.RRR.', '..R..', '.RRR.', '.RrR.', 'RRrRR', 'RRRRR', '.RRR.', '..R..']
const TIE_C = { K: '#7a1f33', R: '#d8344f', r: '#ffd36b' }

// ── layout
const WIN = { x: 540, y: 745, w: 560, h: 270 }           // the window on the skyline
const SHELF = { x: 540, y: 1055, w: 600 }                // the shelf plank's top
const FLOOR = 1330
const BOX_A = { x: 390, w: 220, h: 170 }, BOX_B = { x: 690, w: 220, h: 170 }
const STAR_A = { can: { x: 150, y: 1180, s: 230 }, cap: { x: 930, y: 1180, s: 230 } }
const STAR_F = { can: { x: 205, y: 1260, s: 260 }, cap: { x: 875, y: 1260, s: 260 } }
const SHELL_ON = { mid: 540, left: 420 }, CAL_ON = 660

function canState(t) {
  if (t < T.packShell[1]) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.unShell[1]) return { mood: 'happy', look: [1, 1] }
  if (t < T.l1) return { mood: 'happy', look: [1, -1] }
  if (t < LT[0].done + 0.4) return { mood: 'wide', look: [1, -1] }
  if (t < T.scoot[0]) return { mood: 'neutral', look: [1, 0] }
  if (t < T.hang[1]) return { mood: 'squint', look: [1, -1] }                  // scooting the shell over
  if (t < T.cut) return { mood: 'heart', look: [1, 0] }
  return { mood: t < T.hearts ? 'happy' : 'heart', look: [1, 0] }
}
function capState(t) {
  if (t < T.packCal[1]) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.unCal[1]) return { mood: 'happy', look: [-1, 1] }
  if (t < T.l2) return { mood: 'wide', look: [-1, -1] }                         // the shelf is full
  if (t < LT[1].done) return { mood: 'happy', look: [-1, 0] }
  if (t < T.heartDay + 0.3) return { mood: 'sparkle', look: [-1, -1] }
  if (t < T.cut) return { mood: 'heart', look: [-1, 0] }
  return { mood: t < T.hearts + 0.2 ? 'sparkle' : 'heart', look: [-1, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 44px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'", "700 18px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Cancer and Capricorn | move *in.*', { top: 196, size: 88, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: AQUA })
  const H1 = popText(root, 'Two homes. | *One* shelf.', { top: 196, size: 110, accentSize: 160, at: T.h1, late: 0, wobble: true, gap: 0.12, accentColor: GOLD })
  const H2 = popText(root, 'Make *room.*', { top: 250, size: 140, accentSize: 200, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#05040c' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, AQUA]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // ── the room: a window (generic skyline, lit windows), the shelf, a floor line
  const BLD = [[-250, 120], [-205, 190], [-150, 150], [-95, 250], [-40, 210], [20, 290], [80, 180], [130, 230], [185, 160], [235, 120]]
  function drawRoom(t, k) {
    if (k <= 0.01) return
    x.save(); x.globalAlpha *= k
    const { x: wx, y: wy, w, h } = WIN
    // window frame + night outside
    x.fillStyle = 'rgba(10,6,24,0.95)'; x.fillRect(wx - w / 2 - 14, wy - h / 2 - 14, w + 28, h + 28)
    x.fillStyle = '#8a6a4a'; x.fillRect(wx - w / 2 - 8, wy - h / 2 - 8, w + 16, h + 16)
    const g = x.createLinearGradient(0, wy - h / 2, 0, wy + h / 2); g.addColorStop(0, '#1a1446'); g.addColorStop(1, '#3a2366')
    x.fillStyle = g; x.fillRect(wx - w / 2, wy - h / 2, w, h)
    for (const [bx, bh] of BLD) {
      const bw = 50, top = wy + h / 2 - bh
      x.fillStyle = '#120c2c'; x.fillRect(wx + bx, top, bw, bh)
      for (let yy = top + 14; yy < wy + h / 2 - 10; yy += 22) for (let xx = 8; xx < bw - 8; xx += 16) {
        const on = Math.sin(bx * 13.1 + yy * 7.7 + xx * 3.3) > 0.2
        if (on) { x.fillStyle = Math.sin(t * 0.7 + bx + yy) > 0.92 ? '#fff4cf' : 'rgba(255,214,140,0.75)'; x.fillRect(wx + bx + xx, yy, 6, 8) }
      }
    }
    x.fillStyle = '#8a6a4a'; x.fillRect(wx - 4, wy - h / 2, 8, h); x.fillRect(wx - w / 2, wy - 4, w, 8)       // mullions
    // the shelf: a plank on two brackets
    const { x: sx, y: sy, w: sw } = SHELF
    x.fillStyle = 'rgba(10,6,24,0.95)'; x.fillRect(sx - sw / 2 - 6, sy - 6, sw + 12, 32)
    x.fillStyle = '#b07a3a'; x.fillRect(sx - sw / 2, sy, sw, 20); x.fillStyle = '#d9a35e'; x.fillRect(sx - sw / 2, sy, sw, 6)
    x.fillStyle = '#6e4620'; for (const bx of [-sw / 2 + 60, sw / 2 - 80]) { x.fillRect(sx + bx, sy + 20, 20, 44); x.fillRect(sx + bx, sy + 44, 44, 20) }
    // floor
    x.fillStyle = 'rgba(239,230,214,0.18)'; x.fillRect(60, FLOOR, 960, 4)
    x.restore()
  }

  // ── Cancer's shell: a dome (the crab shell from starcancer / st4galveston), bottom-centred at (cx, by)
  const RX = 11, RY = 9
  function drawShell(cx, by, c, a = 1) {
    if (a <= 0) return
    x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(by))
    const inside = (i, j) => { const u = (i + 0.5) / RX, v = (j + 0.5) / RY; return j >= 0 && u * u + v * v <= 1 }
    const SPOTS = [[-6, 4], [-2, 6], [3, 6], [7, 3]]
    for (let j = -1; j <= RY + 1; j++) for (let i = -RX - 1; i <= RX; i++) {
      const on = inside(i, j), edge = !on && (inside(i + 1, j) || inside(i - 1, j) || inside(i, j + 1) || inside(i, j - 1))
      if (!on && !edge) continue
      let col = INK
      if (on) {
        const u = (i + 0.5) / RX, v = (j + 0.5) / RY, lit = -u * 0.6 + v * 0.8
        col = lit > 0.75 ? '#ffd2b0' : lit > 0.3 ? '#ff9a6e' : lit > -0.2 ? '#f2734f' : '#c4483a'
        if (j === 0) col = (i + 40) % 3 === 0 ? INK : '#8f2f2a'
        for (const [si, sj] of SPOTS) if ((i - si) ** 2 + (j - sj) ** 2 <= 1.6) col = lit > 0.3 ? '#ffe3cc' : '#ffb894'
      }
      x.fillStyle = col; x.fillRect(i * c, -(j + 1) * c, c + 0.5, c + 0.5)
    }
    x.restore()
  }
  // ── Capricorn's calendar: green header, a grid of booked days; one Friday turns into a pink heart
  function drawCalendar(t, cx, cy, w, a = 1) {
    if (a <= 0) return
    const h = w * 1.05, s = w / 200
    x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy))
    x.fillStyle = 'rgba(10,6,24,0.95)'; x.fillRect(-w / 2 - 6 * s, -h / 2 - 6 * s, w + 12 * s, h + 12 * s)
    x.fillStyle = '#fbf6ea'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = CAP.color; x.fillRect(-w / 2, -h / 2, w, 46 * s)
    x.fillStyle = INK; for (const rx of [-w / 4, w / 4]) x.fillRect(rx - 4 * s, -h / 2 - 12 * s, 8 * s, 22 * s)              // rings
    x.font = `700 ${Math.round(20 * s)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
    x.fillText('TILL 2031', 0, -h / 2 + 25 * s)
    const cols = 5, rows = 4, gw = (w - 24 * s) / cols, gh = (h - 64 * s) / rows
    const hk = pop01(t, T.heartDay, 0.35, 2.4)
    for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
      const px = -w / 2 + 12 * s + q * gw, py = -h / 2 + 54 * s + r * gh
      const fri = q === 4 && r === 2
      x.fillStyle = 'rgba(27,18,54,0.18)'; x.fillRect(px, py, gw - 4 * s, gh - 4 * s)
      if (fri && hk > 0.01) {
        drawBits(x, HEART, { H: PINK, W: '#ffffff' }, px + (gw - 4 * s) / 2, py + (gh - 4 * s) / 2, 4.2 * s * hk, { outline: null })
      } else if ((r * 7 + q * 3) % 5 !== 1) { x.fillStyle = rgba(CAP.color, 0.75); x.fillRect(px + 4 * s, py + gh * 0.35, gw - 12 * s, gh * 0.3) }
    }
    x.restore()
  }
  // ── a moving box: cardboard, flaps up or taped shut, a marker label on the front. (cx, floor) = bottom centre
  function drawBox(t, B, label, taped, k) {
    if (k <= 0.01) return
    const { w, h } = B, top = FLOOR - h
    x.save(); x.globalAlpha *= clamp(k)
    x.translate(B.x, FLOOR); x.scale(1, k); x.translate(-B.x, -FLOOR)
    x.fillStyle = 'rgba(10,6,24,0.95)'; x.fillRect(B.x - w / 2 - 6, top - 6, w + 12, h + 10)
    x.fillStyle = '#c8955a'; x.fillRect(B.x - w / 2, top, w, h)
    x.fillStyle = '#a8763f'; x.fillRect(B.x - w / 2, top, w, 18); x.fillRect(B.x + w / 2 - 22, top, 22, h)
    if (!taped) {   // open flaps leaning out
      x.fillStyle = 'rgba(10,6,24,0.95)'
      x.beginPath(); x.moveTo(B.x - w / 2 - 6, top); x.lineTo(B.x - w / 2 - 46, top - 50); x.lineTo(B.x - w / 2 - 8, top - 60); x.lineTo(B.x - w / 2 + 30, top); x.fill()
      x.beginPath(); x.moveTo(B.x + w / 2 + 6, top); x.lineTo(B.x + w / 2 + 46, top - 50); x.lineTo(B.x + w / 2 + 8, top - 60); x.lineTo(B.x + w / 2 - 30, top); x.fill()
      x.fillStyle = '#b8854a'
      x.beginPath(); x.moveTo(B.x - w / 2, top); x.lineTo(B.x - w / 2 - 38, top - 46); x.lineTo(B.x - w / 2 - 8, top - 52); x.lineTo(B.x - w / 2 + 24, top); x.fill()
      x.beginPath(); x.moveTo(B.x + w / 2, top); x.lineTo(B.x + w / 2 + 38, top - 46); x.lineTo(B.x + w / 2 + 8, top - 52); x.lineTo(B.x + w / 2 - 24, top); x.fill()
    } else { x.fillStyle = 'rgba(230,220,190,0.85)'; x.fillRect(B.x - 18, top - 2, 36, 60) }   // tape
    // label
    x.fillStyle = '#fbf6ea'; x.fillRect(B.x - w / 2 + 16, top + 66, w - 50, 72)
    x.font = `700 21px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(label[0], B.x - 9, top + 88); x.font = `700 17px ${MONO}`; x.fillStyle = '#c4483a'; x.fillText(label[1], B.x - 9, top + 116)
    x.restore()
  }

  // where the shell and the calendar are (pure)
  function shellPos(t) {
    const c = 9
    if (t < T.packShell[0]) return { x: STAR_A.can.x + 70, by: STAR_A.can.y + 40, c: 6, a: pop01(t, T.starsIn[0] + 0.2, 0.3, 2) }
    if (t < T.packShell[1]) { const e = ease.inOutCubic(prog(t, ...T.packShell)); return { x: lerp(STAR_A.can.x + 70, BOX_A.x, e), by: lerp(STAR_A.can.y + 40, FLOOR - 40, e) - Math.sin(Math.PI * e) * 160, c: lerp(6, 7, e), a: 1 } }
    if (t < T.unShell[0]) return null                                                     // in the box
    if (t < T.unShell[1]) { const e = easeOutBack(prog(t, ...T.unShell), 1.3); return { x: lerp(BOX_A.x, SHELL_ON.mid, e), by: lerp(FLOOR - 120, SHELF.y, e) - Math.sin(Math.PI * clamp(e)) * 180, c: lerp(7, c * 1.25, clamp(e)), a: 1 } }
    const sc = ease.inOutCubic(prog(t, ...T.scoot))
    return { x: lerp(SHELL_ON.mid, SHELL_ON.left, sc), by: SHELF.y, c: lerp(c * 1.25, c, sc), a: 1 }        // hogs the shelf, then scoots over
  }
  function calPos(t) {
    if (t < T.packCal[0]) return { x: STAR_A.cap.x - 90, y: STAR_A.cap.y - 10, w: 120, a: pop01(t, T.starsIn[1] + 0.2, 0.3, 2) }
    if (t < T.packCal[1]) { const e = ease.inOutCubic(prog(t, ...T.packCal)); return { x: lerp(STAR_A.cap.x - 90, BOX_B.x, e), y: lerp(STAR_A.cap.y - 10, FLOOR - 60, e) - Math.sin(Math.PI * e) * 160, w: 120, a: 1 } }
    if (t < T.unCal[0]) return null
    const hv = { x: 905, y: 900 }                                                        // hovering by Capricorn, homeless
    if (t < T.hang[0]) { const e = easeOutBack(prog(t, ...T.unCal), 1.3); return { x: lerp(BOX_B.x, hv.x, e), y: lerp(FLOOR - 120, hv.y, e) + Math.sin(t * 2.4) * 8 * clamp(e), w: lerp(120, 140, clamp(e)), a: 1 } }
    const e = easeOutBack(prog(t, ...T.hang), 1.4)
    return { x: lerp(hv.x, CAL_ON, e), y: lerp(hv.y, SHELF.y - 92, e), w: lerp(140, 170, clamp(e)), a: 1 }
  }

  function drawStars(t) {
    const fin = t >= T.cut, L = fin ? STAR_F : STAR_A, ok = popOut(t, T.out)
    const hopsCan = [T.starsIn[0] + 0.3, T.packShell[1], ...talkHops(LINES, CS, { cps: CPS }), T.scoot[0] + 0.1, T.h2Land, T.hearts + 0.6]
    const hopsCap = [T.starsIn[1] + 0.3, T.packCal[1], ...talkHops(LINES, CP, { cps: CPS }), T.heartDay, T.h2Land + 0.1, T.hearts + 0.8]
    const kCan = (fin ? pop01(t, T.cut + 0.1, 0.36, 2.1) : pop01(t, T.starsIn[0], 0.4, 2)) * ok
    const kCap = (fin ? pop01(t, T.cut + 0.16, 0.36, 2.1) : pop01(t, T.starsIn[1], 0.4, 2)) * ok
    if (kCan > 0.02) drawStarChar(x, L.can.x, L.can.y, L.can.s * kCan, t, { color: CAN.color, glyph: CAN.glyph, ...canState(t), hops: hopsCan, seed: 5 })
    if (kCap > 0.02) {
      const r = drawStarChar(x, L.cap.x, L.cap.y, L.cap.s * kCap, t, { color: CAP.color, glyph: CAP.glyph, ...capState(t), hops: hopsCap, seed: 9 })
      const s = L.cap.s * kCap
      drawBits(x, TIE, TIE_C, Math.round(r.x), Math.round(r.y + s * 0.29), s / 26, { rot: Math.sin(t * 3) * 0.03 })
    }
  }
  function floatHearts(t, cx, cy, t0) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.22, p = (t - born) / 1.3
      if (p < 0 || p >= 1) continue
      const side = ((i * 37) % 9) / 8 - 0.5
      drawBits(x, HEART, { H: [PINK, '#ff4f86', AQUA][i % 3], W: '#ffffff' }, cx + side * 300 + Math.sin(p * 7 + i) * 14, cy - p * 280, 6 + (i % 3), { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        const roomK = (t < T.cut ? ease.outCubic(prog(t, ...T.roomIn)) : pop01(t, T.cut + 0.05, 0.3, 1.4)) * clamp(ok)
        drawRoom(t, roomK)
        // the shelf glows when the schedule and the feeling sit side by side
        if (t > T.l3 || t >= T.cut) glow(SHELF.x, SHELF.y - 70, 380, PINK, 0.5 * clamp(prog(t, T.l3, T.l3 + 0.5)) * clamp(ok))
        const S = shellPos(t), C = calPos(t)
        if (S) drawShell(S.x, S.by, S.c * (t >= T.cut ? clamp(ok) : 1), S.a)
        if (C) drawCalendar(t, C.x, C.y, C.w * (t >= T.cut ? clamp(ok) : 1), C.a)
        drawStars(t)
        if (t < T.cut) {
          const bk = pop01(t, T.boxIn[0], 0.4, 1.8) * (1 - ease.inCubic(prog(t, ...T.boxOut)))
          drawBox(t, BOX_A, ['SHELL', '(FRAGILE)'], t >= T.tape && t < T.unShell[0], bk)
          drawBox(t, BOX_B, ['CALENDAR', '(2031)'], t >= T.tape && t < T.unCal[0], bk)
          drawGhostCameo(x, t, { x: BOX_B.x + 30, y: FLOOR - BOX_B.h - 2, at: T.ghost, dur: 1.3, from: 'below' })
        }
        sparkles(t, SHELL_ON.mid, SHELF.y - 60, T.unShell[1] - 0.1, 10, 220, 1)
        sparkles(t, CAL_ON, SHELF.y - 92, T.hang[1], 10, 170, 2)
        sparkles(t, SHELF.x, SHELF.y - 80, T.h2Land, 14, 340, 3)
        floatHearts(t, SHELF.x, SHELF.y - 80, T.hearts)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.9 (inert: H0 → H1 between lines), 12.25 (box shut → the last line, the one that plays).
const CUTS = [5.9, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['bell', T.h0Land, 1567.98, 0.025, 1.4, 0],
  ['pop', T.starsIn[0] + 0.05, 659.25, 0.03, -0.5], ['pop', T.starsIn[1] + 0.05, 783.99, 0.03, 0.5],
  ['whoosh', T.boxIn[0], 0.35, 0.03], ['boom', T.boxIn[1] - 0.1, 0.08],
  ['whoosh', T.packShell[0], 0.3, 0.025], ['tick', T.packShell[1], 0.05], ['pop', T.packShell[1], 523.25, 0.03, -0.2],
  ['whoosh', T.packCal[0], 0.3, 0.025], ['tick', T.packCal[1], 0.05], ['pop', T.packCal[1], 587.33, 0.03, 0.2],
  ['chip', T.tape, 900, 0.22, { wave: 'square', gain: 0.012 }],
  ['whoosh', T.unShell[0], 0.4, 0.03], ['pluck', T.unShell[1], 1046.5, 0.035, 0.6, 0], ['glitter', T.unShell[1] - 0.1, T.unShell[1] + 0.4],
  ['pop', T.unCal[1], 880, 0.03, 0.4],
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [CS]: 760, [CP]: 520, [NARR]: 880 }, gain: 0.015 }),
  ...wordPops(T.h1, 4, 0.12, 2, 0.024),
  ['whoosh', T.scoot[0], 0.3, 0.025], ['tick', T.scoot[1], 0.04], ['pluck', T.hang[1], 1318.51, 0.035, 0.6, 0.2], ['glitter', T.hang[1], T.hang[1] + 0.4],
  ['bell', T.heartDay, 1567.98, 0.03, 1.4, 0.2],
  ['bell', T.l3 + 0.2, 1046.5, 0.025, 2.0, 0],
  ['tick', T.ghost + 0.05, 0.014],
  ['whoosh', T.boxOut[0], 0.3, 0.025], ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 1, 0.08, 1, 0.028), ['pop', T.h2Land, 1046.5, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ...Array.from({ length: 7 }, (_, i) => ['pop', +(T.hearts + i * 0.22 + 0.4).toFixed(3), NOTE[(i * 2) % 7] * 2, 0.012, i % 2 ? 0.3 : -0.3]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
