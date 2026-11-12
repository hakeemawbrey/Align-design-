// r2a0353: star_advice, ADVICE SOLO, "Taurus, before you | *send that text.*" (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine kind texting checks for a Taurus, each a relatable truth + a warm reframe and one light
// visual gag. Ending: card (lesson + last line over the match card).
//   0.0–3.6    "Taurus, before you | *send that text.*"
//   3.6–37.8   nine cards: hungry? eat first · still mad about 2019? let it float off · typing "fine."? say how you feel
//              · want your match over? just ask · slow to reply? that's okay · sorry first isn't losing · compliment
//              them out loud · same plan every week? try a new place · read it back, soft is strong
//  37.8        "Steady heart. | *Soft words.*"
//  41.0        LESSON UNLOCKED: "Steady words | build *steady love.*"  TEXT: SENT
//  46.9        "Cancer replied | *with a recipe.*" over the match card: Taurus + Cancer.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', PAPER = '#fff4e2'
const L = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 30, font: MONO, weight: 700, ...o })

// ── props
const SANDWICH = [
  '..BBBBBBBB..',
  '.BBBBBBBBBB.',
  'GGGGGGGGGGGG',
  'RRRRRRRRRRRR',
  'YYYYYYYYYYYY',
  'PPPPPPPPPPPP',
  '.BBBBBBBBBB.',
]
const SANDWICH_C = { B: '#e8b07a', G: '#5fd068', R: '#ff6b5a', Y: '#ffd23a', P: '#ff8fb1' }
// a little calendar page on a balloon string
function calendar(x, cx, cy, k, year, lift = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy - lift); x.scale(k, k); x.rotate(0.05 * Math.sin(lift * 0.02))
  x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, -100); x.lineTo(0, -170); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, -220, 56, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff8fb1'; x.beginPath(); x.arc(0, -220, 50, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-106, -106, 212, 212)
  x.fillStyle = PAPER; x.fillRect(-100, -100, 200, 200)
  x.fillStyle = '#ff6b5a'; x.fillRect(-100, -100, 200, 56)
  x.fillStyle = INK; x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(year, 0, 30)
  x.restore()
}
const COUCH = [
  '.LLLLLLLLLLLL.',
  'LLLLLLLLLLLLLL',
  'LLAAAAAAAAAALL',
  'LLAAAAAAAAAALL',
  'LLLLLLLLLLLLLL',
  'LLLLLLLLLLLLLL',
  '.K..........K.',
]
const COUCH_C = { L: '#c97bff', A: '#e8b0ff', K: '#2a2350' }
const HOURGLASS = [
  'WWWWWWWWW',
  '.KYYYYYK.',
  '..KYYYK..',
  '...KYK...',
  '....Y....',
  '...K.K...',
  '..K.Y.K..',
  '.KYYYYYK.',
  'WWWWWWWWW',
]
const HOURGLASS_C = { W: '#c98a4e', K: '#d8dbe8', Y: '#ffd23a' }
const PIN = [
  '..RRRRR..',
  '.RRRRRRR.',
  'RRRWWWRRR',
  'RRRWWWRRR',
  '.RRRRRRR.',
  '..RRRRR..',
  '...RRR...',
  '....R....',
]
function map(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.04)
  x.fillStyle = INK; x.fillRect(-176, -116, 352, 232)
  x.fillStyle = '#b7e37a'; x.fillRect(-170, -110, 340, 220)
  x.fillStyle = '#8fe3ff'; x.fillRect(40, -110, 60, 220)
  x.fillStyle = PAPER; x.fillRect(-170, 10, 340, 24); x.fillRect(-60, -110, 24, 220)
  x.restore()
}

