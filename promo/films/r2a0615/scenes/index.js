// r2a0615: star_advice, ADVICE SOLO (scorpio), "What Scorpios need | *to feel heard.*" (signs3kit social cut, music: lofi · G).
// One sign the whole way: nine gentle truths about helping a Scorpio feel heard, each with a warm reframe and one light gag.
// Ending: group (the group beat is the ending: "Truly listen. | *Meet the real them.*").
//   a secret goes in the vault · said once, meant a thousand times · hear it before you fix it · remember the little detail
//   · stay up for the 2 a.m. talk · a hard question gets an honest answer · "thank you for telling me"
//   · skip the weather talk · felt heard: the wall comes down
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, bits, swapLabel, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b8a', S = 'scorpio', ST = { x: -190 }
const SAFE = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSKKKSSSSK', 'KSSKYYYKSSSK', 'KSSKYKYKSSGK', 'KSSKYYYKSSGK', 'KSSSKKKSSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', '.KK......KK.']

/** a brick wall that tumbles down brick by brick from lt = at */
function wall(x, cx, cy, k, lt, at) {
  if (k <= 0.01) return
  x.save(); x.beginPath(); x.rect(120, 490, 840, 720); x.clip(); x.translate(cx, cy); x.scale(k, k)
  const W = 64, H = 34
  for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) {
    const i = r * 4 + c, off = r % 2 ? W / 2 : 0
    const d = Math.max(0, lt - at - (5 - r) * 0.08 - c * 0.03)
    const fall = d * d * 600, rot = d * (c % 2 ? 3 : -3)
    if (fall > 700) continue
    x.save(); x.translate(-2 * W + c * W + off - W / 2 + W / 2, -3 * H + r * H + fall); x.rotate(rot)
    x.fillStyle = INK; x.fillRect(-W / 2, -H / 2, W, H); x.fillStyle = i % 3 ? '#c0583a' : '#d8704a'; x.fillRect(-W / 2 + 4, -H / 2 + 4, W - 8, H - 8)
    x.restore()
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Told you a secret? | *Into the vault.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SAFE, { K: INK, S: STEEL, Y: GOLD, G: MINT }, 800, 850, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, lt > 1.1 ? 'VAULT: LOCKED' : 'VAULT: OPEN', pop01(t, P.t0 + 0.4, 0.3, 2), lt > 1.1 ? MINT : GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'Said it once? | *They meant it a lot.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 760, 'SAID: 1×', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 44)
      L(x, 800, 920, `MEANT: ${Math.round(lerp(1, 1000, ease.inCubic(prog(lt, 0.6, 1.6))))}×`, pop01(t, P.t0 + 0.6, 0.3, 2), ACC, 0.04, 52)
    } },
  { sign: S, cap: 'Want to fix it? | *Hear it first.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 780, lt, 0.9, 'MODE: FIX IT', 'MODE: HEAR IT', { size: 40, fromBg: STEEL, toBg: MINT })
      bubble(x, 800, 1000, 'mm. tell | me more.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Remembered the little things? | *That’s love.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 820, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 750, 1060, 'OAT MILK: REMEMBERED', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, 0.04, 30)
      hearts(x, t, 800, 760, P.t0 + 1.1, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Deep talk at 2 a.m.? | *Stay up a little.*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 860, 700, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CLOCK', 760, 880, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 760, 1090, '2:07 AM · STILL HERE', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: S, cap: 'Asked a hard question? | *Answer honestly.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'be honest.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: ACC, tail: 'bl' })
      bubble(x, 820, 900, 'okay. | honestly…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'br' })
      L(x, 800, 1110, 'TRUST: +10', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 38)
    } },
  { sign: S, cap: 'They opened up? | *Say “thank you.”*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 820, 'thank you | for telling me', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: BONE, tail: 'br' })
      sparkles(x, t, 800, 820, P.t0 + 1.2, 7, 200, 0.3)
      L(x, 770, 1080, 'SCORPIO: MELTING', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'Small talk drains them. | *Ask the real thing.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 750, 760, lt, 0.9, 'NICE WEATHER, HUH?', 'WHAT’S ON YOUR MIND?', { size: 30, fromBg: STEEL, toBg: GOLD })
      bubble(x, 800, 1000, 'oh, so | much.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, col: ACC, tail: 'bl' })
    } },
  { sign: S, cap: 'Felt heard? | *The wall comes down.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      wall(x, 770, 860, 1.4 * pop01(t, P.t0 + 0.2, 0.3, 2), lt, 1.1)
      hearts(x, t, 800, 900, P.t0 + 1.5, { n: 6, life: 1.8, spread: 240, cell: 8, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0615', key: 'G', accent: ACC, solo: S, ending: 'group',
  title: 'What Scorpios need | *to feel heard.*',
  cameos: CAMEOS,
  group: { cap: 'Truly listen. | *Meet the real them.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
