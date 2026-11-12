// r2t0739: star_talk, ROLLCALL, "The signs | at a craft fair." (signs3kit social cut, lofi · D). Ending: group.
//   ♈ bought everything in the first booth · ♉ came for the art, stayed for the fudge · ♊ chatted with every seller, bought nothing
//   · ♋ bought a quilt that smells like home · ♌ set up a booth selling their own autographs · ♍ counted the stitches, all 4,012
//   · ♎ bought both colours · ♏ one black candle, left mysteriously · ♐ bought a handmade canoe, walked here
//   · ♑ haggled a dollar off for sport · ♒ the sculpture nobody understands · ♓ a painting of the sea (wept)
//   group "Budget: | gone by noon."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, steam, seaPainting, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff9a4a', ST = { x: -170 }
const MUG2 = ['.WWWWWW...', 'WBBBBBBW..', 'WBBBBBBWWW', 'WBBBBBBW.W', 'WBBBBBBW.W', 'WBBBBBBWWW', 'WBBBBBBW..', '.WWWWWW...']

const CAMEOS = [
  { sign: 'aries', cap: 'Bought everything | *in the first booth.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: ST, hops: [0.5],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, ['...KKKK...', '..K....K..', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RRRWWWWRRR', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR'], { K: INK, R: ['#c98f5a', PINK, MINT, SKYB][i], W: CREAM }, 800 + (i % 2 ? 30 : -30), 1060 - i * 110, 12 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), { rot: i % 2 ? 0.08 : -0.08 })
      L(x, 800, 640, 'BOOTH 1 OF 60', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Came for the art. | Stayed *for the fudge.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.globalAlpha = k > 0.1 ? 1 : 0; x.fillStyle = INK; x.fillRect(640, 930, 320, 150); x.fillStyle = CREAM; x.fillRect(648, 938, 304, 134); x.restore()
      bits(x, 'FUDGE', 800, 1005, 14 * k, { alpha: 1 - prog(lt, 1.3, 1.6) })
      L(x, 800, 760, 'FREE SAMPLES', pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, -0.04, 32)
      L(x, 800, 1005, 'SAMPLES: GONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, 0.06, 30)
    } },
  { sign: 'gemini', cap: 'Chatted with every seller. | *Bought nothing.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['love your story!', 'how long did it take?', 'and your dog?']
      bubble(x, 800, 720, W[Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.55))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 800, 930, 'SELLERS MET: 40', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 30)
      L(x, 800, 1060, 'BOUGHT: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Bought a quilt. | It *smells like home.*', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 950, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 800, 720, "JUST LIKE GRANDMA'S", pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 28)
      hearts(x, t, 800, 930, P.t0 + 1.2, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Set up a booth | *selling autographs.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 260, head: 'LEO SIGNS', headBg: '#ffb34a', headInk: INK, lines: ['autographs', 'FREE!!', '(take two)'], size: 32 })
      L(x, 800, 1110, 'LINE: JUST LEO', pop01(t, P.t0 + 1.5, 0.3, 2.2), STEEL, 0.04, 32)
    } },
  { sign: 'virgo', cap: 'Counted the stitches. | *All 4,012.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SCARF', 800, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.floor(clamp((lt - 0.3) / 1.2) * 4012)
      L(x, 800, 700, `STITCH ${n.toLocaleString('en-US')}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), MINT, -0.04, 32)
      bubble(x, 800, 1120, 'one is loose.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Pink or blue? | Bought *both.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG2, { W: BONE, B: PINK }, 690, 930, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, MUG2, { W: BONE, B: SKYB }, 870, 930, 16 * pop01(t, P.t0 + 0.35, 0.3, 2))
      L(x, 800, 720, 'THIS ONE? THAT ONE?', pop01(t, P.t0 + 0.5, 0.3, 2.2), LAV, -0.04, 28)
      L(x, 800, 1110, 'SOLD: BOTH', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'One black candle. | Left *mysteriously.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DARKCANDLE', 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 790, { n: 2, alpha: 0.5 })
      L(x, 800, 1120, 'PAID IN EXACT CHANGE', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Bought a handmade canoe. | *Walked here.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: -170, y: -40 }, hops: [0.6],
    front(x, t, lt, P) {
      bits(x, 'CANOE', 560, 1080, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 700, 'TRIP HOME: UNCLEAR', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#ff9a4a', -0.04, 28)
      bubble(x, 800, 880, 'worth it!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Haggled a dollar off. | *For sport.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TAG', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      swapLabel(x, 800, 880, lt, 1.0, 'PRICE: $10', 'PRICE: $9', { size: 36, fromBg: STEEL, toBg: MINT })
      L(x, 800, 1100, 'VICTORY', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 38)
    } },
  { sign: 'aquarius', cap: 'Bought the sculpture | *nobody understands.*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SCULPT', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 1.3) * 0.04 })
      L(x, 800, 680, 'TITLE: "SOUP?"', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 32)
      bubble(x, 800, 1120, 'it speaks to me', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Saw a painting of the sea. | *Wept.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      seaPainting(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 1110, 'the waves…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0739', key: 'D', accent: ACC, ending: 'group',
  title: 'The signs | at *a craft fair.*',
  cameos: CAMEOS,
  group: {
    cap: 'Budget: | *gone by noon.*',
    draw(x, t, lt) {
      L(x, 540, 720, 'BUDGET LEFT: $0', pop01(t, t - lt + 1.6, 0.35, 2.4), RED, -0.04, 44)
      sparkles(x, t, 540, 720, t - lt + 1.7, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
