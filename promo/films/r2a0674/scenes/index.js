// r2a0674: star_advice, ADVICE SOLO (scorpio), "Not everyone’s | *hiding something.*" (batch hook "Scorpio, not everyone is hiding something", shortened to fit two lines; Scorpio is on screen the whole film) (signs3kit social cut,
// music: lofi · E). Nine gentle truths for a Scorpio who suspects everything, each with a warm reframe and one light gag.
// Ending: callback.
//   "we need to talk" (about lunch) · late reply (they napped) · a compliment, no catch · the whispers were a surprise
//   party · new friend is just nice · phone face down: low battery · their chart: no red flags · lower the shield
//   · someone stayed
//   group "Trust a little. | *It’s nice here.*"
//   last "The big secret? | *Just cake.*" (card 4 paid off: the cake comes back)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, zzz, chart, confetti, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff5a7a', S = 'scorpio', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: '“We need to talk”? | *It’s about lunch.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'we need to talk', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 960, 'TOPIC: TACOS', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 40)
    } },
  { sign: S, cap: 'Late reply? | They were *napping.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '2 HOURS LATER', headCol: STEEL, lines: [['sorry, napped!', MINT, pop01(t, P.t0 + 1.2, 0.25, 2), false], ['want snacks?', BONE, pop01(t, P.t0 + 1.6, 0.25, 2), false]] })
      zzz(x, t, 900, 640, { alpha: clamp(lt - 0.4) })
    } },
  { sign: S, cap: 'A compliment? | *No catch.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'love your shoes', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      drawBits(x, ['.KKKK....', 'KWWWWK...', 'KWBBWK...', 'KWBBWK...', 'KWWWWK...', '.KKKKK...', '.....KK..', '......KK.', '.......KK'], { K: GOLD, W: '#c9c9d8', B: SKYB }, 760 + Math.sin(t * 2.5) * 40, 920, 22 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 1110, 'CATCH FOUND: NONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Everyone whispering? | It’s *your party.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: lt => [lt > 1.3 ? 0 : 1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt < 1.3) bubble(x, 800, 760, 'psst…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      bits(x, 'CAKE', 800, 900, 18 * pop01(t, P.t0 + 1.3, 0.3, 2))
      L(x, 800, 660, 'SURPRISE!!', pop01(t, P.t0 + 1.35, 0.3, 2.4), PINK, 0.05, 40)
      confetti(x, t, 800, 780, P.t0 + 1.4)
    } },
  { sign: S, cap: 'New friend is just nice? | *Some people are.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'libra', 810, 920, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 0.8] })
      bubble(x, 800, 660, 'hi!! want gum?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 810, 1130, 'MOTIVE: KINDNESS', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Phone face down? | *Low battery.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BATT', 800, 880, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.3, 0.3, 2); x.fillStyle = RED; x.fillRect(700, 862, 22, 36); x.restore()
      L(x, 800, 1080, 'BATTERY: LOW', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, -0.04, 34)
    } },
  { sign: S, cap: 'Checked their chart | for *red flags?* None.', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1090, 'RED FLAGS: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 36)
      hearts(x, t, 800, 760, P.t0 + 1.5, { n: 4, life: 1.5, spread: 200, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'You can lower | *the shield.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', star: ST,
    front(x, t, lt, P, F) {
      const down = ease.inOutCubic(clamp((lt - 0.8) / 0.7))
      bits(x, 'SHIELD', lerp(F.x + 100, 820, down), lerp(F.cy, 1040, down), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: down * 0.5 })
      L(x, 820, 700, 'GUARD: OFF DUTY', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Someone stayed? | *They meant it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 810, 920, 210, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 810, 660, '✦ STILL HERE', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 34)
      hearts(x, t, 650, 880, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0674', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Not everyone’s | *hiding something.*',
  cameos: CAMEOS,
  group: { cap: 'Trust a little. | *It’s nice here.*', mood: 'heart' },
  last: {
    text: 'The big secret? | *Just cake.*',
    draw(x, t, lt) {
      bits(x, 'CAKE', 540, 1180, 26 * pop01(t, t - lt + 0.6, 0.35, 2))
      sparkles(x, t, 540, 1150, t - lt + 0.9, 8, 230, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
