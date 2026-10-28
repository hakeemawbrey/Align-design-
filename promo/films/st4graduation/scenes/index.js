// st4graduation (EP 093, 25 s vertical, Star Talk season 4, thread D7: Saturn's class graduates) · story 0–20.6, then the end card.
//   0.00–6.10  "Saturn's class | *graduates.*"  The chalkboard reads SATURN RETURN 101 · GRADUATION and chalks on "CONGRATS,
//              CLASS!". Taurus, Gemini and Leo (st4exam's class) stand on stage in pixel caps and gowns. Saturn (stsaturn:
//              ringed, round glasses) rolls in and hands out diplomas; each flies over and unrolls over a head:
//              TAURUS "PATTERNS: SPOTTED" · GEMINI "KNOWS WHAT THEY WANT" · LEO "KIND GOODBYES".
//   6.15–12.8  "So *proud.*"  Box (♄ SATURN): "i was strict because i *believe* in you."  A pixel tear rolls down behind
//              Saturn's glasses. → "class dismissed. go love *well.*"  On "well" every cap flies up, spinning.
//  13.38       ★ LESSON UNLOCKED: "Grown-up love | is a *choice.*" (shared lesson.js), held to 17.4.
//  17.82       card cut (flip).
//  17.90–20.5  "Class | *dismissed.*"  The caps rain back down with confetti; the graduates hop, Saturn winks.
// Easter eggs (stlore.js): the constellation (EP 93) top-left, the EP 093 cartouche, the ghost leans out past the
// chalkboard's right edge.
// One canvas (sky + board + cast), DOM type + the dialogue box + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 25
export const EP = 93
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5a5a', INK = '#1b1236', MINT = '#7fe0b8'
const SAT = '#e8c27a', CHALK = '#f4f1e6', GOWN = '#2b1d66', GOWN2 = '#3b2a86'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.9, h0Out: [5.9, 6.1],
  boardIn: [0.3, 0.75], header: 0.8, q: [1.0, 1.9],
  starsIn: [0.55, 0.68, 0.81], satIn: [0.95, 1.7], glint: BEAT(3),         // 2.27
  dips: [2.6, 3.55, 4.5], fly: 0.45, unroll: 0.3,
  h1: 6.2, h1Land: 6.55, open: 6.15, s1: 6.3, tear: [7.2, 9.2],
  s2: 9.7, toss: 11.1, close: 12.8, h1Out: [12.6, 12.8],
  ghost: 3.9,
  lesson: BEAT(23),                                                       // 13.38
  cut: 17.82,
  h2: 17.9, h2Land: 18.25, rain: 18.0, wink: [19.2, 19.65], h2Out: [20.28, 20.5], out: [20.1, 20.5],
}
const LESSON = { at: T.lesson, out: [17.4, 17.6], text: 'Grown-up love | is a *choice.*' }
const ST = '♄ SATURN'
const LINES = [
  { t: T.s1, speaker: ST, color: SAT, text: 'i was strict because i *believe* in you.' },
  { t: T.s2, speaker: ST, color: SAT, text: 'class dismissed. go love *well.*' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })
const CHALKED = 'CONGRATS, CLASS!'

