// st4saturn3 (20 s vertical Align ad, Star Talk season 4, EP 044, thread D3: Saturn's class) · story 0–15.6, then the
// shared end card with "JOIN THE TEXAS BETA".
//   0.00–4.85  "Saturn's class: | *road trip* | edition."  The road-trip van drives toward us; through the windshield, ♄ Saturn
//              (round glasses, pointer) rides shotgun next to ♐ Sagittarius at the wheel. The back seat is full of stars.
//              On the drop (2.82) Saturn's glasses glint. ♄ SATURN: "pop quiz: they're late and didn't text." Sag gulps.
//   4.90–10.75 "Once? | Or *always?*"  A sticky note stamps on the hood: "#1 LATE · NO TEXT". ♄ SATURN: "once is life.
//              every time is a *pattern.*" Two more identical notes stamp beside it (#2, #3) and a gold tag lands under
//              them: "= A PATTERN". Sag's eyes go wide, then it nods. The ghost hangs on the side mirror (9.15–10.45).
//  10.90 cut → ★ LESSON UNLOCKED (lesson.js): "Look for | *patterns.*"  +1 CLARITY. Held to 15.4; the end card at 15.6.
// The lesson is the film's last line (HELLO TEXAS, drop 5: the second L). One canvas, DOM type + the dialogue box + the
// lesson banner, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const EP = 44
export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#ff5a5a'
const SAT = '#e8c27a'
const MONO = "'Space Mono', ui-monospace, monospace"
const KEY = 'Dm'
const BEAT = n => 0.6 + n * 0.5556
const SAG = signStar('sagittarius'), VIR = signStar('virgo'), GEM = signStar('gemini'), TAU = signStar('taurus')

// ── the timeline (drop on 2.82)
const T = {
  h0: 0.15, h0Land: 0.95, h0Out: [4.7, 4.88], approach: [0, 1.6], glint: 2.82,
  open: 2.95, s1: 3.15, gulp: 4.3,
  h1: 4.92, h1Land: 5.35, note1: 5.5, s2: 6.95, notes23: [8.05, 8.45], tag: 8.95, nod: [9.6, 10.4], ghost: 9.15,
  close: 10.6, h1Out: [10.55, 10.75],
  cut: 10.9, lesson: BEAT(19), lessonOut: [15.15, 15.35], out: [15.1, 15.45],
}
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Look for | *patterns.*', chip: '+1 CLARITY', accentColor: GOLD, dim: 0.55, size: 120, accentSize: 190 }
const ST = '♄ SATURN'
const LINES = [
  { t: T.s1, speaker: ST, color: SAT, text: 'pop quiz: they’re late and didn’t text.' },
  { t: T.s2, speaker: ST, color: SAT, text: 'once is life. every time is a *pattern.*' },
]
const CPS = 27
const TAPS = [T.s1 + 0.2, T.note1, T.notes23[0], T.notes23[1], T.tag]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout: the van, head-on
const V = { x0: 60, x1: 1020, top: 540, bot: 1350 }
const WS = { x0: 110, x1: 970, y0: 600, y1: 1070 }        // windshield
const SATP = { x: 330, y: 885, r: 84 }, SAGP = { x: 760, y: 905, s: 270 }
const MIRROR = { x: 0, y: 760, w: 64, h: 100 }

