// st4surprise (20 s vertical, Star Talk season 4 · EP 084 · thread B7, Leo × Aquarius) · story 0–15.6, then the end card.
//   0.00–6.20  "Leo plans a | *surprise.*"  The ♌ Leo star (crown on) builds the big public kind: a spotlight clunks on,
//              a "SURPRISE!" banner unrolls on bunting, a crowd of little stars pops up cheering. Leo, heart-eyed at its own
//              production. Drop (2.82): ♒ Aquarius (fixed air, the private one, headphones on) walks in → the crowd
//              cheers, confetti blasts → Aquarius FREEZES: wide eyes, shrinks, trembles, one sweat drop.
//              Box, LEO: "too much?"
//   6.30–9.90  "Read the | *room.*"  THE STARS: "the best surprise is about *them*, not the show." → Leo nods; the banner
//              drops, the crowd poofs away one by one, the spotlight clicks off. Aquarius un-shrinks.
//   10.0       card cut (flip) → a quiet rooftop, the city low below. Two cups, a second pair of headphones.
//   10.1–15.5  "Surprise them | *their* way."  Leo puts the second pair on; Aquarius goes sparkle-eyed, leans in;
//              soft notes drift from both headphones; both go heart-eyed. Everything pops out by 15.5; end card at 15.6.
// Easter eggs: the seed constellation (EP 084) top-left, the frame's EP cartouche, the ghost peeks over the parapet.
// One canvas, DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 84
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', HOT = '#ff4fd8', MINT = '#7dffb0', CYANL = '#8af0ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const LEO = signStar('leo'), AQU = signStar('aquarius')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.55, h0Out: [6.0, 6.2],
  leoIn: 0.35, spot: 0.9, banner: [1.3, 1.9], crowd: 1.95, proud: 2.4,
  aqIn: BEAT(4) + 0.02, cheer: 3.25, freeze: 3.4,                       // the drop: 2.82
  open: 4.12, l1: 4.32,
  h1: 6.3, h1Land: 6.62, l2: 6.42, nod: 8.5, scrap: [8.65, 9.6], spotOff: 9.35,
  close: 9.9, h1Out: [9.72, 9.9],
  cut: 10.0,
  roof: 10.02, h2: 10.12, h2Land: 10.52, phonesOn: [10.95, 11.35], aqSparkle: 11.4, notes: 11.6, lean: [12.2, 12.8], aqHeart: 12.9, leoHeart: 13.25,
  h2Out: [15.2, 15.42], out: [15.08, 15.48],
  ghost: 13.6,
}
const LEO_TAG = '♌ LEO', NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: LEO_TAG, text: 'too much?', color: LEO.color },
  { t: T.l2, speaker: NARR, text: 'the best surprise is about *them*, not the show.' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const BEATS = Array.from({ length: 30 }, (_, i) => +BEAT(i).toFixed(3))

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const hash = (i, k = 1) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s) }

// ── pixel bits
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const NOTE_BM = ['...XX.', '...XXX', '...X.X', '...X..', '.XXX..', 'XXXX..', '.XX...']
const DROP = ['..X..', '.XWX.', 'XWXXX', 'XXXXX', '.XXX.']
const MUG = ['M.......', 'MMMMMMM.', 'MWWWWMMM', 'MMMMMM.M', 'MMMMMMMM', 'MMMMMM..', '.MMMM...']
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
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

// ── layout
const LEO_A = { x: 380, y: 1010, size: 290 }, AQ_A = { x: 790, y: 1040, size: 250 }
const LEO_B = { x: 370, y: 1085, size: 310 }, AQ_B = { x: 715, y: 1095, size: 292 }
const BANNER_Y = 640
const CROWD = Array.from({ length: 9 }, (_, i) => ({ x: 70 + i * 117 + (i % 2) * 10, y: 1265 + (i % 2) * 28, s: 92 + (i % 3) * 12, col: [BONE, '#ffd9a8', '#cfe3ff', '#ffc2dd'][i % 4], seed: 20 + i }))
const PARAPET = 1300

