// r2t0304: star_talk, ROLL CALL, "The signs at | *the class reunion.*" (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme reunion version of itself. Ending: callback.
//   0.0–3.6    "The signs at | *the class reunion.*"
//   3.6–49.2   ♈ challenged the old rival to arm wrestling · ♉ same jacket from senior year, still fits · ♊ told everyone a
//              different life story · ♋ brought the yearbook, annotated · ♌ hired a photographer, for themself · ♍ organised
//              it, colour-coded the name tags · ♎ still friends with every group · ♏ "what do you do now?" "classified."
//              · ♐ six countries since graduation · ♑ became the principal of this school · ♒ says they're from the next
//              reunion · ♓ cried at the name tags
//  49.2        "Years later. | *Same energy.*"
//  52.6        CALLBACK: "Next reunion: | *same jacket.*"  Taurus comes back in the jacket.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd27a', RED = '#e23d4e', ORANGE = '#ffb34a', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

const JACKET = ['..KKK..KKK..', '.KJJJKKJJJK.', 'KJJJJJJJJJJK', 'KJJKJJJJKJJK', 'KJJKJYYJKJJK', 'KJJKJYYJKJJK', 'KJJKJJJJKJJK', 'KKKKJJJJKKKK', '...KJJJJK...', '...KKKKKK...']
const JACKET_C = { K: INK, J: '#e23d4e', Y: CREAM }
const BOOK = ['KKKKKKKKKKKKKK', 'KBBBBBBKWWWWWK', 'KBBBBBBKWPWWWK', 'KBBYYBBKWWWGWK', 'KBBYYBBKWWWWWK', 'KBBBBBBKWSWWWK', 'KBBBBBBKWWWWWK', 'KKKKKKKKKKKKKK']
const CAMERA = ['...KKK.......', 'KKKKKKKKKKKKK', 'KGGGGKKKGGGGK', 'KGGGKWWWKGGGK', 'KGGGKWBWKGGGK', 'KGGGKWWWKGGGK', 'KGGGGKKKGGGGK', 'KKKKKKKKKKKKK']
const TAG = ['KKKKKKKKKKKK', 'KRRRRRRRRRRK', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']

function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD, bg = BONE } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
const jacketOn = (x, F, k) => drawBits(x, JACKET, JACKET_C, F.x, F.cy + F.S * 0.42, F.S / 27 * k)

