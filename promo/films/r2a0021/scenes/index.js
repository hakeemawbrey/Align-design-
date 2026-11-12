// r2a0021: ADVICE SOLO, "Libra, it's okay | to say no." (~47 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Libra truth + a warm reframe, one gag each.
//   0.0–3.6    "Libra, it’s okay | *to say no.*"
//   3.6–37.8   said yes to three plans at 7 (one is plenty) · practicing "no" (n… no… no.) · "no" is a full sentence
//              · keeping the peace 24/7 (off duty) · they took it fine (friendship: intact) · the scales need you on them
//              · pick yourself (this one ✓) · guilt on mute, rest anyway · every no makes room for a real yes
//  37.8        "Kind and honest. | That’s *balance.*"
//  41.2        CALLBACK: "The scales? | *Finally even.*"  Libra beside the scales, YOU and THEM level at last.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff8fb1', BROWN = '#8a4a2e'

// ── props
/** a balance scale; tilt > 0 drops the right pan */
function scales(x, cx, cy, k, tilt, L, R) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * 1.15, k * 1.15)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 300); x.fillRect(-90, 140, 180, 30)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 288); x.fillRect(-84, 146, 168, 18)
  const a = tilt * 0.35
  const ends = [-1, 1].map(s => ({ s, x: s * 170 * Math.cos(a) }))
  x.save(); x.translate(0, -130); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-180, -10, 360, 20); x.fillStyle = GOLD; x.fillRect(-174, -5, 348, 10)
  x.restore()
  for (const e of ends) {
    const px = e.x, py = -130 + e.s * 170 * Math.sin(a)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 60, py + 110); x.moveTo(px, py); x.lineTo(px + 60, py + 110); x.stroke()
    x.fillStyle = INK; x.fillRect(px - 80, py + 106, 160, 22); x.fillStyle = GOLD; x.fillRect(px - 74, py + 110, 148, 12)
    const txt = e.s < 0 ? L : R
    if (txt) label(x, px, py + 70, txt, 1, { size: 40, bg: e.s < 0 ? BONE : ROSE, rot: 0, font: MONO, weight: 700 })
  }
  x.restore()
}
const PILLOW = ['.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', 'WWWPWWWWWPWWW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.']
const BADGE = ['..YYYYY..', '.YYYYYYY.', 'YYYWWWYYY', 'YYWWWWWYY', 'YYYWWWYYY', '.YYYYYYY.', '..YYYYY..', '..R...R..', '.RR...RR.']

const S = 'libra'
const CAMEOS = [
  { sign: S, cap: 'Said yes to three plans? | *One is plenty.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      ;['SAT 7:00 · BRUNCH', 'SAT 7:00 · MOVE', 'SAT 7:00 · PARTY'].forEach((s, i) =>
        label(x, 790, 700 + i * 130, s, pop01(t, P.t0 + 0.25 + i * 0.35, 0.3, 2.2), { size: 30, bg: [GOLD, MINT, LAV][i], rot: (i - 1) * 0.05, font: MONO, weight: 700 }))
      label(x, 790, 1100, 'TRIPLE-BOOKED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: ROSE, rot: -0.04 })
    } },
  { sign: S, cap: 'Practicing “no”? | *Start small.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const w = lt < 0.9 ? 'n…' : lt < 1.5 ? 'no…?' : 'no.'
      bubble(x, 790, 740, w, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: lt < 1.5 ? 66 : 86, tail: 'bl' })
      label(x, 790, 1000, 'LEVEL 1: CLEARED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“No” is a | *full sentence.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 820, 'NO.', pop01(t, P.t0 + 0.3, 0.35, 2.4), { size: 140, bg: BONE, rot: -0.04 })
      label(x, 790, 1040, 'COMPLETE ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 0.6, 7, 190, 0.3)
    } },
  { sign: S, cap: 'Keeping the peace 24/7? | *Take a shift off.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BADGE, { Y: GOLD, W: BONE, R: ROSE }, 790, 800, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'PEACEKEEPER', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: BONE, font: MONO, weight: 700 })
      label(x, 790, 1040, 'OFF DUTY', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 48, bg: MINT, rot: -0.05 })
    } },
  { sign: S, cap: 'Scared they’ll be upset? | They *took it fine.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 12, glyph: false, hops: [P.t0 + 1.0] })
      bubble(x, 800, 720, 'oh ok! | no worries!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 790, 1150, 'FRIENDSHIP: INTACT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your scales need | *you on them* too.', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -230, s: 250 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const tilt = lt < 1.2 ? 1 : lerp(1, 0, ease.outBack(prog(lt, 1.2, 1.7)))
      scales(x, 730, 920, pop01(t, P.t0 + 0.2, 0.3, 2), tilt, lt > 1.1 ? 'YOU' : '', 'THEM')
    } },
  { sign: S, cap: 'Can’t pick a side? | *Pick yourself.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      label(x, 320, 760, '← THIS ONE ✓', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.05 })
      label(x, 320, 920, 'YOU, OBVIOUSLY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: ROSE, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 710, 860, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Feel guilty after? | *Rest anyway.*', mood: 'sleepy', look: [1, 0], star: { x: -150, y: 40 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { W: BONE, P: ROSE }, 390, 1060, 24 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'GUILT: MUTED', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'zzz', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 48, tail: 'bl' })
    } },
  { sign: S, cap: 'Every no makes room | for a *real yes.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      label(x, 790, 720, 'NO', pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - ease.inCubic(prog(lt, 0.7, 1.0))), { size: 72, bg: BONE, rot: -0.04 })
      bubble(x, 790, 780, 'YES ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 72, col: ROSE, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.7, { n: 6, life: 1.6, spread: 240, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0021', key: 'D', accent: ROSE, solo: 'libra', ending: 'callback',
  title: 'Libra, it’s okay | *to say no.*',
  cameos: CAMEOS,
  group: { cap: 'Kind and honest. | That’s *balance.*', mood: 'sparkle' },
  last: {
    text: 'The scales? | *Finally even.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 340, 1060, 240 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.3] })
      scales(x, 750, 1040, pop01(t, t - lt + 0.7, 0.35, 2), 0, 'YOU', 'THEM')
      sparkles(x, t, 750, 900, t - lt + 1.2, 7, 180, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
