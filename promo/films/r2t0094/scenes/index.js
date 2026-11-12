// r2t0094: star_talk, BE LIKE, "A baby smiled. | Zodiacs be like." (~54 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme reaction to a baby smiling at them. A little stroller rolls into every card.
//   0.0–3.6    "A baby smiled. | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one reaction per sign (3.8 s each):
//              ♈ smiled back harder (smile-off, round 3) · ♉ melted into a puddle · ♊ forty faces in four seconds
//              · ♋ already planning their 18th birthday · ♌ assumed the baby recognised them (autograph) · ♍ sanitised, then waved
//              · ♎ matching outfits by Friday · ♏ "didn't care", kept the photo forever · ♐ promised the baby a trip to the moon
//              · ♑ smiled back: first time this year · ♒ asked the baby's rising sign ("goo.") · ♓ sobbed for joy
//  49.2        ending 'group': "One smile. | *Twelve meltdowns.*"  The twelve in the group photo; the baby, unbothered, above.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', SKIN = '#ffd9b8'

// ── props: a baby in a stroller
const STROLLER = [
  '.....HHHHH........',
  '...HHHHHHHH.......',
  '..HHHHHHHFFFFF....',
  '.HHHHHHHFFFFFFF...',
  'HHHHHHHFFFFFFFFF..',
  'HHHHHHHFFFFFFFFF..',
  'HHHHHHHFFFFFFFFF..',
  'BBBBBBBBBBBBBBBBBBG',
  'BBBBBBBBBBBBBBBBB.G',
  '.BBBBBBBBBBBBBBB..G',
  '..K............K..',
  '.KKK..........KKK.',
  '..K............K..',
]
const STROLLER_C = { H: '#6fc3ff', F: SKIN, B: '#4f8fe0', G: '#2a2350', K: INK }
/** draw the stroller with the baby's face (eyes + smile) on the F cells */
function baby(x, t, cx, cy, cell, k, { smile = 1, look = -1, hat = null } = {}) {
  if (k <= 0.01) return
  const c = cell * k
  drawBits(x, STROLLER, STROLLER_C, cx, cy, c, { sx: look < 0 ? 1 : -1 })
  // face: centred on the F block (cols 7–14, rows 2–4); mirrored with the stroller
  const fx = cx + (look < 0 ? 1 : -1) * (12 - 9.5) * c, fy = cy + (5 - 6.5) * c
  x.fillStyle = INK
  x.fillRect(fx - 1.6 * c, fy - 0.6 * c, 0.7 * c, 0.7 * c); x.fillRect(fx + 0.9 * c, fy - 0.6 * c, 0.7 * c, 0.7 * c)
  if (smile) { x.fillRect(fx - 1.0 * c, fy + 0.6 * c, 2.0 * c, 0.45 * c); x.fillRect(fx - 1.4 * c, fy + 0.3 * c, 0.45 * c, 0.45 * c); x.fillRect(fx + 0.95 * c, fy + 0.3 * c, 0.45 * c, 0.45 * c) }
  else x.fillRect(fx - 0.6 * c, fy + 0.6 * c, 1.2 * c, 0.45 * c)
  x.fillStyle = PINK; x.fillRect(fx - 2.4 * c, fy + 0.2 * c, 0.7 * c, 0.4 * c); x.fillRect(fx + 1.7 * c, fy + 0.2 * c, 0.7 * c, 0.4 * c)
  if (hat) drawBits(x, hat.bm, hat.cols, fx, fy - 2.8 * c, c * 0.8)
}
/** the baby rolls in from the right edge of the panel and parks at (px, py) */
function babyIn(x, t, lt, P, px = 790, py = 1050, cell = 15, opts = {}) {
  const p = ease.outCubic(prog(lt, 0.05, 0.6))
  baby(x, t, lerp(1000, px, p), py, cell, P.k, opts)
}
const BOW = ['P.....P', 'PP...PP', 'PPPRPPP', 'PP...PP', 'P.....P']
const MOON = ['..YYY..', '.YYYY..', 'YYY....', 'YYY....', 'YYY....', '.YYYY..', '..YYY..']

