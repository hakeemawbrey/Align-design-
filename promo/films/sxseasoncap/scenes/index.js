// sxseasoncap — SEASONAL SKY: "Capricorn Season." (30 s vertical Align ad, Star Talk Shows, show 8 ep 3, music: jazzy Eb).
// Story 0–25.6, then the shared end card. Same forecast desk as sxseasonscorpio / sxseasonsag (desk.js is an identical copy).
//   0.00–5.5   "It’s *Capricorn* | season."  The desk, the forecaster (THE STARS), the big wheel spinning… it lands on ♑ on
//              the drop (2.82). THE STARS: "good evening. tonight's forecast: cozy."  ♓ Pisces, the intern, cries already.
//   5.5–10.6   "Forecast: | *steady.*"  The LOVE FORECAST board, three rows (rule of three): ☕ COZY "soup and early nights"
//              · ⛰ STEADY "slow and sure" · 💼 SERIOUS "about what matters" — on the third slam the forecaster's tiny
//              reading glasses snap on (and stay on: very Capricorn). THE STARS: "expect early nights and real plans."
//  10.75       card cut.
//  10.85–16.6  "Every | *Friday.*"  The sight gag: a wall calendar; the pointer circles the Fridays in red, one, two, three…
//              then the rest in a blur. THE STARS: "same day. same time. that's the romance."  The page flips: next month's
//              Fridays are already circled (hearts). Flips again: hearts. Pisces sobs.
//  16.75–21.6  "Show *up.*"  The board: ONE BIG GESTURE (one giant heart, then six empty weeks with cobwebs) vs EVERY FRIDAY
//              (a small heart pops into every week, on the beat) → ✓ stamp. THE STARS: "small and steady beats big and once."
//  21.75       card cut.
//  21.85–25.5  "*Consistency* | is cute."  The wheel is back, ♑ glowing, the glasses glint, a wink; Pisces happy-sobs.
//              Everything pops out by 25.5; the end card takes over at 25.6.
// One canvas (sky + wheel/boards + cast + desk), DOM type, a dialogue box, the show bug + forecast crawl, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite } from '../../stlive5th/scenes/props.js'
import { GOLD, BONE, INK, MONO, buildBug, buildTicker, drawWheel, rotFor, drawMarker, drawBits, drawDesk, drawPointer, board,
  drawPisces, pop01, outK, popOut, bump } from './desk.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const ACC = '#5fe0b8', WARM = '#ffcf7a', RED = '#ff4f6e', HEART = '#ff6b8f', GREEN = '#5fe08a'

// ── layout
const WX = 700, WY = 880, WR = 285
const BX = 400, BY = 600, BW = 600, BH = 540
const FX = 236, FY = 1068, FS = 270
const DESK_Y = 1190
const PX = 944, PY = 1142, PS = 118
const ARM = { x: FX + FS * 0.34, y: FY - FS * 0.04 }

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.2, deskIn: 0.2, wheelIn: 0.3, fIn: 0.45, pisIn: 0.75, spin: [0.3, BEAT(4)], land: BEAT(4),
  h0: 0.15, h0Out: [5.2, 5.4],
  open: 2.62, l1: 2.88,
  flipA: [5.5, 5.9], h1: 5.65, h1Land: 6.0, rows: [6.35, BEAT(12), BEAT(14) + 0.02], l2: 6.5, closeA: 10.2, h1Out: [10.3, 10.5],
  cut1: 10.75,
  h2: 10.85, h2Land: 11.2, circles: [11.45, 12.0, 12.55, 12.95, 13.12], open2: 13.35, l3: 13.55, pages: [15.25, 15.95], h2Out: [16.45, 16.65],
  cut2: 16.75,
  flipB: [16.6, 16.95], h3: 16.85, h3Land: 17.15, gesture: 17.2, l4: 17.75, weeks: [18.1, 18.4, 18.7, 19.0, 19.3, 19.6], check: 20.0, closeB: 21.38, h3Out: [21.45, 21.62],
  cut3: 21.75,
  h4: 21.85, h4Land: 21.95, glint: 22.9, wink: [23.2, 23.7], sob: 23.9, out: [25.0, 25.5],
}
const SPEAK = 'THE STARS'
const LINES_A = [
  { t: T.l1, speaker: SPEAK, text: "good evening. tonight's forecast: *cozy.*" },
  { t: T.l2, speaker: SPEAK, text: 'expect early nights and *real* plans.' },
]
const LINES_B = [
  { t: T.l3, speaker: SPEAK, text: "same day. same time. that's the *romance.*" },
  { t: T.l4, speaker: SPEAK, text: 'small and steady beats *big and once.*' },
]
const CPS = 28
const F_HOPS = [T.fIn + 0.3, ...talkHops([...LINES_A, ...LINES_B], SPEAK, { cps: CPS }), T.land + 0.05, T.rows[2] + 0.05, T.check, T.h4Land + 0.3]
const PIS_HOPS = [T.pisIn + 0.3, T.rows[2] + 0.05, T.pages[0] + 0.05, T.pages[1] + 0.05, T.sob]

