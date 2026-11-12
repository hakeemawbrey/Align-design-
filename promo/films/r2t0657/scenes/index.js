// r2t0657: star_talk, SOLO (aquarius), "Aquarius red flags | *we love.*" (signs3kit social cut, music: lofi · E).
// One sign the whole way: nine lovable Aquarius "red flags", each pushed to the most extreme version.
//   "I'm not like the others" (verified) · replied in three days with a theory · built a robot to say hi
//   · best friend: the moon · matched because you believe in aliens · feelings filed under "someday"
//   · brought a telescope to dinner · vanished for a week, came back with a band · your anniversary: a bee rescue
// Ending: card. group "Weird? | *Our favourite.*" · lesson · "Their match? | *Also into aliens.*" over Aquarius + Gemini.
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'aquarius', ST = { x: -180 }

const ROBOT = ['....R....', '....K....', '.SSSSSSS.', '.SBSSSBS.', '.SSSSSSS.', '.SSRRRSS.', '..SSSSS..', 'SSSSSSSSS', 'S.SSSSS.S', 'S.SSSSS.S', '..S...S..', '..S...S..']
const ROBOT_C = { R: RED, K: INK, S: STEEL, B: SKYB }
const BEE = ['..WW.WW..', '..WWWWW..', '.YYKKYYK.', 'YYYKKYYKK', 'YYYKKYYKK', '.YYKKYYK.']
const BEE_C = { W: '#e8f6ff', Y: '#ffd23a', K: INK }
// a brass telescope on a tripod, pointed up at the sky
function scope(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.lineCap = 'round'
  for (const [dx, w, c] of [[0, 18, INK], [0, 10, '#8a4a2e']]) { x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(0, 0); x.lineTo(-90, 190); x.moveTo(0, 0); x.lineTo(90, 190); x.moveTo(0, 0); x.lineTo(0, 200); x.stroke() }
  x.rotate(-0.55)
  x.fillStyle = INK; x.fillRect(-130, -42, 270, 84); x.fillRect(140, -56, 50, 112)
  x.fillStyle = GOLD; x.fillRect(-124, -36, 258, 72); x.fillStyle = '#c98f2a'; x.fillRect(-124, 14, 258, 22)
  x.fillStyle = GOLD; x.fillRect(146, -50, 38, 100); x.fillStyle = SKYB; x.fillRect(176, -40, 10, 80)
  x.fillStyle = INK; x.fillRect(-170, -24, 44, 48); x.fillStyle = STEEL; x.fillRect(-164, -18, 36, 36)
  x.fillStyle = INK; x.fillRect(-14, 30, 28, 24)
  x.restore()
}
const MOON_C = { Y: '#ffe7a8' }

const CAMEOS = [
  { sign: S, cap: '“I’m not like the others.” | *Verified.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'i’m different.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      L(x, 800, 900, 'OTHERS: 0', pop01(t, P.t0 + 0.9, 0.3, 2.2), STEEL, 0.04, 40)
      L(x, 800, 1060, 'WEIRD: CERTIFIED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
      sparkles(x, t, 800, 1060, P.t0 + 1.45, 6, 150, 0.4)
    } },
  { sign: S, cap: 'Replied in three days. | *With a theory.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '3 DAYS LATER', headCol: SKYB, lines: [['hey :)', PINK, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['what if', SKYB, pop01(t, P.t0 + 1.0, 0.2, 2), false], ['birds are', SKYB, pop01(t, P.t0 + 1.3, 0.2, 2), false], ['shy aliens', SKYB, pop01(t, P.t0 + 1.6, 0.2, 2), false]], size: 28 })
    } },
  { sign: S, cap: 'Built a robot | *to say hi for them.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 800 + 8 * Math.sin(t * 6), 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 810, 640, 'HELLO. HUMAN.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl', font: MONO, weight: 700 })
      L(x, 800, 1110, 'SOCIAL BATTERY: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 30)
    } },
  { sign: S, cap: 'Best friend? | *The moon.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, -1], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, ['..YYY..', '.YYY...', 'YYY....', 'YYY....', 'YYY....', '.YYY...', '..YYY..'], MOON_C, 820, 790, 34 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 1060, 'hi bestie', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      hearts(x, t, 800, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Matched with you | *for your alien takes.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: PINK, lines: [['♒ aquarius', SKYB, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['aliens real?', PINK, pop01(t, P.t0 + 0.9, 0.2, 2), true], ['OBVIOUSLY', SKYB, pop01(t, P.t0 + 1.3, 0.2, 2), false]], size: 28 })
      hearts(x, t, 810, 780, P.t0 + 1.5, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Feelings? | *Filed under “someday.”*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOX', 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 900, 'FEELINGS', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, 0, 34)
      L(x, 800, 680, 'OPEN: SOMEDAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), STEEL, 0.05, 34)
      L(x, 800, 1090, 'TAPE: 9 LAYERS', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Dinner date? | *Brought a telescope.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      scope(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 640, 'TABLE FOR 2 + SATURN', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, 0.04, 30)
      sparkles(x, t, 900, 720, P.t0 + 1.4, 6, 120, 0.6, [SKYB, BONE, GOLD])
      L(x, 800, 1100, 'FOOD: COLD. VIEW: 10', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Gone for a week. | *Came back with a band.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [0.8, 1.4, 2.0],
    front(x, t, lt, P) {
      L(x, 800, 700, 'BACK!', pop01(t, P.t0 + 0.3, 0.3, 2.2), SKYB, 0.04, 52)
      notes(x, t, 800, 980, { n: 5, cell: 8, col: SKYB, seed: 4 })
      L(x, 800, 1060, 'BAND MEMBERS: 1', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'Your anniversary? | *A bee rescue.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2); drawBits(x, BEE, BEE_C, 700 + (i % 3) * 110 + 14 * Math.sin(t * 4 + i), 790 + Math.floor(i / 3) * 150 + 10 * Math.cos(t * 5 + i), 14 * k, { rot: 0.15 * Math.sin(t * 7 + i) }) }
      bubble(x, 800, 620, 'so romantic', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      L(x, 800, 1090, 'BEES SAVED: 50', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0657', key: 'E', accent: ACC, solo: S, ending: 'card',
  title: 'Aquarius red flags | *we love.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'gemini', chip: 'ALIGNED' },
  group: { cap: 'Weird? | *Our favourite.*', mood: 'sparkle' },
  lesson: { text: 'Love them as they are. | *Unusual and true.*', chip: 'STATUS: ORIGINAL' },
  last: {
    text: 'Their match? | *Also into aliens.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
