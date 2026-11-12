// r2t0725: THE SIGNS AS… v3, "The signs as | breakfast foods." (~57 s vertical, signs3kit social cut, lofi · F)
// Twelve signs as breakfast foods, each pushed to the extreme. Ending: callback.
//   ♈ a hot-sauce omelette, spicy before 8 a.m. · ♉ a stack of pancakes, plus a side stack · ♊ a breakfast burrito, is it lunch?
//   · ♋ warm oatmeal, basically a hug · ♌ golden waffles, extra golden · ♍ avocado toast cut with a ruler
//   · ♎ a parfait, couldn't pick one fruit · ♏ black coffee, no questions · ♐ a croissant eaten on a train
//   · ♑ plain toast, eaten at 6:00:00 · ♒ cereal, for dinner · ♓ a soft-boiled egg, very emotional yolk
//   group "Breakfast is served. | *All twelve courses.*"
//   last "Libra’s spoon? | *Undecided.*" (the parfait comes back; two spoons swap)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, steam, B, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -170 }, SR = { x: 160 }

const CAMEOS = [
  { sign: 'aries', cap: 'Hot-sauce omelette. | *Spicy before 8 a.m.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'OMELET', 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) bits(x, 'PEPPER', 700 + i * 90, 820, 14 * pop01(t, P.t0 + 0.5 + i * 0.2, 0.3, 2), { rot: 0.2 })
      L(x, 790, 660, 'SPICE: YES', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, -0.04, 38)
    } },
  { sign: 'taurus', cap: 'A stack of pancakes. | *Plus a side stack.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      bits(x, 'PSTACK', 720, 950, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PSTACK', 880, 980, 14 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      L(x, 800, 690, 'SIDE: ALSO PANCAKES', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: 'gemini', cap: 'A breakfast burrito. | *Is it lunch?*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BURRITO', 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      const w = Math.floor(lt * 2.6) % 2 ? 'lunch!' : 'breakfast!'
      bubble(x, 790, 690, w, pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1110, 'MEAL: BOTH', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Warm oatmeal. | *Basically a hug.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 900, { n: 3, alpha: 0.7, h: 120 })
      L(x, 790, 680, 'MADE WITH LOVE', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 32)
      hearts(x, t, 790, 880, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Golden waffles. | *Extra golden.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'WAFFLE', 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      sparkles(x, t, 790, 920, P.t0 + 0.7, 8, 170, 0.2)
      sparkles(x, t, 790, 920, P.t0 + 1.5, 8, 190, 0.6)
      L(x, 790, 1120, 'PLATING: 10/10', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#ffb34a', 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Avocado toast. | *Sliced with a ruler.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'AVO', 790, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'RULER', 790, lerp(760, 800, ease.inOutCubic(clamp((lt - 0.6) / 0.5))), 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 790, 1120, 'SLICES: EXACTLY 4MM', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'libra', cap: 'A fruit parfait. | *Couldn’t pick one fruit.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PARFAIT', 790, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'FRUIT: ALL OF THEM', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Black coffee. | *No sugar. No questions.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, B.MUG, { W: BONE, B: '#1a1020' }, 790, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 770, 830, { n: 2, alpha: 0.6, h: 100 })
      L(x, 790, 680, 'STRENGTH: YES', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, -0.04, 34)
      bubble(x, 790, 1110, 'don’t ask.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'A croissant | *eaten on a train.*', mood: 'sparkle', star: SR, hops: [0.6],
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = 0.5 * pop01(t, P.t0 + 0.1, 0.3, 2)
      for (let i = 0; i < 5; i++) { const xx = 130 + ((i * 160 - t * 400) % 700 + 700) % 700; x.fillStyle = STEEL; x.fillRect(xx, 640, 80, 8) }
      x.restore()
    },
    front(x, t, lt, P) {
      bits(x, 'CROISS', 330, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      L(x, 320, 760, 'NEXT STOP: ?', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, -0.05, 34)
      bubble(x, 330, 1090, 'brunch in paris!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Plain toast. | *Eaten at 6:00:00.*', mood: 'neutral', look: [-1, 0], star: SR,
    front(x, t, lt, P) {
      bits(x, 'TOAST', 320, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CLOCK', 320, 700, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 320, 1110, 'ON SCHEDULE', pop01(t, P.t0 + 1.3, 0.3, 2.2), '#2fc79a', -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Cereal… | *for dinner.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MOON', 860, 700, 14 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 760, 700, '9:00 P.M.', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, -0.05, 34)
      bubble(x, 790, 1120, 'rules are a construct', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 30, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'A soft-boiled egg. | *Very emotional yolk.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'EGG', 790, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'CRACKED: EMOTIONALLY', pop01(t, P.t0 + 0.8, 0.3, 2.2), LAV, -0.04, 28)
      bubble(x, 790, 1120, 'i’m so runny', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0725', key: 'F', accent: ACC, ending: 'callback',
  title: 'The signs as | *breakfast foods.*',
  cameos: CAMEOS,
  group: { cap: 'Breakfast is served. | *All twelve courses.*' },
  last: {
    text: 'Libra’s spoon? | *Undecided.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k <= 0.01) return
      const side = Math.floor(lt * 2.4) % 2
      signChar(x, t, 'libra', 380, 1060, 300 * k, { mood: 'squint', look: [side ? 1 : -1, 0], seed: 88, glyph: false })
      bits(x, 'PARFAIT', 760, 1060, 24 * k)
      bits(x, 'SPOON', 660, 860, 22 * k, { rot: -0.3, alpha: side ? 0.4 : 1 })
      bits(x, 'SPOON', 860, 860, 22 * k, { rot: 0.3, alpha: side ? 1 : 0.4 })
      L(x, 600, 1290, side ? 'THIS ONE?' : 'THAT ONE?', pop01(t, t0 + 1.0, 0.3, 2.4), PINK, -0.04, 38)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
