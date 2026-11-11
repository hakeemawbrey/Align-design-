// v3t109: THE SIGNS AS… v3, "Jealous zodiacs | be like." (topic: when they're jealous) (~59 s vertical, signs3kit, lofi · F)
// Twelve signs in zodiac order, each the most extreme (and harmless) version of itself when jealous. Ending: lesson.
//   aries challenged your ex to a race · taurus: you liked their pasta, taurus made nine courses · gemini argued with
//   themself about who's jealous · cancer baked a sad pie · leo bought themself a trophy · virgo cleaned aggressively
//   · libra "fine", very convincingly · scorpio "not jealous", eye twitch · sagittarius jealous two seconds, then a
//   butterfly · capricorn got a promotion about it · aquarius liked the song first · pisces sobbed at "bestie"
//  49.2 "Nobody’s jealous. | *Totally.*" · LESSON "It’s just care. | Say it *kindly.*" · last "Then share | *the sad pie.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068', ORANGE = '#ffb34a'

const FLAG = ['KWKWKW', 'WKWKWK', 'KWKWKW', 'WKWKWK', 'P.....', 'P.....', 'P.....', 'P.....']
const PIE = [
  '...CCCCCCC...',
  '.CCCCCCCCCCC.',
  'CCCKCCCCCKCCC',
  'CCCCCCCCCCCCC',
  'CCCCKKKKKCCCC',
  'CCCKCCCCCKCCC',
  'TTTTTTTTTTTTT',
  '.TTTTTTTTTTT.',
]
const PIE_C = { C: '#e8b86a', K: '#8a4a2e', T: '#c9c9d8' }
const TROPHY = ['YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '.BBBBBBB.']
const TROPHY_C = { Y: GOLD, B: BROWN }
const SPONGE = ['YYYYYYYY', 'YYwYYwYY', 'GGGGGGGG', 'GGGGGGGG']
const SPONGE_C = { Y: '#ffe36a', w: '#e8c84a', G: GREEN }
const BFLY = ['P...P', 'PP.PP', '.PKP.', 'PP.PP', 'P...P']
const PLATE = ['.WWWWWWW.', 'WWOOOOOWW', '.WWWWWWW.']

const CAMEOS = [
  { sign: 'aries', cap: 'Met your ex. | Demanded *a race.*', mood: 'squint', star: { x: -180 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, W: '#fff4e2', P: '#c9c9d8' }, 820, 840, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 640, 'BEST OF 3', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1100, 'on your marks', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Liked their pasta? | Taurus made *nine courses.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(clamp((lt - 0.3) / 1.5) * 9) + 1)
      for (let i = 0; i < n; i++) drawBits(x, PLATE, { W: '#fff4e2', O: [ORANGE, RED, GREEN, GOLD, PINK][i % 5] }, 680 + (i % 3) * 115, 700 + Math.floor(i / 3) * 120, 12)
      label(x, 790, 1110, `COURSE ${n} OF 9`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Argued with themself | about *who’s jealous.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'squint' : 'wide', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: 0, y: 60, s: 260 },
    front(x, t, lt, P) {
      bubble(x, 330, 640, 'you are!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'br' })
      bubble(x, 760, 640, 'no, YOU are', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: '#fff1b0', tail: 'bl' })
      label(x, 540, 1140, 'ROUND 12', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'You went out. | Cancer baked *a sad pie.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', tears: lt => lt > 1.4 ? 1 : 0, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PIE, PIE_C, 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 650, 'FLAVOUR: LONELY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'You praised someone. | Leo *bought a trophy.*', mood: 'sparkle', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 800, 860, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 1090, 'BEST LEO: ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 1.0, 8, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Not jealous. | Just *cleaning. Hard.*', mood: 'squint', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SPONGE, SPONGE_C, 780 + Math.sin(t * 16) * 50, 980, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 16) * 0.15 })
      sparkles(x, t, 780, 960, P.t0 + 0.9, 6, 120, 0.2)
      sparkles(x, t, 780, 960, P.t0 + 1.9, 6, 150, 0.9)
      label(x, 800, 660, 'SPOTLESS. FINE.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Totally fine. | *Very* convincingly.', mood: 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) label(x, 800 + (i - 1) * 30, 660 + i * 150, 'FINE ✓', pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2.2), { size: 44, bg: [PINK, BONE, GOLD][i], rot: (i - 1) * 0.06 })
      if (lt > 1.8) bubble(x, 380, 640, '(not fine)', pop01(t, P.t0 + 1.8 * 1.29, 0.25, 2.2), { size: 28, col: LAV, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: '“I’m not jealous.” | *Eye twitch.*', mood: lt => Math.floor(lt * 3) % 3 === 0 && lt > 0.8 ? 'wink' : 'squint', star: { x: -150, s: 330 },
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'not jealous.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      const n = Math.max(1, Math.floor(clamp((lt - 0.8) / 1.2) * 7))
      label(x, 800, 1080, `TWITCH ×${n}`, pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: '#c94a8a', color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Jealous for two seconds. | Then *a butterfly.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: lt => lt > 1.1 ? [1, -1] : [0, 0], star: { x: -180 }, hops: [1.3, 1.7],
    front(x, t, lt, P) {
      label(x, 800, 1100, 'JEALOUSY: 0:02', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 1.0, 0.3, 2)
      drawBits(x, BFLY, { P: '#a35cf0', K: INK }, 780 + Math.sin(t * 2) * 80, 760 + Math.sin(t * 3.1) * 50, 26 * k, { sx: 0.6 + 0.4 * Math.abs(Math.sin(t * 9)) })
      bubble(x, 800, 620, 'ooh!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Got jealous. | Got *promoted.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(-0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -40, 280, 80); x.fillStyle = BROWN; x.fillRect(-132, -32, 264, 64)
        x.fillStyle = GOLD; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SENIOR VP', 0, 2)
        x.restore()
      }
      label(x, 800, 660, 'MOTIVATED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Found a new song? | Aquarius *liked it first.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'ever heard | of this band?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, col: SKYB, tail: 'br' })
      label(x, 800, 900, 'HEARD IT IN 2019', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1060, 'BEFORE IT WAS COOL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Called someone “bestie”? | Pisces *sobbed.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 1, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'hey bestie!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1060, 'NOT ME?!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3t109', key: 'F', accent: GREEN, ending: 'lesson',
  title: 'Jealous zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody’s jealous. | *Totally.*' },
  lesson: { text: 'It’s just care. | Say it *kindly.*', chip: 'FEELINGS: SAID' },
  last: {
    text: 'Then share | *the sad pie.*',
    draw(x, t, lt) {
      drawBits(x, PIE, PIE_C, 540, 840, 18 * pop01(t, t - lt + 0.6, 0.4, 2))
      hearts(x, t, 540, 800, t - lt + 1.2, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
