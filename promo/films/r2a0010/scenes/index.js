// r2a0010: star_advice ADVICE SOLO, "Cancer, here's your | Sunday reset." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole film (makeFilm solo mode, 9 cards): a gentle Sunday routine for the sign that looks after everyone,
// each a relatable Cancer truth + a warm reframe, with one light gag.
//   0.0–3.6    "Cancer, here's your | *Sunday reset.*"  One big Cancer pops in, then dives away.
//   3.6–37.8   clean sheets, you deserve fresh · mute the group chat, just for today · pancakes for one, yes just you
//              · old photos: one scroll, not forty · bath, bring the duck · say no to one favour · water the plants, and
//              yourself · plan one thing just for fun · early night, shell on
//  37.8        "Soft heart. | *Fully charged.*"  The big Cancer comes back.
//  41.0        LESSON UNLOCKED: "You care for everyone. | *Count yourself in.*"  RESET: DONE
//  46.9        "See you Monday, | *refreshed.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#8fe3ff'
const BED = [
  'WWWW..........',
  'WPPW..........',
  'WWWWBBBBBBBBBB',
  'BBBBBBBBBBBBBB',
  'BBLBBBLBBBLBBB',
  'BBBBBBBBBBBBBB',
  'K............K',
]
const BED_C = { W: '#fff4e2', P: '#ffd1e0', B: '#c4f0ff', L: '#8fe3ff', K: '#8a4a2e' }
const STACK = [
  '....YY....',
  '.TTTTTTTT.',
  'TTTTTTTTTT',
  '.TTTTTTTT.',
  'TTTTTTTTTT',
  '.TTTTTTTT.',
  'TTTTTTTTTT',
  'WWWWWWWWWW',
]
const STACK_C = { Y: '#ffe36a', T: '#e8a24a', W: '#fff4e2' }
const DUCK = [
  '...YYY....',
  '..YYKYOO..',
  '..YYYYOO..',
  '...YYY....',
  'YYYYYYYYY.',
  'YYYYYYYYYY',
  '.YYYYYYYY.',
]
const DUCK_C = { Y: '#ffd23a', K: INK, O: '#ff9a4a' }
const TUB = [
  '.WWWWWWWWWWWWW.',
  'WBBBBBBBBBBBBBW',
  'WWWWWWWWWWWWWWW',
  '.WWWWWWWWWWWWW.',
  '..K.........K..',
]
const TUB_C = { W: '#fff4e2', B: '#8fe3ff', K: '#9aa5c4' }
const CAN = [
  '.....S......',
  '......S.....',
  'GGGGGGGS....',
  'GGGGGGGGS...',
  'GGGGGGGG.S..',
  'GGGGGGGG....',
  'GGGGGGGG....',
]
const CAN_C = { G: '#7dffb0', S: '#9aa5c4' }
const PLANT = ['.L.L.L.', 'LLLLLLL', '.LLLLL.', '...S...', '.PPPPP.', '.PPPPP.', '..PPP..']
const PLANT_C = { L: '#5fd068', S: '#3f9e4a', P: '#c96a3a' }
const GLASS = ['W....W', 'WBBBBW', 'WBBBBW', 'WBBBBW', '.WWWW.']
const GLASS_C = { W: '#e8eef8', B: '#8fe3ff' }

function phone(x, cx, cy, k, muted, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -190, 240, 380); x.fillStyle = '#2a2350'; x.fillRect(-110, -180, 220, 360); x.fillStyle = '#140c30'; x.fillRect(-98, -150, 196, 290)
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FAMILY CHAT', 0, -124)
  for (let i = 0; i < 4; i++) { const y = -80 + i * 54; x.fillStyle = i % 2 ? '#6fc3ff' : '#9aa5c4'; x.fillRect(i % 2 ? -20 : -80, y - 16, 100, 32) }
  if (muted) { x.fillStyle = 'rgba(20,12,48,0.7)'; x.fillRect(-98, -150, 196, 290); x.fillStyle = MINT; x.font = `800 34px ${INTER}`; x.fillText('MUTED', 0, 0); x.font = `700 20px ${MONO}`; x.fillText('until monday', 0, 40) }
  x.restore()
}
function calendar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = '#fff4e2'; x.fillRect(-152, -142, 304, 284)
  x.fillStyle = '#ff6b5a'; x.fillRect(-152, -142, 304, 60); x.fillStyle = '#fff4e2'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THIS WEEK', 0, -112)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'
  ;['MON: help', 'TUE: help', 'WED: help', 'THU: FUN ♥'].forEach((r, i) => { x.fillStyle = i === 3 && lt > 1.2 ? '#ff4f86' : INK; x.fillText(r, -126, -46 + i * 52) })
  x.restore()
}

