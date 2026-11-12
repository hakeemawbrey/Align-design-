// r2a0183: star_advice, ADVICE SOLO, "How to encourage | a Gemini." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign (solo, 9 cards): how to cheer on the curious, chatty, ever-changing Gemini. Ending: callback.
//   cheer every new hobby · ask about the newest obsession (moths) · "ooh, tell me more" · opinion v7.2 is growth
//   · forty voice notes: reply to one · both sides invited · half a scarf still counts · a match who asks back
//   · restless? suggest a walk
//   group "Curious mind. | *Big heart.*"   callback "Replied once. | *Forty more came.*" (the voice notes come back)
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const S = 'gemini', L = { x: -170 }, YEL = '#ffd23a'
// a pixel moth
const MOTH = ['W..W..W', 'WW.B.WW', 'WWWBWWW', '.WWBWW.', '..WBW..', '...B...']
function scarf(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.1); x.scale(k, k)
  const C = [PINK, MINT, SKYB, GOLD]
  for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(-170 + i * 64, -46, 68, 92); x.fillStyle = C[i % 4]; x.fillRect(-166 + i * 64, -40, 60, 80) }
  x.strokeStyle = BONE; x.lineWidth = 5; x.setLineDash([10, 8]); x.beginPath(); x.moveTo(150, -40); x.lineTo(260, -40); x.stroke(); x.setLineDash([])
  x.fillStyle = WOOD; x.fillRect(150, -70, 10, 120); x.fillRect(170, -70, 10, 120)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'New hobby every week? | *Cheer for all of them.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(prog(lt, 0.4, 1.4) * 4.99))
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['guitar', 'pottery', 'french', 'juggling'].map((h, i) => i < n ? h + ' ✓' : h).join(' | '), { head: 'THIS MONTH', headBg: YEL, size: 38, w: 320 })
      label(x, 790, 1100, 'SUPPORT: ALL OF IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask about their | *newest obsession.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: L, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, MOTH, { W: '#e8dcc0', B: '#8a6a4a' }, 700 + i * 100 + Math.sin(t * 3 + i) * 14, 650 + (i % 2) * 50 + Math.cos(t * 4 + i) * 10, 10 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      bubble(x, 790, 900, 'so… the moths?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'br' })
      label(x, 790, 1100, 'TALK TIME: 2 HRS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wild idea? | Say *“tell me more.”*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'a café… | for cats… | on a boat?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'br' })
      bubble(x, 760, 990, 'ooh. go on!', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 48, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Changed their mind? | *That’s growing.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const v = Math.min(7, 1 + Math.floor(prog(lt, 0.2, 1.4) * 6.99))
      label(x, 770, 760, `OPINION v${v}.${v > 6 ? 2 : 0}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 50, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 960, 'UPDATE: INSTALLED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forty voice notes? | *Reply to one.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.round(1 + 39 * ease.outCubic(prog(lt, 0.2, 1.3)))
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '1:07', head: 'VOICE NOTES', msg: `▶ ${n} new`, bg: YEL, size: 40 })
      label(x, 790, 1120, 'YOU: ♥ REPLIED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Love *both sides* | of them.', mood: 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { signChar(x, t, S, 710, 820, 150 * k, { mood: 'sleepy', seed: 61, glyph: false, glow: 0.6 }); signChar(x, t, S, 870, 820, 150 * k, { mood: 'sparkle', seed: 62, glyph: false, glow: 0.6, hops: [P.t0 + 1.0] }) }
      label(x, 710, 960, 'QUIET', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      label(x, 870, 960, 'LOUD', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'BOTH: INVITED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Half a scarf | *still counts.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      scarf(x, 720, 840, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 1060, 'SCARF: 40% ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: YEL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their best match? | *Someone who asks back.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 610, '✦ MATCH: AQUARIUS', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 760, 800, 'did you know…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 820, 1010, 'no! tell me!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'br' })
    } },
  { sign: S, cap: 'Restless day? | *Suggest a walk.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: L, hops: [1.4, 1.8],
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(620, 1010, 340, 90); x.fillStyle = '#9aa5c4'; x.fillRect(626, 1016, 328, 78)
      x.fillStyle = BONE; for (let i = 0; i < 4; i++) x.fillRect(640 + ((i * 90 + t * 60) % 300), 1050, 46, 8)
      bits(x, 'flower', 700, 920, 10 * pop01(t, P.t0 + 0.4, 0.3, 2)); bits(x, 'flower', 900, 930, 9 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 680, 'NEW STREET: UNLOCKED', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0183', key: 'C', accent: YEL, solo: S, ending: 'callback',
  title: 'How to encourage | *a Gemini.*',
  cameos: CAMEOS,
  group: { cap: 'Curious mind. | *Big heart.*', mood: 'sparkle' },
  last: {
    text: 'Replied once. | *Forty more came.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const n = Math.round(41 + 39 * ease.outCubic(prog(lt, 0.8, 2.6)))
      phone(x, 720, 1120, pop01(t, t0 + 0.3, 0.35, 2) * 1.2, { top: '1:09', head: 'VOICE NOTES', msg: `▶ ${n} new`, bg: YEL, size: 40, rot: 0.06 })
      const s = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, S, 360, 1060, 300 * s, { mood: 'sparkle', seed: 44, hops: [t0 + 1.4, t0 + 2.2] })
      hearts(x, t, 380, 900, t0 + 1.6, { n: 5, life: 1.8, spread: 200, cell: 8, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
