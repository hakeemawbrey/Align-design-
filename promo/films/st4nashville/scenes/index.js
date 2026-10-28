// st4nashville (15 s vertical, Star Talk season 4 · EP 081 · thread A, the vote) · story 0–10.6, then the shared end card.
//   0.00–5.55  "Dear | *Nashville.*"  A honky-tonk stage under a neon sign: "SAD SONGS NIGHTLY". The ♓ Pisces star
//              (Jupiter/Neptune, the dreamer) strums a pixel guitar, eyes half shut, one pixel tear; droopy blue notes
//              sink instead of rising. Drop (2.82): the box opens. THE STARS: "you write great sad songs." → Pisces
//              blinks up, flattered (sparkle eyes, blush).
//   5.62–8.55  "Try a | *major key.*"  THE STARS: "let someone give you a *happy* one." → the "SAD" tube flickers out;
//              a bone date star hops in with a pixel tambourine, jingling on the beat; Pisces goes wide-eyed, then grins.
//   8.62       card cut (flip), the box has shut.
//   8.66–10.45 "Write a | *new* song."  The sign relights: "NEW SONGS NIGHTLY". Both stars jam; gold and pink notes
//              bounce UP now. Pisces goes heart-eyed. Everything pops out by 10.45; the end card takes over at 10.6.
// Easter eggs: the seed constellation (EP 081) top-left, the frame's EP cartouche, the ghost peeks over the left amp.
// One canvas (sky + stage + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 81
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', SADBLUE = '#7fa8ff', NEON = '#ff5fa2'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const PIS = signStar('pisces'), PIS_LIGHT = '#aaa4ff', THEM = STAR.bone

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [5.35, 5.55],
  pisIn: 0.35, tears: [1.15, 2.05],
  open: 2.66, l1: BEAT(4) + 0.02,                                         // the drop: 2.82
  flatter: 3.75, wink: [4.7, 5.05],
  l2: 5.62, h1: 5.68, h1Land: 6.05, sadOff: [6.35, 6.7], themIn: 6.75, jingle: [7.2, 8.4],
  close: 8.55, h1Out: [8.36, 8.54],
  cut: 8.62,
  h2: 8.66, h2Land: 9.06, newOn: [9.1, 9.45], heartAt: 9.5, h2Out: [10.2, 10.42], out: [10.08, 10.45],
  ghost: 4.25,
}
const NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: NARR, text: 'you write great sad songs.' },
  { t: T.l2, speaker: NARR, text: 'let someone give you a *happy* one.', color: GOLD },
]
const CPS = 30
const LT = lineTimes(LINES, { cps: CPS })
// sad strums every two beats, happy strums every beat (with an off-beat in the last stretch)
const SAD_STRUMS = [0.6, 1.71, 2.82, 3.93, 5.04].map(v => v + 0.0)
const HAPPY_STRUMS = [7.27, 7.83, 8.38, 9.06, 9.34, 9.62, 9.9, 10.17]
const TAMB = [7.27, 7.55, 7.83, 8.11, 8.38, 9.06, 9.34, 9.62, 9.9]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const lastOf = (arr, t) => { let h = -1e9; for (const v of arr) if (v <= t && v > h) h = v; return h }

// ── pixel bits
const NOTE_BM = ['...XX.', '...XXX', '...X.X', '...X..', '.XXX..', 'XXXX..', '.XX...']
const TEAR_BM = ['.T.', 'TTT', 'TTT', '.T.']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
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
    x.fillStyle = cols[ch] || cols.X; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// the guitar, built once as a cell map (neck pointing +x, origin at the sound hole)