const LEO_HOPS = [T.leoIn + 0.3, T.spot + 0.1, T.banner[1], T.proud, T.l1, T.l1 + 0.2, T.nod, T.nod + 0.3, T.phonesOn[1], T.leoHeart]
const AQ_HOPS = [T.aqIn + 0.25, T.scrap[1] + 0.1, T.aqSparkle, T.aqHeart]

function leoState(t) {
  if (t < T.proud) return { mood: 'happy' }
  if (t < T.freeze + 0.2) return { mood: 'heart' }                               // in love with its own production
  if (t < T.l1) return { mood: 'wide', look: [1, 0], blink: false }              // …uh oh
  if (t < T.l2) return { mood: 'neutral', look: [1, 0] }
  if (t < LT[1].done) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.roof) return { mood: 'neutral', look: [1, 0] }
  if (t < T.phonesOn[1]) return { mood: 'neutral', look: [1, 0] }
  if (t < T.leoHeart) return { mood: 'happy' }
  return { mood: 'heart' }
}
function aqState(t) {
  if (t < T.freeze) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.scrap[1]) return { mood: 'wide', look: [0, 0], blink: false }        // frozen
  if (t < T.roof) return { mood: 'happy' }
  if (t < T.phonesOn[1]) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.aqHeart) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'heart' }
}

