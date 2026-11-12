// r2a0025: ADVICE ROLL CALL, "How each sign | handles change." (~57 s vertical, signs3kit, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific line about how each sign meets change, with a light visual gag.
//   0.0–3.6    "How each sign | *handles change.*"
//   3.6–49.2   ♈ dives in headfirst (courage) · ♉ needs a month (adjusting… 12%) · ♊ already changed three more times
//              · ♋ packs a box of every memory · ♌ calls it a new era · ♍ makes a plan for the plan
//              · ♎ asks everyone, then trusts themself · ♏ old me: archived · ♐ was hoping for this (finally!)
//              · ♑ new routine by Tuesday · ♒ was the change · ♓ cries a little, then blooms
//  49.2        "Different speeds. | *Same courage.*"
//  52.6        CALLBACK: "Taurus? | *Adjusted: 100%.*"  Taurus with the progress bar full.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

// ── props
const BOX = ['BBBBBBBBBBBB', 'BbBBBBBBBBbB', 'BBBBBBBBBBBB', 'BBBBTTTTBBBB', 'BBBBTTTTBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB']
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', 'G.G..', '.GG.G', '..GG.', '..G..']
function bar(x, cx, cy, w, k, p, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -30, w + 16, 60); x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -22, w, 44)
  x.fillStyle = col; x.fillRect(-w / 2, -22, w * p, 44)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Dives in headfirst. | *That’s courage.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      label(x, 790, 760, 'NEW THING?', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 42, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'ALREADY IN.', pop01(t, P.t0 + 0.9, 0.35, 2.6), { size: 50, bg: '#ff6b5a', rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Needs a month. | *That’s allowed.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = 0.12 * ease.outCubic(prog(lt, 0.4, 1.4))
      label(x, 790, 760, `ADJUSTING… ${Math.round(p * 100)}%`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      bar(x, 790, 900, 300, pop01(t, P.t0 + 0.3, 0.3, 2), p, GREEN)
      bubble(x, 790, 1060, 'slowly. happily.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Already changed | *three more times.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const v = 1 + Math.min(3, Math.floor(prog(lt, 0.3, 1.8) * 4))
      label(x, 790, 820, `ME v${v}.0`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 60, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 990, 'ADAPTABLE ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Packs a box | of *every memory.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOX, { B: '#c9925a', b: '#a8743e', T: '#e8d2a8' }, 790, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 940, 'MEMORIES (ALL)', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 30, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 790, 800, P.t0 + 1.2, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Calls it | *a new era.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      label(x, 790, 820, '✦ NEW ERA ✦', pop01(t, P.t0 + 0.4, 0.35, 2.6), { size: 52, bg: '#ffb34a', rot: -0.04 })
      label(x, 790, 980, 'SAME LEO, BETTER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 0.7, 8, 210, 0.2)
    } },
  { sign: 'virgo', cap: 'Makes a plan | *for the plan.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      ;['PLAN', 'PLAN FOR PLAN', 'BACKUP PLAN'].forEach((s, i) =>
        label(x, 790, 700 + i * 140, `✓ ${s}`, pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2.2), { size: 36, bg: [MINT, GOLD, LAV][i], rot: (i - 1) * 0.04, font: MONO, weight: 700 }))
    } },
  { sign: 'libra', cap: 'Asks everyone. | Then *trusts themself.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'thoughts?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 830, 820, 'thoughts??', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      label(x, 790, 1010, 'MY CALL ✓', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 46, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Lets the old self go. | *Comes back stronger.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'OLD ME: ARCHIVED', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'NEW ME: LOADED', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 38, bg: '#ff5a7a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Was hoping | *for this.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      label(x, 320, 820, 'FINALLY!', pop01(t, P.t0 + 0.3, 0.35, 2.6), { size: 66, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 320, 820, P.t0 + 0.6, 8, 200, 0.2)
    } },
  { sign: 'capricorn', cap: 'New routine | *by Tuesday.*', mood: 'happy', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      ;['MON: ADAPT', 'TUE: ROUTINE ✓'].forEach((s, i) =>
        label(x, 320, 780 + i * 150, s, pop01(t, P.t0 + 0.3 + i * 0.7, 0.3, 2.2), { size: 40, bg: i ? '#2fc79a' : BONE, rot: (i ? 0.04 : -0.04), font: MONO, weight: 700 }))
    } },
  { sign: 'aquarius', cap: 'Was the change. | *You’re welcome.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'TRENDSETTER', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 42, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'catch up, | friends!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cries a little. | Then *blooms.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', tears: lt => lt < 1.2 ? 3 : 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = ease.outBack(prog(lt, 1.1, 1.6))
      drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: GREEN }, 790, 1020 - 80 * g, (10 + 22 * g) * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 900, P.t0 + 1.2 * 1.29, 7, 170, 0.3, [PINK, GOLD, BONE])
    } },
]

const F = makeFilm({
  id: 'r2a0025', key: 'G', accent: MINT, ending: 'callback',
  title: 'How each sign | *handles change.*',
  cameos: CAMEOS,
  group: { cap: 'Different speeds. | *Same courage.*' },
  last: {
    text: 'Taurus? | *Adjusted: 100%.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 980, 260 * k, { mood: lt > 1.6 ? 'sparkle' : 'happy', seed: 40, hops: [t - lt + 1.7] })
      const p = ease.inOutCubic(prog(lt, 0.7, 1.6))
      bar(x, 540, 1220, 420, pop01(t, t - lt + 0.6, 0.35, 2), lerp(0.12, 1, p), GREEN)
      sparkles(x, t, 540, 1100, t - lt + 1.6, 8, 220, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
