// v3a050: zodiac.advice444, ADVICE SOLO, "Aquarius, your gift | is this." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the quietly brilliant things Aquarians do, one gag each.
//   0.0–3.6    "Aquarius, your gift | *is this.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the new kid at the party gets a name tag: WEIRD (GOOD) · a lightbulb idea: AHEAD OF SCHEDULE
//              · even the pigeon has a name: "this is Gary." · a playlist with every genre: GENRE: YES
//              · stands on a crate for the quiet one: "let them finish!" · a door sign: DO NOT DISTURB: INVENTING
//              · draws a new constellation across two birth charts · upgraded the toaster: TOASTER 2.0
//              · three grey boxes say NORMAL, Aquarius: LIMITED EDITION
//  37.8        "One of one. | *Truly.*"  Aquarius comes back, big.
//  41.0        LESSON UNLOCKED: "Your weird is | *someone’s welcome.*"  VIBE: ORIGINAL
//  46.9        "The new kid? | *Best friend now.*" over the match card: Aquarius + Cancer (the name tag, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#5fe0d4', WOOD = '#c98f2a', RED = '#e23d4e', GREY = '#8d8aa3'
const S = 'aquarius'

// ── props
const BULB = [
  '..YYYY..',
  '.YYWYYY.',
  'YYWYYYYY',
  'YYYYYYYY',
  'YYYYYYYY',
  '.YYYYYY.',
  '..YYYY..',
  '..GGGG..',
  '..gggg..',
  '..GGGG..',
  '...gg...',
]
const BULB_C = { Y: GOLD, W: '#fffbe6', G: '#c9c9d8', g: '#8d8aa3' }
const PIGEON = [
  '...GG.....',
  '..GGKG....',
  '..GGGGO...',
  '...GGG....',
  '..GPPGGG..',
  '.GPPGGGGGG',
  '.GGGGGGGG.',
  '..GGGGGG..',
  '....O.O...',
  '...OO.OO..',
]
const PIGEON_C = { G: '#b9b6cc', K: INK, O: '#ff9f6b', P: '#a5e6c9' }
const TOASTER = [
  '.....A.....',
  '.....A.....',
  '....RRR....',
  '.SSSSSSSSS.',
  'SBBBSSSBBBS',
  'SSSSSSSSSSS',
  'SSSSSSSSSSS',
  'SSSSSSSKSSS',
  'SSSSSSSSSSS',
  '.SSSSSSSSS.',
  '.K.......K.',
]
const TOASTER_C = { S: '#d8dbe8', B: '#c98f2a', K: INK, A: '#c9c9d8', R: RED }

