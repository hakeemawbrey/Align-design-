// st4saturn2 (20 s vertical Align ad, Star Talk season 4, EP 027, thread D2: Saturn's class) · story 0–15.6, then the end card.
//   0.00–5.50  "Saturn's class: | how to *apologize.*"  Saturn (stsaturn: ringed, round glasses, a pointer) at a chalkboard
//              headed SATURN RETURN 101. Two students at tiny desks: ♈ Aries and ♎ Libra. Saturn grades apologies in
//              chalk: "sorry you feel that way" gets a big red ✕ on the drop (2.82); "sorry, but…" gets its "but" circled.
//              Aries sweats (it says that one a lot). Box (♄ SATURN): "a real sorry has no *but.*"
//              (The ghost hangs upside down under the chalk tray, 3.95–5.3.)
//   5.50–8.80  "Own it. | *Fix it.*"  The board wipes. Box: "say what you did. say what you'll *change.*" Chalk writes a
//              real one: "i was late. i'm sorry." / "next time i'll text." and Saturn ticks it with a gold ✓.
//   8.93       ★ LESSON UNLOCKED (shared lesson.js): "Sorry has | no *'but'.*"  +1 ACCOUNTABILITY.
//  13.00 cut → "Drop the *but.*"  The board reads "sorry, but…" one last time; the "but…" falls off the board and clonks
//              on the floor, leaving "sorry." Saturn winks; Aries and Libra hop. Everything pops out by 15.5; end card 15.6.
// One canvas (sky + constellation + board + cast), DOM type + the dialogue box + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 27
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', RED = '#ff5a5a', INK = '#1b1236', CHALK = '#f1eee4'
const SAT = '#e8c27a'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const ARI = signStar('aries'), LIB = signStar('libra')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.75, h0Out: [5.3, 5.5],
  board: 0.25, satIn: [0.45, 1.25], kids: 0.6,
  w1: [0.95, 1.85], x1: BEAT(4),                 // 2.82: the red ✕
  w2: [2.15, 2.65], circ: [3.0, 3.35], sweat: 3.1,
  open: 3.32, s1: 3.5, ghost: 3.95,
  h1: 5.55, h1Land: 5.9, wipe: [5.45, 5.85], s2: 5.6,
  w3: [6.0, 6.75], w4: [6.85, 7.6], check: 7.8,
  close: 8.8, h1Out: [8.62, 8.8],
  lesson: BEAT(15), lessonOut: [12.75, 12.95],   // 8.93
  cut: 13.0, h2: 13.06, h2Land: 13.4, fall: [13.55, 14.15], clonk: 14.15, wink: [14.3, 14.9], h2Out: [15.15, 15.4], out: [15.05, 15.45],
}
const ST = '♄ SATURN'
const LINES = [
  { t: T.s1, speaker: ST, color: RED, text: 'a real sorry has no *but.*' },
  { t: T.s2, speaker: ST, color: GOLD, text: "say what you did. say what you'll *change.*" },
]
const CPS = 28
const LESSON = { at: T.lesson, out: T.lessonOut, text: "Sorry has | no *'but'.*", chip: '+1 ACCOUNTABILITY' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── layout
const BOARD = { x0: 80, y0: 560, x1: 1000, y1: 950 }
const SAT_P = { x: 830, y: 1170, r: 96 }
const ARI_P = { x: 190, y: 1215, s: 210 }, LIB_P = { x: 430, y: 1215, s: 210 }
const DESK_Y = 1262
const ROW = [690, 790, 880]                    // chalk rows (baselines-ish, middle)
const GHOST = { at: T.ghost, x: 640, y: BOARD.y1 + 22, from: 'above', where: 'hanging upside down under the chalkboard tray, between Libra and Saturn' }

function satMood(t) {
  if (t < T.x1 + 0.5) return { eyes: 'stern', look: [-1, -1] }
  if (t < T.s2) return { eyes: 'stern', look: [-1, 0] }
  if (t < T.check) return { eyes: 'open', look: [-1, -1] }
  if (t < T.cut) return { eyes: 'happy', look: [0, 0] }
  if (t < T.clonk) return { eyes: 'open', look: [-1, -1] }
  if (t >= T.wink[0] && t < T.wink[1]) return { eyes: 'wink', look: [0, 0] }
  return { eyes: 'happy', look: [0, 0] }
}
function ariState(t) {
  if (t < T.x1) return { mood: 'neutral', look: [1, -1] }
  if (t < T.sweat) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.s2) return { mood: 'squint', look: [1, -1] }                       // …that's me. i say that.
  if (t < T.check) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.cut) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.clonk) return { mood: 'wide', look: [1, -1], blink: false }
  return { mood: 'happy' }
}
function libState(t) {
  if (t < T.x1) return { mood: 'neutral', look: [1, -1] }
  if (t < T.s2) return { mood: 'eyeroll' }                                       // libra has heard "sorry, but" before
  if (t < T.check) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.cut) return { mood: 'happy' }
  if (t < T.clonk) return { mood: 'wide', look: [1, -1], blink: false }
  return { mood: 'heart' }
}
const ARI_HOPS = [T.kids + 0.3, T.x1 + 0.05, T.check + 0.1, T.clonk + 0.05, T.clonk + 0.6]
const LIB_HOPS = [T.kids + 0.45, T.check + 0.2, T.clonk + 0.15, T.clonk + 0.75]

