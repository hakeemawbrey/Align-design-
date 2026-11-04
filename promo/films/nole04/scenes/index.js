// nole04: ONE-LINE ADVICE FOR YOUR SIGN, "Cancer, on date three (already named the dog)." (13 s vertical, star_advice
// trial, music: dreamy · E). Story 0–8.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–4.1   "*Cancer*, it's date three | and you've named | the *dog.*"  Cancer hugs a thought cloud: a snowy
//             little house with a wreath and a dog ("BISCUIT"). At 1.8 a second dog pops in. The date waves: "hello?"
//   4.1       card flip.   4.1–8.6  THE STARS: "Enjoy the date | you're *on.*"  Cancer turns and waves back at the
//             real date, hearts.  Pisces sobs (it was a very good dog).
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
const HOUSE = ['....RR....', '...RRRR...', '..RRRRRR..', '.RRRRRRRR.', 'WWWWWWWWWW', 'WYYWWWWDDW', 'WYYWWWWDDW', 'WWWWWWWWDW']
const DOG = ['B.....', 'BB..B.', 'BBBBBB', '.BBBB.', '.B..B.']
function sit(x, t, S) {
  const { hero, date } = S
  const cx = 560, cy = 760
  cloud(x, cx, cy, 560, 330, 1, { fx: 320, fy: 1000 })
  drawBits(x, HOUSE, { R: '#5b8f6a', W: BONE, Y: '#ffd76a', D: '#8a5a3c' }, cx - 40, cy - 10, 18)
  drawBits(x, ['.GGG.', 'GG.GG', '.GGG.'], { G: '#3fae6a' }, cx - 40, cy - 64, 8)
  drawBits(x, DOG, { B: '#c58a4a' }, cx + 150, cy + 60, 12)
  label(x, 'BISCUIT', cx + 150, cy + 112, { size: 20, col: INK })
  const k2 = pop01(t, 1.8, 0.3, 2.4)
  if (k2 > 0.01) { drawBits(x, DOG, { B: '#efe6d6' }, cx - 190, cy + 70, 10 * k2); label(x, 'MOCHI', cx - 190, cy + 112, { size: 20, col: INK, alpha: clamp(k2) }) }
  snow(x, t, { x0: cx - 240, y0: cy - 150, w: 480, h: 280, n: 22, alpha: 0.7 })
  shadow(x, 320, 1340, 230)
  hero(x, t, { x: 320, y: 1170, s: 270, mood: 'sparkle', look: [1, -1], hops: [-0.1, 1.85] })
  shadow(x, 840, 1360, 160)
  date(x, t, { x: 840, y: 1230, s: 170, mood: t > 2.4 ? 'wide' : 'neutral', look: [-1, -0.4], hops: [2.4, 2.75] })
  bubble(x, t, 840, 1070, 2.4, 4.2, 'hello?', { size: 30, tail: 0 })
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 560, 1340, 210 * hk); shadow(x, 820, 1310, 180 * hk)
  hero(x, t, { x: 560, y: 1180, s: 230, pop: hk, mood: t > T.react ? 'happy' : 'wide', look: [1, 0], hops: [T.heroIn + 0.3, T.react, T.react + 0.4] })
  date(x, t, { x: 830, y: 1160, s: 200, pop: hk, mood: t > T.react + 0.3 ? 'heart' : 'neutral', look: [-1, 0], hops: [T.react + 0.3] })
  bubble(x, t, 540, 990, T.react, T.out[1], 'hi. tell me about *you*.'.replace(/\*/g, ''), { size: 28, tail: 0.1 })
  hearts(x, t, T.react + 0.4, 830, 1020, { n: 4, spread: 60 })
}
const EP = makeOneLine({
  id: 'nole04', sign: 'cancer', name: 'Cancer', len: 13,
  hook: '*Cancer*, it’s date three | and you’ve named | the *dog.*',
  hookSize: 84, hookAccent: 118,
  line: 'Enjoy the date | you’re *on.*',
  sit, after, tagX: 560,
  cues: [['pop', 1.8, 1318.51, 0.04, -0.3], ['pluck', 1.9, 1760, 0.02, 0.4, -0.3], ['pop', 2.4, 880, 0.035, 0.4], ['pop', 2.75, 880, 0.03, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
