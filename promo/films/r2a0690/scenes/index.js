// r2a0690: star_advice, ADVICE SOLO (aries), "Aries, you don't owe anyone | *an instant reply.*" (signs3kit social cut, lofi · G).
// One sign the whole way: nine warm nudges for the fastest thumbs in the zodiac, one light gag each.
//   replied in 0.2 s · phone buzzed mid-dinner · the all-caps reply (sleep on it) · left on read is not a crime
//   · forty-seven pings, then quiet · not every text is a race · out living your life · a new match said hi · your time is yours
// Ending: callback. group "Fast heart. | *Slow thumbs.*" · then "Morning came. | *Draft deleted.*" (the all-caps reply returns)
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, zzz, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Replied in 0.2 seconds? | *You can take a minute.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [0.4],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.1, 0.3, 2), { head: 'NEW MESSAGE', headCol: GOLD, lines: [['hey', MINT, pop01(t, P.t0 + 0.3, 0.2, 2), false], ['HEY!! WHAT’S UP', PINK, pop01(t, P.t0 + 0.4, 0.2, 2), true]], size: 26 })
      L(x, 810, 1110, 'REPLY TIME: 0.2 SEC', pop01(t, P.t0 + 0.9, 0.3, 2.4), RED, -0.04, 30)
    } },
  { sign: S, cap: 'Phone buzzed mid-dinner? | *Dinner comes first.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const shake = lt < 1.1 ? Math.sin(t * 60) * 5 : 0
      x.save(); x.translate(800 + shake, 700); x.fillStyle = INK; x.fillRect(-70, -26, 140, 52); x.fillStyle = '#2a2350'; x.fillRect(-62, -18, 124, 36); x.restore()
      L(x, 800, 1090, 'PHONE: FACE DOWN', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Typing in all caps? | *Sleep on it.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt < 1.2) phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DRAFT', headCol: RED, lines: [['WELL ACTUALLY', RED, 1, true], ['AND ANOTHER', RED, lt > 0.6 ? 1 : 0, true]], size: 24 })
      else { bits(x, 'PILLOW', 810, 900, 18 * pop01(t, P.t0 + 1.2, 0.3, 2)); zzz(x, t, 820, 800) }
      L(x, 810, 1110, 'SEND: TOMORROW', pop01(t, P.t0 + 1.7, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: S, cap: 'Left someone on read? | *That’s not a crime.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 760, 'READ 2:14 PM', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, 0.04, 44)
      L(x, 800, 960, 'STILL A GOOD FRIEND', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Forty-seven pings? | *Try an hour of quiet.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'PINGS: 47', 'PINGS: OFF', { size: 48, fromBg: RED, toBg: LAV })
      L(x, 800, 1020, 'BACK IN 1 HR', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Not every text | *is a race.*', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 850, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.1 ? 0.25 : 0 })
      L(x, 800, 1080, 'NO PRIZE FOR FASTEST', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Out living your life? | *The text can wait.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'OUT HAVING FUN', pop01(t, P.t0 + 0.7, 0.3, 2), MINT, 0.04, 36)
      L(x, 800, 1090, 'PHONE: IN THE BAG', pop01(t, P.t0 + 1.4, 0.3, 2.4), STEEL, -0.04, 30)
    } },
  { sign: S, cap: 'A new match said hi? | *Hi can wait an hour.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: PINK, lines: [['♌ hi :)', GOLD, pop01(t, P.t0 + 0.4, 0.2, 2), false], ['(1 hr later) hi!', PINK, pop01(t, P.t0 + 1.4, 0.2, 2), true]], size: 26 })
      L(x, 810, 1110, 'STILL INTERESTED ♡', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Your time is yours. | *Spend it kindly.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 800, 760, P.t0 + 1.0, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 4 })
      L(x, 800, 1090, 'ALL YOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0690', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Aries, you don’t owe anyone | *an instant reply.*',
  cameos: CAMEOS,
  group: { cap: 'Fast heart. | *Slow thumbs.*', mood: 'sparkle' },
  last: {
    text: 'Morning came. | *Draft deleted.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 380, 1150, 280 * k, { mood: lt > 1.6 ? 'happy' : 'sleepy', look: [1, 0], seed: 7, hops: [t0 + 1.7] })
      const del = lt > 1.2
      phone(x, t, 730, 1130, pop01(t, t0 + 0.5, 0.35, 2), { head: 'DRAFT', headCol: del ? MINT : RED, lines: del ? [['deleted ✓', MINT, pop01(t, t0 + 1.2, 0.2, 2), false]] : [['WELL ACTUALLY', RED, 1, true], ['AND ANOTHER', RED, 1, true]], size: 24 })
      L(x, 560, 1400, 'GOOD CALL', pop01(t, t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-160px', width: '1400px', transformOrigin: '50% 0', transform: 'scale(0.71)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
