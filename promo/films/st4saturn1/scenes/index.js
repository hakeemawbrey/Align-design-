// st4saturn1 (EP 012, 20 s vertical Align ad, Star Talk season 4, thread D1 "Saturn's class") · story 0–15.6, then the
// shared end card ("come" + the Align logo, JOIN THE HOUSTON BETA).
//   0.00–3.05  "Saturn is teaching | in *Houston.*"  A chalkboard: SATURN RETURN 101 · RM 713. Saturn (round glasses, a
//              pointer) rolls in beside it; four sign stars squeeze behind tiny desks: ♎ Libra (its scale on its head),
//              ♓ Pisces (the daydream bubble), ♊ Gemini, ♋ Cancer. Saturn's glasses glint on the drop.
//   3.10–9.20  Box (♄ SATURN): "lesson one: say what you *want.*" (Saturn chalks WANT on the board and taps it) — the
//              class freezes: Libra's scale wobbles, Pisces' bubble fills with ???, Gemini's bubble splits in two, Cancer
//              ducks. Box: "don't know yet? that's your *homework.*" — a HOMEWORK sheet thuds onto every desk ("WHAT DO I
//              WANT?"); a sweat drop on every student.
//   9.45–13.4  ★ LESSON UNLOCKED (lesson.js): "Say what | you *want.*" +1 CLARITY.
//  13.42       card cut (flip).
//  13.5–15.5   "Class is in | *session.*"  The students sit up, sparkle-eyed, pencils up; Saturn nods. Out by 15.45.
// Season lore: the 100-star constellation (EP 12 = the first petal's first star) top-left; the ghost leans out from
// behind the chalkboard's left edge (7.6–8.9). One canvas, DOM type + the box + the lesson above it. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const EP = 12
export const DURATION = 20
export const KEY = 'Dm'
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CHALK = '#eef3ea', MINT = '#7dffb0'
const SAT = '#e8c27a'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
export const T = {
  h0: 0.1, h0Land: 0.75, h0Out: [9.1, 9.3],
  board: 0.2, satIn: [0.55, 1.45], desks: 1.0, glint: BEAT(4),                 // 2.82: the drop
  open: 2.95, s1: 3.1, chalk: [4.0, 4.6], tap1: 4.75, freeze: 4.85,
  s2: 6.3, sheets: [7.55, 7.7, 7.85, 8.0], close: 9.25,
  lesson: 9.45, lessonOut: [13.18, 13.38],
  cut: 13.42,
  h1: 13.5, h1Land: 13.85, nod: 14.2, h1Out: [15.22, 15.42], out: [15.05, 15.45],
  ghost: 7.6,
}
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Say what | you *want.*', chip: '+1 CLARITY', accentColor: GOLD, dim: 0.55 }
const ST = '♄ SATURN'
const LINES = [
  { t: T.s1, speaker: ST, color: SAT, text: 'lesson one: say what you *want.*' },
  { t: T.s2, speaker: ST, color: SAT, text: "don't know yet? that's your *homework.*" },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
const DROP = BMP(`..X.. ..X.. .XXX. XXWXX XXXXX .XXX.`)
const SCALE = BMP(`
.....G.....
GGGGGGGGGGG
G....G....G
G....G....G
GG...G...GG
.....G.....
...GGGGG...`)
function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1 } = {}) {
  if (a <= 0 || cell <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || cols.X; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// ── layout
const BOARD = { x: 110, y: 500, w: 560, h: 360 }
const SATP = { x: 860, y: 720, r: 104 }
const DESK_Y = 1250
const KIDS = [
  { id: 'libra', x: 165 }, { id: 'pisces', x: 405 }, { id: 'gemini', x: 645 }, { id: 'cancer', x: 885 },
].map((k, i) => ({ ...k, ...signStar(k.id), seed: 11 + i * 4, t: T.desks + i * 0.12 }))

function kidState(t, i) {
  if (t < T.s1) return { mood: 'happy', look: [0, -1] }
  if (t < T.freeze) return { mood: 'neutral', look: [1, -1] }
  if (t < T.s2) return { mood: 'wide', look: i === 3 ? [0, 1] : [0, 0], blink: false }          // …what DO i want?
  if (t < T.sheets[i]) return { mood: i % 2 ? 'squint' : 'wide', look: [1, -1] }
  if (t < T.lesson) return { mood: 'wide', look: [0, 1], blink: false }                          // homework?!
  if (t < T.h1Land) return { mood: 'neutral', look: [1, -1] }
  return { mood: i % 2 ? 'sparkle' : 'happy', look: [1, -1] }
}
function satMood(t) {
  if (t < T.s1) return { eyes: 'stern', look: [-1, 0] }
  if (t < T.chalk[1]) return { eyes: 'open', look: [-1, 0] }
  if (t < T.s2) return { eyes: 'stern', look: [-1, 1] }
  if (t < T.lesson) return { eyes: 'open', look: [-1, 1] }
  if (t < T.nod) return { eyes: 'open', look: [-1, 1] }
  return { eyes: 'happy', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 54px 'Space Mono'", "700 34px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type, the box, the lesson
  const H0 = popText(root, 'Saturn is teaching | in *Houston.*', { top: 190, size: 88, accentSize: 140, fit: true, at: T.h0, gap: 0.08, late: 1, lateAt: T.h0Land, wobble: true, accentColor: SAT })
  const H1 = popText(root, 'Class is in | *session.*', { top: 185, size: 110, accentSize: 160, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
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

  // ── the chalkboard (wood frame, green slate, chalk type; WANT gets chalked in and underlined)
  function drawBoard(t) {
    const k = pop01(t, T.board, 0.4, 1.7) * popOut(t, T.out)
    if (k <= 0.01) return
    const { x: bx, y: by, w, h } = BOARD
    x.save(); x.translate(bx + w / 2, by + h / 2); x.scale(k, k); x.translate(-w / 2, -h / 2)
    x.fillStyle = INK; x.fillRect(-10, -10, w + 20, h + 20)
    x.fillStyle = '#8a5a2a'; x.fillRect(-4, -4, w + 8, h + 8)
    x.fillStyle = '#b07a3a'; x.fillRect(-4, -4, w + 8, 6)
    const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1f4a3a'); g.addColorStop(1, '#173a2e')
    x.fillStyle = g; x.fillRect(12, 12, w - 24, h - 24)
    // old smudges
    x.fillStyle = 'rgba(238,243,234,0.05)'; x.fillRect(60, 210, 180, 30); x.fillRect(330, 80, 140, 24)
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = CHALK
    x.font = `700 54px ${MONO}`; x.letterSpacing = '0.04em'
    x.fillText('SATURN', w / 2, 82); x.fillText('RETURN 101', w / 2, 146)
    x.letterSpacing = '0px'
    x.fillStyle = rgba(CHALK, 0.6); x.fillRect(70, 186, w - 140, 4)
    // lesson 1: WANT (chalked in letter by letter, then underlined twice)
    const word = 'WANT', n = Math.floor(clamp(prog(t, T.chalk[0], T.chalk[1] - 0.15)) * word.length + (t >= T.chalk[0] ? 1 : 0))
    if (t >= T.chalk[0]) {
      x.font = `700 34px ${MONO}`; x.fillStyle = rgba(CHALK, 0.75); x.textAlign = 'left'
      x.fillText('1.', 64, 258)
      x.font = `700 72px ${MONO}`; x.fillStyle = GOLD
      x.fillText(word.slice(0, Math.min(n, 4)), 130, 262)
      const u = prog(t, T.chalk[1] - 0.1, T.chalk[1] + 0.2)
      if (u > 0) { x.fillStyle = rgba(GOLD, 0.85); x.fillRect(130, 304, 190 * u, 6); x.fillRect(140, 318, 170 * clamp(u * 1.4 - 0.4), 5) }
    }
    // room number, chalked small
    x.textAlign = 'right'; x.font = `700 26px ${MONO}`; x.fillStyle = rgba(CHALK, 0.55); x.fillText('RM 713', w - 40, h - 44)
    // chalk tray
    x.fillStyle = '#6e4620'; x.fillRect(20, h + 4, w - 40, 12); x.fillStyle = CHALK; x.fillRect(80, h, 34, 8); x.fillStyle = '#ffd1de'; x.fillRect(130, h, 26, 8)
    x.restore()
  }

  // ── Saturn: banded disc + tilted ring, round glasses, a pointer (after stsaturn)
  const RC = 11
  const BANDS = ['#f6dca0', '#e8c27a', '#d9a85e', '#f0cf8c', '#c98f4a', '#e8c27a', '#f6dca0']
  function drawSaturn(t) {
    const p = prog(t, ...T.satIn), e = ease.outCubic(p), ok = popOut(t, T.out)
    if (t < T.satIn[0] || ok <= 0.01) return
    const roll = (1 - e) * -2.2
    const nodK = t > T.nod && t < T.nod + 0.9 ? Math.max(0, Math.sin((t - T.nod) / 0.45 * Math.PI)) : 0
    const P = { x: lerp(1350, SATP.x, e), y: SATP.y - Math.abs(Math.sin(p * Math.PI * 2)) * 50 * (1 - p) }
    const c = Math.max(2, Math.round(SATP.r * ok / RC)), R = RC
    const cx = Math.round(P.x), cy = Math.round(P.y + Math.sin(t * 1.9) * 6 + nodK * 12)
    glow(cx, cy, SATP.r * 3, SAT, 0.6 * ok)
    const tilt = -0.32 + roll * 0.15 + 0.04 * Math.sin(t * 1.3)
    const ct = Math.cos(tilt), sn = Math.sin(tilt)
    const ringCell = (i, j) => {
      const u = (i + 0.5) * ct + (j + 0.5) * sn, v = -(i + 0.5) * sn + (j + 0.5) * ct
      const q = (u / (2.15 * R)) ** 2 + (v / (0.6 * R)) ** 2, q2 = (u / (1.42 * R)) ** 2 + (v / (0.36 * R)) ** 2
      return q <= 1 && q2 > 1 ? { v, edge: q > 0.82 } : null
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
      const ee = M.eyes
      if (blinkT && ee !== 'happy') x.fillRect(ex - c, ey + c, 3 * c, c)
      else if (ee === 'happy') { x.fillRect(ex - c, ey + c, c, c); x.fillRect(ex, ey, c, c); x.fillRect(ex + c, ey + c, c, c) }
      else if (ee === 'stern') { x.fillRect(ex - c + lx * c, ey, 3 * c, c); x.fillRect(ex + lx * c, ey + c, 2 * c, c); x.fillRect(ex - 2 * c, ey - 2 * c, 4 * c, c * 0.8) }
      else { x.fillRect(ex + lx * c, ey + ly * c - c, 2 * c, 3 * c); x.fillStyle = '#ffffff'; x.fillRect(ex + lx * c, ey + ly * c - c, c * 0.8, c * 0.8) }
    }
    x.fillStyle = INK; x.fillRect(cx - c, cy - c * 0.6, 2 * c, c * 0.7)
    const g = t - T.glint
    if (g > 0 && g < 0.5) drawPixelStar(x, cx - 2 * c, cy - 3 * c, 40 * Math.sin(Math.PI * g / 0.5) + 8, 2, '#ffffff')
    drawRing(false)
    x.restore()
    // the pointer: points at the board, taps WANT
    let tap = 0
    for (const t0 of [T.tap1, T.s2 + 0.3, T.nod]) { const u = t - t0; if (u > 0 && u < 0.6) tap = Math.max(tap, Math.abs(Math.sin(u / 0.6 * Math.PI * 3)) * (1 - u / 0.6)) }
    const bx = cx - SATP.r * 0.7, by = cy + SATP.r * 0.75
    const reach = t > T.chalk[0] - 0.2 && t < T.lesson ? 1 : 0.55
    const tx = bx - 300 * reach + tap * 14, ty = by - 170 * reach - tap * 20
    x.save(); x.globalAlpha = clamp(prog(t, T.satIn[1] - 0.2, T.satIn[1] + 0.1)) * ok; x.lineCap = 'round'
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
    x.strokeStyle = '#8a5a2a'; x.lineWidth = 8; x.beginPath(); x.moveTo(bx, by); x.lineTo(tx, ty); x.stroke()
    x.fillStyle = BONE; x.beginPath(); x.arc(tx, ty, 8, 0, Math.PI * 2); x.fill()
    x.restore()
  }

  // ── the students, their tiny desks, the reactions and the homework
  function drawDesk(cx, k) {
    const w = 190, top = DESK_Y + 30
    x.save(); x.globalAlpha *= clamp(k)
    x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, top - 6, w + 12, 34)
    x.fillStyle = '#b07a3a'; x.fillRect(cx - w / 2, top, w, 22); x.fillStyle = '#d9a85e'; x.fillRect(cx - w / 2, top, w, 6)
    x.fillStyle = INK; x.fillRect(cx - w / 2 + 14, top + 22, 14, 80); x.fillRect(cx + w / 2 - 28, top + 22, 14, 80)
    x.fillStyle = '#6e4620'; x.fillRect(cx - w / 2 + 17, top + 22, 8, 76); x.fillRect(cx + w / 2 - 25, top + 22, 8, 76)
    x.restore()
  }
  function drawSheet(t, cx, t0) {
    const p = prog(t, t0 - 0.25, t0), out = ease.inCubic(prog(t, T.lesson + 0.1, T.lesson + 0.4)) + (t > T.cut ? 1 : 0)
    if (p <= 0 || out >= 1) return
    const y = lerp(DESK_Y - 520, DESK_Y + 28, ease.inQuad(p)), rot = lerp(-0.5, -0.06, p)
    x.save(); x.globalAlpha = 1 - out; x.translate(cx, y); x.rotate(rot)
    x.fillStyle = INK; x.fillRect(-82, -26, 164, 50)
    x.fillStyle = '#f7f3ea'; x.fillRect(-78, -22, 156, 42)
    x.fillStyle = '#ff5a5a'; x.fillRect(-78, -22, 6, 42)
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
    x.font = `700 15px ${MONO}`; x.fillText('HOMEWORK:', 4, -8); x.fillText('WHAT DO I WANT?', 4, 10)
    x.restore()
    // thud dust
    const d = t - t0
    if (d > 0 && d < 0.35) { x.save(); x.globalAlpha = 1 - d / 0.35; x.fillStyle = BONE; for (const s of [-1, 1]) for (let q = 0; q < 3; q++) x.fillRect(cx + s * (95 + d * 160 + q * 14), DESK_Y + 30 - q * 8 - d * 30, 6, 6); x.restore() }
  }
  function drawKids(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    KIDS.forEach((k, i) => {
      const pk = pop01(t, k.t, 0.34, 2.2) * ok
      if (pk <= 0.02) return
      const st = kidState(t, i)
      const sit = t > T.h1Land ? -0.06 : 0
      const duck = i === 3 && t > T.freeze && t < T.s2 ? 0.15 : 0
      const hops = [k.t + 0.25, T.freeze + 0.03 * i, T.sheets[i] + 0.05, T.h1Land + 0.06 * i, 14.6 + 0.05 * i]
      const r = drawStarChar(x, k.x, DESK_Y - 80 + duck * 120, 196 * pk, t, { color: k.color, glyph: k.glyph, ...st, hops, seed: k.seed, squash: sit + duck, glow: 0.8 })
      drawDesk(k.x, pk)
      drawSheet(t, k.x, T.sheets[i])
      // props / reactions
      if (k.id === 'libra') {
        const wob = t > T.freeze && t < T.lesson ? 0.35 * Math.sin((t - T.freeze) * 11) * Math.exp(-(t - T.freeze) * 0.6) : 0.05 * Math.sin(t * 2)
        bits(x, SCALE, k.x, r.top - 26, 6 * pk, { G: GOLD }, { rot: wob })
      }
      if (k.id === 'pisces') {
        const bk = pop01(t, T.freeze + 0.1, 0.3, 2.2) * (1 - prog(t, T.lesson - 0.2, T.lesson)) + (t > T.h1Land ? pop01(t, T.h1Land + 0.2, 0.3, 2.2) * ok : 0)
        if (bk > 0.01) thought(t, k.x + 70, r.top - 70, bk, t > T.h1Land ? '♡' : '???')
      }
      if (k.id === 'gemini') {
        const bk = pop01(t, T.freeze + 0.2, 0.3, 2.2) * (1 - prog(t, T.lesson - 0.2, T.lesson))
        if (bk > 0.01) { speech(t, k.x - 60, r.top - 50, bk * 0.85, 'THIS?'); speech(t, k.x + 70, r.top - 90, bk * 0.85, 'THAT?') }
      }
      // sweat drops once the homework lands
      const sd = t - T.sheets[i] - 0.1
      if (sd > 0 && sd < 1.4 && t < T.lesson) bits(x, DROP, k.x + 64, r.top + 40 + sd * 30, 5, { X: '#8fd8f6', W: '#ffffff' }, { a: Math.min(1, (1.4 - sd) * 2) })
      // pencils up in the last beat
      if (t > T.h1Land + 0.1) {
        const pp = pop01(t, T.h1Land + 0.1 + i * 0.06, 0.3, 2.4) * ok
        x.save(); x.globalAlpha = clamp(pp); x.translate(k.x + 92, DESK_Y - 70 - 30 * pp); x.rotate(0.25)
        x.fillStyle = INK; x.fillRect(-9, -46, 18, 92); x.fillStyle = '#f7c948'; x.fillRect(-6, -36, 12, 70); x.fillStyle = '#ff8fb1'; x.fillRect(-6, -44, 12, 10); x.fillStyle = '#f3ead8'; x.fillRect(-6, 34, 12, 8); x.fillStyle = INK; x.fillRect(-3, 42, 6, 6)
        x.restore()
      }
    })
  }
  function thought(t, cx, cy, k, txt) {
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 74, 46, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 0, 68, 40, 0, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.arc(-40, 52, 11, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(-58, 74, 7, 0, Math.PI * 2); x.fill()
    if (txt === '♡') bits(x, HEART, 0, 2 + Math.sin(t * 6) * 2, 7 * (1 + 0.08 * Math.sin(t * 9)), { X: '#ff4f86' })
    else { x.fillStyle = INK; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 3 + Math.sin(t * 6) * 2) }
    x.restore()
  }
  function speech(t, cx, cy, k, txt) {
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 28px ${MONO}`; const w = x.measureText(txt).width + 34
    x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 4, -26, w + 8, 52, 14); x.fill()
    x.fillStyle = BONE; x.beginPath(); x.roundRect(-w / 2, -22, w, 44, 11); x.fill()
    x.beginPath(); x.moveTo(-8, 20); x.lineTo(8, 20); x.lineTo(-4, 38); x.closePath(); x.fill()
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
    x.restore()
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, SAT]) {
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
        // the ghost leans out from behind the board's left edge (drawn after the board)
        drawGhostCameo(x, t, { x: BOARD.x, y: BOARD.y + 250, at: T.ghost, dur: 1.3, from: 'right', cell: 3 })
        drawSaturn(t)
        drawKids(t)
        sparkles(t, BOARD.x + 230, BOARD.y + 262, T.chalk[1], 10, 120, 1)
        sparkles(t, 540, DESK_Y - 60, T.h1Land, 14, 420, 2)
      }
      box.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 13.42 (the lesson clears → "Class is in session."), the one cut this film keeps.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: headline, the board, Saturn rolls in, the class pops in, the glint on the drop
  ...wordPops(T.h0, 3, 0.08, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pluck', T.h0Land, 1174.66, 0.035, 0.6, 0],
  ['pop', T.board + 0.1, 587.33, 0.035, -0.3], ['whoosh', T.satIn[0], 0.6, 0.035], ['boom', T.satIn[1] - 0.05, 0.12],
  ...KIDS.map((k, i) => ['pop', +(k.t + 0.1).toFixed(3), NOTE[(i * 2) % 7], 0.03, +((k.x / W - 0.5) * 1.2).toFixed(2)]),
  ['bell', T.glint, 2093, 0.025, 0.9, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ST]: 520 } }),
  // chalk: four squeaky ticks, then the taps; the freeze
  ...[0, 1, 2, 3].map(i => ['tick', +(T.chalk[0] + i * 0.12).toFixed(3), 0.035]), ['tick', T.chalk[1] + 0.05, 0.025],
  ['tick', T.tap1 + 0.1, 0.03], ['tick', T.tap1 + 0.3, 0.03],
  ['pop', T.freeze, 440, 0.035, 0], ['pop', T.freeze + 0.12, 392, 0.03, 0],
  // homework thuds
  ...T.sheets.map((s, i) => ['boom', s, 0.07]), ...T.sheets.map((s, i) => ['tick', +(s + 0.01).toFixed(3), 0.03]),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // ★ LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // class is in session
  ...wordPops(T.h1, 3, 0.08, 1, 0.026), ['pop', T.h1Land, 1318.51, 0.05, 0], ['pluck', T.h1Land, 1174.66, 0.045, 0.7, 0], ['glitter', T.h1Land, T.h1Land + 0.5],
  ['bell', T.nod, 1567.98, 0.03, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