const ROT0 = rotFor('capricorn')
function wheelRot(t) {
  const p = ease.outCubic(prog(t, ...T.spin))
  const wob = t > T.land ? 0.07 * Math.sin((t - T.land) * 17) * Math.exp(-(t - T.land) * 5) : 0
  return ROT0 - (1 - p) * Math.PI * 4 + wob
}

// ── pixel art
const CUP = ['..S.S..', '.S.S...', '.......', 'MMMMMMM.', 'MCCCCCMHH', 'MMMMMMM.H', 'MMMMMMMHH', '.MMMMM...']
const MOUNT = ['....W....', '...WWW...', '..WGGGW..', '..GGGGG..', '.GGGGGGG.', 'GGGGDGGGG', 'GGGDDDGGG']
const CASE = ['...KKK...', '..K...K..', 'BBBBBBBBB', 'BBBBGBBBB', 'BBBBBBBBB', 'BBBBBBBBB', 'BBBBBBBBB']
const HEART_B = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const CHECK = ['......G', '.....GG', 'G...GG.', 'GG.GG..', '.GGG...', '..G....']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'It’s *Capricorn* | season.', { top: 190, size: 114, accentSize: 164, at: T.h0, gap: 0.1, accentColor: ACC, fit: true })
  const H1 = popText(root, 'Forecast: | *steady.*', { top: 190, size: 112, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: WARM, fit: true })
  const H2 = popText(root, 'Every | *Friday.*', { top: 190, size: 118, accentSize: 180, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: RED, fit: true })
  const H3 = popText(root, 'Show *up.*', { top: 230, size: 140, accentSize: 200, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GREEN, fit: true })
  const H4 = popText(root, '*Consistency* | is cute.', { top: 200, size: 128, accentSize: 178, at: T.h4, late: 0, gap: 0.14, accentColor: ACC, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, [T.out[0] + 0.2, T.out[1]]]]
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1398, width: 960, height: 290, open: T.open, close: T.closeA, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1398, width: 960, height: 290, open: T.open2, close: T.closeB, cps: CPS })
  const bug = buildBug(root, { at: T.bug, dot: ACC })
  const ticker = buildTicker(root, { text: 'CAPRICORN SEASON   ·   HIGH CHANCE OF COZY NIGHTS   ·   STEADY SKIES   ·   SERIOUS ABOUT WHAT MATTERS', at: 0.7, out: [25.0, 25.4], accent: ACC })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function wheelShow(t) {
    if (t < T.flipA[0]) return 1
    if (t < T.cut1) return 1 - prog(t, T.flipA[0], (T.flipA[0] + T.flipA[1]) / 2)
    if (t < T.cut2 - 0.15) return 0                                   // the calendar owns beat C
    if (t < T.cut3) return 0
    return 1
  }
  const boardShow = (t, [a, b]) => ease.outCubic(prog(t, (a + b) / 2, b))

  function drawTheWheel(t, ok) {
    const sx = wheelShow(t)
    if (sx <= 0.01) return
    const pin = pop01(t, T.wheelIn, 0.45, 1.8) * ok
    if (pin <= 0.01) return
    const hiK = t >= T.land ? 0.75 + 0.25 * Math.sin((t - T.land) * 4) : 0
    x.save(); x.translate(WX, WY); x.scale(sx * pin, pin); x.translate(-WX, -WY)
    drawWheel(x, t, { cx: WX, cy: WY, r: WR, rot: wheelRot(t), hi: 9, hiK, alpha: 1 })
    x.restore()
    if (t > T.land && sx > 0.5) {
      const fl = t - T.land
      if (fl < 0.6) { x.save(); x.globalAlpha = (1 - fl / 0.6) * 0.9; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; drawPixelStar(x, WX + Math.cos(a) * (60 + fl * 160), WY - WR * 0.9 + Math.sin(a) * (60 + fl * 160), 24, i % 2 ? 1 : 2, i % 2 ? GOLD : ACC) } x.restore() }
    }
    drawMarker(x, t, WX, WY - WR - 6, GOLD, pin * sx)
  }

  function drawForecastBoard(t) {
    if (t < T.flipA[0] || t >= T.cut1) return
    const k = boardShow(t, T.flipA)
    if (k <= 0) return
    const shake = bump(t, T.rows[2], 0.35) * Math.sin((t - T.rows[2]) * 70) * 10
    x.save(); x.translate(shake, 0)
    x.translate(BX + BW / 2, 0); x.scale(k, 1); x.translate(-(BX + BW / 2), 0)
    const r = board(x, BX, BY, BW, BH, { title: 'LOVE FORECAST', accent: ACC })
    const rows = [
      { icon: 'cup', label: 'COZY', sub: 'soup and early nights', col: WARM },
      { icon: 'mount', label: 'STEADY', sub: 'slow and sure', col: ACC },
      { icon: 'case', label: 'SERIOUS', sub: 'about what matters', col: '#c9a6ff' },
    ]
    rows.forEach((R, i) => {
      const p = prog(t, T.rows[i], T.rows[i] + 0.22)
      if (p <= 0) return
      const yc = r.y0 + 60 + i * 140
      const s = i === 2 ? lerp(2.2, 1, ease.outCubic(p)) : lerp(1.6, 1, ease.outCubic(p))
      x.save(); x.globalAlpha = clamp(p * 2.5)
      x.translate(r.x0 + 70, yc); x.scale(s, s)
      if (R.icon === 'cup') drawBits(x, CUP, { S: '#d9d2e8', M: BONE, C: '#7a4a2a', H: BONE }, 0, 0, 9)
      if (R.icon === 'mount') drawBits(x, MOUNT, { W: '#ffffff', G: '#5a8f7a', D: '#2f5a4a' }, 0, 0, 10)
      if (R.icon === 'case') drawBits(x, CASE, { K: INK, B: '#8a5a3a', G: GOLD }, 0, 0, 10)
      x.restore()
      x.save(); x.globalAlpha = clamp(p * 2.5)
      const lx = r.x0 + 140 + (1 - ease.outCubic(p)) * 60
      x.textAlign = 'left'; x.textBaseline = 'middle'
      x.font = `700 46px ${MONO}`; x.fillStyle = R.col; x.fillText(R.label, lx, yc - 18)
      x.font = `700 ${R.sub.length > 22 ? 25 : 28}px ${MONO}`; x.fillStyle = BONE; x.fillText(R.sub, lx, yc + 28)
      x.restore()
      if (i < 2 && p >= 1) { x.fillStyle = 'rgba(239,230,214,0.18)'; x.fillRect(r.x0 + 20, yc + 70, r.w - 40, 3) }
    })
    x.restore()
  }

  // ── the calendar (beat C): 7 × 5 grid, Fridays = column 5
  const CAL = { x0: 432, y0: 712, cw: 77, ch: 76, hy: 690 }
  const FRI_ROWS = [0, 1, 2, 3, 4]
  const cellC = (i, j) => ({ x: CAL.x0 + i * CAL.cw + CAL.cw / 2, y: CAL.y0 + 26 + j * CAL.ch + CAL.ch / 2 })
  function pageOf(t) { return t < T.pages[0] + 0.15 ? 0 : t < T.pages[1] + 0.15 ? 1 : 2 }
  function drawRing(cx, cy, p, col) {
    if (p <= 0) return
    const n = 28, rx = 33, ry = 30
    for (let k = 0; k < Math.floor(n * clamp(p) * 1.08); k++) {
      const a = -Math.PI * 0.6 + (k / n) * Math.PI * 2.1
      const px = Math.round((cx + Math.cos(a) * rx) / 4) * 4, py = Math.round((cy + Math.sin(a) * ry) / 4) * 4
      x.fillStyle = INK; x.fillRect(px - 4, py - 4, 9, 9)
      x.fillStyle = col; x.fillRect(px - 3, py - 3, 7, 7)
    }
  }
  function drawCalendar(t) {
    if (t < T.cut1 || t >= T.cut2 + 0.2) return
    const flipK = (() => { for (const pg of T.pages) { const d = t - pg; if (d > -0.15 && d < 0.15) return Math.abs(d) / 0.15 } return 1 })()
    const leave = 1 - prog(t, T.cut2 - 0.25, T.cut2 - 0.05)
    const pin = pop01(t, T.cut1 + 0.05, 0.35, 1.8) * leave
    if (pin <= 0.01) return
    const pg = pageOf(t)
    x.save()
    x.translate(BX + BW / 2, BY); x.scale(pin, pin * flipK); x.translate(-(BX + BW / 2), -BY)
    board(x, BX, BY, BW, BH, { title: pg === 0 ? 'THIS MONTH' : 'NEXT MONTH', accent: RED, fill: 'rgba(250,244,232,0.97)' })
    // ring binding
    for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(BX + 70 + i * 92, BY - 18, 16, 34); x.fillStyle = '#c8c0d8'; x.fillRect(BX + 73 + i * 92, BY - 15, 10, 28) }
    // day letters
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `700 26px ${MONO}`
    ;['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach((d, i) => { x.fillStyle = i === 5 ? RED : '#6a5a7a'; x.fillText(d, CAL.x0 + i * CAL.cw + CAL.cw / 2, CAL.hy + 10) })
    // dates (generic numbering per page)
    const start = [4, 6, 5][pg]
    for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) {
      const n = j * 7 + i - start + 1
      if (n < 1 || n > 30) continue
      const c = cellC(i, j)
      x.fillStyle = 'rgba(27,18,54,0.12)'; x.fillRect(c.x - CAL.cw / 2 + 3, c.y - CAL.ch / 2 + 3, CAL.cw - 6, CAL.ch - 6)
      x.font = `700 28px ${MONO}`; x.fillStyle = i === 5 ? '#b0283f' : INK
      x.fillText(String(n), c.x, c.y + 1)
    }
    // Fridays: circled live on page 0; hearts already there on the next pages
    FRI_ROWS.forEach((j, q) => {
      const n = j * 7 + 5 - start + 1
      if (n < 1 || n > 30) return
      const c = cellC(5, j)
      if (pg === 0) {
        const t0 = T.circles[Math.min(q, T.circles.length - 1)]
        drawRing(c.x, c.y, prog(t, t0, t0 + (q < 3 ? 0.35 : 0.14)), RED)
      } else {
        drawRing(c.x, c.y, 1, RED)
        drawBits(x, HEART_B, { H: HEART, W: '#ffd1de' }, c.x + 28, c.y - 24, 4)
      }
    })
    x.restore()
  }
  // the pen tip follows the circling
  function circleTip(t) {
    const start = 4
    for (let q = T.circles.length - 1; q >= 0; q--) {
      const t0 = T.circles[q]
      if (t >= t0 - 0.2) {
        const j = FRI_ROWS[q], n = j * 7 + 5 - start + 1
        const row = n < 1 ? j + 1 : j
        const c = cellC(5, Math.min(4, row))
        const p = prog(t, t0, t0 + (q < 3 ? 0.35 : 0.14)), a = -Math.PI * 0.6 + p * Math.PI * 2.1
        return { x: c.x + Math.cos(a) * 33, y: c.y + Math.sin(a) * 30 }
      }
    }
    return { x: cellC(5, 0).x, y: cellC(5, 0).y }
  }

  // ── the gesture board (beat D)
  const WK = { x0: 452, w: 82, gap: 8 }
  function drawGestureBoard(t) {
    if (t < T.flipB[0] || t >= T.cut3) return
    const k = boardShow(t, T.flipB)
    if (k <= 0) return
    x.save()
    x.translate(BX + BW / 2, 0); x.scale(k, 1); x.translate(-(BX + BW / 2), 0)
    board(x, BX, BY, BW, BH, { title: 'SIX WEEKS LATER', accent: GREEN })
    x.textAlign = 'left'; x.textBaseline = 'middle'
    const rowY = [760, 1000]
    // row labels
    x.font = `700 32px ${MONO}`; x.fillStyle = '#c9a6ff'; x.fillText('ONE BIG GESTURE', 436, rowY[0] - 66)
    x.fillStyle = GREEN; x.fillText('EVERY FRIDAY', 436, rowY[1] - 66)
    for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) {
      const tx = WK.x0 + i * (WK.w + WK.gap), ty = rowY[r] - 40
      x.fillStyle = INK; x.fillRect(tx - 3, ty - 3, WK.w + 6, 86)
      x.fillStyle = '#241843'; x.fillRect(tx, ty, WK.w, 80)
      x.font = `700 18px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillText('WK' + (i + 1), tx + 6, ty + 13)
    }
    // row 1: a giant heart in week 1… then cobwebs
    const g = pop01(t, T.gesture, 0.4, 2.6)
    if (g > 0.02) drawBits(x, HEART_B, { H: HEART, W: '#ffd1de' }, WK.x0 + WK.w / 2, rowY[0] + 2, 15 * g)
    for (let i = 1; i < 6; i++) {
      const w = prog(t, T.gesture + 0.4 + i * 0.12, T.gesture + 0.6 + i * 0.12)
      if (w <= 0) continue
      const tx = WK.x0 + i * (WK.w + WK.gap), ty = rowY[0] - 40
      x.save(); x.globalAlpha = w; x.strokeStyle = 'rgba(239,230,214,0.55)'; x.lineWidth = 2
      x.beginPath(); x.moveTo(tx + WK.w, ty); x.lineTo(tx + WK.w - 34, ty + 34); x.moveTo(tx + WK.w - 34, ty); x.lineTo(tx + WK.w, ty + 34)
      x.moveTo(tx + WK.w - 17, ty); x.lineTo(tx + WK.w - 17, ty + 26); x.moveTo(tx + WK.w - 34, ty + 17); x.lineTo(tx + WK.w, ty + 17); x.stroke()
      x.restore()
    }
    // row 2: a small heart every week, on the beat
    T.weeks.forEach((wt, i) => {
      const p = pop01(t, wt, 0.3, 2.6)
      if (p > 0.02) drawBits(x, HEART_B, { H: HEART, W: '#ffd1de' }, WK.x0 + i * (WK.w + WK.gap) + WK.w / 2, rowY[1] + 4, 9 * p)
    })
    // ✓ stamp on row 2
    const c = pop01(t, T.check, 0.3, 2.8)
    if (c > 0.02) {
      drawBits(x, CHECK, { G: GREEN }, 930, rowY[1] - 70, 10 * c)
      const st = t - T.check
      if (st > 0 && st < 0.6) { x.save(); x.globalAlpha = 1 - st / 0.6; for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; drawPixelStar(x, 700 + Math.cos(a) * (60 + st * 300), rowY[1] + Math.sin(a) * (30 + st * 140), 22, i % 2 ? 1 : 2, i % 2 ? GREEN : GOLD) } x.restore() }
    }
    x.restore()
  }

  function forecasterState(t) {
    if (t < T.land) return { mood: 'happy', look: [1, -1] }
    if (t < T.l1) return { mood: 'sparkle', look: [1, -1] }
    if (t < T.flipA[0]) return { mood: 'happy', look: [0, 0] }
    if (t < T.rows[2]) return { mood: 'neutral', look: [1, 0] }
    if (t < T.h2) return { mood: 'neutral', look: [0, 0], blink: false }                   // glasses on. business.
    if (t < T.circles[4] + 0.3) return { mood: 'squint', look: [1, 0] }                      // concentrating on the circles
    if (t < T.pages[0]) return { mood: 'happy', look: [0, 0] }
    if (t < T.flipB[0]) return { mood: 'sparkle', look: [1, 0] }
    if (t < T.weeks[0]) return { mood: 'neutral', look: [1, -1] }
    if (t < T.check) return { mood: 'happy', look: [1, 0] }
    if (t < T.h4) return { mood: 'sparkle', look: [0, 0] }
    if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink' }
    return { mood: 'happy', look: [0, 0] }
  }

  function pointerTip(t) {
    if (t < T.land - 0.4) return null
    if (t < T.flipA[0]) return { x: WX - 40, y: WY - WR + 40 }
    if (t < T.cut1) { const i = t < T.rows[1] ? 0 : t < T.rows[2] ? 1 : 2; return { x: BX + 34, y: BY + 88 + 60 + i * 140 } }
    if (t < T.cut2) { if (t > T.circles[0] - 0.4 && t < T.circles[4] + 0.6) return circleTip(t); return null }
    if (t < T.cut3) { if (t > T.weeks[0] - 0.2 && t < T.check + 0.6) { const i = clamp(Math.floor((t - T.weeks[0]) / 0.3), 0, 5); return { x: WK.x0 + i * (WK.w + WK.gap) + WK.w / 2, y: 1000 + 46 } } return null }
    return null
  }

  // the reading glasses (in sprite cells: eyes at (13.4, 19.2) and (22.6, 19.2))
  function drawGlasses(t, F, k) {
    if (k <= 0) return
    inSprite(x, F, () => {
      x.save(); x.globalAlpha *= clamp(k)
      const drop = (1 - ease.outCubic(clamp(k))) * -6
      x.translate(0, drop)
      const frame = (cx) => {
        x.fillStyle = INK; x.fillRect(cx - 4, 16.4, 8, 0.8); x.fillRect(cx - 4, 22.2, 8, 0.8); x.fillRect(cx - 4.4, 16.4, 0.8, 6.6); x.fillRect(cx + 3.6, 16.4, 0.8, 6.6)
        x.fillStyle = 'rgba(200,235,255,0.16)'; x.fillRect(cx - 3.6, 17.2, 7.2, 5)
      }
      frame(13.4); frame(22.6)
      x.fillStyle = INK; x.fillRect(17.4, 18, 1.2, 1); x.fillRect(16.8, 17.6, 2.4, 0.9)
      // glint
      const gk = bump(t, T.glint, 0.4) + bump(t, T.rows[2] + 0.25, 0.35)
      if (gk > 0) { x.fillStyle = `rgba(255,255,255,${gk})`; x.fillRect(20.4, 17.6, 1, 1); x.fillRect(21.4, 18.6, 1, 1) }
      x.restore()
    })
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    if (t >= T.out[1] + 0.02) return
    drawTheWheel(t, ok)
    drawForecastBoard(t)
    drawCalendar(t)
    drawGestureBoard(t)
    const fp = pop01(t, T.fIn, 0.38, 2.2) * ok
    const st = forecasterState(t)
    const nod = t >= T.rows[2] && t < T.rows[2] + 0.5 ? -0.12 * Math.exp(-(t - T.rows[2]) * 7) * Math.cos((t - T.rows[2]) * 22) : 0
    let rF = null
    if (fp > 0.02) {
      rF = drawStarChar(x, FX, FY, FS, t, { color: STAR.sky, ...st, hops: F_HOPS, pop: fp, squash: nod, seed: 3, glow: 1.1 })
      drawGlasses(t, starFrame(FX, FY, FS, t, { pop: fp, hops: F_HOPS, squash: nod, seed: 3 }), prog(t, T.rows[2] + 0.02, T.rows[2] + 0.2) * ok)
    }
    const tip = pointerTip(t)
    if (tip && rF) {
      const inC = t >= T.cut1 && t < T.cut2
      drawPointer(x, ARM.x, ARM.y + (rF.y - FY), tip.x, tip.y, clamp(fp) * (t < T.land - 0.2 ? prog(t, T.land - 0.4, T.land - 0.2) : 1))
      if (inC) { x.fillStyle = INK; x.fillRect(Math.round(tip.x) - 7, Math.round(tip.y) - 7, 14, 14); x.fillStyle = RED; x.fillRect(Math.round(tip.x) - 5, Math.round(tip.y) - 5, 10, 10) }
    }
    const pp = pop01(t, T.pisIn, 0.36, 2.0) * ok
    const cry = t < T.rows[0] ? 1 : t < T.cut1 ? 2 : t < T.pages[0] ? 1 : t < T.flipB[0] ? 3 : t < T.check ? 2 : 3
    drawPisces(x, t, { x: PX, y: PY, size: PS, cry, mood: 'sparkle', pop: pp, look: t >= T.pages[0] && t < T.flipB[0] ? [-1, -1] : [-1, 0], hops: PIS_HOPS })
    const dk = pop01(t, T.deskIn, 0.4, 1.6) * ok
    if (dk > 0.02) {
      x.save(); x.translate(540, DESK_Y + 75); x.scale(1, dk); x.translate(-540, -(DESK_Y + 75))
      drawDesk(x, { y: DESK_Y, accent: GOLD })
      x.restore()
    }
    // a little steaming cup on the desk (cozy)
    x.save(); x.globalAlpha = clamp(dk); drawBits(x, CUP.slice(3), { M: BONE, C: '#7a4a2a', H: BONE }, 432, 1166, 7)
    for (let i = 0; i < 2; i++) { const ph = (t * 0.6 + i / 2) % 1; x.globalAlpha = clamp(dk) * Math.sin(Math.PI * ph) * 0.7; x.fillStyle = '#d9d2e8'; x.fillRect(Math.round(420 + i * 16 + Math.sin(ph * 8 + i) * 5), Math.round(1130 - ph * 60), 6, 10) }
    x.restore()
    if (t > T.h4Land + 0.3) for (let i = 0; i < 10; i++) {
      const ph = ((t - T.h4Land) * 0.4 + i / 10) % 1
      x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.8 * ok
      drawPixelStar(x, 120 + (i * 97) % 860, 1160 - ph * 600, 18 + (i % 3) * 6, i % 2 ? 1 : 2, i % 2 ? ACC : GOLD)
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawScene(t)
      boxA.update(t); boxB.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, [T.out[0], T.out[1]]))
      ticker.update(t)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (beat changes). cardfx keeps 2 for this 25.6 s story: 10.75 and 21.75.
const CUTS = [5.5, T.cut1, T.cut2, T.cut3]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound
const NOTE = [622.25, 698.46, 783.99, 830.61, 932.33, 1046.5, 1174.66, 1244.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const spinTicks = (() => {
  const out = []; let last = null
  for (let t = T.spin[0]; t <= T.land; t += 1 / 120) {
    const k = Math.floor((wheelRot(t) - ROT0) / (Math.PI / 6))
    if (last !== null && k !== last) { if (!out.length || t - out[out.length - 1][1] > 0.045) out.push(['tick', +t.toFixed(3), 0.03]) }
    last = k
  }
  return out
})()
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.026),
  ['pop', T.deskIn + 0.1, 415.3, 0.04, 0], ['whoosh', T.wheelIn, 0.8, 0.05], ['pop', T.fIn + 0.05, 783.99, 0.04, -0.3], ['pop', T.pisIn + 0.05, 1046.5, 0.025, 0.5],
  ...spinTicks,
  ['boom', T.land, 0.18], ['bell', T.land, 1244.51, 0.035, 1.4, 0], ['glitter', T.land, T.land + 0.5],
  ['pop', T.open, 783.99, 0.035, 0], ['pop', T.open + 0.06, 932.33, 0.03, 0],
  ...talkCues([...LINES_A, ...LINES_B], { cps: CPS }),
  // forecast: steady — the third slam snaps the glasses on
  ['whoosh', T.flipA[0], 0.4, 0.04], ['tick', (T.flipA[0] + T.flipA[1]) / 2, 0.05],
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['boom', T.rows[0], 0.1], ['pop', T.rows[0], 622.25, 0.04, 0.3],
  ['boom', T.rows[1], 0.12], ['pop', T.rows[1], 783.99, 0.04, 0.3],
  ['boom', T.rows[2], 0.22], ['pop', T.rows[2], 932.33, 0.05, 0.3], ['tick', T.rows[2] + 0.1, 0.07], ['bell', T.rows[2] + 0.28, 2489, 0.02, 0.6, -0.3],
  ['pop', T.closeA, 783.99, 0.03, 0], ['pop', T.closeA + 0.07, 622.25, 0.03, 0],
  // every Friday: pen squeaks, page flips
  ...wordPops(T.h2, 1, 0.08, 1, 0.026), ['pop', T.h2Land, 1244.51, 0.045, 0],
  ...T.circles.map((c, q) => ['pluck', c, [783.99, 932.33, 1046.5, 1174.66, 1244.51][q], 0.035, 0.4, 0.3]),
  ['pop', T.open2, 783.99, 0.035, 0], ['pop', T.open2 + 0.06, 932.33, 0.03, 0],
  ...T.pages.flatMap(p => [['whoosh', p - 0.12, 0.25, 0.04], ['tick', p, 0.05], ['bell', p + 0.15, 1567.98, 0.022, 0.8, 0.3]]),
  // show up: the big gesture, cobwebs, six small hearts, ✓
  ['whoosh', T.flipB[0], 0.4, 0.04], ['tick', (T.flipB[0] + T.flipB[1]) / 2, 0.05],
  ...wordPops(T.h3, 1, 0.08, 3, 0.03), ['pop', T.h3Land, 1046.5, 0.05, 0],
  ['boom', T.gesture, 0.14], ['pop', T.gesture, 1244.51, 0.04, 0.3], ['pluck', T.gesture + 0.9, 196, 0.035, 0.8, 0.3],
  ...T.weeks.map((w, i) => ['pop', w, NOTE[i % NOTE.length], 0.035, 0.3]),
  ['bell', T.check, 1567.98, 0.04, 1.0, 0.3], ['glitter', T.check, T.check + 0.5],
  ['pop', T.closeB, 783.99, 0.03, 0], ['pop', T.closeB + 0.07, 622.25, 0.03, 0],
  // consistency is cute
  ...wordPops(T.h4, 3, 0.14, 0, 0.03), ['pluck', T.h4 + 0.05, 1244.51, 0.04, 0.8, 0], ['glitter', T.h4 + 0.3, T.h4 + 0.8],
  ['bell', T.glint, 2489, 0.02, 0.6, -0.3], ['pluck', T.wink[0], 1174.66, 0.035, 0.5, -0.2], ['pop', T.sob, 622.25, 0.03, 0.5], ['pop', T.sob + 0.15, 554.37, 0.03, 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