const CAMEOS = [
  { sign: 'aries', cap: 'Challenged the old rival | *to arm wrestling.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 920, 200 * k, { mood: 'wide', look: [-1, 0], seed: 13, glyph: false })
      const r = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 8)
      L(x, 790, 660, `ROUND ${r}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), RED, 0.05, 44, CREAM)
      L(x, 790, 1110, 'REUNION: 10 MIN IN', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, -0.04, 28)
    } },
  { sign: 'taurus', cap: 'Same jacket | *from senior year.*', mood: 'sparkle', star: ST,
    front(x, t, lt, P, F) {
      jacketOn(x, F, pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 760, 'STILL FITS', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.05, 40)
      L(x, 790, 960, 'WASHED: ONCE', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Told everyone | *a different life story.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ['I’m a pilot.', 'I’m a chef.', 'I’m a twin?'].forEach((q, i) => bubble(x, 790, 680 + i * 170, q, pop01(t, P.t0 + 0.3 + i * 0.5, 0.25, 2.2), { size: 40, col: [BONE, MINT, GOLD][i], tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Brought the yearbook. | *Annotated.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, { K: INK, B: '#3a5aa8', Y: GOLD, W: CREAM, P: PINK, G: MINT, S: SKYB }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1090, 'STICKY NOTES: 212', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Hired a photographer. | *For themself.*', mood: 'sparkle', star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, { K: INK, G: '#9aa5c4', W: '#d8dbe8', B: '#2a2350' }, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const fl = (lt % 0.5) < 0.08 && lt > 0.6
      if (fl) { x.save(); x.fillStyle = 'rgba(255,250,235,0.35)'; x.fillRect(110, 480, 860, 740); x.restore() }
      L(x, 800, 1080, 'SHOTS: 400', pop01(t, P.t0 + 1.2, 0.3, 2.4), ORANGE, 0.05, 36)
    } },
  { sign: 'virgo', cap: 'Organised it. | *Colour-coded the tags.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = ['#e23d4e', ORANGE, GOLD, MINT, SKYB, LAV]
      for (let i = 0; i < 6; i++) drawBits(x, TAG, { K: INK, R: cols[i], W: CREAM }, 700 + (i % 2) * 170, 700 + Math.floor(i / 2) * 140, 12 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 790, 1110, 'BY BIRTH MONTH', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04)
    } },
  { sign: 'libra', cap: 'Still friends | *with every group.*', mood: 'heart', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      ['SPORTY ✓', 'BAND ✓', 'DRAMA ✓', 'ROBOTICS ✓'].forEach((g, i) => L(x, 790, 650 + i * 120, g, pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2.2), [PINK, SKYB, GOLD, MINT][i], i % 2 ? 0.05 : -0.05, 34))
    } },
  { sign: 'scorpio', cap: '“What do you do now?” | *“Classified.”*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so, what do | you do now?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      L(x, 790, 920, 'CLASSIFIED', pop01(t, P.t0 + 1.0, 0.3, 2.6), '#2a2350', -0.08, 52, '#ff6b8a')
      L(x, 790, 1100, 'MYSTERY: +100', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04)
    } },
  { sign: 'sagittarius', cap: 'Six countries | *since graduation.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      paper(x, 790, 860, k, [' ', ' ', ' '], { head: 'PASSPORT', headBg: '#c58bff', w: 330, size: 40, rot: 0.04, bg: '#2a4a6a' })
      const n = Math.floor(clamp((lt - 0.4) / 1.4) * 6)
      for (let i = 0; i < n; i++) { x.save(); x.translate(700 + (i % 3) * 90, 860 + Math.floor(i / 3) * 90); x.rotate((i - 2.5) * 0.15); x.strokeStyle = [GOLD, PINK, MINT, SKYB, ORANGE, CREAM][i]; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, 34, 0, 7); x.stroke(); x.restore() }
      L(x, 790, 1110, 'HOME: WHERE?', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04)
    } },
  { sign: 'capricorn', cap: 'Became the principal. | *Of this school.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), ['PRINCIPAL', '♑︎ CAPRICORN'], { w: 340, size: 36, rot: -0.03, bg: GOLD })
      L(x, 790, 1050, 'DETENTION: CANCELLED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Says they’re from | *the next reunion.*', mood: 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'don’t worry. | it goes well.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      L(x, 790, 980, 'ARRIVED: 2036', pop01(t, P.t0 + 1.3, 0.3, 2.4), BONE, -0.05, 36)
      sparkles(x, t, 560, 860, P.t0 + 0.2, 8, 170, 0.6, [SKYB, BONE, LAV])
    } },
  { sign: 'pisces', cap: 'Cried at | *the name tags.*', mood: 'heart', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TAG, { K: INK, R: LAV, W: CREAM }, 790, 840, 26 * k, { rot: 0.05 })
      if (k > 0.6) { x.save(); x.translate(790, 870); x.rotate(0.05); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HELLO ♓︎', 0, 0); x.restore() }
      L(x, 790, 1090, 'WE WERE SO YOUNG', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, 0.04)
    } },
]

const F = makeFilm({
  id: 'r2t0304', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs at | *the class reunion.*',
  cameos: CAMEOS,
  group: { cap: 'Years later. | *Same energy.*' },
  last: {
    text: 'Next reunion: | *same jacket.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      const F = signChar(x, t, 'taurus', 540, 1080, 340 * k, { mood: 'sparkle', seed: 33, hops: [t0 + 1.4] })
      jacketOn(x, F, 1)
      label(x, 540, 1400, 'STILL FITS', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