// chalk lines: [text, row, write window]
const CH1 = ['sorry you feel that way', 0, T.w1, 1]
const CH2 = ['sorry, but…', 1, T.w2, 1]
const CH3 = ["i was late. i'm sorry.", 0, T.w3]
const CH4 = ["next time i'll text.", 1, T.w4]
const CHALK_PX = 44, CHAR_W = 26.4                // Space Mono advance ≈ 0.6 em
const lineX = s => (BOARD.x0 + BOARD.x1) / 2 - s.length * CHAR_W / 2
const lx = ch => ch[3] ? BOARD.x0 + 70 : lineX(ch[0])        // the graded ones sit left, the ✕ goes on the right

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 44px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, "Saturn's class: | how to *apologize.*", { top: 196, size: 96, accentSize: 140, at: T.h0, gap: 0.08, late: 1, lateAt: T.h0Land, wobble: true, accentColor: SAT, lineHeight: 1.06 })
  const H1 = popText(root, 'Own it. | *Fix it.*', { top: 196, size: 128, accentSize: 170, at: T.h1, gap: 0.1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H2 = popText(root, 'Drop the | *but.*', { top: 196, size: 150, accentSize: 230, at: T.h2, gap: 0.12, late: 1, lateAt: T.h2Land, wobble: true, accentColor: RED, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.75 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, SAT, PINK]) {
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

  // ── the chalkboard
  function chalkLine(t, ch, { erase = 0, skip = null } = {}) {
    const [s, row, [a, b]] = ch
    if (t < a) return
    const n = Math.floor(s.length * clamp(prog(t, a, b)) + 0.001)
    const x0 = lx(ch), y = ROW[row]
    x.save()
    x.font = `700 ${CHALK_PX}px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.globalAlpha = 1 - erase; x.fillStyle = CHALK; x.shadowColor = 'rgba(241,238,228,0.45)'; x.shadowBlur = 6
    for (let i = 0; i < n; i++) if (!(skip && i >= skip[0] && i < skip[1])) x.fillText(s[i], x0 + i * CHAR_W, y + Math.sin(i * 1.7) * 1.5)
    x.restore()
  }
  function chalkCursor(t, ch) {
    const [s, row, [a, b]] = ch
    // the floating chalk stick while a line is written
    if (t < a - 0.1 || t > b + 0.15) return
    const p = clamp(prog(t, a, b)), cx = lx(ch) + s.length * CHAR_W * p, cy = ROW[row] + 26 + Math.sin(t * 40) * 3
    x.save(); x.translate(cx + 12, cy); x.rotate(-0.6)
    x.fillStyle = INK; x.fillRect(-6, -24, 16, 48); x.fillStyle = CHALK; x.fillRect(-3, -21, 10, 42); x.fillStyle = '#d8d2c2'; x.fillRect(-3, 12, 10, 9)
    x.restore()
  }
  function drawBoard(t, ok) {
    const k = easeOutBack(prog(t, T.board, T.board + 0.45), 1.6) * ok
    if (k <= 0.01) return
    const { x0, y0, x1, y1 } = BOARD, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2
    x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
    // wood frame, green slate
    x.fillStyle = INK; x.fillRect(x0 - 26, y0 - 26, x1 - x0 + 52, y1 - y0 + 52)
    x.fillStyle = '#8a5a34'; x.fillRect(x0 - 20, y0 - 20, x1 - x0 + 40, y1 - y0 + 40)
    x.fillStyle = '#b07a4a'; x.fillRect(x0 - 20, y0 - 20, x1 - x0 + 40, 8)
    x.fillStyle = INK; x.fillRect(x0 - 2, y0 - 2, x1 - x0 + 4, y1 - y0 + 4)
    x.fillStyle = '#21473a'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    // smudges
    x.fillStyle = 'rgba(241,238,228,0.05)'
    for (let i = 0; i < 9; i++) x.fillRect(x0 + 40 + ((i * 173) % (x1 - x0 - 200)), y0 + 30 + ((i * 97) % (y1 - y0 - 80)), 120 + (i % 3) * 40, 14)
    // chalk tray + chalk
    x.fillStyle = INK; x.fillRect(x0 - 30, y1 + 14, x1 - x0 + 60, 22)
    x.fillStyle = '#6e4626'; x.fillRect(x0 - 26, y1 + 16, x1 - x0 + 52, 16)
    x.fillStyle = CHALK; x.fillRect(x0 + 120, y1 + 8, 40, 9); x.fillStyle = PINK; x.fillRect(x0 + 180, y1 + 8, 30, 9)
    // header
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(241,238,228,0.75)'
    x.fillText('SATURN RETURN 101', cx, y0 + 40)
    x.fillStyle = 'rgba(241,238,228,0.35)'; x.fillRect(cx - 170, y0 + 62, 340, 3)

    const wipe = prog(t, ...T.wipe)
    if (t < T.cut) {
      // part 1: the two bad ones (erased by the wipe)
      if (wipe < 1) {
        x.save(); x.beginPath(); x.rect(x0 + (x1 - x0) * wipe, y0 + 70, (x1 - x0) * (1 - wipe), y1 - y0 - 70); x.clip()
        chalkLine(t, CH1); chalkLine(t, CH2)
        // the big red ✕ over line 1
        const xk = easeOutBack(prog(t, T.x1, T.x1 + 0.25), 3)
        if (xk > 0) {
          const xc = BOARD.x1 - 150, yc = (ROW[0] + ROW[1]) / 2 - 40, w = 110
          x.save(); x.translate(xc, yc); x.scale(xk, xk); x.rotate(-0.04)
          x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 26
          x.beginPath(); x.moveTo(-w * 0.55, -55); x.lineTo(w * 0.55, 55); x.moveTo(w * 0.55, -55); x.lineTo(-w * 0.55, 55); x.stroke()
          x.strokeStyle = RED; x.lineWidth = 16; x.stroke()
          x.restore()
        }
        // a red strike through line 1
        if (xk > 0) { x.save(); x.globalAlpha = 0.85; x.fillStyle = RED; x.fillRect(lx(CH1) - 6, ROW[0] + 2, (CH1[0].length * CHAR_W + 12) * clamp(xk), 4); x.restore() }
        // the "but" circled in red
        const cp = prog(t, ...T.circ)
        if (cp > 0) {
          const bx = lx(CH2) + 7 * CHAR_W + 1.5 * CHAR_W, by = ROW[1]
          x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'
          x.beginPath(); x.ellipse(bx, by, 72, 40, -0.08, -2.4, -2.4 + Math.PI * 2.15 * ease.outCubic(cp)); x.stroke()
          if (t > T.circ[1]) { const pr = 1 + 0.06 * Math.sin((t - T.circ[1]) * 9); x.globalAlpha = 0.35; x.lineWidth = 4; x.beginPath(); x.ellipse(bx, by, 80 * pr, 47 * pr, -0.08, 0, Math.PI * 2); x.stroke() }
          x.restore()
        }
        x.restore()
      }
      // the wiping eraser
      if (wipe > 0 && wipe < 1) {
        const ex = x0 + (x1 - x0) * wipe, ey = (ROW[0] + ROW[1]) / 2 + Math.sin(t * 30) * 50
        x.fillStyle = INK; x.fillRect(ex - 34, ey - 54, 68, 108); x.fillStyle = '#7a5a3a'; x.fillRect(ex - 28, ey - 48, 56, 60); x.fillStyle = '#c9c3b4'; x.fillRect(ex - 28, ey + 12, 56, 36)
        x.fillStyle = 'rgba(241,238,228,0.18)'; x.fillRect(x0, y0 + 70, ex - x0 - 34, y1 - y0 - 90)
      }
      // part 2: the real one + a gold check
      chalkLine(t, CH3); chalkLine(t, CH4)
      const ck = easeOutBack(prog(t, T.check, T.check + 0.3), 3)
      if (ck > 0) {
        x.save(); x.translate(cx, ROW[2]); x.scale(ck, ck); x.lineCap = 'round'; x.lineJoin = 'round'
        x.strokeStyle = INK; x.lineWidth = 24; x.beginPath(); x.moveTo(-50, -4); x.lineTo(-14, 30); x.lineTo(56, -42); x.stroke()
        x.strokeStyle = GOLD; x.lineWidth = 14; x.stroke(); x.restore()
      }
      chalkCursor(t, CH1); chalkCursor(t, CH2); chalkCursor(t, CH3); chalkCursor(t, CH4)
    } else {
      // the last beat: "sorry, but…" and the "but…" falls off
      const x0l = lx(CH2)
      chalkLine(T.w2[1] + 1, CH2, { skip: [5, 11] })
      if (t > T.fall[0] + 0.25) { x.font = `700 ${CHALK_PX}px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = CHALK; x.fillText('.', x0l + 5 * CHAR_W, ROW[1]) }
    }
    x.restore()
  }
  function drawFallingBut(t) {
    if (t < T.cut) return
    const bx0 = lx(CH2) + 7 * CHAR_W, by0 = ROW[1]
    const p = prog(t, ...T.fall)
    const floor = 1330
    let bx = bx0, by = by0, rot = 0
    if (p > 0) {
      const tt = t - T.fall[0]
      const wob = t < T.fall[0] + 0.2 ? Math.sin(tt * 60) * 4 : 0
      by = Math.min(floor, by0 + 0.5 * 2600 * Math.max(0, tt - 0.15) ** 2); bx = bx0 - 40 * p + wob; rot = -0.5 * ease.outCubic(p)
      if (t > T.clonk) { const u = t - T.clonk; by = floor - Math.max(0, 140 * u - 0.5 * 1600 * u * u); rot = -0.5 - 0.15 * Math.sin(u * 12) * Math.exp(-u * 4); bx = bx0 - 40 - u * 30 }
    }
    x.save(); x.translate(bx + 2 * CHAR_W, by); x.rotate(rot)
    x.font = `700 ${CHALK_PX}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillRect(-82, -34, 164, 68)
    x.fillStyle = '#21473a'; x.fillRect(-76, -28, 152, 56)
    x.fillStyle = CHALK; x.fillText('but…', 0, 1)
    x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 0, 70, 30, 0, 0, Math.PI * 2); x.stroke()
    x.restore()
    // dust puff on the clonk
    const u = t - T.clonk
    if (u > 0 && u < 0.5) {
      x.save(); x.globalAlpha = 1 - u / 0.5; x.fillStyle = CHALK
      for (let k = 0; k < 8; k++) { const a = Math.PI + (k / 7) * Math.PI, R = 30 + u * 260; x.fillRect(Math.round(bx + 2 * CHAR_W + Math.cos(a) * R * 1.4), Math.round(floor + 20 + Math.sin(a) * R * 0.5), 10, 10) }
      x.restore()
    }
  }

  // ── Saturn: a pixel planet (banded disc + tilted ring), eyes behind round glasses, a pointer (from stsaturn)
  const RC = 11
  const BANDS = ['#f6dca0', '#e8c27a', '#d9a85e', '#f0cf8c', '#c98f4a', '#e8c27a', '#f6dca0']
  function satPos(t) {
    const p = prog(t, ...T.satIn), e = ease.outCubic(p)
    return { x: lerp(1350, SAT_P.x, e), y: SAT_P.y - Math.abs(Math.sin(p * Math.PI * 2)) * 50 * (1 - p), r: SAT_P.r, roll: (1 - e) * -2.2, k: t >= T.satIn[0] ? 1 : 0 }
  }
  function pointerTarget(t) {
    if (t < T.x1 - 0.3) return [lx(CH1) + 400, ROW[0] + 30]
    if (t < T.circ[1]) return [lx(CH2) + 9 * CHAR_W, ROW[1] + 40]
    if (t < T.cut) return [BOARD.x0 + 640, ROW[1] + 40]
    return [lx(CH2) + 9 * CHAR_W, ROW[1] + 40]
  }
  function drawSaturn(t, ok) {
    const P = satPos(t), k = P.k * ok
    if (k <= 0.01) return
    const c = Math.max(2, Math.round(P.r * k / RC)), R = RC
    const nodK = t > T.check && t < T.check + 0.9 ? Math.max(0, Math.sin((t - T.check) / 0.45 * Math.PI)) : 0
    const cx = Math.round(P.x), cy = Math.round(P.y + Math.sin(t * 1.9) * 6 + nodK * 12)
    glow(cx, cy, P.r * 3, SAT, 0.7 * k)
    // the pointer, behind the planet: from Saturn's left side to the chalk being graded, tapping
    if (t > T.satIn[1] - 0.2) {
      let tap = 0
      for (const t0 of [T.x1 - 0.1, T.circ[0], T.check - 0.1, T.fall[0] - 0.1]) { const u = t - t0; if (u > 0 && u < 0.5) tap = Math.max(tap, Math.abs(Math.sin(u / 0.5 * Math.PI * 2)) * (1 - u / 0.5)) }
      const [tx0, ty0] = pointerTarget(t)
      const bx = cx - P.r * 0.7, by = cy + P.r * 0.2
      const L = Math.hypot(tx0 - bx, ty0 - by), ux = (tx0 - bx) / L, uy = (ty0 - by) / L
      const reach = Math.min(L - 10, 430) - tap * 26
      const tx = bx + ux * reach, ty = by + uy * reach
      x.save(); x.globalAlpha = clamp(prog(t, T.satIn[1] - 0.2, T.satIn[1] + 0.1)) * ok; x.lineCap = 'round'
      x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
      x.strokeStyle = '#8a5a2a'; x.lineWidth = 8; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
      x.fillStyle = BONE; x.beginPath(); x.arc(tx, ty, 8, 0, Math.PI * 2); x.fill()
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
    const M = satMood(t), [lx, ly] = M.look
    const blinkT = (t + 0.7) % 3.7 < 0.13
    for (const s of [-1, 1]) {
      const ex = cx + s * 4 * c, ey = cy - 1 * c
      x.strokeStyle = INK; x.lineWidth = Math.max(2, c * 0.7)
      x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3.3 * c, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(190,230,255,0.25)'; x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3 * c, 0, Math.PI * 2); x.fill()
      x.fillStyle = INK
      const e = M.eyes === 'wink' && s > 0 ? 'happy' : M.eyes
      if (blinkT && e !== 'happy') x.fillRect(ex - c, ey + c, 3 * c, c)
      else if (e === 'happy') { x.fillRect(ex - c, ey + c, c, c); x.fillRect(ex, ey, c, c); x.fillRect(ex + c, ey + c, c, c) }
      else if (e === 'stern') { x.fillRect(ex - c + lx * c, ey, 3 * c, c); x.fillRect(ex + lx * c, ey + c, 2 * c, c); x.fillRect(ex - 2 * c, ey - 2 * c, 4 * c, c * 0.8) }
      else { x.fillRect(ex + lx * c, ey + ly * c - c, 2 * c, 3 * c); x.fillStyle = '#ffffff'; x.fillRect(ex + lx * c, ey + ly * c - c, c * 0.8, c * 0.8) }
    }
    x.fillStyle = INK; x.fillRect(cx - c, cy - c * 0.6, 2 * c, c * 0.7)
    const g = t - T.x1
    if (g > 0 && g < 0.5) drawPixelStar(x, cx - 2 * c, cy - 3 * c, 40 * Math.sin(Math.PI * g / 0.5) + 8, 2, '#ffffff')
    drawRing(false)
    x.restore()
  }

  function drawDesk(cx, k) {
    if (k <= 0.01) return
    const y = DESK_Y + (1 - k) * 300
    x.fillStyle = INK; x.fillRect(cx - 104, y - 6, 208, 34); x.fillRect(cx - 86, y + 22, 22, 96); x.fillRect(cx + 64, y + 22, 22, 96)
    x.fillStyle = '#8a5a34'; x.fillRect(cx - 98, y, 196, 22); x.fillStyle = '#b07a4a'; x.fillRect(cx - 98, y, 196, 6)
    x.fillStyle = '#5e3a20'; x.fillRect(cx - 80, y + 22, 10, 90); x.fillRect(cx + 70, y + 22, 10, 90)
  }
  function drawSweat(t, r) {
    if (t < T.sweat || t > T.s2 + 0.3) return
    const ph = ((t - T.sweat) * 1.4) % 1
    const sx = r.x + r.size * 0.33, sy = r.y - r.size * 0.32 + ph * 60
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = INK; x.fillRect(sx - 9, sy - 15, 18, 30); x.fillStyle = '#9fd8ff'; x.fillRect(sx - 5, sy - 11, 10, 22); x.fillStyle = '#ffffff'; x.fillRect(sx - 4, sy - 9, 4, 6)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      if (ok > 0) {
        drawBoard(t, ok)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, from: GHOST.from, dur: 1.35, cell: 4 })
        drawSaturn(t, ok)
        const kp = pop01(t, T.kids, 0.36, 2.2) * ok
        const kp2 = pop01(t, T.kids + 0.12, 0.36, 2.2) * ok
        if (kp > 0.02) {
          const r = drawStarChar(x, ARI_P.x, ARI_P.y, ARI_P.s, t, { color: ARI.color, glyph: ARI.glyph, ...ariState(t), hops: ARI_HOPS, pop: kp, seed: 3, glow: 0.9 })
          drawSweat(t, r)
          if (t > T.cut) sparkles(t, r.x, r.y, T.clonk + 0.05, 8, 150, 0.5)
        }
        if (kp2 > 0.02) {
          const r = drawStarChar(x, LIB_P.x, LIB_P.y, LIB_P.s, t, { color: LIB.color, glyph: LIB.glyph, ...libState(t), hops: LIB_HOPS, pop: kp2, seed: 8, glow: 0.9 })
          sparkles(t, r.x, r.y, T.check + 0.1, 8, 150, 1.1)
        }
        drawDesk(ARI_P.x, kp); drawDesk(LIB_P.x, kp2)
        drawFallingBut(t)
      }
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.5 (→ "Own it. Fix it."), 13.0 (lesson → "Drop the but."). cardfx picks.
const CUTS = [5.5, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const chalkTicks = ([s, , [a, b]]) => Array.from({ length: Math.ceil(s.length / 2) }, (_, i) => ['tick', +(a + (b - a) * (i * 2) / s.length).toFixed(3), 0.012 + (i % 3) * 0.004])
export const CUES = [
  ...wordPops(T.h0, 4, 0.08, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['tick', T.board + 0.2, 0.04], ['whoosh', T.satIn[0], 0.5, 0.03], ['pop', T.satIn[1], 523.25, 0.04, 0.3],
  ['pop', T.kids + 0.05, 739.99, 0.035, -0.3], ['pop', T.kids + 0.17, 880, 0.035, -0.1],
  ...chalkTicks(CH1), ...chalkTicks(CH2),
  ['boom', T.x1, 0.12], ['pop', T.x1, 440, 0.045, 0], ['tick', T.x1 + 0.03, 0.06],
  ['whoosh', T.circ[0], 0.3, 0.02], ['pop', T.circ[1], 392, 0.035, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.ghost + 0.05, 1318.51, 0.012, 0.2],
  ['whoosh', T.wipe[0], 0.4, 0.025],
  ...wordPops(T.h1, 2, 0.1, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.04, 0],
  ...chalkTicks(CH3), ...chalkTicks(CH4),
  ['pluck', T.check, 1174.66, 0.045, 0.6, 0], ['bell', T.check + 0.05, 1760, 0.022, 0.9, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Em' }),
  ...wordPops(T.h2, 2, 0.12, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.05, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.fall[0] + 0.1, 0.35, 0.03], ['boom', T.clonk, 0.16], ['tick', T.clonk, 0.08], ['tick', T.clonk + 0.2, 0.03],
  ['pop', T.wink[0], 987.77, 0.035, 0.3], ['glitter', T.clonk + 0.1, T.clonk + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
