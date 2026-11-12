// r2a0226: ADVICE SOLO, "Virgo, you're doing | so much better." (star_advice, music: lofi · D). Ending: lesson.
// One sign (solo, 9 cards): a relatable Virgo truth + a warm reframe, one gag each.
//   one comma, nobody noticed · a long list, still did plenty · replayed the comment, they forgot · fixed everyone's
//   problems, yours count · 9/10 still gets a gold star · one dish in the sink, still a good home · text rewritten
//   four times, it was lovely · rest is not falling behind · look how far you've come
//   group "Not perfect. | *Still amazing.*"   LESSON "Go easy on you. | You're *doing great.*"   last "Gold star, Virgo. | *You earned it.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, calendar, bits, ORANGE, RED, PAPER, WOOD, GREEN } from '../props.js'

const S = 'virgo', L = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'You spot every flaw. | *Nobody else does.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 720, pop01(t, P.t0 + 0.2, 0.3, 2), 'one comma, | slightly off', { head: 'FLAW FOUND', headBg: RED, size: 38, w: 340 })
      bubble(x, 790, 1010, 'it’s perfect!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'The list is long. | You *still did plenty.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.3))
      const items = ['laundry', 'emails', 'groceries', 'called mom'].map((s, i) => s + (i < n ? ' ✓' : ''))
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), items.join(' | '), { head: 'TO DO', headBg: MINT, size: 38, w: 340 })
      label(x, 790, 1080, 'DONE: SO MUCH', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You replayed that comment. | *They forgot it.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'did I sound | weird?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      phone(x, 790, 960, 0.9 * pop01(t, P.t0 + 1.0, 0.3, 2), { top: '11:48', head: 'FRIEND', msg: 'what comment? | ♡', bg: MINT })
    } },
  { sign: S, cap: 'You fix everyone’s problems. | *Yours count too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 660, 'HELPED TODAY: 11', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 800, 'HELPED: ME?', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 36, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bits(x, 'heart', 790, 990, 22 * pop01(t, P.t0 + 1.4, 0.3, 2.2))
      hearts(x, t, 790, 960, P.t0 + 1.6, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'A nine out of ten | *gets a gold star.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 720, pop01(t, P.t0 + 0.2, 0.3, 2), '9/10', { head: 'SCORE', headBg: ORANGE, size: 80, w: 300 })
      bits(x, 'star', 790, 1000, 22 * pop01(t, P.t0 + 1.1, 0.3, 2.2), { rot: 0.1 })
      sparkles(x, t, 790, 1000, P.t0 + 1.3, 6, 140, 0.3)
    } },
  { sign: S, cap: 'One dish in the sink? | *Still a good home.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'mug', 790, 740, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      label(x, 790, 900, 'DISHES LEFT: 1', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 34, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'it’s cozy ♡', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Rewrote the text four times? | *It was lovely.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const d = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.3))
      phone(x, 790, 790, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: `DRAFT ${d}`, head: 'TO: BESTIE', msg: 'hope your day | was good :)', bg: GOLD })
      label(x, 790, 1080, 'REPLY: AWW ♡', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rest is not | *falling behind.*', mood: lt => lt > 1.1 ? 'sleepy' : 'happy', star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'SUNDAY', 'REST')
      bits(x, 'moon', 900, 600, 16 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 1060, 'GUILT: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Look how far | *you’ve come.*', mood: 'sparkle', look: [1, -1], star: L, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 720, pop01(t, P.t0 + 0.2, 0.3, 2), 'worried a lot | tried anyway | did it', { head: 'THIS YEAR', headBg: MINT, size: 36, w: 340 })
      bits(x, 'trophy', 790, 1030, 20 * pop01(t, P.t0 + 1.3, 0.3, 2.2))
      sparkles(x, t, 790, 1030, P.t0 + 1.5, 6, 130, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0226', key: 'D', accent: MINT, solo: S, ending: 'lesson',
  title: 'Virgo, you’re doing | *so much better.*',
  cameos: CAMEOS,
  group: { cap: 'Not perfect. | *Still amazing.*', mood: 'sparkle' },
  lesson: { text: 'Go easy on you. | You’re *doing great.*', chip: 'GOLD STAR: EARNED' },
  last: {
    text: 'Gold star, Virgo. | *You earned it.*',
    draw(x, t, lt) { bits(x, 'star', 540, 1260, 30 * pop01(t, t - lt + 0.8, 0.35, 2.2), { rot: 0.08 }); sparkles(x, t, 540, 1260, t - lt + 1.0, 8, 200, 0.2) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