const GUITAR = (() => {
  const cells = []
  const inBody = (u, v) => ((u + 6) / 5.4) ** 2 + (v / 5.2) ** 2 <= 1 || ((u - 0.6) / 4.2) ** 2 + (v / 4.1) ** 2 <= 1
  for (let j = -6; j <= 6; j++) for (let i = -13; i <= 23; i++) {
    const u = i + 0.5, v = j + 0.5
    let c = null
    if (inBody(u, v)) {
      c = (u + 2) ** 2 / 3.2 + v * v / 3.2 <= 1 ? 'hole' : (v < -3.2 ? 'hi' : v > 3.4 ? 'lo' : 'wood')
      if (i === -9 && j >= -2 && j <= 1) c = 'bridge'
    } else if (i >= 4 && i <= 17 && j >= -1 && j <= 0) c = (i % 3 === 0 && i > 4) ? 'fret' : 'neck'
    else if (i >= 18 && i <= 21 && j >= -2 && j <= 1) c = 'head'
    else if ((i === 18 || i === 20) && (j === -3 || j === 2)) c = 'peg'
    if (c) cells.push([i, j, c])
  }
  const set = new Set(cells.map(([i, j]) => i + ',' + j))
  const rim = []
  for (const [i, j] of cells) for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const k = (i + di) + ',' + (j + dj); if (!set.has(k)) { set.add(k); rim.push([i + di, j + dj]) } }
  return { cells, rim }
})()
const GCOL = { wood: '#e3964b', hi: '#f6bb73', lo: '#c27632', hole: '#2b170c', bridge: '#5a3010', neck: '#6b3b16', fret: '#e8d9b0', head: '#3b2010', peg: GOLD }

function drawGuitar(x, cx, cy, c, rot, vib, t) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK
  for (const [i, j] of GUITAR.rim) x.fillRect(i * c, j * c, c + 0.5, c + 0.5)
  for (const [i, j, k] of GUITAR.cells) { x.fillStyle = GCOL[k]; x.fillRect(i * c, j * c, c + 0.5, c + 0.5) }
  // strings: two bone hairlines from the bridge to the head, wobbling when strummed
  x.fillStyle = 'rgba(255,246,226,0.9)'
  for (const [k, sy] of [[0, -0.35], [1, 0.45]]) {
    for (let i = -8; i <= 18; i++) {
      const w = vib * Math.sin(i * 0.7 + t * 70 + k * 2) * c * 0.35 * Math.sin(Math.PI * (i + 8) / 26)
      x.fillRect(i * c, sy * c + w, c + 0.5, Math.max(1.5, c * 0.22))
    }
  }
  x.restore()
}

// a little pixel tambourine (ring + gold jingles), cells around (cx, cy)
function drawTambourine(x, cx, cy, c, rot, shake) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) {
    const d = Math.hypot(i + 0.5, j + 0.5)
    if (d > 6.2) continue
    x.fillStyle = d > 5.4 ? INK : d > 4.2 ? '#c98a1f' : d > 3.6 ? '#f7c948' : '#f4e6c8'
    x.fillRect(i * c, j * c, c + 0.5, c + 0.5)
  }
  for (let k = 0; k < 6; k++) {
    const a = k * Math.PI / 3 + 0.3, jx = Math.cos(a) * 4.8 * c + shake * Math.sin(k * 3.1) * c * 0.6, jy = Math.sin(a) * 4.8 * c
    x.fillStyle = INK; x.fillRect(jx - 1.5 * c, jy - 1.0 * c, 3 * c, 2 * c)
    x.fillStyle = '#fff1c8'; x.fillRect(jx - 1 * c, jy - 0.5 * c, 2 * c, c)
  }
  x.restore()
}

// ── layout
const SOLO = { x: 540, y: 1000, size: 330 }
const DUO_L = { x: 350, y: 1000, size: 300 }, DUO_R = { x: 775, y: 1015, size: 262 }
const LOW = 80
const lowK = t => ease.inOutCubic(prog(t, 8.57, 8.68))
const STAGE_Y = 1300
const AMPS = [{ x: 70, w: 150, top: 1150 }, { x: 860, w: 150, top: 1150 }]
const SIGN = { x: 540, y: 640, w: 520, h: 150 }