// the class (st4exam's): each gets the diploma for a lesson from the season
const CLASS = [
  { ...signStar('taurus'), seed: 11, dip: ['PATTERNS:', 'SPOTTED'] },
  { ...signStar('gemini'), seed: 17, dip: ['KNOWS WHAT', 'THEY WANT'] },
  { ...signStar('leo'), seed: 23, dip: ['KIND', 'GOODBYES'] },
]
const STAND_A = [175, 420, 665], ROW_A = 1190, SIZE_A = 160, DIP_A = 985
const STAND_F = [205, 540, 875], ROW_F = 1180, SIZE_F = 210, DIP_F = 930
const BOARD = { x: 90, y: 470, w: 900, h: 380 }
const SAT_A = { x: 900, y: 1130, r: 72 }, SAT_F = { x: 540, y: 1520, r: 64 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

async function build(stage) {
  try {
    await Promise.all(["800 96px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Saturn’s class | *graduates.*', { top: 196, size: 100, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: SAT })
  const H1 = popText(root, 'So *proud.*', { top: 250, size: 120, accentSize: 170, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.09, accentColor: PINK })
  const H2 = popText(root, 'Class | *dismissed.*', { top: 196, size: 128, accentSize: 180, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── the chalkboard
  function drawBoard(t) {
    if (t >= T.cut) return
    const k = easeOutBack(prog(t, ...T.boardIn), 1.6)
    if (k <= 0.01) return
    const { x: bx, y: by, w, h } = BOARD
    x.save(); x.globalAlpha *= 1 - 0.8 * ease.inOutQuad(prog(t, T.lesson, T.lesson + 0.4)); x.translate(bx + w / 2, by + h / 2); x.scale(k, k); x.translate(-w / 2, -h / 2)
    x.fillStyle = 'rgba(10,6,24,0.9)'; x.fillRect(-10, -10, w + 20, h + 36)
    x.fillStyle = '#8a5a2a'; x.fillRect(-4, -4, w + 8, h + 8)
    x.fillStyle = '#b07a3a'; x.fillRect(-4, -4, w + 8, 6); x.fillRect(-4, -4, 6, h + 8)
    const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1f3a33'); g.addColorStop(1, '#16302a')
    x.fillStyle = g; x.fillRect(12, 12, w - 24, h - 24)
    // ghosts of old lessons, half wiped
    x.font = `700 24px ${MONO}`; x.fillStyle = 'rgba(244,241,230,0.08)'; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('SAY WHAT YOU WANT', 60, 130); x.fillText('NO "BUT"', 600, 120); x.fillText('PATTERNS', 80, 300); x.fillText('BOUNDARIES', 590, 310)
    x.fillStyle = '#6e4620'; x.fillRect(-4, h + 4, w + 8, 16); x.fillStyle = '#b07a3a'; x.fillRect(-4, h + 4, w + 8, 4)
    x.fillStyle = CHALK; x.fillRect(120, h - 2, 46, 8); x.fillStyle = PINK; x.fillRect(190, h - 2, 34, 8)
    x.font = `700 26px ${MONO}`; x.fillStyle = rgba(CHALK, 0.7); x.letterSpacing = '0.16em'
    x.fillText('SATURN RETURN 101', 44, 54)
    if (t >= T.header) { x.textAlign = 'right'; x.fillStyle = rgba(SAT, 0.95); x.fillText('GRADUATION', w - 40, 54) }
    x.letterSpacing = '0px'
    x.fillStyle = rgba(CHALK, 0.25); x.fillRect(44, 84, w - 88, 3)
    const n = Math.floor(clamp((t - T.q[0]) / (T.q[1] - T.q[0])) * CHALKED.length + 0.0001)
    x.font = `700 70px ${MONO}`; x.fillStyle = CHALK; x.shadowColor = 'rgba(244,241,230,0.35)'; x.shadowBlur = 8
    if (n > 0) { const full = x.measureText(CHALKED).width; x.textAlign = 'left'; x.fillText(CHALKED.slice(0, n), w / 2 - full / 2, h / 2 + 30) }
    x.shadowBlur = 0
    // a chalk star doodle once it's written
    const dk = prog(t, T.q[1] + 0.1, T.q[1] + 0.4)
    if (dk > 0) { x.globalAlpha *= dk; drawPixelStar(x, w / 2, h / 2 + 115, 44, 2, SAT, CHALK) }
    x.restore()
  }

  // ── Saturn (stsaturn's sprite), with a tear behind the glasses on line 1
  const RC = 11
  const BANDS = ['#f6dca0', '#e8c27a', '#d9a85e', '#f0cf8c', '#c98f4a', '#e8c27a', '#f6dca0']
  function satPos(t) {
    if (t < T.cut) {
      const p = prog(t, ...T.satIn), e = ease.outCubic(p)
      return { x: lerp(1300, SAT_A.x, e), y: SAT_A.y - Math.abs(Math.sin(p * Math.PI * 2)) * 40 * (1 - p), r: SAT_A.r, roll: (1 - e) * -2.2, k: t >= T.satIn[0] ? 1 : 0 }
    }
    return { ...SAT_F, roll: 0, k: pop01(t, T.cut + 0.1, 0.4, 1.8) }
  }
  function satMood(t) {
    if (t < T.dips[0]) return { eyes: 'stern', look: [-1, -1] }
    if (t < T.s1) return { eyes: 'open', look: [-1, 0] }
    if (t < T.tear[1]) return { eyes: 'happy' }
    if (t < T.s2) return { eyes: 'open', look: [0, 0] }
    if (t < T.cut) return { eyes: 'happy' }
    if (t >= T.wink[0] && t < T.wink[1]) return { eyes: 'wink' }
    return { eyes: 'happy' }
  }
  function drawSaturn(t) {
    const P = satPos(t), ok = popOut(t, T.out), k = P.k * ok
    if (k <= 0.01) return
    const c = Math.max(2, Math.round(P.r * k / RC)), R = RC
    const cx = Math.round(P.x), cy = Math.round(P.y + Math.sin(t * 1.9) * 5)
    glow(cx, cy, P.r * 3, SAT, 0.65 * k)
    const tilt = -0.32 + P.roll * 0.15 + 0.04 * Math.sin(t * 1.3)
    const ct = Math.cos(tilt), sn = Math.sin(tilt)
    const ringCell = (i, j) => {
      const u = (i + 0.5) * ct + (j + 0.5) * sn, v = -(i + 0.5) * sn + (j + 0.5) * ct
      const e = (u / (2.15 * R)) ** 2 + (v / (0.6 * R)) ** 2, e2 = (u / (1.42 * R)) ** 2 + (v / (0.36 * R)) ** 2
      return e <= 1 && e2 > 1 ? { v, edge: e > 0.82 } : null
    }
    const drawRing = back => {
      for (let j = -Math.ceil(1.3 * R); j <= Math.ceil(1.3 * R); j++) for (let i = -Math.ceil(2.3 * R); i <= Math.ceil(2.3 * R); i++) {
        const q = ringCell(i, j)
        if (!q || (q.v < 0) !== back) continue
        x.fillStyle = q.edge ? '#b07a3a' : back ? '#c99a5a' : '#f3d9a2'
        x.fillRect(cx + i * c, cy + j * c, c, c)
      }
    }
    x.save()
    x.fillStyle = 'rgba(14,8,32,0.9)'; x.beginPath(); x.arc(cx + c / 2, cy + c / 2, (R + 1.2) * c, 0, Math.PI * 2); x.fill()
    drawRing(true)
    for (let j = -R; j < R; j++) for (let i = -R; i < R; i++) {
      const d = Math.hypot(i + 0.5, j + 0.5)
      if (d > R) continue
      const band = BANDS[clamp(Math.floor(((j + R) / (2 * R)) * BANDS.length), 0, BANDS.length - 1)]
      x.fillStyle = d > R - 1 && i + j > 0 ? '#b07a3a' : (i + j < -R * 0.9 && d < R - 1 ? '#fff1c8' : band)
      x.fillRect(cx + i * c, cy + j * c, c, c)
    }
    const M = satMood(t), [lx, ly] = M.look || [0, 0]
    const blinkT = (t + 0.7) % 3.7 < 0.13
    for (const s of [-1, 1]) {
      const ex = cx + s * 4 * c, ey = cy - 1 * c
      x.strokeStyle = INK; x.lineWidth = Math.max(2, c * 0.7)
      x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3.3 * c, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(190,230,255,0.25)'; x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3 * c, 0, Math.PI * 2); x.fill()
      x.fillStyle = INK
      const e = M.eyes === 'wink' ? (s > 0 ? 'happy' : 'open') : M.eyes
      if (blinkT && e !== 'happy') x.fillRect(ex - c, ey + c, 3 * c, c)
      else if (e === 'happy') { x.fillRect(ex - c, ey + c, c, c); x.fillRect(ex, ey, c, c); x.fillRect(ex + c, ey + c, c, c) }
      else if (e === 'stern') { x.fillRect(ex - c + lx * c, ey, 3 * c, c); x.fillRect(ex + lx * c, ey + c, 2 * c, c); x.fillRect(ex - 2 * c, ey - 2 * c, 4 * c, c * 0.8) }
      else { x.fillRect(ex + lx * c, ey + ly * c - c, 2 * c, 3 * c); x.fillStyle = '#ffffff'; x.fillRect(ex + lx * c, ey + ly * c - c, c * 0.8, c * 0.8) }
    }
    x.fillStyle = INK; x.fillRect(cx - c, cy - c * 0.6, 2 * c, c * 0.7)
    // the tear: one pixel drop slides out under the left lens and down the cheek
    const tp = prog(t, ...T.tear)
    if (tp > 0 && tp < 1) {
      const ty = cy + 2.6 * c + ease.inQuad(tp) * 6 * c
      x.fillStyle = '#bfe8ff'; x.globalAlpha = 1 - ease.inQuad(prog(tp, 0.75, 1))
      x.fillRect(cx - 5 * c, ty, c, c * 1.4); x.fillRect(cx - 5.4 * c, ty + c * 0.6, c * 1.8, c); x.fillStyle = '#ffffff'; x.fillRect(cx - 5 * c, ty, c * 0.5, c * 0.5)
      x.globalAlpha = 1
    }
    const g = t - T.glint
    if (g > 0 && g < 0.5) drawPixelStar(x, cx - 2 * c, cy - 3 * c, 40 * Math.sin(Math.PI * g / 0.5) + 8, 2, '#ffffff')
    drawRing(false)
    x.restore()
  }

  // ── caps and gowns
  // the mortarboard: a flat diamond board (seen a little from the front), a skull cap, a gold tassel. (cx, cy) = cap centre.
  function drawCap(cx, cy, s, rot = 0, a = 1, tasselSwing = 0) {
    if (a <= 0) return
    const c = Math.max(2, Math.round(s / 16))
    x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
    // skull cap
    x.fillStyle = 'rgba(10,6,24,0.92)'; x.fillRect(-5 * c - 2, -c - 2, 10 * c + 4, 4 * c + 4)
    x.fillStyle = '#1c1240'; x.fillRect(-5 * c, -c, 10 * c, 4 * c)
    // board: rows of a flat diamond
    const rows = [[-1, 4], [0, 8], [1, 10], [2, 8], [3, 4]].map(([j, hw]) => [j - 4, hw])
    x.fillStyle = 'rgba(10,6,24,0.92)'; for (const [j, hw] of rows) x.fillRect((-hw - 1) * c, (j - 0.5) * c, (2 * hw + 2) * c, 2 * c)
    for (const [j, hw] of rows) { x.fillStyle = j === -3 ? '#3b2a86' : '#241760'; x.fillRect(-hw * c, j * c, 2 * hw * c, c) }
    // tassel: from the button to the right edge, then hanging
    x.fillStyle = GOLD; x.fillRect(-c / 2, -3.5 * c, c, c)
    x.fillRect(0, -3 * c, 8 * c, c * 0.7)
    const sw = Math.round(tasselSwing * 2)
    for (let q = 0; q < 5; q++) x.fillRect(8 * c + sw * c * (q / 5), (-3 + q) * c, c, c)
    x.fillStyle = '#ffe08a'; x.fillRect(7.6 * c + sw * c, 2 * c, 1.8 * c, 1.6 * c)
    x.restore()
  }
  function drawGown(cx, cy, s, a = 1) {
    if (a <= 0) return
    // behind the star's lower half: a trapezoid robe peeking out below, with a gold stole
    const c = Math.max(2, Math.round(s / 18))
    x.save(); x.globalAlpha *= a
    for (let j = 0; j < 9; j++) {
      const hw = 4 + j * 0.8, y = cy + s * 0.05 + j * c
      x.fillStyle = 'rgba(10,6,24,0.92)'; x.fillRect(Math.round(cx - (hw + 1) * c), Math.round(y), Math.round((2 * hw + 2) * c), c + 1)
      x.fillStyle = j % 3 === 2 ? GOWN2 : GOWN; x.fillRect(Math.round(cx - hw * c), Math.round(y), Math.round(2 * hw * c), c + 1)
      x.fillStyle = GOLD; x.fillRect(Math.round(cx - (hw - 1.2) * c), Math.round(y), c, c + 1); x.fillRect(Math.round(cx + (hw - 2.2) * c), Math.round(y), c, c + 1)
    }
    x.restore()
  }

  // ── the class
  function standPos(t, i) {
    if (t < T.cut) return { x: STAND_A[i], y: ROW_A, s: SIZE_A, dy: DIP_A }
    return { x: STAND_F[i], y: ROW_F, s: SIZE_F, dy: DIP_F }
  }
  function starState(t, i) {
    const d = T.dips[i] + T.fly
    if (t >= T.cut) return { mood: i === 1 ? 'heart' : t > T.wink[0] && i === 2 ? 'sparkle' : 'happy' }
    if (t < T.satIn[1]) return { mood: 'wide', look: [1, 0] }
    if (t < d) return { mood: 'neutral', look: [1, 0] }
    if (t < d + 0.6) return { mood: 'wide', look: [0, -1] }                       // reads its diploma
    if (t < T.s1) return { mood: 'sparkle', look: [0, 0] }
    if (t < T.s2) return { mood: t < LT[0].done ? 'wide' : 'heart', look: [1, 0] }
    if (t < T.toss) return { mood: 'happy' }
    return { mood: 'wide', look: [0, -1] }                                         // watches the caps go
  }
  const HOPS = [[T.dips[0] + T.fly + 0.05, T.toss - 0.05, 18.6, 19.5], [T.dips[1] + T.fly + 0.05, T.toss, 18.75, 19.65], [T.dips[2] + T.fly + 0.05, T.toss + 0.05, 18.9, 19.8]]
  // cap on the head (r.top), or tossed (pure ballistic + spin), or raining back in the last beat
  function capState(t, i, P, top) {
    const headY = top + P.s * 0.02
    if (t < T.toss) return { x: P.x + 4, y: headY, rot: -0.12 + 0.05 * Math.sin(t * 2 + i), a: 1 }
    if (t < T.cut) {
      const u = t - T.toss - i * 0.05
      if (u < 0) return { x: P.x + 4, y: headY, rot: -0.12, a: 1 }
      return { x: P.x + 4 + (i - 1) * 140 * u, y: headY - 1700 * u + 900 * u * u, rot: -0.12 + (i % 2 ? 1 : -1) * 9 * u, a: 1 }
    }
    // rain: each star's cap lands back on its head at 18.4 + i·0.15
    const land = 18.4 + i * 0.15, u = clamp(prog(t, T.rain + i * 0.15, land))
    return { x: P.x + 4 + (1 - u) * (i - 1) * 120, y: lerp(-150, headY, ease.outBounce ? ease.outBounce(u) : ease.outCubic(u)), rot: (1 - u) * (i % 2 ? 6 : -6) - 0.12, a: 1 }
  }
  function drawClass(t) {
    const ok = popOut(t, T.out)
    CLASS.forEach((S, i) => {
      let pk = pop01(t, T.starsIn[i], 0.36, 2.1)
      if (t >= T.cut) pk = pop01(t, T.cut + 0.08 + i * 0.07, 0.34, 2)
      pk *= ok
      if (pk <= 0.02) return
      const P = standPos(t, i), st = starState(t, i)
      drawGown(P.x, P.y, P.s * pk, clamp(pk))
      const r = drawStarChar(x, P.x, P.y, P.s * pk, t, { color: S.color, glyph: P.s >= 150 ? S.glyph : null, ...st, hops: HOPS[i], seed: S.seed, bob: 4 })
      const C = capState(t, i, P, r.top)
      drawCap(C.x, C.y, P.s * 0.62 * pk, C.rot, C.a * clamp(pk), Math.sin(t * 3 + i))
      drawDiploma(t, i, P, pk)
    })
  }
  // the diploma: a scroll flies from Saturn, lands over the star's head and unrolls: gold seal, the lesson in ink
  function drawDiploma(t, i, P, pk) {
    const t0 = T.dips[i], big = t >= T.cut
    if (!big && t < t0) return
    const fly = big ? 1 : prog(t, t0, t0 + T.fly), un = big ? pop01(t, T.cut + 0.2 + i * 0.07, 0.3, 1.6) : ease.outCubic(prog(t, t0 + T.fly, t0 + T.fly + T.unroll))
    const sx = SAT_A.x - 40, sy = SAT_A.y - 60
    const cx = lerp(sx, P.x, ease.inOutCubic(fly)), cy = lerp(sy, P.dy, ease.inOutCubic(fly)) - Math.sin(Math.PI * fly) * 160
    const w = big ? 290 : 212, h = big ? 124 : 104
    const ww = lerp(26, w, un) * clamp(pk)
    x.save(); x.translate(cx, cy + Math.sin(t * 2.2 + i) * 3); x.rotate((i - 1) * 0.04 + (1 - fly) * 6)
    // paper
    x.fillStyle = 'rgba(10,6,24,0.92)'; x.fillRect(-ww / 2 - 6, -h / 2 - 6, ww + 12, h + 12)
    x.fillStyle = '#fbf3dc'; x.fillRect(-ww / 2, -h / 2, ww, h)
    x.fillStyle = '#e9dcb8'; x.fillRect(-ww / 2, -h / 2, ww, 6); x.fillRect(-ww / 2, h / 2 - 6, ww, 6)
    // rolled ends
    x.fillStyle = '#d9c79a'; x.fillRect(-ww / 2 - 10, -h / 2 - 4, 14, h + 8); x.fillRect(ww / 2 - 4, -h / 2 - 4, 14, h + 8)
    if (un > 0.85) {
      const fs = big ? 27 : 22
      x.font = `700 ${fs}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
      const L = CLASS[i].dip, lh = fs * 1.2
      L.forEach((ln, j) => x.fillText(ln, 0, -(L.length - 1) * lh / 2 + j * lh - 6))
      // red ribbon + gold seal bottom-right
      x.fillStyle = RED; x.fillRect(ww / 2 - 46, h / 2 - 16, 8, 26); x.fillRect(ww / 2 - 32, h / 2 - 16, 8, 26)
      x.fillStyle = GOLD; x.beginPath(); x.arc(ww / 2 - 34, h / 2 - 18, 14, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#fff1c8'; x.fillRect(ww / 2 - 38, h / 2 - 22, 6, 6)
    }
    x.restore()
  }

  // ── confetti (pure: a fixed set of flakes, falling from the toss / the rain)
  const FLAKES = Array.from({ length: 46 }, (_, i) => ({ x: hash(i) * 1080, d: hash(i + 99) * 0.8, v: 380 + hash(i + 7) * 300, w: 0.6 + hash(i + 3) * 1.4, col: [GOLD, PINK, LAV, MINT, BONE][i % 5] }))
  function confetti(t, t0, life = 2.4) {
    for (const f of FLAKES) {
      const u = t - t0 - f.d
      if (u < 0 || u > life) continue
      const y = -40 + f.v * u, xx = f.x + Math.sin(u * 3 * f.w + f.x) * 40
      x.globalAlpha = 1 - ease.inQuad(clamp(u / life))
      x.fillStyle = f.col; x.fillRect(Math.round(xx), Math.round(y), 10, Math.abs(Math.sin(u * 6 * f.w)) * 12 + 3)
    }
    x.globalAlpha = 1
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, SAT, LAV]) {
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

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const dimL = t < T.cut ? 1 - 0.85 * ease.inOutQuad(prog(t, T.lesson, T.lesson + 0.4)) : 1
        x.save(); x.globalAlpha = dimL
        drawBoard(t)
        if (t < T.cut) drawGhostCameo(x, t, { x: BOARD.x + BOARD.w + 6, y: 700, at: T.ghost, dur: 1.3, from: 'left' })
        drawSaturn(t)
        drawClass(t)
        x.restore()
        T.dips.forEach((d, i) => sparkles(t, STAND_A[i], DIP_A, d + T.fly + T.unroll, 8, 130, i))
        if (t < T.cut) confetti(t, T.toss + 0.2, 2.4)
        else { confetti(t, T.rain, 2.6); sparkles(t, 540, DIP_F, T.h2Land, 14, 380, 5) }
      }
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.1 (inert: H0 → H1 as the box opens) and 17.82 (the lesson clears → "Class dismissed", plays).
const CUTS = [6.1, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const chalk = (t0, t1, n, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + (t1 - t0) * i / n).toFixed(3), gain])
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['whoosh', T.boardIn[0], 0.35, 0.03], ['tick', T.boardIn[1], 0.05],
  ...T.starsIn.map((s, i) => ['pop', s + 0.05, NOTE[i + 1], 0.03, -0.3 + i * 0.2]),
  ...chalk(T.q[0], T.q[1], 12),
  ['riser', T.satIn[0] - 0.2, T.satIn[1], 0.035], ['boom', T.satIn[1], 0.2], ['tick', T.satIn[1] + 0.1, 0.04],
  ['bell', T.glint, 2093, 0.03, 1.2, 0.2],
  ...T.dips.flatMap((d, i) => [['whoosh', d, 0.4, 0.03], ['pop', d + T.fly, NOTE[2 + i], 0.035, -0.3 + i * 0.3], ['pluck', d + T.fly + T.unroll, NOTE[4 + i] * 2, 0.035, 0.6, -0.3 + i * 0.3], ['glitter', d + T.fly + T.unroll, d + T.fly + T.unroll + 0.4]]),
  ['pop', T.open, 523.25, 0.04, 0], ['pop', T.open + 0.06, 659.25, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ST]: 440 } }),
  ...wordPops(T.h1, 1, 0.09, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['bell', T.tear[0] + 0.2, 1567.98, 0.02, 1.4, -0.3],
  // caps up!
  ['whoosh', T.toss, 0.5, 0.045], ...[0, 1, 2].map(i => ['pop', +(T.toss + i * 0.05).toFixed(3), NOTE[4 + i], 0.04, -0.3 + i * 0.3]), ['glitter', T.toss + 0.2, T.toss + 1.2], ['boom', T.toss, 0.14],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['tick', T.ghost + 0.05, 0.014],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'D' }),
  ...wordPops(T.h2, 1, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0], ['glitter', T.rain, T.rain + 1.0],
  ...[0, 1, 2].map(i => ['tick', +(18.4 + i * 0.15).toFixed(3), 0.05]),
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
