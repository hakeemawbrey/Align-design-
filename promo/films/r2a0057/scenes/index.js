// r2a0057: star_advice, ADVICE SOLO, "Aquarius, have you | eaten today?" (~51 s vertical, signs3kit, music: lofi · F)
// One sign the whole film (solo mode, 9 cards): a relatable Aquarius truth + a warm reframe, one visual gag each.
//   0.0–3.6    "Aquarius, have you | *eaten today?*"
//   3.6–37.8   lost in a big idea (a lightbulb, then an apple) · saving the world (LUNCH FIRST) · coffee isn't a meal (+ MUFFIN)
//              · one lemon in the fridge (soup counts) · forgot again (SNACK O'CLOCK alarm) · chart says genius (geniuses eat
//              too) · eating at the laptop (take ten) · friends ask you out (tacos at 7?) · water bearer, drink some too
//  37.8        "Big brain. | *Bigger snack.*"
//  41.0        LESSON: "Your ideas need you | *fed and rested.*"  STATUS: FED
//  46.9        "Go eat something | *warm.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQUA = '#6fe3e0', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#7ee08a', YEL = '#ffe14a'

const BULB = ['..YYYYY..', '.YYYYYYY.', 'YYYWYYYYY', 'YYWYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...GGG...', '...ggg...', '...GGG...']
const APPLE = ['....L...', '...LS...', '.RRRSRR.', 'RRWRRRRR', 'RWRRRRRR', 'RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '..RR.RR.']
const GLOBE = ['..BBBBB..', '.BGGBBBB.', 'BGGGBBGGB', 'BBGBBBGGB', 'BBBBBGGBB', 'BGGBBBBBB', '.BGGBBBB.', '..BBBBB..']
const SANDWICH = ['..BBBBBBBBBB..', '.BBBBBBBBBBBB.', 'GGGGGGGGGGGGGG', 'RRRRRRRRRRRRRR', 'YYYYYYYYYYYYYY', '.BBBBBBBBBBBB.']
const SANDWICH_C = { B: '#d99a4e', G: '#5fd068', R: RED, Y: '#ffd23a' }
const MUG = ['.S.S.....', '..S.S....', 'WWWWWWW..', 'WCCCCCWWW', 'WWWWWWW.W', 'WWWWWWW.W', 'WWWWWWWWW', 'WWWWWWW..', '.WWWWW...']
const MUFFIN = ['..PPPP..', '.PPPPPP.', 'PPKPPKPP', 'PPPPPPPP', '.BBBBBB.', '.BbBbBb.', '..BBBB..']
const LEMON = ['..YYYY..', '.YYYYYY.', 'YYYYYYYY', '.YYYYYY.', '..YYYY..']
const BOWL = ['.S..S..S.', '..S..S...', 'OOOOOOOOO', 'WOOOOOOOW', '.WWWWWWW.', '..WWWWW..']
const ALARM = ['.K.....K.', 'KK.....KK', '..RRRRR..', '.RWWWWWR.', 'RWWWKWWWR', 'RWWWKWWWR', 'RWWWKKKWR', 'RWWWWWWWR', '.RWWWWWR.', '..RRRRR..', '.K.....K.']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG', 'GGGGGGGGGGGG']
const GLASS = ['W.....W', 'W.....W', 'WBBBBBW', 'WBBBBBW', 'WBWBBBW', 'WBBBBBW', '.WWWWW.']

const S = 'aquarius'
const CAMEOS = [
  { sign: S, cap: 'Lost in a big idea? | *Ideas like snacks.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const sw = lt > 1.2
      if (!sw) drawBits(x, BULB, { Y: YEL, W: '#fff', G: '#b8c2d0', g: '#8a8aa0' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else drawBits(x, APPLE, { L: GREEN, S: BROWN, R: RED, W: '#ff9aa6' }, 790, 860, 24 * pop01(t, P.t0 + 1.2, 0.3, 2))
      sparkles(x, t, 790, 860, P.t0 + 1.25, 7, 160, 0.2)
    } },
  { sign: S, cap: 'Saving the world? | *Lunch first, hero.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GLOBE, { B: '#5aa8ff', G: GREEN }, 790, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SANDWICH, SANDWICH_C, 790, 1010, 18 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 1130, 'LUNCH FIRST', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: "Coffee isn't a meal. | *Add a muffin.*", mood: lt => lt > 1.3 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: BONE, C: BROWN, S: '#cfc7ff' }, 720, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, MUFFIN, { P: PINK, K: INK, B: '#d99a4e', b: BROWN }, 880, 920, 18 * pop01(t, P.t0 + 1.1, 0.3, 2))
      label(x, 880, 760, '+ MUFFIN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One lemon in the fridge? | *Soup counts.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LEMON, { Y: YEL }, 790, 740, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      label(x, 790, 830, 'THE WHOLE FRIDGE', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 26, bg: BONE, font: MONO, weight: 700 })
      drawBits(x, BOWL, { O: '#ffb34a', W: BONE, S: '#cfc7ff' }, 790, 1010, 22 * pop01(t, P.t0 + 1.2, 0.3, 2))
    } },
  { sign: S, cap: 'Forgot to eat again? | *Set a cute alarm.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ring = lt > 0.8 && lt < 1.8
      drawBits(x, ALARM, { K: INK, R: PINK, W: BONE }, 790 + (ring ? Math.sin(t * 60) * 6 : 0), 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1090, "SNACK O'CLOCK", pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: AQUA, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Chart says genius? | *Geniuses eat too.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.stroke()
        x.strokeStyle = AQUA; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.stroke()
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 70, Math.sin(a) * 70); x.lineTo(Math.cos(a) * 120, Math.sin(a) * 120); x.stroke() }
        x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.moveTo(-50, -40); x.lineTo(40, 50); x.lineTo(55, -30); x.closePath(); x.stroke()
        x.restore()
      }
      label(x, 790, 1040, 'CHART: GENIUS', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 30, bg: GOLD, font: MONO, weight: 700 })
      label(x, 790, 1120, 'NEEDS: PASTA', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 30, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Eating at the laptop? | *Take ten.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: lt => lt > 1.4 ? [0, -1] : [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const shut = ease.outCubic(prog(lt, 1.2, 1.5))
      drawBits(x, shut > 0.5 ? LAPTOP.slice(5) : LAPTOP, { K: INK, S: SKYB, G: '#b8c2d0' }, 790, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'BREAK: 10 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Friends asking you out? | *Say yes to dinner.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'tacos at 7?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: SKYB, tail: 'br' })
      bubble(x, 790, 940, 'YES.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 56, col: AQUA, tail: 'bl' })
      hearts(x, t, 790, 1080, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'The water bearer? | *Drink some too.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GLASS, { W: BONE, B: SKYB }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, '♒ HYDRATED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: AQUA, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0057', key: 'F', accent: AQUA, solo: S, ending: 'lesson',
  title: 'Aquarius, have you | *eaten today?*',
  cameos: CAMEOS,
  group: { cap: 'Big brain. | *Bigger snack.*', mood: 'heart' },
  lesson: { text: 'Your ideas need you | *fed and rested.*', chip: 'STATUS: FED' },
  last: { text: 'Go eat something | *warm.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
