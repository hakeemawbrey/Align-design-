// r2t0205: star_talk, BE LIKE roll call, "Got an A? | Zodiacs *be like.*" (~57 s vertical, signs3kit social cut, lofi · F)
// Twelve signs in zodiac order, each the most extreme reaction to a good grade. Ending: callback.
//   0.0–3.6    "Got an A? | Zodiacs *be like.*"
//   3.6–49.2   ♈ a victory lap around the school · ♉ celebrated with a four-course meal · ♊ told everyone, even the bus
//              driver · ♋ put it on the fridge, laminated · ♌ asked for a standing ovation · ♍ got 99, asked about the 1
//              · ♎ a handwritten thank-you card for the teacher · ♏ said nothing, smug for a week · ♐ booked a gap year to
//              celebrate · ♑ already studying for next semester · ♒ "grades are a construct" (screenshotted it) · ♓ happy
//              tears on the test paper
//  49.2        "One good grade. | *Twelve meltdowns.*"
//  52.6        CALLBACK: "Twenty years later: | *still on the fridge.*"  Cancer's laminated A is back on the fridge.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a4f', ORANGE = '#ffb34a', FRIDGE = '#dfe8f0'

// a test paper with a big red grade
function paper(x, cx, cy, k, grade, { rot = 0.05, sub = '', w = 250, h = 320, gloss = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fffdf4'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#c8d0e8'; for (let i = 0; i < 6; i++) x.fillRect(-w / 2 + 24, -h / 2 + 140 + i * 26, w - 48, 4)
  x.fillStyle = RED; x.font = `800 110px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(grade, 0, -h / 2 + 76)
  x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(0, -h / 2 + 76, 70, 0, 7); x.stroke()
  if (sub) { x.font = `700 26px ${MONO}`; x.fillText(sub, 0, h / 2 - 30) }
  if (gloss) { x.fillStyle = 'rgba(200,240,255,0.3)'; x.fillRect(-w / 2, -h / 2, w, h); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-w / 2 + 16, -h / 2 + 10, 14, h - 20) }
  x.restore()
}
function fridge(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -250, 320, 500); x.fillStyle = FRIDGE; x.fillRect(-152, -242, 304, 484)
  x.fillStyle = INK; x.fillRect(-152, -70, 304, 8); x.fillStyle = '#9aa5c4'; x.fillRect(110, -200, 12, 90); x.fillRect(110, -20, 12, 90)
  x.restore()
}
const PLATE = ['..WWWWWWWW..', '.WWRRWWGGWW.', 'WWRRRWWGGGWW', 'WWWWYYYWWWWW', '.WWWYYYWWWW.', '..WWWWWWWW..']
const BOOKS = ['KKKKKKKKKKKK', 'KRRRRRRRRRRK', 'KKKKKKKKKKKK', '.KBBBBBBBBBK', '.KKKKKKKKKKK', 'KGGGGGGGGGK.', 'KKKKKKKKKKK.', '.KYYYYYYYYYK', '.KKKKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Ran a *victory lap* | around the school.', mood: 'sparkle', star: { x: -170 }, hops: [0.3, 0.6, 0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      paper(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'A', { rot: 0.08 })
      label(x, 800, 1110, `LAP ${1 + Math.floor(lt * 2)}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Celebrated with | *a four-course meal.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const c = 1 + Math.min(3, Math.floor(lt / 0.5))
      drawBits(x, PLATE, { W: '#fff4e2', R: '#ff6b5a', G: '#6fd36f', Y: '#ffd23a' }, 790, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, `COURSE ${c} / 4`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Told *everyone.* | Even the bus driver.', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const ws = ['I GOT AN A!', 'hi! I got an A', 'driver! an A!']
      ws.forEach((w, i) => bubble(x, 790, 690 + i * 150, w, pop01(t, P.t0 + 0.2 + i * 0.45, 0.25, 2.2), { size: 34, col: [GOLD, SKYB, PINK][i], tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'On the fridge. | *Laminated.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      fridge(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2) * 0.9)
      paper(x, 790, 760, pop01(t, P.t0 + 0.6, 0.3, 2) * 0.62, 'A', { rot: -0.04, gloss: lt > 1.2 })
      label(x, 790, 1110, 'LAMINATED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Requested | *a standing ovation.*', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      paper(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.85, 'A+')
      label(x, 790, 1100, 'APPLAUSE, PLEASE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.2 * 1.29, 8, 200, 0.6)
    } },
  { sign: 'virgo', cap: 'Got a 99. | *Asked about the 1.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), '99', { sub: 'see me? why?' })
      bubble(x, 790, 1120, 'where\'s my 1?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Wrote the teacher | *a thank-you card.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 870); x.rotate(-0.05); x.scale(k, k); x.fillStyle = INK; x.fillRect(-166, -116, 332, 232); x.fillStyle = PINK; x.fillRect(-158, -108, 316, 216); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THANK YOU', 0, -20); x.font = `700 24px ${MONO}`; x.fillText('(with glitter)', 0, 40); x.restore() }
      hearts(x, t, 790, 760, P.t0 + 1.0, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'Said nothing. | *Smug for a week.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.8, 'A', { rot: -0.06 })
      label(x, 800, 1100, `DAY ${1 + Math.floor(clamp((lt - 0.5) / 1.4) * 6)}: STILL SMUG`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: '#ff6b8a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Booked a *gap year* | to celebrate.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      label(x, 790, 760, 'GAP YEAR', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 60, bg: '#c58bff', rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 960, 'FOR ONE QUIZ', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Already studying | *for next semester.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOKS, { K: INK, R: RED, B: SKYB, G: MINT, Y: GOLD }, 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 690, 'CELEBRATION: DONE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 1120, '(it took 4 sec)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Grades are a construct. | *Screenshotted it anyway.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.85, 'A')
      const f = lt - 1.2
      if (f > 0 && f < 0.25) { x.save(); x.globalAlpha = 0.8 * (1 - f / 0.25); x.fillStyle = '#fff'; x.fillRect(640, 680, 300, 340); x.restore() }
      label(x, 800, 1110, 'SAVED ×12', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Happy tears | *all over the test.*', mood: 'heart', tears: 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      paper(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'A', { sub: '(a little wet)' })
      for (let i = 0; i < 5; i++) if (lt > 0.6 + i * 0.25) { x.fillStyle = 'rgba(143,227,255,0.6)'; x.beginPath(); x.arc(740 + (i * 53) % 140, 900 + (i * 37) % 120, 16, 0, 7); x.fill() }
    } },
]

const F = makeFilm({
  id: 'r2t0205', key: 'F', accent: GOLD, ending: 'callback',
  title: 'Got an A? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One good grade. | *Twelve meltdowns.*' },
  last: {
    text: 'Twenty years later: | *still on the fridge.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      fridge(x, 640, 1220, k * 0.85)
      paper(x, 640, 1110, k * 0.55, 'A', { rot: -0.04, gloss: true })
      signChar(x, t, 'cancer', 340, 1260, 230 * pop01(t, t0 + 0.9, 0.45, 1.8), { mood: lt > 1.5 ? 'heart' : 'happy', seed: 27, hops: [t0 + 1.5] })
      sparkles(x, t, 640, 1110, t0 + 1.2, 7, 170, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
