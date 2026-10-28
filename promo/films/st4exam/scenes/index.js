// st4exam (20 s vertical Align ad, Star Talk season 4, EP 076 · thread D6, Saturn's class) · story 0–15.6, then the end card.
//   0.00–5.05  "Saturn's class: | the *final exam.*"  A chalkboard (SATURN RETURN 101 · FINAL EXAM) writes itself one question:
//              "WHAT DO YOU WANT?"  Saturn (stsaturn: ringed, round glasses, pointer) rolls in; ♉ ♊ ♌ sit at tiny desks.
//              Box (♄ SATURN): "there are no wrong answers."  Each star writes on an answer board and holds it up:
//              TAURUS "COOKS WITH ME ON SUNDAYS" · GEMINI "GOOD VIBES?" · LEO "ASKS ABOUT MY DAY".
//   5.10–8.80  "Show your *work.*"  Box: "only *vague* ones."  The pointer taps Gemini's board: a red chalk circle, VAGUE.
//              Gemini goes wide-eyed, scribbles it out and writes "LAUGHS AT MY PUNS". Saturn stamps A+ on all three.
//   8.93       ★ LESSON UNLOCKED: "Specific is | *attractive.*" (shared lesson.js), held to 12.6.
//  12.82       card cut (flip).
//  12.88–15.5  "Know what | you *want.*"  The three stars hold their A+ boards up and hop; Saturn winks.
// Easter eggs (stlore.js): the constellation (EP 76) top-left, the EP 076 cartouche, the ghost hangs under the chalk tray.
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

export const DURATION = 20
const EP = 76
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5a5a', INK = '#1b1236'
const SAT = '#e8c27a', CHALK = '#f4f1e6'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.9, h0Out: [4.85, 5.05],
  boardIn: [0.3, 0.75], header: 0.8, q: [1.05, 2.05],
  starsIn: [0.55, 0.68, 0.81], satIn: [0.95, 1.7], glint: BEAT(3),         // 2.27
  open: 2.3, s1: 2.45,
  answers: [3.05, 3.3, 3.55], write: 0.75,
  h1: 5.1, h1Land: 5.45, s2: 5.2, point: [5.3, 5.7], circle: 6.0, vague: 6.25,
  scribble: [6.75, 7.05], rewrite: 7.15, stamps: [7.85, 8.05, 8.25], close: 8.45, h1Out: [8.6, 8.8],
  lesson: BEAT(15),                                                       // 8.93
  cut: 12.82,
  h2: 12.88, h2Land: 13.25, wink: [14.1, 14.55], h2Out: [15.3, 15.5], out: [15.1, 15.5],
}
const LESSON = { at: T.lesson, out: [12.6, 12.8], text: 'Specific is | *attractive.*' }
const ST = '♄ SATURN'
const LINES = [
  { t: T.s1, speaker: ST, color: SAT, text: 'there are no wrong answers.' },
  { t: T.s2, speaker: ST, color: SAT, text: 'only *vague* ones.' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })
const QUESTION = 'WHAT DO YOU WANT?'

