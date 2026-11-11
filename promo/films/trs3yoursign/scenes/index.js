// trs3yoursign: THE SIGNS when you ask "what's your sign?" (~62 s vertical, signs3kit v3 social cut, music: lofi · G)
//   0.0–3.6    "“What's your sign?” | The signs *answer.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one answer per sign (3.8 s each):
//              ♈ answered before you finished · ♉ will answer after dessert · ♊ answered, changed the subject three times
//              · ♋ now wants your mom's sign too · ♌ signed an autograph · ♍ a laminated birth chart · ♎ "unless you hate Libras"
//              · ♏ classified until the third date · ♐ answered while leaving the country · ♑ Capricorn sun, moon and rising
//              · ♒ signs are too mainstream, identifies as a comet · ♓ you asked? sobbing
//  49.2        "Everyone *answered.* Eventually."
//  52.4        LESSON UNLOCKED: "Ask the question. | *Listen* to the answer."  SIGN: SHARED
//  58.3        "Then ask them *back.*"  over the match card: Cancer (asks everyone) + Pisces (cried at being asked)
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, MONO, INTER,
} from '../../signs3kit.js'

// ── props
const CAKE = [
  '.....RR.....',
  '.....RR.....',
  '...WWWWWW...',
  '..WWWWWWWWW.',
  '.PPPPPPPPPP.',
  'PPPPPPPPPPPP',
  'CCCCCCCCCCCC',
  'YYYYYYYYYYYY',
  'CCCCCCCCCCCC',
  'YYYYYYYYYYYY',
  'CCCCCCCCCCCC',
]
const CAKE_C = { R: '#e23d4e', W: '#fff4e2', P: PINK, C: '#7a4a2e', Y: '#ffe7a8' }
const PHOTO = [
  'GGGGGGGGGGGG',
  'GSSSSSSSSSSG',
  'GSSSSYYSSSSG',
  'GSSSYYYYSSSG',
  'GSYYYYYYYYSG',
  'GSSYYYYYYSSG',
  'GSSSYYYYSSSG',
  'GSSYYSSYYSSG',
  'GSSSSSSSSSSG',
  'GSSSSSSSSSSG',
  'GGGGGGGGGGGG',
]
const PHOTO_C = { G: GOLD, S: '#ff9f43', Y: '#fff1a8' }
const FOLDER = [
  'MMMMM.........',
  'MMMMMMMMMMMMMM',
  'MMMMMMMMMMMMMM',
  'MMMMMMMMMMMMMM',
  'MMMMMMMMMMMMMM',
  'MMMMMMMMMMMMMM',
  'MMMMMMMMMMMMMM',
  'MMMMMMMMMMMMMM',
  'MMMMMMMMMMMMMM',
  'MMMMMMMMMMMMMM',
]
const FOLDER_C = { M: '#d9b36a' }
const CASE = [
  '....KKKK....',
  '....K..K....',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BWWBBBBBBBBB',
  'BWWBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBRRRB',
  'BBBBBBBBRRRB',
  'BBBBBBBBBBBB',
  '.K........K.',
]
const CASE_C = { K: '#efe6d6', B: '#c97bff', W: '#fff4e2', R: '#ffd23a' }
const COMET = [
  '..........WW',
  '........WWYW',
  '......LLWYYW',
  '....LL.LWWW.',
  '..LL..LL....',
  'LL...L......',
]
const COMET_C = { W: '#ffffff', Y: '#8fe3ff', L: '#c9a6ff' }