function sagState(t) {
  if (t < T.s1) return { mood: 'happy', look: [-1, 0] }
  if (t < T.gulp) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.note1) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.notes23[0]) return { mood: 'squint', look: [0, 1] }
  if (t < T.nod[0]) return { mood: 'wide', look: [0, 1], blink: false }
  if (t < T.cut) return { mood: 'happy', look: [-1, 0] }
  return { mood: 'sparkle', look: [0, -1] }
}
function satMood(t) {
  if (t < T.s1) return { eyes: 'open', look: [1, 0] }
  if (t < T.s2) return { eyes: 'stern', look: [1, 0] }
  if (t < T.tag + 0.3) return { eyes: 'open', look: [1, 1] }
  if (t < T.cut) return { eyes: 'happy', look: [0, 0] }
  return { eyes: 'happy', look: [0, 0] }
}
const SAG_HOPS = [T.gulp, T.nod[0], T.nod[0] + 0.4, T.lesson + 0.5]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "700 54px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, "Saturn's class: | *road trip* | edition.", { top: 176, size: 88, accentSize: 140, at: T.h0, gap: 0.1, accentColor: SAT, wobble: true, late: 0, fit: true })
  const H1 = popText(root, 'Once? | Or *always?*', { top: 150, size: 116, accentSize: 172, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 260, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function road(t) {
    // the road runs toward us from a vanishing point behind the van: shoulders + dashes streaming down
    x.fillStyle = '#120c2a'; x.beginPath(); x.moveTo(470, 1000); x.lineTo(610, 1000); x.lineTo(1300, 1920); x.lineTo(-220, 1920); x.fill()
    x.fillStyle = 'rgba(239,230,214,0.35)'
    x.beginPath(); x.moveTo(470, 1000); x.lineTo(478, 1000); x.lineTo(-200, 1920); x.lineTo(-220, 1920); x.fill()
    x.beginPath(); x.moveTo(602, 1000); x.lineTo(610, 1000); x.lineTo(1300, 1920); x.lineTo(1280, 1920); x.fill()
    x.fillStyle = 'rgba(255,209,102,0.85)'
    for (let k = 0; k < 6; k++) {
      const p = ((t * 0.9 + k / 6) % 1), q = p * p
      const y = lerp(1000, 1960, q), h = lerp(6, 120, q), w = lerp(4, 26, q)
      x.fillRect(Math.round(540 - w / 2), Math.round(y), Math.round(w), Math.round(h))
    }
    // flat land either side
    x.fillStyle = '#1a1440'; x.fillRect(0, 990, W, 12)
  }
  function vanFace(t, sc, dy) {
    x.save(); x.translate(540, 1350 + dy); x.scale(sc, sc); x.translate(-540, -1350)
    const ink = '#140c2c'
    // wheels peeking under
    x.fillStyle = ink; x.fillRect(140, 1320, 160, 90); x.fillRect(780, 1320, 160, 90)
    // body
    const rr = (x0, y0, w, h, r, col) => { x.fillStyle = col; x.beginPath(); x.roundRect(x0, y0, w, h, r); x.fill() }
    rr(V.x0 - 8, V.top - 8, V.x1 - V.x0 + 16, V.bot - V.top + 16, 70, ink)
    rr(V.x0, V.top, V.x1 - V.x0, V.bot - V.top, 64, '#efe3c8')
    x.fillStyle = '#3fb6a0'; x.fillRect(V.x0, 1130, V.x1 - V.x0, V.bot - 1130 - 30)
    rr(V.x0, 1200, V.x1 - V.x0, V.bot - 1200, 40, '#3fb6a0')
    x.fillStyle = '#f28a3c'; x.fillRect(V.x0, 1098, V.x1 - V.x0, 18); x.fillStyle = '#ffd166'; x.fillRect(V.x0, 1116, V.x1 - V.x0, 12)
    // windshield (the riders are drawn into it by the caller) — frame only here
    rr(WS.x0 - 10, WS.y0 - 10, WS.x1 - WS.x0 + 20, WS.y1 - WS.y0 + 20, 46, '#cdbd9c')
    rr(WS.x0, WS.y0, WS.x1 - WS.x0, WS.y1 - WS.y0, 38, '#221a48')
    // grille, headlights, bumper, plate
    x.fillStyle = ink; x.fillRect(372, 1172, 336, 96)
    x.fillStyle = '#c9c3d8'; for (let k = 0; k < 4; k++) x.fillRect(380, 1180 + k * 22, 320, 12)
    for (const hx of [200, 880]) {
      x.fillStyle = ink; x.beginPath(); x.arc(hx, 1218, 62, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ffe08a'; x.beginPath(); x.arc(hx, 1218, 52, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#fff6e2'; x.fillRect(hx - 24, 1192, 18, 18)
    }
    x.fillStyle = ink; x.fillRect(V.x0 + 10, 1292, V.x1 - V.x0 - 20, 54)
    x.fillStyle = '#c9c3d8'; x.fillRect(V.x0 + 16, 1298, V.x1 - V.x0 - 32, 42)
    x.fillStyle = ink; x.fillRect(450, 1300, 180, 38); x.fillStyle = '#f5f1ff'; x.fillRect(456, 1304, 168, 30)
    x.fillStyle = ink; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TX', 540, 1320)
    // side mirror (left), on an arm
    x.fillStyle = ink; x.fillRect(MIRROR.x + 40, MIRROR.y + 40, 40, 14)
    x.fillRect(MIRROR.x - 6, MIRROR.y - 6, MIRROR.w + 12, MIRROR.h + 12)
    x.fillStyle = '#5a5470'; x.fillRect(MIRROR.x, MIRROR.y, MIRROR.w, MIRROR.h)
    x.fillStyle = '#7fdcff'; x.fillRect(MIRROR.x + 8, MIRROR.y + 8, MIRROR.w - 16, MIRROR.h - 16)
    x.restore()
  }
  function glare() {
    x.save(); x.beginPath(); x.roundRect(WS.x0, WS.y0, WS.x1 - WS.x0, WS.y1 - WS.y0, 38); x.clip()
    x.globalAlpha = 0.1; x.fillStyle = '#ffffff'
    x.beginPath(); x.moveTo(WS.x0 + 120, WS.y0); x.lineTo(WS.x0 + 260, WS.y0); x.lineTo(WS.x0 + 40, WS.y1); x.lineTo(WS.x0 - 100, WS.y1); x.fill()
    x.beginPath(); x.moveTo(WS.x1 - 200, WS.y0); x.lineTo(WS.x1 - 150, WS.y0); x.lineTo(WS.x1 - 330, WS.y1); x.lineTo(WS.x1 - 380, WS.y1); x.fill()
    x.restore()
    // rear-view mirror
    x.fillStyle = '#140c2c'; x.fillRect(520, WS.y0, 40, 24); x.fillRect(470, WS.y0 + 20, 140, 40)
    x.fillStyle = '#7fdcff'; x.fillRect(478, WS.y0 + 26, 124, 28)
  }

  // ── Saturn: banded disc + tilted ring, eyes, round glasses, pointer
  const RC = 11
  const BANDS = ['#f6dca0', '#e8c27a', '#d9a85e', '#f0cf8c', '#c98f4a', '#e8c27a', '#f6dca0']
  function drawSaturn(t, cx, cy, r) {
    const c = Math.max(2, Math.round(r / RC)), R = RC
    cx = Math.round(cx); cy = Math.round(cy + Math.sin(t * 1.9) * 5)
    const tilt = -0.3 + 0.04 * Math.sin(t * 1.3), ct = Math.cos(tilt), sn = Math.sin(tilt)
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
    const M = satMood(t), [lx, ly] = M.look, blinkT = (t + 0.7) % 3.7 < 0.13
    for (const s of [-1, 1]) {
      const ex = cx + s * 4 * c, ey = cy - c
      x.strokeStyle = INK; x.lineWidth = Math.max(2, c * 0.7)
      x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3.3 * c, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(190,230,255,0.25)'; x.beginPath(); x.arc(ex + c / 2, ey + c / 2, 3 * c, 0, Math.PI * 2); x.fill()
      x.fillStyle = INK
      const e = M.eyes
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
    // the pointer: a stick from the lower right, tapping toward the hood on each beat of the lesson
    let tap = 0
    for (const t0 of TAPS) { const u = t - t0; if (u > 0 && u < 0.6) tap = Math.max(tap, Math.abs(Math.sin(u / 0.6 * Math.PI * 3)) * (1 - u / 0.6)) }
    const a = (-38 - tap * 16) * Math.PI / 180, L = r * 2.2
    const bx = cx + r * 0.7, by = cy + r * 0.75, tx = bx + Math.cos(a) * L * 0.55, ty = by - Math.sin(a) * L
    x.save(); x.lineCap = 'round'
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
    x.strokeStyle = '#8a5a2a'; x.lineWidth = 8; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
    x.fillStyle = BONE; x.beginPath(); x.arc(tx, ty, 8, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function note(t, cx, cy, label, t0, rot) {
    const p = pop01(t, t0, 0.26, 3)
    if (p <= 0.01) return
    const sc = lerp(1.6, 1, clamp(p)) * Math.min(1, p * 1.5)
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
    x.font = `700 26px ${MONO}`; x.letterSpacing = '1px'
    const w = 306, h = 82
    x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-w / 2 + 6, -h / 2 + 8, w, h)
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
    x.fillStyle = '#ffe98a'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#f2c75c'; x.fillRect(-w / 2, -h / 2, w, 10)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 0, 6)
    x.restore()
  }
  function tag(t, cx, cy, t0) {
    const p = pop01(t, t0, 0.32, 2.6)
    if (p <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(p, p)
    x.font = `700 34px ${MONO}`; x.letterSpacing = '4px'
    const label = '= A PATTERN', w = Math.ceil(x.measureText(label).width) + 50, h = 66
    x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
    x.fillStyle = GOLD; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#140c2c'; x.fillRect(-w / 2 + 5, -h / 2 + 5, w - 10, h - 10)
    x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 3, 2)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      road(t)
      const ok = popOut(t, T.out)
      const ap = ease.outCubic(prog(t, ...T.approach))
      const sc = lerp(0.55, 1, ap) * lerp(0.9, 1, ok), dy = lerp(-120, 0, ap) + Math.round(Math.sin(t * 9) * 2 + Math.sin(t * 3.1) * 3)
      const va = clamp(ok * 1.5)
      if (va > 0.01) {
      x.save(); x.globalAlpha = va
      vanFace(t, sc, dy)
      // inside the windshield: the back seat, Saturn, Sagittarius + the steering wheel
      x.save(); x.translate(540, 1350 + dy); x.scale(sc, sc); x.translate(-540, -1350)
      x.save(); x.beginPath(); x.roundRect(WS.x0, WS.y0, WS.x1 - WS.x0, WS.y1 - WS.y0, 38); x.clip()
      x.fillStyle = '#2e2458'; x.fillRect(WS.x0, 860, WS.x1 - WS.x0, 220)            // the back seat
      ;[[200, VIR, 3], [540, GEM, 5], [880, TAU, 8]].forEach(([bx, s, seed]) => drawStarChar(x, bx, 770, 120, t, { color: s.color, mood: t > T.tag && t < T.cut ? 'wide' : 'happy', seed, glow: 0.4, alpha: 0.75 * va, tips: false }))
      x.fillStyle = 'rgba(20,12,44,0.35)'; x.fillRect(WS.x0, WS.y0, WS.x1 - WS.x0, WS.y1 - WS.y0)
      drawSaturn(t, SATP.x, SATP.y, SATP.r)
      drawStarChar(x, SAGP.x, SAGP.y, SAGP.s, t, { color: SAG.color, glyph: SAG.glyph, ...sagState(t), hops: SAG_HOPS, seed: 11, glow: 0.9, alpha: va })
      x.lineWidth = 16; x.strokeStyle = '#140c2c'; x.beginPath(); x.ellipse(SAGP.x, 1040, 120, 34, 0, Math.PI, Math.PI * 2); x.stroke()
      x.lineWidth = 8; x.strokeStyle = '#5a5470'; x.stroke()
      x.restore()
      glare()
      x.restore()
      x.restore()
      }
      // the ghost hangs on the side mirror (drawn after it, clipped to the mirror's left… it leans out past the right edge)
      drawGhostCameo(x, t, { x: MIRROR.x + MIRROR.w + 2, y: MIRROR.y + MIRROR.h / 2, at: T.ghost, dur: 1.3, from: 'left', cell: 3 })
      // the sticky notes on the hood + the pattern tag
      const nk = outK(t, [T.cut - 0.25, T.cut])
      if (nk > 0 && t > T.note1) {
        x.save(); x.globalAlpha = nk
        note(t, 222, 1150, '#1 LATE · NO TEXT', T.note1, -0.05)
        note(t, 540, 1150, '#2 LATE · NO TEXT', T.notes23[0], 0.03)
        note(t, 858, 1150, '#3 LATE · NO TEXT', T.notes23[1], -0.02)
        tag(t, 540, 1262, T.tag)
        x.restore()
      }
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.9 (H0 out → "Once? Or always?") and 10.9 (box shut → the lesson). cardfx keeps 10.9.
const CUTS = [4.9, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound
const NOTE_HZ = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.1, 0, 0.024),
  ['whoosh', T.approach[0] + 0.1, 1.4, 0.03],
  ['bell', T.glint, 1760, 0.03, 1.2, -0.3], ['glitter', T.glint, T.glint + 0.4],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ST]: 440 } }),
  ['pop', T.gulp, 392, 0.04, 0.3],
  ...wordPops(T.h1, 2, 0.1, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ...[T.note1, ...T.notes23].map((n, i) => ['tick', n + 0.05, 0.05 + i * 0.005]), ...[T.note1, ...T.notes23].map((n, i) => ['pop', n + 0.06, 493.88, 0.04, -0.4 + i * 0.4]),
  ['pop', T.tag, 1174.66, 0.04, 0], ['pluck', T.tag + 0.05, 1318.51, 0.04, 0.6, 0],
  ['tick', T.ghost + 0.3, 0.018],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
