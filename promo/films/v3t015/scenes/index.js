// v3t015: THE SIGNS AS… v3, solo, "Dating a Taurus | be like." (~43 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "Dating a Taurus | *be like.*"  One big Taurus pops in, then dives into the cards.
//   3.6–37.8   nine cards, every one Taurus:
//              same restaurant, visit #212 · "I love you" after eleven months · a hug you can't leave · love = warm bread
//              · bought you a blanket, kept it · a new café? betrayal · mid-argument, still holding hands
//              · matched once, picked out a sofa · gave you a key… to the snack drawer
//  37.8        ending 'group': "Slow to fall. | *Never lets go.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', GREEN = '#5fd068', CREAM = '#fff4e2'

const TABLE = [
  'RWRWRWRWRWRWR',
  'WRWRWRWRWRWRW',
  'RWRWRWRWRWRWR',
  '......B......',
  '......B......',
  '.....BBB.....',
]
const TABLE_C = { R: '#e23d4e', W: CREAM, B: '#8a4a2e' }
const BREAD = [
  '..BBBBBBBB..',
  '.BBbBBBbBBB.',
  'BBBBbBBBbBBB',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
]
const BREAD_C = { B: '#e0a050', b: '#fff0c0' }
const BLANKET = [
  'PPLLPPLLPPLLPP',
  'PPLLPPLLPPLLPP',
  'LLPPLLPPLLPPLL',
  'LLPPLLPPLLPPLL',
  'PPLLPPLLPPLLPP',
  'PPLLPPLLPPLLPP',
  'LLPPLLPPLLPPLL',
]
const BLANKET_C = { P: PINK, L: '#ffd0e0' }
const SOFA = [
  '.GGGGGGGGGGGG.',
  'GGggggggggggGG',
  'GGggggggggggGG',
  'GGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  '.K..........K.',
]
const SOFA_C = { G: '#5fd068', g: '#8fe8a0', K: '#5a2e1a' }
const KEY = [
  '.YYY.........',
  'Y...Y........',
  'Y...YYYYYYYYY',
  'Y...Y...Y.Y.Y',
  '.YYY.........',
]
const KEY_C = { Y: GOLD }
const DRAWER = [
  'BBBBBBBBBBBBB',
  'BwwwwwwwwwwwB',
  'BwwwwYYYwwwwB',
  'BwwwwwwwwwwwB',
  'BBBBBBBBBBBBB',
]
const DRAWER_C = { B: '#8a4a2e', w: '#c97a3a', Y: GOLD }
const CUP = ['.S.S.', '..S..', 'WWWWW', 'WCCCW', 'WCCCW', '.WWW.']
const CUP_C = { S: '#ffffff', W: CREAM, C: '#8a4a2e' }

const TAU = { sign: 'taurus' }
const CAMEOS = [
  { ...TAU, cap: 'Every date night: | the *same restaurant.*', mood: 'heart', star: { x: -170 },
    back(x, t, lt, P) { drawBits(x, TABLE, TABLE_C, 790, 1080, 20 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      const n = Math.min(212, 180 + Math.floor(Math.max(0, lt - 0.4) * 30))
      label(x, 790, 760, `VISIT #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'the usual ×2', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { ...TAU, cap: 'Said “I love you.” | After *eleven months.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const m = Math.min(11, 1 + Math.floor(Math.max(0, lt - 0.2) * 9))
      label(x, 790, 760, `MONTH ${m}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 44, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'love… you.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 48, col: PINK, tail: 'bl' })
      hearts(x, t, 540, 860, P.t0 + 1.7, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 2 })
    } },
  { ...TAU, cap: 'Hug a Taurus. | You’re *never leaving.*', mood: 'heart', star: { x: -110 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 690, 900, 230 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 13, glyph: false })
      const h = Math.min(3, Math.floor(Math.max(0, lt - 0.6) * 2.5))
      label(x, 790, 660, `HUG: HOUR ${h + 1}`, pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'can i… go?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { ...TAU, cap: 'Their love language? | *Warm bread.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, BREAD, BREAD_C, 790, 900, 22 * k)
      if (k > 0.5) for (let i = 0; i < 3; i++) { const ph = ((t * 0.8 + i / 3) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillStyle = '#ffffff'; x.fillRect(730 + i * 60 + Math.sin(ph * 8 + i) * 8, 820 - ph * 120, 10, 22); x.restore() }
      label(x, 790, 1080, 'FRESH, FOR YOU', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { ...TAU, cap: 'Bought you a blanket. | *Then kept it.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.9, 1.5))
      drawBits(x, BLANKET, BLANKET_C, lerp(790, 420, p), lerp(880, 1080, p), 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.06, -0.1, p), alpha: lerp(1, 0.92, p) })
      label(x, 790, 700, 'A GIFT ♡', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1100, 'NOW: THEIRS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { ...TAU, cap: 'Suggested a new café? | *Betrayal.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 790, 900, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'a NEW one?', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 46, tail: 'bl' })
      label(x, 790, 1090, 'TRUST: −100', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { ...TAU, cap: 'Mid-argument. | *Still holding hands.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'heart', star: { x: -120 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 750, 900, 230 * k, { mood: Math.floor(lt * 2) % 2 ? 'heart' : 'squint', look: [-1, 0], seed: 17, glyph: false })
      bubble(x, 560, 660, 'you’re wrong', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 560, 1110, 'HANDS: STILL HELD', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 940, P.t0 + 1.5, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 4 })
    } },
  { ...TAU, cap: 'Matched once. | *Picked out a sofa.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 680, '✦ IT’S A MATCH', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05 })
      drawBits(x, SOFA, SOFA_C, 790, 930, 20 * pop01(t, P.t0 + 0.9, 0.35, 2))
      label(x, 790, 1110, 'FOR US. FOREVER.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { ...TAU, cap: 'Gave you a key. | *To the snack drawer.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, KEY, KEY_C, 790, 760, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      sparkles(x, t, 790, 760, P.t0 + 0.5, 6, 140, 0.4)
      drawBits(x, DRAWER, DRAWER_C, 790, 980, 20 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 1130, 'HIGHEST HONOUR', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t015', key: 'G', accent: GREEN, solo: 'taurus', ending: 'group',
  title: 'Dating a Taurus | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Slow to fall. | *Never lets go.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
