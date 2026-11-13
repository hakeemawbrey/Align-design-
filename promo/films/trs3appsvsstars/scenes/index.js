// trs3appsvsstars: THE SIGNS AS… v3, "Dating apps: swipe. | The stars: hold on." (~64 s vertical, signs3kit social cut,
// music: lofi · G). A versus film: generic dating apps (the villain: "the swipe app", a phone with a profile stack and
// X / heart buttons, and "the prompts app", a profile with a cheesy prompt card) against the stars (the heroes).
// No real app, logo, colour scheme or slogan anywhere: the apps are parody stand-ins only.
//   0.0–3.6    "Dating apps: *swipe.* | The stars: *hold on.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one contrast per sign (3.8 s each): the app's take pops up, gets a big red X, the stars' truth lands:
//              ♈ "loves slow walks" · keeps up   ♉ "foodie" · shares the fries   ♊ "hey." · forty topics deep
//              ♋ "6 ft." · texts "home safe?"   ♌ "nice pic." · a standing ovation   ♍ "k." · full sentences
//              ♎ "swipe faster" · picks the restaurant   ♏ "just vibes" · deep talk only
//              ♐ "within 5 miles" · any continent   ♑ "just fun" · a five-year plan   ♒ "no weirdos" · equally weird
//              ♓ "no drama" · brings tissues (sobbing, happily)
//  49.2        "Apps: 0. | Stars: *twelve.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Apps match photos. | Stars match *people.*"  SWIPING: DONE
//  58.3        "Stop swiping. | *Look up.*" over the match card: Cancer + Pisces (the one who texts "home safe?" and
//              the one who needs the tissues), MATCHED BY THE STARS.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

// ── props
const RED = '#ff4a5e', GREY = '#9aa5c4', SCREEN = '#2a2350', CREAM = '#fff4e2'

/** a framed card: ink outline, drop shadow, bone (or given) face; fn draws inside in local coords */
function card(x, cx, cy, w, h, k, rot, fn, face = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn(x)
  x.restore()
}

/** "the swipe app": a generic phone, a profile card on a little stack, X and heart buttons. fn draws on the card. */
function swipePhone(x, cx, cy, k, rot, fn, { s = 1 } = {}) {
  if (k <= 0.01) return
  const W = 270, H = 440
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 10, -H / 2 + 12, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12)
  x.fillStyle = '#4a4278'; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = SCREEN; x.fillRect(-W / 2 + 14, -H / 2 + 30, W - 28, H - 60)
  x.fillStyle = INK; x.fillRect(-30, -H / 2 + 10, 60, 10)                       // the speaker slot
  // the stack: two cards peeking behind the top one
  x.fillStyle = '#6b62a8'; x.fillRect(-92, -150, 184, 250); x.fillStyle = '#8a82c4'; x.fillRect(-100, -160, 200, 250)
  x.fillStyle = INK; x.fillRect(-108, -176, 216, 266)
  x.fillStyle = CREAM; x.fillRect(-104, -172, 208, 258)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn(x)
  // the buttons: a grey X and a pink heart (generic)
  const btn = (bx, col) => { x.fillStyle = INK; x.beginPath(); x.arc(bx, 150, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(bx, 150, 28, 0, Math.PI * 2); x.fill() }
  btn(-56, GREY); btn(56, PINK)
  x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.moveTo(-68, 138); x.lineTo(-44, 162); x.moveTo(-44, 138); x.lineTo(-68, 162); x.stroke()
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: CREAM }, 56, 151, 5, { outline: null })
  x.restore()
}
/** a placeholder profile photo + a line of text on the swipe card (local coords of the card, centre 0,-43) */
function profile(x, line1, line2, { col = GREY } = {}) {
  x.fillStyle = '#d9d2ea'; x.fillRect(-90, -160, 180, 130)
  x.fillStyle = col; x.beginPath(); x.arc(0, -112, 26, 0, Math.PI * 2); x.fill(); x.fillRect(-46, -74, 92, 44)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(line1, 0, -4)
  if (line2) { x.font = `800 30px ${INTER}`; x.fillText(line2, 0, 40) }
}
/** "the prompts app": a profile prompt card with a header and a big cheesy answer */
function promptCard(x, cx, cy, k, rot, head, answer, { w = 360, size = 46 } = {}) {
  card(x, cx, cy, w, 200, k, rot, x => {
    x.fillStyle = '#d9d2ea'; x.fillRect(-w / 2, -100, w, 60)
    x.fillStyle = '#4a4278'; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -70)
    x.fillStyle = INK; x.font = `italic 600 ${size}px ${SERIF}`; x.fillText(answer, 0, 22)
    x.fillStyle = GREY; x.font = `800 24px ${INTER}`; x.fillText('♡  reply', w / 2 - 70, 78)
  })
}
/** the big red X that crosses out the app's take */
function cross(x, cx, cy, k, r = 120) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.lineCap = 'square'
  x.strokeStyle = INK; x.lineWidth = 40
  x.beginPath(); x.moveTo(-r, -r); x.lineTo(r, r); x.moveTo(r, -r); x.lineTo(-r, r); x.stroke()
  x.strokeStyle = RED; x.lineWidth = 26
  x.beginPath(); x.moveTo(-r, -r); x.lineTo(r, r); x.moveTo(r, -r); x.lineTo(-r, r); x.stroke()
  x.restore()
}
/** the stars' verdict: a gold star badge */
const verdict = (x, cx, cy, text, k, rot = -0.04, size = 38) => label(x, cx, cy, `✦ ${text}`, k, { size, bg: GOLD, rot, font: MONO, weight: 700 })
// shared timing: the app's take pops at 0.2, the X lands at 1.0, the stars' truth at 1.25
const XAT = 1.0, TRUTH = 1.25
const dimApp = lt => 1 - 0.3 * ease.outCubic(prog(lt, XAT + 0.2, XAT + 0.6))   // the crossed-out app fades back

