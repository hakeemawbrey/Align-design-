// r2a0291: star_advice, ADVICE SOLO, "How to surprise | a Gemini." (~49 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (solo mode, 9 cards): small surprises that feed a curious mind, each with a warm reframe.
//   0.0–3.6    "How to surprise | *a Gemini.*"
//   3.6–37.8   plan a mystery day, let them guess (fourteen guesses) · bring a brand-new fact · a book they haven't read
//              (finished by Tuesday) · send a voice note, five come back · say yes to their random idea (juggling)
//              · introduce them to someone new · switch up the plan (dinner → stargazing) · love both of their moods
//              · the best surprise: really listening
//  37.8        "Keep it fresh. | *Keep it fun.*"   41.0  LESSON: "Curious hearts love | to be *surprised.*"
//  46.9        "They’ll surprise you | *right back.*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, clamp, ease, lerp, prog } from './props.js'

const S = 'gemini', ST = { x: -180 }, ACC = SUN
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const BOOK = ['KKKKKKKKKK', 'KRRRRRRRRK', 'KRWWWWWWRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KKKKKKKKKK', 'KCCCCCCCCK', 'KKKKKKKKKK']
const QMARK = ['.KKK.', 'K...K', '...K.', '..K..', '..K..', '.....', '..K..']
const TELE = ['..KK....', '.KWWK...', 'KWWWWK..', '.KWWWWK.', '..KWWWWK', '...KWWK.', '....KK..', '...K.K..', '..K...K.']
const MOON = ['..YYY..', '.YY....', 'YY.....', 'YY.....', 'YY.....', '.YY....', '..YYY..']