const S = 'cancer'
const ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Clean sheets. | You *deserve fresh.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'SMELLS LIKE SUNDAY', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04 })
      sparkles(x, t, 790, 930, P.t0 + 1.0, 6, 170, 0.3)
    } },
  { sign: S, cap: 'Mute the group chat. | *Just for today.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) { phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.1, lt) } },
  { sign: S, cap: 'Pancakes for one. | *Yes, just you.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, STACK, STACK_C, 800, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 660, 'for… me?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 46, col: SKYB, tail: 'bl' })
      label(x, 790, 1150, 'NO SHARING TODAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Old photos? | *One scroll,* not forty.', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 3; i++) {
        if (k <= 0.01) break
        x.save(); x.translate(760 + i * 60, 820 + i * 40); x.rotate((i - 1) * 0.12); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-90, -100, 180, 200); x.fillStyle = '#fff4e2'; x.fillRect(-84, -94, 168, 188); x.fillStyle = ['#ffd1a8', '#c4f0ff', '#ffd1e0'][i]; x.fillRect(-72, -82, 144, 130)
        x.restore()
      }
      label(x, 760, 1130, 'NOSTALGIA: UNTIL 6', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Bath time. | *Bring the duck.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TUB, TUB_C, 790, 1020, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, DUCK, DUCK_C, 790 + 10 * Math.sin(t * 2), 880 + 6 * Math.sin(t * 3), 18 * pop01(t, P.t0 + 0.8, 0.3, 2.4))
      label(x, 790, 680, 'DO NOT DISTURB', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04 })
    } },
  { sign: S, cap: 'Say no to | *one favour.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'can you just…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
      bubble(x, 780, 880, 'not this week!', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 50, col: SKYB, tail: 'bl' })
      label(x, 790, 1110, 'BOUNDARY: SET', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Water the plants. | *And yourself.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 740, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CAN, CAN_C, 820, 760, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: lt > 0.8 && lt < 1.3 ? 0.4 : 0 })
      drawBits(x, GLASS, GLASS_C, 900, 1010, 18 * pop01(t, P.t0 + 1.3, 0.3, 2.4))
      label(x, 900, 1160, 'YOURS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.05 })
    } },
  { sign: S, cap: 'Plan one thing | *just for fun.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { calendar(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt); hearts(x, t, 900, 740, P.t0 + 1.4, { n: 3, life: 1.4, spread: 120, cell: 6, seed: 3 }) } },
  { sign: S, cap: 'Early night. | *Shell on.*', mood: 'sleepy', look: [1, 0], star: { x: -170, y: 30 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(370, 960); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 210, 110, 0, Math.PI, 0); x.fill()
      x.fillStyle = '#ffb38a'; x.beginPath(); x.ellipse(0, 0, 198, 98, 0, Math.PI, 0); x.fill()
      x.strokeStyle = '#e8865a'; x.lineWidth = 8; for (const a of [-0.6, -0.2, 0.2, 0.6]) { x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(a) * 190, -Math.cos(a) * 92); x.stroke() }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'LIGHTS OUT: 9:30', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 960, 'COZY: MAX', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0010', key: 'G', accent: ACC, solo: 'cancer', ending: 'lesson',
  title: 'Cancer, here’s your | *Sunday reset.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Fully charged.*', mood: 'heart' },
  lesson: { text: 'You care for everyone. | *Count yourself in.*', chip: 'RESET: DONE' },
  last: {
    text: 'See you Monday, | *refreshed.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