const FRIES = [
  '.Y.Y..Y.Y.',
  '.Y.YY.Y.YY',
  'YY.YYYY.Y.',
  'YYYYYYYYYY',
  'RRRRRRRRRR',
  'RWRRWRRWRR',
  '.RRRRRRRR.',
  '.RRRRRRRR.',
  '..RRRRRR..',
]
const FRIES_C = { Y: '#ffd23a', R: '#e23d4e', W: CREAM }
const FRY = ['Y', 'Y', 'Y', 'Y', 'Y']
const UFO = [
  '.....SSS.....',
  '....SSSSS....',
  '..GGGGGGGGG..',
  'GGGYGGYGGYGGG',
  '..GGGGGGGGG..',
]
const UFO_C = { S: SKYB, G: GREY, Y: GOLD }
const TISSUE = [
  '....WW....',
  '...WWWW...',
  '....WW....',
  'BBBBBBBBBB',
  'BBBKKKKBBB',
  'BHBBBBBBHB',
  'BBBBHBBBBB',
  'BBBBBBBHBB',
  'BBBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: '#b7a6ff', K: '#6b62a8', H: PINK }

/** a little globe with green continents, a heart pin dropped on the far side */
function globe(x, cx, cy, r, k, t, pin) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 7, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#4fa8ff'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.clip()
  x.fillStyle = '#5fd068'
  const off = (t * 40) % (r * 4)
  for (const [bx, by, w, h] of [[-60, -40, 70, 50], [30, 10, 60, 80], [-20, 50, 50, 30], [90, -60, 50, 40], [-140, 20, 60, 60]]) {
    x.fillRect(((bx + r * 2 - off) % (r * 4) + r * 4) % (r * 4) - r * 2, by - h / 2, w, h)
  }
  x.restore()
  x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(-r * 0.6, -r * 0.7, r * 0.3, r * 0.3)
  x.restore()
  if (pin > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, cx + 30 * k, cy - r * 0.35 * k - (1 - pin) * 60, 9 * pin)
}

