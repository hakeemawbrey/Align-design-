// r2a0613: star_advice, ADVICE SOLO (scorpio), "How to give | a Scorpio *space.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine gentle truths about giving a Scorpio room, each with a warm reframe and one light gag.
// Ending: group (the group beat is the ending: "Give them space. | *Then hug them.*").
//   do not disturb: it's not about you · hoodie up is the signal · one-word texts, one heart back · ask one question
//   · leave a snack, skip the speech · let them recharge · silence together is Scorpio love · their chart won't tell you, ask
//   · they came back: act normal
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, phone, friend, bits, chart, swapLabel, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'scorpio', ST = { x: -190 }
const HOODIE = ['...HHHHH...', '..HHKKKHH..', '.HHK...KHH.', '.HHK...KHH.', 'HHHHKKKHHHH', 'HHHHHHHHHHH', 'HH.HHHHH.HH', 'HH.HPPPH.HH', 'HH.HHHHH.HH', '...HHHHH...']

/** a battery that fills up bar by bar */
function battery(x, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -64, 260, 128); x.fillRect(130, -28, 26, 56)
  x.fillStyle = BONE; x.fillRect(-120, -54, 240, 108); x.fillRect(130, -20, 16, 40)
  x.fillStyle = NIGHT; x.fillRect(-110, -44, 220, 88)
  const n = Math.floor(clamp(f) * 5)
  for (let i = 0; i < n; i++) { x.fillStyle = n < 3 ? '#ff6b5a' : n < 5 ? GOLD : MINT; x.fillRect(-102 + i * 42, -36, 34, 72) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Went quiet? | *It’s not about you.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 800, 800, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'DO NOT DISTURB: ON', pop01(t, P.t0 + 0.7, 0.3, 2.2), LAV, -0.04, 34)
      L(x, 800, 640, 'YOU: STILL LOVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Hoodie up? | *That’s the signal.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOODIE, { H: ACC, K: INK, P: '#9a5ad8' }, 800, 850, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, 'HOOD UP = SPACE, PLS', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'One-word texts? | *Send one heart back.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SCORPIO', headCol: ACC, lines: [['k.', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), false], ['♥', PINK, pop01(t, P.t0 + 1.1, 0.25, 2.4), true], ['♥', ACC, pop01(t, P.t0 + 1.7, 0.25, 2.4), false]], size: 30 })
    } },
  { sign: S, cap: 'Twenty questions? | *Ask just one.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const qs = ['why?', 'what happened?', 'is it me?', 'are you mad?']
      qs.forEach((q, i) => bubble(x, 760 + (i % 2) * 70, 640 + i * 90, q, pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2) * (1 - ease.inQuad(prog(lt, 1.0, 1.25))), { size: 32, tail: 'bl' }))
      bubble(x, 800, 900, 'need | anything?', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 52, col: ACC, tail: 'bl' })
    } },
  { sign: S, cap: 'Leave a snack. | *Skip the speech.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 760, 900, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bits(x, 'MUG', 880, 920, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 700, 'DELIVERY: SILENT', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.04, 34)
      hearts(x, t, 800, 880, P.t0 + 1.6, { n: 3, life: 1.4, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Need the whole weekend? | *Let them recharge.*', mood: lt => lt > 1.6 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.8],
    front(x, t, lt, P) {
      const f = prog(lt, 0.3, 1.8)
      battery(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), f)
      L(x, 800, 1080, f >= 1 ? 'SCORPIO: 100%' : `CHARGING… ${Math.round(f * 100)}%`, pop01(t, P.t0 + 0.4, 0.3, 2), f >= 1 ? MINT : GOLD, 0.04, 34)
      if (f >= 1) sparkles(x, t, 800, 850, P.t0 + 1.85, 7, 180, 0.2)
    } },
  { sign: S, cap: 'Silence together? | *That’s Scorpio love.*', mood: 'happy', look: [1, 0], star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 760, 900, 230, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 600, 650, 'WORDS SAID: 0', pop01(t, P.t0 + 0.9, 0.3, 2.2), STEEL, -0.04, 32)
      L(x, 600, 1110, 'VIBES: PERFECT', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 32)
      hearts(x, t, 560, 860, P.t0 + 1.6, { n: 4, life: 1.6, spread: 220, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Reading their chart for clues? | *Just ask, gently.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 820, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bits(x, 'LENS', 880, 900, 16 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.2 })
      swapLabel(x, 800, 1100, lt, 1.2, 'CLUES: NONE', 'TRY: “YOU OK?”', { size: 32, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'They came back? | *Act normal. Smile.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'hey.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 56, col: ACC, tail: 'bl' })
      bubble(x, 820, 900, 'hey :)', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 56, tail: 'br' })
      L(x, 800, 1110, 'WELCOME BACK', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0613', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'How to give | a Scorpio *space.*',
  cameos: CAMEOS,
  group: { cap: 'Give them space. | *Then hug them.*', mood: 'heart' },

})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
