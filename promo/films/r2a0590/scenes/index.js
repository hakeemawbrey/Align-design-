// r2a0590: star_advice, ADVICE ROLLCALL, "Each sign’s note | *to younger me.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order: one warm thing each sign would tell their younger self, with a light visual gag.
// Ending: callback (Leo's loud laugh comes back).
//   ♈ you don't have to win every argument · ♉ change brings a comfy new couch · ♊ you're a lot, good · ♋ your people
//   call back · ♌ people love your loud laugh · ♍ nobody else remembers that mistake · ♎ you can pick a side
//   · ♏ some people stay · ♐ home will still be there · ♑ you were allowed to be a kid · ♒ the weird hobby becomes the
//   job · ♓ the soft heart is the superpower
//   group "Younger you | *would be proud.*"   callback: "Leo is still | *laughing loudest.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, phone, friend, bits, swapLabel, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -160 }
const KITE = ['....P....', '...PPP...', '..PPYPP..', '.PPYYYPP.', 'PPPPYPPPP', '.PPPYPPP.', '..PPYPP..', '...PPP...', '....P....', '....K....', '...K.....', '....K....', '.....K...']

/** a little TV with a REPLAY counter */
function replayTV(x, cx, cy, k, n) {
  if (k <= 0.01) return
  bits(x, 'TV', cx, cy, 22 * k)
  if (k < 0.5) return
  x.save(); x.fillStyle = BONE; x.font = `700 ${Math.round(40 * k)}px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(n ? `REPLAY #${n}` : '', cx, cy - 22 * k); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'You don’t have to win | *every argument.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const off = ease.inOutCubic(prog(lt, 0.9, 1.4))
      bits(x, 'GLOVE', 800, lerp(840, 980, off), 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: off * 0.9 })
      L(x, 790, 660, off > 0.5 ? 'GLOVES: OFF' : 'ROUND 12', pop01(t, P.t0 + 0.4, 0.3, 2), off > 0.5 ? MINT : RED, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Change isn’t scary. | *The new couch is comfy.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 900, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 700, 'NEW. AND COMFY.', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'You’re not too much. | *You’re a lot. Good.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'and another thing!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      bubble(x, 820, 880, 'oh! and…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: MINT, tail: 'br' })
      L(x, 790, 1090, 'VOLUME: PERFECT', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'You’ll find your people. | *They call back.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'INCOMING CALL', headCol: MINT, lines: [['bestie ♥', PINK, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['answer ✓', MINT, pop01(t, P.t0 + 1.1, 0.2, 2.4), true]], size: 30, rot: 0.05 * Math.sin(t * 30) * (lt < 1.1 ? 1 : 0) + 0.05 })
      hearts(x, t, 810, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'That loud laugh? | *People love it.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.8, 1.1, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'HA HA HA!', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (1 + 0.05 * Math.sin(t * 18)), { size: 64, col: GOLD, tail: 'bl' })
      hearts(x, t, 800, 1040, P.t0 + 1.0, { n: 6, life: 2.0, spread: 260, cell: 7, seed: 6 })
      L(x, 790, 1100, 'CONTAGIOUS', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: 'virgo', cap: 'That mistake you replay? | *Nobody else remembers.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      replayTV(x, 760, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.3 ? 400 + Math.floor(lt * 20) : 0)
      if (lt >= 1.3) L(x, 760, 840, 'OFF', 1, STEEL, 0, 40)
      L(x, 790, 1090, 'AUDIENCE: GONE HOME', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'libra', cap: 'You can pick a side. | *They’ll still like you.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      swapLabel(x, 800, 800, lt, 1.0, 'TEAM: UNDECIDED', 'TEAM: ME', { size: 38, fromBg: STEEL, toBg: PINK })
      hearts(x, t, 800, 1000, P.t0 + 1.7, { n: 5, life: 1.6, spread: 260, cell: 7, seed: 8 })
      L(x, 790, 1090, 'STILL INVITED', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Not everyone leaves. | *Some people stay.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 820, 920, 210, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 790, 660, 'STILL HERE. YEAR 9.', pop01(t, P.t0 + 1.1, 0.3, 2.2), RED, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Go far. | *Home will still be there.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 820, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const f = ease.inOutCubic(prog(lt, 0.5, 1.8))
      bits(x, 'PLANE', lerp(640, 900, f), 700 - Math.sin(Math.PI * f) * 60, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.3 })
      L(x, 790, 1120, 'PORCH LIGHT: ON', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'You were allowed | *to just be a kid.*', mood: lt => lt > 1.0 ? 'happy' : 'neutral', look: [1, -1], star: ST, hops: [1.1, 1.6],
    front(x, t, lt, P) {
      drawBits(x, KITE, { P: '#ff9a4a', Y: GOLD, K: BONE }, 820 + Math.sin(t * 2) * 20, 800 + Math.cos(t * 1.6) * 14, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 2), outline: INK })
      L(x, 790, 1100, 'PLAY: APPROVED', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Your weird hobby | *becomes your thing.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 8) })
      swapLabel(x, 790, 1090, lt, 1.2, 'TOO WEIRD', 'ONE OF A KIND', { size: 32, fromBg: STEEL, toBg: SKYB })
      sparkles(x, t, 800, 860, P.t0 + 1.6, 6, 170, 0.1)
    } },
  { sign: 'pisces', cap: 'That soft heart? | *It’s your superpower.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      bits(x, 'HEARTB', 810, 840, 30 * pop01(t, P.t0 + 0.3, 0.35, 2) * (1 + 0.06 * Math.sin(t * 6)))
      sparkles(x, t, 810, 840, P.t0 + 1.3, 8, 190, 0.6)
      L(x, 790, 1100, 'POWER LEVEL: MAX', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0590', key: 'G', accent: ACC, ending: 'callback',
  title: 'Each sign’s note | *to younger me.*',
  cameos: CAMEOS,
  group: { cap: 'Younger you | *would be proud.*' },
  last: {
    text: 'Leo is still | *laughing loudest.*',
    draw(x, t, lt) {
      bubble(x, 540, 1100, 'HA HA HA!', pop01(lt, 0.4, 0.3, 2.2) * (1 + 0.05 * Math.sin(t * 18)), { size: 84, col: GOLD, tail: 'bc' })
      hearts(x, t, 540, 1000, t - lt + 0.9, { n: 6, life: 2.0, spread: 460, cell: 7, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