// a party name tag sticker
function nameTag(x, cx, cy, k, rot = -0.06) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -76, 312, 168)
  x.fillStyle = INK; x.fillRect(-160, -90, 320, 176)
  x.fillStyle = RED; x.fillRect(-152, -82, 304, 64)
  x.fillStyle = '#fff'; x.fillRect(-152, -18, 304, 96)
  x.fillStyle = '#fff'; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HELLO, I’M', 0, -50)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.fillText('WEIRD (GOOD)', 0, 30)
  x.restore()
}
// a wooden crate to stand on
function crate(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -70, 240, 140)
  x.fillStyle = WOOD; x.fillRect(-112, -62, 224, 124)
  x.fillStyle = '#8a5a1c'; x.fillRect(-112, -24, 224, 8); x.fillRect(-112, 20, 224, 8); x.fillRect(-60, -62, 8, 124); x.fillRect(52, -62, 8, 124)
  x.restore()
}
// a door with a hanging sign
function door(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -300, 300, 600)
  x.fillStyle = '#6a4bb0'; x.fillRect(-140, -290, 280, 590)
  x.fillStyle = '#5a3d9a'; x.fillRect(-110, -260, 220, 220); x.fillRect(-110, 0, 220, 260)
  x.fillStyle = GOLD; x.fillRect(96, 10, 22, 22)
  x.restore()
  // the sign swings in
  const sw = 0.18 * Math.cos(lt * 6) * Math.exp(-lt * 1.6)
  x.save(); x.translate(cx, cy - 210 * k); x.rotate(sw)
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-50 * k, 0); x.lineTo(0, -40 * k); x.lineTo(50 * k, 0); x.stroke()
  x.restore()
  label(x, cx, cy - 140 * k, 'DO NOT DISTURB', k * pop01(lt, 0.4, 0.3, 2.2), { size: 30, bg: BONE, rot: sw, font: MONO, weight: 700 })
  label(x, cx, cy - 76 * k, 'INVENTING', k * pop01(lt, 0.9, 0.3, 2.2), { size: 40, bg: TEAL, rot: sw - 0.03 })
}
// two little birth chart wheels joined by a new constellation
function chart(x, cx, cy, r, k, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#1e1450'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.strokeStyle = col; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, r - 10, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(0, 0, r * 0.45, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * r * 0.45, Math.sin(a) * r * 0.45); x.lineTo(Math.cos(a) * (r - 10), Math.sin(a) * (r - 10)); x.stroke() }
  x.restore()
}
function constellation(x, t, pts, p) {
  if (p <= 0.01) return
  x.save(); x.strokeStyle = GOLD; x.lineWidth = 5; x.setLineDash([12, 8]); x.beginPath()
  const segs = pts.length - 1, upto = p * segs
  for (let i = 0; i <= Math.floor(upto) && i < segs; i++) {
    const [ax, ay] = pts[i], [bx, by] = pts[i + 1], f = Math.min(1, upto - i)
    x.moveTo(ax, ay); x.lineTo(lerp(ax, bx, f), lerp(ay, by, f))
  }
  x.stroke(); x.setLineDash([])
  pts.forEach(([px, py], i) => { if (i <= upto + 0.01) { x.fillStyle = INK; x.fillRect(px - 11, py - 11, 22, 22); x.fillStyle = BONE; x.fillRect(px - 7, py - 7, 14, 14) } })
  x.restore()
}
// a plain grey box labelled NORMAL
function greyBox(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-78, -78, 156, 156)
  x.fillStyle = GREY; x.fillRect(-70, -70, 140, 140)
  x.fillStyle = '#6f6c86'; x.fillRect(-70, 40, 140, 30)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NORMAL', 0, -6)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You make weird | *feel welcome.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.3],
    front(x, t, lt, P) {
      const a = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (a > 0.01) signChar(x, t, 'cancer', 800, 990, 190 * a, { mood: lt > 1.4 ? 'sparkle' : 'wide', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.7] })
      nameTag(x, 790, 700, pop01(t, P.t0 + 0.8, 0.3, 2.2), 0.05)
      sparkles(x, t, 790, 760, P.t0 + 1.3, 7, 170, 0.4)
    } },
  { sign: S, cap: 'Your ideas | *arrive early.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -200, y: 30 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.7, 0.3, 2.2)
      drawBits(x, BULB, BULB_C, 760, 790, 26 * k)
      if (lt > 1.0) { x.save(); x.globalAlpha = 0.35 + 0.25 * Math.sin(t * 9); x.fillStyle = GOLD; x.beginPath(); x.arc(760, 750, 170, 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, BULB, BULB_C, 760, 790, 26 * k)
      label(x, 760, 1080, 'AHEAD OF SCHEDULE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: TEAL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even the pigeon | *is your friend.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      const hop = lt > 1.5 ? Math.abs(Math.sin((lt - 1.5) * 9)) * 18 : 0
      drawBits(x, PIGEON, PIGEON_C, 800, 990 - hop, 22 * k)
      bubble(x, 640, 640, 'this is | Gary.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 830, 830, 'GARY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.06 })
    } },
  { sign: S, cap: 'Your taste is | *its own genre.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      notes(x, t, 560, 760, { n: 5, cell: 9, col: TEAL, alpha: clamp((lt - 0.3) * 2), seed: 2 })
      label(x, 780, 680, 'POLKA', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.08, font: MONO, weight: 700 })
      label(x, 800, 790, 'WHALE SONGS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 770, 900, 'SPACE JAZZ', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'GENRE: YES', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'You speak up | *for the quiet one.*', mood: 'happy', look: [1, 0], star: { x: -190, y: -40, s: 270 }, hops: [0.5],
    back(x, t, lt, P) { crate(x, 350, 1010, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 790, 1020, 170 * k, { mood: lt > 1.5 ? 'sparkle' : 'neutral', look: [-1, -1], seed: 22, glyph: false, hops: [P.t0 + 1.8] })
      bubble(x, 680, 640, 'let them | FINISH!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
      if (lt > 1.6) bubble(x, 800, 840, 'thank you.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Needing space | *isn’t cold.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -220, y: 40, s: 260 }, hops: [1.3],
    back(x, t, lt, P) { door(x, 770, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: S, cap: 'You see futures | *nobody else sees.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -230, y: 60, s: 250 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 680, 700, 110, pop01(t, P.t0 + 0.2, 0.35, 2), TEAL)
      chart(x, 860, 960, 100, pop01(t, P.t0 + 0.4, 0.35, 2), PINK)
      constellation(x, t, [[680, 700], [770, 760], [740, 860], [860, 960]], ease.inOutCubic(prog(lt, 0.8, 1.6)))
      label(x, 700, 1150, 'A NEW CONSTELLATION', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You upgrade | *everything you touch.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const shake = lt > 1.0 && lt < 1.4 ? Math.sin(lt * 80) * 6 : 0
      drawBits(x, TOASTER, TOASTER_C, 790 + shake, 900, 22 * k)
      if (lt > 1.4) { const ph = ((lt - 1.4) * 2.2) % 1; drawBits(x, ['BB', 'BB'], { B: WOOD }, 760, 740 - ph * 160, 14, { alpha: 1 - ph }) }
      sparkles(x, t, 790, 900, P.t0 + 1.4, 6, 180, 0.2)
      label(x, 790, 1120, 'TOASTER 2.0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: TEAL, rot: 0.04 })
    } },
  { sign: S, cap: 'Different is | *your superpower.*', mood: 'sparkle', star: { x: 200, y: -20, s: 280 }, hops: [1.5],
    front(x, t, lt, P) {
      ;[[230, 0.15], [400, 0.3], [570, 0.45]].forEach(([bx, d], i) => greyBox(x, bx, 1000, pop01(t, P.t0 + d, 0.3, 2)))
      label(x, 740, 1150, 'LIMITED EDITION', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 740, 860, P.t0 + 1.2, 8, 200, 0.7)
    } },
]

const F = makeFilm({
  id: 'v3a050', key: 'C', accent: TEAL, solo: S, ending: 'card',
  title: 'Aquarius, your gift | *is this.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'One of one. | *Truly.*', mood: 'sparkle' },
  lesson: { text: 'Your weird is | *someone’s welcome.*', chip: 'VIBE: ORIGINAL' },
  last: {
    text: 'The new kid? | *Best friend now.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
