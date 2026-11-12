// r2a0635: star_advice, ADVICE SOLO (taurus), "Taurus, it's okay | *to ask for help.*" (the batch topic, re-broken to fit two lines) (signs3kit, lofi · G).
// Nine gentle truths for a Taurus who does it all alone, each with a warm reframe and one light gag. Ending: group.
//   carrying every bag in one trip · moving the couch alone · the jar that won't open · a recipe gone wrong (call
//   grandma) · overwhelmed at work (say it) · the leaky sink · lost in a new town · needing a hug · strong together
//   group (the ending) "Let them help. | *They want to.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'taurus', ST = { x: -190 }
const JAR = ['.KKKKKK.', '.KKKKKK.', 'WWWWWWWW', 'WRRWRRRW', 'WRRRRWRW', 'WRWRRRRW', 'WRRRRRRW', 'WWWWWWWW']
const SIGNPOST = ['....K....', 'GGGGGGGG.', 'GGGGGGGGG', 'GGGGGGGG.', '....K....', '.BBBBBBBB', 'BBBBBBBBB', '.BBBBBBBB', '....K....', '....K....', '....K....', '...KKK...']

const CAMEOS = [
  { sign: S, cap: 'Every bag in one trip? | *Hand someone one.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      ;[[720, 980], [800, 940], [880, 990], [760, 860], [850, 860]].forEach(([a, b], i) => bits(x, 'BAG', a, b, 10 * k, { rot: (i - 2) * 0.12 }))
      L(x, 800, 700, 'BAGS: 11 · HANDS: 2', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Moving the couch alone? | *Call a friend.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 770, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'on my way!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'The jar won’t open? | *Asking isn’t losing.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST, squash: lt => lt < 1.2 ? 0.05 * Math.sin(lt * 20) : 0,
    front(x, t, lt, P) {
      drawBits(x, JAR, { K: STEEL, W: '#d9f4ff', R: RED }, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.2 ? 0.06 * Math.sin(lt * 20) : 0 })
      L(x, 800, 1110, 'JAR: 1 · TAURUS: 0', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Recipe going wrong? | *Call grandma.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GRANDMA', headCol: PINK, lines: [['help, it’s soup', BONE, 1, true], ['more salt, dear', MINT, pop01(t, P.t0 + 1.2, 0.25, 2)]] })
    } },
  { sign: S, cap: 'Too much on your plate? | *Say it out loud.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(5, 1 + Math.floor(lt / 0.3))
      for (let i = 0; i < n; i++) bits(x, 'PAPERS', 800 + (i % 2 ? 8 : -8), 1010 - i * 58, 12)
      bubble(x, 800, 690, 'i need a hand', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'The sink is leaking? | *Ask someone who knows.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'WRENCH', 800, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      for (let i = 0; i < 3; i++) { const ph = ((t * 1.4 + i / 3) % 1); x.fillStyle = SKYB; x.fillRect(790, 940 + ph * 140, 14, 22) }
      L(x, 800, 1140, 'GUESSING: STOP', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: S, cap: 'Lost in a new town? | *Ask for directions.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SIGNPOST, { K: WOOD, G: '#4fbf6a', B: SKYB }, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, 'which way?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Need a hug? | *Asking is brave.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const go = ease.inOutCubic(prog(lt, 0.6, 1.1))
      friend(x, t, 'virgo', lerp(840, 640, go), 940, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: go > 0.9 ? 'heart' : 'happy', look: [-1, 0] })
      hearts(x, t, 560, 840, P.t0 + 1.4, { n: 6, life: 1.6, spread: 240, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Strong doesn’t mean | *doing it alone.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 720, 960, 160, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      friend(x, t, 'capricorn', 880, 960, 160, pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 800, 720, 'TEAM: YOU + US', pop01(t, P.t0 + 1.1, 0.3, 2.4), ACC, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0635', key: 'G', accent: ACC, solo: S, ending: 'group',
  title: 'Taurus, it’s okay | *to ask for help.*',
  cameos: CAMEOS,
  group: { cap: 'Let them help. | *They want to.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