const CAMEOS = [
  { sign: 'aries', cap: 'Smiled back. | *Harder.*', mood: 'sparkle', star: { x: -170 }, hops: [0.9, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      babyIn(x, t, lt, P)
      const r = 1 + Math.min(2, Math.floor(Math.max(0, lt - 0.6) / 0.5))
      label(x, 790, 720, `SMILE-OFF: ROUND ${r}`, pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 380, 860, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'taurus', cap: 'Didn’t react. | *Melted into a puddle.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', star: { x: -170, y: 40 },
    squash: lt => lt > 1.0 ? Math.min(0.42, (lt - 1.0) * 0.8) : 0,
    back(x, t, lt, P, F) {
      const m = ease.outCubic(prog(lt, 1.0, 1.8))
      if (m > 0.01) { x.fillStyle = INK; x.beginPath(); x.ellipse(F.x, 1130, 200 * m + 6, 40 * m + 6, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5fd068'; x.beginPath(); x.ellipse(F.x, 1130, 200 * m, 40 * m, 0, 0, Math.PI * 2); x.fill() }
    },
    front(x, t, lt, P) {
      babyIn(x, t, lt, P)
      label(x, 790, 720, 'STATUS: MELTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Pulled forty faces. | *In four seconds.*', mood: lt => ['wink', 'wide', 'sparkle', 'squint', 'heart', 'eyeroll'][Math.floor(lt * 6) % 6], look: lt => [Math.floor(lt * 6) % 2 ? 1 : -1, Math.floor(lt * 3) % 2 ? -1 : 0], star: { x: -170 },
    front(x, t, lt, P) {
      babyIn(x, t, lt, P)
      const n = Math.min(40, Math.floor(clamp((lt - 0.2) / 1.6) * 40))
      label(x, 790, 720, `FACES: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 38, bg: '#ffd23a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Already planning | *their 18th birthday.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      babyIn(x, t, lt, P)
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 740); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -110, 280, 220); x.fillStyle = CREAM; x.fillRect(-132, -102, 264, 204)
        x.fillStyle = PINK; x.fillRect(-132, -102, 264, 50)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PARTY PLAN', 0, -76)
        x.font = `700 22px ${MONO}`; x.fillStyle = '#6b62a8'
        ;['cake: 3 tiers', 'theme: stars', 'date: in 18 yrs'].forEach((l, i) => { if (lt > 0.9 + i * 0.3) x.fillText(l, 0, -20 + i * 40) })
        x.restore()
      }
      hearts(x, t, 790, 900, P.t0 + 1.6, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Assumed the baby | *was a fan.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      babyIn(x, t, lt, P)
      bubble(x, 760, 660, 'no photos, | sweetie', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 860, 'AUTOGRAPH: SIGNED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Sanitised twice. | *Then waved.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      babyIn(x, t, lt, P)
      // soap bubbles around the star's hands
      for (let i = 0; i < 7; i++) {
        const ph = ((t * 0.6 + i / 7) % 1), a = lt < 1.3 ? 1 : 1 - prog(lt, 1.3, 1.6)
        if (a <= 0.01) continue
        x.save(); x.globalAlpha = a * Math.sin(Math.PI * ph); x.strokeStyle = SKYB; x.lineWidth = 4
        x.beginPath(); x.arc(F.x - 140 + i * 45, F.cy + 60 - ph * 160, 14 + (i % 3) * 6, 0, Math.PI * 2); x.stroke(); x.restore()
      }
      label(x, 790, 720, lt > 1.4 ? 'WAVE: HYGIENIC' : 'SCRUBBING…', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Planned matching outfits. | *By Friday.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const b = pop01(t, P.t0 + 1.0, 0.35, 2.4)
      babyIn(x, t, lt, P, 790, 1050, 15, b > 0.5 ? { hat: { bm: BOW, cols: { P: PINK, R: RED } } } : {})
      drawBits(x, BOW, { P: PINK, R: RED }, F.x, F.top - 30, 12 * b)
      label(x, 790, 720, 'STYLED: BOTH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 600, 900, P.t0 + 1.2, 8, 240, 0.3)
    } },
  { sign: 'scorpio', cap: '“Didn’t care.” | *Kept the photo forever.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      babyIn(x, t, lt, P, 820, 1090, 11)
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 760); x.rotate(-0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-110, -110, 220, 230); x.fillStyle = '#ffffff'; x.fillRect(-102, -102, 204, 214)
        x.fillStyle = '#ffd9a8'; x.fillRect(-88, -88, 176, 150)
        baby(x, t, 0, -10, 7, 1)
        x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText('FOREVER', 0, 92)
        x.restore()
      }
      label(x, 790, 920, 'FILED: WALLET', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Promised the baby | *a trip to the moon.*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.05, 0.6))
      baby(x, t, lerp(80, 300, p), 1050, 15, P.k, { look: 1 })
      drawBits(x, MOON, { Y: GOLD }, 300, 660, 18 * pop01(t, P.t0 + 0.5, 0.35, 2))
      bubble(x, 560, 640, 'next tuesday?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'br' })
      label(x, 300, 860, 'TICKETS: 2', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Smiled back. | *First time this year.*', mood: lt => lt > 1.0 ? 'happy' : 'neutral', star: { x: 170 },
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.05, 0.6))
      baby(x, t, lerp(80, 300, p), 1050, 15, P.k, { look: 1 })
      label(x, 300, 720, lt > 1.0 ? 'SMILES THIS YEAR: 1' : 'SMILES THIS YEAR: 0', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 30, bg: '#2fc79a', rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 710, 850, P.t0 + 1.1, 8, 160, 0.3)
    } },
  { sign: 'aquarius', cap: 'Asked the baby’s | *rising sign.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      babyIn(x, t, lt, P)
      bubble(x, 760, 640, 'and your rising?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      bubble(x, 860, 860, 'goo.', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 40, col: CREAM, tail: 'br' })
      label(x, 600, 1180, 'NOTED. FASCINATING.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A baby smiled. | *Sobbed for joy.*', mood: lt => lt < 0.8 ? 'sparkle' : 'heart', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      babyIn(x, t, lt, P)
      label(x, 790, 720, 'HAPPY TEARS: ∞', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 760, 960, P.t0 + 0.9, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0094', key: 'D', accent: PINK, ending: 'group',
  title: 'A baby smiled. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'One smile. | *Twelve meltdowns.*',
    draw(x, t, lt) {
      const t0 = t - lt
      baby(x, t, 540, 690, 14, pop01(t, t0 + 1.4, 0.35, 2))
      label(x, 540, 560, 'THE BABY: UNBOTHERED', pop01(t, t0 + 2.0, 0.3, 2.4), { size: 32, bg: CREAM, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
