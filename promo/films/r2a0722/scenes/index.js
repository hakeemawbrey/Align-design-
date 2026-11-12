// r2a0722: star_advice, ADVICE SOLO (aries), "Signs an Aries | likes you." (signs3kit social cut, lofi · F).
// One sign the whole way: nine warm, relatable tells that an Aries likes you, each with one light gag. Ending: card.
//   texts first (three times) · challenges you to a race (that's flirting) · the date is booked, tonight
//   · hypes you up, loudly, in public · defends you before you ask · checks for your reply five times
//   · slows down to your pace · checked your sign, smiled · says it straight: "i like you. lunch?"
//   group "Loud heart. | *Clear signals.*"  LESSON "Aries love is | *never a mystery.*"  MATCH: MADE
//   last "First move: theirs. | *Your turn.*" over the match card: Aries + Libra (the race, paid off).
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'They text first. | *Every time.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, t, 800, 870, k * 1.3, { head: 'ARIES', headCol: ACC, size: 26, lines: [['hi!!', ACC, pop01(t, P.t0 + 0.5, 0.25, 2.2), true], ['you up?', ACC, pop01(t, P.t0 + 0.9, 0.25, 2.2), true], ['lunch??', ACC, pop01(t, P.t0 + 1.3, 0.25, 2.2), true]] })
      L(x, 800, 1150, 'SENT: 0.2 SEC AGO', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Challenged you to a race? | *That’s flirting.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      friend(x, t, 'libra', 830, 1000, 170, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0] })
      bubble(x, 760, 660, 'race you to | the door!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 830, 830, 'LOSER BUYS COFFEE', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: S, cap: 'Asked you out. | *Booked it already.*', mood: 'sparkle', star: ST,
    front(x, t, lt, P) {
      bits(x, 'CAL', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'DATE: TONIGHT', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, -0.04, 36)
      bubble(x, 800, 1100, 'pick you up | at 7?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'They hype you up. | *Loudly. In public.*', mood: lt => lt > 0.8 ? 'wide' : 'sparkle', star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'MEGA', F.x + 190, F.cy - 10, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 650, "THAT'S MY | PERSON!", pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1110, 'VOLUME: MAX', pop01(t, P.t0 + 1.3, 0.3, 2.4), ACC, 0.04, 34)
      confetti(x, t, 800, 900, P.t0 + 0.9, { n: 18, spread: 240 })
    } },
  { sign: S, cap: 'They defend you | *before you ask.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', star: ST,
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 800, 890, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 650, 'ON YOUR SIDE', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 34)
      bubble(x, 800, 1110, 'say it to ME', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Waiting on your reply? | *Checked five times.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(5, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.3))
      phone(x, t, 800, 860, 1.3 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YOU', headCol: MINT, typing: lt > 1.5 ? 1 : 0, lines: [] })
      L(x, 800, 1150, `CHECKED: ${n}X`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'They slow down | *to your pace.*', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 700, lt, 1.0, 'SPEED: 100', 'SPEED: YOURS', { size: 38, fromBg: ACC, toBg: MINT })
      friend(x, t, 'cancer', 820, 1000, 160, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'heart', look: [-1, 0] })
      hearts(x, t, 700, 960, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'They checked your sign. | *Then smiled.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 860, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 1090, 'COMPATIBLE!', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 38)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 7, 140, 0.5)
    } },
  { sign: S, cap: 'They say it straight. | *No guessing.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'i like you. | lunch?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 800, 1060, 'MIXED SIGNALS: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
      hearts(x, t, 800, 900, P.t0 + 1.0, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0722', key: 'F', accent: ACC, solo: S, ending: 'card',
  title: 'Signs an Aries | *likes you.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: "IT'S A MATCH" },
  group: { cap: 'Loud heart. | *Clear signals.*', mood: 'heart' },
  lesson: { text: 'Aries love is | *never a mystery.*', chip: 'MATCH: MADE' },
  last: { text: 'First move: theirs. | *Your turn.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