async function build(stage) {
  try {
    await Promise.all(["800 120px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "900 78px Inter", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Leo plans a | *surprise.*', { top: 170, size: 116, accentSize: 190, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: LEO.color, lineHeight: 0.98, fit: true })
  const H1 = popText(root, 'Read the | *room.*', { top: 170, size: 120, accentSize: 196, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: CYANL, lineHeight: 0.98, fit: true })
  const H2 = popText(root, 'Surprise them | *their* way.', { top: 170, size: 112, accentSize: 176, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 0.98, fit: true })
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

  // ── part A: the big show
  function spotOn(t) {
    const k = t - T.spot
    let on = k < 0 ? 0 : k < 0.05 ? 1 : k < 0.1 ? 0.25 : 1
    const off = t - T.spotOff
    if (off > 0) on *= off < 0.05 ? 0.2 : off < 0.1 ? 0.8 : 0
    return on
  }
  function drawSpot(t) {
    const on = spotOn(t)
    if (on <= 0) return
    const cx = lerp(LEO_A.x, (LEO_A.x + AQ_A.x) / 2, ease.inOutCubic(prog(t, T.aqIn, T.aqIn + 0.5))), PY = 1220, R = lerp(230, 430, ease.inOutCubic(prog(t, T.aqIn, T.aqIn + 0.5)))
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, -100, 0, PY)
    g.addColorStop(0, `rgba(255,236,190,${0.22 * on})`); g.addColorStop(1, `rgba(255,200,130,${0.12 * on})`)
    x.fillStyle = g
    x.beginPath(); x.moveTo(cx - 60, -100); x.lineTo(cx + 60, -100); x.lineTo(cx + R, PY); x.lineTo(cx - R, PY); x.closePath(); x.fill()
    x.translate(cx, PY); x.scale(1, 0.2)
    const p = x.createRadialGradient(0, 0, 0, 0, 0, R * 1.05)
    p.addColorStop(0, `rgba(255,214,150,${0.4 * on})`); p.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = p; x.beginPath(); x.arc(0, 0, R * 1.05, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function drawBanner(t) {
    const un = ease.outCubic(prog(t, ...T.banner)), fall = prog(t, T.scrap[0], T.scrap[0] + 0.55)
    if (un <= 0 || fall >= 1) return
    const dy = ease.inQuad(fall) * 900, rot = fall * 0.35
    x.save(); x.translate(540, BANNER_Y + dy); x.rotate(rot); x.globalAlpha = 1 - ease.inQuad(fall)
    // bunting string (sags), little triangle flags
    const half = 470 * un
    x.fillStyle = INK
    for (let i = 0; i <= 40; i++) { const u = i / 40, bx = lerp(-half, half, u), by = -70 + Math.sin(Math.PI * u) * 34; x.fillRect(bx - 3, by - 3, 6, 6) }
    const cols = [PINK, GOLD, CYANL, MINT, HOT]
    for (let i = 0; i < 14; i++) {
      const u = (i + 0.5) / 14, bx = lerp(-half, half, u), by = -70 + Math.sin(Math.PI * u) * 34
      x.fillStyle = INK; x.beginPath(); x.moveTo(bx - 20, by - 2); x.lineTo(bx + 20, by - 2); x.lineTo(bx, by + 40); x.closePath(); x.fill()
      x.fillStyle = cols[i % cols.length]; x.beginPath(); x.moveTo(bx - 15, by + 1); x.lineTo(bx + 15, by + 1); x.lineTo(bx, by + 32); x.closePath(); x.fill()
    }
    // the sign itself, unrolling from the centre
    const w = 640 * un, h = 120
    x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 + 30 - 8, w + 16, h + 16)
    x.fillStyle = '#ff3d8a'; x.fillRect(-w / 2, -h / 2 + 30, w, h)
    x.fillStyle = '#ff86b8'; x.fillRect(-w / 2, -h / 2 + 30, w, 10)
    x.save(); x.beginPath(); x.rect(-w / 2, -h / 2 + 30, w, h); x.clip()
    x.font = `900 78px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillText('SURPRISE!', 4, 36); x.fillStyle = '#fff6e6'; x.fillText('SURPRISE!', 0, 32)
    x.restore()
    x.restore()
  }
  function drawCrowd(t) {
    CROWD.forEach((m, i) => {
      const pin = pop01(t, T.crowd + i * 0.07, 0.3, 2.4)
      const gone = prog(t, T.scrap[0] + 0.15 + i * 0.07, T.scrap[0] + 0.35 + i * 0.07)
      const pk = pin * (1 - ease.inCubic(gone))
      if (pk <= 0.02) return
      const cheering = t > T.cheer && t < T.scrap[0]
      const hops = cheering ? BEATS.filter((b, k) => b > T.cheer && b < 8.6 && (k + i) % 2 === 0) : [T.crowd + i * 0.07 + 0.25]
      drawStarChar(x, m.x, m.y, m.s, t, { color: m.col, mood: cheering ? (i % 3 ? 'happy' : 'wide') : 'neutral', look: [i < 4 ? 1 : -1, -1], pop: pk, seed: m.seed, glow: 0.5, hops, tips: false })
      if (gone > 0 && gone < 1) sparkles(t, m.x, m.y, T.scrap[0] + 0.25 + i * 0.07, 6, 50, i, [BONE, GOLD])
    })
  }
  function confetti(t, cx, cy, t0, n, spread, seed) {
    const tt = t - t0
    if (tt < 0 || tt > 2) return
    const cols = [GOLD, PINK, MINT, CYANL, HOT, '#ff7a5c']
    x.save()
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (hash(i, seed) - 0.5) * 2.6, v = spread * (0.6 + 0.6 * hash(i, seed + 1))
      const px = cx + Math.cos(a) * v * tt + Math.sin(tt * 6 + i) * 12, py = cy + Math.sin(a) * v * tt + 420 * tt * tt
      x.globalAlpha = 1 - ease.inQuad(tt / 2)
      x.fillStyle = cols[i % cols.length]
      const s = 9 + (i % 3) * 3
      x.fillRect(Math.round(px), Math.round(py), s, Math.max(3, s * Math.abs(Math.sin(tt * 9 + i))))
    }
    x.restore()
  }

  // ── part B: the quiet rooftop
  function drawRooftop(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    // the city, low and far: generic blocks with a few warm windows
    for (let i = 0; i < 14; i++) {
      const bw = 60 + hash(i, 3) * 70, bx = i * 80 - 20, bh = 170 + hash(i, 4) * 260
      x.fillStyle = i % 2 ? '#24184c' : '#2c1f5a'; x.fillRect(bx, PARAPET - bh, bw, bh)
      for (let k = 0; k < 14; k++) if (hash(i * 9 + k, 6) > 0.5) { x.fillStyle = rgba('#ffcf7a', 0.55 + 0.4 * Math.sin(t * 0.7 + k + i)); x.fillRect(bx + 10 + (k % 3) * 18, PARAPET - bh + 18 + Math.floor(k / 3) * 30, 8, 10) }
    }
    // a little water tower on the right
    x.fillStyle = '#1a1036'; x.fillRect(900, 980, 110, 140); x.fillRect(890, 960, 130, 24); x.fillRect(915, 1120, 8, 180); x.fillRect(987, 1120, 8, 180)
    // the parapet (brick), lit softly
    x.fillStyle = INK; x.fillRect(0, PARAPET - 6, 1080, 6)
    x.fillStyle = '#2a1a3a'; x.fillRect(0, PARAPET + 70, 1080, 1920 - PARAPET - 70)
    x.fillStyle = 'rgba(10,6,24,0.35)'; for (let row = 0; row < 26; row++) for (let k = 0; k < 9; k++) x.fillRect(k * 130 + (row % 2) * 65, PARAPET + 80 + row * 24, 4, 20)
    x.fillStyle = '#5a3a5a'; x.fillRect(0, PARAPET, 1080, 70)
    x.fillStyle = '#6e4a6a'; x.fillRect(0, PARAPET, 1080, 12)
    x.fillStyle = 'rgba(20,10,30,0.4)'
    for (let row = 0; row < 3; row++) for (let k = 0; k < 14; k++) x.fillRect(k * 80 + (row % 2) * 40, PARAPET + 14 + row * 19, 4, 17)
    // a string of tiny warm lights along the parapet
    for (let k = 0; k < 12; k++) { const lx = 50 + k * 90; glow(lx, PARAPET - 8, 34, '#ffc27a', 0.5); x.fillStyle = '#ffe2b0'; x.fillRect(lx - 5, PARAPET - 12, 10, 8) }
    x.restore()
  }
  function headphones(r, size, pop, col, { lift = 0, alpha = 1 } = {}) {
    const s = size * pop, c = Math.max(4, Math.round(s / 30))
    const cupY = r.y - s * 0.06 - lift * s * 0.9, cupX = s * 0.4
    const ry = -s * 0.44
    x.save(); x.globalAlpha *= alpha
    for (const [o, fillC] of [[1.5, INK], [1, '#3a2a6e']]) {
      for (let i = 0; i <= 26; i++) {
        const an = Math.PI * i / 26, bx = r.x - Math.cos(an) * cupX, by = cupY + Math.sin(an) * ry
        x.fillStyle = fillC; x.fillRect(Math.round(bx - c * o), Math.round(by - c * o), c * 2 * o, c * 2 * o)
      }
    }
    for (const sd of [-1, 1]) {
      const cx = r.x + sd * cupX, w = c * 5, h = c * 8
      x.fillStyle = INK; x.fillRect(Math.round(cx - w / 2 - c), Math.round(cupY - h / 2 - c), w + 2 * c, h + 2 * c)
      x.fillStyle = col; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), w, h)
      x.fillStyle = 'rgba(255,255,255,0.45)'; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), c, h)
      x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(Math.round(cx + w / 2 - c), Math.round(cupY - h / 2), c, h)
    }
    x.restore()
  }
  function drawCrown(r, size, pop) {
    const cell = Math.max(3, size / 36) * pop * 0.95
    drawBits(x, CROWN, CROWN_C, Math.round(r.x), Math.round(r.top + cell * 1.2), cell, { rot: -0.18 })
  }
  function softNotes(t, cx, cy, t0, cols, seed) {
    for (let i = 0; i < 10; i++) {
      const born = t0 + i * 0.42, p = (t - born) / 1.6
      if (p < 0 || p >= 1) continue
      const side = hash(i, seed) - 0.5
      drawBits(x, NOTE_BM, { X: cols[i % cols.length] }, Math.round(cx + side * 160 + Math.sin(p * 5 + i) * 14), Math.round(cy - p * 220), 6, { alpha: Math.sin(Math.PI * p) * 0.9 })
    }
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, CYANL]) {
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 6) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.2, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 220), Math.round(cy - 90 - p * 230), cell, { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawPartA(t) {
    drawSpot(t)
    drawBanner(t)
    drawCrowd(t)
    // Leo
    const lp = pop01(t, T.leoIn, 0.38, 2.1)
    const nod = t >= T.nod && t < T.nod + 0.6 ? 0.07 * Math.max(0, Math.sin((t - T.nod) * Math.PI / 0.15)) : 0
    const rL = drawStarChar(x, LEO_A.x, LEO_A.y, LEO_A.size, t, { color: LEO.color, glyph: LEO.glyph, ...leoState(t), hops: LEO_HOPS, pop: lp, seed: 3, glow: 1.15, squash: nod })
    if (lp > 0.05) drawCrown(rL, LEO_A.size, lp)
    if (t > T.proud && t < T.freeze + 0.3) floatHearts(t, rL.x, rL.y, T.proud, T.freeze - 0.2, 1)
    // Aquarius: walks in, freezes (shrinks, trembles, sweat), relaxes once the show is gone
    const ap = pop01(t, T.aqIn, 0.36, 2.0)
    if (ap > 0.02) {
      const walk = 1 - ease.outCubic(prog(t, T.aqIn - 0.15, T.aqIn + 0.35))
      const frz = ease.outCubic(prog(t, T.freeze, T.freeze + 0.25)) * (1 - ease.inOutCubic(prog(t, T.scrap[1] - 0.2, T.scrap[1] + 0.2)))
      const shake = frz > 0.5 ? Math.round(Math.sin(t * 60)) * 3 : 0
      const size = AQ_A.size * (1 - 0.16 * frz)
      const r = drawStarChar(x, AQ_A.x + walk * 360 + shake, AQ_A.y + frz * 30, size, t, { color: AQU.color, glyph: AQU.glyph, ...aqState(t), hops: AQ_HOPS, pop: ap, seed: 8, glow: 1 - 0.4 * frz, squash: 0.08 * frz })
      headphones(r, size, ap, HOT)
      if (frz > 0.3) {
        const p = ((t - T.freeze) % 1.2) / 1.2
        drawBits(x, DROP, { X: '#9fd0ff', W: '#ffffff' }, Math.round(r.x + size * 0.3), Math.round(r.y - size * 0.28 + p * 60), 6, { alpha: frz * Math.sin(Math.PI * p) })
      }
    }
    confetti(t, 540, 1150, T.cheer, 60, 700, 3)
  }
  function drawPartB(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const ra = clamp(prog(t, T.roof - 0.02, T.roof + 0.05)) * ok
    drawRooftop(t, ra)
    drawGhostCameo(x, t, { x: 950, y: PARAPET - 6, at: T.ghost, dur: 1.4, from: 'below', cell: 3.4 })
    // the two cups between them
    for (const [k, mx] of [[0, 505], [1, 600]]) {
      drawBits(x, MUG, { M: k ? '#8af0ff' : '#ffb35c', W: '#5a3420' }, mx, PARAPET - 34, 9 * ra, { flip: k === 1 })
      for (let s = 0; s < 3; s++) { const ph = (t * 0.5 + s / 3 + k * 0.2) % 1; x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph) * ra; x.fillStyle = '#fff1e0'; x.fillRect(mx - 6 + Math.sin(ph * 6 + s) * 6, PARAPET - 90 - ph * 70, 8, 8); x.restore() }
    }
    const lean = ease.inOutCubic(prog(t, ...T.lean))
    const rL = drawStarChar(x, LEO_B.x, LEO_B.y, LEO_B.size * ok, t, { color: LEO.color, glyph: LEO.glyph, ...leoState(t), hops: LEO_HOPS, seed: 3, glow: 1.15 })
    drawCrown(rL, LEO_B.size, ok)
    // the second pair: rests on the parapet, then hops onto Leo
    const on = prog(t, ...T.phonesOn)
    if (on <= 0) headphones({ x: 300, y: PARAPET - 60 + LEO_B.size * 0.06 }, 110 * ok, 1, GOLD)
    else headphones(rL, LEO_B.size, ok, GOLD, { lift: 1 - easeOutBack(on, 1.6) })
    const rA = drawStarChar(x, AQ_B.x - lean * 40, AQ_B.y, AQ_B.size * ok, t, { color: AQU.color, glyph: AQU.glyph, ...aqState(t), hops: AQ_HOPS, seed: 8, glow: 1.1, squash: lean * 0.03 })
    headphones(rA, AQ_B.size, ok, HOT)
    if (t > T.notes) { softNotes(t, rL.x, rL.y - 120, T.notes, [GOLD, '#ffd98a'], 1); softNotes(t, rA.x, rA.y - 120, T.notes + 0.2, [CYANL, HOT], 2) }
    sparkles(t, rL.x, rL.y - 80, T.phonesOn[1], 8, 140, 1, [GOLD, BONE])
    sparkles(t, rA.x, rA.y, T.aqSparkle, 10, 200, 2)
    if (t > T.aqHeart) floatHearts(t, (rL.x + rA.x) / 2, rA.y, T.aqHeart, T.out[0], 4)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.55, SKY_H.zoom, ss), dy: lerp(-20, 0, ss) } : SKY_H
      const quiet = t >= T.roof
      drawSky(x, t, { ...base, dim: (base.dim ?? 1) * (quiet ? 0.95 : lerp(1, 0.6, spotOn(t))) })
      drawSeedConstellation(x, t, EP)
      if (t < T.roof) drawPartA(t)
      else if (t < T.out[1] + 0.05) drawPartB(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.25 (H0 out → "Read the room.") and 10.0 (box shut → the rooftop). cardfx keeps 10.0.
const CUTS = [6.25, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['pop', T.leoIn + 0.05, 739.99, 0.045, 0],
  ['boom', T.spot, 0.16], ['tick', T.spot, 0.06], ['tick', T.spot + 0.11, 0.035],
  ['whoosh', T.banner[0], 0.5, 0.04], ['pop', T.banner[1], 1318.51, 0.04, 0],
  ...CROWD.map((_, i) => ['pop', +(T.crowd + i * 0.07 + 0.05).toFixed(3), NOTE[i % 7] * 1.5, 0.022, (i / 8 - 0.5)]),
  ['pluck', T.proud, 1174.66, 0.045, 0.5, 0], ['pluck', T.proud + 0.12, 1567.98, 0.04, 0.5, 0],
  ['pop', T.aqIn + 0.05, 659.25, 0.04, 0.4],
  ['boom', T.cheer, 0.22], ['glitter', T.cheer, T.cheer + 0.8], ['whoosh', T.cheer - 0.05, 0.5, 0.05],
  ...Array.from({ length: 14 }, (_, i) => ['pop', +(T.cheer + 0.05 + i * 0.045).toFixed(3), NOTE[(i * 3) % 7] * 2, 0.014, (i % 2 ? 0.5 : -0.5)]),
  ['chip', T.freeze + 0.05, 880, 0.35, { wave: 'square', duty: 0.25, slide: -14, gain: 0.02, decay: 0.3 }],     // record-scratch-ish slide down
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [LEO_TAG]: 739.99, [NARR]: 880 } }),
  ...wordPops(T.h1, 2, 0.08, 2, 0.025), ['pop', T.h1Land, 1046.5, 0.05, 0],
  ['tick', T.nod + 0.05, 0.03], ['tick', T.nod + 0.35, 0.03],
  ['whoosh', T.scrap[0], 0.5, 0.04], ...CROWD.map((_, i) => ['pop', +(T.scrap[0] + 0.25 + i * 0.07).toFixed(3), NOTE[(8 - i) % 7] * 1.5, 0.018, (i / 8 - 0.5)]),
  ['tick', T.spotOff, 0.05], ['tick', T.spotOff + 0.06, 0.03],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pop', T.h2Land + 0.14, 1318.51, 0.05, 0],
  ['whoosh', T.phonesOn[0], 0.3, 0.025], ['tick', T.phonesOn[1], 0.035], ['bell', T.aqSparkle, 1567.98, 0.025, 1.2, 0.3], ['glitter', T.aqSparkle, T.aqSparkle + 0.4],
  ['pluck', T.aqHeart, 1174.66, 0.04, 0.6, 0.2], ['pluck', T.leoHeart, 1318.51, 0.04, 0.6, -0.2], ['bell', T.leoHeart + 0.05, 1760, 0.022, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
