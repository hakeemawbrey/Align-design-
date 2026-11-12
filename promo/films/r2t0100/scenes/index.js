// r2t0100: star_talk, BELIKE, "Astrology is fake? | Zodiacs be like." (~61 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each one's most extreme reaction when someone says astrology is fake. Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ "say that again" (round one) · ♉ didn't look up from the sandwich · ♊ agreed, then argued the other side
//              · ♋ took it personally, called mom · ♌ gasped, twice · ♍ a footnoted rebuttal · ♎ hosted a panel
//              · ♏ "interesting", already guessed their sign · ♐ agreed, then read their horoscope · ♑ also thinks it's
//              fake, very Capricorn of them · ♒ pulled up seventeen charts · ♓ cried for the stars' feelings
//  49.2        "One opinion. | *Twelve responses.*"
//  52.4        LESSON UNLOCKED: "Believe it or not, | *it’s fun to share.*"  VIBES: CONFIRMED
//  58.3        "Still asking: | *what’s your sign?*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const VIOLET = '#b78bff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'

function card(x, cx, cy, w, h, col, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function text(x, s, cx, cy, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}
const SANDWICH = ['..BBBBBBB..', '.BBBBBBBBB.', 'GGGGGGGGGGG', 'RRRRRRRRRRR', 'YYYYYYYYYYY', '.BBBBBBBBB.']
const SAND_C = { B: '#e7b46a', G: '#5fd068', R: RED, Y: GOLD }
const SLICE = ['#ff6b5e', '#7dd56f', '#ffd23a', '#8fe3ff', '#ffb34a', '#c9e27a', '#ff9ec7', '#c14a7a', '#b78bff', '#7aa8a0', '#59c4ff', '#b7a6ff']
function chart(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(t * 0.4); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = SLICE[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i * Math.PI / 6, (i + 1) * Math.PI / 6 - 0.04); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a binder with coloured tabs
function binder(x, cx, cy, k) {
  if (k <= 0.01) return
  card(x, cx, cy, 280, 340, '#4a7ad8', { k, rot: -0.04 })
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  const tabs = [GOLD, PINK, MINT, SKYB, ORANGE]
  tabs.forEach((c, i) => { x.fillStyle = INK; x.fillRect(136, -150 + i * 56, 40, 44); x.fillStyle = c; x.fillRect(140, -146 + i * 56, 32, 36) })
  x.fillStyle = CREAM; x.fillRect(-100, -60, 200, 110); text(x, 'REBUTTAL', 0, -26, 30, INK, MONO, 700); text(x, 'vol. 1 of 3', 0, 18, 24, '#6b62a8', MONO, 700)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: '“Say that again.” | *Round one.*', mood: 'squint', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      label(x, 800, 720, 'ROUND 1', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 52, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'I’ve got | ALL day', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Didn’t look up | *from the sandwich.*', mood: 'heart', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SAND_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 700, 'UNBOTHERED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Agreed. Then argued | *the other side.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 720, 'so true.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 820, 940, 'BUT also…', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl', col: GOLD })
      label(x, 800, 1120, 'BOTH TEAMS', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Took it personally. | *Called their mom.*', mood: 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 800, 860, 250, 400, '#2a2350', { k, rot: 0.05 })
      if (k > 0.5) { x.save(); x.translate(800, 860); x.rotate(0.05); text(x, 'MOM ♡', 0, -80, 44, CREAM); text(x, 'calling…', 0, -30, 28, '#9aa5c4', MONO, 700); x.fillStyle = '#2f9a4a'; x.beginPath(); x.arc(0, 110, 40 + 4 * Math.sin(t * 8), 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 800, 1110, 'MOM AGREES', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Gasped. | *Loudly. Twice.*', mood: 'wide', star: { x: -170 }, hops: [0.5, 1.5],
    front(x, t, lt, P) {
      label(x, 800, 760, 'GASP', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 64, bg: GOLD, rot: -0.06 })
      label(x, 800, 960, 'GASP', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 80, bg: ORANGE, rot: 0.05 })
    } },
  { sign: 'virgo', cap: 'Brought a rebuttal. | *With footnotes.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      binder(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1100, 'SOURCES: 41', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Saw both sides. | *Hosted a panel.*', mood: 'happy', look: [1, 0], star: { x: 0, y: -40, s: 240 },
    front(x, t, lt, P) {
      const pals = [['virgo', 280, 1060], ['capricorn', 800, 1060]]
      pals.forEach(([id, px, py], i) => { const k = pop01(t, P.t0 + 0.4 + i * 0.2, 0.35, 2); if (k > 0.01) signChar(x, t, id, px, py, 150 * k, { mood: 'neutral', look: [i ? -1 : 1, 0], seed: 40 + i, glyph: false }) })
      label(x, 540, 640, 'PANEL TONIGHT, 7PM', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: '“Interesting.” | *Guessed their sign.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      card(x, 800, 840, 240, 280, '#140c30', { k, rot: 0.04 })
      if (k > 0.5) { text(x, '♑︎', 800, 810, 130, '#7aa8a0', "'Segoe UI Symbol', 'Noto Sans Symbols', serif", 700); text(x, 'CAPRICORN?', 800, 930, 30, BONE, MONO, 700) }
      label(x, 800, 1080, 'CORRECT.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Agreed. Then read | *today’s horoscope.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 800, 860, 300, 300, CREAM, { k, rot: -0.04 })
      if (k > 0.5) { x.save(); x.translate(800, 860); x.rotate(-0.04); text(x, 'TODAY', 0, -100, 36, INK, MONO, 700); for (let i = 0; i < 5; i++) text(x, '★', -100 + i * 50, -30, 44, GOLD); for (let i = 0; i < 3; i++) { x.fillStyle = '#9aa5c4'; x.fillRect(-110, 30 + i * 34, 220 - i * 40, 12) } x.restore() }
      bubble(x, 800, 650, 'oh nice!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Also thinks it’s fake. | *Very Capricorn.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'it’s fake.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 800, 980, 'CLASSIC CAP', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'Pulled up | *seventeen charts.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 16)
      for (let i = 0; i < Math.min(n, 4); i++) chart(x, t + i, 700 + (i % 2) * 190, 760 + Math.floor(i / 2) * 200, 80, pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2))
      label(x, 800, 1110, `CHART ${n} OF 17`, pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried for | *the stars’ feelings.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [0, -1], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2); x.save(); x.globalAlpha = k; x.fillStyle = GOLD; x.font = `800 ${50 + (i % 2) * 16}px ${INTER}`; x.textAlign = 'center'; x.fillText('★', 680 + i * 60, 700 + (i % 2) * 60); x.restore() }
      bubble(x, 800, 900, 'they’re | REAL to me', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
      x.fillStyle = 'rgba(143,227,255,0.6)'; const pw = 220 * ease.outCubic(prog(lt, 0.6, 2.0)); x.beginPath(); x.ellipse(400, 1130, pw, 24, 0, 0, Math.PI * 2); x.fill()
    } },
]

const F = makeFilm({
  id: 'r2t0100', key: 'F', accent: VIOLET, ending: 'lesson',
  title: 'Astrology is fake? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One opinion. | *Twelve responses.*' },
  lesson: { text: 'Believe it or not, | *it’s fun to share.*', chip: 'VIBES: CONFIRMED' },
  last: {
    text: 'Still asking: | *what’s your sign?*',
    draw(x, t, lt) {
      label(x, 540, 760, 'asking for a friend', pop01(t, t - lt + 0.8, 0.3, 2.2), { size: 44, bg: PINK, rot: -0.04 })
      sparkles(x, t, 540, 760, t - lt + 0.9, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