const PIS_HOPS = [T.pisIn + 0.3, T.flatter, T.themIn + 0.45, T.h2Land, T.heartAt]
const THEM_HOPS = [T.themIn + 0.3, ...TAMB.filter(v => v > T.jingle[0] && v < 8.5).filter((_, i) => i % 2 === 0), T.h2Land + 0.1, 9.62]

function pisState(t) {
  if (t < T.l1) return { mood: 'sleepy', look: [0, 1], zzz: false }                    // moping over the strings
  if (t < LT[0].done + 0.2) return { mood: 'wide', look: [0, -1], blink: false }        // …great? me?
  if (t < T.wink[0]) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.wink[1]) return { mood: 'wink' }
  if (t < T.l2) return { mood: 'happy' }
  if (t < T.themIn) return { mood: 'neutral', look: [0, 0] }
  if (t < T.themIn + 0.5) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.heartAt) return { mood: 'happy' }
  return { mood: 'heart' }
}
function themState(t) {
  if (t < T.themIn + 0.6) return { mood: 'happy' }
  if (t < T.h2) return { mood: 'neutral', look: [-1, 0] }
  return { mood: 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 120px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 60px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear | *Nashville.*', { top: 170, size: 120, accentSize: 190, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: PIS_LIGHT, lineHeight: 0.98, fit: true })
  const H1 = popText(root, 'Try a | *major key.*', { top: 170, size: 120, accentSize: 186, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 0.98, fit: true })
  const H2 = popText(root, 'Write a | *new* song.', { top: 170, size: 124, accentSize: 196, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: PINK, lineHeight: 0.98, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── the honky-tonk stage: planks, footlight glow, two little amps
  function drawStage(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    // warm footlight wash
    const g = x.createLinearGradient(0, STAGE_Y - 260, 0, STAGE_Y)
    g.addColorStop(0, 'rgba(255,170,90,0)'); g.addColorStop(1, 'rgba(255,170,90,0.16)')
    x.fillStyle = g; x.fillRect(0, STAGE_Y - 260, 1080, 260)
    // planks
    const P = 8
    for (let row = 0; row < 5; row++) {
      const y = STAGE_Y + row * P * 1.5
      x.fillStyle = row === 0 ? '#c98a4a' : row % 2 ? '#7a4a24' : '#8f5a2c'
      x.fillRect(0, y, 1080, P * 1.5)
      x.fillStyle = 'rgba(30,14,6,0.6)'
      for (let k = 0; k < 9; k++) x.fillRect(((k * 137 + row * 61) % 1080), y, P * 0.5, P * 1.5)
    }
    x.fillStyle = INK; x.fillRect(0, STAGE_Y - 4, 1080, 4)
    // footlights (little pixel bulbs) along the edge
    for (let k = 0; k < 9; k++) {
      const bx = 60 + k * 120, on = 0.6 + 0.4 * Math.sin(t * 3 + k * 1.3)
      glow(bx, STAGE_Y + 10, 46, '#ffc27a', 0.5 * on)
      x.fillStyle = '#ffe2b0'; x.fillRect(bx - 8, STAGE_Y + 2, 16, 8)
    }
    // amps
    for (const [n, A] of AMPS.entries()) {
      const h = STAGE_Y - A.top, P2 = 6
      x.fillStyle = INK; x.fillRect(A.x - P2, A.top - P2, A.w + 2 * P2, h + P2)
      x.fillStyle = '#2b2236'; x.fillRect(A.x, A.top, A.w, h)
      x.fillStyle = '#3d3150'; x.fillRect(A.x, A.top, A.w, P2 * 3)
      // knobs
      for (let k = 0; k < 4; k++) { x.fillStyle = GOLD; x.fillRect(A.x + 18 + k * 32, A.top + 6, P2, P2) }
      // grille
      x.fillStyle = '#1a1424'; x.fillRect(A.x + 12, A.top + 30, A.w - 24, h - 42)
      const pulse = t > T.jingle[0] ? 0.5 + 0.5 * Math.sin(t * 11.3 + n) : 0.15
      x.fillStyle = rgba('#8c7aa8', 0.35 + 0.25 * pulse)
      for (let j = 0; j < 8; j++) for (let i = 0; i < 9; i++) if ((i + j) % 2 === 0) x.fillRect(A.x + 18 + i * 13, A.top + 36 + j * 13, 5, 5)
    }
    x.restore()
  }

  // ── the neon sign: "SAD SONGS / NIGHTLY" → SAD flickers out → "NEW" flickers on
  function flick(t, [a, b], seed) {          // 0 → 1 with a flicker
    if (t < a) return 0
    if (t >= b) return 1
    const p = (t - a) / (b - a), k = Math.floor(p * 9 + seed)
    return [0, 1, 0, 0, 1, 0, 1, 1, 0.4, 1][k % 10]
  }
  function drawSign(t, a) {
    if (a <= 0) return
    const { x: cx, y: cy, w, h } = SIGN
    const sad = 1 - flick(t, T.sadOff, 0), neu = flick(t, T.newOn, 3)
    const buzz = 0.92 + 0.08 * Math.sin(t * 37) * Math.sin(t * 5.3)
    x.save(); x.globalAlpha = a
    // backing board
    x.fillStyle = 'rgba(14,8,30,0.82)'; x.beginPath(); x.roundRect(cx - w / 2, cy - h / 2, w, h, 22); x.fill()
    // tube border
    x.lineWidth = 7; x.strokeStyle = rgba(NEON, 0.95 * buzz); x.shadowColor = NEON; x.shadowBlur = 26
    x.beginPath(); x.roundRect(cx - w / 2 + 10, cy - h / 2 + 10, w - 20, h - 20, 16); x.stroke()
    // the words
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `700 62px ${MONO}`
    const wSad = x.measureText('SAD ').width, wSongs = x.measureText('SONGS').width, total = wSad + wSongs
    const left = cx - total / 2, ty = cy - 18
    // SONGS (always on, cyan)
    x.fillStyle = rgba('#8fe8ff', buzz); x.shadowColor = '#4fd6ff'
    x.textAlign = 'left'; x.fillText('SONGS', left + wSad, ty)
    // SAD (blue tube) → dark tube, then NEW (gold)
    if (sad > 0) { x.fillStyle = rgba(SADBLUE, sad * buzz); x.shadowColor = SADBLUE; x.fillText('SAD', left, ty) }
    if (sad < 1 && neu <= 0) { x.shadowBlur = 0; x.fillStyle = 'rgba(80,70,110,0.55)'; x.fillText('SAD', left, ty) }
    if (neu > 0) { x.shadowBlur = 30; x.fillStyle = rgba(GOLD, neu); x.shadowColor = GOLD; x.fillText('NEW', left, ty) }
    x.textAlign = 'center'; x.font = `700 30px ${MONO}`; x.shadowBlur = 16; x.shadowColor = NEON
    x.fillStyle = rgba('#ffc2dd', 0.9 * buzz)
    x.letterSpacing = '10px'; x.fillText('NIGHTLY', cx + 5, cy + 40); x.letterSpacing = '0px'
    x.restore()
    if (t > T.newOn[1] && t < T.newOn[1] + 0.8) sparkles(t, left + 50, ty, T.newOn[1], 8, 90, 2, [GOLD, BONE, PINK])
  }

  // notes: sad ones sink and droop (blue), happy ones bounce up (gold / pink)
  function drawNotes(t, gxp, gyp) {
    for (const [k, s] of SAD_STRUMS.entries()) {
      const life = 1.7, p = (t - s) / life
      if (p < 0 || p >= 1 || s > T.l2) continue
      const side = k % 2 ? 1 : -1
      const nx = gxp + side * (60 + 70 * p) + Math.sin(p * 5 + k) * 10, ny = gyp + 20 + p * 170
      drawBits(x, NOTE_BM, { X: SADBLUE }, Math.round(nx), Math.round(ny), 9, { rot: side * (0.2 + p * 0.6), alpha: Math.sin(Math.PI * p) * 0.95 })
    }
    for (const [k, s] of HAPPY_STRUMS.entries()) {
      const life = 1.2, p = (t - s) / life
      if (p < 0 || p >= 1) continue
      const side = k % 2 ? 1 : -1
      const nx = gxp + side * (50 + 190 * p), ny = gyp - 60 - 250 * ease.outCubic(p) + Math.abs(Math.sin(p * 9)) * -24
      drawBits(x, NOTE_BM, { X: k % 3 === 0 ? PINK : GOLD }, Math.round(nx), Math.round(ny), 8, { rot: Math.sin(p * 10 + k) * 0.3, alpha: Math.sin(Math.PI * Math.min(1, p * 1.3)) })
    }
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, PIS_LIGHT]) {
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.17, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 240 + Math.sin(p * 7 + i) * 18), Math.round(cy - 80 - p * 240), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const duo = ease.inOutCubic(prog(t, T.themIn - 0.25, T.themIn + 0.25)), lk = lowK(t)
    const L = { x: lerp(SOLO.x, DUO_L.x, duo), y: lerp(SOLO.y, DUO_L.y, duo) + LOW * lk, size: lerp(SOLO.size, DUO_L.size, duo) * (1 + 0.1 * lk) }
    const pp = pop01(t, T.pisIn, 0.4, 2.0) * ok
    if (pp <= 0.02) return
    // strum: a little squash on every strum
    const strums = t < T.l2 ? SAD_STRUMS : HAPPY_STRUMS
    const ls = t - lastOf(strums, t), strumK = ls >= 0 && ls < 0.5 ? Math.exp(-ls * 9) : 0
    const st = pisState(t)
    const rP = drawStarChar(x, L.x, L.y, L.size, t, { color: PIS.color, glyph: PIS.glyph, ...st, hops: PIS_HOPS, pop: pp, squash: 0.06 * strumK, seed: 4, glow: t > T.h2 ? 1.35 : 1.05 })

    // the tear (sad part only)
    for (const t0 of T.tears) {
      const p = (t - t0) / 0.8
      if (p < 0 || p >= 1) continue
      drawBits(x, TEAR_BM, { T: '#9fd0ff' }, Math.round(rP.x - L.size * 0.15), Math.round(rP.y - L.size * 0.02 + p * L.size * 0.32), Math.max(4, L.size / 50), { alpha: Math.sin(Math.PI * Math.min(1, p * 1.4)) })
    }

    // the guitar, held across the lower right of the star
    const gc = Math.max(4, Math.round(L.size / 32)) * pp
    const gxp = rP.x + L.size * 0.06, gyp = rP.y + L.size * 0.2
    const happy = t > T.jingle[0]
    const rock = happy ? 0.07 * Math.sin(t * 11.3) : 0.03 * Math.sin(t * 2)
    drawGuitar(x, gxp, gyp, gc, -0.52 + rock - 0.08 * strumK, strumK, t)
    drawNotes(t, gxp + 30, gyp - 40)

    // the date star with the tambourine
    const tp = pop01(t, T.themIn, 0.38, 2.1) * ok
    let rT = null
    if (tp > 0.02) {
      const drop = 1 - ease.outCubic(prog(t, T.themIn - 0.1, T.themIn + 0.22))
      const R = { x: DUO_R.x + drop * 300, y: DUO_R.y - drop * 200 + LOW * lk, size: DUO_R.size * (1 + 0.1 * lk) }
      rT = drawStarChar(x, R.x, R.y, R.size, t, { color: THEM, ...themState(t), hops: THEM_HOPS, pop: tp, seed: 9, glow: 1 })
      const lt = t - lastOf(TAMB, t), shake = lt >= 0 && lt < 0.3 ? Math.exp(-lt * 12) : 0
      const tc = Math.max(4, Math.round(R.size / 40)) * tp
      drawTambourine(x, rT.x + R.size * 0.42, rT.y - R.size * 0.05 - shake * 14, tc, 0.3 + 0.35 * shake * Math.sin(lt * 60), shake)
      if (shake > 0.3) { x.save(); x.globalAlpha = shake; drawPixelStar(x, rT.x + R.size * 0.42 + 60, rT.y - R.size * 0.2, 22, 2, '#fff1c8'); x.restore() }
    }
    // effects
    sparkles(t, rP.x, rP.y, T.flatter, 10, 220, 1)
    if (rT) sparkles(t, (rP.x + rT.x) / 2, rP.y - 40, T.themIn + 0.2, 12, 300, 3, [GOLD, PINK, BONE])
    if (t > T.heartAt) floatHearts(t, rP.x, rP.y, T.heartAt, T.out[0], 2, 6)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.55, SKY_H.zoom, ss), dy: lerp(-20, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, dim: (base.dim ?? 1) * 0.82 })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.05) {
        const sa = popOut(t, [T.out[0] - 0.05, T.out[1]])
        drawStage(t, sa)
        drawGhostCameo(x, t, { x: AMPS[0].x + AMPS[0].w / 2, y: AMPS[0].top - 6, at: T.ghost, dur: 1.35, from: 'below', cell: 3.4 })
        drawSign(t, sa * clamp(prog(t, 0.2, 0.5)))
        drawStars(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.58 (H0 out → "Try a major key.") and 8.62 (box shut → the last line). cardfx keeps 8.62.
const CUTS = [5.58, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
// a strum = four quick plucks; sad ones are low and minor-ish, happy ones bright
const strum = (t0, tones, gain, gap = 0.022) => tones.map((f, i) => ['pluck', +(t0 + i * gap).toFixed(3), f, gain * (1 - i * 0.12), 0.7, -0.2 + i * 0.12])
export const CUES = [
  ...wordPops(T.h0, 1, 0.1, 0, 0.026), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['pop', T.pisIn + 0.05, 659.25, 0.04, 0], ['tick', 0.3, 0.03], ['tick', 0.36, 0.02],
  ...SAD_STRUMS.filter(s => s < T.l2).flatMap((s, i) => strum(s, i % 2 ? [220, 261.63, 329.63, 440] : [246.94, 293.66, 349.23, 440], 0.032)),
  ...T.tears.map(t0 => ['pop', +(t0 + 0.7).toFixed(3), 392, 0.022, -0.2]),
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [NARR]: 880 } }),
  ['glitter', T.flatter, T.flatter + 0.4], ['pluck', T.wink[0], 1318.51, 0.03, 0.5, 0.2],
  ...wordPops(T.h1, 2, 0.08, 2, 0.025), ['pop', T.h1Land, 1046.5, 0.045, 0], ['pop', T.h1Land + 0.14, 1318.51, 0.045, 0],
  ['tick', T.sadOff[0] + 0.05, 0.03], ['tick', T.sadOff[0] + 0.14, 0.02], ['tick', T.sadOff[0] + 0.3, 0.025],
  ['whoosh', T.themIn - 0.12, 0.35, 0.03], ['pop', T.themIn + 0.1, 783.99, 0.045, 0.4], ['pop', T.themIn + 0.45, 523.25, 0.03, -0.2],
  ...HAPPY_STRUMS.flatMap((s, i) => strum(s, i % 2 ? [392, 523.25, 659.25, 783.99] : [349.23, 440, 523.25, 698.46], 0.026, 0.016)),
  ...TAMB.flatMap(s => [['tick', s, 0.03], ['tick', +(s + 0.03).toFixed(3), 0.018]]),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pop', T.h2Land + 0.14, 1318.51, 0.05, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ['tick', T.newOn[0] + 0.05, 0.03], ['tick', T.newOn[0] + 0.2, 0.025], ['bell', T.newOn[1], 1567.98, 0.03, 1.2, -0.2],
  ['pluck', T.heartAt, 1174.66, 0.04, 0.5, 0], ['bell', T.heartAt + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
