// r2t0447: star_talk, ROLLCALL, "The signs | at a *work retreat.*" (~61 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order at a work retreat, each the most extreme version of itself. Ending: lesson.
//   3.6–49.2   ♈ turned the trust fall into a race · ♉ only came for the free lunch · ♊ joined every breakout group
//              · ♋ calls the team "my family" · ♌ gave a keynote nobody asked for · ♍ colour-coded the campfire
//              · ♎ called a vote on lunch, twice · ♏ two truths and a lie: three lies · ♐ never came home (tent)
//              · ♑ answered emails mid trust fall · ♒ ran a workshop on time travel · ♓ hugged every tree, cried at each
//  49.2        "Nobody read | *the agenda.*"
//  52.4        LESSON: "Best team building? | *Being kind.*"  TEAM: BUILT
//  58.3        "Capricorn is | *still on email.*" (envelopes)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, clock, counter, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const ENVELOPE = ['WWWWWWWWWW', 'WKWWWWWWKW', 'WWKWWWWKWW', 'WWWKWWKWWW', 'WWWWKKWWWW', 'WWWWWWWWWW']
const ENV_C = { W: CREAM, K: SLATE }
const TREE = ['....GG....', '...GGGG...', '..GGGGGG..', '.GGGGGGGG.', '..GGGGGG..', '.GGGGGGGG.', 'GGGGGGGGGG', '....BB....', '....BB....']
const TREE_C = { G: GREEN, B: '#8a4a2e' }

/** a wooden podium in front of the star */
function podium(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -20, 300, 260); x.fillRect(-180, -44, 360, 40)
  x.fillStyle = WOOD; x.fillRect(-140, -10, 280, 240); x.fillStyle = '#e0a970'; x.fillRect(-172, -38, 344, 28)
  x.fillStyle = GOLD; x.fillRect(-40, 60, 80, 80); x.fillStyle = INK; x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♌︎', 0, 102)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Turned the trust fall | into *a race.*', mood: 'sparkle', star: { x: -160 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      drawBits(x, BM.TROPHY, BM.TROPHY_C, 790, 880, 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 680, 'TRUST FALL: 1ST', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'again! faster!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 0.7, 7, 150, 0.2)
    } },
  { sign: 'taurus', cap: 'Only came | for the *free lunch.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      const items = [BM.PIZZA, BM.SOUP, BM.PIZZA, BM.SOUP, BM.PIZZA]
      const cols = [BM.PIZZA_C, BM.SOUP_C, BM.PIZZA_C, BM.SOUP_C, BM.PIZZA_C]
      for (let i = 0; i < 5; i++) drawBits(x, items[i], cols[i], 790, 1060 - i * 80, 14 * pop01(t, P.t0 + 0.3 + i * 0.22, 0.3, 2.2))
      label(x, 790, 600, 'PLATE 1 (OF 6)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Joined every | *breakout group.*', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const G = [['GROUP A', MINT], ['GROUP B', PINK], ['GROUP C', GOLD], ['GROUP D', SKYB]]
      G.forEach(([s, c], i) => label(x, 780 + (i % 2 ? 30 : -30), 660 + i * 125, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2), { size: 36, bg: c, rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
    } },
  { sign: 'cancer', cap: 'Calls the team | *"my family."*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'my family ♡', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: SKYB, tail: 'bl' })
      label(x, 790, 900, 'MET THEM: TUESDAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 380, 800, P.t0 + 0.6, { n: 6, life: 2, spread: 220, cell: 8, seed: 3 })
    } },
  { sign: 'leo', cap: 'Gave a keynote. | *Nobody asked.*', mood: 'sparkle', star: { x: 0, y: -60 }, hops: [1.0],
    front(x, t, lt, P) {
      podium(x, 540, 1060, pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 290, 640, 'SLIDE 1 OF 90', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
      bubble(x, 800, 650, 'a little | about me…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Colour-coded | the *campfire.*', mood: 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BM.FIRE.slice(0, 7), BM.FIRE_C, 790, 860, 18 * k)
      const LOG = [RED, ORANGE, GOLD, GREEN, SKYB, PURPLE]
      for (let i = 0; i < 6; i++) { const kk = pop01(t, P.t0 + 0.5 + i * 0.15, 0.25, 2); if (kk > 0.01) { x.fillStyle = INK; x.fillRect(650 + i * 48 - 4, 960 - 4, 44, 88 * kk + 8); x.fillStyle = LOG[i]; x.fillRect(650 + i * 48, 960, 36, 88 * kk) } }
      label(x, 790, 640, 'LOGS: SORTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Called a vote on lunch. | *Twice.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const n1 = Math.floor(prog(lt, 0.4, 1.4) * 6), n2 = Math.floor(prog(lt, 0.4, 1.4) * 6)
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 340, head: 'LUNCH VOTE', headCol: PINK, size: 34, rows: [
        ['soup  ' + '|'.repeat(n1), INK], ['salad ' + '|'.repeat(n2), INK], ['TIE.', RED, pop01(t, P.t0 + 1.5, 0.2, 2)],
      ] })
      label(x, 790, 1100, 'ROUND 2', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Two truths and a lie? | *Three lies.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 340, head: 'ABOUT ME', headCol: '#c97bff', size: 30, rows: [
        ['1. lie', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['2. lie', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['3. also a lie', INK, pop01(t, P.t0 + 1.1, 0.2, 2)],
      ] })
      label(x, 790, 1100, 'NICE TRY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Loved the retreat. | *Never came home.*', mood: 'sparkle', star: { x: 150 }, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      drawBits(x, BM.TENT, BM.TENT_C, 320, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 320, 680, 'NEW ADDRESS: TENT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 1110, 'tell my boss hi!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Answered emails | *mid trust fall.*', mood: 'neutral', look: [-1, 1], star: { x: 150, y: -40 }, squash: 0.03,
    front(x, t, lt, P) {
      phone(x, 330, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'INBOX (212)', headCol: SLATE, rot: -0.05, lines: [
        ['re: re: re:', BONE, pop01(t, P.t0 + 0.5, 0.2, 2)], ['sent ✓', MINT, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['sent ✓', MINT, pop01(t, P.t0 + 1.1, 0.2, 2), true], ['sent ✓', MINT, pop01(t, P.t0 + 1.4, 0.2, 2), true],
      ] })
      label(x, 700, 1120, '(still falling)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ran a workshop | on *time travel.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, -1], star: { x: -160 },
    front(x, t, lt, P) {
      const spin = -lt * 6
      clock(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 3 + spin * 1.9, ((spin * 60 * 2) % 60 + 60) % 60, 130)
      label(x, 790, 1060, 'SESSION 3: YESTERDAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Hugged every tree. | *Cried at each.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, TREE, TREE_C, 690 + i * 110, 900 + (i % 2) * 60, 16 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2))
      label(x, 790, 650, 'TREE 3 OF 400', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.0, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2t0447', key: 'E', accent: MINT, ending: 'lesson',
  title: 'The signs | at a *work retreat.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody read | *the agenda.*' },
  lesson: { text: 'Best team building? | *Being kind.*', chip: 'TEAM: BUILT' },
  last: {
    text: 'Capricorn is | *still on email.*',
    draw(x, t, lt) { for (let i = 0; i < 6; i++) { const p = ((lt * 0.4 + i / 6) % 1); drawBits(x, ENVELOPE, ENV_C, 120 + i * 170, lerp(900, 680, p), 9, { alpha: Math.sin(Math.PI * p), rot: 0.2 * Math.sin(i + t) }) } },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