const CAMEOS = [
  // 1 · eat first
  { sign: 'taurus', cap: 'Hungry? | *Eat first.* Then text.', mood: lt => lt < 1.3 ? 'squint' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const bite = lt > 1.0
      drawBits(x, SANDWICH, SANDWICH_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: bite ? 0.7 : 1 })
      L(x, 790, 650, 'MOOD: HANGRY', pop01(t, P.t0 + 0.4, 0.3, 2), { bg: '#ff6b5a' })
      if (lt > 1.3) L(x, 790, 1110, 'MOOD: LOVELY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: MINT })
    } },
  // 2 · 2019
  { sign: 'taurus', cap: 'Still mad about 2019? | *Let it float.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: lt => [1, lt > 1.2 ? -1 : 0], star: { x: -170 },
    front(x, t, lt, P) {
      calendar(x, 800, 1020, pop01(t, P.t0 + 0.2, 0.3, 2), '2019', 300 * ease.inCubic(prog(lt, 1.0, 2.4)))
      if (lt > 1.6) L(x, 800, 1130, 'BYE, 2019', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: LAV })
    } },
  // 3 · "fine."
  { sign: 'taurus', cap: 'Typing “fine.”? | Say *how you feel.*', mood: lt => lt < 1.3 ? 'squint' : 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.7, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const real = lt > 1.3
      bubble(x, 790, 820, real ? 'i miss you, | honestly' : 'fine.', pop01(t, real ? P.t0 + 1.3 : P.t0 + 0.2, 0.25, 2.2), { size: real ? 40 : 56, tail: 'bl', col: real ? PINK : BONE })
      if (real) hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 6 })
    } },
  // 4 · Align: your match, just ask
  { sign: 'taurus', cap: 'Want them over? | *Just ask.*', mood: lt => lt < 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      L(x, 790, 620, '✦ MATCH: CANCER', pop01(t, P.t0 + 0.2, 0.3, 2), { bg: GOLD })
      drawBits(x, COUCH, COUCH_C, 790, 1020, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 790, 800, 'movie night? | i’ll cook.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  // 5 · slow to reply
  { sign: 'taurus', cap: 'Slow to reply? | *That’s okay.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, HOURGLASS, HOURGLASS_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.4 ? Math.PI * ease.inOutCubic(prog(lt, 1.4, 1.9)) : 0 })
      L(x, 790, 1130, 'GOOD THINGS TAKE TIME', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: SKYB, size: 28 })
    } },
  // 6 · sorry first
  { sign: 'taurus', cap: 'Saying sorry first | *isn’t losing.*', mood: lt => lt < 1.3 ? 'squint' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'i’m sorry. | i love you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1000, 'LOVE: WINS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: MINT, size: 28 })
    } },
  // 7 · out loud
  { sign: 'taurus', cap: 'Compliment them. | *Out loud.*', mood: lt => lt < 1.1 ? 'wide' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'you looked | SO good today', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl', col: GOLD })
      sparkles(x, t, 790, 780, P.t0 + 0.6, 8, 220, 0.3)
      L(x, 790, 1020, 'THOUGHT IT FOR WEEKS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: LAV, size: 28 })
    } },
  // 8 · a new place
  { sign: 'taurus', cap: 'Same café every week? | *Try a new one.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      map(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      const mv = ease.inOutCubic(prog(lt, 1.0, 1.6))
      drawBits(x, PIN, { R: '#ff4f86', W: '#fff' }, lerp(720, 880, mv), lerp(870, 800, mv) - 40, 10 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 790, 1110, lt < 1.6 ? 'VISITS: 212' : 'NEW SPOT ✦', pop01(t, P.t0 + 0.6, 0.3, 2), { bg: lt < 1.6 ? BONE : MINT })
    } },
  // 9 · soft is strong
  { sign: 'taurus', cap: 'Read it back. | *Soft is strong.*', mood: lt => lt < 1.2 ? 'happy' : 'heart', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'thinking of you. | that’s all.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 1000, 'SENT WITH LOVE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: PINK })
      hearts(x, t, 470, 860, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0353', key: 'C', accent: ACC, solo: 'taurus', ending: 'card',
  title: 'Taurus, before you | *send that text.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Steady heart. | *Soft words.*', mood: 'heart' },
  lesson: { text: 'Steady words | build *steady love.*', chip: 'TEXT: SENT' },
  last: { text: 'Cancer replied | *with a recipe.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
