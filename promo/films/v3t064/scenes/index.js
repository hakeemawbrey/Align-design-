// v3t064: THE SIGNS AS… v3, SOLO film, "Your Virgo friend | be like." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine friendship situations, each pushed to the most extreme (and lovable) Virgo version.
//   0.0–3.6    "Your Virgo friend | *be like.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards: "ur" corrected to "your" · packed your bag for the trip · name tags for your party
//              · remembered your dentist · checked your new match's chart · pencil back sharpened · a printed care plan
//              · paused the movie to fix a fact · lost your keys once, now you own a key hook
//  37.8        "Picky. Helpful. | *Always there.*"
//  41.0        LESSON UNLOCKED: "Your Virgo notices. | That’s *care,* not critique."  STATUS: LOOKED AFTER
//  46.9        "Also, your shoe | is *untied.*"
import {
  makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { paper, phone, chart, readout, bits, B, clamp, prog, ease, lerp, RED, ORANGE, CREAM, GREY, DEEP, NIGHT } from './props.js'

const ACC = '#ef5c94'

const CAMEOS = [
  { sign: 'virgo', cap: '“ur” in a text? | They *replied “your.”*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 460, head: 'BESTIE',
        msgs: [{ t: 'ur the best' }, { t: '*your', me: true, c: ACC }, { t: 'u know what i mean' }, { t: '*you', me: true, c: ACC }], n: 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 4), size: 26 })
      label(x, 420, 640, 'ALSO: <3', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Group trip? | They *packed your bag.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, B.CASE.bm, { K: INK, S: ORANGE, s: '#c97a2a' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 630, 'socks: rolled. | by color.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1120, 'PACKED: BOTH BAGS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Your birthday party? | Virgo made *name tags.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const N = ['TAURUS', 'LEO', 'PISCES', 'YOU']
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2)
        paper(x, 700 + (i % 2) * 190, 740 + Math.floor(i / 2) * 230, k, { w: 170, h: 150, rot: (i % 2 ? 0.06 : -0.05), head: 'HELLO', headBg: ACC, lines: [N[i]], size: 26, top: 0 })
      }
      label(x, 790, 1140, 'SEATING: CHARTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Forgot your dentist? | *They didn’t.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      paper(x, 790, 760, pop01(t, P.t0 + 0.25, 0.3, 2), { w: 330, h: 170, rot: -0.03, bg: DEEP, head: '⏰ REMINDER', headBg: ACC, color: BONE, lines: ['DENTIST · 3 PM'], size: 30, top: -10 })
      readout(x, 790, 960, pop01(t, P.t0 + 0.7, 0.3, 2), lt > 1.4 ? '2:59 PM' : '2:58 PM', { size: 52, color: MINT })
      bubble(x, 790, 1120, 'shoes on. go.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Your new match? | Virgo *checked their chart.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 620, '✦ NEW MATCH', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      chart(x, 790, 850, 140, pop01(t, P.t0 + 0.4, 0.35, 2), t)
      label(x, 790, 1080, 'APPROVED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.05 })
      sparkles(x, t, 790, 850, P.t0 + 1.5, 7, 190, 0.4)
    } },
  { sign: 'virgo', cap: 'Borrowed a pencil. | Got it back *sharpened.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const sharp = lt > 1.0
      if (!sharp) bits(x, 'STUB', 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      else { bits(x, 'PENCIL', 790, 860, 22 * pop01(t, P.t0 + 1.0, 0.3, 2.2), { rot: -0.2 }); sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 200, 0.2) }
      label(x, 790, 1060, 'ALSO: LABELED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'it was | suffering.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'You caught a cold. | Got a *printed care plan.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      paper(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 420, rot: 0.04, head: 'CARE PLAN', headBg: MINT, headColor: INK, align: 'left',
        lines: ['2 PM · TEA', '3 PM · NAP', '4 PM · TISSUES', '5 PM · CALL ME'], size: 28, n: 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 4) })
      hearts(x, t, 800, 1080, P.t0 + 1.6, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'virgo', cap: 'Movie night? | Paused it *to fix a fact.*', mood: lt => lt > 0.8 ? 'squint' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-180, -120, 360, 240); x.fillStyle = '#3a3466'; x.fillRect(-168, -108, 336, 216)
        x.fillStyle = BONE; x.fillRect(-46, -54, 30, 108); x.fillRect(16, -54, 30, 108)
        x.fillStyle = GREY; x.fillRect(-20, 120, 40, 40); x.fillRect(-80, 156, 160, 12)
        x.restore()
      }
      bubble(x, 790, 1080, 'actually, | that’s a moth.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 900, 650, 'PAUSE #4', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: 0.08, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Lost your keys once. | Now you own *a key hook.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'HOOK', 790, 800, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const d = ease.outCubic(prog(lt, 0.8, 1.2))
      if (lt > 0.75) bits(x, 'KEY', 740, lerp(560, 900, d), 14, { rot: 1.4 })
      label(x, 790, 640, 'KEYS GO HERE', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'INSTALLED. LEVEL.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: ACC, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t064', key: 'F', accent: ACC, solo: 'virgo', ending: 'lesson',
  title: 'Your Virgo friend | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Picky. Helpful. | *Always there.*', mood: 'heart' },
  lesson: { text: 'Your Virgo notices. | That’s *care,* not critique.', chip: 'STATUS: LOOKED AFTER' },
  last: {
    text: 'Also, your shoe | is *untied.*',
    draw(x, t, lt) { label(x, 540, 1260, 'TIED IT FOR YOU', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 40, bg: ACC, color: CREAM, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
