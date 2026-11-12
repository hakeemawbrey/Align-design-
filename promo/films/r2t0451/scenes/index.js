// r2t0451: star_talk, BELIKE, "Order forgotten? | Zodiacs be like." (topic: zodiacs when the waiter forgets their order) (~54 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme version of itself when the food never comes. Ending: the group beat.
//   ♈ cooked it themself · ♉ grieving the fries · ♊ re-ordered eleven things · ♋ worried the waiter is having a bad day
//   · ♌ announced their order to the room · ♍ laminated the order · ♎ "no rush!" (hunger meter maxed) · ♏ said nothing, filed it
//   · ♐ left and opened their own diner · ♑ recalculated the tip · ♒ joined the next table, family now · ♓ cried into the menu
//  49.2   group (the ending): "Table for twelve. | *Order for none.*"  A bubble: "one soup for… anyone?"
import { clamp, prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, meter, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -190 }
const HAT = ['.WWWWW.', 'WWWWWWW', 'WWWWWWW', '.WWWWW.', '.WWWWW.', '.GGGGG.']
const PAN = ['..YYY.........', '.YOOOY........', 'YOOOOOY.......', 'YOOOOOYKKKKKKK', '.YOOOY........', '..YYY.........']
const PLATE = ['..WWWWWWW..', '.WWwwwwwWW.', 'WWwwwwwwwWW', '.WWwwwwwWW.', '..WWWWWWW..']
const SNEAK = ['.FFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF']

const CAMEOS = [
  { sign: 'aries', cap: 'Went into the kitchen. | *Cooked it themself.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, { W: PAPER, G: RED }, F.x, F.top - 40, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, PAN, { Y: '#3a3460', O: GOLD, K: '#2a2350' }, 800, 940, 20 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.1 + 0.08 * Math.sin(lt * 9) })
      label(x, 800, 680, 'YES, CHEF.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: ORANGE, rot: 0.05 })
      sparkles(x, t, 800, 900, P.t0 + 1.2, 7, 160, 0.2, [GOLD, ORANGE, BONE])
    } },
  { sign: 'taurus', cap: 'No fries yet. | Taurus is *grieving.*', mood: 'neutral', look: [1, 1], star: L,
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: PAPER, w: '#e8dcc6' }, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'FRIES: MISSING', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 640, 'they were | so young', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, col: LAV, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Ordered again. | *Eleven different things.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: L, hops: [0.9],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 5.99)
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['soup', 'tacos', 'pancakes', 'one pea', 'pie', 'also soup'].slice(0, n).join(' | '), { head: 'ORDER #2', headBg: '#ffd23a', size: 32, w: 300, rot: 0.05 })
      label(x, 800, 1130, '…+5 MORE', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Worried the waiter | is *having a bad day.*', mood: 'wide', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'are YOU ok?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      bits(x, 'cookie', 800, 950, 16 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 800, 1110, 'TIP: ONE HUG', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 150, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Stood on the chair. | *Announced their order.*', mood: 'sparkle', look: [1, -1], star: { x: -170, y: -40 }, hops: [0.6, 1.4],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(370, 1100); x.scale(k, k); x.fillStyle = INK; x.fillRect(-120, -26, 240, 40); x.fillRect(-104, 0, 24, 120); x.fillRect(80, 0, 24, 120)
      x.fillStyle = WOOD; x.fillRect(-112, -20, 224, 28); x.fillRect(-98, 8, 12, 106); x.fillRect(86, 8, 12, 106); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'ONE. BURGER.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 1000, 'STANDING OVATION', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 790, 760, P.t0 + 1.5, 7, 180, 0.6)
    } },
  { sign: 'virgo', cap: 'Wrote the order down. | *Then laminated it.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), '1 salad | dressing: side | fork: clean', { head: 'TABLE 4', headBg: MINT, size: 30, w: 320, rot: -0.03 })
      const sh = prog(lt, 1.0, 1.6)
      if (sh > 0 && sh < 1) { x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * sh); x.fillStyle = '#ffffff'; x.translate(640 + sh * 320, 860); x.rotate(0.5); x.fillRect(-14, -170, 28, 340); x.restore() }
      label(x, 800, 1100, 'LAMINATED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: '“Oh, no rush!” | *Starving since noon.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: L, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'no rush!! :)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      meter(x, 800, 960, pop01(t, P.t0 + 0.8, 0.3, 2), 0.2 + 0.8 * prog(lt, 0.9, 1.9), { w: 380, col: RED, title: 'HUNGER LEVEL' })
    } },
  { sign: 'scorpio', cap: 'Said nothing. | *Will remember forever.*', mood: 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.3, 0.3, 2), 'the soup. | tuesday. | 7:42 pm.', { head: 'NEVER FORGET', headBg: '#c2375a', size: 34, w: 320, rot: 0.04 })
      label(x, 800, 1110, 'FILED.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Left. | *Opened their own diner.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      bits(x, 'house', 800, 920, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 680, 'SAG’S DINER: OPEN', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04 })
      label(x, 800, 1130, 'WAIT TIME: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Calculated the tip. | *Minus the wait.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      note(x, 800, 880, k, 'tip: 20% | wait: 58 min | tip: 2%', { head: 'RECEIPT', headBg: BONE, size: 32, w: 330, font: MONO, weight: 700, strike: lt > 1.1 ? [0] : [], rot: -0.03 })
      bubble(x, 440, 640, 'math.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Joined the next table. | *Family now.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'taurus', 720, 990, 150 * k, { mood: 'happy', look: [-1, 0], seed: 31, glyph: false }); signChar(x, t, 'virgo', 880, 990, 150 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 32, glyph: false }) }
      label(x, 800, 690, 'NEW BEST FRIENDS', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04 })
      hearts(x, t, 800, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 5 })
    } },
  { sign: 'pisces', cap: 'Didn’t want to bother anyone. | *Cried into the menu.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 1, look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 800, 930, pop01(t, P.t0 + 0.2, 0.3, 2), 'soup | pasta | sadness', { head: 'MENU', headBg: SKYB, size: 34, w: 300, rot: 0.05 })
      label(x, 800, 690, 'MENU: SOAKED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0451', key: 'C', accent: ORANGE, ending: 'group',
  title: 'Order forgotten? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Table for twelve. | *Order for none.*',
    draw(x, t, lt) {
      bubble(x, 540, 720, 'one soup for… | anyone?', pop01(t, t - lt + 1.6, 0.3, 2.2), { size: 40, tail: 'bc' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
