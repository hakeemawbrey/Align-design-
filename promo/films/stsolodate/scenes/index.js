// stsolodate — "Table for One." (45 s vertical Align ad, Star Talk season 3 #25) · story 0–40.6, then the shared end card.
//   0.00–5.0   "A date with | myself."  ♎ LIBRA alone at a candlelit table for two on a rooftop under fairy lights. A cloud
//              drifts in; ♋ CANCER (reading glasses), ♏ SCORPIO and ♓ PISCES peek over it. CANCER: "oh no. she's been
//              stood up." Pisces starts crying, just in case.
//   5.04       DROP. The date, in four gags: "Flowers? For me?" (a bouquet, to herself, sniff) · "A toast. To me." (she leans
//              across and clinks the empty seat's glass) · "I laugh at my own jokes." (HA HA HA, table shaking) · "Dessert
//              first." (a slice skids in before any dinner; record scratch, the cloud double-takes).
//              CANCER: "should we send someone?" … SCORPIO: "she's… having fun?"
//  12.2        card cut (flip) → the montage, the gossip cloud peeking from the bottom corner:
//              "The museum. Solo." (a SELF-PORTRAIT that winks back) · "Karaoke. Solo." (score 100, PERFECT; SCORPIO: "ok.
//              she's actually good.") · "Movies. Solo. Large popcorn." (a bucket bigger than she is).
//  19.43–23.3  "The gossip | is jealous."  The cloud close up. Cancer glances left, right… CANCER: "psst. waiter. dessert
//              first." A tiny cake lands on the cloud; then one for Scorpio too. Pisces cries into it.
//  23.33       card cut (deal) → "Dear | diary."  Her journal: "things I love:" fills in, line by line: my own laugh ·
//              museums, alone · karaoke (I'm great) · dessert first · me.  THE STARS: "you know what you like now."
//  28.93–33.3  ★ LESSON UNLOCKED over the journal: "You're not half | of anything. | You're whole."  +1 SELF-LOVE
//  33.3–37.2   "Tonight's deck."  Back at the table, her phone: five cards deal in, the middle one turns to a veiled card.
//              THE STARS: "when you're ready, the deck's ready."  She smiles, and goes back to her dessert.
//  37.27–40.6  "Table for one. | Then two."  The cloud peeks back, a RESERVED tent card pops on the empty seat, Libra winks.
//              Everything pops out by 40.45; the end card takes over at 40.6.
// One canvas (sky + scenes + stars + props), DOM headlines + dialogue boxes + the shared LESSON banner above it, grain
// on top. Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  drawTears, drawCandle, drawGlass, drawBouquet, drawCake, drawFork, drawGlasses, drawCloud, drawChairBack, drawBeret,
  drawMic, drawNote, drawPopcorn, drawSeat, drawPencil, drawTent, drawVase,
} from '../props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)     // 108 bpm grid
export const KEY = 'Bb'

// ── the timeline
export const T = {
  black: [0, 0.3],
  h0: 0.25, h0Land: 0.8, h0Out: [4.78, 4.95],
  cloudIn: 1.15, peek: [1.5, 1.66, 1.82], l1: 2.0, cry0: 3.55, closeA: 4.92,
  drop: BEAT(8),                                                             // 5.044: the date begins
  hF: 5.1, hFLand: 5.45, bouq: 5.18, sniff: 6.3, hFOut: [7.12, 7.28], l2: 5.6,
  vase: [7.3, 7.6],
  hT: 7.33, hTLand: 7.66, raise: [7.4, 7.7], lean: [7.85, 8.15], clink: 8.15, back: [8.55, 8.95], sob1: 8.45, hTOut: [9.22, 9.38],
  hJ: 9.42, hJLand: 9.8, ha: [9.62, 9.94, 10.26], laugh: [9.6, 10.85], hJOut: [10.82, 10.96], l3: 9.5,
  hD: 10.98, hDLand: 11.3, slide: [10.98, 11.3], scratch: 11.32, dbl: [11.42, 11.72], bite1: 11.6, hDOut: [12.02, 12.15],
  closeB: 12.12,
  cut1: 12.2,
  m1: BEAT(21), hM1: 12.3, hM1Land: 12.66, wink1: 13.75, nod: 13.4, mOut1: [14.3, 14.45],              // museum
  m2: BEAT(25), hM2: 14.52, hM2Land: 14.88, score: 15.88, l4: 14.88, closeC: 17.5, mOut2: [16.52, 16.67], // karaoke
  m3: BEAT(29), hM3: 16.75, hM3Land: 17.3, munch: [17.6, 18.2, 18.8], mOut3: [19.24, 19.4],              // movies
  swapG: 19.43,
  hG: 19.5, hGLand: 19.9, glance: [19.95, 20.3, 20.65], l5: 20.2, cakeC: 21.85, cakeS: 22.45, hGOut: [23.08, 23.24], closeD: 23.24,
  cut2: 23.33,
  hL: 23.42, hLLand: 23.72, items: [23.95, 24.45, 24.95, 25.45, 25.95], l6: 26.12, closeE: 28.8, hLOut: [28.66, 28.82],
  lesson: BEAT(51),                                                          // 28.933
  lessonOut: [33.05, 33.3],
  swapK: 33.3,
  h6: 33.42, h6Land: 33.78, phoneUp: [33.35, 33.75], deal: 33.82, dealGap: 0.1, flip: [34.7, 35.0], l7: 33.95,
  smile: 35.2, bite2: 36.2, phoneOut: [36.85, 37.12], closeF: 37.12, h6Out: [37.04, 37.2],
  h7: 37.32, h7Land: 37.86, peekBack: 37.45, tent: 38.35, wink: 38.95, bite3: 39.35,
  out: [40.05, 40.45], h7Out: [40.2, 40.44],
}

// ── the dialogue
const STARS = 'THE STARS', CANN = '♋ CANCER', SCON = '♏ SCORPIO'
const CANC = '#7fe0ff', SCOC = '#ff6f8e'
const LA_ = [{ t: T.l1, speaker: CANN, color: CANC, text: "oh no. she's been *stood up.*" }]
const LB_ = [
  { t: T.l2, speaker: CANN, color: CANC, text: 'should we send *someone?*' },
  { t: T.l3, speaker: SCON, color: SCOC, text: "she's… having *fun?*" },
]
const LC_ = [{ t: T.l4, speaker: SCON, color: SCOC, text: "ok. she's actually *good.*" }]
const LD_ = [{ t: T.l5, speaker: CANN, color: CANC, text: 'psst. waiter. *dessert first.*' }]
const LE_ = [{ t: T.l6, speaker: STARS, text: 'you know what you *like* now.' }]
const LF_ = [{ t: T.l7, speaker: STARS, text: "when you're ready, the deck's *ready.*" }]
export const ALL_LINES = [...LA_, ...LB_, ...LC_, ...LD_, ...LE_, ...LF_]
export const BOXES = [[LA_, T.closeA], [LB_, T.closeB], [LC_, T.closeC], [LD_, T.closeD], [LE_, T.closeE], [LF_, T.closeF]]
const CPS = 28
export const LT = lineTimes(ALL_LINES, { cps: CPS })
const STAR_HOPS = talkHops(ALL_LINES, STARS, { cps: CPS })
const CAN_HOPS = talkHops(ALL_LINES, CANN, { cps: CPS })
const SCO_HOPS = talkHops(ALL_LINES, SCON, { cps: CPS })

