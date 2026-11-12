// r2t0250: star_talk, SOLO, "First-date Pisces | be like." (batch topic: "Pisces on a first date be like.") (~52 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): one first date, every moment felt at full volume.
// Pisces cries in every card.
//   0.0–3.6    "First-date Pisces | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              an hour early to rehearse feelings · they pulled out a chair, sobbed · named the breadstick, couldn't
//              eat Gary · already picked "our song" · the candle flickered: a sign · whole life story by the appetizer
//              · the date laughed once, Pisces wrote a poem · ordered the same dish: soulmates · waved goodnight
//              for ten minutes
//  37.8        "One date. | *Nine big feelings.*"
//  41.0        LESSON UNLOCKED: "Feel it all. | The right one *feels it too.*"  DATE TWO: BOOKED
//  46.9        "Same dish. | *Same tears.*" over the match card: Pisces + Cancer (the same-dish date, paid off).
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, clock, CREAM, RED, ORANGE, BROWN, GREY, DEEP, SUN, clamp, ease, lerp, prog } from './props.js'

const S = 'pisces'
const ST = { x: -190 }
const ACC = LAV
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const CHAIR = ['PP......', 'PP......', 'PP......', 'PP......', 'PPPPPPPP', 'PPPPPPPP', 'P......P', 'P......P', 'P......P']
const BREAD = ['..BBBBBBBBBBBB..', '.BBBBBBBBBBBBBB.', 'BBBKBBBBBBBKBBBB', 'BBBBBBBBBBBBBBBB', 'BBBBBKKKKKBBBBBB', '.BBBBBBBBBBBBBB.', '..BBBBBBBBBBBB..']
const BREAD_C = { B: '#e8a24a', K: INK }
const CANDLE = ['..Y..', '.YOY.', '.YOY.', '..Y..', '.WWW.', '.WWW.', '.WWW.', '.WWW.', '.WWW.', 'KKKKK']
const CANDLE_C = { Y: SUN, O: ORANGE, W: CREAM, K: BROWN }
const PLATE = ['..WWWWWWWWW..', '.WWWNNNNNWWW.', 'WWNNNNNNNNNWW', '.WWWNNNNNWWW.', '..WWWWWWWWW..']
const PLATE_C = { W: CREAM, N: '#e8c84a' }
const HAND = ['.F.F.F...', '.F.F.F.F.', '.FFFFFFF.', 'FFFFFFFF.', '.FFFFFF..', '..FFFF...']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']