// the laminated birth chart: a glossy card with a zodiac wheel
function chartCard(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -160, 320, 320)
  x.fillStyle = '#fff4e2'; x.fillRect(-150, -150, 300, 300)
  x.strokeStyle = INK; x.lineWidth = 8
  x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 5; x.beginPath(); x.arc(0, 0, 62, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 62, Math.sin(a) * 62); x.lineTo(Math.cos(a) * 118, Math.sin(a) * 118); x.stroke() }
  const dots = ['#e23d4e', '#2fc79a', '#c97bff', GOLD]
  dots.forEach((c, i) => { const a = i * 1.7 + 0.4; x.fillStyle = INK; x.fillRect(Math.cos(a) * 90 - 11, Math.sin(a) * 90 - 11, 22, 22); x.fillStyle = c; x.fillRect(Math.cos(a) * 90 - 7, Math.sin(a) * 90 - 7, 14, 14) })
  // the lamination glint sweeping across
  const g = ((t * 0.6) % 1.6) - 0.3
  x.save(); x.beginPath(); x.rect(-150, -150, 300, 300); x.clip()
  x.fillStyle = 'rgba(255,255,255,0.55)'; x.translate(g * 400 - 200, 0); x.rotate(0.5); x.fillRect(-18, -260, 36, 520)
  x.restore()
  x.restore()
}
// Capricorn's business card
function bizCard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-182, -102, 380, 220)
  x.fillStyle = INK; x.fillRect(-196, -116, 392, 232)
  x.fillStyle = '#fff4e2'; x.fillRect(-188, -108, 376, 216)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 46px ${INTER}`; x.fillText('CAPRICORN', 0, -44)
  x.fillStyle = '#2fc79a'; x.fillRect(-150, -6, 300, 6)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`
  x.fillText('SUN: CAPRICORN', 0, 30); x.fillText('MOON: CAPRICORN', 0, 62)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Answered before you | *finished asking.*', mood: lt => lt < 0.5 ? 'wide' : 'sparkle', star: { x: -150 }, hops: [0.35, 0.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 610, 'what’s your s—', pop01(t, P.t0 + 0.15, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
      bubble(x, 760, 800, 'ARIES!!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 64, tail: 'bl' })
      sparkles(x, t, 760, 800, P.t0 + 0.45, 8, 170, 0.3)
    } },
  { sign: 'taurus', cap: 'Will answer | *after dessert.*', mood: lt => lt < 1.5 ? 'happy' : 'heart', star: { x: -150 },
    back(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
    },
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'one sec. | eating.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Answered, then changed | the subject *three times.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: lt => [Math.floor(lt * 1.6) % 2 ? 1 : -1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const L = ['Gemini! | anyway—', 'did you see | that bird?', 'love your | shoes btw', 'wait, what | was the q?']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.5))
      const k = pop01(t, P.t0 + 0.3 + n * 0.5, 0.22, 2.2)
      bubble(x, 770, 720, L[n], k, { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Now wants your *mom’s* | sign too.', mood: 'sparkle', star: { x: -150 },
    front(x, t, lt, P) {
      bubble(x, 770, 660, 'and your mom’s? | your nan’s? | your dog’s?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 780, 1000, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Signed an *autograph* | instead.', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PHOTO, PHOTO_C, 790, 780, 24 * k, { rot: 0.07 })
      // the scribble signature, drawn on over the photo
      const p = prog(lt, 0.6, 1.3)
      if (p > 0 && k > 0.5) {
        x.save(); x.translate(790, 830); x.rotate(0.07); x.strokeStyle = INK; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath()
        const N = Math.floor(40 * p)
        for (let i = 0; i <= N; i++) { const u = i / 40, px = -100 + u * 200, py = Math.sin(u * 18) * 22 * (1 - u * 0.5) - u * 20; i ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.stroke(); x.restore()
      }
      label(x, 790, 1000, 'XOXO, LEO', pop01(t, P.t0 + 1.4, 0.3, 2), { bg: '#ffb34a', rot: -0.06 })
    } },
  { sign: 'virgo', cap: 'Handed over a *laminated* | birth chart.', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      chartCard(x, 780, 780, pop01(t, P.t0 + 0.25, 0.3, 2), t)
      label(x, 790, 980, 'WITH FOOTNOTES', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 28, bg: MINT, rot: -0.05 })
    } },
  { sign: 'libra', cap: 'Libra. *Unless* you | hate Libras.', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const late = lt > 1.1
      bubble(x, 770, 700, late ? '…or whatever | you like best?' : 'Libra!', late ? pop01(t, P.t0 + 1.1, 0.25, 2.2) : pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: late ? 36 : 56, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'That’s *classified.* | Third date, maybe.', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      drawBits(x, FOLDER, FOLDER_C, 790, 790, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 800, 'CLASSIFIED', pop01(t, P.t0 + 0.9, 0.25, 2.6), { size: 40, bg: '#e23d4e', color: '#fff4e2', rot: -0.14 })
    } },
  { sign: 'sagittarius', cap: 'Answered while | *leaving the country.*', mood: 'sparkle', star: { x: 150 }, hops: [0.4, 0.9, 1.4],
    back(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 330, 960, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.06 })
    },
    front(x, t, lt, P) {
      bubble(x, 330, 660, 'SAG! BYE!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 48, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Sun, moon *and rising.* | Obviously.', mood: lt => lt < 1.2 ? 'neutral' : 'happy', star: { x: 160 },
    front(x, t, lt, P) {
      bizCard(x, 320, 760, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 320, 930, 'RISING: CAPRICORN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 26, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Signs? Too *mainstream.* | Identifies as a comet.', mood: lt => lt > 1.2 ? 'squint' : 'happy', star: { x: -160 }, hops: [0.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const dx = 30 * Math.sin(lt * 2)
      drawBits(x, COMET, COMET_C, 790 + dx, 930, 26 * k, { rot: -0.1 })
      bubble(x, 770, 660, 'I’m a | comet now.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'You *asked?* | Pisces is sobbing.', mood: lt => lt < 0.9 ? 'wide' : 'sparkle', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -150 },
    front(x, t, lt, P) {
      bubble(x, 780, 650, 'you… asked | about ME?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      hearts(x, t, 790, 990, P.t0 + 1.1, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'trs3yoursign', key: 'G', accent: '#ffd23a',
  title: '“What’s your sign?” | The signs *answer.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone *answered.* Eventually.' },
  lesson: { text: 'Ask the question. | *Listen* to the answer.', chip: 'SIGN: SHARED' },
  card: { a: 'cancer', b: 'pisces', chip: 'IT’S A MATCH' },
  last: {
    text: 'Then ask them *back.*',
    draw(x, t, lt) { hearts(x, t, 540, 1300, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