// the class: Taurus, Gemini (the vague one), Leo
const CLASS = [
  { ...signStar('taurus'), seed: 11, ans: ['COOKS WITH ME', 'ON SUNDAYS'] },
  { ...signStar('gemini'), seed: 17, ans: ['GOOD VIBES?'], fix: ['LAUGHS AT', 'MY PUNS'] },
  { ...signStar('leo'), seed: 23, ans: ['ASKS ABOUT', 'MY DAY'] },
]
const DESK_A = [170, 400, 630], ROW_A = 1185, SIZE_A = 150, ANS_A = 985
const DESK_F = [205, 540, 875], ROW_F = 1190, SIZE_F = 210, ANS_F = 950
const BOARD = { x: 90, y: 470, w: 900, h: 380 }
const SAT_A = { x: 895, y: 1135, r: 72 }, SAT_F = { x: 540, y: 720, r: 70 }
const GHOST = { at: 3.45, x: 812, y: 870 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

async function build(stage) {
  try {
    await Promise.all(["800 96px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Saturn’s class: | the *final exam.*', { top: 196, size: 92, accentSize: 140, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.14, wobble: true, gap: 0.1, accentColor: SAT })
  const H1 = popText(root, 'Show your *work.*', { top: 250, size: 104, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.09, accentColor: RED })
  const H2 = popText(root, 'Know what | you *want.*', { top: 196, size: 120, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: GOLD, lineHeight: 0.98 })
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
    const dimL = 1 - 0.85 * ease.inOutQuad(prog(t, T.lesson, T.lesson + 0.4))
    x.save(); x.globalAlpha *= dimL; x.translate(bx + w / 2, by + h / 2); x.scale(k, k); x.translate(-w / 2, -h / 2)
    // frame (wood, pixel steps) + slate
    x.fillStyle = 'rgba(10,6,24,0.9)'; x.fillRect(-10, -10, w + 20, h + 36)
    x.fillStyle = '#8a5a2a'; x.fillRect(-4, -4, w + 8, h + 8)
    x.fillStyle = '#b07a3a'; x.fillRect(-4, -4, w + 8, 6); x.fillRect(-4, -4, 6, h + 8)
    const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1f3a33'); g.addColorStop(1, '#16302a')
    x.fillStyle = g; x.fillRect(12, 12, w - 24, h - 24)
    // old smudges
    x.fillStyle = 'rgba(244,241,230,0.05)'; for (const [sx, sy, sw] of [[80, 60, 220], [560, 250, 260], [300, 300, 160]]) x.fillRect(sx, sy, sw, 26)
    // chalk tray
    x.fillStyle = '#6e4620'; x.fillRect(-4, h + 4, w + 8, 16); x.fillStyle = '#b07a3a'; x.fillRect(-4, h + 4, w + 8, 4)
    x.fillStyle = CHALK; x.fillRect(120, h - 2, 46, 8); x.fillStyle = PINK; x.fillRect(190, h - 2, 34, 8)
    // the header + the question, chalked on letter by letter
    x.textAlign = 'left'; x.textBaseline = 'middle'
    x.font = `700 26px ${MONO}`; x.fillStyle = rgba(CHALK, 0.7); x.letterSpacing = '0.16em'
    x.fillText('SATURN RETURN 101', 44, 54)
    if (t >= T.header) { x.textAlign = 'right'; x.fillStyle = rgba(SAT, 0.95); x.fillText('FINAL EXAM', w - 40, 54) }
    x.letterSpacing = '0px'
    x.fillStyle = rgba(CHALK, 0.25); x.fillRect(44, 84, w - 88, 3)
    const n = Math.floor(clamp((t - T.q[0]) / (T.q[1] - T.q[0])) * QUESTION.length + 0.0001)
    x.textAlign = 'center'; x.font = `700 70px ${MONO}`
    x.fillStyle = CHALK; x.shadowColor = 'rgba(244,241,230,0.35)'; x.shadowBlur = 8
    if (n > 0) {
      const full = x.measureText(QUESTION).width, part = QUESTION.slice(0, n)
      x.textAlign = 'left'; x.fillText(part, w / 2 - full / 2, h / 2 + 30)
    }
    x.shadowBlur = 0
    // Saturn's underline under WANT once the question is done
    const ul = prog(t, T.q[1] + 0.2, T.q[1] + 0.6)
    if (ul > 0) { x.fillStyle = rgba(SAT, 0.9); x.fillRect(w / 2 + 36, h / 2 + 76, 240 * ul, 7) }
    x.restore()
  }

  // ── Saturn (stsaturn's sprite: banded disc, tilted ring, round glasses), with its pointer
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
    if (t < T.q[1]) return { eyes: 'stern', look: [-1, -1] }
    if (t < T.answers[0]) return { eyes: 'stern', look: [-1, 0] }
    if (t < T.s2) return { eyes: 'open', look: [-1, -1] }
    if (t < T.stamps[0]) return { eyes: 'stern', look: [-1, -1] }
    if (t < T.cut) return { eyes: 'happy' }
    if (t >= T.wink[0] && t < T.wink[1]) return { eyes: 'wink' }
    return { eyes: 'happy' }
  }
  // where the pointer points (its tip)
  function pointerTip(t) {
    const B = { x: 600, y: 680 }, G = { x: DESK_A[1] + 60, y: ANS_A - 20 }, rest = { x: SAT_A.x - 170, y: SAT_A.y - 160 }
    if (t < T.q[1]) return rest
    if (t < T.answers[0]) return { x: lerp(rest.x, B.x, ease.inOutCubic(prog(t, T.q[1], T.q[1] + 0.35))), y: lerp(rest.y, B.y, ease.inOutCubic(prog(t, T.q[1], T.q[1] + 0.35))) }
    if (t < T.point[0]) { const e = ease.inOutCubic(prog(t, T.answers[0], T.answers[0] + 0.4)); return { x: lerp(B.x, rest.x, e), y: lerp(B.y, rest.y, e) } }
    if (t < T.scribble[0]) { const e = ease.inOutCubic(prog(t, ...T.point)); return { x: lerp(rest.x, G.x, e), y: lerp(rest.y, G.y, e) } }
    const e = ease.inOutCubic(prog(t, T.scribble[0], T.scribble[0] + 0.35)); return { x: lerp(G.x, rest.x, e), y: lerp(G.y, rest.y, e) }
  }
  function drawSaturn(t) {
    const P = satPos(t), ok = popOut(t, T.out), k = P.k * ok
    if (k <= 0.01) return
    const c = Math.max(2, Math.round(P.r * k / RC)), R = RC
    const cx = Math.round(P.x), cy = Math.round(P.y + Math.sin(t * 1.9) * 5)
    glow(cx, cy, P.r * 3, SAT, 0.65 * k)
    // the pointer (story only), behind the planet
    if (t < T.cut && t > T.satIn[1] - 0.2) {
      let tip = pointerTip(t)
      let tap = 0
      for (const t0 of [T.q[1] + 0.4, T.point[1], T.circle]) { const u = t - t0; if (u > 0 && u < 0.5) tap = Math.max(tap, Math.abs(Math.sin(u / 0.5 * Math.PI * 2)) * (1 - u / 0.5)) }
      const bx = cx - P.r * 0.5, by = cy + P.r * 0.55
      tip = { x: tip.x + tap * 10, y: tip.y + tap * 14 }
      x.save(); x.globalAlpha = clamp(prog(t, T.satIn[1] - 0.2, T.satIn[1] + 0.1)) * ok; x.lineCap = 'round'
      x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(bx, by); x.lineTo(tip.x, tip.y); x.stroke()
      x.strokeStyle = '#8a5a2a'; x.lineWidth = 8; x.beginPath(); x.moveTo(bx, by); x.lineTo(tip.x, tip.y); x.stroke()
      x.fillStyle = BONE; x.beginPath(); x.arc(tip.x, tip.y, 8, 0, Math.PI * 2); x.fill()
      x.restore()
    }
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
    const g = t - T.glint
    if (g > 0 && g < 0.5) drawPixelStar(x, cx - 2 * c, cy - 3 * c, 40 * Math.sin(Math.PI * g / 0.5) + 8, 2, '#ffffff')
    drawRing(false)
    x.restore()
  }

  // ── the class
  function deskPos(t, i) {
    if (t < T.cut) return { x: DESK_A[i], y: ROW_A, s: SIZE_A, ay: ANS_A, desk: true }
    return { x: DESK_F[i], y: ROW_F, s: SIZE_F, ay: ANS_F, desk: false }
  }
  function starState(t, i) {
    const a = T.answers[i]
    if (t >= T.cut) return { mood: i === 1 ? 'heart' : t > T.wink[0] && i === 2 ? 'sparkle' : 'happy' }
    if (t < T.q[1]) return { mood: 'wide', look: [0, -1], blink: false }
    if (t < a) return { mood: 'neutral', look: [0, -1] }
    if (t < a + T.write) return { mood: 'squint', look: [0, -1] }                   // writing hard
    if (i === 1) {
      if (t < T.circle) return { mood: 'happy' }                                    // smug: "good vibes?"
      if (t < T.scribble[0]) return { mood: 'wide', look: [0, -1], blink: false }
      if (t < T.stamps[1]) return { mood: 'squint', look: [0, -1] }
      return { mood: 'sparkle', look: [0, 0] }
    }
    if (t < T.stamps[0]) return { mood: 'neutral', look: [1, 0] }
    return { mood: 'happy' }
  }
  const HOPS = [[T.stamps[0] + 0.05, 13.6, 14.6], [T.stamps[1] + 0.05, 13.75, 14.75], [T.stamps[2] + 0.05, 13.9, 14.9]]
  function drawClass(t) {
    const ok = popOut(t, T.out)
    CLASS.forEach((S, i) => {
      let pk = pop01(t, T.starsIn[i], 0.36, 2.1)
      if (t >= T.cut) pk = pop01(t, T.cut + 0.08 + i * 0.07, 0.34, 2)
      pk *= ok
      if (pk <= 0.02) return
      const P = deskPos(t, i)
      const st = starState(t, i)
      const sq = t < T.cut && t > T.answers[i] && t < T.answers[i] + T.write ? 0.03 * Math.sin(t * 40) : 0
      drawStarChar(x, P.x, P.y, P.s * pk, t, { color: S.color, glyph: P.s >= 150 ? S.glyph : null, ...st, squash: sq, hops: HOPS[i], seed: S.seed, bob: P.desk ? 3 : 6 })
      if (P.desk) {
        // a tiny desk in front: top + legs
        const dw = 150, dy = P.y + 38
        x.save(); x.globalAlpha = clamp(pk)
        x.fillStyle = 'rgba(10,6,24,0.9)'; x.fillRect(P.x - dw / 2 - 6, dy - 6, dw + 12, 30)
        x.fillStyle = '#9a6a34'; x.fillRect(P.x - dw / 2, dy, dw, 18); x.fillStyle = '#c48a48'; x.fillRect(P.x - dw / 2, dy, dw, 5)
        x.fillStyle = '#6e4620'; x.fillRect(P.x - dw / 2 + 12, dy + 18, 12, 70); x.fillRect(P.x + dw / 2 - 24, dy + 18, 12, 70)
        x.restore()
      }
      drawAnswer(t, i, P, pk)
    })
  }
  // an answer board held over the head: white card, ink frame, marker text written on
  function drawAnswer(t, i, P, pk) {
    const a = T.answers[i]
    const k = (t >= T.cut ? pop01(t, T.cut + 0.2 + i * 0.07, 0.3, 2.2) : pop01(t, a, 0.3, 2.2)) * clamp(pk)
    if (k <= 0.01) return
    const S = CLASS[i], big = t >= T.cut
    const w = big ? 300 : 214, h = big ? 136 : 112
    const hop = 0  // the board rides on the star's head
    const cx = P.x, cy = P.ay + hop + Math.sin(t * 2.2 + S.seed) * 3
    const rot = (i - 1) * 0.04 + Math.sin(t * 1.7 + i) * 0.015
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    // handle down to the star
    x.fillStyle = INK; x.fillRect(-7, h / 2 - 4, 14, 44); x.fillStyle = '#c48a48'; x.fillRect(-4, h / 2, 8, 40)
    x.fillStyle = 'rgba(10,6,24,0.92)'; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
    x.fillStyle = '#fbf6ea'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#e4dccb'; x.fillRect(-w / 2, h / 2 - 8, w, 8)
    // the text: written on during the write window; Gemini's vague answer, then the fix
    const fs = big ? 32 : 25
    x.font = `700 ${fs}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const fixed = i === 1 && t >= T.rewrite
    const lines = fixed ? S.fix : S.ans
    const t0 = fixed ? T.rewrite : a + 0.12, dur = fixed ? 0.5 : T.write - 0.15
    const total = lines.join('').length
    let shown = big ? total : Math.floor(clamp((t - t0) / dur) * total + 0.0001)
    x.fillStyle = INK
    const lh = fs * 1.25, y0 = -(lines.length - 1) * lh / 2 - 3
    lines.forEach((ln, j) => {
      const part = ln.slice(0, Math.max(0, shown)); shown -= ln.length
      if (!part) return
      const fullW = x.measureText(ln).width
      x.textAlign = 'left'; x.fillText(part, -fullW / 2, y0 + j * lh)
    })
    // Gemini's vague answer: the red chalk circle + VAGUE, then the scribble
    if (i === 1 && !big && t >= T.circle && t < T.rewrite) {
      const cp = prog(t, T.circle, T.circle + 0.3)
      x.strokeStyle = RED; x.lineWidth = 6; x.lineCap = 'round'
      x.beginPath(); x.ellipse(0, -3, w * 0.48, h * 0.36, -0.05, -Math.PI * 0.9, -Math.PI * 0.9 + Math.PI * 2.1 * cp); x.stroke()
      if (t >= T.scribble[0]) {
        const sp = prog(t, ...T.scribble)
        x.strokeStyle = INK; x.lineWidth = 7; x.beginPath()
        const n = 9
        for (let q = 0; q <= n * sp; q++) { const px = -w * 0.42 + (q / n) * w * 0.84, py = (q % 2 ? -1 : 1) * h * 0.22; q ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.stroke()
      }
    }
    // A+ stamps
    const st = t >= T.cut ? T.cut - 1 : T.stamps[i]
    if (t >= st) {
      const p = prog(t, st, st + 0.2), s = lerp(2.2, 1, ease.outCubic(p))
      x.save(); x.translate(w / 2 - 14, -h / 2 - 16); x.rotate(-0.22); x.scale(s, s); x.globalAlpha *= clamp(p * 3)
      x.fillStyle = 'rgba(255,90,90,0.18)'; x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); x.fill()
      x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); x.stroke()
      x.fillStyle = RED; x.font = `800 27px Inter, sans-serif`; x.textAlign = 'center'; x.fillText('A+', 0, 2)
      x.restore()
    }
    x.restore()
    // VAGUE tag pops over the circled board
    if (i === 1 && !big && t >= T.vague && t < T.scribble[1]) {
      const vk = pop01(t, T.vague, 0.28, 2.6) * (1 - prog(t, T.scribble[1] - 0.15, T.scribble[1]))
      x.save(); x.translate(cx + 96, cy - 74); x.rotate(0.14); x.scale(vk, vk)
      x.font = `700 30px ${MONO}`; x.letterSpacing = '0.12em'
      const tw = x.measureText('VAGUE').width + 30
      x.fillStyle = 'rgba(10,6,24,0.92)'; x.fillRect(-tw / 2 - 6, -28, tw + 12, 56)
      x.fillStyle = RED; x.fillRect(-tw / 2, -22, tw, 44)
      x.fillStyle = '#fff4f0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('VAGUE', 4, 2)
      x.letterSpacing = '0px'; x.restore()
    }
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
        drawBoard(t)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'above' })
        const dimL = t < T.cut ? 1 - 0.7 * ease.inOutQuad(prog(t, T.lesson, T.lesson + 0.4)) : 1
        x.save(); x.globalAlpha = dimL
        drawSaturn(t)
        drawClass(t)
        x.restore()
        T.stamps.forEach((s, i) => sparkles(t, DESK_A[i], ANS_A, s + 0.1, 8, 120, i))
        sparkles(t, DESK_A[1], ANS_A, T.rewrite + 0.5, 10, 150, 3)
        if (t >= T.cut) sparkles(t, 540, ANS_F, T.h2Land, 14, 380, 5)
      }
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.05 (inert: H0 → H1 mid-exam) and 12.82 (the lesson clears → "Know what you want", plays).
const CUTS = [5.05, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const chalk = (t0, t1, n, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + (t1 - t0) * i / n).toFixed(3), gain])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pop', T.h0Land + 0.14, 1174.66, 0.05, 0],
  ['whoosh', T.boardIn[0], 0.35, 0.03], ['tick', T.boardIn[1], 0.05],
  ...T.starsIn.map((s, i) => ['pop', s + 0.05, NOTE[i + 1], 0.03, -0.3 + i * 0.2]),
  ...chalk(T.q[0], T.q[1], 14),
  ['riser', T.satIn[0] - 0.2, T.satIn[1], 0.035], ['boom', T.satIn[1], 0.2], ['tick', T.satIn[1] + 0.1, 0.04],
  ['bell', T.glint, 2093, 0.03, 1.2, 0.2],
  ['pop', T.open, 523.25, 0.04, 0], ['pop', T.open + 0.06, 659.25, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ST]: 440 } }),
  ...T.answers.flatMap((a, i) => [['pop', a + 0.02, NOTE[i + 2], 0.03, -0.3 + i * 0.3], ...chalk(a + 0.12, a + T.write - 0.05, 5, 0.02)]),
  ...wordPops(T.h1, 2, 0.09, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['tick', T.point[1], 0.05], ['tick', T.point[1] + 0.12, 0.04],
  ['whoosh', T.circle, 0.25, 0.025], ['pop', T.vague, 392, 0.05, 0], ['pop', T.vague + 0.1, 330, 0.045, 0],
  ...chalk(T.scribble[0], T.scribble[1], 6, 0.035), ...chalk(T.rewrite, T.rewrite + 0.5, 5, 0.02), ['glitter', T.rewrite + 0.5, T.rewrite + 0.9],
  ...T.stamps.flatMap((s, i) => [['boom', s + 0.12, 0.1], ['tick', s + 0.12, 0.06], ['pop', s + 0.15, NOTE[3 + i], 0.035, -0.3 + i * 0.3]]),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Dm' }),
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
