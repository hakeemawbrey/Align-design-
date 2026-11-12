// r2a0694: star_advice, ADVICE SOLO (taurus), "Taurus, it’s okay | *to start over.*" (signs3kit, lofi · E).
// Nine gentle truths for a Taurus who hates change and is starting again anyway, each with a warm reframe and one light
// gag. Ending: group.
//   new city, roots grow anywhere · left the comfy job · change can be cozy · a new café won't bite · rebuilding savings,
//   slow and steady · day one is enough · a new match after a while, go slow · back at square one, you know the way
//   · the recipe flopped, try again tomorrow
//   group "Slow start. | *Still a start.*"
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dd18a', S = 'taurus', ST = { x: -190 }
const PLANT = ['...G.G...', '..GGLGG..', '.GLGGGLG.', '..GGLGG..', '....G....', '.TTTTTTT.', '.TTTTTTT.', '..TTTTT..', '..TTTTT..']
const COIN = ['.YYYY.', 'YYWYYY', 'YWYYYY', 'YYYYYY', '.YYYY.']

function coins(x, cx, cy, k, n) {
  for (let s = 0; s < 3; s++) for (let i = 0; i < Math.min(n - s * 4, 4); i++) drawBits(x, COIN, { Y: GOLD, W: '#fff4c0' }, cx - 110 + s * 110, cy - i * 34, 12 * k)
}

const CAMEOS = [
  { sign: S, cap: 'New city? | *Roots grow anywhere.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), g = 0.7 + 0.3 * clamp((lt - 0.6) / 1.0)
      drawBits(x, PLANT, { G: '#4fbf6a', L: '#8fdc6a', T: '#c0603a' }, 800, 880, 26 * k, { sy: g })
      L(x, 800, 1090, 'NEW SOIL ✦', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Left the comfy job? | *Comfort finds you again.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 870, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'OLD COUCH: MISSED', pop01(t, P.t0 + 0.8, 0.3, 2.2), STEEL, -0.04, 28)
      L(x, 800, 1080, 'NEW COUCH: SOON', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Change feels scary? | It can be *cozy,* too.', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 870, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MUG', 820, 700, 12 * pop01(t, P.t0 + 0.7, 0.3, 2))
      steam(x, t, 820, 650, { n: 2, alpha: 0.6, h: 80 })
      L(x, 800, 1080, 'CHANGE, BUT SOFT', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: S, cap: 'Same café for years? | A new one *won’t bite.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 760, { n: 3, alpha: 0.7, h: 110 })
      bubble(x, 790, 640, 'one new latte?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1080, 'VERDICT: DELICIOUS', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Rebuilding your savings? | *Slow is steady.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      coins(x, 800, 960, pop01(t, P.t0 + 0.2, 0.3, 2), 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 11))
      L(x, 800, 650, 'ONE COIN AT A TIME', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'New routine? | *Day one is enough.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'NEW ROUTINE', headBg: ACC, headInk: INK, lines: ['', 'DAY 1 ✓'], size: 52 })
      L(x, 800, 1080, 'THAT COUNTS.', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'First match in a while? | *Go slow.* That’s fine.', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ✦', headCol: PINK, lines: [['hi :)', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['hi :)', ACC, pop01(t, P.t0 + 1.4, 0.25, 2), true]] })
      L(x, 800, 1100, 'REPLY TIME: 3 DAYS', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Back at square one? | *You know the way now.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 850, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'SQUARE ONE', pop01(t, P.t0 + 0.7, 0.3, 2.2), STEEL, -0.04, 32)
      L(x, 800, 1070, 'SHORTCUTS: KNOWN', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'The new recipe flopped? | *Tomorrow, take two.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 870, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 800, { n: 3, alpha: 0.5, h: 90 })
      L(x, 800, 660, 'TOO SALTY', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, -0.05, 34)
      L(x, 800, 1080, 'ATTEMPT 2: LOADING', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2a0694', key: 'E', accent: ACC, solo: S, ending: 'group',
  title: 'Taurus, it’s okay | *to start over.*',
  cameos: CAMEOS,
  group: { cap: 'Slow start. | *Still a start.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
