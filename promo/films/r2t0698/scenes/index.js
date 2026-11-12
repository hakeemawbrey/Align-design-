// r2t0698: star_talk, SOLO (taurus), "Late Tauruses | *be like.*" (signs3kit social cut, music: lofi · G)
// One sign the whole way: nine late moments, each the most extreme (and comfiest) Taurus version. Ending: callback.
//   alarm: negotiated (snooze ×6) · changed into the softer sweater · "hurry" → walked even slower · missed the bus,
//   happy to wait · stopped to finish the latte · group chat "where are you?" → "buying flowers" · first date:
//   still fixing their hair · someone said "hurry", Taurus sat down · arrived late with an apology candle
//   group "Late. Cozy. | *Not sorry.*"   last "Finally there. | *Another latte.*" (card 5's mug comes back)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, RED, CREAM, STEEL, WOOD, clamp, ease, prog, lerp } from './props.js'

const S = 'taurus', ST = { x: -190 }, ACC = '#7ed38a'
const SWEATER = ['.SS...SS.', 'SSSSSSSSS', 'SSSWSSSSS', 'SSSSSSWSS', '.SSSSSSS.', '.SWSSSSS.', '.SSSSWSS.', '.SSSSSSS.']
const STOP = ['KKKKKKKKK', 'KGGGGGGGK', 'KGWWWWWGK', 'KGGGGGGGK', 'KKKKKKKKK', '....K....', '....K....', '....K....', '....K....', '....K....', '....K....', '...KKK...']
const CHAIR = ['RR......', 'RR......', 'RR......', 'RR......', 'RRRRRRRR', 'RRRRRRRR', 'K......K', 'K......K', 'K......K']

const CAMEOS = [
  { sign: S, cap: 'Alarm went off. | Taurus *negotiated.*', mood: lt => lt > 1.0 ? 'sleepy' : 'squint', star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 0.9 ? Math.sin(t * 40) * 0.08 : 0 })
      bubble(x, 790, 640, 'five more | minutes…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
      L(x, 790, 1100, `SNOOZE ×${1 + Math.floor(clamp((lt - 0.8) / 1.2) * 5)}`, pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 40)
    } },
  { sign: S, cap: 'Already late. | Got *even cozier.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, SWEATER, { S: '#ffb0c8', W: '#ffe0ea' }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 1120, 'COZY: NON-NEGOTIABLE', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 28)
    } },
  { sign: S, cap: 'Told to hurry. | Walked *even slower.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp(lt / 2.2) * 4)
      for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(600 + i * 90, 960 + (i % 2) * 34, 34, 22); x.fillStyle = BONE; x.fillRect(604 + i * 90, 964 + (i % 2) * 34, 26, 14) }
      bubble(x, 800, 680, 'HURRY!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'br', col: LAV })
      L(x, 790, 1120, 'PACE: SCENIC', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 36)
    } },
  { sign: S, cap: 'Missed the bus. | *Thrilled to wait.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, STOP, { K: INK, G: '#2f9e5b', W: BONE }, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'NEXT BUS: 40 MIN', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, 0.04, 30)
      bubble(x, 560, 1100, 'perfect.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Running late. | *Finished the latte first.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 790, 910, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 760, 820, { n: 3, h: 130 })
      L(x, 790, 1120, 'SIP. SIP. SIP.', pop01(t, P.t0 + 1.0, 0.3, 2.2), BONE, -0.04, 34)
    } },
  { sign: S, cap: '“Where are you?” | *“Buying flowers.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE GROUP', headCol: '#ffd23a', size: 24, lines: [['where r u??', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), false], ['we ordered', BONE, pop01(t, P.t0 + 0.8, 0.25, 2), false], ['buying flowers', MINT, pop01(t, P.t0 + 1.3, 0.25, 2), true]] })
      bits(x, 'FLOWER', 560, 1060, 12 * pop01(t, P.t0 + 1.5, 0.3, 2), { rot: -0.2 })
    } },
  { sign: S, cap: 'First date. | Still *fixing their hair.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'happy', star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', headCol: PINK, size: 24, lines: [['I’m here!', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), false], ['still here :)', BONE, pop01(t, P.t0 + 1.0, 0.25, 2), false], ['hair. 2 min.', LAV, pop01(t, P.t0 + 1.5, 0.25, 2), true]] })
      sparkles(x, t, 350, 780, P.t0 + 1.5, 6, 140, 0.4)
    } },
  { sign: S, cap: 'Someone said “hurry.” | Taurus *sat down.*', mood: 'squint', look: [1, 0], star: { x: -170, y: 20 },
    back(x, t, lt, P) { drawBits(x, CHAIR, { R: '#b46cff', K: INK }, 330, 1000, 36 * pop01(t, P.t0 + 0.6, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'hurry!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, tail: 'br', col: LAV })
      L(x, 790, 1080, 'ABSOLUTELY NOT', pop01(t, P.t0 + 1.1, 0.3, 2.4), RED, 0.04, 36)
    } },
  { sign: S, cap: 'Two hours late. | Brought *a candle.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CANDLE', 790, 900, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'APOLOGY CANDLE', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.05, 34)
      L(x, 790, 1120, 'SCENT: “MY BAD”', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0698', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Late Tauruses | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Late. Cozy. | *Not sorry.*', mood: 'happy' },
  last: {
    text: 'Finally there. | *Another latte.*',
    draw(x, t, lt) {
      bits(x, 'MUG', 540, 1150, 34 * pop01(t, t - lt + 0.5, 0.35, 2))
      steam(x, t, 505, 1020, { n: 3, h: 160 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
