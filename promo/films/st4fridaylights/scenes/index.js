// st4fridaylights (EP 056, 20 s vertical Align ad, Star Talk season 4, thread A: the Texas road trip) · story 0–15.6, then the
// shared end card ("come" + the Align logo, JOIN THE TEXAS BETA).
//   0.00–5.20  "Texas Friday | *nights.*"  A generic high-school stadium at dusk: two light towers, a plain scoreboard
//              (HOME 0 · 0 GUEST), metal bleachers full of little stars. On the drop (2.27) the lights bang on, bank by bank.
//              Alone on an empty bench, a shy bone star lifts a cardboard sign: "CAN I SIT WITH YOU?"
//   4.30–11.0  The ♌ Leo star (crown) slides down the bench and sits right next to it. "Cheer *loud.*"
//              Box (THE STARS): "cheer for them."  Leo lifts its own sign: "GO YOU!". The scoreboard flips: SMALL WINS 1.
//              Box: "even the *small* wins."  The shy star flips its sign: "GO YOU TOO!" (Leo goes heart-eyed.)
//              The ghost peeks out from behind the scoreboard (9.2).
//  11.15       card cut (flip).
//  11.25–15.5  "Be their | *biggest* fan."  Leo waves a giant foam finger, the shy star beams, confetti, the lights flash.
// No team marks, no school names, no logos: a plain stadium. One canvas, DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 56
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', AMBER = '#ffb347', MINT = '#7dffb0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const LEO = signStar('leo')

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.85, h0Out: [5.0, 5.2],
  crowdIn: 0.2, shyIn: 0.45, lights: [BEAT(3), BEAT(3) + 0.14],       // 2.27: the drop
  sign: 3.0,
  leoIn: [4.3, 4.95],
  h1: 5.3, h1Land: 5.65, h1Out: [10.85, 11.05],
  open: 5.35, l1: 5.5, goSign: 6.35, win: 7.6, l2: 8.0, flip: 9.55, close: 10.9,
  ghost: 9.2,
  cut: 11.15,
  h2: 11.25, h2Land: 11.6, finger: 11.45, confetti: 11.7, wave: 12.6, h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'cheer for them.' },
  { t: T.l2, speaker: NARR, text: 'even the *small* wins.' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const hash = (i, s = 1) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

// ── pixel bits
const BMP = s => s.trim().split(/\s+/)
const CROWN = BMP(`g...g...g gg.YgY.gg YYYYYYYYY YRYYBYYRY YYYYYYYYY ddddddddd`)
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
// the foam finger: index finger up, a big mitt, a cuff (gold foam, darker shade, a light rim)
const FINGER = BMP(`
....LL......
...LYYd.....
...LYYd.....
...LYYd.....
...LYYd.....
...LYYd.....
.LLLYYdLL...
LYYdYYdYYd..
LYYdYYdYYdL.
LYYYYYYYYYdd
LYYYYYYYYYYd
LYYYYYYYYYYd
.LYYYYYYYYd.
..LYYYYYYd..
..RRRRRRRR..
..RRRRRRRR..
..rrrrrrrr..`)
const FINGER_C = { L: '#fff1c8', Y: '#f7c948', d: '#c98a1f', R: '#ff5c8a', r: '#c23a66' }
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
function bits(x, bm, cols, cx, cy, cell, { rot = 0, a = 1, outline = true } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  if (outline) {
    x.fillStyle = 'rgba(14,8,32,0.88)'
    bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  }
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = typeof cols === 'string' ? cols : (cols[ch] || cols.X); x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// ── the stadium layout
const TOWERS = [{ x: 132, on: T.lights[0] }, { x: 948, on: T.lights[1] }]
const BANK_Y = 610, POLE_TOP = 660, POLE_BOT = 1350
const BOARD = { x: 540, y: 668, w: 440, h: 196 }
const BENCH = [905, 1035, 1165, 1295]
const FIELD_Y = 1352
// the crowd: [x, bench, size, sign id or null (= bone)], none on the shy star's stretch of bench
const CROWD = [
  [70, 0, 78, 'aries'], [190, 0, 74, null], [305, 0, 80, 'cancer'], [420, 0, 72, null], [660, 0, 76, 'gemini'], [775, 0, 74, 'libra'], [890, 0, 80, null], [1010, 0, 74, 'capricorn'],
  [110, 1, 92, null], [250, 1, 88, 'pisces'], [830, 1, 90, 'scorpio'], [975, 1, 92, null],
  [80, 2, 104, 'aquarius'], [1000, 2, 104, null],
  [130, 3, 116, 'taurus'], [960, 3, 116, 'virgo'],
].map(([x, b, s, id], i) => ({ x, y: BENCH[b] - s * 0.3, s, col: id ? signStar(id).color : STAR.bone, seed: 40 + i * 7, t: T.crowdIn + hash(i, 3) * 0.6 }))

const SHY_A = { x: 395, y: BENCH[2] - 62, s: 200 }, LEO_A = { x: 680, y: BENCH[2] - 62, s: 206 }
const SHY_F = { x: 350, y: 1420, s: 300 }, LEO_F = { x: 720, y: 1400, s: 320 }
const lightK = t => Math.max(...TOWERS.map(w => ease.outCubic(prog(t, w.on, w.on + 0.18))))

async function build(stage) {
  try {
    await Promise.all(["800 118px Inter", "800 44px Inter", "800 40px Inter", "italic 500 172px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Texas Friday | *nights.*', { top: 196, size: 118, accentSize: 172, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: GOLD })
  const H1 = popText(root, 'Cheer *loud.*', { top: 236, size: 124, accentSize: 180, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Be their | *biggest* fan.', { top: 196, size: 118, accentSize: 172, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.12, wobble: true, gap: 0.09, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── the field (mostly under the box): mowing stripes, a sideline, yard lines in a little perspective
  function drawField(t) {
    const L = lightK(t)
    const g = x.createLinearGradient(0, FIELD_Y, 0, 1920)
    g.addColorStop(0, lerp(0, 1, L) > 0.5 ? '#2f8a4a' : '#1d4a30'); g.addColorStop(1, '#123a24')
    x.fillStyle = g; x.fillRect(0, FIELD_Y, W, 1920 - FIELD_Y)
    for (let k = 0; k < 8; k++) { if (k % 2) continue; x.fillStyle = `rgba(255,255,255,${0.03 + 0.04 * L})`; x.fillRect(0, FIELD_Y + 40 + k * 70, W, 70) }
    x.fillStyle = rgba(BONE, 0.35 + 0.5 * L); x.fillRect(0, FIELD_Y + 26, W, 8)
    for (let k = -6; k <= 6; k++) {
      const x0 = 540 + k * 150, x1 = 540 + k * 230
      x.strokeStyle = rgba(BONE, 0.18 + 0.4 * L); x.lineWidth = 5
      x.beginPath(); x.moveTo(x0, FIELD_Y + 34); x.lineTo(x1, 1920); x.stroke()
    }
  }

  // ── a light tower: pole + braces, the lamp bank (6 × 4), beams when on, flicker as it warms up
  function drawTower(t, w, flash) {
    const on = prog(t, w.on, w.on + 0.18), k = ease.outCubic(on)
    const flick = on > 0 && on < 1 ? (Math.sin(t * 90) > 0 ? 1 : 0.35) : 1
    const lit = k * flick * flash
    // the beam
    if (lit > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createLinearGradient(w.x, BANK_Y, 540, FIELD_Y + 200)
      g.addColorStop(0, `rgba(255,244,214,${0.22 * lit})`); g.addColorStop(1, 'rgba(255,244,214,0)')
      x.fillStyle = g; x.beginPath()
      const dir = w.x < 540 ? 1 : -1
      x.moveTo(w.x - 60 * dir, BANK_Y + 30); x.lineTo(w.x + 70 * dir, BANK_Y + 40); x.lineTo(540 + 520 * dir, 1920); x.lineTo(540 - 220 * dir, 1920); x.closePath(); x.fill()
      x.restore()
    }
    // pole + cross braces
    x.fillStyle = '#2a2550'; x.fillRect(w.x - 12, POLE_TOP, 24, POLE_BOT - POLE_TOP)
    x.fillStyle = '#4a4680'; x.fillRect(w.x - 12, POLE_TOP, 6, POLE_BOT - POLE_TOP)
    x.strokeStyle = '#2a2550'; x.lineWidth = 5
    for (let y = POLE_TOP + 40; y < POLE_BOT - 60; y += 90) { x.beginPath(); x.moveTo(w.x - 26, y); x.lineTo(w.x + 26, y + 60); x.moveTo(w.x + 26, y); x.lineTo(w.x - 26, y + 60); x.stroke() }
    // the bank
    const cols = 6, rows = 4, s = 21, gp = 4, bw = cols * (s + gp) + gp, bh = rows * (s + gp) + gp
    const bx = w.x - bw / 2, by = BANK_Y - bh / 2
    x.fillStyle = 'rgba(14,8,32,0.95)'; x.fillRect(bx - 6, by - 6, bw + 12, bh + 12)
    x.fillStyle = '#3a3566'; x.fillRect(bx, by, bw, bh)
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const order = (j * cols + i) / (rows * cols)
      const li = clamp((t - w.on) / 0.18 - order * 0.6 + 0.6) * flick * flash
      x.fillStyle = li > 0.5 ? (i + j) % 3 ? '#fff4d6' : '#ffffff' : '#6d6a96'
      x.fillRect(bx + gp + i * (s + gp), by + gp + j * (s + gp), s, s)
    }
    if (lit > 0) {
      glow(w.x, BANK_Y, 230, '#fff1c8', lit)
      drawPixelStar(x, w.x + (w.x < 540 ? 34 : -34), BANK_Y - 30, 46 + 10 * Math.sin(t * 5 + w.x), 2, '#ffffff')
    }
  }

  // ── the scoreboard: generic HOME / GUEST in amber dots; flips to SMALL WINS 1
  function drawBoard(t) {
    const { x: cx, y: cy, w, h } = BOARD, L = lightK(t)
    x.save()
    x.fillStyle = '#2a2550'; x.fillRect(cx - 120, cy + h / 2, 22, BENCH[0] - cy - h / 2 - 30); x.fillRect(cx + 98, cy + h / 2, 22, BENCH[0] - cy - h / 2 - 30)
    x.fillStyle = 'rgba(14,8,32,0.95)'; x.fillRect(cx - w / 2 - 8, cy - h / 2 - 8, w + 16, h + 16)
    x.fillStyle = '#0d0a1c'; x.fillRect(cx - w / 2, cy - h / 2, w, h)
    x.strokeStyle = rgba(BONE, 0.6); x.lineWidth = 3; x.strokeRect(cx - w / 2 + 8, cy - h / 2 + 8, w - 16, h - 16)
    const wp = prog(t, T.win - 0.15, T.win + 0.15)                  // the flip
    const sy = Math.abs(Math.cos(Math.PI * wp))
    const won = wp >= 0.5
    const blink = won && t < T.win + 1.2 ? (Math.sin((t - T.win) * 22) > -0.3 ? 1 : 0.35) : 1
    const fin = t >= T.cut ? 0.75 + 0.25 * Math.sin(t * 9) : 1
    x.translate(cx, cy); x.scale(1, Math.max(0.02, sy))
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.shadowColor = AMBER; x.shadowBlur = 16 * (0.3 + 0.7 * L)
    x.globalAlpha *= (0.55 + 0.45 * L) * blink * fin
    x.fillStyle = AMBER
    if (!won) {
      x.font = `700 30px ${MONO}`; x.fillText('HOME', -110, -46); x.fillText('GUEST', 110, -46)
      x.font = `700 84px ${MONO}`; x.fillText('0', -110, 30); x.fillText('0', 110, 30)
      x.font = `700 24px ${MONO}`; x.fillStyle = '#ff6b6b'; x.fillText('Q2', 0, -46); x.fillStyle = AMBER
      x.fillRect(-3, 6, 6, 6); x.fillRect(-3, 40, 6, 6)
    } else {
      x.font = `700 40px ${MONO}`; x.fillStyle = MINT; x.shadowColor = MINT; x.fillText('SMALL WINS', 0, -44)
      x.font = `700 92px ${MONO}`; x.fillStyle = AMBER; x.shadowColor = AMBER; x.fillText('1', 0, 34)
      if (t > T.win + 0.15) { drawPixelStar(x, -120, 34, 36, 2, GOLD); drawPixelStar(x, 120, 34, 36, 2, GOLD) }
    }
    x.restore()
  }

  // ── the bleachers: four metal benches with risers + rails
  function drawBleachers(t) {
    BENCH.forEach((by, k) => {
      x.fillStyle = '#1a1638'; x.fillRect(0, by + 14, W, 116)
      x.fillStyle = '#5c6496'; x.fillRect(0, by, W, 18)
      x.fillStyle = '#9aa3d0'; x.fillRect(0, by, W, 5)
      x.fillStyle = '#2a2550'; for (let px = 40 + k * 23; px < W; px += 180) x.fillRect(px, by + 18, 10, 112)
    })
  }

  // ── a cardboard sign on two sticks (text lines centred), with a flip (sx through 0)
  function drawSign(cx, cy, w, h, linesA, linesB, flipP, { col = '#d9b27a', ink = INK, rot = 0, k = 1, accent = null } = {}) {
    if (k <= 0.01) return
    const sx = Math.abs(Math.cos(Math.PI * flipP)) || 0.02
    const lines = flipP >= 0.5 ? linesB : linesA
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot); x.scale(k, k)
    x.fillStyle = '#7a5530'; x.fillRect(-w * 0.28 - 5, h / 2 - 10, 10, 120); x.fillRect(w * 0.28 - 5, h / 2 - 10, 10, 120)
    x.scale(sx, 1)
    x.fillStyle = 'rgba(14,8,32,0.9)'; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = flipP >= 0.5 && accent ? accent : col; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(-w / 2, -h / 2, w, 6)
    x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(-w / 2, h / 2 - 8, w, 8)
    x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
    const fs = lines.length > 1 ? 44 : 58
    x.font = `800 ${fs}px ${INTER}`
    lines.forEach((s, i) => x.fillText(s, 0, (i - (lines.length - 1) / 2) * fs * 1.08 + 3))
    x.restore()
  }

  // ── the crowd
  function drawCrowd(t) {
    const L = lightK(t), ok = popOut(t, T.out)
    CROWD.forEach((c, i) => {
      const pk = pop01(t, c.t, 0.34, 2.2) * ok
      if (pk <= 0.02) return
      const hops = [T.lights[0] + 0.1 + hash(i, 5) * 0.25, T.win + 0.1 + hash(i, 6) * 0.3, T.cut + 0.2, T.wave + (c.x / W) * 0.9, T.wave + 1.6 + (c.x / W) * 0.9]
      let mood = L > 0.5 ? 'happy' : 'neutral', look = [0, 1]
      if (t < T.lights[0]) mood = 'sleepy'
      else if (t < T.lights[0] + 0.7) mood = 'wide'
      if (t > T.win && t < T.win + 1.4) { mood = i % 3 ? 'happy' : 'sparkle'; look = [0, 0] }
      if (t >= T.cut) { mood = i % 2 ? 'happy' : 'sparkle'; look = [0, 0] }
      drawStarChar(x, c.x, c.y, c.s, t, { color: c.col, mood, look, hops, seed: c.seed, pop: pk, glow: 0.5 + 0.4 * L, zzz: false, tips: c.s > 100 })
    })
  }

  // ── the two of them
  function shyState(t) {
    if (t < T.lights[0]) return { mood: 'neutral', look: [0, 1] }
    if (t < T.sign) return { mood: 'wide', look: [-1, -1] }
    if (t < T.leoIn[0]) return { mood: 'neutral', look: [1, 0] }                 // glancing at the empty seat
    if (t < T.leoIn[1] + 0.3) return { mood: 'wide', look: [1, 0], blink: false }
    if (t < T.goSign) return { mood: 'happy', look: [1, 0] }
    if (t < T.goSign + 0.9) return { mood: 'wide', look: [1, -1] }
    if (t < T.win) return { mood: 'sparkle', look: [1, -1] }
    if (t < T.flip) return { mood: 'happy', look: [0, -1] }
    if (t < T.cut) return { mood: 'happy', look: [1, 0] }
    return { mood: t > T.h2Land + 0.3 ? 'heart' : 'sparkle', look: [1, -1] }
  }
  function leoState(t) {
    if (t < T.leoIn[1]) return { mood: 'happy', look: [-1, 0] }
    if (t < T.l1) return { mood: 'wink', look: [-1, 0] }
    if (t < T.goSign) return { mood: 'happy', look: [0, 0] }
    if (t < T.flip + 0.2) return { mood: 'sparkle', look: [-1, 0] }
    if (t < T.cut) return { mood: 'heart', look: [-1, 0] }
    return { mood: 'sparkle', look: [-1, 0] }
  }
  function drawPair(t) {
    const ok = popOut(t, T.out)
    const beat3 = t >= T.cut
    // the shy star
    const S = beat3 ? SHY_F : SHY_A
    let sp = pop01(t, T.shyIn, 0.36, 2) * ok
    if (beat3) sp = pop01(t, T.cut + 0.1, 0.34, 2) * ok
    const shyHops = [T.sign + 0.05, T.win + 0.2, T.flip + 0.1, T.h2Land + 0.1, 13.3, 14.1]
    // the shy sign rises behind it first (sticks go down behind the star)
    const rise = ease.outBack(prog(t, T.sign, T.sign + 0.45))
    if (!beat3 && sp > 0.02 && rise > 0) {
      const flipP = prog(t, T.flip, T.flip + 0.3)
      drawSign(S.x - 40, S.y - 150 - rise * 40 + Math.sin(t * 3.2) * 4, 350, 132, ['CAN I SIT', 'WITH YOU?'], ['GO YOU', 'TOO!'], flipP, { k: clamp(rise) * sp, rot: -0.04 + 0.02 * Math.sin(t * 2.4), accent: '#a7f0c8' })
    }
    const rS = drawStarChar(x, S.x, S.y, S.s, t, { color: STAR.bone, ...shyState(t), hops: shyHops, seed: 3, pop: sp, glow: 1, blush: t > T.leoIn[1] ? 0.9 : 0.3 })
    // sweat drop while it waits alone
    if (!beat3 && t > T.sign + 0.4 && t < T.leoIn[0] + 0.2 && sp > 0.5) {
      const dp = ((t - T.sign) % 0.9) / 0.9
      x.save(); x.globalAlpha = Math.sin(Math.PI * dp)
      x.fillStyle = '#9fe0ff'; x.fillRect(S.x - 92, rS.top + 50 + dp * 26, 12, 16); x.fillRect(S.x - 89, rS.top + 42 + dp * 26, 6, 8)
      x.restore()
    }

    // Leo: slides in along the bench from the right in beat 2
    let Lx = LEO_A.x, Ly = LEO_A.y, Ls = LEO_A.s, lp = 0
    if (!beat3) {
      const e = ease.outCubic(prog(t, ...T.leoIn))
      Lx = lerp(1250, LEO_A.x, e); Ly = LEO_A.y - Math.abs(Math.sin(e * Math.PI * 3)) * 40 * (1 - e)
      lp = t >= T.leoIn[0] ? ok : 0
    } else { Lx = LEO_F.x; Ly = LEO_F.y; Ls = LEO_F.s; lp = pop01(t, T.cut + 0.16, 0.34, 2) * ok }
    if (lp <= 0.02) return
    const leoHops = [T.leoIn[1], T.l1 + 0.05, T.goSign + 0.05, T.win + 0.15, T.flip + 0.35, T.h2Land, 12.9, 13.7, 14.5]
    // Leo's GO YOU! sign (pink) behind it
    const gk = ease.outBack(prog(t, T.goSign, T.goSign + 0.4))
    if (!beat3 && gk > 0) drawSign(Lx + 70, Ly - 160 - gk * 30 + Math.sin(t * 3.6 + 1) * 5, 270, 116, ['GO YOU!'], ['GO YOU!'], 0, { k: clamp(gk) * lp, col: PINK, rot: 0.05 + 0.03 * Math.sin(t * 3), ink: INK })
    // beat 3: the giant foam finger, waving, held up beside Leo
    if (beat3) {
      const fk = pop01(t, T.finger + 0.15, 0.4, 2.2) * ok
      if (fk > 0.02) {
        const wav = Math.sin((t - T.finger) * 6.5) * 0.16
        const fx = Lx + 200, fy = Ly - 290 + Math.sin(t * 6.5) * 10
        bits(x, FINGER, FINGER_C, fx, fy, 15 * fk, { rot: wav })
        x.save(); x.translate(fx, fy); x.rotate(wav); x.scale(fk, fk)
        x.fillStyle = INK; x.font = `800 58px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('#1', -6, 46)
        x.restore()
      }
    }
    const rL = drawStarChar(x, Lx, Ly, Ls, t, { color: LEO.color, glyph: LEO.glyph, ...leoState(t), hops: leoHops, seed: 9, pop: lp, glow: 1.15 })
    // Leo's crown on its tip
    const cell = Math.max(3, Math.round(Ls * lp / 30))
    bits(x, CROWN, CROWN_C, rL.x, rL.top + cell * 0.4, cell, { rot: -0.18 + 0.04 * Math.sin(t * 3) })
    // hearts over Leo when the shy star cheers back
    if (t > T.flip + 0.3 && t < T.cut) floatHearts(t, Lx, Ly - 120, T.flip + 0.3, T.cut - 0.3, 260)
    if (beat3 && t > T.h2Land + 0.3) floatHearts(t, SHY_F.x, SHY_F.y - 160, T.h2Land + 0.3, 15.0, 300)
  }

  function floatHearts(t, cx, cy, t0, t1, spread = 400) {
    for (let i = 0; i < 9; i++) {
      const born = t0 + i * 0.22, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37) % 9) / 8 - 0.5
      bits(x, HEART, [PINK, '#ff4f86', GOLD][i % 3], cx + side * spread + Math.sin(p * 7 + i) * 14, cy - p * 240, 5 + (i % 3), { a: Math.sin(Math.PI * p) })
    }
  }
  function confetti(t) {
    const tt = t - T.confetti
    if (tt < 0) return
    const fade = popOut(t, T.out)
    x.save(); x.globalAlpha = clamp(fade)
    for (let i = 0; i < 70; i++) {
      const born = hash(i, 9) * 3.2, age = tt - born
      if (age < 0) continue
      const life = 2.2 + hash(i, 4)
      const p = (age % life) / life
      const cx = hash(i, 2) * W + Math.sin(age * 3 + i) * 30, cy = 520 + p * 900
      const s = 10 + 6 * hash(i, 7), sq = Math.abs(Math.cos(age * 6 + i))
      x.fillStyle = [GOLD, PINK, MINT, LAV, '#7fe0ff', BONE][i % 6]
      x.fillRect(cx - s / 2, cy - s * sq / 2, s, Math.max(2, s * sq))
    }
    x.restore()
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const flash = t >= T.cut ? 0.8 + 0.2 * Math.sin(t * 11) : 1
      const sf = 1 - ease.inOutQuad(prog(t, T.out[0] + 0.1, T.out[1] + 0.1))     // the stadium fades back to sky for the end card
      x.save(); x.globalAlpha = sf
      drawField(t)
      for (const w of TOWERS) drawTower(t, w, flash)
      drawBoard(t)
      drawGhostCameo(x, t, { x: BOARD.x - BOARD.w / 2 - 8, y: BOARD.y + 6, at: T.ghost, dur: 1.4, from: 'right', cell: 3 })
      drawBleachers(t)
      // dusk: before the lights the whole stadium sits in shadow
      const dk = 1 - lightK(t)
      if (dk > 0) { x.fillStyle = `rgba(6,4,20,${0.5 * dk})`; x.fillRect(0, 520, W, 1400) }
      x.restore()
      drawCrowd(t)
      drawPair(t)
      sparkles(t, BOARD.x, BOARD.y, T.win + 0.1, 12, 250, 1, [GOLD, MINT, BONE])
      sparkles(t, SHY_A.x, SHY_A.y - 170, T.flip + 0.2, 10, 190, 2, [MINT, BONE, GOLD])
      confetti(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.25 (inert: the headline swaps), 11.15 (box shut → the last line, the one that plays).
const CUTS = [5.25, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: dusk, the crowd settles, then the lights bang on bank by bank
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ...CROWD.slice(0, 8).map((c, i) => ['pop', +(c.t + 0.1).toFixed(3), NOTE[(i * 2) % 7], 0.014, +((c.x / W - 0.5) * 1.2).toFixed(2)]),
  ['boom', T.lights[0], 0.2], ['tick', T.lights[0], 0.05], ['tick', T.lights[1], 0.05], ['glitter', T.lights[0], T.lights[0] + 0.6],
  ['bell', T.lights[0] + 0.05, 1567.98, 0.03, 1.4, -0.4], ['bell', T.lights[1] + 0.05, 1760, 0.03, 1.4, 0.4],
  ['whoosh', T.sign - 0.05, 0.3, 0.025], ['pop', T.sign + 0.3, 659.25, 0.035, -0.2],
  // Leo slides in, the box, GO YOU!, the scoreboard flips
  ['whoosh', T.leoIn[0], 0.5, 0.035], ['pop', T.leoIn[1], 880, 0.04, 0.3],
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  ['pop', T.goSign + 0.15, 1046.5, 0.04, 0.3], ['pluck', T.goSign + 0.2, 1318.51, 0.03, 0.5, 0.3],
  ['tick', T.win - 0.1, 0.04], ['chip', T.win, 1046.5, 0.12, { duty: 0.25, gain: 0.026 }], ['chip', T.win + 0.13, 1318.51, 0.12, { duty: 0.25, gain: 0.026 }], ['chip', T.win + 0.26, 1567.98, 0.3, { duty: 0.25, gain: 0.026 }],
  ['glitter', T.win + 0.1, T.win + 0.7],
  ['whoosh', T.flip, 0.25, 0.02], ['pop', T.flip + 0.2, 1174.66, 0.04, -0.2], ['bell', T.flip + 0.3, 1318.51, 0.03, 1.0, -0.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // be their biggest fan
  ...wordPops(T.h2, 2, 0.09, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pop', T.h2Land + 0.12, 1318.51, 0.045, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0],
  ['glitter', T.confetti, T.confetti + 0.8], ['boom', T.confetti, 0.12],
  ...[0, 1, 2, 3, 4].map(i => ['pop', +(T.wave + i * 0.18).toFixed(3), NOTE[(i + 2) % 7], 0.02, -0.6 + i * 0.3]),
  ['pluck', 13.6, 1318.51, 0.035, 0.5, -0.2], ['bell', 13.65, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
