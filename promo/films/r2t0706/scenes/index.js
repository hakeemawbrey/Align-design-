// r2t0706: star_talk, BELIKE, "Home from a trip? | Zodiacs *be like.*" (the batch hook, re-split so it fits two lines) (signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme version of itself walking back in the front door. Ending: group.
//   ♈ first off the plane, home in four minutes · ♉ kissed their own bed · ♊ told the trip story, story #N
//   · ♋ hugged the house · ♌ still in vacation shades at 11 PM · ♍ unpacked, washed, folded, still at the door
//   · ♎ bought gifts for everyone, still picking theirs · ♏ knew instantly who used their mug · ♐ home one hour, packed
//   again · ♑ landed, at the office by seven · ♒ souvenir: one very special rock · ♓ held the seashell, cried
//   group "Home again. | *Need a vacation.*" (the twelve with their suitcases)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, bits, swapLabel, RED, CREAM, STEEL, PLUM, WOOD, clamp, ease, prog, lerp } from './props.js'

const ST = { x: -200 }
const ROCK = ['...GGGG...', '.GGGgGGGG.', 'GGgGGGGgGG', 'GGGGGGGGGG', 'GgGGGgGGGG', '.GGGGGGGg.', '..GGGGGG..']
const ROCK_C = { G: '#9aa0b4', g: '#6f7590' }
const SHELL = ['....P....', '...PpP...', '..PpPpP..', '.PpPpPpP.', 'PpPpPpPpP', 'PPPPPPPPP', '.PPPPPPP.', '...PPP...']
const SHELL_C = { P: '#ffc9d6', p: '#ff8fb1' }
const DOOR = ['WWWWWWW', 'WDDDDDW', 'WDDDDDW', 'WDDDDDW', 'WDDDDYW', 'WDDDDDW', 'WDDDDDW', 'WDDDDDW', 'WDDDDDW']
const DOOR_C = { W: '#c98f5a', D: WOOD, Y: GOLD }

const CAMEOS = [
  { sign: 'aries', cap: 'First off the plane. | *Home in four minutes.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      const f = clamp((lt - 0.2) / 0.9)
      bits(x, 'PLANE', lerp(560, 860, ease.outCubic(f)), lerp(960, 700, ease.outCubic(f)), 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.35 })
      L(x, 790, 1060, 'SEATBELT SIGN: STILL ON', pop01(t, P.t0 + 0.8, 0.3, 2.2), STEEL, 0.04, 26)
      L(x, 790, 640, 'HOME. 4 MIN.', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.05, 38)
    } },
  { sign: 'taurus', cap: 'Got home. | *Kissed the bed.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BLANKET', 790, 1060, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 700, 'i missed you', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 790, 930, P.t0 + 1.1, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Told the trip story. | *Then told it again.*', mood: lt => Math.floor(lt * 4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.7) * 26)
      L(x, 790, 690, `STORY TOLD: ${n}x`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.05, 40)
      bubble(x, 790, 900, 'so ANYWAY…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 790, 1090, 'AUDIENCE: ASLEEP', pop01(t, P.t0 + 1.7, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Missed home so much | they *hugged the house.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 880, 44 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 + 0.03 * Math.sin(t * 6) })
      hearts(x, t, 660, 860, P.t0 + 0.9, { n: 6, life: 1.8, spread: 220, cell: 8, seed: 6 })
      L(x, 800, 1110, 'HOUSE: HUGGED BACK', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Still in the vacation | *sunglasses.* At night.', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      bits(x, 'SHADES', F.x, F.cy - 30, 17 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bits(x, 'MOON', 820, 640, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1090, 'TIME: 11 PM', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.05, 36)
      bubble(x, 830, 860, 'still on | holiday', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Unpacked. Washed. Folded. | *Still at the door.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    back(x, t, lt, P) { drawBits(x, DOOR, DOOR_C, 330, 880, 40 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const pct = Math.round(clamp((lt - 0.3) / 1.1) * 100)
      L(x, 790, 700, `UNPACKED: ${pct}%`, pop01(t, P.t0 + 0.3, 0.3, 2), pct >= 100 ? MINT : CREAM, 0.05, 36)
      if (lt > 1.4) sparkles(x, t, 790, 960, P.t0 + 1.4, 7, 170, 0.3)
    } },
  { sign: 'libra', cap: 'Gifts for everyone. | *Still choosing theirs.*', mood: 'neutral', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const sw = Math.floor(lt * 3) % 3
      for (let i = 0; i < 3; i++) bits(x, 'GIFT', 640 + i * 150, 960 - (i === sw ? 40 : 0), 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 790, 700, 'MINE? THIS ONE? NO…', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Knew instantly | who *used their mug.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MUG', 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      L(x, 790, 700, 'MOVED 1 INCH', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, 0.05, 32)
      L(x, 790, 1110, 'IT WAS GEMINI.', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Home for one hour. | *Packed again.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 790, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 7) * 0.04 })
      swapLabel(x, 790, 690, lt, 1.0, 'WELCOME HOME', 'NEXT FLIGHT: 6 AM', { size: 32, fromBg: CREAM, toBg: GOLD })
    } },
  { sign: 'capricorn', cap: 'Landed at six. | At the *office by seven.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 790, 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'SUITCASE', 700, 1080, 11 * pop01(t, P.t0 + 0.35, 0.3, 2))
      swapLabel(x, 790, 700, lt, 1.2, 'INBOX: 412', 'INBOX: 0', { size: 38, fromBg: RED, toBg: MINT })
    } },
  { sign: 'aquarius', cap: 'The souvenir? | A *very special rock.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ROCK, ROCK_C, 790, 920, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(t * 2) * 0.05 })
      sparkles(x, t, 790, 920, P.t0 + 0.9, 6, 160, 0.2)
      L(x, 790, 1100, 'IT HAS A NAME', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Unpacked one seashell. | *Cried for an hour.*', mood: 'wide', look: [1, 0], tears: lt => lt > 0.8 ? 3 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SHELL, SHELL_C, 800, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 680, 'it smells like | the ocean…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
    } },
]

const F = makeFilm({
  id: 'r2t0706', key: 'C', accent: '#ffb34a', ending: 'group',
  title: 'Home from a trip? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Home again. | *Need a vacation.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1000, t - lt + 1.1, 9, 300, 0.4) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
