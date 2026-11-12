// r2t0484: star_talk, BELIKE, "“Good news!” | Zodiacs be like:" (~62 s vertical, signs3kit social cut, music: lofi · D).
// Ending: lesson.
//   0.0–3.6    "“Good news!” | Zodiacs *be like:*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one reaction per sign (3.8 s each):
//              ♈ told everyone before you finished · ♉ opened the special-days snacks · ♊ told forty people, three
//              versions · ♋ framed the text · ♌ threw themself a parade · ♍ fact-checked it, three sources · ♎ still
//              choosing balloon colours · ♏ knew last week, acted surprised · ♐ packed a bag, destination: anywhere
//              · ♑ said "nice", updated the spreadsheet · ♒ declared a public holiday · ♓ happy-sobbed for three days
//  49.2        "Same news. | *Twelve parties.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Good news grows | *when you share it.*"  JOY: SHARED
//  58.3        "Good news travels. | *Aries made sure.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', ACC = '#7dffb0'

const JAR = [
  '.KKKKKK.',
  '.KKKKKK.',
  'WWWWWWWW',
  'WCCYCCYW',
  'WYCCCYCW',
  'WCCYCCCW',
  'WCYCCYCW',
  'WWWWWWWW',
]
const JAR_C = { K: '#ff9a4a', W: '#cfe3ff', C: '#8a4a2e', Y: GOLD }
const FRAME = [
  'GGGGGGGGGGGG',
  'GWWWWWWWWWWG',
  'GWWWWWWWWWWG',
  'GWWWWWWWWWWG',
  'GWWWWWWWWWWG',
  'GWWWWWWWWWWG',
  'GWWWWWWWWWWG',
  'GGGGGGGGGGGG',
]
const BALLOON = ['.BBB.', 'BBWBB', 'BBBBB', 'BBBBB', '.BBB.', '..K..', '..K..', '..K..']
const CASE = [
  '...KKKK...',
  '...K..K...',
  'BBBBBBBBBB',
  'BSSSSSSSSB',
  'BSPSSSSGSB',
  'BSSSSSSSSB',
  'BSSSSSSSSB',
  'BBBBBBBBBB',
  '.K......K.',
]
const CASE_C = { K: INK, B: '#8a4a2e', S: '#e8a24a', P: PINK, G: MINT }
const CAL = [
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'WWWWWWWWWW',
  'WKWKWKWKWW',
  'WWWWWWWWWW',
  'WKWKWYYKWW',
  'WWWWWYYWWW',
  'WKWKWKWKWW',
  'WWWWWWWWWW',
]
const CAL_C = { R: RED, W: PAPER, K: '#9aa5c4', Y: GOLD }
const CONF = ['#ff6b5a', GOLD, MINT, SKYB, PINK, LAV]

