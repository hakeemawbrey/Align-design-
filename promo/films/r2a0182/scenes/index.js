// r2a0182: star_advice, ADVICE SOLO, "Scorpio, let yourself | be loved." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign (solo, 9 cards): the guarded, deep-feeling Scorpio, gently told that love isn't a trap. Ending: callback.
//   soup with no hidden motive · a compliment isn't a trap · no loyalty test needed · the door open a crack
//   · the match texted back twice · a hug longer than a second · "how was your day?" isn't classified · the soft side
//   is safe · someone gets you, let them
//   group "Deep waters. | *Warm heart.*"   callback "Second bowl of soup? | *Scorpio said yes.*" (the soup comes back)
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const S = 'scorpio', L = { x: -170 }, PLUM = '#a0357a'
const steam = (x, t, cx, cy) => { x.save(); x.fillStyle = 'rgba(239,230,214,0.55)'; for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillRect(cx - 50 + i * 50 + Math.sin(ph * 8 + i) * 10, cy - ph * 120, 12, 34) } x.restore() }
function door(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -200, 240, 400); x.fillStyle = '#ffe9a8'; x.fillRect(-110, -190, 220, 390)
  const w = 220 * (1 - 0.35 * open)
  x.fillStyle = INK; x.fillRect(-110, -190, w + 6, 390); x.fillStyle = WOOD; x.fillRect(-110, -184, w - 4, 378)
  x.fillStyle = GOLD; x.fillRect(-110 + w - 40, 0, 18, 18)
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, 7); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, 7); x.fill()
  x.rotate(-t * 0.25); x.fillStyle = '#c97bff'; x.font = `700 ${r * 0.7}px 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♏︎', 0, 4)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Someone brought soup. | *No hidden motive.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'bowl', 790, 900, 24 * k); if (k > 0.5) steam(x, t, 790, 800)
      label(x, 790, 1100, lt > 1.3 ? 'MOTIVE: KINDNESS' : 'MOTIVE: ???', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: lt > 1.3 ? MINT : LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A compliment | *isn’t a trap.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'love your | jacket!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'br' })
      const d = '.'.repeat(1 + Math.floor(t * 3) % 3)
      label(x, 790, 960, lt > 1.4 ? 'IT’S REAL ✓' : `SCANNING${d}`, pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 40, bg: lt > 1.4 ? MINT : PLUM, color: lt > 1.4 ? INK : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'No need to | *test them first.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 'LOYALTY TEST | page 1 of 40', { head: 'DRAFT', headBg: PLUM, size: 36, w: 360, strike: lt > 1.1 ? [0, 1] : [] })
      label(x, 790, 1090, 'JUST TRUST: 1 PAGE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Letting them in | *isn’t weakness.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      door(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.7, 1.4)))
      label(x, 790, 610, 'DOOR: OPEN A CRACK', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match texted twice. | *That’s good.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:12', head: '✦ MATCH: CANCER', msg: 'had fun! | again soon?', bg: PINK })
      label(x, 790, 1110, 'RED FLAGS: 0', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hugs can last | *longer than one second.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const s = Math.min(5, 1 + Math.floor(prog(lt, 0.4, 1.8) * 4.99))
      label(x, 790, 800, `HUG: 0:0${s}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 56, bg: s >= 5 ? PINK : GOLD, rot: 0.03, font: MONO, weight: 700 })
      bubble(x, 790, 1020, 'okay… nice.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: '“How was your day?” | *Isn’t classified.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'how was | your day?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'br' })
      note(x, 790, 940, pop01(t, P.t0 + 0.6, 0.3, 2), lt > 1.3 ? 'CLASSIFIED | it was good :)' : 'CLASSIFIED', { head: 'FILE 8', headBg: PLUM, size: 38, w: 340, strike: lt > 1.3 ? [0] : [] })
    } },
  { sign: S, cap: 'Your soft side | *is safe here.*', mood: 'heart', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'heart', 790, 840, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 * Math.sin(t * 3) })
      label(x, 790, 1080, 'SOFT SIDE: SEEN', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 780, P.t0 + 1.3, { n: 4, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Someone gets you? | *Let them.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      chart(x, 790, 800, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 790, 1070, 'so THAT’S | why you…', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0182', key: 'F', accent: '#c97bff', solo: S, ending: 'callback',
  title: 'Scorpio, let yourself | *be loved.*',
  cameos: CAMEOS,
  group: { cap: 'Deep waters. | *Warm heart.*', mood: 'heart' },
  last: {
    text: 'Second bowl of soup? | *Scorpio said yes.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.35, 2)
      bits(x, 'bowl', 700, 1180, 26 * k); if (k > 0.5) steam(x, t, 700, 1080)
      const s = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, S, 400, 1080, 330 * s, { mood: lt > 1.4 ? 'heart' : 'happy', seed: 44, hops: [t0 + 1.5] })
      bubble(x, 760, 900, 'thank you.', pop01(t, t0 + 1.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      hearts(x, t, 420, 900, t0 + 1.6, { n: 6, life: 2.0, spread: 240, cell: 8, seed: 2 })
      label(x, 700, 1400, 'MOTIVE: LOVE', pop01(t, t0 + 1.8, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
