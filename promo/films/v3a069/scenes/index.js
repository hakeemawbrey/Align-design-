// v3a069: ADVICE SOLO, "What Aries need | in love." (~43 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way (makeFilm solo mode, 9 cards): what an Aries needs from love, warmly, one gag each. Ending: group.
//   0.0–3.6    "What Aries need | *in love.*"
//   3.6–37.8   someone who can keep up (a spare pair of sneakers) · honesty, fast ("I like you." delivered in 0.2 s)
//              · someone who loves a dare (I DARE YOU: SALSA CLASS) · patience with their impatience (the hourglass)
//              · loud praise (a medal for parking) · space to cool off (an ice pack, 5 min) · someone who says sorry back
//              · dates that aren't dinner (go-karts, checkered flag) · to feel chosen (a profile card: CHOSEN ✓)
//  37.8        "Fast heart. | *Loyal heart.*"  (the ending: group beat)
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, stamp, profile, bits, confetti, fitTitleScenes, ORANGE, RED, TEAL, CREAM, GREY, clamp, prog, ease, lerp } from './props.js'

const S = 'aries', CORAL = '#ff6b5a'
// a checkered flag on a pole
function checkered(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.05 * Math.sin(t * 4))
  x.fillStyle = INK; x.fillRect(-6, -10, 12, 230)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { x.fillStyle = (i + j) % 2 ? INK : CREAM; x.fillRect(6 + i * 26, -10 + j * 26 + Math.sin(t * 6 + i) * 4, 26, 26) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Someone who | *can keep up.*', mood: 'sparkle', star: { x: -190 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 830, 990, 180 * k, { mood: 'sparkle', look: [-1, 0], seed: 45, glyph: false, hops: [P.t0 + 1.3, P.t0 + 1.7] })
      bits(x, 'SHOE', 820, 790, 12 * pop01(t, P.t0 + 0.9, 0.3, 2.2), { rot: -0.08 })
      label(x, 820, 690, 'BROUGHT A SPARE PAIR', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Honesty. | *Fast and direct.*', mood: lt => lt > 1.0 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 780, 760, 'I like you.', pop01(t, P.t0 + 0.3, 0.2, 2.6), { size: 56, col: PINK, tail: 'bl' })
      label(x, 790, 950, 'DELIVERED IN 0.2 SEC', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1080, 'same. wow.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Someone who | *loves a dare.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      note(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 220, title: 'I DARE YOU:', titleBg: CORAL, lines: ['SALSA', 'CLASS.'], size: 48, rot: -0.05 })
      stamp(x, 800, 1060, pop01(t, P.t0 + 1.3, 0.3, 2.6), 'ACCEPTED', { col: TEAL, size: 40 })
    } },
  { sign: S, cap: 'Patience with | *their impatience.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bits(x, 'HOURGLASS', 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: lt < 1.4 ? 0.08 * Math.sin(t * 20) : 0 })
      label(x, 790, 640, 'WAITED: 3 SECONDS', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'A PERSONAL BEST', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Praise. | *Loud praise.*', mood: 'sparkle', star: { x: -190 }, hops: [1.1, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MEDAL', 790, 830, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 760, 1020, 'BEST AT PARKING', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
      confetti(x, t, P.t0 + 1.1, 790, 700, { spread: 380 })
    } },
  { sign: S, cap: 'Space to | *cool off.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', star: { x: -170 },
    front(x, t, lt, P, F) {
      bits(x, 'ICE', F.x + 10, F.top - 10, 18 * pop01(t, P.t0 + 0.4, 0.35, 2.2), { rot: 0.1 })
      label(x, 790, 820, 'COOL-DOWN: 5 MIN', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'THEN HUGS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone who | *says sorry back.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 1000, 180 * k, { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], seed: 46, glyph: false })
      bubble(x, 520, 640, 'sorry I yelled.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bc' })
      bubble(x, 820, 760, 'sorry I sulked.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bc' })
      hearts(x, t, 640, 960, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Dates that | *aren’t just dinner.*', mood: 'sparkle', star: { x: -190 }, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      checkered(x, t, 700, 640, pop01(t, P.t0 + 0.2, 0.3, 2))
      const p = ease.inOutCubic(prog(lt, 0.5, 1.6))
      bits(x, 'KART', lerp(940, 790, p), 1030, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 800, 900, 'DATE NIGHT: GO-KARTS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'To feel chosen. | *Every day.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), 'aries', { name: '♈︎ ARIES', color: CORAL, mood: 'sparkle', st: pop01(t, P.t0 + 1.0, 0.3, 2.6), stampText: 'CHOSEN ✓', stampCol: TEAL })
      label(x, 740, 1090, 'AGAIN TODAY. AND TOMORROW.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 24, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 800, P.t0 + 1.0, 8, 190, 0.3)
    } },
]

const F = makeFilm({
  id: 'v3a069', key: 'G', accent: CORAL, solo: S, ending: 'group',
  title: 'What Aries need | *in love.*',
  cameos: CAMEOS,
  group: { cap: 'Fast heart. | *Loyal heart.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