const CAMEOS = [
  { sign: S, cap: 'An hour early. | To *rehearse feelings.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', tears: lt => lt > 1.2 ? 2 : 1, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 800, 720, 90, pop01(t, P.t0 + 0.15, 0.3, 2), 6, 0)
      bubble(x, 790, 940, lt > 1.2 ? 'HI!! …too much.' : 'hi… hey… hi?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      lab(x, 790, 1110, 'DATE AT: 7:00', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'They pulled out a chair. | Pisces *sobbed.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const pull = ease.outCubic(prog(lt, 0.3, 0.8))
      drawBits(x, CHAIR, { P: BROWN }, lerp(760, 840, pull), 960, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      lab(x, 790, 700, 'MANNERS: DEVASTATING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: PINK, rot: 0.04, size: 28 })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Named the breadstick. | *Couldn’t eat Gary.*', mood: lt => lt > 1.4 ? 'wide' : 'heart', tears: lt => lt > 1.4 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BREAD, BREAD_C, 790, 900, 16 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.08 })
      lab(x, 790, 760, 'GARY', pop01(t, P.t0 + 0.7, 0.3, 2.4), { bg: CREAM, rot: 0.06, size: 40 })
      bubble(x, 790, 1090, 'I can’t. | he trusts me.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'Already picked | *“our song.”*', mood: 'heart', tears: 2, look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      notes(x, t, 790, 960, { n: 5, cell: 9, col: LAV, alpha: clamp(lt * 2) })
      lab(x, 790, 720, 'OUR SONG: CHOSEN', pop01(t, P.t0 + 0.5, 0.3, 2.2), { bg: LAV, rot: -0.04 })
      lab(x, 790, 1100, 'TIME TOGETHER: 6 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: GOLD, rot: 0.04, size: 28 })
    } },
  { sign: S, cap: 'The candle flickered. | *A sign from above.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 2 : 1, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const fl = lt > 0.6 && lt < 1.0 ? 0.6 + 0.4 * Math.sin(t * 60) : 1
      drawBits(x, CANDLE, CANDLE_C, 800, 950, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { sy: fl })
      x.save(); x.globalAlpha = 0.18 * pop01(t, P.t0 + 0.2, 0.3, 2); x.fillStyle = SUN; x.beginPath(); x.arc(800, 860, 140, 0, Math.PI * 2); x.fill(); x.restore()
      bubble(x, 790, 680, 'the universe | approves!!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: SUN, tail: 'bl' })
      sparkles(x, t, 800, 860, P.t0 + 1.2, 6, 150, 0.4, [SUN, BONE, LAV])
    } },
  { sign: S, cap: 'Whole life story. | *By the appetizer.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const CH = ['born', 'cried', 'moved', 'cried', 'a goldfish', 'cried']
      const n = Math.min(6, 1 + Math.floor(lt * 3))
      card(x, 790, 860, 330, 380, pop01(t, P.t0 + 0.15, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'MY LIFE', 0, -160, { size: 28, font: MONO, weight: 700 })
        for (let i = 0; i < n; i++) { x.fillStyle = [SKYB, LAV, PINK][i % 3]; x.fillRect(-140, -118 + i * 50, 22, 22); txt(x, `ch. ${i + 1}: ${CH[i]}`, -100, -106 + i * 50, { size: 26, align: 'left' }) }
      })
      lab(x, 790, 1110, 'COURSE: 1 OF 3', pop01(t, P.t0 + 1.8, 0.3, 2.2), { bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'The date laughed once. | Pisces *wrote a poem.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'ha!', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 0.7, 0.9)), { size: 44, col: GREY, tail: 'bc' })
      card(x, 790, 880, 320, 300, pop01(t, P.t0 + 0.9, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        txt(x, 'Ode to', 0, -100, { size: 34 }); txt(x, 'a Laugh', 0, -56, { size: 34 })
        for (let i = 0; i < 4; i++) { x.fillStyle = GREY; x.fillRect(-110, -4 + i * 34, 220 - (i % 2) * 50, 10) }
      })
      lab(x, 790, 1100, 'STANZAS: 14', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: LAV, rot: 0.04 })
    } },
  { sign: S, cap: 'Ordered the same dish. | *Soulmates. Obviously.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt > 1.2 ? 3 : 2, look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 810, 880, 190 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 13, glyph: false, tears: lt > 1.4 ? 1 : 0 })
      drawBits(x, PLATE, PLATE_C, 560, 1090, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PLATE, PLATE_C, 810, 1090, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      lab(x, 810, 700, 'SAME PASTA', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: GOLD, rot: 0.05 })
      hearts(x, t, 680, 900, P.t0 + 1.4, { n: 5, life: 1.8, spread: 260, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Said goodnight. | *Waved for ten minutes.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, MOON, { Y: SUN }, 860, 660, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, HAND, { F: LAV }, F.x + 170, F.cy - 70, 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.4 * Math.sin(t * 8) })
      lab(x, 790, 920, 'STILL WAVING', pop01(t, P.t0 + 0.9, 0.3, 2.2), { bg: SKYB, rot: -0.04 })
      lab(x, 790, 1100, 'DATE: LEFT 9 MIN AGO', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: GOLD, rot: 0.04, size: 28 })
    } },
]

const F = makeFilm({
  id: 'r2t0250', key: 'F', accent: ACC, solo: S, ending: 'card',
  title: 'First-date Pisces | *be like.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'cancer', chip: "IT'S A MATCH" },
  group: { cap: 'One date. | *Nine big feelings.*', mood: 'heart' },
  lesson: { text: 'Feel it all. | The right one *feels it too.*', chip: 'DATE TWO: BOOKED' },
  last: { text: 'Same dish. | *Same tears.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
