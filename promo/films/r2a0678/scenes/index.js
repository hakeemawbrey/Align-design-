// r2a0678: ADVICE SOLO, "Gemini, half-done | hobbies count." (topic: you don't have to finish every hobby; ~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign (solo, 9 cards): a relatable truth and a warm reframe each, one gag each. Ending: group.
//   played the ukulele once, it counts · twelve hobby tabs = curiosity · half a scarf, a great headband
//   · the pottery bowl (ish) · trying IS the hobby · a brain that loves new · nobody's grading · an air sign, float
//   · the paints will wait
//   group "Start everything. | *Love every start.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { note, bits, ORANGE, RED, WOOD, PAPER } from '../props.js'

const S = 'gemini', L = { x: -170 }, GEM = '#ffd23a'
const UKE = [
  '..........KK',
  '.........KKK',
  '........NN..',
  '.......NN...',
  '......NN....',
  '..BBBNN.....',
  '.BBBBBB.....',
  'BBBKKBBB....',
  'BBKKKKBB....',
  'BBBKKBBB....',
  '.BBBBBB.....',
  '..BBBB......',
]
const UKE_C = { K: INK, N: '#8a4a2e', B: '#ffb34a' }
const SCARF = ['RRWWRRWWRR', 'RRWWRRWWRR', 'RRWWRRWWRR', '.......Y..', '........Y.', '.........Y']
const SCARF_C = { R: PINK, W: BONE, Y: GOLD }
const LUMPY = ['.CC....CCC', 'CccccccccC', 'CCccccccCC', '.CCCCCCCC.', '.CCcCCCCC.', '..CCCCCC..', '...CCCC...']
const LUMPY_C = { C: '#c98f5a', c: '#8a5a3a' }
const BULB = ['..YYY..', '.YYYYY.', 'YYYWYYY', 'YYYYYYY', '.YYYYY.', '..YYY..', '..GGG..', '..GGG..', '...G...']
const BULB_C = { Y: '#fff1a8', W: '#ffffff', G: '#9aa5c4' }
const KITE = ['....P....', '...PPP...', '..PPYPP..', '.PPPYPPP.', 'YYYYYYYYY', '.PPPYPPP.', '..PPYPP..', '...PPP...', '....P....', '....W....', '.....W...', '....W....', '...W.....']
const KITE_C = { P: SKYB, Y: GOLD, W: BONE }
const PALETTE = ['..WWWWWW..', '.WRWWYWWW.', 'WWWWWWWBWW', 'WGWW..WWWW', 'WWWW..WPWW', '.WWWWWWWW.', '..WWWWW...']
const PALETTE_C = { W: '#f3e2b8', R: RED, Y: GOLD, B: '#6f8cff', G: '#5fd068', P: PINK }

const CAMEOS = [
  { sign: S, cap: 'Played the ukulele once? | *That counts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, UKE, UKE_C, 790, 840, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      label(x, 790, 1080, 'SONGS: HALF OF ONE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GEM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Twelve new hobby tabs? | *That’s curiosity.*', mood: 'wide', look: [1, 0], star: L, hops: [1.0],
    front(x, t, lt, P) {
      ;['POTTERY', 'BIRDS', 'JAZZ', 'KNOTS', 'SOURDOUGH'].forEach((w, i) => label(x, 770 + (i % 2) * 40, 640 + i * 95, w, pop01(t, P.t0 + 0.2 + i * 0.22, 0.25, 2.2), { size: 34, bg: [GEM, PINK, MINT, SKYB, '#ffb34a'][i], rot: (i % 2 ? 0.05 : -0.05), font: MONO, weight: 700 }))
    } },
  { sign: S, cap: 'Half a scarf? | *A great headband.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, SCARF, SCARF_C, 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1040, 'HEADBAND NOW ✦', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Quit pottery? | *You made a bowl.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LUMPY, LUMPY_C, 790, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1050, 'A BOWL (ISH)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 42, bg: '#c98f5a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Trying things | *is the hobby.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(prog(lt, 0.4, 1.4) * 4))
      note(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ['chess', 'yoga', 'baking', 'birds'].map((w, i) => w + (i < n ? ' ✓' : ' ·')).join(' | '), { head: 'TRIED IT', headBg: MINT, size: 40, w: 340 })
    } },
  { sign: S, cap: 'A brain that loves new | *is a gift.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: L,
    front(x, t, lt, P) {
      drawBits(x, BULB, BULB_C, 790, 820, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      if (lt > 1.0) { x.save(); x.globalAlpha = 0.25 + 0.1 * Math.sin(t * 8); x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(790, 780, 190, 0, Math.PI * 2); x.fill(); x.restore() }
      sparkles(x, t, 790, 800, P.t0 + 1.0, 8, 190, 0.2)
    } },
  { sign: S, cap: 'Nobody’s grading | *your hobbies.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? 'FUN | ✓' : '? | ', { head: 'REPORT CARD', headBg: RED, size: 64, w: 340 })
      hearts(x, t, 790, 640, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Your chart says air. | *Float a little.*', mood: 'sparkle', look: [1, -1], star: L, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, KITE, KITE_C, 800 + 20 * Math.sin(t * 2), 780 - 30 * ease.outCubic(prog(lt, 0.3, 1.5)), 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 3) })
      label(x, 790, 1080, 'AIR SIGN ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 42, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The paints | *will wait for you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, PALETTE, PALETTE_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      bubble(x, 790, 660, 'welcome | back!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 50, tail: 'bl', col: LAV })
    } },
]

const F = makeFilm({
  id: 'r2a0678', key: 'C', accent: GEM, solo: S, ending: 'group',
  title: 'Gemini, half-done | *hobbies count.*',
  cameos: CAMEOS,
  group: {
    cap: 'Start everything. | *Love every start.*', mood: 'sparkle',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
