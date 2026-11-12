// v3a138: ADVICE ROLL CALL, "What each sign | is too hard on." (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs, one warm line each: the thing they're too hard on themselves about, and a kinder take. Ending: group.
//   ♈ patience: loading · ♉ slow pace (the snail arrived) · ♊ unfinished hobbies · ♋ replaying 2009 · ♌ silver is still shiny
//   ♍ one tiny mistake nobody saw · ♎ someone mildly miffed · ♏ trusting the wrong one once · ♐ the trip that fell through
//   ♑ resting (guilt: 0) · ♒ not fitting in · ♓ crying (it's watering the garden)
//   49.2 "Go easy. | You’re *doing great.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { note, calendar, meter, bits, ORANGE, RED, PAPER, GREEN } from '../props.js'

const L = { x: -160 }
const SNAIL = [['....SSS.....', '...SsSSS....', '..SSsSsSS...', '..SSSSsSS..E', '...SSSSS...E', 'BBBBBBBBBBBB', '.BBBBBBBBBB.'], { S: ORANGE, s: '#c96a1e', B: '#c9f27a', E: INK }]
const SILVER = [['YYYYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..', '...Y...', '..YYY..', '.WWWWW.'], { Y: '#d6dbe8', W: '#8a5a3a' }]
const CAMEOS = [
  { sign: 'aries', cap: 'Their patience. | *It’s growing.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      meter(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 0.15 + 0.5 * ease.outCubic(prog(lt, 0.4, 2.0)), { title: 'PATIENCE', col: MINT, w: 320 })
      label(x, 790, 1000, 'LOADING…', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Their slow pace. | *Slow still arrives.*', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, SNAIL[0], SNAIL[1], 660 + 120 * ease.inOutCubic(prog(lt, 0.3, 1.6)), 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'ARRIVED ✓', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 48, bg: MINT, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Unfinished hobbies. | *Curious is a gift.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'guitar (3 chords) | knitting (1 sock) | french (bonjour)', { head: 'HOBBIES', headBg: GOLD, size: 32, w: 420 })
      label(x, 790, 1040, 'ALL OF THEM: FUN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Old mistakes. | *You were learning.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 720, 'REPLAYING: 2009', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 42, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'PLAYBACK: OFF ■', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 42, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1100, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Coming second. | *Silver still shines.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, SILVER[0], SILVER[1], 790, 830, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1060, 'STILL SHINY ✦', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 42, bg: ORANGE, rot: -0.04 })
      sparkles(x, t, 790, 830, P.t0 + 1.1, 8, 180, 0.4, [BONE, '#d6dbe8', GOLD])
    } },
  { sign: 'virgo', cap: 'One tiny mistake. | *Nobody noticed.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 700, 'MISTAKES: 1', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 50, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'nobody saw. | promise.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, tail: 'bl', col: LAV })
    } },
  { sign: 'libra', cap: 'Someone’s a bit annoyed. | *They’ll live.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 720, 'SOMEONE: MIFFED', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'WORLD: FINE ✓', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bits(x, 'mug', 790, 1060, 12 * pop01(t, P.t0 + 1.5, 0.3, 2))
    } },
  { sign: 'scorpio', cap: 'Trusting the wrong one. | *Your heart’s still good.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'heart', 790, 820, 26 * pop01(t, P.t0 + 0.3, 0.3, 2) * (1 + 0.06 * Math.sin(t * 6)))
      label(x, 790, 1040, 'STILL OPEN ♡', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: '#b07dff', rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Plans fell through? | *Plan B is an adventure.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: L, hops: [1.3], keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      calendar(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? 'PLAN B' : 'THE TRIP', lt > 1.0 ? 'YES!' : 'OFF', { topBg: lt > 1.0 ? GREEN : RED })
    } },
  { sign: 'capricorn', cap: 'Resting. | *Rest is productive.*', mood: lt => lt > 1.1 ? 'sleepy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.9 ? 'nap ✓' : 'nap', { head: 'TO-DO', headBg: MINT, size: 56, w: 300 })
      label(x, 790, 1000, 'GUILT: 0', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 48, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Not fitting in. | *You’re one of a kind.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2); x.save(); x.translate(690 + i * 70, 760); x.scale(k, k); x.fillStyle = INK; x.fillRect(-30, -30, 60, 60); x.fillStyle = '#9aa7c7'; x.fillRect(-25, -25, 50, 50); x.restore() }
      const k = pop01(t, P.t0 + 0.8, 0.3, 2.4); x.save(); x.translate(790, 900); x.rotate(0.785); x.scale(k, k); x.fillStyle = INK; x.fillRect(-42, -42, 84, 84); x.fillStyle = SKYB; x.fillRect(-36, -36, 72, 72); x.restore()
      label(x, 790, 1060, 'ONE OF A KIND', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.04 })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 7, 120, 0.3)
    } },
  { sign: 'pisces', cap: 'Crying so much. | *It’s watering the garden.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', tears: lt => lt < 1.2 ? 3 : 2, star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'flower', 700 + i * 100, 1060 - 10 * (i % 2), 14 * ease.outBack(prog(lt, 0.4 + i * 0.25, 1.0 + i * 0.25)))
      label(x, 790, 760, 'GARDEN: THRIVING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a138', key: 'F', accent: MINT, ending: 'group',
  title: 'What each sign | *is too hard on.*',
  cameos: CAMEOS,
  group: {
    cap: 'Go easy. | You’re *doing great.*',
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 1.2, { n: 10, life: 3, spread: 800, cell: 8, seed: 11 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
