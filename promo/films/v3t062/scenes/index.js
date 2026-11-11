// v3t062: THE SIGNS AS… v3, SOLO film, "Dating a Libra | be like." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine dating situations, each pushed to the most extreme (and lovable) Libra version.
//   0.0–3.6    "Dating a Libra | *be like.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards: agreed with both sides mid-argument · the outfit took the whole date · rearranged your lamps
//              · matched with you, then matched your outfit · pros and cons for texting back · said sorry to a door
//              · charmed the waiter, free dessert · split the bill to the cent · "I love you" after a group poll
//  37.8        "Charming. Fair. | *Undecided.*"
//  41.0        LESSON UNLOCKED: "Give a Libra time. | They *choose you* fully."  STATUS: BALANCED
//  46.9        "Their final answer? | *You.* Probably."
import {
  makeFilm, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { paper, phone, readout, bits, B, clamp, prog, ease, lerp, RED, ORANGE, CREAM, GREY, DEEP, NIGHT, GREEN } from './props.js'
import { drawBits } from '../../signs3kit.js'

const ACC = '#e163d6'
const OUTFITS = [LAV, MINT, GOLD, SKYB, PINK, ORANGE, GREEN, RED]

const CAMEOS = [
  { sign: 'libra', cap: 'Mid-argument? | Agreed with *both sides.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const tilt = Math.sin(lt * 5) * 0.12 * (1 - clamp((lt - 1.2) * 2))
      bits(x, 'SCALES', 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: tilt })
      bubble(x, 760, 640, 'you’re BOTH | right!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1100, 'PEACE: KEPT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: ACC, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picking an outfit | took *the whole date.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.min(OUTFITS.length - 1, Math.floor(Math.max(0, lt - 0.2) / 0.25))
      drawBits(x, B.HOODIE.bm, { H: OUTFITS[n], h: INK }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      readout(x, 790, 1100, pop01(t, P.t0 + 0.4, 0.3, 2), `OUTFIT ${n + 7}`, { size: 44, color: ACC })
      label(x, 790, 640, 'DATE: OVER', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Came over once. | *Rearranged your lamps.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const m = ease.inOutCubic(prog(lt, 0.6, 1.3))
      bits(x, 'LAMP', lerp(640, 690, m), lerp(1010, 900, m), 20 * k)
      bits(x, 'LAMP', lerp(930, 890, m), lerp(860, 900, m), 20 * k)
      label(x, 790, 1110, 'BALANCE: ACHIEVED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'better.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, tail: 'bc' })
      if (lt > 1.3) sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 200, 0.4)
    } },
  { sign: 'libra', cap: 'Matched with you. | Then *matched your outfit.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 640, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      const col = lt > 1.2 ? MINT : LAV
      drawBits(x, B.HOODIE.bm, { H: MINT, h: INK }, 700, 880, 16 * k)
      drawBits(x, B.HOODIE.bm, { H: col, h: INK }, 880, 880, 16 * k)
      label(x, 700, 1010, 'YOU', k, { size: 26, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 880, 1010, 'LIBRA', k, { size: 26, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.2) sparkles(x, t, 880, 880, P.t0 + 1.2, 6, 120, 0.2)
      label(x, 790, 1120, 'TWINNING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.05 })
    } },
  { sign: 'libra', cap: 'Pros and cons list | for *texting back.*', mood: lt => lt > 1.8 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      paper(x, 790, 860, k, { w: 320, h: 400, rot: 0.04, head: 'TEXT BACK?', headBg: ACC, headColor: INK })
      x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-2, -100, 4, 280)
      x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = '#2f9a5a'; x.fillText('PROS', -80, -80); x.fillStyle = RED; x.fillText('CONS', 80, -80)
      const n = Math.floor(clamp((lt - 0.4) / 1.4) * 8)
      for (let i = 0; i < n; i++) { const side = i % 2 ? 1 : -1, row = Math.floor(i / 2); x.fillStyle = side < 0 ? '#2f9a5a' : RED; x.fillRect(side * 80 - 50, -40 + row * 50, 100, 14) }
      x.restore()
      label(x, 790, 1110, 'DAY 3: TIED', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Hates conflict. | Said *“sorry”* to a door.', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.9],
    front(x, t, lt, P) {
      const bump = lt > 0.85 && lt < 1.05 ? Math.sin((lt - 0.85) * 60) * 8 : 0
      bits(x, 'DOOR', 820 + bump, 870, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 640, 640, 'BONK', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 36, bg: GOLD, rot: -0.12 })
      bubble(x, 560, 1110, 'oh! sorry!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Charmed the waiter. | *Free dessert.* Again.', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'you have | lovely eyes!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 42, tail: 'bl' })
      bits(x, 'CAKE', 790, 910, 24 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 1100, 'ON THE HOUSE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.05, 6, 140, 0.6)
    } },
  { sign: 'libra', cap: 'Split the bill | *to the cent.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 290, h: 420, rot: -0.04, bg: CREAM, head: 'THE BILL', headBg: INK, headColor: CREAM,
        lines: ['pasta ....', 'soup .....', 'bread ....', '- - - - - -', 'YOU: 12.47', 'ME:  12.47'], size: 26, n: 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 6) })
      label(x, 790, 1110, 'FAIR.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 44, bg: ACC, rot: 0.05 })
    } },
  { sign: 'libra', cap: 'Said “I love you” | after *a group poll.*', mood: lt => lt > 1.6 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const v = Math.floor(clamp((lt - 0.5) / 1.0) * 11)
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'POLL: SAY IT?', headBg: ACC,
        msgs: [{ t: `YES · ${v}` , c: MINT }, { t: 'NO · 0', c: BONE }, { t: 'cancer: | SAY IT!!', c: SKYB }], n: lt > 1.0 ? 3 : 2, size: 26 })
      if (lt > 1.6) hearts(x, t, 790, 1000, P.t0 + 1.6, { n: 5, life: 1.6, spread: 180, cell: 8, seed: 6 })
      label(x, 790, 1130, 'MOTION PASSED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t062', key: 'D', accent: ACC, solo: 'libra', ending: 'lesson',
  title: 'Dating a Libra | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Charming. Fair. | *Undecided.*', mood: 'sparkle' },
  lesson: { text: 'Give a Libra time. | They *choose you* fully.', chip: 'STATUS: BALANCED' },
  last: {
    text: 'Their final answer? | *You.* Probably.',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
