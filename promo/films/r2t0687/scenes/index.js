// r2t0687: star_talk, SOLO (scorpio), "Scorpios on a day off | *be like.*" (signs3kit social cut, music: lofi · E).
// One sign the whole way: nine extreme Scorpio days off.
//   blackout curtains at noon · phone on silent since 2019 · solved the crime documentary in episode two · takeout under
//   a fake name · saw a coworker, hid behind the cereal · twelve candles for one bath · secrets, alphabetised · a match
//   said "hey", replied day four · "what did you do?" "things."
// Ending: lesson. group "Do not disturb. | *Seriously.*" · lesson "Love a Scorpio? | *Protect the day off.*" · "See you Monday. | *Maybe.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b8a', S = 'scorpio', ST = { x: -170 }

/** a window whose two curtains slide shut (c: 0 open … 1 shut) */
function curtains(x, cx, cy, k, c) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 300, h = 340
  x.fillStyle = INK; x.fillRect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24)
  x.fillStyle = '#ffe27a'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#fff4c0'; x.beginPath(); x.arc(50, -50, 50, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-6, -h / 2, 12, h); x.fillRect(-w / 2, -6, w, 12)
  const cw = lerp(40, w / 2 + 4, c)
  for (const d of [-1, 1]) {
    x.fillStyle = INK; x.fillRect(d < 0 ? -w / 2 - 14 : w / 2 + 14 - cw - 8, -h / 2 - 20, cw + 8, h + 40)
    x.fillStyle = '#5a1f3a'; x.fillRect(d < 0 ? -w / 2 - 10 : w / 2 + 10 - cw, -h / 2 - 16, cw, h + 32)
    x.fillStyle = '#7a2a4e'; for (let i = 0; i < cw; i += 30) x.fillRect((d < 0 ? -w / 2 - 10 : w / 2 + 10 - cw) + i, -h / 2 - 16, 10, h + 32)
  }
  x.restore()
}
const CEREAL = ['RRRRRRRRRR', 'RWWWWWWWWR', 'RWYYYYYYWR', 'RWYYYYYYWR', 'RWWWWWWWWR', 'RRRRRRRRRR', 'RRYYRRYYRR', 'RYYYYYYYYR', 'RRYYRRYYRR', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR']

const CAMEOS = [
  { sign: S, cap: 'Day off. | Blackout curtains *at noon.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      curtains(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.3)))
      L(x, 800, 1100, 'SUNLIGHT: DENIED', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: S, cap: 'Phone on silent. | *Since 2019.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DO NOT DISTURB', headCol: RED, lines: [['99+ missed', STEEL, pop01(t, P.t0 + 0.6, 0.2, 2), false], ['read: never', STEEL, pop01(t, P.t0 + 1.0, 0.2, 2), false]], size: 26 })
      L(x, 810, 1110, 'MODE: FOREVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Crime documentary marathon. | Solved it *in episode two.*', mood: lt => lt > 1.3 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 830, 'EP. 2 OF 9', pop01(t, P.t0 + 0.4, 0.3, 2), STEEL, 0, 28)
      bubble(x, 800, 650, 'it was the uncle.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1090, 'DETECTIVES: STUNNED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Ordered takeout | *under a fake name.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ['...KKKK...', '..K....K..', 'RRRRRRRRRR', 'RWRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRWR', 'RRRRRRRRRR'], { K: INK, R: '#c98f5a', W: '#e8b36a' }, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'ORDER FOR: “M.”', pop01(t, P.t0 + 0.6, 0.3, 2), BONE, 0.04, 36)
      L(x, 800, 1100, 'TIP: GENEROUS', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Saw a coworker. | Hid *behind the cereal.*', mood: lt => lt > 1.1 ? 'wide' : 'neutral', look: [1, 0], star: { x: -150, y: 20 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, CEREAL, { R: '#ff9a4a', W: CREAM, Y: GOLD }, 470, 1040, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 760, 'oh hey, is that…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      L(x, 800, 1000, 'STEALTH MODE', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 36)
    } },
  { sign: S, cap: 'Lit twelve candles. | *For one bath.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) {
        const cx = 660 + (i % 3) * 120, cy = 780 + Math.floor(i / 3) * 190
        bits(x, 'CANDLE', cx, cy, 11 * pop01(t, P.t0 + 0.2 + i * 0.13, 0.3, 2))
      }
      steam(x, t, 780, 1080, { n: 3, alpha: 0.6, h: 140 })
      L(x, 800, 1130, 'CANDLES 12/12', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Reorganised their secrets. | *Alphabetically.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2)
        bits(x, 'BOX', 800, 780 + i * 140, 18 * k)
        L(x, 800, 780 + i * 140, ['A–H', 'I–P', 'Q–Z'][i], k, CREAM, 0, 28)
      }
      L(x, 800, 1180, 'TOP SECRET', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, 0.04, 36)
    } },
  { sign: S, cap: 'A match said “hey.” | *Replied on day four.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const day = 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 3)
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', headCol: PINK, lines: [['hey :)', MINT, pop01(t, P.t0 + 0.4, 0.2, 2), false], ['…hey.', PINK, pop01(t, P.t0 + 1.9, 0.2, 2), true]], size: 30 })
      L(x, 810, 1110, `DAY ${day}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, -0.04, 40)
    } },
  { sign: S, cap: '“What did you do today?” | *“Things.”*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'things.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 60, tail: 'bl' })
      L(x, 800, 950, 'DETAILS: CLASSIFIED', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0687', key: 'E', accent: ACC, solo: S, ending: 'lesson',
  title: 'Scorpios on a day off | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Do not disturb. | *Seriously.*', mood: 'sleepy' },
  lesson: { text: 'Love a Scorpio? | *Protect the day off.*', chip: 'BATTERY: FULL' },
  last: {
    text: 'See you Monday. | *Maybe.*',
  },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-20px', width: '1120px', transformOrigin: '50% 0', transform: 'scale(0.84)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
