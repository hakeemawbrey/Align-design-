// r2a0634: star_advice, ADVICE SOLO (taurus), "Taurus, here's your | *Sunday reset.*" (signs3kit social cut, lofi · E).
// Nine gentle, cosy steps for a Taurus Sunday, each with a warm reframe and one light gag. Ending: callback.
//   fresh sheets, lie down at once · do-not-disturb · slow breakfast, no clock · water the plant, and you · a warm bath,
//   extra bubbles · the comfort meal, seconds · plan just three things · candle lit, shoulders down · early night
//   group "Rested Taurus? | *Unstoppable.*"   last "Now back to | *those fresh sheets.*" (card one, paid off)
import { makeFilm, signChar, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, soap, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'taurus', ST = { x: -190 }
const POT = ['..G.G.G..', '.GGGGGGG.', '..GGGGG..', '...GGG...', '....G....', '.TTTTTTT.', '.TTTTTTT.', '..TTTTT..', '..TTTTT..']
const TUB = ['W..........', 'W..........', 'WWWWWWWWWWW', 'WSSSSSSSSSW', 'WSSSSSSSSSW', '.WWWWWWWWW.', '.K.......K.']

const CAMEOS = [
  { sign: S, cap: 'Fresh sheets? | *Lie down immediately.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PILLOW', 800, 860, 13 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 690, 'SMELLS LIKE SUNDAY', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 30)
      sparkles(x, t, 800, 920, P.t0 + 0.9, 7, 170, 0.5)
    } },
  { sign: S, cap: 'Phone on do-not-disturb. | *The world can wait.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DO NOT DISTURB', headCol: LAV, lines: [['17 messages', STEEL, 1], ['(later)', STEEL, pop01(t, P.t0 + 1.2, 0.25, 2)]] })
      bits(x, 'MOON', 900, 650, 9 * pop01(t, P.t0 + 0.6, 0.3, 2))
    } },
  { sign: S, cap: 'Slow breakfast. | *No clock allowed.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 760, 970, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 750, 880, { alpha: clamp(lt - 0.4) })
      L(x, 800, 700, 'TIME: WHO KNOWS', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Water the plant. | *Then water you.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POT, { G: '#4fbf6a', T: '#c96a3a' }, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.5 && lt < 1.6) for (let i = 0; i < 5; i++) { const ph = ((t * 1.8 + i / 5) % 1); x.fillStyle = SKYB; x.fillRect(780 + i * 10, 720 + ph * 120, 8, 16) }
      L(x, 800, 1150, 'HYDRATED: BOTH', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: S, cap: 'A long, warm bath. | *Extra bubbles.*', mood: 'sleepy', look: [0, 1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TUB, { W: BONE, S: '#bfe6ff', K: INK }, 800, 1000, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      soap(x, t, 800, 930, { n: 9, spread: 280, r: 26, h: 320, alpha: clamp(lt - 0.3) })
      bits(x, 'DUCK', 880, 920, 8 * pop01(t, P.t0 + 1.0, 0.3, 2))
    } },
  { sign: S, cap: 'Make the comfort meal. | *Then have seconds.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 900, { n: 3, alpha: clamp(lt - 0.3) })
      L(x, 800, 700, 'SERVING #2', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Planning the week? | *Just three things.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 320, head: 'THIS WEEK', headBg: ACC, headInk: INK, lines: ['1. work', '2. rest', '3. snacks'], size: 34, progress: clamp((lt - 0.4) / 1.2) })
    } },
  { sign: S, cap: 'Candle lit. | *Shoulders down.*', mood: 'sleepy', look: [1, 0], star: ST, squash: lt => -0.06 * ease.inOutCubic(prog(lt, 0.8, 1.4)),
    front(x, t, lt, P) {
      bits(x, 'CANDLE', 800, 920, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 1 + 0.03 * Math.sin(t * 9) })
      L(x, 800, 1150, 'SHOULDERS: DOWN', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 32)
    } },
  { sign: S, cap: 'Early night. | *Future you says thanks.*', mood: 'sleepy', look: [0, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      zzz(x, t, 360, 760, { alpha: clamp(lt - 0.4) })
      bubble(x, 770, 1070, 'thanks! – monday you', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 30, col: MINT, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0634', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Taurus, here’s your | *Sunday reset.*',
  cameos: CAMEOS,
  group: { cap: 'Rested Taurus? | *Unstoppable.*', mood: 'heart' },
  last: {
    text: 'Now back to | *those fresh sheets.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.7, 0.35, 2)
      bits(x, 'BLANKET', 540, 1330, 30 * k)
      bits(x, 'PILLOW', 540, 1170, 22 * k)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1140, 230 * k, { mood: 'sleepy', glyph: false, seed: 12 })
      zzz(x, t, 660, 1040, { alpha: clamp(lt - 1.2), size: 48 })
      sparkles(x, t, 540, 1260, t - lt + 1.1, 8, 260, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
