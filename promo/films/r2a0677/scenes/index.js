// r2a0677: ADVICE SOLO, "Sagittarius, you're allowed | to want more." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign (solo, 9 cards): a relatable truth and a warm reframe each, one gag each. Ending: lesson.
//   same desk, day 900 · a to-do list with one item: see everything · deeper talks, ask for them · outgrowing things
//   (the tiny hat) · love, the big kind · restless? pack, don't panic · asking for more pay isn't greedy
//   · a fire sign, let it shine · thankful AND wanting more
//   group "Big heart. | *Bigger sky.*"   LESSON "Want the big life. | *You’re built for it.*"   last "Dream big. | *Pack snacks.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, calendar, bits, ORANGE, RED, PAPER } from '../props.js'

const S = 'sagittarius', L = { x: -170 }, SAG = '#ff9a4a'
const FLAME = [
  '....R....',
  '...RR....',
  '...RRR.R.',
  '..RRYRRR.',
  '.RRYYYRR.',
  'RRYYWYYRR',
  'RYYWWWYYR',
  '.RYYYYYR.',
  '..RRRRR..',
]
const FLAME_C = { R: '#ff6b5a', Y: GOLD, W: BONE }
const HAT = ['...Y...', '..PPP..', '..YYY..', '.PPPPP.', '.YYYYY.', 'PPPPPPP']
const HAT_C = { Y: GOLD, P: PINK }

const CAMEOS = [
  { sign: S, cap: 'Bored of the same desk? | *That’s a signal.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'DESK DAY', lt > 0.9 ? '900' : '899')
      label(x, 790, 1060, 'NOT A FLAW', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 42, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big dreams | *aren’t too much.*', mood: 'sparkle', look: [1, -1], star: L, hops: [1.3],
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'see | everything', { head: 'TO-DO', headBg: SAG, size: 56, w: 360 })
      label(x, 790, 1060, 'ONLY ITEM ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Want deeper talks? | *Ask for them.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 690, pop01(t, P.t0 + 0.2, 0.3, 2), 'nice weather, huh', { size: 34, w: 360, strike: lt > 0.8 ? [0] : [] })
      bubble(x, 790, 920, 'what are you | dreaming about?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Outgrowing things | *is allowed.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [0, -1], star: L,
    front(x, t, lt, P, F) {
      drawBits(x, HAT, HAT_C, F.x + 40, F.top - 14, 11 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.25 })
      label(x, 790, 760, 'HAT: XS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 880, 'YOU: XL ✦', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Want the big love? | *You deserve it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 820, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '♐︎', head: 'NEW MATCH', msg: 'road trip? | sunrise? | both?', bg: MINT })
      hearts(x, t, 790, 640, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 8, seed: 4 })
    } },
  { sign: S, cap: 'Restless at midnight? | *Plan, don’t panic.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'moon', 900, 610, 12 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bits(x, 'suitcase', 780, 860, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1070, 'MAYBE TRIP: SAVED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: SAG, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asking for more pay | *isn’t greedy.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'i’d like | a raise.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 54, tail: 'bl' })
      label(x, 790, 960, 'CONFIDENCE +50', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your chart says fire. | *Let it shine.*', mood: 'sparkle', look: [1, -1], star: L, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, FLAME, FLAME_C, 790, 830, 26 * k * (1 + 0.04 * Math.sin(t * 14)))
      label(x, 790, 1080, 'FIRE SIGN ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 42, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 830, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Grateful and hungry? | *Both can be true.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'thankful for: | everything | also want: | more', { head: 'MY LIST', headBg: PINK, size: 38, w: 360 })
      hearts(x, t, 790, 640, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0677', key: 'F', accent: SAG, solo: S, ending: 'lesson',
  title: 'Sag, you’re allowed | *to want more.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger sky.*', mood: 'sparkle' },
  lesson: { text: 'Want the big life. | *You’re built for it.*', chip: 'HORIZON: WIDE' },
  last: {
    text: 'Dream big. | *Pack snacks.*',
    draw(x, t, lt) { bits(x, 'suitcase', 540, 1330, 20 * pop01(t, t - lt + 0.8, 0.3, 2)); bits(x, 'cookie', 650, 1250, 12 * pop01(t, t - lt + 1.1, 0.3, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
