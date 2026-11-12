// r2a0751: star_advice, ADVICE SOLO, "Taurus, change | *can be cozy too.*" (~45 s vertical, signs3kit social cut,
// music: lofi · D). One sign the whole way, 9 cards: a relatable Taurus truth about change + a warm reframe.
//   same order for six years (try one new bite) · new couch feels wrong (give it a week) · moving house (bring the
//   blanket) · plans changed (breathe, snack, adjust) · new job nerves (pack your mug) · haircut panic (it grows, you glow)
//   · plant outgrew its pot (so can you) · new playlist (keep one old song) · change feels scary (you make places cozy)
//  37.8  "Slow change | *is still change.*"   41.2  callback: "That new bite? | *It's the usual now.*" (card 1's plate)
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, POT, POT_C, SPROUT, SPROUT_C, FLOWER, FLOWER_C, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'taurus', ACC = '#7dd18a', ST = { x: -170 }

const CAMEOS = [
  { sign: S, cap: 'Same order for six years? | *Try one new bite.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 760, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 250, head: 'MENU', headBg: ACC, headInk: INK, lines: [['the usual ✓✓✓', '#2f8a48'], 'something new?', 'new thing #2'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 0.8) })
      bits(x, 'FORK', 800, 1000, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.2), { rot: 0.3 })
      L(x, 800, 1110, 'ONE BITE. TINY. ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'New couch feels wrong? | *Give it a week.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      swapLabel(x, 800, 680, lt, 1.1, 'DAY 1: SUSPICIOUS', 'DAY 7: MY SPOT ♡', { size: 32, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Moving house? | *Bring the blanket.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'BOX', 800 + (i % 2 ? 24 : -16), 1060 - i * 72, 18 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      const d = ease.outCubic(prog(lt, 0.9, 1.3))
      if (lt > 0.9) bits(x, 'BLANKET', 800, lerp(560, 858, d), 12)
      L(x, 800, 650, 'BOX 1: COZY', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'Plans changed? | *Breathe. Snack. Adjust.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 700, lt, 0.9, 'PLAN A', 'PLAN B ♡', { size: 44, fromBg: GOLD, toBg: MINT })
      bits(x, 'COOKIE', 800, 920, 18 * pop01(t, P.t0 + 1.3, 0.3, 2.2))
      L(x, 800, 1110, 'SNACK BREAK: VALID', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: S, cap: 'New job nerves? | *Pack your favourite mug.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const d = ease.outCubic(prog(lt, 0.7, 1.1))
      if (lt > 0.7) bits(x, 'MUG', 800, lerp(620, 760, d), 13)
      L(x, 800, 1110, 'FIRST DAY KIT ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Haircut panic? | *It grows. You glow.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'TOO SHORT?!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, col: '#ffb0a0', tail: 'bl' })
      swapLabel(x, 800, 900, lt, 1.1, 'MIRROR: UH OH', 'MIRROR: CUTE ♡', { size: 34, fromBg: STEEL, toBg: PINK })
      sparkles(x, t, 560, 800, P.t0 + 1.3, 6, 140, 0.8)
    } },
  { sign: S, cap: 'Your plant outgrew its pot. | *So can you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), big = lt > 1.1
      drawBits(x, POT, POT_C, 800, 1040, (big ? 28 : 16) * k)
      if (!big) drawBits(x, SPROUT, SPROUT_C, 800, 960, 16 * k)
      else drawBits(x, FLOWER, FLOWER_C, 800, 870, 22 * pop01(t, P.t0 + 1.1, 0.35, 2))
      L(x, 800, 650, 'NEW POT: ROOMY', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 32)
    } },
  { sign: S, cap: 'New playlist? | *Keep one old song.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 290, head: 'PLAYLIST', headBg: LAV, headInk: INK, lines: ['new song', 'new song', 'new song', ['THE OLD ONE ♡', '#c0306a']], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      notes(x, t, 560, 760, { n: 4, cell: 7, col: ACC, seed: 3 })
      L(x, 800, 1100, 'ON REPEAT: ALLOWED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Change feels scary? | *You make places cozy.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 880, 34 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 650, 'NEW PLACE: HOME', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 32)
      hearts(x, t, 800, 800, P.t0 + 1.3, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0751', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Taurus, change | *can be cozy too.*',
  cameos: CAMEOS,
  group: { cap: 'Slow change | *is still change.*', mood: 'sparkle' },
  last: {
    text: 'That new bite? | *It’s the usual now.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.7, 0.35, 2)
      signChar(x, t, S, 430, 1000, 300 * k, { mood: 'heart', seed: 9, hops: [t - lt + 1.2] })
      sheet(x, 740, 980, pop01(t, t - lt + 0.9, 0.35, 2), { w: 320, h: 230, head: 'MENU', headBg: ACC, headInk: INK, lines: [['the usual:', '#2f8a48'], ['the new bite ♡', '#c0306a']], size: 30, align: 'left' })
      L(x, 600, 1180, 'THE NEW USUAL ♡', pop01(t, t - lt + 1.5, 0.3, 2.4), GOLD, -0.04, 36)
      hearts(x, t, 540, 1250, t - lt + 0.5, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