const CAMEOS = [
  { sign: S, cap: 'Plan a mystery day. | *Let them guess.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const gs = ['museum?', 'picnic?', 'bowling??', 'a TRAIN?!']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.4) + (lt > 0.3 ? 1 : 0))
      for (let i = 0; i < n; i++) bubble(x, 760 + (i % 2) * 60, 640 + i * 110, gs[i], pop01(t, P.t0 + 0.3 + i * 0.4, 0.25, 2.2), { size: 36, tail: i % 2 ? 'br' : 'bl', col: i === 3 ? SUN : BONE })
      lab(x, 790, 1120, `GUESSES: ${Math.floor(clamp((lt - 0.3) / 1.8) * 14)}`, pop01(t, P.t0 + 0.5, 0.3, 2), { bg: LAV, rot: -0.04 })
    } },
  { sign: S, cap: 'Bring them a new fact. | *Watch them glow.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      bubble(x, 780, 680, 'octopuses have | THREE hearts', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      if (lt > 1.1) { const g = ease.outCubic(prog(lt, 1.1, 1.5)); x.save(); x.globalAlpha = 0.35 * g; x.fillStyle = SUN; x.beginPath(); x.arc(F.x, F.cy, 200 * g, 0, Math.PI * 2); x.fill(); x.restore() }
      hearts(x, t, 790, 960, P.t0 + 1.2, { n: 3, life: 1.4, spread: 120, cell: 9, seed: 3 })
      lab(x, 790, 1110, 'BRAIN: LIT UP', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: SUN, rot: 0.04 })
    } },
  { sign: S, cap: 'Gift a book. | *Finished by Tuesday.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BOOK, { K: INK, R: RED, W: CREAM, C: BONE }, 790, 860, 24 * k, { rot: 0.06 })
      const p = Math.floor(clamp((lt - 0.4) / 1.5) * 412)
      lab(x, 790, 660, `PAGE ${p} / 412`, pop01(t, P.t0 + 0.4, 0.3, 2), { bg: BONE, rot: -0.04 })
      lab(x, 790, 1100, 'NEXT ONE, PLEASE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Send a voice note. | *Get five back.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      const pills = [0.3, 0.8, 1.1, 1.35, 1.6, 1.85].map((a, i) => [i === 0 ? '▶ 0:12  you' : `▶ ${[4, 3, 6, 2, 5][i - 1]}:0${i}`, i === 0 ? LAV : SUN, pop01(t, P.t0 + a, 0.25, 2)])
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.35, 2), { head: 'VOICE NOTES', headCol: SUN, lines: pills.slice(0, 5), size: 30, w: 300, h: 470 })
    } },
  { sign: S, cap: 'Say yes to their | *random idea.*', mood: 'sparkle', star: { x: -150 }, hops: [0.7, 1.4, 2.0],
    front(x, t, lt, P, F) {
      bubble(x, 790, 650, "let's learn | to juggle!", pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (lt > 0.8) for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.09; x.fillStyle = INK; x.beginPath(); x.arc(F.x + Math.cos(a) * 110, F.cy - 190 + Math.sin(a) * 60, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = [PINK, MINT, SKYB][i]; x.beginPath(); x.arc(F.x + Math.cos(a) * 110, F.cy - 190 + Math.sin(a) * 60, 21, 0, Math.PI * 2); x.fill() }
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 1010, 160 * k, { mood: 'happy', look: [-1, 0], seed: 14, glyph: false })
      lab(x, 820, 1160, 'YOU: ALSO JUGGLING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Introduce them to | *someone new.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 990, 190 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 15, glyph: false, hops: [P.t0 + 1.3] })
      bubble(x, 760, 660, 'wait, you like | moths TOO?!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'br' })
      lab(x, 800, 1160, '3 HOURS LATER…', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: SKYB, rot: 0.04 })
    } },
  { sign: S, cap: 'Switch up the plan. | *They love a twist.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 300, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'TONIGHT', 0, -80, { size: 28, font: MONO, weight: 700, color: GREY })
        txt(x, 'dinner', 0, -20, { size: 44 })
        const s = ease.outCubic(prog(lt, 0.9, 1.2)); if (s > 0) { x.fillStyle = RED; x.fillRect(-90, -24, 180 * s, 8) }
        if (lt > 1.2) txt(x, 'stargazing', 0, 56, { size: 40, color: '#6b62a8' })
      })
      if (lt > 1.2) drawBits(x, TELE, { K: INK, W: '#c9c9d8' }, 880, 1040, 11)
      drawBits(x, MOON, { Y: SUN }, 660, 650, 10 * pop01(t, P.t0 + 1.3, 0.3, 2))
      sparkles(x, t, 790, 800, P.t0 + 1.25, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Love both moods. | *Chatty and quiet.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', star: ST,
    front(x, t, lt, P) {
      card(x, 700, 800, 220, 170, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: SUN, rot: -0.06 }, () => { txt(x, 'CHATTY:', 0, -36, { size: 24, font: MONO, weight: 700 }); txt(x, 'board games', 0, 24, { size: 28 }) })
      card(x, 870, 960, 220, 170, pop01(t, P.t0 + 0.6, 0.35, 2), { bg: LAV, rot: 0.06 }, () => { txt(x, 'QUIET:', 0, -36, { size: 24, font: MONO, weight: 700 }); txt(x, 'tea + blanket', 0, 24, { size: 28 }) })
      lab(x, 790, 1150, 'BOTH: SEEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'The best surprise? | *Really listening.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 990, 190 * k, { mood: 'happy', look: [-1, 0], seed: 16, glyph: false })
      bubble(x, 780, 680, 'wait, go back. | tell me more.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'br' })
      hearts(x, t, 400, 820, P.t0 + 1.2, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0291', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to surprise | *a Gemini.*',
  cameos: CAMEOS,
  group: { cap: 'Keep it fresh. | *Keep it fun.*', mood: 'sparkle' },
  lesson: { text: 'Curious hearts love | to be *surprised.*', chip: 'STATUS: DELIGHTED' },
  last: {
    text: 'They’ll surprise you | *right back.*',
    draw(x, t, lt) {
      sparkles(x, t, 540, 860, t - lt + 0.6, 8, 260, 0.2, [SUN, BONE, PINK])
      hearts(x, t, 540, 1200, t - lt + 0.8, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
