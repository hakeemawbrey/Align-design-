// r2t0128: star_talk, SOLO, "Being an Aries | be like." (~43 s vertical, signs3kit social cut, music: lofi · G)
// The whole film is one sign (makeFilm solo mode, 9 cards), each the most extreme Aries version of a normal moment.
//   0.0–3.6    "Being an Aries | *be like.*"
//   3.6–37.8   built the bookshelf in four minutes (nine screws left) · finished your sentence, wrong but fast
//              · ordered for the whole table · caught a cold, fought it personally · group project done on day one
//              · slow walker ahead, personal enemy · matched at 9:00, date at 9:05 · New Year's resolution done by Jan 2
//              · lost an argument, won it in the shower an hour later
//  37.8        GROUP ENDING: "Zero chill. | *All fire.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const FIRE = '#ff6b5a', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const SHELF = ['WWWWWWWWWWWW', 'W..........W', 'W.R.BB.G...W', 'WWWWWWWWWWWW', 'W..........W', 'W...YY.R.B.W', 'WWWWWWWWWWWW', 'W..........W', 'W.GG...YY..W', 'WWWWWWWWWWWW', 'W..........W']
const SHELF_C = { W: '#c98f2a', R: RED, B: SKYB, G: MINT, Y: GOLD }
const SCREW = ['KKK', '.K.', '.K.', '.K.']
const GLOVE = ['.RRRR.', 'RRRRRR', 'RRRRRR', 'RRRRRR', '.RRRR.', '.WWWW.']
const GERM = ['.G.G.G.', 'GGGGGGG', 'GKGGGKG', 'GGGGGGG', 'GGKKKGG', 'GGGGGGG', '.G.G.G.']
const DUCK = ['..YYY...', '.YYKYY..', '.YYYYOO.', 'YYYYYY..', 'YYYYYYYY', '.YYYYYY.']
const DUCK_C = { Y: GOLD, K: INK, O: ORANGE }
function clock(x, cx, cy, k, minutes) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 82 - 4, Math.sin(a) * 82 - 4, 8, 8) }
  x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(-56, 0); x.stroke()
  const a = minutes / 60 * Math.PI * 2
  x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(a) * 80, -Math.cos(a) * 80); x.stroke()
  x.restore()
}

const S = 'aries'
const CAMEOS = [
  // 1 · home: the bookshelf
  { sign: S, cap: 'Built the bookshelf. | *Four minutes.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.3, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SHELF, SHELF_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 * Math.sin(t * 9) * (lt < 1.2 ? 1 : 0.3) })
      for (let i = 0; i < 6; i++) drawBits(x, SCREW, { K: '#9aa5c4' }, 640 + i * 60, 1140 - (i % 2) * 20, 9 * pop01(t, P.t0 + 1.2 + i * 0.08, 0.2, 2), { rot: i * 0.7 })
      label(x, 790, 600, 'SCREWS LEFT: 9', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 2 · friends: finished your sentence
  { sign: S, cap: 'Finished your sentence. | *Wrong.* But fast.', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'so i was | thinking we…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      bubble(x, 760, 880, 'SKYDIVE! | DONE. BOOKED.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: FIRE, tail: 'bl' })
      label(x, 790, 1100, 'YOU: …brunch?', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 3 · out: ordered for the table
  { sign: S, cap: 'Ordered first. | *For the whole table.*', mood: lt => lt < 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (card(x, 790, 850, 300, 380, CREAM, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04)) {
        x.fillStyle = FIRE; x.fillRect(-150, -190, 300, 56); x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ORDER', 0, -160)
        x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'left'
        ;['SPICY x6', 'FRIES x6', 'MORE FRIES', 'DESSERT!!'].forEach((l, i) => { if (lt > 0.35 + i * 0.25) x.fillText(l, -120, -90 + i * 62) })
        x.restore()
      }
      label(x, 790, 1120, 'MENUS OPENED: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 4 · sick day: fought the cold personally
  { sign: S, cap: 'Caught a cold. | Fought it *personally.*', mood: 'squint', look: [1, 0], star: { x: -190 }, hops: [0.8, 1.4],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), ko = lt > 1.5
      drawBits(x, GLOVE, { R: RED, W: CREAM }, F.x + 120 + (Math.sin(lt * 14) > 0 ? 50 : 0), F.cy, 14 * k)
      drawBits(x, GERM, { G: '#9fd068', K: INK }, 820, 860 + (ko ? 40 : 0), 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: ko ? 1.4 : 0.1 * Math.sin(t * 6) })
      label(x, 820, 1080, ko ? 'COLD: K.O.' : 'ROUND 1', pop01(t, P.t0 + (ko ? 1.5 : 0.5), 0.3, 2.4), { size: 40, bg: ko ? MINT : GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 5 · school/work: group project
  { sign: S, cap: 'Group project? | Done *on day one.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 620, 'due next | month, guys', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      if (card(x, 790, 880, 240, 280, CREAM, pop01(t, P.t0 + 0.8, 0.3, 2), -0.05)) {
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) x.fillRect(-90, -100 + i * 34, 180 - (i * 29) % 60, 12)
        x.fillStyle = MINT; x.fillRect(-60, 70, 120, 40); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DONE', 0, 92)
        x.restore()
      }
      label(x, 790, 1130, 'TEAM: CONFUSED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 6 · outside: slow walker
  { sign: S, cap: 'Slow walker ahead? | *Personal enemy.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 940, 200 * k, { mood: 'sleepy', look: [1, 0], seed: 33, glyph: false })
      bubble(x, 820, 700, 'la la la', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: BONE, tail: 'bc' })
      label(x, 600, 1130, 'SPEED: 0.2 KM/H', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 560, 'ENEMY #1', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  // 7 · Align: matched, then a date five minutes later
  { sign: S, cap: 'Matched at 9:00. | *Date at 9:05.*', mood: lt => lt < 1.0 ? 'sparkle' : 'heart', look: [1, 0], star: { x: -190 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 0.9, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 600, "✦ IT'S A MATCH", pop01(t, P.t0 + 0.15, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      clock(x, 790, 860, pop01(t, P.t0 + 0.4, 0.3, 2), clamp((lt - 0.5) / 1.0) * 5)
      label(x, 790, 1100, 'ALREADY OUTSIDE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: FIRE, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  // 8 · New Year: the resolution
  { sign: S, cap: 'New Year’s resolution? | *Done by Jan 2.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      if (card(x, 790, 860, 300, 300, CREAM, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04)) {
        x.fillStyle = RED; x.fillRect(-150, -150, 300, 70); x.fillStyle = CREAM; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('JANUARY', 0, -114)
        x.fillStyle = INK; x.font = `800 120px ${INTER}`; x.fillText('2', 0, 40)
        x.restore()
      }
      label(x, 790, 1100, 'LEARN GUITAR: ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.25, 8, 200, 0.3)
    } },
  // 9 · later: won the argument in the shower
  { sign: S, cap: 'Lost an argument. | Won it *an hour later.*', mood: lt => lt < 1.1 ? 'neutral' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.2, 1.8],
    front(x, t, lt, P) {
      drawBits(x, DUCK, DUCK_C, 820, 1050, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 600, 'IN THE SHOWER', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 820, 'AND ANOTHER | THING!!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: FIRE, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0128', key: 'G', accent: FIRE, solo: 'aries', ending: 'group',
  title: 'Being an Aries | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Zero chill. | *All fire.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
