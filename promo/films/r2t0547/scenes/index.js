// r2t0547: star_talk, ROLLCALL, "The signs | *gardening.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, each the most extreme gardener of itself. Ending: group (the punchline is the group beat).
//   ♈ planted a seed, yelled GROW · ♉ grew one tomato, ate it instantly · ♊ planted twelve things, forgot which
//   · ♋ reads the plants bedtime stories · ♌ the sunflowers face Leo, not the sun · ♍ rows labelled, alphabetised
//   · ♎ picked flowers by compatibility · ♏ asked the plant what it's hiding · ♐ planted, left for a year: jungle
//   · ♑ a five-year garden plan · ♒ grew a plant on the ceiling · ♓ a leaf fell, held a funeral
//   group "The garden survived. | *Barely.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, zzz, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -160 }
const GRN = '#4fbf6a', TERRA = '#d9774a'
const SPROUT = ['..G...G..', '.GGG.GGG.', '..GGGGG..', '....G....', '....G....', 'OOOOOOOOO', '.OOOOOOO.', '..OOOOO..']
const TOMATO = ['...GGG...', '..GGGGG..', '.RRRRRRR.', 'RRWRRRRRR', 'RWRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', '.RRRRRRR.', '..RRRRR..']
const BITTEN = ['...GGG...', '..GGGGG..', '.RRRRR...', 'RRWRRR...', 'RWRRRR...', 'RRRRRRR..', 'RRRRRRRR.', '.RRRRRRR.', '..RRRRR..']
const SUNF = ['..YYYYY..', '.YYBBBYY.', 'YYBBBBBYY', 'YYBBBBBYY', 'YYBBBBBYY', '.YYBBBYY.', '..YYYYY..', '....G....', '..GGG....', '....G.GG.', '....GGG..', '....G....']
const POT = ['.GG.GG.', 'GGGGGGG', '.GGGGG.', 'OOOOOOO', '.OOOOO.', '.OOOOO.', '..OOO..']
const FLOWER = ['..P.P..', '.PPPPP.', 'PPYYYPP', '.PYYYP.', 'PPYYYPP', '.PPPPP.', '..PGP..', '...G...', '..GG...', '...G...']
const LEAF = ['....GG', '...GGG', '..GGG.', '.GGG..', 'GGG...', 'G.....']
const sprout = (x, cx, cy, cell, o) => drawBits(x, SPROUT, { G: GRN, O: TERRA }, cx, cy, cell, o)
const pot = (x, cx, cy, cell, o) => drawBits(x, POT, { G: GRN, O: TERRA }, cx, cy, cell, o)

const CAMEOS = [
  { sign: 'aries', cap: 'Planted a seed. | Yelled *“GROW.”*', mood: lt => lt < 0.7 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [0.8, 1.2],
    front(x, t, lt, P) {
      const g = ease.outBack ? clamp(prog(lt, 1.5, 1.9)) : 0
      sprout(x, 800, 960 - g * 20, (14 + g * 6) * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 660, 'GROW!!', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 64, col: '#ff6b5a', tail: 'bl' })
      L(x, 800, 1120, 'DAY 1. STILL WAITING', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'Grew one tomato. | *Ate it instantly.*', mood: lt => lt < 1.0 ? 'sparkle' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, lt < 1.0 ? TOMATO : BITTEN, { G: GRN, R: RED, W: '#ffb0b0' }, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, lt < 1.0 ? 'HARVEST: 1' : 'HARVEST: EATEN', pop01(t, P.t0 + 0.5, 0.3, 2.2), lt < 1.0 ? MINT : PINK, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Planted twelve things. | *Forgot which.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) sprout(x, 680 + i * 120, 880, 10 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      bubble(x, 800, 700, 'basil? | ...a weed?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1070, 'MYSTERY GARDEN', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Reads the plants | *bedtime stories.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pot(x, 820, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BOOK', 620, 1010, 12 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.1 })
      if (lt > 1.0) zzz(x, t, 860, 760, { alpha: clamp((lt - 1.0) * 3), size: 44 })
      L(x, 800, 1110, 'NIGHT NIGHT, FERN', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'leo', cap: 'The sunflowers face Leo. | *Not the sun.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const turn = ease.inOutCubic(prog(lt, 0.6, 1.2))
      for (let i = 0; i < 2; i++) drawBits(x, SUNF, { Y: GOLD, B: '#8a4a2e', G: GRN }, 740 + i * 150, 900, 16 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: lerp(0.4, -0.5, turn) })
      drawBits(x, ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...'], { Y: '#ffe27a' }, 920, 600, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, 'SUN: IGNORED', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'virgo', cap: 'Rows labelled. | *Alphabetised.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;['A', 'B', 'C'].forEach((l, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2); sprout(x, 680 + i * 120, 860, 10 * k); L(x, 680 + i * 120, 960, l, k, CREAM, 0, 30) })
      L(x, 800, 1100, 'BASIL · CHIVES · DILL', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 26)
    } },
  { sign: 'libra', cap: 'Picked the flowers | *by compatibility.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const j = ease.inOutCubic(prog(lt, 0.4, 1.0))
      drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: GRN }, lerp(660, 740, j), 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, FLOWER, { P: SKYB, Y: GOLD, G: GRN }, lerp(940, 860, j), 880, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      hearts(x, t, 800, 760, P.t0 + 1.0, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 5 })
      L(x, 800, 1090, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Asked the plant | *what it’s hiding.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pot(x, 820, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.2 ? 0.04 * Math.sin(t * 30) : 0 })
      bits(x, 'LENS', 680, 800, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 1110, 'ROOTS: CHECKED', pop01(t, P.t0 + 1.3, 0.3, 2.2), RED, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Planted, then left | *for a year.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.4, 1.2))
      for (let i = 0; i < 5; i++) drawBits(x, SPROUT.slice(0, 5), { G: i % 2 ? GRN : '#2f9a4a' }, 640 + i * 75, 960 - g * (60 + (i % 3) * 70), (10 + g * 12) * pop01(t, P.t0 + 0.2 + i * 0.05, 0.3, 2))
      L(x, 800, 1120, 'IT’S A JUNGLE NOW', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'The garden has | *a five-year plan.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'GARDEN PLAN', headBg: STEEL, headInk: INK, lines: ['yr 1: sprout', 'yr 3: tree', 'yr 5: orchard'], size: 30, progress: clamp(lt / 1.2) })
      L(x, 800, 1100, 'ON SCHEDULE', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Grew a plant | *on the ceiling.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      pot(x, 800, 610, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.PI })
      L(x, 800, 1060, 'GRAVITY: OPTIONAL', pop01(t, P.t0 + 1.1, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'A leaf fell. | Pisces *held a funeral.*', mood: lt => lt < 0.9 ? 'neutral' : 'wide', look: [1, 1], tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      const f = clamp(lt / 0.9)
      drawBits(x, LEAF, { G: '#d9b94a' }, 780 + Math.sin(f * 9) * 40, lerp(620, 960, f), 18, { rot: Math.sin(f * 9) * 0.4 })
      if (lt > 1.0) bits(x, 'CANDLE', 900, 930, 15 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 800, 1110, 'RIP, LEAF', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, -0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2t0547', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs | *gardening.*',
  cameos: CAMEOS,
  group: { cap: 'The garden survived. | *Barely.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