const CAMEOS = [
  { sign: 'aries', cap: 'The app: “loves slow walks.” | The stars: *keeps up.*', mood: lt => lt > TRUTH ? 'sparkle' : 'wide', star: { x: -170 }, hops: [0.4, 0.8, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      // speed lines: Aries is already halfway down the street
      const k = clamp((lt - 0.2) / 0.3)
      if (k <= 0) return
      x.save(); x.globalAlpha = 0.6 * k; x.fillStyle = BONE
      for (let i = 0; i < 5; i++) { const y = 760 + i * 52, len = 90 + 50 * Math.sin(i * 2.1 + t * 9); x.fillRect(150 - len * 0.3 + ((t * 600 + i * 70) % 60), y, len, 8) }
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), a = dimApp(lt)
      x.save(); x.globalAlpha = a
      swipePhone(x, 790, 750, k, 0.05, x => profile(x, 'LIKES:', 'slow walks'), { s: 1.05 })
      x.restore()
      cross(x, 790, 760, pop01(t, P.t0 + XAT, 0.22, 2.4), 110)
      verdict(x, 780, 1100, 'CAN KEEP UP', pop01(t, P.t0 + TRUTH, 0.3, 2), -0.05, 42)
      sparkles(x, t, 780, 1080, P.t0 + TRUTH + 0.1, 8, 170, 0.3)
    } },
  { sign: 'taurus', cap: 'The app: “foodie.” | The stars: *shares the fries.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: lt => lt < 1.2 ? [1, 0] : undefined, star: { x: -170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      drawBits(x, FRIES, FRIES_C, 790, 1000, 15 * k)
      // a fry gets shared: it lifts out and floats over to the date (off to the right), a heart follows
      const g = ease.inOutCubic(prog(lt, TRUTH, TRUTH + 0.6))
      if (g > 0 && k > 0.9) drawBits(x, FRY, FRIES_C, lerp(820, 930, g), lerp(910, 820, g) - Math.sin(Math.PI * g) * 60, 15, { rot: lerp(0, 1.1, g) })
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), a = dimApp(lt)
      x.save(); x.globalAlpha = a; promptCard(x, 790, 640, k, -0.04, 'I’M A…', 'foodie', { size: 64 }); x.restore()
      cross(x, 790, 640, pop01(t, P.t0 + XAT, 0.22, 2.4), 95)
      verdict(x, 790, 1150, 'SHARED A FRY', pop01(t, P.t0 + TRUTH + 0.4, 0.3, 2), 0.04, 40)
      hearts(x, t, 900, 860, P.t0 + TRUTH + 0.5, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 4 })
    } },
  { sign: 'gemini', cap: 'The app: “hey.” | The stars: *forty topics deep.*', mood: lt => lt > TRUTH ? 'sparkle' : 'neutral', look: lt => lt > TRUTH ? [Math.floor(lt * 3) % 2 ? 1 : -1, 0] : [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.25, 2.2), out = 1 - ease.inCubic(prog(lt, 1.5, 1.75))
      bubble(x, 790, 640, 'hey.', k * out, { size: 76, col: '#d9d2ea', tail: 'br', weight: 600 })
      cross(x, 790, 640, pop01(t, P.t0 + 0.85, 0.22, 2.4) * out, 85)
      const TOP = [['sharks??', 690, 'bl', BONE], ['ghosts!!', 870, 'br', LAV], ['why are | tacos?', 700, 'bl', MINT], ['ok but | space.', 860, 'br', BONE]]
      TOP.forEach(([s, bx, tail, col], n) => bubble(x, bx, 760 + n * 105 - (n > 2 ? 20 : 0), s, pop01(t, P.t0 + TRUTH + n * 0.2, 0.22, 2.2), { size: 36, tail, col }))
      label(x, 800, 620, 'TOPIC 40', pop01(t, P.t0 + 2.05, 0.3, 2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'The app: “6 ft.” | The stars: texts *“home safe?”*', mood: lt => lt > TRUTH + 0.2 ? 'heart' : 'neutral', look: lt => lt < 1.2 ? [1, 0] : undefined, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), a = dimApp(lt)
      x.save(); x.globalAlpha = a
      card(x, 790, 640, 330, 190, k, 0.04, x => {
        x.fillStyle = '#4a4278'; x.font = `700 26px ${MONO}`; x.fillText('HEIGHT:', 0, -50)
        x.fillStyle = INK; x.font = `800 72px ${INTER}`; x.fillText('6 FT.', 0, 26)
      })
      x.restore()
      cross(x, 790, 640, pop01(t, P.t0 + XAT, 0.22, 2.4), 95)
      bubble(x, 790, 900, 'home safe?', pop01(t, P.t0 + TRUTH, 0.25, 2.2), { size: 54, col: PINK, tail: 'bl' })
      label(x, 790, 1010, '11:58 PM', pop01(t, P.t0 + TRUTH + 0.15, 0.25, 2), { size: 30, bg: BONE, rot: 0, font: MONO, weight: 700 })
      verdict(x, 790, 1130, 'CHECKS ON YOU', pop01(t, P.t0 + TRUTH + 0.55, 0.3, 2), -0.04, 38)
      hearts(x, t, 860, 860, P.t0 + TRUTH + 0.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'The app: “nice pic.” | The stars: *standing ovation.*', mood: lt => lt > TRUTH ? 'sparkle' : 'squint', star: { x: -180 }, hops: [1.4, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.6, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.25, 2.2), out = 1 - ease.inCubic(prog(lt, 1.35, 1.6))
      bubble(x, 790, 640, 'nice pic.', k * out, { size: 60, col: '#d9d2ea', tail: 'br', weight: 600 })
      cross(x, 790, 640, pop01(t, P.t0 + 0.85, 0.22, 2.4) * out, 95)
      // the fan: a whole star on its feet with a sign
      const f = pop01(t, P.t0 + TRUTH, 0.35, 2)
      const wave = Math.sin(t * 9) * 0.08
      if (f > 0.01) signChar(x, t, 'libra', 800, 1030, 230 * f, { mood: 'heart', look: [-1, 0], seed: 11, glyph: false, hops: [P.t0 + 1.7, P.t0 + 2.3] })
      card(x, 800, 790, 260, 120, pop01(t, P.t0 + TRUTH + 0.2, 0.3, 2), wave, x => {
        x.fillStyle = '#ffb34a'; x.fillRect(-130, -60, 260, 120)
        x.fillStyle = INK; x.font = `800 64px ${INTER}`; x.fillText('LEO!!!', 0, 4)
      })
      if (f > 0.9) { x.fillStyle = INK; x.fillRect(796 - 6, 850, 12, 70); x.fillStyle = '#8a4a2e'; x.fillRect(796 - 3, 850, 6, 70) }
      sparkles(x, t, 800, 800, P.t0 + TRUTH + 0.3, 8, 190, 0.2)
      label(x, 380, 600, 'No.1 FAN: FOUND', pop01(t, P.t0 + 2.0, 0.3, 2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'The app: “k.” | The stars: *full sentences.*', mood: lt => lt > TRUTH + 0.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.25, 2.2), out = 1 - ease.inCubic(prog(lt, 1.2, 1.45))
      bubble(x, 790, 640, 'k.', k * out, { size: 100, col: '#d9d2ea', tail: 'br', weight: 600 })
      cross(x, 790, 640, pop01(t, P.t0 + 0.85, 0.22, 2.4) * out, 85)
      const m = pop01(t, P.t0 + TRUTH, 0.3, 2)
      card(x, 790, 840, 400, 300, m, 0.03, x => {
        x.fillStyle = MINT; x.fillRect(-200, -150, 400, 54)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText('NEW MESSAGE', 0, -123)
        x.font = `600 31px ${INTER}`; x.textAlign = 'left'
        const L = ['Thank you for', 'asking. I would', 'love to. Friday', 'works for me.']
        L.forEach((s, i) => { const w = clamp((lt - TRUTH - 0.2 - i * 0.18) / 0.18); if (w > 0) { x.save(); x.globalAlpha = w; x.fillText(s, -175, -62 + i * 52); x.restore() } })
        x.textAlign = 'center'
      })
      verdict(x, 790, 1120, 'GRAMMAR: 10/10', pop01(t, P.t0 + 2.0, 0.3, 2), -0.04, 36)
    } },
  { sign: 'libra', cap: 'The app: “swipe faster.” | The stars: *picks the restaurant.*', mood: lt => lt > TRUTH + 0.2 ? 'heart' : 'squint', look: lt => lt < TRUTH ? [Math.floor(lt * 4) % 2 ? 1 : -1, 0] : [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), a = dimApp(lt)
      const shake = lt > 0.4 && lt < XAT ? Math.sin(t * 40) * 5 : 0
      x.save(); x.globalAlpha = a
      swipePhone(x, 790 + shake, 720, k, 0.05, x => {
        profile(x, 'SWIPE IN:', null)
        const n = Math.max(1, 3 - Math.floor(Math.max(0, lt - 0.3) / 0.25))
        x.fillStyle = RED; x.font = `800 56px ${INTER}`; x.fillText(`0:0${n}`, 0, 44)
      }, { s: 0.9 })
      x.restore()
      cross(x, 790, 720, pop01(t, P.t0 + XAT, 0.22, 2.4), 100)
      bubble(x, 790, 990, 'I booked | us a table.', pop01(t, P.t0 + TRUTH, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      verdict(x, 760, 1150, 'DECIDED. FOR YOU.', pop01(t, P.t0 + TRUTH + 0.6, 0.3, 2), 0.04, 36)
      hearts(x, t, 420, 760, P.t0 + TRUTH + 0.4, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'The app: “just vibes.” | The stars: *deep talk only.*', mood: lt => lt > TRUTH + 0.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), a = dimApp(lt)
      x.save(); x.globalAlpha = a; promptCard(x, 790, 640, k, 0.04, 'MY VIBE:', 'just vibes', { size: 56 }); x.restore()
      cross(x, 790, 640, pop01(t, P.t0 + XAT, 0.22, 2.4), 95)
      bubble(x, 790, 900, 'so what are | you afraid of?', pop01(t, P.t0 + TRUTH, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      verdict(x, 790, 1110, 'DEPTH: FINALLY', pop01(t, P.t0 + TRUTH + 0.6, 0.3, 2), -0.04, 38)
    } },
  { sign: 'sagittarius', cap: 'The app: “within 5 miles.” | The stars: *any continent.*', mood: lt => lt > TRUTH ? 'sparkle' : 'squint', look: [-1, 0], star: { x: 160 }, hops: [1.4, 1.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), a = dimApp(lt)
      x.save(); x.globalAlpha = a
      swipePhone(x, 330, 690, k, -0.05, x => {
        x.fillStyle = '#4a4278'; x.font = `700 24px ${MONO}`; x.fillText('DISTANCE', 0, -130)
        x.fillStyle = GREY; x.fillRect(-80, -70, 160, 10); x.fillStyle = PINK; x.fillRect(-80, -70, 22, 10)
        x.fillStyle = INK; x.fillRect(-66, -82, 22, 34)
        x.font = `800 64px ${INTER}`; x.fillText('5 MI', 0, 10)
      }, { s: 0.85 })
      x.restore()
      cross(x, 330, 690, pop01(t, P.t0 + XAT, 0.22, 2.4), 95)
      const g = pop01(t, P.t0 + TRUTH, 0.35, 2)
      globe(x, 330, 990, 100, g, t, clamp((lt - TRUTH - 0.4) / 0.3))
      verdict(x, 330, 1150, 'DISTANCE: ANY', pop01(t, P.t0 + TRUTH + 0.6, 0.3, 2), 0.04, 38)
    } },
  { sign: 'capricorn', cap: 'The app: “just fun.” | The stars: *a five-year plan.*', mood: lt => lt > TRUTH + 0.3 ? 'heart' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), a = dimApp(lt)
      x.save(); x.globalAlpha = a; promptCard(x, 340, 620, k, -0.04, 'LOOKING FOR:', 'just fun', { size: 60 }); x.restore()
      cross(x, 340, 620, pop01(t, P.t0 + XAT, 0.22, 2.4), 95)
      card(x, 340, 950, 380, 330, pop01(t, P.t0 + TRUTH, 0.3, 2), 0.03, x => {
        x.fillStyle = '#2fc79a'; x.fillRect(-190, -165, 380, 64)
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.fillText('US: 5-YEAR PLAN', 0, -132)
        const ROWS = [['YR 1', 'first trip'], ['YR 2', 'a puppy'], ['YR 3', 'a garden'], ['YR 5', 'still us']]
        ROWS.forEach(([h, w], r) => {
          const y = -62 + r * 62
          x.fillStyle = 'rgba(27,18,54,0.2)'; x.fillRect(-170, y + 28, 340, 3)
          x.fillStyle = INK; x.textAlign = 'left'; x.font = `700 24px ${MONO}`; x.fillText(h, -165, y)
          x.font = `700 30px ${INTER}`; x.fillText(w, -70, y)
          if (lt > TRUTH + 0.35 + r * 0.18) { x.fillStyle = '#2fc79a'; x.font = `800 36px ${INTER}`; x.fillText('✓', 140, y) }
          x.textAlign = 'center'
        })
      })
    } },
  { sign: 'aquarius', cap: 'The app: “no weirdos.” | The stars: *equally weird.*', mood: lt => lt > TRUTH ? 'sparkle' : 'squint', look: lt => lt > TRUTH ? [1, -1] : [1, 0], star: { x: -180 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), a = dimApp(lt)
      x.save(); x.globalAlpha = a; promptCard(x, 790, 610, k, 0.04, 'DEALBREAKER:', 'no weirdos', { size: 56 }); x.restore()
      cross(x, 790, 610, pop01(t, P.t0 + XAT, 0.22, 2.4), 95)
      const u = pop01(t, P.t0 + TRUTH, 0.35, 2)
      const ux = 790, uy = 820 + 8 * Math.sin(t * 3)
      if (u > 0.9) {
        x.save(); x.globalAlpha = 0.28 * clamp((lt - TRUTH - 0.2) / 0.3); x.fillStyle = MINT
        x.beginPath(); x.moveTo(ux - 40, uy + 30); x.lineTo(ux + 40, uy + 30); x.lineTo(ux + 130, 1170); x.lineTo(ux - 130, 1170); x.closePath(); x.fill(); x.restore()
      }
      drawBits(x, UFO, UFO_C, ux, uy, 20 * u)
      // the match beams down: another little star, waving from the light, in a foil hat
      const d = pop01(t, P.t0 + TRUTH + 0.45, 0.35, 2)
      if (d > 0.01) {
        signChar(x, t, 'gemini', ux, 1060, 150 * d, { mood: 'sparkle', look: [-1, 0], seed: 13, glyph: false })
        drawBits(x, ['..S..', '.SSS.', 'SSSSS'], { S: '#d8dde8' }, ux, 1060 - 92 * d, 11 * d)
      }
      label(x, 790, 1170, 'WEIRD: MATCHED', pop01(t, P.t0 + 2.0, 0.3, 2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'The app: “no drama.” | The stars: *brings tissues.*', mood: lt => lt < TRUTH ? 'wide' : 'heart', tears: lt => lt < TRUTH ? 3 : 2, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.6, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), a = dimApp(lt)
      x.save(); x.globalAlpha = a; promptCard(x, 790, 610, k, 0.04, 'PLEASE:', 'no drama', { size: 60 }); x.restore()
      cross(x, 790, 610, pop01(t, P.t0 + XAT, 0.22, 2.4), 95)
      const b = pop01(t, P.t0 + TRUTH, 0.3, 2)
      drawBits(x, TISSUE, TISSUE_C, 790, 950, 20 * b, { rot: -0.04 })
      // tissues keep popping out, one after another
      for (let j = 0; j < 3; j++) {
        const g = prog(lt, TRUTH + 0.35 + j * 0.25, TRUTH + 0.85 + j * 0.25)
        if (g > 0 && g < 1) drawBits(x, ['.WW.', 'WWWW', 'WWWW', '.WW.'], { W: '#ffffff' }, 790 + (j - 1) * 90 * g, 860 - 160 * ease.outCubic(g), 12, { alpha: 1 - g * g, rot: (j - 1) * g })
      }
      verdict(x, 770, 1140, 'TISSUES: PACKED', pop01(t, P.t0 + TRUTH + 0.55, 0.3, 2), -0.04, 38)
      hearts(x, t, 790, 900, P.t0 + TRUTH + 0.6, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'trs3appsvsstars', key: 'G', accent: '#ffd23a',
  title: 'Dating apps: *swipe.* | The stars: *hold on.*',
  cameos: CAMEOS,
  ending: 'card',
  card: { a: 'cancer', b: 'pisces', chip: 'MATCHED BY THE STARS' },
  group: { cap: 'Apps: 0. | Stars: *twelve.*' },
  lesson: { text: 'Apps match photos. | Stars match *people.*', chip: 'SWIPING: DONE' },
  last: {
    text: 'Stop swiping. | *Look up.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
// the kit's hook has no shrink-to-fit: shrink the title's word box (as trs3crush does) if a line is wider than the
// measure, so the hook stays on its two lines, clear of the stage card's name tab
async function build(stage) {
  const scene = await F.SCENES[0](stage)
  const box = [...stage.querySelectorAll('div')].find(d => d.querySelector(':scope > br') && d.textContent.replace(/\s+/g, '').startsWith('Datingapps'))
  if (box) {
    const prev = box.style.display; box.style.display = 'block'
    let widest = 0, cur = 0
    for (const n of box.childNodes) {
      if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
      cur += n.offsetWidth + 0.24 * (parseFloat(n.style.fontSize) || 92)
    }
    widest = Math.max(widest, cur)
    const maxW = parseFloat(box.style.width) || 940
    if (widest > maxW) {
      const k = Math.max(0.6, (maxW - 8) / widest)
      box.style.fontSize = (92 * k) + 'px'
      for (const sp of box.querySelectorAll(':scope > span')) if (sp.style.fontStyle === 'italic') sp.style.fontSize = (124 * k) + 'px'
    }
    box.style.display = prev
  }
  return scene
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
