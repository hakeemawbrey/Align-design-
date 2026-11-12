// r2t0271: star_talk, SOLO (taurus), "Taurus bosses | *be like.*" (the batch topic, tightened to fit two lines) (~46 s vertical, signs3kit social cut, music: lofi · C)
// One sign, nine cards: the most extreme Taurus boss. Ending: group (the group beat is the punchline).
//   every meeting has a cheese board · deadline's Friday, which Friday? · lunch break: two hours minimum
//   · installed a nap room (for them) · new system? we like the old one · your bonus: a really nice candle
//   · dress code: soft pants only · hired you because your sign matched · you did great, here's a pastry
//   group "Best boss ever. | *Out to lunch.*"  (pays off the two-hour lunch)
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, calendar, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const S = 'taurus', L = { x: -180 }
const CHEESE = [['.........YY', '.......YYYY', '.....YYYoYY', '...YYYYYYYY', '.YYoYYYYoYY', 'YYYYYYYYYYY', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW'], { Y: '#ffd86b', o: '#e0b040', W: WOOD }]
const CANDLE = [['....F....', '...FYF...', '...FYF...', '....K....', '.PPPPPPP.', '.PPPPPPP.', '.PWWWWWP.', '.PWPPPWP.', '.PWWWWWP.', '.PPPPPPP.', '.PPPPPPP.'], { F: ORANGE, Y: GOLD, K: INK, P: LAV, W: PAPER }]
const CROISSANT = [['....CCCC....', '..CCcCCcCC..', '.CCCCcCCCCC.', 'CCcCCCCcCCCC', 'CC.CCcCCC.CC', 'C....CC....C'], { C: '#e8a64a', c: '#a8642a' }]
const CLOCK = [['..WWWWWWW..', '.WWWWIWWWW.', 'WWWWWIWWWWW', 'WWWWWIWWWWW', 'WWWWWIIIIWW', 'WWWWWWWWWWW', 'WWWWWWWWWWW', '.WWWWWWWWW.', '..WWWWWWW..'], { W: PAPER, I: INK }]
const PILLOW = [['.WWWWWWWWWWW.', 'WLLLLLLLLLLLW', 'WLWLLLLLLLWLW', 'WLLLLLLLLLLLW', 'WLLLLLLLLLLLW', '.WWWWWWWWWWW.'], { W: PAPER, L: PINK }]

// a little profile card: a sign star, its name, and a stamp line under it
function profile(x, t, cx, cy, k, id, name) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -150, 260, 320)
  x.fillStyle = INK; x.fillRect(-136, -166, 272, 332)
  x.fillStyle = PAPER; x.fillRect(-128, -158, 256, 316)
  x.fillStyle = SKYB; x.fillRect(-128, -158, 256, 54)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NEW HIRE', 0, -130)
  x.restore()
  x.save(); x.translate(cx, cy); x.rotate(0.04)
  signChar(x, t, id, 0, -6 * k, 150 * k, { mood: 'happy', seed: 31, glyph: false, glow: 0.5 })
  x.fillStyle = INK; x.font = `800 ${Math.round(30 * k)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, 118 * k)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Every meeting | has a *cheese board.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 650, 'AGENDA: SNACKS', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, CHEESE[0], CHEESE[1], 790, 880, 22 * pop01(t, P.t0 + 0.6, 0.35, 2), { rot: 0.04 })
      bubble(x, 790, 1080, 'questions? | no? eat.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Deadline’s Friday. | *Which Friday?*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'DEADLINE', lt > 1.0 ? '??' : 'FRI')
      label(x, 790, 1070, 'NO RUSH. EVER.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lunch break? | *Two hours. Minimum.*', mood: 'heart', look: [1, 0], star: L, hops: [0.9],
    front(x, t, lt, P) {
      drawBits(x, CLOCK[0], CLOCK[1], 790, 790, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1040, 'BACK AT 3', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 46, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Built a nap room. | *For themself.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: L,
    back(x, t, lt, P) { drawBits(x, PILLOW[0], PILLOW[1], 360, 1060, 22 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'DO NOT DISTURB', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'meeting at… | after.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'New system? | *We like the old one.*', mood: lt => lt > 1.0 ? 'eyeroll' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'new software | new chairs | new anything', { head: 'PROPOSALS', headBg: SKYB, size: 34, w: 360, strike: lt > 1.0 ? [0, 1, 2] : [] })
      bubble(x, 790, 1060, 'it works fine.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Your bonus? | *A really nice candle.*', mood: 'sparkle', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, CANDLE[0], CANDLE[1], 790, 840, 22 * k)
      label(x, 790, 610, 'BONUS', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 46, bg: GOLD, rot: -0.05 })
      bubble(x, 790, 1090, 'it’s fig scented.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Dress code: | *soft pants only.*', mood: 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'soft pants | fuzzy socks | no shoes', { head: 'DRESS CODE', headBg: PINK, size: 36, w: 360 })
      label(x, 790, 1060, 'STRICTLY ENFORCED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: RED, color: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hired you because | *your sign matched.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      profile(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 'virgo', 'YOU · VIRGO')
      label(x, 790, 1070, 'COMPATIBLE ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 42, bg: MINT, rot: -0.04 })
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 200, 0.4)
    } },
  { sign: S, cap: 'You did great. | Here’s *a pastry.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [0.8], keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'proud of you.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      drawBits(x, CROISSANT[0], CROISSANT[1], 790, 880, 22 * pop01(t, P.t0 + 0.8, 0.35, 2), { rot: -0.06 })
      hearts(x, t, 790, 860, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0271', key: 'C', accent: '#7dffb0', solo: S, ending: 'group',
  title: 'Taurus bosses | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Best boss ever. | *Out to lunch.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