export const LESSON = { at: T.lesson, out: T.lessonOut, text: "You're not half | of anything. | You're *whole.*", chip: '+1 SELF-LOVE', accentColor: PINK, dim: 0.8 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inW = (t, [a, b]) => t >= a && t < b

/** which set we're on */
function sceneAt(t) {
  if (t < T.cut1) return 'table'
  if (t < T.m2) return 'museum'
  if (t < T.m3) return 'karaoke'
  if (t < T.swapG) return 'movies'
  if (t < T.cut2) return 'cloud'
  if (t < T.swapK) return 'journal'
  return 'table'
}

// ── the cast
const LIB = { ...signStar('libra'), seed: 23 }
const GOS = {
  can: { ...signStar('cancer'), seed: 5, dx: -130 },
  sco: { ...signStar('scorpio'), seed: 9, dx: 0 },
  pis: { ...signStar('pisces'), seed: 13, dx: 130 },
}
const LIB_AT = { table: [330, 1030, 250], museum: [360, 1150, 230], karaoke: [540, 1035, 290], movies: [430, 1090, 220], journal: [905, 1300, 170] }
const libHops = [1.0, 2.9, T.bouq + 0.05, T.raise[0], T.clink, ...T.ha, T.scratch, T.hM1, T.nod,
  ...Array.from({ length: 4 }, (_, i) => T.m2 + 0.1 + i * 0.5556), T.score, T.hM3, T.items[0], T.items[4], T.lesson + 0.1, T.smile, T.h7, T.wink]

// gossip cloud placements: { cx, cy, sc, k } (k = pop of the whole group) or null
function gossipAt(t) {
  if (t < T.cut1) return { cx: lerp(1320, 820, ease.outCubic(prog(t, T.cloudIn, T.cloudIn + 0.55))), cy: 640, sc: 1, k: 1, rise: T.peek }
  if (t < T.swapG) return { cx: 905, cy: 1772, sc: 0.6, k: pop01(t, T.m1 + 0.35, 0.36, 2), rise: null }
  if (t < T.cut2) return { cx: 540, cy: 960, sc: 2.0, k: 1, rise: null }
  if (t >= T.peekBack && t < T.out[1]) return { cx: lerp(1320, 820, ease.outCubic(prog(t, T.peekBack, T.peekBack + 0.45))), cy: 640, sc: 1, k: popOut(t, T.out), rise: [T.peekBack + 0.3, T.peekBack + 0.42, T.peekBack + 0.54] }
  return null
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 160px 'EB Garamond'", "italic 500 52px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-1.png')])
  const BACK = bake(backIm, 200), FACE = bake(faceIm, 360)
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HD = (text, o) => popText(root, text, { top: 200, size: 112, accentSize: 156, late: 1, wobble: true, lineHeight: 1.02, ...o })
  const HEADS = [
    [HD('A date with | *myself.*', { at: T.h0, lateAt: T.h0Land, accentColor: PINK, accentSize: 168 }), T.h0Out],
    [HD('Flowers? | *For me?*', { at: T.hF, lateAt: T.hFLand, late: 2, accentColor: PINK }), T.hFOut],
    [HD('A toast. | *To me.*', { at: T.hT, lateAt: T.hTLand, late: 2, accentColor: GOLD }), T.hTOut],
    [HD('I laugh at | my own *jokes.*', { at: T.hJ, lateAt: T.hJLand, accentColor: GOLD, gap: 0.06 }), T.hJOut],
    [HD('Dessert *first.*', { at: T.hD, lateAt: T.hDLand, size: 124, accentSize: 172, top: 230, accentColor: PINK, gap: 0.05 }), T.hDOut],
    [HD('The museum. | *Solo.*', { at: T.hM1, lateAt: T.hM1Land, accentColor: LAV }), T.mOut1],
    [HD('Karaoke. | *Solo.*', { at: T.hM2, lateAt: T.hM2Land, accentColor: PINK }), T.mOut2],
    [HD('Movies. Solo. | *Large* popcorn.', { at: T.hM3, late: 0, size: 104, accentSize: 150, gap: 0.09, accentColor: GOLD }), T.mOut3],
    [HD('The gossip | is *jealous.*', { at: T.hG, lateAt: T.hGLand, accentColor: MINT }), T.hGOut],
    [HD('Dear | *diary.*', { at: T.hL, lateAt: T.hLLand, accentColor: PINK, accentSize: 176 }), T.hLOut],
    [HD("Tonight's *deck.*", { at: T.h6, lateAt: T.h6Land, size: 118, accentSize: 166, top: 225, accentColor: LAV }), T.h6Out],
    [HD('Table for one. | *Then* two.', { at: T.h7, lateAt: T.h7Land, late: 2, size: 108, accentSize: 150, accentColor: PINK, gap: 0.08 }), T.h7Out],
  ]
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { lines, y: 1400, width: 960, height: 300, close, cps: CPS }))
  const lesson = buildLesson(root, LESSON)

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ─────────────────────────────── helpers
  function sparkles(t, cx, cy, t0, n, R, seed, dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.6 + 0.6 * p), cy + Math.sin(a) * R * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function glow(cx, cy, r, col, a) { if (a <= 0) return; const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0)); x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r) }
  function bubbleText(text, cx, cy, size, col, k, rot = 0) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineWidth = size * 0.22; x.strokeStyle = '#1b1236'; x.lineJoin = 'round'; x.strokeText(text, 0, 0)
    x.fillStyle = col; x.fillText(text, 0, 0)
    x.restore()
  }

  // ─────────────────────────────── the world: rooftop sky + fairy lights; per-set washes
  function drawWorld(t, scene) {
    drawSky(x, t, { ...SKY_H, dim: SKY_H.dim * 0.9, stars: 1 })
    if (scene === 'table') {
      // fairy lights: a sagging string with warm bulbs
      const y0 = 520, sag = 70
      x.strokeStyle = 'rgba(40,24,60,0.9)'; x.lineWidth = 4; x.beginPath()
      for (let i = 0; i <= 40; i++) { const u = i / 40, X = u * W, Y = y0 + sag * 4 * u * (1 - u) - 20 * u; i ? x.lineTo(X, Y) : x.moveTo(X, Y) }
      x.stroke()
      for (let i = 0; i < 17; i++) {
        const u = (i + 0.5) / 17, X = u * W, Y = y0 + sag * 4 * u * (1 - u) - 20 * u + 12
        const tw = 0.75 + 0.25 * Math.sin(t * 2.3 + i * 1.7), col = i % 3 === 0 ? PINK : i % 3 === 1 ? GOLD : LAV
        glow(X, Y, 40, col, 0.32 * tw)
        x.fillStyle = col; x.fillRect(Math.round(X - 6), Math.round(Y - 6), 12, 14); x.fillStyle = '#fffbea'; x.fillRect(Math.round(X - 3), Math.round(Y - 3), 5, 5)
      }
      // candle warmth
      glow(560, 1060, 520, '#ffb85a', 0.2 + 0.03 * Math.sin(t * 11) + (inW(t, T.laugh) ? 0.06 * Math.abs(Math.sin(t * 18)) : 0))
    } else if (scene === 'museum') {
      x.fillStyle = 'rgba(30,22,48,0.9)'; x.fillRect(0, 0, W, H)
      x.fillStyle = 'rgba(60,44,84,0.9)'; x.fillRect(0, 1240, W, 680)                    // floor
      x.fillStyle = 'rgba(242,199,92,0.25)'; x.fillRect(0, 1236, W, 6)
      const g = x.createLinearGradient(540, 470, 540, 1240); g.addColorStop(0, 'rgba(255,240,200,0.18)'); g.addColorStop(1, 'rgba(255,240,200,0)')
      x.fillStyle = g; x.beginPath(); x.moveTo(470, 470); x.lineTo(610, 470); x.lineTo(900, 1240); x.lineTo(180, 1240); x.fill()
    } else if (scene === 'karaoke') {
      x.fillStyle = 'rgba(40,10,50,0.86)'; x.fillRect(0, 0, W, H)
      for (let i = 0; i < 9; i++) { const X = 60 + i * 120, on = (Math.floor(t * 3.6) + i) % 3 === 0; glow(X, 520, 70, [PINK, LAV, GOLD][i % 3], on ? 0.4 : 0.12) }
      x.fillStyle = '#5a2a5e'; x.fillRect(0, 1185, W, 200); x.fillStyle = '#ff8fb1'; x.fillRect(0, 1185, W, 8)
      const g = x.createLinearGradient(540, 470, 540, 1190); g.addColorStop(0, 'rgba(255,220,240,0.26)'); g.addColorStop(1, 'rgba(255,220,240,0.04)')
      x.fillStyle = g; x.beginPath(); x.moveTo(500, 470); x.lineTo(580, 470); x.lineTo(800, 1190); x.lineTo(280, 1190); x.fill()
    } else if (scene === 'movies') {
      x.fillStyle = 'rgba(8,6,20,0.92)'; x.fillRect(0, 0, W, H)
      const fl = 0.75 + 0.25 * Math.sin(t * 7) * Math.sin(t * 3.1)
      const g = x.createLinearGradient(0, 470, 0, 1300); g.addColorStop(0, rgba('#8fd8f6', 0.3 * fl)); g.addColorStop(1, rgba('#8fd8f6', 0))
      x.fillStyle = g; x.beginPath(); x.moveTo(150, 470); x.lineTo(930, 470); x.lineTo(1080, 1300); x.lineTo(0, 1300); x.fill()
      x.fillStyle = rgba('#cdeeff', 0.8 * fl); x.fillRect(150, 462, 780, 10)
    } else if (scene === 'journal') {
      x.fillStyle = 'rgba(10,6,24,0.35)'; x.fillRect(0, 0, W, H)
    }
  }

  // ─────────────────────────────── the table set
  const TABLE = { l: 120, r: 960, top: 1136 }
  function drawTable(t) {
    const jig = inW(t, T.laugh) ? Math.round(4 * Math.sin(t * 40)) : 0
    // the empty seat's chair, behind
    drawChairBack(x, 770, 948, 12)
    return jig
  }
  function drawTableFront(t, jig) {
    const { l, r, top } = TABLE
    x.save(); x.translate(0, jig)
    x.fillStyle = '#2a1838'; x.fillRect(l - 6, top - 6, r - l + 12, 252)
    x.fillStyle = '#fff4e2'; x.fillRect(l, top, r - l, 16)
    x.fillStyle = '#efdcc0'; x.fillRect(l, top + 16, r - l, 214)
    x.fillStyle = '#e2c9a6'; for (let X = l + 30; X < r; X += 60) x.fillRect(X, top + 30, 8, 200)
    x.fillStyle = GOLD; x.fillRect(l, top + 196, r - l, 8)
    x.fillStyle = '#efdcc0'; for (let X = l; X < r; X += 42) x.fillRect(X + 6, top + 230, 30, 12)
    x.restore()
  }
  // Libra's glass path
  function libGlass(t) {
    const rest = [470, 1138], up = [478, 962], clk = [714, 1092]
    if (t < T.raise[0]) return { p: rest, rot: 0 }
    if (t < T.lean[0]) { const e = ease.outBack ? ease.outCubic(prog(t, ...T.raise)) : prog(t, ...T.raise); return { p: [lerp(rest[0], up[0], e), lerp(rest[1], up[1], e)], rot: 0.1 * Math.sin(t * 10) * (1 - e) } }
    if (t < T.back[0]) { const e = ease.inOutCubic(prog(t, ...T.lean)); return { p: [lerp(up[0], clk[0], e), lerp(up[1], clk[1], e)], rot: 0.25 * e - 0.25 * pulse(t, T.clink, 0.2) } }
    const e = ease.inOutCubic(prog(t, ...T.back)); return { p: [lerp(clk[0], rest[0], e), lerp(clk[1], rest[1], e)], rot: 0.25 * (1 - e) }
  }
  function bouquetAt(t) {
    if (t < T.bouq) return null
    const k = pop01(t, T.bouq, 0.36, 2.2)
    const held = [452, 1102], inVase = [190, 1078]
    const e = ease.inOutCubic(prog(t, ...T.vase))
    const sn = pulse(t, T.sniff, 0.6)
    return { x: lerp(held[0], inVase[0], e) - sn * 40, y: lerp(held[1], inVase[1], e) - Math.sin(Math.PI * e) * 120 - sn * 50, k, rot: lerp(-0.35, 0, e) - sn * 0.4 }
  }
  function cakeAt(t) {
    if (t < T.slide[0]) return null
    const e = ease.outCubic(prog(t, ...T.slide)), skid = pulse(t, T.slide[1], 0.25)
    let bites = t >= T.bite1 + 0.35 ? 1 : 0
    if (t >= T.bite2 + 0.35) bites = 2
    if (t >= T.bite3 + 0.35) bites = 3
    return { x: lerp(1240, 412, e) + skid * 10, y: TABLE.top - 2, bites }
  }
  /** the fork for a bite at tb: down to the cake, up to Libra's face */
  function forkAt(t, tb, cake, L) {
    const p = prog(t, tb - 0.25, tb + 0.55)
    if (p <= 0 || p >= 1 || !cake) return null
    const a = [cake.x + 60, cake.y - 120], b = [cake.x - 10 + 3 * 7, cake.y - 40], c = [L[0] + 40, L[1] + 30]
    if (p < 0.4) { const e = ease.inOutCubic(p / 0.4); return [lerp(a[0], b[0], e), lerp(a[1], b[1], e), 0.5] }
    const e = ease.inOutCubic((p - 0.4) / 0.6); return [lerp(b[0], c[0], e), lerp(b[1], c[1], e), lerp(0.5, -0.6, e)]
  }

  function drawTableSet(t) {
    const jig = drawTable(t)
    // Libra (behind the table)
    const L = libra(t)
    // Libra's held/bounced things after
    drawTableFront(t, jig)
    x.save(); x.translate(0, jig)
    drawCandle(x, 560, TABLE.top + 2, 7, t)
    // the empty seat's place setting
    x.fillStyle = '#2a1838'; x.fillRect(632, TABLE.top - 8, 140, 12); x.fillStyle = '#f6f0ff'; x.fillRect(636, TABLE.top - 8, 132, 6)
    drawGlass(x, 810, TABLE.top + 2, 7, { rot: -0.18 * pulse(t, T.clink, 0.35) })
    // tent card: RESERVED
    if (t >= T.tent) { const k = pop01(t, T.tent, 0.34, 2.4); x.save(); x.translate(700, TABLE.top - 6); x.scale(k, k); drawTent(x, 0, 0, 6); x.restore() }
    // vase
    if (t >= T.vase[0] + 0.2 && t < T.cut1) drawVase(x, 190, TABLE.top + 2, 8)
    // cake + fork
    const ck = cakeAt(t)
    if (ck) drawCake(x, ck.x, ck.y, 7, ck.bites)
    x.restore()
    if (t < T.cut1) { const g = libGlass(t); drawGlass(x, g.p[0], g.p[1], 7, { rot: g.rot }) } else drawGlass(x, 470, TABLE.top + 2, 7)
    const b = bouquetAt(t)
    if (b && t < T.cut1) { x.save(); x.translate(b.x, b.y); x.scale(b.k, b.k); drawBouquet(x, 0, 0, 9, { rot: b.rot }); x.restore() }
    for (const tb of [T.bite1, T.bite2, T.bite3]) {
      const f = forkAt(t, tb, ck, L)
      if (f) drawFork(x, f[0], f[1], 6, f[2])
      sparkles(t, L[0] + 40, L[1] + 40, tb + 0.5, 6, 70, tb, 0.45, 16)
    }
    // clink sparkle, HA HA HA, the skid
    sparkles(t, 760, 1060, T.clink, 10, 90, 0.4, 0.6, 22)
    T.ha.forEach((h, i) => { const k = pop01(t, h, 0.25, 2.6) * (1 - prog(t, T.laugh[1] - 0.15, T.laugh[1])); bubbleText('HA', 220 + i * 150, 820 - i * 30 + 8 * Math.sin(t * 20 + i), 74, [GOLD, PINK, LAV][i], k, (i - 1) * 0.18) })
    if (t >= T.slide[0] && t < T.slide[1] + 0.6) { x.save(); x.globalAlpha = 1 - prog(t, T.slide[1], T.slide[1] + 0.6); x.fillStyle = BONE; for (let i = 0; i < 4; i++) x.fillRect(Math.round((cakeAt(t)?.x ?? 0) + 90 + i * 34), TABLE.top - 30 + i * 9, 22, 5); x.restore() }
    // the phone + the deck
    drawPhone(t)
  }

  // ─────────────────────────────── Libra
  function libState(t, scene) {
    let mood = 'happy', look = [0, 0], squash = 0, dx = 0, dy = 0, blink
    if (scene === 'table' && t < T.cut1) {
      if (t < T.drop) { mood = t > T.l1 + 0.4 && t < T.cry0 ? 'neutral' : 'happy'; look = t > T.l1 + 0.4 && t < T.cry0 ? [1, -1] : [0, 0] }
      else if (t < T.hT) {
        mood = t < T.bouq + 0.45 ? 'wide' : 'sparkle'; look = [1, 1]
        if (t >= T.sniff - 0.1 && t < T.sniff + 0.8) { mood = 'happy'; squash = -0.12 * pulse(t, T.sniff, 0.6) }
      } else if (t < T.hJ) {
        mood = t < T.lean[0] ? 'wink' : 'happy'; look = t < T.lean[0] ? [0, 0] : [1, 0]
        dx = 80 * ease.inOutCubic(prog(t, ...T.lean)) * (1 - ease.inOutCubic(prog(t, ...T.back)))
      } else if (t < T.slide[0]) {
        mood = 'happy'
        if (inW(t, T.laugh)) { const k = t - T.laugh[0]; squash = 0.14 * Math.abs(Math.sin(k * 13)); dy = -10 * Math.abs(Math.sin(k * 13)) }
      } else {
        mood = t < T.slide[1] ? 'wide' : 'heart'; look = t < T.slide[1] ? [1, 1] : [0, 1]
      }
    } else if (scene === 'museum') {
      mood = t < T.nod ? 'squint' : 'happy'; look = [1, -1]
      squash = 0.1 * pulse(t, T.nod, 0.3) + 0.1 * pulse(t, T.nod + 0.35, 0.3)
    } else if (scene === 'karaoke') {
      mood = t < T.score ? 'happy' : 'sparkle'; look = t < T.score ? [0, -1] : [0, 0]
    } else if (scene === 'movies') {
      mood = 'wide'; look = [0, -1]; blink = false
      for (const m of T.munch) squash += 0.12 * pulse(t, m + 0.25, 0.3)
    } else if (scene === 'journal') {
      mood = t < T.items[4] + 0.3 ? 'happy' : 'heart'; look = [-1, -1]
      if (t >= T.lesson) { mood = 'sparkle'; look = [0, 0] }
    } else {                                                   // back at the table: deck + last line
      if (t < T.h7) {
        mood = t < T.flip[1] ? 'neutral' : 'happy'; look = [1, -1]
        if (t >= T.flip[1] - 0.05 && t < T.smile) mood = 'wide'
        if (t >= T.bite2 - 0.4) { mood = 'happy'; look = [1, 1] }
      } else {
        mood = 'heart'; look = [0, 0]
        if (t >= T.wink && t < T.wink + 0.9) { mood = 'wink'; look = [1, 0] }
      }
      for (const b of [T.bite2, T.bite3]) squash += 0.1 * pulse(t, b + 0.3, 0.3)
    }
    return { mood, look, squash, dx, dy, blink }
  }
  function libra(t) {
    const scene = sceneAt(t)
    const P = LIB_AT[scene]
    let pk = 1
    if (scene === 'table' && t < T.cut1) pk = pop01(t, 0.3, 0.4, 1.6)
    else if (scene === 'museum') pk = pop01(t, T.m1 + 0.05, 0.3, 2)
    else if (scene === 'karaoke') pk = pop01(t, T.m2 + 0.05, 0.3, 2)
    else if (scene === 'movies') pk = pop01(t, T.m3 + 0.05, 0.3, 2)
    else if (scene === 'journal') pk = pop01(t, T.cut2 + 0.1, 0.3, 2)
    else if (scene === 'table') pk = pop01(t, T.swapK + 0.03, 0.3, 2) * popOut(t, T.out)
    if (pk <= 0.02) return P
    const st = libState(t, scene)
    const R = drawStarChar(x, P[0] + st.dx, P[1] + st.dy, P[2], t, { color: LIB.color, glyph: P[2] >= 200 ? LIB.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: libHops, seed: LIB.seed, pop: pk, glow: 1.05 })
    const S = R.size
    if (scene === 'museum') drawBeret(x, R.x - S * 0.02, R.top + S * 0.16, S / 30, -0.3)
    if (scene === 'karaoke') {
      drawMic(x, R.x + S * 0.4, R.y + S * 0.05, S / 34, -0.5)
      for (let i = 0; i < 3; i++) { const ph = ((t - T.m2) * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = (1 - ph) * clamp((t - T.m2) * 3); drawNote(x, R.x + S * 0.45 + ph * 160 + 30 * Math.sin(ph * 9 + i), R.y - S * 0.1 - ph * 360, 9, [GOLD, PINK, LAV][i]); x.restore() }
    }
    return [R.x, R.y]
  }

  // ─────────────────────────────── the gossip cloud (Cancer in reading glasses, Scorpio, Pisces crying)
  function gosState(k, t) {
    let mood = 'wide', look = [-1, 1], squash = 0, tears = 0, blink
    if (t < T.cut1) {
      if (k === 'can' && t >= T.l1 && t < LT[0].done + 1) mood = 'squint'
      if (k === 'pis') { tears = t >= T.cry0 ? 0.8 : 0; mood = t >= T.cry0 ? 'squint' : 'wide' }
      if (t >= T.drop) {
        mood = t < T.hT ? 'sparkle' : t < T.hJ ? 'wide' : 'squint'
        if (k === 'pis') { tears = t >= T.sob1 ? 1 : 0.6; mood = t >= T.sob1 && t < T.hJ ? 'heart' : mood }
        if (k === 'can' && t >= T.l2 && t < T.l3) { mood = 'squint'; look = [0, 0] }
        if (k === 'sco' && t >= T.l3 && t < T.slide[0]) { mood = 'squint'; look = [0, 0] }
        if (t >= T.dbl[0] && t < T.dbl[1]) { mood = 'neutral'; look = [k === 'can' ? 1 : -1, 0]; blink = false }
        if (t >= T.dbl[1]) { mood = 'wide'; look = [-1, 1]; blink = false; squash = -0.2 * Math.exp(-(t - T.dbl[1]) * 6) * Math.cos((t - T.dbl[1]) * 20) }
      }
    } else if (t < T.swapG) {
      look = [-1, -1]
      if (t < T.m2) mood = 'squint'
      else if (t < T.m3) mood = t < T.score ? 'wide' : 'happy'
      else mood = k === 'sco' ? 'eyeroll' : 'squint'
      if (k === 'pis') tears = 0.7
    } else if (t < T.cut2) {
      look = [-1, 1]
      if (k === 'can') {
        mood = 'squint'
        const g = T.glance
        if (t >= g[0] && t < g[1]) look = [-1, 0]
        else if (t >= g[1] && t < g[2]) look = [1, 0]
        else if (t >= g[2]) look = [0, 0]
        if (t >= T.cakeC) { mood = 'heart'; look = [0, 1] }
      }
      if (k === 'sco') { mood = 'eyeroll'; if (t >= T.l5 + 0.4) { mood = 'squint'; look = [-1, 0] } if (t >= T.cakeS) { mood = 'happy'; look = [0, 1] } }
      if (k === 'pis') { tears = 1; mood = t >= T.cakeC ? 'sparkle' : 'squint' }
    } else {
      mood = 'happy'; look = [-1, 1]
      if (k === 'pis') { tears = 0.9; mood = 'sparkle' }
      if (k === 'can') mood = 'heart'
    }
    return { mood, look, squash, tears, blink }
  }
  function drawGossip(t) {
    const G = gossipAt(t)
    if (!G || G.k <= 0.02) return
    const { cx, cy, sc } = G
    const keys = ['can', 'sco', 'pis']
    const R = {}
    keys.forEach((k, i) => {
      const C = GOS[k]
      let dy = 0, pk = G.k
      if (G.rise) { const p = prog(t, G.rise[i], G.rise[i] + 0.38); if (p <= 0) return; dy = (1 - easeOutBack(p, 2.2)) * 80 * sc }
      const st = gosState(k, t)
      const S = 130 * sc
      const hops = k === 'can' ? CAN_HOPS : k === 'sco' ? SCO_HOPS : []
      R[k] = drawStarChar(x, cx + C.dx * sc, cy - 40 * sc + dy, S, t, { color: C.color, glyph: null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops, seed: C.seed, pop: pk, glow: 0.85, bob: S * 0.03 })
      if (k === 'can') { const r = R[k]; drawGlasses(x, r.x, r.y + r.size * 0.07, r.size * 0.057) }
    })
    drawCloud(x, cx, cy, 22 * sc, { alpha: clamp(G.k) })
    // cakes on the cloud
    if (t >= T.swapG && t < T.cut2) {
      for (const [k, tc] of [['can', T.cakeC], ['sco', T.cakeS]]) {
        if (t < tc) continue
        const kk = pop01(t, tc, 0.34, 2.4)
        x.save(); x.translate(cx + GOS[k].dx * sc + 10, cy + 24); x.scale(kk, kk); drawCake(x, 0, 0, 8, 0); x.restore()
        sparkles(t, cx + GOS[k].dx * sc, cy, tc, 8, 120, 0.3, 0.6, 22)
      }
    }
    if (t >= T.peekBack) { x.save(); x.translate(cx + GOS.can.dx + 10, cy + 12); const kk = pop01(t, T.peekBack + 0.7, 0.3, 2.4) * G.k; x.scale(kk, kk); drawCake(x, 0, 0, 5, 1); x.restore() }
    for (const k of keys) {
      const st = gosState(k, t), r = R[k]
      if (!r || st.tears <= 0) continue
      drawTears(x, [[r.x - r.size * 0.17, r.y + r.size * 0.07], [r.x + r.size * 0.17, r.y + r.size * 0.07]], t, 0, { cell: Math.max(4, r.size / 22), strength: st.tears })
    }
  }

  // ─────────────────────────────── the narrator (a gold star, THE STARS)
  function drawNarrator(t) {
    let P = null, k = 0
    if (t >= T.l6 - 0.35 && t < T.lesson) { P = [150, 1290, 140]; k = pop01(t, T.l6 - 0.35, 0.34, 2.2) * (1 - prog(t, T.lesson - 0.2, T.lesson)) }
    if (t >= T.l7 - 0.35 && t < T.closeF + 0.2) { P = [150, 660, 150]; k = pop01(t, T.l7 - 0.35, 0.34, 2.2) * (1 - prog(t, T.closeF - 0.1, T.closeF + 0.2)) }
    if (!P || k <= 0.02) return
    drawStarChar(x, P[0], P[1], P[2], t, { color: STAR.sky, mood: 'happy', look: [1, 0], hops: STAR_HOPS, seed: 3, pop: k, glow: 1.2 })
  }

  // ─────────────────────────────── the montage sets
  function drawMuseum(t) {
    const k = pop01(t, T.m1 + 0.02, 0.36, 1.8)
    const fx = 540, fy = 770, fw = 500, fh = 380
    x.save(); x.translate(fx, fy); x.scale(k, k)
    x.fillStyle = '#1b1236'; x.fillRect(-fw / 2 - 34, -fh / 2 - 34, fw + 68, fh + 68)
    x.fillStyle = '#d29a3a'; x.fillRect(-fw / 2 - 28, -fh / 2 - 28, fw + 56, fh + 56)
    x.fillStyle = GOLD; x.fillRect(-fw / 2 - 20, -fh / 2 - 20, fw + 40, fh + 40)
    x.fillStyle = '#d29a3a'; for (let i = 0; i < 14; i++) { x.fillRect(-fw / 2 - 20 + i * ((fw + 40) / 14), -fh / 2 - 20, 12, 8); x.fillRect(-fw / 2 - 20 + i * ((fw + 40) / 14), fh / 2 + 12, 12, 8) }
    x.fillStyle = '#1b1236'; x.fillRect(-fw / 2 - 4, -fh / 2 - 4, fw + 8, fh + 8)
    const g = x.createLinearGradient(0, -fh / 2, 0, fh / 2); g.addColorStop(0, '#2f6f78'); g.addColorStop(1, '#1d3f5a')
    x.fillStyle = g; x.fillRect(-fw / 2, -fh / 2, fw, fh)
    drawStarChar(x, 0, 18, 250, t, { color: LIB.color, glyph: LIB.glyph, mood: t >= T.wink1 && t < T.wink1 + 0.6 ? 'wink' : 'sparkle', look: [0, 0], blink: false, seed: 77, bob: 0, glow: 0.6 })
    x.restore()
    // the plaque
    if (k > 0.5) {
      x.fillStyle = '#1b1236'; x.fillRect(fx - 160, fy + fh / 2 + 48, 320, 54); x.fillStyle = GOLD; x.fillRect(fx - 156, fy + fh / 2 + 52, 312, 46)
      x.fillStyle = '#1b1236'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SELF-PORTRAIT', fx, fy + fh / 2 + 76)
    }
    sparkles(t, fx + 60, fy - 20, T.wink1, 8, 120, 0.2, 0.5, 20)
  }
  function drawRope(t) {
    for (const px of [120, 960]) { x.fillStyle = '#1b1236'; x.fillRect(px - 14, 1200, 28, 170); x.fillStyle = GOLD; x.fillRect(px - 10, 1204, 20, 162); x.fillRect(px - 18, 1188, 36, 20) }
    x.strokeStyle = '#a8233c'; x.lineWidth = 16; x.beginPath(); x.moveTo(120, 1212); x.quadraticCurveTo(540, 1330, 960, 1212); x.stroke()
    x.strokeStyle = '#e0405a'; x.lineWidth = 6; x.beginPath(); x.moveTo(120, 1208); x.quadraticCurveTo(540, 1322, 960, 1208); x.stroke()
    void t
  }
  function drawScore(t) {
    if (t < T.score) return
    const k = pop01(t, T.score, 0.36, 2.6)
    x.save(); x.translate(540, 1290); x.scale(k, k); x.rotate(-0.04)
    x.fillStyle = '#1b1236'; x.fillRect(-250, -62, 500, 124); x.fillStyle = GOLD; x.fillRect(-244, -56, 488, 112); x.fillStyle = '#140d2a'; x.fillRect(-234, -46, 468, 92)
    x.font = `700 58px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('100', -120, 4)
    x.font = `700 40px ${MONO}`; x.fillStyle = PINK; x.fillText('PERFECT!', 82, 4)
    x.restore()
    sparkles(t, 540, 1240, T.score, 14, 260, 0.1, 0.8, 26)
  }
  function drawMoviesFront(t, L) {
    // the bucket: bigger than she is
    const k = pop01(t, T.m3 + 0.25, 0.4, 2.2)
    x.save(); x.translate(760, 1335); x.scale(k, k); drawPopcorn(x, 0, 0, 27); x.restore()
    // kernels flying to her
    for (const m of T.munch) {
      const p = prog(t, m, m + 0.4)
      if (p <= 0 || p >= 1) continue
      for (let i = 0; i < 3; i++) {
        const q = clamp(p * 1.2 - i * 0.1), X = lerp(700, L[0] + 30, q), Y = lerp(980, L[1] + 20, q) - Math.sin(Math.PI * q) * 140
        x.fillStyle = '#1b1236'; x.fillRect(Math.round(X) - 2, Math.round(Y) - 2, 18, 18); x.fillStyle = '#fffbea'; x.fillRect(Math.round(X), Math.round(Y), 14, 14)
      }
    }
  }

  // ─────────────────────────────── the journal
  const ITEMS = ['my own laugh', 'museums, alone', "karaoke (I'm great)", 'dessert first', 'me.']
  function drawJournal(t) {
    const k = pop01(t, T.cut2 + 0.02, 0.4, 1.6)
    const pl = 170, pt = 520, pw = 740, ph = 740
    x.save(); x.translate(540, pt + ph / 2); x.rotate(-0.025); x.scale(k, k); x.translate(-540, -(pt + ph / 2))
    x.fillStyle = '#1b1236'; x.fillRect(pl - 10, pt - 10, pw + 20, ph + 20)
    x.fillStyle = '#a8233c'; x.fillRect(pl - 4, pt - 4, pw + 8, ph + 8)
    x.fillStyle = '#fbf3e2'; x.fillRect(pl + 10, pt + 10, pw - 20, ph - 20)
    x.fillStyle = 'rgba(127,150,220,0.35)'; for (let i = 0; i < 6; i++) x.fillRect(pl + 30, pt + 296 + i * 96, pw - 60, 3)
    x.fillStyle = 'rgba(255,111,142,0.5)'; x.fillRect(pl + 92, pt + 20, 3, ph - 40)
    for (let i = 0; i < 9; i++) { x.fillStyle = '#1b1236'; x.fillRect(pl + 50 + i * 80, pt - 26, 16, 44); x.fillStyle = '#c7b6ec'; x.fillRect(pl + 54 + i * 80, pt - 22, 8, 36) }
    x.fillStyle = '#2a1838'; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.font = `italic 500 64px ${SERIF}`; x.fillText('things I love:', pl + 116, pt + 150)
    let pen = null
    ITEMS.forEach((s, i) => {
      const t0 = T.items[i], p = prog(t, t0, t0 + 0.42)
      if (p <= 0) return
      const last = i === ITEMS.length - 1
      x.font = `italic 500 ${last ? 76 : 56}px ${SERIF}`
      const tw = x.measureText(s).width, Y = pt + 276 + i * 96
      x.save(); x.beginPath(); x.rect(pl + 110, Y - 90, (tw + 30) * p, 120); x.clip()
      x.fillStyle = last ? '#e0405a' : '#2a1838'; x.fillText(s, pl + 116, Y)
      x.restore()
      x.fillStyle = last ? '#e0405a' : '#5a4a78'; x.fillRect(pl + 52, Y - 26, 16, 16)
      if (p < 1) pen = [pl + 116 + tw * p, Y - 6]
      if (last && p >= 1) { const hk = pop01(t, t0 + 0.42, 0.3, 2.6); x.save(); x.translate(pl + 116 + tw + 60, Y - 26); x.scale(hk, hk); drawPixelHeart(0, 0, 7); x.restore() }
    })
    x.restore()
    if (!pen && t < T.items[0]) pen = [pl + 116, pt + 270]
    if (!pen) { const tl = T.items[4] + 0.42; pen = [lerp(pl + 420, 820, ease.inOutCubic(prog(t, tl, tl + 0.5))), lerp(pt + 590, 1200, ease.inOutCubic(prog(t, tl, tl + 0.5)))] }
    const wig = Math.sin(t * 40) * 4
    if (k > 0.5) drawPencil(x, pen[0] + wig, pen[1] - 4, 7, 2.6)
  }
  function drawPixelHeart(cx, cy, c) {
    const rows = ['.KK.KK.', 'KPPKPPK', 'KPPPPPK', '.KPPPK.', '..KPK..', '...K...']
    rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { if (r[i] === '.') continue; x.fillStyle = r[i] === 'K' ? '#1b1236' : '#ff5c7a'; x.fillRect(cx + (i - 3.5) * c, cy + (j - 3) * c, c, c) } })
  }

  // ─────────────────────────────── the phone + tonight's deck
  function drawPhone(t) {
    if (t < T.phoneUp[0] || t >= T.phoneOut[1]) return
    const k = easeOutBack(prog(t, ...T.phoneUp), 1.7) * (1 - ease.inCubic(prog(t, ...T.phoneOut)))
    if (k <= 0.01) return
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    x.save(); x.translate(705, 800 + (1 - k) * 200); x.rotate(0.05); x.scale(0.6 * k, 0.6 * k)
    x.save(); x.shadowColor = rgba(LAV, 0.6); x.shadowBlur = 70; rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#24164f'); g.addColorStop(0.6, '#3b2370'); g.addColorStop(1, '#5b2a74')
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.font = `700 34px ${MONO}`; x.fillText("TONIGHT'S", 0, sy + 120); x.fillStyle = GOLD; x.fillText('DECK', 0, sy + 162)
    // five backs fan in; the middle one rises and turns to a veiled card
    const FAN = [-24, -12, 0, 12, 24]
    FAN.forEach((deg, i) => {
      const t0 = T.deal + i * T.dealGap, p = prog(t, t0, t0 + 0.4)
      if (p <= 0) return
      const e = easeOutBack(p, 1.5), a = deg * Math.PI / 180
      const fx = Math.sin(a) * 300, fy = 380 - Math.cos(a) * 300 + 120
      let cx = lerp(0, fx, e), cy = lerp(700, fy, e), rot = lerp(a * 2 + 0.4, a, e), cw = 112
      if (i === 2) {
        const r = ease.inOutCubic(prog(t, T.flip[0] - 0.35, T.flip[0])), f = prog(t, ...T.flip)
        cy = lerp(cy, 40, r); cw = lerp(112, 230, r)
        const s2 = Math.cos(f * Math.PI)
        const img = s2 > 0 ? BACK : FACE, body = s2 > 0 ? BACK_BODY : FACE_BODY
        if (img) { const ww = cw / body, hh2 = ww * img.height / img.width; x.save(); x.translate(cx, cy); x.rotate(rot * (1 - r)); x.scale(Math.abs(s2), 1); x.drawImage(img, -ww / 2, -hh2 / 2, ww, hh2); x.restore() }
        return
      }
      if (BACK) { const ww = cw / BACK_BODY, hh2 = ww * BACK.height / BACK.width; x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha = 1 - 0.5 * prog(t, T.flip[0] - 0.35, T.flip[0]); x.drawImage(BACK, -ww / 2, -hh2 / 2, ww, hh2); x.restore() }
    })
    x.fillStyle = '#140d2a'; rr(-60, sy + 14, 120, 30, 15); x.fill()
    x.globalAlpha = 0.08; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + sw * 0.55, sy); x.lineTo(sx, sy + sh * 0.45); x.fill(); x.globalAlpha = 1
    x.restore()
    x.restore()
    sparkles(t, 705, 800, T.flip[1] - 0.1, 12, 220, 0.5, 0.7, 24)
  }

  function flash(t) {
    let f = 0
    for (const s of [T.m2, T.m3, T.swapG, T.swapK]) f = Math.max(f, 1 - clamp(Math.abs(t - s) / 0.12))
    if (f > 0) { x.fillStyle = rgba('#fff6e6', 0.55 * f); x.fillRect(0, 0, W, H) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const scene = sceneAt(t)
      drawWorld(t, scene)
      if (t < T.out[1] + 0.02) {
        if (scene === 'table') drawTableSet(t)
        else if (scene === 'museum') { drawMuseum(t); libra(t); drawRope(t) }
        else if (scene === 'karaoke') { libra(t); drawScore(t) }
        else if (scene === 'movies') { drawSeat(x, 430, 985, 17); const L = libra(t); drawMoviesFront(t, L) }
        else if (scene === 'journal') { drawJournal(t); libra(t) }
        drawGossip(t)
        drawNarrator(t)
        sparkles(t, 540, 360, T.h7Land, 10, 360, 0.2, 0.7, 24)
        sparkles(t, 905, 1150, T.items[4] + 0.42, 10, 160, 0.6, 0.6, 22)
        sparkles(t, 700, 1080, T.tent, 8, 110, 0.9, 0.5, 20)
        flash(t)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (the default selection keeps the 2nd + 4th: 12.2 flip and 23.33 deal). The others stay inert:
// 4.95 (the hook → the date), 19.43 (the montage → the cloud; a flash swap), 33.3 (lesson → the deck; a flash swap).
export const CUTS = [4.95, { t: T.cut1, kind: 'flip' }, T.swapG, { t: T.cut2, kind: 'deal' }, T.swapK]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine; written in the D-major palette)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.024) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.045, 0], ['pluck', land, 1174.66, 0.038, 0.6, 0]]
const scratch = t0 => [['whoosh', r3(t0 + 0.07), 0.1, 0.13], ['whoosh', r3(t0 + 0.17), 0.08, 0.1], ['whoosh', r3(t0 + 0.27), 0.14, 0.13], ['tapeStop', t0, 0.45]]
const sob = (t0, gain = 0.022) => [['pop', r3(t0), 659.25, gain, 0.35], ['pop', r3(t0 + 0.11), 587.33, gain * 0.9, 0.35], ['pop', r3(t0 + 0.22), 493.88, gain * 0.8, 0.35]]
const cheer = (t0, big = false) => [['whoosh', r3(t0 + (big ? 0.45 : 0.2)), big ? 0.9 : 0.4, big ? 0.06 : 0.035], ['glitter', r3(t0), r3(t0 + (big ? 0.6 : 0.22))], ['pop', r3(t0 + 0.02), NOTE[big ? 5 : 3], 0.035, 0]]
const shutter = t0 => [['tick', t0, 0.05], ['whoosh', r3(t0 - 0.05), 0.18, 0.04], ['tick', r3(t0 + 0.05), 0.03]]
const chirp = (t0, gain = 0.014) => [0, 1, 2].map(i => ['pop', r3(t0 + i * 0.045), 4186, gain, 0.4])
const munch = t0 => [0, 1, 2].map(i => ['tick', r3(t0 + i * 0.07), 0.035])
const PITCH = { [STARS]: 880, [CANN]: 740, [SCON]: 587.33 }

export const CUES = [
  // 1 · the hook
  ...head(T.h0, 3, T.h0Land, 0),
  ['bell', 0.5, 1174.66, 0.012, 1.4, -0.2],
  ['whoosh', T.cloudIn, 0.45, 0.04],
  ...T.peek.map((p, i) => ['pop', r3(p + 0.1), NOTE[2 + i * 2], 0.03, 0.4]),
  ...sob(T.cry0), ...sob(r3(T.cry0 + 0.55), 0.016),
  // 2 · the date: flowers, a toast, the jokes, dessert first
  ['boom', T.drop, 0.12],
  ...head(T.hF, 1, T.hFLand, 2), ['pop', T.bouq, 1318.51, 0.035, -0.2], ['glitter', T.bouq, r3(T.bouq + 0.4)],
  ['whoosh', r3(T.sniff - 0.05), 0.4, 0.03], ['pluck', r3(T.sniff + 0.25), 880, 0.03, 0.9, -0.2],
  ['whoosh', T.vase[0], 0.3, 0.03], ['tick', T.vase[1], 0.04],
  ...head(T.hT, 2, T.hTLand, 3),
  ['whoosh', T.lean[0], 0.3, 0.03],
  ['bell', T.clink, 2349.32, 0.035, 1.0, 0.2], ['bell', r3(T.clink + 0.012), 3135.96, 0.02, 0.8, 0.2],
  ...sob(T.sob1, 0.02),
  ...head(T.hJ, 4, T.hJLand, 1),
  ...T.ha.flatMap((h, i) => [['pop', h, [587.33, 659.25, 739.99][i], 0.045, -0.2 + i * 0.2], ['pop', r3(h + 0.1), [587.33, 659.25, 739.99][i], 0.03, -0.2 + i * 0.2]]),
  ...head(T.hD, 1, T.hDLand, 4),
  ['whoosh', T.slide[0], 0.3, 0.06], ...scratch(T.scratch), ['boom', T.scratch, 0.1],
  ['whoosh', r3(T.dbl[0] + 0.05), 0.12, 0.05], ['whoosh', r3(T.dbl[0] + 0.2), 0.1, 0.04], ['pop', T.dbl[1], 1174.66, 0.04, 0.4],
  ...munch(r3(T.bite1 + 0.3)),
  // 3 · the montage
  ...head(T.hM1, 2, T.hM1Land, 0),
  ['bell', T.wink1, 1567.98, 0.03, 0.8, 0], ['tick', T.nod, 0.03], ['tick', r3(T.nod + 0.35), 0.03],
  ...shutter(T.m2), ...head(T.hM2, 1, T.hM2Land, 2),
  ...[0, 1, 2, 3, 4, 5].map(i => ['pluck', r3(T.m2 + 0.15 + i * 0.278), [587.33, 739.99, 880, 739.99, 987.77, 1174.66][i], 0.03, 0.5, 0.15]),
  ['bell', T.score, 1760, 0.04, 1.4, 0], ...cheer(T.score, true),
  ...shutter(T.m3), ...wordPops(T.hM3, 4, 0.09, 1), ['pop', r3(T.hM3 + 0.36), 1174.66, 0.045, 0], ['pluck', r3(T.hM3 + 0.36), 880, 0.03, 0.6, 0],
  ['boom', r3(T.m3 + 0.3), 0.06],
  ...T.munch.flatMap(m => munch(r3(m + 0.35))),
  // 4 · the gossip is jealous
  ...shutter(T.swapG), ...head(T.hG, 3, T.hGLand, 3),
  ...T.glance.map((g, i) => ['tick', g, 0.03 + i * 0.005]),
  ...chirp(r3(T.glance[2] + 0.3)),
  ['pop', T.cakeC, 1318.51, 0.035, -0.3], ['glitter', T.cakeC, r3(T.cakeC + 0.3)],
  ['pop', T.cakeS, 1479.98, 0.035, 0], ['glitter', T.cakeS, r3(T.cakeS + 0.3)],
  ...sob(r3(T.cakeC + 0.3), 0.018),
  // 5 · dear diary
  ...head(T.hL, 1, T.hLLand, 0),
  ...T.items.flatMap((it, i) => [['tick', it, 0.03], ['tick', r3(it + 0.14), 0.025], ['tick', r3(it + 0.28), 0.02], ['pop', r3(it + 0.42), NOTE[(i * 2) % 7], i === 4 ? 0.04 : 0.025, 0]]),
  ['bell', r3(T.items[4] + 0.45), 1567.98, 0.03, 1.2, 0], ['glitter', r3(T.items[4] + 0.42), r3(T.items[4] + 0.8)],
  // 6 · ★ LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['whoosh', T.lessonOut[0], 0.35, 0.03],
  // 7 · tonight's deck
  ...shutter(T.swapK), ...head(T.h6, 1, T.h6Land, 3),
  ...[0, 1, 2, 3, 4].map(i => ['tick', r3(T.deal + i * T.dealGap + 0.18), 0.05]),
  ['whoosh', r3(T.flip[0] - 0.35), 0.3, 0.035], ['bell', T.flip[1], 1318.51, 0.04, 1.6, 0], ['glitter', T.flip[0], r3(T.flip[1] + 0.4)],
  ...munch(r3(T.bite2 + 0.3)),
  ['whoosh', T.phoneOut[0], 0.3, 0.03],
  // 8 · table for one. then two.
  ...wordPops(T.h7, 3, 0.08, 1), ['pop', T.h7Land, 1174.66, 0.045, 0], ['pop', r3(T.h7Land + 0.1), 1318.51, 0.04, 0], ['pluck', T.h7Land, 880, 0.04, 0.8, 0],
  ['whoosh', T.peekBack, 0.4, 0.035],
  ['pop', T.tent, 1318.51, 0.04, 0.2], ['bell', r3(T.tent + 0.05), 1760, 0.03, 1.2, 0.2],
  ['tick', T.wink, 0.04], ['pluck', r3(T.wink + 0.02), 1318.51, 0.03, 0.5, 0],
  ...munch(r3(T.bite3 + 0.3)),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