function confetti(x, t, cx, cy, t0, n = 22, spread = 320) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = ((t - t0) * 0.6 + i / n) % 1
    x.fillStyle = CONF[i % CONF.length]
    x.save(); x.translate(cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(ph * 8 + i) * 18, cy - 220 + ph * 440); x.rotate(ph * 6 + i)
    x.fillRect(-7, -4, 14, 8); x.restore()
  }
}
// a little rising bar chart on a sheet
function sheet(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -120, 300, 240); x.fillStyle = PAPER; x.fillRect(-142, -112, 284, 224)
  x.strokeStyle = '#cfd6e8'; x.lineWidth = 2
  for (let i = 1; i < 5; i++) { x.beginPath(); x.moveTo(-142, -112 + i * 45); x.lineTo(142, -112 + i * 45); x.stroke() }
  const H = [30, 46, 60, 150]
  for (let i = 0; i < 4; i++) { const g = ease.outBack ? ease.outBack(clamp((lt - 0.4 - i * 0.18) / 0.35)) : clamp(lt - 0.4); x.fillStyle = i === 3 ? '#2fc79a' : '#9aa5c4'; x.fillRect(-110 + i * 62, 100 - H[i] * g, 44, H[i] * g) }
  x.restore()
}

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'Told everyone. | *Before you finished.*', mood: 'sparkle', star: L, hops: [0.4, 0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'so, guess wh—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: PAPER, tail: 'br' })
      bubble(x, 780, 930, 'THEY | MATCHED!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 52, col: GOLD, tail: 'bl' })
      label(x, 790, 1130, 'TOLD: 37 PEOPLE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Opened the snacks | *saved for special days.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: L, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, JAR, JAR_C, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 740, 'SPECIAL DAYS ONLY', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'TODAY: SPECIAL', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Told forty people. | *Three versions.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const V = ['they got a job!', 'they got a dog!', 'they got a JET?']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.5))
      bubble(x, 790, 800, V[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 1020, `VERSION ${n + 1}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Framed the text. | *Literally.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, FRAME, { G: GOLD, W: '#140c30' }, 790, 940, 26 * k)
      if (k > 0.6) bubble(x, 790, 940, 'we matched!', k, { size: 32, col: '#5b8cff', ink: INK, tail: 'br' })
      label(x, 790, 1150, 'HUNG IN: HALLWAY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Threw themself | *a parade.*', mood: 'sparkle', star: L, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      confetti(x, t, 640, 900, P.t0 + 0.4, 26, 760)
      label(x, 790, 800, 'GRAND MARSHAL:', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: '#ffb34a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 890, 'LEO', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 60, bg: GOLD, rot: 0.04 })
      label(x, 790, 1120, 'NEWS: NOT EVEN THEIRS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: LAV, rot: -0.03 })
    } },
  { sign: 'virgo', cap: 'Fact-checked it. | *Three sources.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) label(x, 790, 760 + i * 110, `SOURCE ${i + 1}: ✓`, pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2.2), { size: 34, bg: MINT, rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'okay. yay.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Planning the party. | *Still picking balloons.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, -1], star: L,
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, GOLD, MINT]
      COLS.forEach((c, i) => drawBits(x, BALLOON, { B: c, W: '#fff', K: BONE }, 700 + i * 62, 900 + (i % 2) * 40 + 8 * Math.sin(t * 2 + i), 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2)))
      bubble(x, 790, 700, 'pink? blue? | both? none?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1130, 'PARTY: NEXT YEAR', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knew last week. | *Acted surprised.*', mood: lt => lt > 1.0 ? 'wide' : 'wink', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'wow!! no | way!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 1040, 'SURPRISE: ACTED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Packed a bag. | *Destination: anywhere.*', mood: 'sparkle', star: R, hops: [0.5, 1.3],
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 320, 980, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05 })
      label(x, 320, 760, 'LEAVING: NOW', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 320, 1150, 'to celebrate!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Said “nice.” | *Updated the spreadsheet.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      bubble(x, 320, 720, 'nice.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'br' })
      sheet(x, 320, 960, pop01(t, P.t0 + 0.3, 0.35, 2), lt)
      label(x, 320, 1140, 'MOOD: UP', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Declared it | *a public holiday.*', mood: 'sparkle', look: [1, -1], star: L, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CAL, CAL_C, 790, 950, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 720, 'NOV 12: OBSERVED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'everyone, go home!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Happy-sobbed | *for three days.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: L,
    front(x, t, lt, P) {
      label(x, 790, 760, 'DAY 3', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 52, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'i’m just so | HAPPY', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 380, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0484', key: 'D', accent: ACC, ending: 'lesson',
  title: '“Good news!” | Zodiacs *be like:*',
  cameos: CAMEOS,
  group: { cap: 'Same news. | *Twelve parties.*' },
  lesson: { text: 'Good news grows | *when you share it.*', chip: 'JOY: SHARED' },
  last: { text: 'Good news travels. | *Aries made sure.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
